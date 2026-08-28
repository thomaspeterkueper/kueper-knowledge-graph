---
id: KON-000001
status: in_review
requester: SYS:KUEPER:contracomology
target: SYS:KUEPER:knowledge-graph
created: 2026-08-27
priority: medium
type: decision
blocking: "Contracomology source request conflicts with existing canonical KG entities and the established MOD:L2 model prefix; a traceable architecture decision is required before any remapping or new concept creation."
originSystem: SYS:KUEPER:contracomology
originAgent: automated
originContext: "Routed from external-tasks/open/KG.KON-000001-kg-begriffsdefinitionen.md for curator review."
targetSystem: SYS:KUEPER:knowledge-graph
---

# KON-000001 — Contracomology concept definitions

Source: `thomaspeterkueper/contracomology` → `external-tasks/open/KG.KON-000001-kg-begriffsdefinitionen.md`
Target: `thomaspeterkueper/kueper-knowledge-graph`
Routed: 2026-08-27

## Curator preflight

The request cannot be implemented as written without an architecture decision. The current Knowledge Graph already contains canonical Contracomology entities whose identities overlap the requested list:

- `CON:L1:zeitform`
- `CON:L1:avi-punkt`
- `CON:L1:oem`
- `CON:L1:ma-u`
- `CON:L1:ma-ta-u`

The requested numbered paradigm concepts also overlap the established model representation (`MOD:L2:paradigma-bach`, `MOD:L2:paradigma-chopin`, `MOD:L2:paradigma-wagner`). The source ticket's asserted “decision B2” — no Model type / no `MOD:` prefix — is not a traceable KG architecture decision and conflicts with the current canonical ID schema, where `MOD:L2:*` is an established type/layer.

## Required decision before implementation

Contracomology must clarify, through a traceable architecture/canon decision, whether the source request is to:

1. retain the existing canonical KG identities and map the Contracomology terminology to them; or
2. deliberately supersede/remodel existing identities, including an explicit migration plan and compatibility impact.

Until that decision exists, this request stays `in_review` under `external-tasks/open/`. No canonical entity, schema, or ID is changed by this routing PR.

## Governance constraint

Contracomology must not define competing authoritative copies locally in its frontend. Definitions become authoritative only through the Knowledge Graph's curator/canon lifecycle.

## Provenance

This file records the routed requirement and the blocker discovered during target-repository preflight. It does not pre-approve or create concept definitions.
