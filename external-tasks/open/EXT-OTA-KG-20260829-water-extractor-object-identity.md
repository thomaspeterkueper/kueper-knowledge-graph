# OTA → KG: technische Objektidentität für Wasserextraktor Typ M registrieren

**Origin:** OTA
**Target:** KUEPER Knowledge Graph
**Status:** open
**Created:** 2026-08-29
**Related:** `overtime-archive.org/src/content/documents/OTA-TEC-0034-2026-DE.md`
**Related:** `noxiagame/external-tasks/open/OTA-NOX-REQ-20260829-water-extractor-object-mapping.md`

## Anlass

OTA-TEC-0034 führt erstmals ein explizit maschinen-gemapptes technisches Objekt für NOXIA.

Dokumentidentität:

`DOC:OTA:OTA-TEC-0034-2026-DE`

Objektidentität im OTA-Dossier:

`wasserextraktor-mars-typ-m`

Dossier-Identität:

`OTA-TEC-0034-WEX-M`

## Benötigte KG-Arbeit

Bitte die stabile geteilte Identität des technischen Objekts registrieren bzw. an ein bereits vorhandenes passendes Objekt anbinden, ohne den OTA-Dokumentkörper zu duplizieren.

Mindestens abzubilden:

- Dokument `DOC:OTA:OTA-TEC-0034-2026-DE` beschreibt das Objekt,
- stabile externe Objektkennung `wasserextraktor-mars-typ-m`,
- Kontext/Consumer `NOXIA`, Rolle `buildable`,
- Relation des Objekts zum OTA-Dokument,
- spätere technische Relationen können aus Abschnitt 22 des Dossiers schrittweise übernommen werden.

## Source-of-Truth-Regel

- KG: Identität und geteilte Relationen.
- OTA: kanonischer Dokumentkörper und fiktionaler technischer Zustand.
- KUE-SCI/reale Quellen: wissenschaftliche Evidenz.
- NOXIA: lokale Spielrepräsentation und Balancing.

Keine Volltexte, keine NOXIA-Spielwerte und keine wissenschaftlichen Publikationen in KG duplizieren.

## Akzeptanz

- Das Objekt ist über eine stabile KG-Identität auflösbar.
- `DOC:OTA:OTA-TEC-0034-2026-DE` ist als beschreibendes Dokument verknüpft.
- NOXIA kann dieselbe Objektidentität referenzieren, ohne einen zweiten Kanon anzulegen.
