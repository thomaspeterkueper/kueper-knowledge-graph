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
`LRN:SSF:PHY-1101`'s `assets` field in `kxf-learning-modules-0.1.json` references files that do not exist anywhere:

```json
"assets": {
  "text": ["content/phy-1101/prose.md"],
  "svg": ["assets/svg/wave-overtones.svg", "assets/svg/em-spectrum.svg"]
}
```

Checked directly in the SSF repo - none of these three paths exist. Meanwhile, real assets already exist and are unlinked:

```text
content/modules/ssf-phy-1101.md          - the original hand-authored module content
public/images/observations/wasserglas-tku.jpg
public/images/observations/rolladen-tku.jpg
public/images/observations/cd-spektrum-tku.jpg
public/images/observations/kaffeetasse-tku.jpg
                                          - Thomas's own observation photographs,
                                            already committed, already used as
                                            foundational learning-path content
```

Requested Content:

1. Correct `PHY-1101`'s `assets.text` to point at the real file (`content/modules/ssf-phy-1101.md`) instead of the nonexistent `content/phy-1101/prose.md`.

2. Decide whether `assets.svg` should be dropped (no SVGs exist for this module) or whether the observation photographs should be linked under `assets.image` instead - they are real, relevant, already-committed images, closer in spirit to what this module needs than invented SVG filenames.

3. Given this was found on one module by manual inspection, worth asking generally: do other modules' `assets` fields reference files that were never created? Not auditing all of them here - flagging the pattern so it can be checked systematically rather than one discovery at a time.

Priority:
medium

Blocking:
Nothing breaks today - `assets` isn't yet rendered anywhere in SSF's UI. Worth fixing before it is, so the first real asset-rendering work doesn't inherit dangling references.

Suggested IDs:
n/a

Target Export:
exports/kxf-learning-modules-0.1.json -> records.learning_modules (LRN:SSF:PHY-1101.assets)

Status:
open

Created:
2026-07-10

Curator:
T.P.K.
