# Reconciliation — RES-20260829 provider validation gap

Status: review required / non-canonical
Date: 2026-09-13

## Scope

This note reconciles two research candidates that were merged as non-canonical staging material before a later control-plane validation attempt failed for provider/runtime reasons:

- `RES-20260829-04521EF6` — KG PR #43, merged head `c13bee17a7b688722b51739ccc915106367f74c1`, merge commit `5f2dc4eb56a48f2e3a2fc716a777542796bc5409`.
- `RES-20260829-1DB3FDB1` — KG PR #44, merged head `e69feb5ebd2f5ae6349184cb380521b2d849a765`, merge commit `4350c22f489b5bebc08c7159ab993a7e7e0279e1`.

Both PRs explicitly introduced only `research/candidates/` staging material and did not modify canonical KG data.

## Later validation result

The KUEPER control plane later recorded both research IDs as `validation-error` rather than evidence-validated. The common failure contains two independent operational conditions:

1. Claude Code treated the valid DeepSeek model id `deepseek-v4-flash` as an unknown local model-catalog entry for context-window enforcement.
2. The DeepSeek API returned `402 Insufficient Balance`.

The second condition means no automatic rerun is valid until provider balance is restored. This note therefore does not reinterpret, approve, reject, publish, canonicalize, or remove either candidate.

## Reconciliation state

Until a fresh successful validation run completes against the pinned source contract:

- both candidates remain `candidate / non-canonical`;
- their existing evidence scores must not be treated as newly revalidated scores;
- no canonical KG entity, OTA document, publication layer, or downstream architecture decision should be changed solely from this reconciliation;
- no automatic merge/canonicalization action is authorized.

## Required follow-up

After the provider-side balance issue is resolved and the Research Watch Claude/DeepSeek compatibility fix is active:

1. rerun exact research validation for `RES-20260829-04521EF6` and `RES-20260829-1DB3FDB1` against their pinned OTA source revision/blob;
2. compare source set, claim-source mapping, counterevidence, evidence score, and uncertainty with the currently staged candidate files;
3. if materially unchanged, record a successful revalidation without rewriting canon;
4. if materially changed, open a normal review PR containing only the candidate/reconciliation delta;
5. keep publication/canon decisions human-reviewed and fail-closed.
