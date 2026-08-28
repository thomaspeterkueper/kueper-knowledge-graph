---
id: KON-000005
status: in_review
requester: SYS:KUEPER:contracomology
target: SYS:KUEPER:knowledge-graph
created: 2026-08-27
priority: low
type: decision
blocking: "A separate architecture decision is required before KON may be added to the learning-module subject-code contract."
originSystem: SYS:KUEPER:contracomology
originAgent: automated
originContext: "Deferred routing from external-tasks/open/KG.KON-000005-kg-lernmodul-subjectcodes.md."
targetSystem: SYS:KUEPER:knowledge-graph
followUpSystems:
  - SYS:KUEPER:ssf
---

# KON-000005 — Deferred Contracomology learning-module subject code

Source: `thomaspeterkueper/contracomology` → `external-tasks/open/KG.KON-000005-kg-lernmodul-subjectcodes.md`
Target: `thomaspeterkueper/kueper-knowledge-graph`
Routed: 2026-08-27

## Context

If Contracomology later emits formal learning modules, `KON` may need to become a supported subject code in the Knowledge Graph learning-module contracts.

## Potential change after a separate decision

1. Evaluate adding `KON` to `exports/kxf-learning-modules-0.1.json`.
2. Coordinate matching scope rules for downstream consumers such as SSF.

## Explicit blocker

Do not change the KG schema now. The source request explicitly requires a separate decision, and the current learning-module contract does not include `KON`.

This request therefore remains `in_review` under `external-tasks/open/` until that architecture decision exists. No schema/export change is authorized by this routing file.

## Provenance

This file only routes the deferred requirement into the repository that would own a future schema change. It is not authorization to add the subject code.
