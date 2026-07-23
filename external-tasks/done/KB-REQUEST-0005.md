---
id: KB-REQUEST-0005
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:knowledge-graph
type: new_module_request
priority: high
created: 2026-07-20
blocking: [SSF-0021, SSF-0022]
---

# KB-REQUEST-0005 — Neue KXF-Module: Kolonisierung + Stationsbau

## Kontext

NOXIA Phase 2 (Kolonisierung) benötigt zwei neue Lernmodule die noch nicht
im Knowledge Graph existieren.

## Gewünschte Module

### Modul 1: NEU-COLONY-L1-000001

```yaml
id: COLONY-L1-000001
domain: engineering
level: L1
title:
  de: "Wie gründet man eine Kolonie? — Standortwahl, Lebenserhaltung, Erstversorgung"
  en: "How to Found a Colony — Site Selection, Life Support, Initial Supply"
prerequisites:
  - PHY-L1-000003  # Wasserchemie
  - ECO-L0-000001  # Kredite (Kapital nötig)
unlocks:
  - UNL:NOX:COLONY:FOUND
  - UNL:NOX:SHIP:PIONEER
summary: >
  Was braucht eine neue menschliche Siedlung auf dem Mars oder dem Mond?
  Standortkriterien (Ressourcen, Sonnenlicht, Schutz vor Strahlung),
  minimale Lebenserhaltung, Erstversorgung bis die Produktion läuft.
  Warum eine Kolonie in den ersten Wochen besonders verletzlich ist.
```

### Modul 2: NEU-STATION-L1-000001

```yaml
id: STATION-L1-000001
domain: engineering
level: L1
title:
  de: "Raumstationen — Orbit-Mechanik, Andockmanöver, Lebenserhaltung im All"
  en: "Space Stations — Orbital Mechanics, Docking, Life Support in Space"
prerequisites:
  - AST-L1-000001  # Planetologie
  - PHY-L1-000003  # Wasserchemie (Recycling)
unlocks:
  - UNL:NOX:STATION:FOUND
  - UNL:NOX:SHIP:PIONEER
  - UNL:NOX:NAV:ORBITAL
summary: >
  Wie bleibt eine Raumstation in ihrer Umlaufbahn? Was bedeuten LEO, MEO, GEO?
  Wie funktioniert Andocken? Warum ist Wasserrecycling auf einer Station
  überlebenswichtig? Energieerzeugung ohne Atmosphäre.
```

## Priorität

SSF-0021 und SSF-0022 warten auf diese Module.
NOXIA-Gründungs-Gates bleiben deaktiviert bis KG + SSF geliefert haben.


## Erledigt 2026-07-21

- `eng-colony-l1-000001.yaml`: COLONY-L1-000001 angelegt
- `eng-station-l1-000001.yaml`: STATION-L1-000001 angelegt


---
_Nachtrag 2026-07-21 (KG): Der obige "Erledigt"-Vermerk deckte nur learning/*.yaml ab.
COLONY-L1-000001/STATION-L1-000001 fehlten im kanonischen KXF-Export
(exports/kxf-learning-modules-0.1.json) - genau der Datei, die SSF/NOXIA ueber
lib/kxf.ts tatsaechlich konsumieren. Ohne diesen Nachtrag waeren die
NOXIA-Gruendungs-Gates trotz "erledigt" weiter blockiert geblieben.
Nachregistriert als ENG-L1-000003/000004 (Commit 006da89). Separater Befund zur
learning/ vs exports/ Synchronisation als eigener Task angelegt._
