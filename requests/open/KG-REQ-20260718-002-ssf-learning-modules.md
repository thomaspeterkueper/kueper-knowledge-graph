# KG-REQ-20260718-002 — KG Learning-Module fuer neue SSF-Cluster

```yaml
id: REQ:L3:20260718-002
type: Request
layer: L3
requester: SYS:KUEPER:ssf
requestType: entity_request
purpose: >
  SSF hat seit letztem KG-Sync 50 Lernpfade in 9 Clustern.
  Im KG /learning/ existieren nur 18 YAML-Dateien, die einen
  Bruchteil abdecken. Fuer die Single-Source-of-Truth-Funktion
  des KG muessen alle neuen Cluster als Learning-Module registriert werden.
requestedContent:
  - Neue ssf-*.yaml Learning-Module fuer alle fehlenden Cluster
  - Wasser-Cluster (7 Pfade)
  - Magnetismus (PHY-MAGNETISMUS-0001)
  - Piezoelektrizitaet (PHY-PIEZO-0001)
  - Astrobiologie (CHE-ZUCKER-MOLEKUEL, CHE-ZUCKER-WELTALL, BIO-LEBEN-URSPRUNG)
  - Energie und Rohstoffe (CHE-IRIDIUM, PHY-ELEKTROLYSE, ENV-ROHSTOFFE)
  - Reinigung und Materialien (9 Pfade, nur teilweise erfasst)
  - Auto-Cluster (9 Pfade)
priority: medium
blocking: >
  KG ist als Single Source of Truth deklariert. Solange neue SSF-Cluster
  nicht im KG registriert sind, ist der KG nicht mehr SOT fuer SSF-Inhalte.
  Betrifft NOXIA-Unlock-Derivation und OTA-Verknuepfungen.
suggestedIds:
  - ssf-phy-wasser-molekuel
  - ssf-phy-magnetismus
  - ssf-phy-piezo
  - ssf-bio-leben-ursprung
  - ssf-che-astrobiologie
  - ssf-env-rohstoffe
  - ssf-phy-elektrolyse
targetExport: exports/kxf-learning-modules-0.1.json
status: open
created: 2026-07-18
curator: T.P.K.
createdObjects: []
notes: >
  SSF learningPaths.ts v1.0.2 ist Referenz fuer alle 50 Pfade.
  Repo: thomaspeterkueper/solarsciencefoundation
  Datei: lib/learningPaths.ts
```

## Aktueller Stand KG /learning/

| Vorhanden | Fehlend (Auswahl) |
|-----------|-------------------|
| ssf-che-1101-wasser.yaml | Wasser-Cluster (7 Pfade) |
| ssf-phy-1301-energie.yaml | PHY-MAGNETISMUS |
| ssf-mat-1002-vektoren.yaml | PHY-PIEZO |
| ssf-tec-1201-fertigung.yaml | BIO-LEBEN-URSPRUNG |
| ssf-bio-1101-was-ist-leben.yaml | CHE-IRIDIUM |
| (18 total) | (32 neue Pfade ohne KG-Eintrag) |

## Referenz: SSF-Cluster 2026-07-18

```
wasser       (7): PHY-WASSER-MOLEKUEL bis PHY-WASSER-WAERME
haushalt     (9): CHE-REINIGUNG-TENSIDE bis PHY-REINIGUNG-WAERME
kueche       (6): CHE-KUECHE-KARAMELL, Emulsion, Osmose, Siedepunkt, Kollagen
auto         (9): PHY-AUTO-MOTOR bis PHY-PUMPE-WASSER
energie      (4): PHY-PIEZO, CHE-IRIDIUM, PHY-ELEKTROLYSE, ENV-ROHSTOFFE
physik       (3): PHY-SKY, PHY-WAVE-SPECTRUM, PHY-MAGNETISMUS
mathematik   (5): MAT-VEC bis MAT-DIFFGEO
astrobiologie(3): CHE-ZUCKER-MOLEKUEL, CHE-ZUCKER-WELTALL, BIO-LEBEN-URSPRUNG
ingenieur    (3): ENG-DMS, ENG-EDM, EL-DIODE
```
