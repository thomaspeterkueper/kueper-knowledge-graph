KB-REQUEST

ID:
REQ:L3:PENDING

Requester:
SYS:KUEPER:ssf

Recipient:
SYS:KUEPER:knowledge-graph

Request Type:
mapping_request

Purpose:
`ORG:SSF` (`exports/kxf-0.1.json`) currently has `websiteUrl`, `privacyUrl`, `imprintUrl` all pointing at `solarsciencefoundation.org`. This domain is not connected to anything - nothing resolves there. SSF, OTA and NOXIA are explicitly staying on their Vercel subdomains until the test phase ends (confirmed directly, 2026-07-11).

This isn't a missing record - `kueper-ecosystem/registry/projects.json` already has the correct value:

```json
{ "id": "ssf", "production_url": "https://solarsciencefoundation.vercel.app" }
```

`ORG:SSF` simply doesn't match it. `EXT-ECO-KG-20260712-001` confirmed "real values" for `ORG:SSF` but the domain fields stayed on `.org` regardless - the registry's already-correct answer wasn't consulted or was overridden.

Requested Content:

1. Correct `ORG:SSF`'s three URL fields to match `registry/projects.json`:

```text
websiteUrl:  https://solarsciencefoundation.vercel.app
privacyUrl:  https://solarsciencefoundation.vercel.app/legal/privacy
imprintUrl:  https://solarsciencefoundation.vercel.app/imprint
```

2. Treat `kueper-ecosystem/registry/projects.json` as the single source of truth for production domain values across the ecosystem going forward. Any future request confirming legal/contact data for `ORG:SSF` (or any other project entity) should read the domain from there rather than re-deciding it independently - that's what let the wrong value back in this time despite the correct one already existing.

3. When SSF, OTA or NOXIA do get real custom domains, update `registry/projects.json` first - every other reference (`ORG:SSF` included) should follow it, not the other way around.

Priority:
high

Blocking:
SSF's live Impressum and privacy pages currently display a URL that resolves to nothing. Legally-relevant pages linking to themselves via a dead domain is worse than a plain routing bug - it looks deliberate.

Suggested IDs:
n/a - field correction on an existing entity.

Target Export:
exports/kxf-0.1.json -> records.entities (ORG:SSF)

Status:
open

Created:
2026-07-12

Curator:
T.P.K.
