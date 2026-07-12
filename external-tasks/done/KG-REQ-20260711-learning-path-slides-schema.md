KB-REQUEST

ID:
REQ:L3:PENDING

Requester:
SYS:KUEPER:ssf

Recipient:
SYS:KUEPER:knowledge-graph

Request Type:
schema_request

Purpose:
`records.learning_paths` (KG-0002, implemented 2026-07-08) defines the *structure* of a learning path - id, steps, prerequisites, unlocks, nextPaths. It does not define how a path is actually *presented* to a learner: text, tables, formulas, quiz slides, video.

NOXIA independently built exactly this missing presentation layer - `foundation_folien` (Supabase), rendered by `KursRenderer.tsx`, with eight slide types already designed and working: `titel, text, tabelle, zwei_spalten, formel, animation, quiz, video`. It predates `records.learning_paths` (created 23.06, path schema landed 08.07) and was never connected to it - two good pieces built independently, now needing a bridge rather than either being thrown away.

Requested Content:

Extend the learning-path export with an optional slide/presentation field per path - either inline on `records.learning_paths` entries or as a companion export (`kxf-learning-path-content-0.1.json`, mirroring how `kxf-learning-modules-0.1.json` and `knowledge-domains-0.1.json` are split today). Proposed shape, based directly on NOXIA's existing `Folie` design:

```json
{
  "pathId": "PATH:SSF:MAT-FOUNDATIONS-0001",
  "slides": [
    {
      "position": 1,
      "type": "titel | text | tabelle | zwei_spalten | formel | animation | quiz | video",
      "title": "optional",
      "content": { }
    }
  ]
}
```

`content`'s shape depends on `type` - NOXIA's `KursRenderer.tsx` already has working renderers for all eight types and can supply the exact per-type field shapes it expects, if useful as a starting reference rather than redesigning from scratch.

Priority:
high

Blocking:
Without this, any path-level content (not just module-level) has nowhere canonical to live, and NOXIA's only working slide renderer stays disconnected from the Knowledge Graph - exactly the kind of parallel-system drift the ecosystem is trying to avoid.

Suggested IDs:
n/a - schema extension, not new path entities.

Target Export:
exports/kxf-learning-paths-0.1.json (or new companion export) -> records.learning_paths

Status:
open

Created:
2026-07-11

Curator:
T.P.K.


---
_Resolved 2026-07-12: Companion-Export kxf-learning-path-content-0.1.json + Schema angelegt; Medien via MED:L3 (ARC-0010)._
