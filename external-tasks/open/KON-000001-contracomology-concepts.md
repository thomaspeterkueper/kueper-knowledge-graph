# KON-000001 — Contracomology concept definitions

Source: `thomaspeterkueper/contracomology` → `external-tasks/open/KG.KON-000001-kg-begriffsdefinitionen.md`
Target: `thomaspeterkueper/kueper-knowledge-graph`
Status: open
Routed: 2026-08-27

## Requirement

Prepare and curate the following Concept IDs for the Contracomology domain:

- `CON:L1:zeitform`
- `CON:L1:avi-punkt`
- `CON:L1:oem`
- `CON:L1:ma-u`
- `CON:L1:ma-ta-u`
- `CON:L1:paradigma-1`
- `CON:L1:paradigma-2`
- `CON:L1:paradigma-3`

## Existing architecture decision

Use domain + concepts + documents (decision B2). Do not introduce a `Model` type or a `MOD:` prefix.

## Governance constraint

Contracomology must not define these concepts locally in its frontend. Definitions become authoritative only after Knowledge Graph curator approval.

## Provenance

This file routes an existing cross-repository requirement into the repository that owns the affected domain. It does not pre-approve or create the concept definitions themselves.
