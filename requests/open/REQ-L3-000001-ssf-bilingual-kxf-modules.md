# REQ:L3:000001 - SSF bilingual KXF module fields

## Status

```text
open
```

## Requester

```text
SYS:KUEPER:ssf
```

## Request Type

```text
schema_request
export_request
```

## Purpose

Bilinguale Lernmodule sind Kernbestandteil der SSF-Positionierung.

Die Solar Science Foundation benoetigt eine kanonische KXF-Modulspezifikation, die deutsch- und englischsprachige Inhalte nicht als nachtraegliche Erweiterung behandelt, sondern als strukturelles Grundprinzip.

## Requested Content

Erweiterung der KXF-Modulspezifikation um lokalisierte Felder.

Gewuenschte Struktur:

```yaml
title:
  de: "..."
  en: "..."

summary:
  de: "..."
  en: "..."

body:
  de: "..."
  en: "..."

exercises:
  - question:
      de: "..."
      en: "..."
```

## Priority

```text
high
```

## Blocking

Saubere DE/EN-Modulstruktur in SSF.

## Reason

Bilingualitaet ist Teil der Markenidentitaet und darf nicht nachtraeglich auf bestehende Module aufgesetzt werden.

## Suggested Target

```text
exports/kxf-0.1.json
schemas/learning-module.schema.json
```

## Suggested Implementation Notes

Die lokale Textstruktur sollte als wiederverwendbares Objekt modelliert werden.

Beispiel:

```json
{
  "de": "Deutscher Text",
  "en": "English text"
}
```

Pflichtsprachen fuer SSF:

```text
de
en
```

Weitere Sprachen duerfen spaeter ergaenzt werden, ohne die Struktur zu brechen.

## Created

```text
2026-06-26
```

## Curator

```text
T.P.K.
```

## Created Objects

Noch keine.

## Notes

Dieser Request erzeugt selbst noch keine KXF-Aenderung. Er beschreibt den Bedarf und muss kuratorisch akzeptiert werden, bevor Schema und Export angepasst werden.
