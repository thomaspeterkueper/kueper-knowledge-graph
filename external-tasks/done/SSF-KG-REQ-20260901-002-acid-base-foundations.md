---
id: SSF-KG-REQ-20260901-002-ACID-BASE-FOUNDATIONS
title: Kanonische KnowledgeDomains und Lernmodul-Identitäten für Säure/Base-Grundlagen bereitstellen
status: done
source: SSF
target: KG
created: 2026-09-01
completed: 2026-09-01
priority: high
affects: [KG, SSF, NOXIA]
---

## Ergebnis

KG hat `exports/chemistry-acid-base-0.1.json` angelegt.

Kanonische Domains:
- `KD:CHM-ACID-BASE:N2`
- `KD:CHM-CARBONATE:N2`

Kanonische Grundlagenmodule:
- `CHM-L1-000001` — Säure/Base-Einstieg
- `CHM-L1-000002` — pH-Grundlage; requires `CHM-L1-000001`
- `CHM-L1-000003` — Neutralisation; requires `CHM-L1-000001` und `CHM-L1-000002`

Der vorhandene SSF-Pfad `PATH:SSF:CHE-REINIGUNG-KALK-0001` ist als Anwendung auf `KD:CHM-ACID-BASE:N2` und `KD:CHM-CARBONATE:N2` eingeordnet und setzt die Grundlagen zu Säure/Base und pH voraus.

pH wird chemisch als logarithmisches Konzept geführt; `KD:PHY-PH` ist keine kanonische Ersatz-ID.

KG commit: `53ec208d249803a02fd84f5e627677820624e809`.
