# OTA → KG: technische Objektidentitäten für Erkundungsrover Typ P und VEX-47 registrieren

**Origin:** OTA
**Target:** KUEPER Knowledge Graph
**Status:** done
**Created:** 2026-08-29
**Completed:** 2026-08-30

## Ergebnis

In `exports/technical-object-identities-0.1.json` registriert:

- `OTYPE:OTA:ERKUNDUNGSROVER-MOND-TYP-P` → `erkundungsrover-mond-typ-p` → `DOC:OTA:OTA-TEC-0036-2026-DE`
- `OTYPE:OTA:VEX-47-EXPLORATIONSDROHNE` → `vex-47-explorationsdrohne-basistyp` → `DOC:OTA:OTA-TEC-0037-2026-DE`
- `OBJ:OTA:VEX-LAIN-EINHEIT-01` → `vex-lain-einheit-01`, Source-ID `OTA-TEC-0037-INST-01`
- Relation: `OBJ:OTA:VEX-LAIN-EINHEIT-01 INSTANCE_OF OTYPE:OTA:VEX-47-EXPLORATIONSDROHNE`

Damit sind Typ und individuelle Instanz ausdrücklich getrennt. Schäden, Eigentum, Modifikationen und emergente Instanzzustände werden nicht auf den VEX-47-Typ übertragen.

Der kanonische Entitätstyp `ObjectType` / Präfix `OTYPE:` ist in `exports/entity-types-0.1.json` definiert.

## Umsetzung

- `00a48528` — technische Objektidentitäten registriert
- `d3c4eb9c` — `ObjectType` als kanonischen Entitätstyp ergänzt
