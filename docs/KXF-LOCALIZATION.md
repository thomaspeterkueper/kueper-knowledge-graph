# KXF Localization Model

## Status

```text
accepted
```

## Ursprung

```text
REQ:L3:000001
```

## Entscheidung

KXF unterstuetzt lokalisierte Textfelder als Kernfunktion.

Mehrsprachigkeit ist keine Eigenschaft eines einzelnen Systems wie SSF, sondern eine Eigenschaft von Inhalten.

KXF darf deshalb nicht fest auf `de` und `en` beschraenkt werden.

---

## Grundregel

KXF definiert nicht die Anzahl der Sprachen.

KXF definiert das Muster:

```text
LocalizedText = languageCode -> text
```

Beispiel:

```json
{
  "title": {
    "de": "Gravitation",
    "en": "Gravity"
  }
}
```

Spaetere Erweiterung ohne Schemawechsel:

```json
{
  "title": {
    "de": "Gravitation",
    "en": "Gravity",
    "fr": "Gravitation"
  }
}
```

---

## Empfohlenes Modulmuster

```json
{
  "id": "LRN:L3:ssf-phy-1101",
  "type": "LearningModule",
  "layer": "L3",
  "defaultLanguage": "de",
  "availableLanguages": ["de", "en"],
  "title": {
    "de": "Was ist Gravitation?",
    "en": "What is gravity?"
  },
  "summary": {
    "de": "Eine Einfuehrung in Gravitation.",
    "en": "An introduction to gravity."
  },
  "body": {
    "de": "...",
    "en": "..."
  },
  "exercises": [
    {
      "id": "EXR:L3:ssf-phy-1101-001",
      "question": {
        "de": "Welche Wirkung hat Gravitation?",
        "en": "What does gravity do?"
      }
    }
  ]
}
```

---

## Pflicht fuer SSF

SSF-Module muessen mindestens folgende Sprachen strukturell unterstuetzen:

```text
de
en
```

Das bedeutet nicht, dass KXF auf diese Sprachen beschraenkt ist.

---

## Sprachcodes

Sprachschluessel sollen als kurze, stabile Sprachcodes gefuehrt werden.

Beispiele:

```text
de
en
fr
es
it
zh
ja
```

Falls spaeter regionale Varianten noetig werden, koennen sie als erweiterte Codes ergaenzt werden.

Beispiele:

```text
de-DE
en-US
en-GB
pt-BR
```

---

## Fallback-Regel

Jedes lokalisierte Objekt sollte ein `defaultLanguage`-Feld besitzen.

Wenn eine Sprache fehlt, darf ein konsumierendes System auf `defaultLanguage` zurueckfallen.

---

## Nicht erlaubt

Nicht zukunftssicher:

```json
{
  "title_de": "...",
  "title_en": "..."
}
```

Nicht zukunftssicher:

```json
{
  "germanTitle": "...",
  "englishTitle": "..."
}
```

Erlaubt:

```json
{
  "title": {
    "de": "...",
    "en": "..."
  }
}
```

---

## Betroffene Felder

LocalizedText ist geeignet fuer:

- title
- name
- summary
- description
- body
- question
- answer
- hint
- label
- tooltip
- uiText

---

## Governance

Dieser Standard entsteht aus `REQ:L3:000001` und ist Grundlage fuer kuenftige KXF-Lernmodule und weitere mehrsprachige Inhalte.

Konsumierende Systeme duerfen lokalisierte Inhalte darstellen.

Sie duerfen die KXF-Lokalisierungsstruktur nicht eigenmaechtig veraendern.
