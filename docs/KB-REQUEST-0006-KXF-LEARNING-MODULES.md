# KB-REQUEST-0006 - KXF Learning Modules Export fuer SSF

## Status

Implemented, 2026-07-02

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
    "learning_modules": []
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
dependencies.unlocks
```

## Subject Codes

Der Export verwendet die von SSF erwarteten Codes:

```text
PHY
CHM
BIO
MAT
GEO
TEC
```

## Regel

Das KG bleibt Source of Truth fuer kanonische IDs. SSF konsumiert diesen Export und definiert keine eigenen kanonischen Lernmodul-IDs.
