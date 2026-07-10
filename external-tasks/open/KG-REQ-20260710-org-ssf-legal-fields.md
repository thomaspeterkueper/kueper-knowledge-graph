KB-REQUEST

ID:
REQ:L3:PENDING

Requester:
SYS:KUEPER:ssf

Recipient:
SYS:KUEPER:knowledge-graph

Request Type:
legal_request

Purpose:
`app/imprint/page.tsx` and `app/legal/privacy/page.tsx` already read legal data from `ORG:SSF` via `getLegalProjectInfo()` (`lib/legal.ts`), and the wiring works - but `ORG:SSF` in `exports/kxf-0.1.json` currently has only `id`, `type`, `name`. Every other field the code expects is missing, so both pages silently render SSF's hardcoded fallback while claiming `Source: KUEPER Knowledge Graph` at the bottom - misleading about where the content actually came from.

This request exists specifically to get the real values from you rather than SSF inventing or guessing them. A German Impressum (SS 5 DDG) needs to name a real, reachable person or entity - SSF will not fill this page with placeholder-shaped but fake-looking content.

Requested Content:

Please provide the following for `ORG:SSF`, to be added as fields on that entity:

```text
operatorName    Full name/legal form to display for SS 5 DDG purposes.
                Presumed "Thomas Peter Kueper" per existing docs/BRAND.md -
                confirm or correct.

postalAddress   Real postal address (street, postal code, city, country).
                Required for the Impressum; SSF has no current value and
                will not fabricate one.

contactEmail    A real, reachable email address for the Impressum's
                "schnelle elektronische Kontaktaufnahme" requirement.

phoneNumber     Optional. Email alone is generally sufficient, but flagging
                in case you want one listed.

websiteUrl      Confirm canonical domain. Current fallback assumes
                https://solarsciencefoundation.vercel.app - if a custom
                domain (e.g. solarsciencefoundation.org, referenced
                elsewhere in NOXIA's code per NOX-0003) is the intended
                canonical one, say so here so both systems agree.

privacyUrl      Defaults to {websiteUrl}/legal/privacy unless you want a
                different path.

imprintUrl      Defaults to {websiteUrl}/imprint unless you want a
                different path.

statusNote      Optional short status line shown on both pages. Current
                fallback: "Independent science learning project. Not an
                accredited institution." - keep or replace.
```

Once these are set on `ORG:SSF`, no SSF code change is needed for the content itself to become real - `getLegalProjectInfo()` already reads them. The only SSF-side change needed is separate (`SSF-0005`: extend the `LegalProjectInfo` type with `contactEmail`/`postalAddress`, since those two are not yet in the type at all, and fix the dead footer links) - filing that separately, not part of this request.

Priority:
high

Blocking:
The Impressum and privacy pages are effectively non-functional today (dead footer links) and, once the links are fixed, would display literal placeholder strings until this is answered. Both are legally-relevant pages, not cosmetic ones.

Suggested IDs:
n/a - field values on an existing entity, not new entities.

Target Export:
exports/kxf-0.1.json -> records.entities (ORG:SSF)

Status:
open

Created:
2026-07-10

Curator:
T.P.K.
