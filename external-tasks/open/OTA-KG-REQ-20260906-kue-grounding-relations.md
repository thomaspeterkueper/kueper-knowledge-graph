---
id: OTA-KG-REQ-20260906-kue-grounding-relations
source: OTA
target: KG
status: open
created: 2026-09-06
priority: high
type: relation-registration
---

# OTA → KG: KUE-Realwissenschaftsanker als Grounding-Relationen registrieren

## Anlass

OTA arbeitet den KUE→OTA-Grounding-Block `EXT-KUE-OTA-20260831-001` ab. KUE bleibt Source of Truth für die allgemeine Realwissenschaft, OTA für die konkrete Archiv-/In-Universe-Schicht. Die stabilen Relationen sollen deshalb zusätzlich zur dokumentinternen Referenz im Knowledge Graph registriert werden.

## Bereits fachlich freigegebene Groundings

Bitte nach KG-Governance als `GROUNDED_IN`, `GROUNDED_BY` oder semantisch äquivalente Relation registrieren:

- `DOC:OTA:OTA-TEC-0093-2026-DE` → `DOC:KUE:KUE-SCI-0172-2026-DE`
- `DOC:OTA:OTA-TEC-0082-2026-DE` → `DOC:KUE:KUE-SCI-0173-2026-DE`
- `DOC:OTA:OTA-SCI-0080-2026-DE` → `DOC:KUE:KUE-SCI-0174-2026-DE`
- `DOC:OTA:OTA-TEC-0029-2048-DE` → `DOC:KUE:KUE-SCI-0177-2026-DE`
- `DOC:OTA:OTA-TEC-0019-2091-DE` → `DOC:KUE:KUE-SCI-0178-2026-DE`
- `DOC:OTA:OTA-TEC-0085-2026-DE` → `DOC:KUE:KUE-SCI-0179-2026-DE`
- `DOC:OTA:OTA-TEC-0082-2026-DE` → `DOC:KUE:KUE-SCI-0179-2026-DE` (ergänzender Antriebsanker)
- `DOC:OTA:OTA-TEC-0090-2026-DE` → `DOC:KUE:KUE-SCI-0180-2026-DE`
- `DOC:OTA:OTA-TEC-0088-2026-DE` → `DOC:KUE:KUE-SCI-0181-2026-DE`
- `DOC:OTA:OTA-TEC-0092-2026-DE` → `DOC:KUE:KUE-SCI-0182-2026-DE`
- `DOC:OTA:OTA-TEC-0082-2026-DE` → `DOC:KUE:KUE-SCI-0182-2026-DE` (ergänzender Architekturanker)
- `DOC:OTA:OTA-TEC-0021-2025-DE` → `DOC:KUE:KUE-SCI-0183-2026-DE`

## Noch nicht freigeben

Die folgenden Relationen bitte noch **nicht** registrieren, bis OTA die fachliche Prüfung abgeschlossen hat:

- `KUE-SCI-0175` → `OTA-SCI-0045`, `OTA-SCI-0047`, `OTA-LSC-0003`
- `KUE-SCI-0176` → `OTA-SCI-0045`, `OTA-SCI-0048`

## Epistemische Grenze

Die Grounding-Relation bedeutet nur: Der KUE-Knoten trägt die allgemeine `[R]`-Grundlage. Sie bedeutet ausdrücklich nicht, dass OTA-spezifische `[H]`, `[T]`, `[S]`, `[F]` oder `[OFFEN]`-Aussagen in KUE kanonisiert werden.

## Rückgabe

Nach Registrierung bitte Completion-Request/Response an OTA erzeugen, damit die Relationsebene mit dem dokumentinternen Grounding-Stand abgeglichen werden kann.
