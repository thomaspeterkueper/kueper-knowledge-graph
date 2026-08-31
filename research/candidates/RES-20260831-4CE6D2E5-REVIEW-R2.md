# Evidence-gated reconciliation — RES-20260831-4CE6D2E5 (R2)

Status: `review reconciliation / non-canonical`
Date: 2026-08-31

## Bound candidate

- Research ID: `RES-20260831-4CE6D2E5`
- Candidate path: `research/candidates/RES-20260831-4CE6D2E5.md`
- Candidate blob: `dc1b5482a21f50e3db84658afec6fc67c6cc3922`
- R1 PR: `https://github.com/thomaspeterkueper/kueper-knowledge-graph/pull/94`
- R1 head: `b31c7dcd11ae8a08a12bda4917c71a83289afdd6`
- R1 merge commit: `6547674ca82d3ddef13cbdab4f7944ec9ea2edd1`
- OTA source blob: `d4379892f4902c48851ec23b86c100fc665d1385`

## Critical evidence decision

The bound R1 candidate was critically reviewed before this reconciliation. Its scientific boundary is accepted as follows:

- Optical-clock performance must distinguish systematic uncertainty, instability, averaging time and clock species; institution-level figures cannot be treated as one timeless ranking.
- Bothwell et al., *Metrologia* 56, 065004 is a 2019 publication, not 2022.
- Unsourced per-laboratory uptime and procurement-cost rows are not `[R]` facts.
- SQUID sensitivity must be stated as noise/field sensitivity with bandwidth and configuration; a universal `10^7` advantage over Hall sensors is not established.
- Atom-interferometer gravity and rotation sensitivities require explicit integration-time and instrument context.
- Dst is a derived multi-observatory geomagnetic index, not a quantity directly measured by a single SQUID.
- LOD/EOP precision and TRL claims must be bound to concrete products, techniques and averaging regimes instead of presented as universal constants.

No scientific claim in the bound R1 candidate is changed by this R2 sidecar.

## Lifecycle reason

R1 PR #94 was merged directly under the repository owner identity before the independent v0.4 technical reviewer had processed its exact head. The Supabase task therefore still had no persisted technical verdict at merge time. This sidecar creates a new reviewable draft head that binds the already-reviewed candidate blob and records the missing lifecycle step without rewriting the scientific text.

This R2 is acceptable only after:

1. technical PASS is persisted for this draft head;
2. the server-side research Evidence-Gate is active for the exact draft head;
3. explicit evidence approval is recorded for that same head;
4. only then is the reconciliation merged.
