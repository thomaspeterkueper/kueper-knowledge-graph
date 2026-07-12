KB-REQUEST

ID:
REQ:L3:PENDING

Requester:
SYS:KUEPER:ssf

Recipient:
SYS:KUEPER:knowledge-graph

Request Type:
entity_request

Purpose:
212 OTA documents exist in `overtime-archive.org`. Only 2 are registered as `DOC:OTA:*` entities in the Entity Registry (`OTA-SCI-0083-2026-DE`, `OTA-FND-0028-2026-DE`). This looked like it would need 210 individual curatorial requests - checking the actual source files changed that: 204 of the 212 documents already carry a `kg:` frontmatter block with a pre-assigned `graphId`, e.g.:

```yaml
kg:
  schema: KXF-0.2
  master: kueper-knowledge-graph
  documentId: "OTA-SCI-0009-2025-DE"
  graphId: "DOC:OTA:OTA-SCI-0009-2025-DE"
  system: SYS:OTA:overtimearchive
```

The identity work is already done at the source. Registration is a mechanical read-and-import, not a curatorial decision, for these 204.

Requested Content:

1. Batch-import the 204 documents with existing `kg:` frontmatter into the Entity Registry as `DOC:OTA:*` entities, using each document's own declared `graphId`. Suggest scripting this directly against `overtime-archive.org`'s `src/content/documents/*.md` frontmatter rather than curating each one by hand.

2. The remaining 8 documents without a `kg:` block need individual attention first (a curator decision on whether/how to assign a `graphId`) - listing separately, not part of the batch:

```text
Documents without kg: frontmatter (8 total) - identify via:
grep -L "^kg:" src/content/documents/*.md
```

3. This registers identity only - it does not create prerequisites relations (see the separate, much smaller request `OTA-REQ-20260710-priority-prerequisites-mat-chain.md`, filed in the OTA repo, for that curatorial work on a specific priority subset).

Priority:
medium

Blocking:
Nothing urgent breaks without this, but it's the highest-leverage single action available right now - 204 documents worth of registration for what is essentially a scripted import, versus the alternative of one request per document.

Suggested IDs:
n/a - mechanical import of already-declared graphIds, not new curatorial IDs.

Target Export:
exports/entity-registry-0.1.json

Status:
open

Created:
2026-07-10

Curator:
T.P.K.


---
_Resolved 2026-07-12: 204 DOC:OTA registriert (entity-registry v0.1.5); 1 Ausnahme ohne kg:-Block: OTA-RED-0015-2156-EN.md._
