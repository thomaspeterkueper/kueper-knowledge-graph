# OTA-KG-REQ-20260911 — Utopia Mars Industrial Corridor

**Status:** open  
**From:** OTA  
**To:** KUEPER Knowledge Graph  
**Date:** 2026-09-11  
**Source PR:** https://github.com/thomaspeterkueper/overtime-archive.org/pull/60

## Neu zu registrieren

- `OTA-SCI-0090-2026-DE — Utopia Planitia — Subsurface Ice and Settlement Potential`
- `OTA-HIS-0004-2021-DE — Von Zhurong nach Utopia — chinesische Marsinfrastruktur 2021–2087`
- `OTA-META-0004-2076-DE — Utopia-Siedlung — Entwicklungsprofil der zweiten Marsstadt`
- `OTA-HIS-0005-2050-DE — Mars Industrial Independence — von Reparatur zu reproduktionsfähiger Infrastruktur`
- `OTA-ORG-0008-2087-DE — Mars Council — Kompetenzverschiebung während der Großen Stille`

## Kernentitäten

Bitte semantisch modellieren, ohne vorläufige Werte zu kanonisieren:

- `LOCATION: Utopia Planitia`
- `LOCATION/SETTLEMENT: Utopia-Siedlung` — vorläufige OTA-Bezeichnung; endgültiger chinesischer Name `[OFFEN]`
- `LOCATION/SETTLEMENT: Iterius Prime`
- `ORGANIZATION: Mars Council`
- `MISSION: Tianwen-1 / Zhurong`
- `CONCEPT: Mars Industrial Depth`
- `CONCEPT: Repair Independence`
- `CONCEPT: Local Spare-Part Capability`
- `CONCEPT: Mars-wide Emergency Coordination`

## Relationen

Mindestens:

- `Zhurong` OCCURS_AT / LANDED_AT `Utopia Planitia`
- `OTA-SCI-0090` GROUNDS `OTA-META-0004`
- `OTA-HIS-0004` HISTORICALLY_CONTEXTUALIZES `OTA-META-0004`
- `Utopia-Siedlung` LOCATED_IN `Utopia Planitia`
- `Utopia-Siedlung` COMPLEMENTS `Iterius Prime`
- `OTA-HIS-0005` CONTEXTUALIZES `OTA-TEC-0089-2026-DE`
- `Mars Council` COORDINATES `Utopia-Siedlung`
- `Mars Council` COORDINATES `Iterius Prime`
- `OTA-ORG-0008` CONTEXTUALIZES `OTA-HIS-0003-2087-DE`
- `Maryem Hamid` BORN_AT `Utopia-Siedlung` **nur provisional**, bis OTA-META-0004/Autorenkanon aktiviert ist.

## Zeitliche Modellierung

Bitte nicht einen einzigen Gründungspunkt erzwingen. Für Utopia getrennte Events/Phasen vorsehen:

1. robotische Standortvorbereitung ca. 2072–2075 `[P]`
2. erste permanente Besatzung ca. 2076/77 `[P]`
3. Familienfähigkeit spätestens 2080 `[P]`
4. Krisen-/Koordinationsphase 2087 `[P/K-Anschluss]`
5. etablierte internationale Stadt 2091 `[P]`

## Epistemische Grenze

- Zhurong 2021 und die referenzierten Mars-/CNSA-Daten sind reale Ausgangspunkte.
- Die Utopia-Siedlung, ihre Bevölkerungswerte und ihr politischer Entwicklungspfad sind NOXIA-Fortschreibung.
- `45°N / 110°E` ist nur Suchzentrum für Standortprüfung, **keine kanonische Stadtkoordinate**.
- Der endgültige chinesische Stadtname bleibt offen.