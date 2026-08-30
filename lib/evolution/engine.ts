import type { SupabaseClient } from '@supabase/supabase-js';

import { createSupabaseAdminClient } from '@/lib/supabase/server';

export type SourceEpistemics = 'fact' | 'hypothesis' | 'extrapolation' | 'speculation';
export type CandidateStatus = 'draft' | 'reviewed' | 'archived';
export type InterpretationStatus = 'draft' | 'reviewed' | 'accepted' | 'rejected';
export type RequestStatus = 'open' | 'in_review' | 'merged' | 'rejected';

export type IngestSourceInput = {
  sourceSystem: string;
  sourceType: string;
  sourceRef: string;
  sourceRevision?: string | null;
  sourceEpistemics: SourceEpistemics;
  topic: string;
  contentSnapshot?: string | null;
};

export type GenerateCandidateInput = {
  title: string;
  summary: string;
};

export type InterpretForTargetInput = {
  targetCode: string;
  candidateType: string;
  title: string;
  description: string;
};

export type AttachReasoningInput = {
  triggerSummary: string;
  scientificClaim: string;
  extrapolationDelta: string;
  historicalBasis?: string | null;
  fictionalDelta?: string | null;
  gameplayBenefit: string;
  affectedSystems: string[];
};

export type RequestArtifact = {
  requestCode: string;
  filePath: string;
  markdown: string;
  repository: string;
};

export type RequestWriter = (artifact: RequestArtifact) => Promise<void>;

type EngineClient = SupabaseClient;

function db(client?: EngineClient) {
  return client ?? createSupabaseAdminClient();
}

function requireData<T>(data: T | null, error: { message?: string } | null, action: string): T {
  if (error) throw new Error(`${action}: ${error.message ?? 'database error'}`);
  if (!data) throw new Error(`${action}: no data returned`);
  return data;
}

export async function ingestSource(input: IngestSourceInput, client?: EngineClient) {
  const result = await db(client)
    .from('evo_sources')
    .insert({
      source_system: input.sourceSystem,
      source_type: input.sourceType,
      source_ref: input.sourceRef,
      source_revision: input.sourceRevision ?? null,
      source_epistemics: input.sourceEpistemics,
      topic: input.topic,
      content_snapshot: input.contentSnapshot ?? null,
    })
    .select('*')
    .single();

  return requireData(result.data, result.error, 'ingestSource');
}

export async function generateCandidate(
  sourceId: string,
  input: GenerateCandidateInput,
  client?: EngineClient
) {
  const result = await db(client)
    .from('evo_candidates')
    .insert({
      source_id: sourceId,
      title: input.title,
      summary: input.summary,
      status: 'draft' satisfies CandidateStatus,
    })
    .select('*')
    .single();

  return requireData(result.data, result.error, 'generateCandidate');
}

export async function interpretForTarget(
  candidateId: string,
  input: InterpretForTargetInput,
  client?: EngineClient
) {
  const supabase = db(client);

  const targetResult = await supabase
    .from('evo_targets')
    .select('id, code')
    .eq('code', input.targetCode)
    .single();
  const target = requireData(targetResult.data, targetResult.error, 'interpretForTarget target');

  const typeResult = await supabase
    .from('evo_target_candidate_types')
    .select('id, type_code')
    .eq('target_id', target.id)
    .eq('type_code', input.candidateType)
    .single();
  const candidateType = requireData(typeResult.data, typeResult.error, 'interpretForTarget candidate type');

  const result = await supabase
    .from('evo_target_interpretations')
    .insert({
      candidate_id: candidateId,
      target_id: target.id,
      candidate_type_id: candidateType.id,
      title: input.title,
      description: input.description,
      status: 'draft' satisfies InterpretationStatus,
    })
    .select('*')
    .single();

  return requireData(result.data, result.error, 'interpretForTarget');
}

export async function attachReasoning(
  interpretationId: string,
  input: AttachReasoningInput,
  client?: EngineClient
) {
  const result = await db(client)
    .from('evo_interpretation_reasoning')
    .upsert({
      interpretation_id: interpretationId,
      trigger_summary: input.triggerSummary,
      scientific_claim: input.scientificClaim,
      extrapolation_delta: input.extrapolationDelta,
      historical_basis: input.historicalBasis ?? null,
      fictional_delta: input.fictionalDelta ?? null,
      gameplay_benefit: input.gameplayBenefit,
      affected_systems: input.affectedSystems,
      // canon_status is intentionally omitted. It is curator-only state and must
      // never be inferred or set by the Evolution Engine.
    }, { onConflict: 'interpretation_id' })
    .select('*')
    .single();

  return requireData(result.data, result.error, 'attachReasoning');
}

export async function setInterpretationStatus(
  interpretationId: string,
  status: InterpretationStatus,
  client?: EngineClient
) {
  const result = await db(client)
    .from('evo_target_interpretations')
    .update({ status })
    .eq('id', interpretationId)
    .select('*')
    .single();

  return requireData(result.data, result.error, 'setInterpretationStatus');
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64) || 'candidate';
}

function ordinal(value: number) {
  return String(value).padStart(4, '0');
}

export function buildRequestArtifact(input: {
  ordinal: number;
  target: { repo_ref: string; request_path: string; request_prefix: string; label: string };
  interpretation: { title: string; description: string };
  candidate: { title: string; summary: string };
  source: { source_system: string; source_type: string; source_ref: string; source_revision: string | null; source_epistemics: string; topic: string };
  candidateType: { type_code: string };
  reasoning: {
    trigger_summary: string;
    scientific_claim: string;
    extrapolation_delta: string;
    historical_basis: string | null;
    fictional_delta: string | null;
    gameplay_benefit: string;
    affected_systems: string[];
    canon_status: string | null;
  };
}): RequestArtifact {
  const requestCode = `${input.target.request_prefix}-${ordinal(input.ordinal)}`;
  const filename = `${requestCode}-${slugify(input.interpretation.title)}.md`;
  const requestPath = input.target.request_path.replace(/^\/+|\/+$/g, '');
  const filePath = `${requestPath}/${filename}`;

  const markdown = `# ${requestCode} — ${input.interpretation.title}\n\n` +
    `**Target:** ${input.target.label}\n` +
    `**Status:** open\n` +
    `**Candidate type:** ${input.candidateType.type_code}\n` +
    `**Source system:** ${input.source.source_system}\n` +
    `**Source:** ${input.source.source_ref}\n` +
    `**Source revision:** ${input.source.source_revision ?? 'not specified'}\n` +
    `**Source epistemics:** ${input.source.source_epistemics}\n\n` +
    `## Anlass\n\n${input.reasoning.trigger_summary}\n\n` +
    `## Quelle\n\n${input.source.source_type}: ${input.source.source_ref}\n\n` +
    `## Wissens-Destillat\n\n${input.candidate.summary}\n\n` +
    `## Zielsystem-Interpretation\n\n${input.interpretation.description}\n\n` +
    `## Wissenschaftliche Aussage\n\n${input.reasoning.scientific_claim}\n\n` +
    `## Extrapolationsanteil\n\n${input.reasoning.extrapolation_delta}\n\n` +
    (input.reasoning.historical_basis ? `## Historische Basis\n\n${input.reasoning.historical_basis}\n\n` : '') +
    (input.reasoning.fictional_delta ? `## Fiktionaler Anteil\n\n${input.reasoning.fictional_delta}\n\n` : '') +
    `## Gameplay-Nutzen\n\n${input.reasoning.gameplay_benefit}\n\n` +
    `## Betroffene Systeme\n\n${input.reasoning.affected_systems.map((item) => `- ${item}`).join('\n')}\n\n` +
    `## Canon-Status\n\n${input.reasoning.canon_status ?? 'not set — curator decision required'}\n`;

  return {
    requestCode,
    filePath,
    markdown,
    repository: input.target.repo_ref,
  };
}

export async function githubContentsWriter(artifact: RequestArtifact) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('emitRequest: GITHUB_TOKEN is not configured');

  const response = await fetch(
    `https://api.github.com/repos/${artifact.repository}/contents/${artifact.filePath}`,
    {
      method: 'PUT',
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'x-github-api-version': '2022-11-28',
      },
      body: JSON.stringify({
        message: `${artifact.requestCode}: emit accepted evolution candidate`,
        content: Buffer.from(artifact.markdown, 'utf8').toString('base64'),
      }),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`emitRequest GitHub write failed: HTTP ${response.status} ${body}`);
  }
}

export async function emitRequest(
  interpretationId: string,
  options?: { client?: EngineClient; writer?: RequestWriter }
) {
  const supabase = db(options?.client);

  const interpretationResult = await supabase
    .from('evo_target_interpretations')
    .select('id, candidate_id, target_id, candidate_type_id, title, description, status')
    .eq('id', interpretationId)
    .single();
  const interpretation = requireData(interpretationResult.data, interpretationResult.error, 'emitRequest interpretation');

  if (interpretation.status !== 'accepted') {
    throw new Error(`emitRequest: interpretation ${interpretationId} must be accepted first`);
  }

  const existingResult = await supabase
    .from('evo_requests')
    .select('*')
    .eq('interpretation_id', interpretationId)
    .maybeSingle();
  if (existingResult.error) throw new Error(`emitRequest existing request: ${existingResult.error.message}`);
  if (existingResult.data) return existingResult.data;

  const [candidateResult, targetResult, typeResult, reasoningResult, requestCountResult] = await Promise.all([
    supabase.from('evo_candidates').select('id, source_id, title, summary').eq('id', interpretation.candidate_id).single(),
    supabase.from('evo_targets').select('id, label, repo_ref, request_path, request_prefix').eq('id', interpretation.target_id).single(),
    supabase.from('evo_target_candidate_types').select('id, type_code').eq('id', interpretation.candidate_type_id).single(),
    supabase.from('evo_interpretation_reasoning').select('*').eq('interpretation_id', interpretationId).single(),
    supabase.from('evo_requests').select('id', { count: 'exact', head: true }),
  ]);

  const candidate = requireData(candidateResult.data, candidateResult.error, 'emitRequest candidate');
  const target = requireData(targetResult.data, targetResult.error, 'emitRequest target');
  const candidateType = requireData(typeResult.data, typeResult.error, 'emitRequest candidate type');
  const reasoning = requireData(reasoningResult.data, reasoningResult.error, 'emitRequest reasoning');
  if (requestCountResult.error) throw new Error(`emitRequest request count: ${requestCountResult.error.message}`);

  const sourceResult = await supabase
    .from('evo_sources')
    .select('source_system, source_type, source_ref, source_revision, source_epistemics, topic')
    .eq('id', candidate.source_id)
    .single();
  const source = requireData(sourceResult.data, sourceResult.error, 'emitRequest source');

  const artifact = buildRequestArtifact({
    ordinal: (requestCountResult.count ?? 0) + 1,
    target,
    interpretation,
    candidate,
    source,
    candidateType,
    reasoning,
  });

  const writer = options?.writer ?? githubContentsWriter;
  await writer(artifact);

  const insertResult = await supabase
    .from('evo_requests')
    .insert({
      interpretation_id: interpretationId,
      request_code: artifact.requestCode,
      file_path: artifact.filePath,
      status: 'open' satisfies RequestStatus,
    })
    .select('*')
    .single();

  return requireData(insertResult.data, insertResult.error, 'emitRequest persist');
}
