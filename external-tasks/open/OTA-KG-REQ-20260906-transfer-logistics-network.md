---
id: OTA-KG-REQ-20260906-TRANSFER-LOGISTICS-NETWORK
title: Register OTA transfer logistics network and core relations
status: open
source: OTA
target: KUEPER Knowledge Graph
created: 2026-09-06
priority: normal
---

## Neue OTA-Entität

Bitte registrieren:

- document: `OTA-TEC-0122-2026-DE`
- graphId: `DOC:OTA:OTA-TEC-0122-2026-DE`
- canonicalId: `OTA-TEC-0122-TRANSFER-NETWORK`
- objectId: `solar-transfer-logistics-network`
- class: technical infrastructure / logistics network
- status: `ENTWURF`
- context: NOXIA

## Kernrelationen

`OTA-TEC-0122` erweitert die in `OTA-TEC-0025-2050-DE` beschriebene cislunare Infrastruktur zu einem systemweiten Transferlogistikmodell.

Bitte folgende Relationen als dokumentarische Struktur registrieren, soweit die Zielentitäten im KG bereits auflösbar sind:

- `EXPANDS` -> `OTA-TEC-0025-2050-DE`
- `USES/REFERENCES` -> `OTA-TEC-0083-2026-DE` Starport-Launcher
- `USES/REFERENCES` -> `OTA-TEC-0082-2026-DE` CYGNUS
- `USES/REFERENCES` -> `OTA-TEC-0084-2026-DE` PELICAN
- `USES/REFERENCES` -> `OTA-TEC-0016-2063-DE` KITE
- `USES/REFERENCES` -> `OTA-TEC-0087-2026-DE` Gateway EML-2
- `RELATED_TO` -> `OTA-TEC-0092-2026-DE` Pioneer-Kombifahrzeug
- `RELATED_TO` -> `OTA-TEC-0112-2026-DE` bis `OTA-TEC-0116-2026-DE` NOXIA-Schiffsrahmen

## Noch nicht registrieren

Die im Dossier genannten möglichen neuen Klassen — Orbital Shuttle, Cargo Tug, Depot Tender/Tanker, Hub-to-Hub Shuttle, Mars Orbital Transfer Vehicle, interplanetare Transferklasse, Rescue Vehicle und Mars Orbital Hub — sind noch **keine freigegebenen kanonischen Entitäten**.

Sie werden derzeit durch KUEPER Engineering im Request `EXT-OTA-ENG-20260906-transfer-logistics-network-closure.md` geprüft. Erst nach einem OTA-Canonicalization-/Decision-Request stabile neue Identitäten anlegen.
