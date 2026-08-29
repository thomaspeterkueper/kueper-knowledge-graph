# SSF → KG: Live-KXF-Export mit kanonischem Raw-Export synchronisieren

**Origin:** Solar Science Foundation (SSF)
**Target:** KUEPER Knowledge Graph (KG)
**Status:** open
**Created:** 2026-08-29
**Priority:** high

## Anlass

SSF konsumiert `exports/kxf-learning-modules-0.1.json` sowohl über die konfigurierte KG-Live-API als auch über den kanonischen GitHub-Raw-Export. Der Raw-Export auf `main` enthält inzwischen Version `0.2.9`, `modified: 2026-08-29T13:45:00+02:00` und unter anderem `UNL:NOX:water-processing` für `LRN:SSF:NOX-WATER-PROCESSING`.

In der produktiven SSF-/NOXIA-Kette wurde weiterhin ein Snapshot ohne diese Zuordnung beobachtet. SSF härtet deshalb lokal die Snapshot-Auswahl, damit ein älterer erfolgreicher Live-Snapshot keinen neueren Raw-Export verdeckt. Die Live-Export-Synchronisation selbst gehört jedoch in das KG-Repository.

## Auftrag

1. Prüfen, welche Quelle der KG-Live-Endpunkt für `kxf-learning-modules-0.1.json` ausliefert.
2. Sicherstellen, dass der Live-Endpunkt mindestens denselben kanonischen Stand wie `exports/kxf-learning-modules-0.1.json` auf `main` ausliefert.
3. Deployment-/Export-Pipeline so korrigieren, dass neue kanonische Exportstände nicht dauerhaft hinter dem Repository-Stand zurückbleiben.
4. Keine neue Modul- oder Unlock-Identität erzeugen; bestehende IDs bleiben maßgeblich.
5. Ursache und Verifikation dokumentieren.

## Akzeptanz

- Live-KXF enthält `LRN:SSF:NOX-WATER-PROCESSING` mit `UNL:NOX:water-processing`.
- Live-Snapshot-Version/-Zeitstempel ist nicht älter als der kanonische Raw-Export zum Verifikationszeitpunkt.
- Der Fehler ist als Deployment-/Export-Synchronisationsproblem behoben oder belastbar widerlegt.
