# KG-REQ-20260719-noxia-unlock-mapping

**ID:** KG-REQ-20260719-noxia-unlock-mapping
**Requester:** SYS:KUEPER:noxia
**Recipient:** SYS:KUEPER:knowledge-graph
**Created:** 2026-07-19
**Priority:** HIGH — blockiert Alpha → Beta Transition
**Status:** open

## Anlass

NOXIA ist bereit die Alpha zu verlassen. Das letzte fehlende Glied:
**KXF-Module haben keine `unlocks`-Felder** im Export.

Die Kette SSF → NOXIA sieht so aus:
```
Spieler schließt SSF-Modul ab
  → SSF ruft buildUnlocks(completedModuleIds) auf
  → buildUnlocks liest learningModule.unlocks aus KXF
  → KXF hat keine unlocks → leere Liste
  → NOXIA bekommt keine Freischaltungen
```

## Gewünschte Änderung

`exports/kxf-learning-modules-0.1.json` — jedes Modul bekommt ein
`unlocks`-Array mit `UNL:NOX:*` Keys.

## Mapping (von NOXIA spezifiziert)

| Modul-ID | Titel (de) | NOXIA Unlocks |
|----------|------------|---------------|
| `ECO-L0-000001` | Was ist ein Kredit? | `UNL:NOX:bank-credit` |
| `ECO-L0-000002` | Zins und Zinseszins | `UNL:NOX:bank-compound` |
| `PHY-L1-000001` | Was die Welt aus sich macht | `UNL:NOX:SENSOR:SPECTRAL`, `UNL:NOX:SENSOR:WAVE` |
| `PHY-L1-000002` | Licht als Informationsträger | `UNL:NOX:SENSOR:SPECTRAL`, `UNL:NOX:MISSION:OBSERVATION-DECK` |
| `PHY-L1-000003` | Warum ist Wasser eigentlich so seltsam | `UNL:NOX:CHEM:WATER-MOLECULE`, `UNL:NOX:CHEM:HYDROGEN-BOND` |
| `PHY-L1-000004` | Warum hat Wasser genau drei Formen | `UNL:NOX:PHY:PHASE-DIAGRAM`, `UNL:NOX:PHY:TRIPLE-POINT` |
| `PHY-L1-000005` | Warum platzen Wasserleitungen im Winter | `UNL:NOX:PHY:DENSITY-ANOMALY`, `UNL:NOX:PHY:ICE-STRUCTURE` |
| `PHY-L1-000006` | Warum kann eine Büroklammer schwimmen | `UNL:NOX:PHY:SURFACE-TENSION`, `UNL:NOX:PHY:CAPILLARY-ACTION` |
| `PHY-L1-000007` | Warum trocknet Wäsche im Winter | `UNL:NOX:PHY:SUBLIMATION`, `UNL:NOX:PHY:VAPOR-PRESSURE` |
| `PHY-L1-000008` | Warum braucht Wasser so lange zum Kochen | `UNL:NOX:PHY:HEAT-CAPACITY`, `UNL:NOX:PHY:LATENT-HEAT` |
| `CHE-L1-000001` | Was Wasser so besonders macht | `UNL:NOX:CHEM:DIPOLE`, `UNL:NOX:CHEM:HYDRATION` |
| `CHE-L1-000002` | Warum löst Wasser fast alles | `UNL:NOX:CHEM:SOLUBILITY`, `UNL:NOX:CHEM:ION-DISSOLUTION`, `UNL:NOX:CHEM:SURFACTANT` |
| `AST-L1-000001` | Orientierung Planetologie | `UNL:NOX:NAV:ORBITAL`, `UNL:NOX:SENSOR:ATMOSPHERE` |
| `MAT-L0-000001` | Zahlen und Muster | `UNL:NOX:MATH:LGS` |
| `MAT-L0-000002` | Algebra Grundlagen | `UNL:NOX:ANALYSIS:MATRIX` |
| `MAT-L0-000003` | Geometrie Grundlagen | `UNL:NOX:NAV:CURVATURE` |
| `MAT-L1-000001` | Funktionen verstehen | `UNL:NOX:SIGNAL:FOURIER` |
| `MAT-L1-000002` | Statistik Grundlagen | `UNL:NOX:ANALYSIS:ERROR` |
| `MAT-L2-000003` | Differentialgleichungen | `UNL:NOX:SENSOR:GEODESIC` |
| `PHY-L2-000002` | Elektromagnetismus | `UNL:NOX:TOOL:ELECTROMAGNET`, `UNL:NOX:SENSOR:MAGNETIC` |
| `EAR-L2-000001` | Planetare Seismologie | `UNL:NOX:SENSOR:STRAIN`, `UNL:NOX:SENSOR:STRESS` |
| `EAR-L2-000002` | Petrologie | `UNL:NOX:SENSOR:SPECTRAL`, `UNL:NOX:MAT:HARDNESS-SCALE` |

## Gewünschtes Format im KXF-Export

```json
{
  "id": "ECO-L0-000001",
  "title": { "de": "Was ist ein Kredit?", "en": "What Is a Loan?" },
  "unlocks": ["UNL:NOX:bank-credit"]
}
```

## NOXIA-Seite (bereits implementiert)

- `lib/knowledge/data.ts` v0.3.0 — alle `UNL:NOX:*` Keys als TypeScript-Konstanten
- `app/api/ssf/unlocks/check/route.ts` — POST an SSF, erwartet `unlocks[]` in Response
- `app/api/game/knowledge/route.ts` — schreibt Abschlüsse in `academy_completions`

## Was nach KG-Umsetzung passiert

1. SSF `buildUnlocks(completedModules)` gibt echte `UNL:NOX:*` Keys zurück
2. NOXIA prüft nach Modul-Abschluss: welche Keys sind jetzt freigeschaltet?
3. Keys werden in `player_unlocks` gespeichert (neue Tabelle — NOX-NEXT-0001)
4. Gebäude/Features prüfen Keys beim Laden

## Blocks

- Alpha → Beta Transition
- `UNL:NOX:bank-credit` Gate (Bank-Kredit-Tab)
- `UNL:NOX:SENSOR:SPECTRAL` Gate (Scanner-Detailansicht)
- `UNL:NOX:NAV:ORBITAL` Gate (erweiterte Reiserouten)
