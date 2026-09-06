---
id: OTA-KG-REQ-20260906-kue-grounding-relations-r2
source: OTA
target: KG
status: done
created: 2026-09-06
completed: 2026-09-06
priority: high
type: relation-registration
follows_up: OTA-KG-REQ-20260906-kue-grounding-relations
---

# OTA → KG: Nach Review zurückgehaltene UPE-/mtDNA-Groundings freigeben

## Ergebnis

Die fünf fachlich freigegebenen Kanten wurden in `exports/relations-grounding-0.1.json` v0.1.2 als aktive `GROUNDED_IN`-Relationen registriert:

- `DOC:OTA:OTA-SCI-0045-2026-DE` → `DOC:KUE:KUE-SCI-0175-2026-DE`
- `DOC:OTA:OTA-SCI-0047-2026-DE` → `DOC:KUE:KUE-SCI-0175-2026-DE`
- `DOC:OTA:OTA-LSC-0003-2026-DE` → `DOC:KUE:KUE-SCI-0175-2026-DE`
- `DOC:OTA:OTA-SCI-0045-2026-DE` → `DOC:KUE:KUE-SCI-0176-2026-DE`
- `DOC:OTA:OTA-SCI-0048-2031-DE` → `DOC:KUE:KUE-SCI-0176-2026-DE`

`withheldPendingReview` ist damit leer. Es wurden keine Duplikate erzeugt.

## Epistemische Grenze

`GROUNDED_IN` bedeutet ausschließlich, dass der jeweilige KUE-Knoten die allgemeine Realwissenschaftsgrundlage trägt. Λ-Haplogruppe, UPE-Kohärenz, FSS, EIQM-2031, Halo-Brücke und transgenerationale Aktivierungslogik bleiben OTA `[T]/[H]/[S]/[F]/[OFFEN]` und werden durch die Relation nicht zu KUE-Kanon.

## KG-Nachweis

- `exports/relations-grounding-0.1.json` v0.1.2
- KG commit `e1a692f0393ed9707e4d27e3a355428781f79145`
