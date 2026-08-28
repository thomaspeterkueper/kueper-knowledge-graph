import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Evolution Engine v0.1 (NOXIA-EVO-0001)
 *
 * Controlled, non-automatic mechanism that turns KG knowledge into structured,
 * reasoned game-content candidates. No cron, no automation: every step is
 * triggered manually. The engine is target-system neutral (NOXIA today,
 * potentially Dvārakā later) -- it produces candidates that each target
 * system reads in its own way via evo_target_interpretations.
 *
 * Schema: infrastructure/migrations/0029_evolution_engine.sql
 */

/** Minimal client surface used by the engine. The default client is the
 * Supabase admin client (see engine.ts); tests pass a fake client. */
export type EvolutionClient = Pick<SupabaseClient, 'from'>;

/** Allowed source epistemics (see evo_sources.source_epistemics). */
export type SourceEpistemics =
  | 'fact'
  | 'hypothesis'
  | 'extrapolation'
  | 'speculation';

export interface IngestSourceInput {
  source_system: string;
  source_type: string;
  source_ref: string;
  source_revision?: string | null;
  source_epistemics: SourceEpistemics;
  topic: string;
  /** Optional: full content instead of lossy raw_content. */
  content_snapshot?: string | null;
}

export interface GenerateCandidateInput {
  title: string;
  summary: string;
}

export interface InterpretForTargetInput {
  title: string;
  description: string;
  /** Must be one of the target's allowed candidate types, e.g. 'technology'. */
  candidate_type_code: string;
}

/**
 * Reasoning for one interpretation. canon_status is deliberately NOT part of
 * this input: it is never set by the engine, exclusively by curation
 * (manual DB edit, e.g. `update evo_target_interpretations ...` / the
 * reasoning row's canon_status column).
 */
export interface AttachReasoningInput {
  trigger_summary: string;
  scientific_claim: string;
  extrapolation_delta: string;
  /** Primarily for narrative-historical targets (e.g. Dvārakā). */
  historical_basis?: string | null;
  fictional_delta?: string | null;
  gameplay_benefit: string;
  affected_systems: string[];
}

export interface EmitRequestOptions {
  /** GitHub token for the Contents API; falls back to GITHUB_TOKEN env var. */
  githubToken?: string;
  /** Branch to write the artifact to. Default: 'main'. */
  branch?: string;
  /**
   * Dry run: build the artifact (code, file path, markdown) without pushing
   * to the target repo and without creating an evo_requests row.
   */
  dryRun?: boolean;
}

// -----------------------------------------------------------------------------
// Row shapes (mirror of the migration columns used by the engine)
// -----------------------------------------------------------------------------

export interface EvoSourceRow {
  id: string;
  source_system: string;
  source_type: string;
  source_ref: string;
  source_revision: string | null;
  source_epistemics: SourceEpistemics;
  topic: string;
  content_snapshot: string | null;
  ingested_at: string;
}

export interface EvoCandidateRow {
  id: string;
  source_id: string;
  title: string;
  summary: string | null;
  status: 'draft' | 'reviewed' | 'archived';
  created_at: string;
}

export interface EvoTargetRow {
  id: string;
  code: string;
  label: string | null;
  repo_ref: string | null;
  request_path: string | null;
  request_prefix: string | null;
  kind: string | null;
}

export interface EvoCandidateTypeRow {
  id: string;
  target_id: string;
  type_code: string;
  description: string | null;
}

export interface EvoInterpretationRow {
  id: string;
  candidate_id: string;
  target_id: string;
  candidate_type_id: string;
  title: string;
  description: string | null;
  status: 'draft' | 'reviewed' | 'accepted' | 'rejected';
  created_at: string;
}

export interface EvoReasoningRow {
  interpretation_id: string;
  trigger_summary: string | null;
  scientific_claim: string | null;
  extrapolation_delta: string | null;
  historical_basis: string | null;
  fictional_delta: string | null;
  canon_status: string | null;
  gameplay_benefit: string | null;
  affected_systems: string[];
}

export interface EvoRequestRow {
  id: string;
  interpretation_id: string;
  request_code: string;
  file_path: string;
  status: 'open' | 'in_review' | 'merged' | 'rejected';
  created_at: string;
}

export interface EmitRequestResult {
  requestCode: string;
  filePath: string;
  content: string;
  dryRun: boolean;
  /** evo_requests row; null in dry run mode. */
  request: EvoRequestRow | null;
  /** True when the artifact already existed from a previous successful emit. */
  alreadyEmitted?: boolean;
}

/** Error raised by the engine for invalid state/input. */
export class EvolutionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EvolutionError';
  }
}
