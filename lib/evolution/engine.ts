import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { buildRequestArtifact, type RequestView } from './markdown';
import {
  EvolutionError,
  type AttachReasoningInput,
  type EmitRequestOptions,
  type EmitRequestResult,
  type EvoCandidateRow,
  type EvoCandidateTypeRow,
  type EvoInterpretationRow,
  type EvoReasoningRow,
  type EvoRequestRow,
  type EvoSourceRow,
  type EvoTargetRow,
  type EvolutionClient,
  type GenerateCandidateInput,
  type IngestSourceInput,
  type InterpretForTargetInput,
  type SourceEpistemics
} from './types';

/**
 * Evolution Engine v0.1 (NOXIA-EVO-0001) -- core functions.
 *
 * Five manually triggered steps, no cron, no automation, no live changes to
 * any target system:
 *
 *   1. ingestSource()            -> row in evo_sources
 *   2. generateCandidate(id)     -> row in evo_candidates (status 'draft')
 *   3. interpretForTarget(id,id) -> row in evo_target_interpretations
 *   4. attachReasoning(id)       -> row in evo_interpretation_reasoning
 *   5. emitRequest(id)           -> only when the interpretation status is
 *                                   'accepted' (manual approval between 4
 *                                   and 5, e.g. a curator sets
 *                                   `status = 'accepted'` on the
 *                                   interpretation row); pushes a markdown
 *                                   artifact to the target repo via the
 *                                   GitHub Contents API and records the
 *                                   evo_requests row.
 *
 * canon_status is never written by the engine -- exclusively curatorial.
 *
 * The client is an explicit dependency (defaulting to the Supabase admin
 * client) so the whole block stays isolated and testable without touching
 * any other KG table.
 */

const SOURCE_EPISTEMICS: ReadonlySet<string> = new Set<SourceEpistemics>([
  'fact',
  'hypothesis',
  'extrapolation',
  'speculation'
]);

function createEvolutionClient(): EvolutionClient {
  return createSupabaseAdminClient();
}

function raiseIfError(error: { message: string; code?: string } | null, context: string): void {
  if (error) {
    throw new EvolutionError(`${context}: ${error.message}${error.code ? ` (${error.code})` : ''}`);
  }
}

async function getRow<T extends { id: string }>(
  client: EvolutionClient,
  table: string,
  id: string,
  context: string
): Promise<T> {
  const { data, error } = await client.from(table).select('*').eq('id', id).maybeSingle();
  raiseIfError(error, context);
  if (!data) {
    throw new EvolutionError(`${context}: row ${id} not found in ${table}`);
  }
  return data as T;
}

// -----------------------------------------------------------------------------
// 1. Ingest a knowledge source
// -----------------------------------------------------------------------------

export async function ingestSource(
  input: IngestSourceInput,
  client: EvolutionClient = createEvolutionClient()
): Promise<EvoSourceRow> {
  if (!SOURCE_EPISTEMICS.has(input.source_epistemics)) {
    throw new EvolutionError(
      `ingestSource: invalid source_epistemics '${input.source_epistemics}' (allowed: ${[...SOURCE_EPISTEMICS].join(', ')})`
    );
  }

  const { data, error } = await client
    .from('evo_sources')
    .insert({
      source_system: input.source_system,
      source_type: input.source_type,
      source_ref: input.source_ref,
      source_revision: input.source_revision ?? null,
      source_epistemics: input.source_epistemics,
      topic: input.topic,
      content_snapshot: input.content_snapshot ?? null
    })
    .select()
    .single();
  raiseIfError(error, 'ingestSource');
  return data as EvoSourceRow;
}

// -----------------------------------------------------------------------------
// 2. Generate a target-system neutral candidate from a source
// -----------------------------------------------------------------------------

export async function generateCandidate(
  sourceId: string,
  input: GenerateCandidateInput,
  client: EvolutionClient = createEvolutionClient()
): Promise<EvoCandidateRow> {
  await getRow<EvoSourceRow>(client, 'evo_sources', sourceId, 'generateCandidate');

  const { data, error } = await client
    .from('evo_candidates')
    .insert({
      source_id: sourceId,
      title: input.title,
      summary: input.summary,
      status: 'draft'
    })
    .select()
    .single();
  raiseIfError(error, 'generateCandidate');
  return data as EvoCandidateRow;
}

// -----------------------------------------------------------------------------
// 3. Interpret a candidate for a target system (callable multiple times per
//    candidate -- one interpretation per target system)
// -----------------------------------------------------------------------------

export async function interpretForTarget(
  candidateId: string,
  targetId: string,
  input: InterpretForTargetInput,
  client: EvolutionClient = createEvolutionClient()
): Promise<EvoInterpretationRow> {
  await getRow<EvoCandidateRow>(client, 'evo_candidates', candidateId, 'interpretForTarget');
  await getRow<EvoTargetRow>(client, 'evo_targets', targetId, 'interpretForTarget');

  const { data: candidateType, error: typeError } = await client
    .from('evo_target_candidate_types')
    .select('*')
    .eq('target_id', targetId)
    .eq('type_code', input.candidate_type_code)
    .maybeSingle();
  raiseIfError(typeError, 'interpretForTarget');

  if (!candidateType) {
    const { data: allowed, error: allowedError } = await client
      .from('evo_target_candidate_types')
      .select('type_code')
      .eq('target_id', targetId);
    raiseIfError(allowedError, 'interpretForTarget');
    const codes = (allowed ?? []).map((row: { type_code: string }) => row.type_code);
    throw new EvolutionError(
      `interpretForTarget: candidate_type_code '${input.candidate_type_code}' is not allowed for target ${targetId} (allowed: ${codes.join(', ') || 'none'})`
    );
  }

  const { data, error } = await client
    .from('evo_target_interpretations')
    .insert({
      candidate_id: candidateId,
      target_id: targetId,
      candidate_type_id: (candidateType as EvoCandidateTypeRow).id,
      title: input.title,
      description: input.description,
      status: 'draft'
    })
    .select()
    .single();
  raiseIfError(error, 'interpretForTarget');
  return data as EvoInterpretationRow;
}

// -----------------------------------------------------------------------------
// 4. Attach reasoning to an interpretation (canon_status stays curatorial)
// -----------------------------------------------------------------------------

export async function attachReasoning(
  interpretationId: string,
  input: AttachReasoningInput,
  client: EvolutionClient = createEvolutionClient()
): Promise<EvoReasoningRow> {
  await getRow<EvoInterpretationRow>(
    client,
    'evo_target_interpretations',
    interpretationId,
    'attachReasoning'
  );

  const { data, error } = await client
    .from('evo_interpretation_reasoning')
    .insert({
      interpretation_id: interpretationId,
      trigger_summary: input.trigger_summary,
      scientific_claim: input.scientific_claim,
      extrapolation_delta: input.extrapolation_delta,
      historical_basis: input.historical_basis ?? null,
      fictional_delta: input.fictional_delta ?? null,
      gameplay_benefit: input.gameplay_benefit,
      affected_systems: input.affected_systems
    })
    .select()
    .single();
  if (error) {
    if (error.code === '23505') {
      throw new EvolutionError(
        `attachReasoning: reasoning already attached to interpretation ${interpretationId}; update the existing row instead`
      );
    }
    raiseIfError(error, 'attachReasoning');
  }
  return data as EvoReasoningRow;
}

// -----------------------------------------------------------------------------
// 5. Emit the request artifact (only for 'accepted' interpretations)
// -----------------------------------------------------------------------------

async function nextRequestCode(client: EvolutionClient, prefix: string): Promise<string> {
  const { data, error } = await client
    .from('evo_requests')
    .select('request_code')
    .like('request_code', `${prefix}-%`);
  raiseIfError(error, 'emitRequest');

  let max = 0;
  for (const row of (data ?? []) as Array<{ request_code: string | null }>) {
    const match = /-(\d+)$/.exec(row.request_code ?? '');
    if (match) {
      max = Math.max(max, Number.parseInt(match[1], 10));
    }
  }
  return `${prefix}-${String(max + 1).padStart(4, '0')}`;
}

async function pushArtifact(
  repoRef: string,
  filePath: string,
  content: string,
  token: string,
  branch: string,
  commitMessage: string
): Promise<void> {
  const encodedPath = filePath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
  const response = await fetch(`https://api.github.com/repos/${repoRef}/contents/${encodedPath}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'kueper-knowledge-graph-evolution-engine'
    },
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch
    })
  });

  if (!response.ok) {
    if (response.status === 422) {
      throw new EvolutionError(
        `emitRequest: artifact already exists in ${repoRef}: ${filePath} (422)`
      );
    }
    throw new EvolutionError(
      `emitRequest: GitHub Contents API failed (${response.status}): ${await response.text()}`
    );
  }
}

export async function emitRequest(
  interpretationId: string,
  options: EmitRequestOptions = {},
  client: EvolutionClient = createEvolutionClient()
): Promise<EmitRequestResult> {
  const interpretation = await getRow<EvoInterpretationRow>(
    client,
    'evo_target_interpretations',
    interpretationId,
    'emitRequest'
  );

  if (interpretation.status !== 'accepted') {
    throw new EvolutionError(
      `emitRequest: interpretation ${interpretationId} has status '${interpretation.status}'; ` +
        'manual approval is required before emitting a request (set status to accepted)'
    );
  }

  const target = await getRow<EvoTargetRow>(client, 'evo_targets', interpretation.target_id, 'emitRequest');
  const candidate = await getRow<EvoCandidateRow>(
    client,
    'evo_candidates',
    interpretation.candidate_id,
    'emitRequest'
  );
  const candidateType = await getRow<EvoCandidateTypeRow>(
    client,
    'evo_target_candidate_types',
    interpretation.candidate_type_id,
    'emitRequest'
  );

  const { data: reasoning, error: reasoningError } = await client
    .from('evo_interpretation_reasoning')
    .select('*')
    .eq('interpretation_id', interpretationId)
    .maybeSingle();
  raiseIfError(reasoningError, 'emitRequest');
  if (!reasoning) {
    throw new EvolutionError(
      `emitRequest: no reasoning attached to interpretation ${interpretationId}; run attachReasoning() first`
    );
  }

  const source = await getRow<EvoSourceRow>(client, 'evo_sources', candidate.source_id, 'emitRequest');

  if (!target.repo_ref || !target.request_prefix) {
    throw new EvolutionError(
      `emitRequest: target ${target.code} is missing repo_ref or request_prefix; cannot emit`
    );
  }

  // Retry safety: if this interpretation already emitted a request (push
  // succeeded), return it instead of computing a new code and pushing a
  // duplicate artifact.
  {
    const { data: existing, error: existingError } = await client
      .from('evo_requests')
      .select('*')
      .eq('interpretation_id', interpretationId)
      .maybeSingle();
    raiseIfError(existingError, 'emitRequest');
    if (existing) {
      const existingView = {
        requestCode: existing.request_code,
        target,
        candidateType,
        interpretation,
        candidate,
        source,
        reasoning: reasoning as EvoReasoningRow
      } satisfies RequestView;
      return {
        requestCode: existing.request_code,
        filePath: existing.file_path,
        content: buildRequestArtifact(existingView, new Date().toISOString().slice(0, 10)).content,
        dryRun: false,
        request: existing as EvoRequestRow,
        alreadyEmitted: true
      };
    }
  }

  const requestCode = await nextRequestCode(client, target.request_prefix);
  const { content, filePath } = buildRequestArtifact(
    {
      requestCode,
      target,
      candidateType,
      interpretation,
      candidate,
      source,
      reasoning: reasoning as EvoReasoningRow
    } satisfies RequestView,
    new Date().toISOString().slice(0, 10)
  );

  if (options.dryRun) {
    return { requestCode, filePath, content, dryRun: true, request: null };
  }

  const token = options.githubToken ?? process.env.GITHUB_TOKEN;
  if (!token) {
    throw new EvolutionError(
      'emitRequest: missing GitHub token (set GITHUB_TOKEN or pass options.githubToken)'
    );
  }

  try {
    await pushArtifact(
      target.repo_ref,
      filePath,
      content,
      token,
      options.branch ?? 'main',
      `Add ${requestCode}: ${interpretation.title}`
    );
  } catch (error) {
    // Retry safety: if the artifact was pushed by a previous attempt but the
    // evo_requests insert failed afterwards, the unique file_path tells us
    // the request already exists -- return it instead of pushing twice.
    if (error instanceof EvolutionError && error.message.includes('already exists')) {
      const { data: existing, error: existingError } = await client
        .from('evo_requests')
        .select('*')
        .eq('file_path', filePath)
        .maybeSingle();
      raiseIfError(existingError, 'emitRequest');
      if (existing) {
        return {
          requestCode,
          filePath,
          content,
          dryRun: false,
          request: existing as EvoRequestRow,
          alreadyEmitted: true
        };
      }
    }
    throw error;
  }

  const { data: request, error: insertError } = await client
    .from('evo_requests')
    .insert({
      interpretation_id: interpretationId,
      request_code: requestCode,
      file_path: filePath,
      status: 'open'
    })
    .select()
    .single();
  raiseIfError(insertError, 'emitRequest');

  return { requestCode, filePath, content, dryRun: false, request: request as EvoRequestRow };
}
