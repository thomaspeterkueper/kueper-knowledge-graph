---
id: SSF-KG-REQ-20260901-001
title: Verbleibende SSF-KNOW-Domains kanonisch klassifizieren
status: done
source: SSF
target: KG
created: 2026-09-01
completed: 2026-09-01
priority: high
affects: [KG, SSF]
---

## Ergebnis

KG hat die vier verbliebenen SSF-Legacy-Domains klassifiziert und den maschinenlesbaren Vertrag `exports/legacy-knowledge-domain-mappings-0.1.json` auf Version 0.1.1 erweitert.

Zuordnung:

- `KNOW:CHE-REACTIONS` -> `KD:CHM:N1` (`maps_existing`)
- `KNOW:CHE-ORGANIC` -> `KD:CHM:N1` (`maps_existing`)
- `KNOW:PHY-SURFACE-TENSION` -> `KD:PHYS:N1` (`maps_existing`)
- `KNOW:PHY-CAPILLARITY` -> `KD:PHYS:N1` (`maps_existing`)

Begründung: Die vier Legacy-Bezeichnungen werden im aktuellen SSF-Foundation-Kontext hinreichend durch die vorhandenen breiten kanonischen Domains abgedeckt. Eine neue schmale `KD:*`-Identität wäre derzeit nicht durch einen stabilen systemübergreifenden Scope gerechtfertigt. Spezifische Fachkonzepte können unabhängig davon als `CON:*` modelliert werden; eine spätere N2-Domain kann bei einem belastbaren Curriculum-Cluster angefordert werden.

## KG-Commit

- `847fbe3ce3e0055573efb1da34ea606cea37da5f` — Legacy-Migrationsvertrag v0.1.1 mit 43 klassifizierten Legacy-IDs.

## Rückgabe an SSF

SSF kann die Quarantäne für `PATH:SSF:CHE-KUECHE-MAILLARD-0001` und `PATH:SSF:PHY-WASSER-OBERFL-0001` entfernen, sobald deren `domainsNeeded` ausschließlich die oben genannten kanonischen `KD:*`-IDs verwendet.
