# KUEPER Knowledge Graph Curator Agent

Status: v0.1 implementation contract
Source architecture: KUEPER Ecosystem `docs/architecture/KG_CURATOR_AGENT.md`
Owner: KUEPER Knowledge Graph

## Purpose

The KG Curator is a bounded coherence sensor. It detects reproducible graph/schema/provenance anomalies and emits evidence-backed task candidates. It does not invent canon, silently merge entities, rewrite narrative continuity, mutate another repository, or merge pull requests.

## V0.1 finding classes

- `BROKEN_REFERENCE`: referenced canonical identifier cannot be resolved.
- `SCHEMA_DRIFT`: a supported canonical export violates an explicit contract.
- `PROVENANCE_GAP`: a record for which provenance is already required lacks it.
- `DUPLICATE_ENTITY`: exact/explicit identity semantics indicate two competing canonical records.
- `CONFLICTING_CLAIM`: only when property/scope semantics are explicit enough for deterministic comparison.

Semantic similarity alone is never sufficient for automatic merge or canon choice.

## Stable finding identity

A finding fingerprint is SHA-256 over normalized structural evidence:

`kind + owner_target + sorted(subject_refs) + sorted(claim_refs) + normalized condition key`

Generated prose and detection timestamps are excluded. Repeated detection therefore collapses onto the same persistent finding.

## Inputs

V0.1 is deliberately bounded to repository-owned validation surfaces:

- `registry/source-of-truth.json`
- `exports/kxf-learning-modules-0.1.json`
- `exports/entity-registry-0.1.json`
- existing `external-tasks/open|done|rejected`

The existing `scripts/check_source_of_truth.py` remains authoritative for its checks; the curator consumes the same canonical surfaces instead of defining a parallel graph.

## Persistent state

Runtime state is stored in `state/kg-curator-findings.json` for repository/local execution. Each fingerprint tracks first/last seen time, recurrence count, status, cooldown and latest evidence. State updates are deterministic for a supplied run timestamp.

## Promotion gate

A finding can become an outbox envelope only when:

1. it is reproducible from current canonical inputs;
2. no existing task already contains the fingerprint;
3. ownership is explicit;
4. severity/confidence meet the configured threshold;
5. cooldown permits promotion.

Deterministic broken references and schema drift may promote automatically. Duplicate/conflict candidates default to review unless exact identity semantics make the condition deterministic.

## Outbox contract

Promoted findings are written as KUEPER envelopes under `.kueper/outbox/` with:

- `target`
- `title`
- `reason`
- `requested_change`
- `expected_result`
- `priority`
- `cost_policy`
- `estimated_effort`
- `depth`
- `affects`
- `finding_fingerprint`
- `evidence`

Cross-repository work is requested through the target repository's task mechanism; the curator never writes implementation changes directly into another repository.

## Cost policy

Deterministic schema/reference checks are cheap and may run frequently. Broad semantic duplicate/conflict analysis is outside automatic v0.1 execution and should be scheduled `prefer_off_peak` or later.
