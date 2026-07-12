KB-REQUEST

Status: closed - moot, superseded by a cleaner design

## Resolution

Checked before acting further: SSF's actual live legal pages no longer read
`ORG:SSF` from `kxf-0.1.json` at all. `lib/legal.ts` (v1.1.0, sourced from
`REQ-KG-LEGAL-ACCESS-20260710`) now reads a centralized
`registry/legal/impressum-master.json`, shared across SSF, NOXIA, OTA,
kueper-com, contracomology and thomas-kueper. That file carries no URL field
at all - just name, address, email - and the website URL is built separately
in `lib/legal.ts` from a hardcoded `SITE_URL` constant, which is already
correctly `https://solarsciencefoundation.vercel.app`.

`ORG:SSF`'s stale `.org` fields (the original problem this request
described) are real but no longer consequential - nothing live reads them
for this purpose anymore. Not fixing them retroactively; noting this so
nobody rediscovers the same "why does ORG:SSF say .org" question and assumes
it's still live-relevant.

Original request preserved below for context.

---

ID:
REQ:L3:PENDING

Requester:
SYS:KUEPER:ssf

Recipient:
SYS:KUEPER:knowledge-graph

Request Type:
mapping_request

Purpose:
`ORG:SSF` (`exports/kxf-0.1.json`) currently has `websiteUrl`, `privacyUrl`, `imprintUrl` all pointing at `solarsciencefoundation.org`. This domain is not connected to anything - nothing resolves there.

Status: superseded, see Resolution above.
