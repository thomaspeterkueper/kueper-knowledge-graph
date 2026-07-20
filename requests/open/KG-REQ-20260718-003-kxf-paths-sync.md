# KG-REQ-20260718-003 — kxf-learning-paths-0.1.json auf SSF v1.0.2 synchronisieren

```yaml
id: REQ:L3:20260718-003
type: Request
layer: L3
requester: SYS:KUEPER:ssf
requestType: export_update
purpose: >
  exports/kxf-learning-paths-0.1.json ist auf einem alten Stand.
  SSF learningPaths.ts ist bei v1.0.2 mit 50 Pfaden.
  Der Export muss alle registrierten Pfade mit ID, Titel,
  Cluster, unlocks und Status enthalten.
requestedContent:
  - Vollstaendige Aktualisierung kxf-learning-paths-0.1.json
  - Alle 50 PATH:SSF:* IDs mit Metadaten
  - unlocks-Mapping: welcher Pfad schaltet welche NOXIA-Keys frei
  - Cluster-Zuordnung als Feld
priority: medium
blocking: >
  NOXIA-Unlock-Derivation liest aus KXF-Export. Wenn 32 der 50 Pfade
  nicht im Export sind, koennen deren NOXIA-Keys nicht automatisch
  aus KG abgeleitet werden.
suggestedIds: []
targetExport: exports/kxf-learning-paths-0.1.json
status: done
created: 2026-07-18
curator: T.P.K.
createdObjects: []
notes: >
  Referenz: thomaspeterkueper/solarsciencefoundation/lib/learningPaths.ts
  Version: 1.0.2 (Stand 2026-07-18)
  Anzahl Pfade: 50
  Anzahl NOXIA-Keys (unlocks): 119 unique Keys
```

## Erwartetes Export-Format pro Eintrag

```json
{
  "id": "PATH:SSF:PHY-WASSER-MOLEKUEL-0001",
  "title": "Warum ist Wasser eigentlich so seltsam",
  "cluster": "wasser",
  "status": "prototype",
  "units": 2,
  "unlocks": ["CHEM:WATER-MOLECULE", "CHEM:HYDROGEN-BOND", "CHEM:DIPOLE"],
  "domainsNeeded": ["KD:PHY-MOLECULAR", "KD:PHY-POLARITY", "KD:CHE-HYDROGEN-BOND"]
}
```


## Erledigt

Erledigt 2026-07-20: kxf-learning-paths-0.1.json v0.2.0 generiert mit 60 Pfaden, Cluster-Zuordnung, unlocks-Array, kxfModuleId-Mapping. SSF-Quelle: lib/learningPaths.ts v1.2.4.
