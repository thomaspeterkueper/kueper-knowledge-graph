# OTA → KG: technische Objektidentitäten für Erkundungsrover Typ P und VEX-47 registrieren

**Origin:** OTA
**Target:** KUEPER Knowledge Graph
**Status:** open
**Created:** 2026-08-29
**Related:** `overtime-archive.org/src/content/documents/OTA-TEC-0036-2026-DE.md`
**Related:** `overtime-archive.org/src/content/documents/OTA-TEC-0037-2026-DE.md`
**Related:** `noxiagame/external-tasks/open/OTA-NOX-REQ-20260829-rover-vex-object-mapping.md`

## Objekt 1 — Erkundungsrover Typ P

- Dokument: `DOC:OTA:OTA-TEC-0036-2026-DE`
- externe Objektkennung: `erkundungsrover-mond-typ-p`
- Dossierkennung: `OTA-TEC-0036-ROV-P`
- Kontext/Consumer: NOXIA
- Rolle: `buildable`

## Objekt 2 — VEX-47 Explorationsdrohne

- Dokument: `DOC:OTA:OTA-TEC-0037-2026-DE`
- externe Objektkennung: `vex-47-explorationsdrohne-basistyp`
- Dossierkennung: `OTA-TEC-0037-VEX-47`
- Kontext/Consumer: NOXIA
- Rolle: `buildable`

Zusätzlich beschreibt das VEX-Dossier die individuelle Instanz:

- `instanceId: vex-lain-einheit-01`
- `canonicalId: OTA-TEC-0037-INST-01`
- Relation: `INSTANCE_OF → vex-47-explorationsdrohne-basistyp`

## Benötigte KG-Arbeit

Bitte beide stabile geteilte Objektidentitäten registrieren bzw. an bereits vorhandene passende Entitäten anbinden, ohne OTA-Dokumentkörper oder NOXIA-Spielwerte zu duplizieren.

Für VEX ist die Typ-/Instanzgrenze ausdrücklich Teil der Semantik: Modifikationen, Schäden, Eigentum und emergente Verhaltensmerkmale der Instanz `vex-lain-einheit-01` sind keine Eigenschaften des Typs.

## Source-of-Truth-Regel

- KG: Identität und geteilte Relationen.
- OTA: kanonischer Dokumentkörper und fiktionaler technischer Zustand.
- KUE-SCI/reale Quellen: wissenschaftliche Evidenz.
- NOXIA: lokale Spielrepräsentation und Balancing.

## Akzeptanz

- Beide technischen Objekte sind über stabile KG-Identitäten auflösbar.
- Die jeweiligen `DOC:OTA:*`-Dokumente sind als beschreibende Dokumente verknüpft.
- Die Vex-Instanz ist als `INSTANCE_OF` getrennt vom VEX-47-Typ modelliert.
- NOXIA kann dieselben Objektidentitäten referenzieren, ohne parallelen Kanon anzulegen.
