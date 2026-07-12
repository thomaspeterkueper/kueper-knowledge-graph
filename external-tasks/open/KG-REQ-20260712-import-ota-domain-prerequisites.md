```yaml
id: REQ-KUEPER-20260712-IMPORT-OTA-DOMAIN-PREREQUISITES
status: open
requester: SYS:KUEPER:ssf
target: SYS:KUEPER:knowledge-graph
created: 2026-07-12
priority: high
type: schema
blocking: |
  MAT-chain -> archive-document connections (AST-1101, MAT-2101, etc.)
  cannot get real prerequisite data until this lands - the data exists,
  it just isn't imported.
```

## Purpose

204 of 212 OTA documents already declare prerequisite data via a structured
`knowledge.domains` frontmatter field - this was previously missed (an
earlier check only searched for a `## PREREQUISITES` markdown section in
document bodies, found 1 of 212, and concluded prerequisites were largely
missing). Parsing the actual YAML frontmatter across all 212 documents
found otherwise - 204 have it, 0 parse errors.

`relation-registry.json` currently has only 15 relations total (9
`REQUIRES`). The gap isn't missing curatorial work - it's a missing import
step.

## Step 1 - register four referenced-but-missing domain ids

204 documents reference 9 distinct `KD:*` ids. Four don't exist in the
Entity Registry (16 `KD:*` entities currently registered):

```text
KD:PHYS-THERM:N1   referenced 76x   - no PHYS-THERM domain registered at all
KD:PHIL-SCI:N2     referenced 27x   - not registered
KD:MATH-STAT:N1    referenced 14x   - only KD:MATH-STAT:N2 registered (level mismatch)
KD:KON-KONTR:N1    referenced 1x    - not registered; KD:KON:N1 exists and may be
                                       the intended id (possible naming drift)
```

`PHYS-THERM` at 76 references (over a third of all documents) is the
priority - thermal physics fundamentals have no registered domain despite
being the single most-referenced prerequisite across the archive.

## Step 2 - batch-import the 204 documents' relations

Once step 1 closes, import all 204 documents' `knowledge.domains` entries
as `REQUIRES` relations (`DOC:OTA:<doc-id> REQUIRES KD:<domain>:<level>`),
matching the existing pattern already proven for `OTA-SCI-0083` and
`OTA-FND-0028`. Mechanical import from already-registered `DOC:OTA:*`
entities (209 registered, `KG-REQ-20260710-batch-register-ota-documents`)
to already-declared frontmatter data - no new curatorial authoring needed
for this step.

## Immediate unblock, doesn't need to wait for the full batch

Two of the three documents from the (now-closed) MAT-chain priority list are
ready today:

```text
OTA-SCI-0043   KD:GEO-SEISM:N2, KD:GEO-PLANET:N1   both already registered
OTA-SCI-0009   KD:PHYS-THERM:N1, KD:PHYS-EM:N2      blocked on step 1
```

`OTA-SCI-0036` is intentionally not listed - see the closed
`OTA-REQ-20260710-priority-prerequisites-mat-chain.md` for why it's
unsuitable as a target regardless of its prerequisite data being present.

## Suggested IDs

n/a for step 1's corrections to `MATH-STAT`/`KON-KONTR` (existing ids may
just need a level or spelling fix, not new entities). New for `PHYS-THERM`
and `PHIL-SCI` if genuinely absent.

## Target Export

`exports/entity-registry-0.1.json` (step 1), `exports/relation-registry-0.1.json`
(step 2)
