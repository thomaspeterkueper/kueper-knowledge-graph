# KB-REQUEST-0006 - KXF Learning Modules Export fuer SSF

## Status

Implemented and aligned, 2026-07-02

## Ursprung

Anforderung aus `thomaspeterkueper/solar-science-foundation` fuer die Themenkarte `/learn`.

Die SSF erwartet einen oeffentlich konsumierbaren Export:

```text
exports/kxf-learning-modules-0.1.json
```

## Zweck

Der Export stellt SSF-Lernmodule in einer UI-nahen Struktur bereit. Er ist kein Ersatz fuer das interne KG-Learning-Model, sondern ein konsumierbarer View auf bestehende KG-Records.

## Erwartetes Format

```json
{
  "schema": "KXF-LEARNING-MODULES-0.1",
  "records": {
    "learning_modules": [],
    "knowledge_domains": [],
    "competencies": []
  }
}
```

## SSF-Kompatibilitaet

Jedes Modul besitzt:

```text
id
version
created
modified
meta
assets
dependencies
noxia
branches
```

Die Feldnamen folgen der SSF-Implementierung, insbesondere:

```text
records.learning_modules
meta.subject
dependencies.requires
dependencies.module_unlocks
dependencies.path_unlocks
dependencies.archive_unlocks
```

## Subject Codes

Der Export verwendet die von SSF erwarteten Codes:

```text
MAT
PHY
CHE
AST
BIO
EAR
```

`GEO` wird nicht mehr als SSF-Subject exportiert. Planetologie wird in diesem View unter `AST` gefuehrt, Seismologie und Petrologie unter `EAR`.

`TEC` wird nicht exportiert, bis SSF eine kanonische Zuordnung fuer Methodik- und Lesekompetenzmodule definiert.

## Unlock-Semantik

`dependencies.unlocks` wurde entfernt, weil es verschiedene Bedeutungen vermischte.

Stattdessen gibt es:

```text
module_unlocks
path_unlocks
archive_unlocks
```

`noxia.grants` bleibt getrennt.

## KD/CMP-Aufloesung

Der Export enthaelt `records.knowledge_domains` und `records.competencies`, damit `KD:*`- und `CMP:*`-Referenzen aus demselben Export aufloesbar sind.

`KNOW:*` bleibt Legacy und erscheint nur als `legacyId`.

## Source of Truth

Fuer `LRN:SSF:*` gilt:

```text
Kanonische KG-Basis: exports/learning-model-0.1.json
SSF /learn View:     exports/kxf-learning-modules-0.1.json records.learning_modules
Legacy compact KXF:  records.learningModules, nur Kompatibilitaet
```

## Regel

Das KG bleibt Source of Truth fuer kanonische IDs. SSF konsumiert diesen Export und definiert keine eigenen kanonischen Lernmodul-IDs.
