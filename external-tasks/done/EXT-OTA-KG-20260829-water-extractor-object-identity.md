# OTA → KG: technische Objektidentität für Wasserextraktor Typ M registrieren

**Origin:** OTA
**Target:** KUEPER Knowledge Graph
**Status:** done
**Created:** 2026-08-29
**Completed:** 2026-08-30

## Ergebnis

Registriert als `OTYPE:OTA:WASSEREXTRAKTOR-MARS-TYP-M` in `exports/technical-object-identities-0.1.json`.

- externe Objektkennung: `wasserextraktor-mars-typ-m`
- Dossierkennung: `OTA-TEC-0034-WEX-M`
- beschreibendes Dokument: `DOC:OTA:OTA-TEC-0034-2026-DE`
- Consumer: `SYS:KUEPER:noxia`
- Rolle: `buildable`

Der neue kanonische Entitätstyp `ObjectType` / Präfix `OTYPE:` ist in `exports/entity-types-0.1.json` definiert. KG hält Identität und geteilte Relationen; OTA behält Dokumentkörper und technischen Zustand, NOXIA die Spielrepräsentation.

## Umsetzung

- `00a48528` — technische Objektidentitäten registriert
- `d3c4eb9c` — `ObjectType` als kanonischen Entitätstyp ergänzt
