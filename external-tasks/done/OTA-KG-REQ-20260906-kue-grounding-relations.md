---
id: OTA-KG-REQ-20260906-kue-grounding-relations
source: OTA
target: KG
status: done
created: 2026-09-06
completed: 2026-09-06
priority: high
type: relation-registration
---

# OTA → KG: KUE-Realwissenschaftsanker als Grounding-Relationen registrieren

## Ergebnis

Der Request ist KG-seitig abgeschlossen. `exports/relations-grounding-0.1.json` ist die kanonische Source of Truth für OTA→KUE-Realwissenschafts-Groundings.

### Registrierte und freigegebene Relationen

- `DOC:OTA:OTA-TEC-0093-2026-DE` → `DOC:KUE:KUE-SCI-0172-2026-DE`
- `DOC:OTA:OTA-TEC-0082-2026-DE` → `DOC:KUE:KUE-SCI-0173-2026-DE`
- `DOC:OTA:OTA-SCI-0080-2026-DE` → `DOC:KUE:KUE-SCI-0174-2026-DE`
- `DOC:OTA:OTA-TEC-0029-2048-DE` → `DOC:KUE:KUE-SCI-0177-2026-DE`
- `DOC:OTA:OTA-TEC-0019-2091-DE` → `DOC:KUE:KUE-SCI-0178-2026-DE`
- `DOC:OTA:OTA-TEC-0085-2026-DE` → `DOC:KUE:KUE-SCI-0179-2026-DE`
- `DOC:OTA:OTA-TEC-0082-2026-DE` → `DOC:KUE:KUE-SCI-0179-2026-DE`
- `DOC:OTA:OTA-TEC-0090-2026-DE` → `DOC:KUE:KUE-SCI-0180-2026-DE`
- `DOC:OTA:OTA-TEC-0088-2026-DE` → `DOC:KUE:KUE-SCI-0181-2026-DE`
- `DOC:OTA:OTA-TEC-0092-2026-DE` → `DOC:KUE:KUE-SCI-0182-2026-DE`
- `DOC:OTA:OTA-TEC-0082-2026-DE` → `DOC:KUE:KUE-SCI-0182-2026-DE`
- `DOC:OTA:OTA-TEC-0021-2025-DE` → `DOC:KUE:KUE-SCI-0183-2026-DE`

Alle Relationen verwenden `GROUNDED_IN` und respektieren die epistemische Grenze: KUE trägt nur die allgemeine realwissenschaftliche Grundlage; OTA-spezifische `[H]`, `[T]`, `[S]`, `[F]` oder `[OFFEN]`-Setzungen werden dadurch nicht in KUE kanonisiert.

### Nicht freigegebene Relationen

Folgende Kanten wurden aus dem früheren Grounding-Shard entfernt und sind nur noch als `withheldPendingReview` dokumentiert:

- `DOC:KUE:KUE-SCI-0175-2026-DE` ↔ `DOC:OTA:OTA-SCI-0045-2026-DE`, `DOC:OTA:OTA-SCI-0047-2026-DE`, `DOC:OTA:OTA-LSC-0003-2026-DE`
- `DOC:KUE:KUE-SCI-0176-2026-DE` ↔ `DOC:OTA:OTA-SCI-0045-2026-DE`, `DOC:OTA:OTA-SCI-0048-2031-DE`

Sie sind nicht kanonisch aktiv, bis OTA sie fachlich freigibt.

### Konsolidierung

Der frühere Einzel-Export `exports/document-grounding-relations-0.1.json`, der nur `OTA-TEC-0021 → KUE-SCI-0183` enthielt, ist jetzt `superseded`, enthält keine aktiven Records mehr und verweist auf `exports/relations-grounding-0.1.json`.

## KG-Commits

- `7fa89e691de6f9c962b6b12c5ecb317e4e37274d` — freigegebene Groundings reconciliert und Pending-Kanten entfernt
- `1fde8e96817137554ef99ff3673367677c397a86` — konkurrierenden Einzel-Grounding-Export superseded

## Rückgabe

OTA kann den dokumentinternen Grounding-Stand gegen `exports/relations-grounding-0.1.json` abgleichen. Eine Completion-Antwort wird im OTA-Repository unter `external-tasks/open/` bereitgestellt.
