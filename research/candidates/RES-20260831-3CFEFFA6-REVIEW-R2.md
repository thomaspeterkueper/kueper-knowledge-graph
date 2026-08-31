# Evidence-gated reconciliation — RES-20260831-3CFEFFA6 (R2)

Status: `review reconciliation / non-canonical`
Date: 2026-08-31

## Bound candidate

- Research ID: `RES-20260831-3CFEFFA6`
- Candidate path: `research/candidates/RES-20260831-3CFEFFA6.md`
- Candidate blob: `847d58b32048d1a464d4c92b53e53907cc77395f`
- R1 PR: `https://github.com/thomaspeterkueper/kueper-knowledge-graph/pull/93`
- R1 head: `fa58e35d0bf027ad584295c042e2d572fede25fc`
- R1 merge commit: `22fcb5a5e81ac28028867130ef016174b618e00c`
- OTA source blob: `716c6a5c4fb968d9343c23dbffdb6c36062b7711`

## Critical evidence decision

The bound R1 candidate was critically reviewed before this reconciliation. Its scientific boundary is accepted as follows:

- Frost et al. 2025 is a valid real-world anchor for superionic `Au₂Hₓ` above roughly 40 GPa and 2200 K, with reversion to fcc Au on cooling.
- The dossier value `Δt_phase = 10^-6–10^-3 s` is not a published intrinsic phase lifetime and must remain an assumption, not `[R]`.
- `Cu₃(HHTP)₂` is a real conductive 2D MOF, but electronic conductivity does not establish hydrogen transport or Au₂Hₓ stabilization.
- Known Cu₃(HHTP)₂ stability data are a strong negative design constraint for the proposed extreme-P/T configuration; they do not constitute a direct mathematical impossibility proof at 40 GPa/2200 K because direct data for that exact host/regime are absent.
- Lifetime extension to 1–100 s or factors of `10³–10⁸` remains `[H]/[S]`, not externally established.

No scientific claim in the bound R1 candidate is changed by this R2 sidecar.

## Lifecycle reason

R1 PR #93 was merged directly under the repository owner identity before the independent v0.4 technical reviewer had processed its exact head. The Supabase task therefore still had no persisted technical verdict at merge time. This sidecar creates a new reviewable draft head that binds the already-reviewed candidate blob and records the missing lifecycle step without rewriting the scientific text.

This R2 is acceptable only after:

1. technical PASS is persisted for this draft head;
2. the server-side research Evidence-Gate is active for the exact draft head;
3. explicit evidence approval is recorded for that same head;
4. only then is the reconciliation merged.
