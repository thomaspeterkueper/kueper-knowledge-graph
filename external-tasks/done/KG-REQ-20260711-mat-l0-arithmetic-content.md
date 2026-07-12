KB-REQUEST

ID:
REQ:L3:PENDING

Requester:
SYS:KUEPER:ssf

Recipient:
SYS:KUEPER:knowledge-graph

Request Type:
content_request

Purpose:
Observed directly in NOXIA: the "School" mini-game generates simple calc tasks (addition/subtraction word problems, e.g. cargo trade profit) and tries to show a matching SSF module. None is found, because no built module exists below `MAT-L0-000001 "Zahlen und Muster"` - and that module itself is still `status: "planned"`, no content, no `entry_question`. It is structurally the right floor (lowest MAT id, no prerequisites) but functionally empty.

This is not a request for a new module - the correct id already exists in the right position in the tree. It is a request to actually build it.

Requested Content:

Real content for `MAT-L0-000001`, specifically covering basic arithmetic (addition, subtraction; multiplication/division if it still fits an L0 scope) as the entry point, not just abstract "numbers and patterns" framing - concrete enough that it would genuinely help a NOXIA player who got stuck on a trade-profit calculation.

Minimum to make it real:
- `entry_question` set (currently null)
- `assets.text` pointing at an actual prose file (checked - none exists yet, same gap flagged before for other modules)
- at minimum one worked example matching the kind of arithmetic NOXIA actually generates (a small trade/resource calculation), since that is the concrete situation this module needs to answer for

Priority:
high

Blocking:
This is the only thing currently stopping NOXIA's School feature from ever showing a real SSF module for its most common task type (calc tasks make up ~40% of generated tasks per `app/api/game/school/route.ts`'s own ratio). A separate NOXIA-side domain-mapping bug also blocks this today (filed separately, `NOX-0007`) - both need fixing for the connection to actually work end to end.

Suggested IDs:
n/a - MAT-L0-000001 already exists.

Target Export:
exports/kxf-learning-modules-0.1.json -> records.learning_modules (MAT-L0-000001)

Status:
open

Created:
2026-07-11

Curator:
T.P.K.


---
_Resolved 2026-07-12: MAT-L0-000001 auf built; Prosa content/modules/ssf-mat-1001.md (Arithmetik + Handelsbeispiel)._
