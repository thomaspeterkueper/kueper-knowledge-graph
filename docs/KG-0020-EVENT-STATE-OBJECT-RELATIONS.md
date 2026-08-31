# KG-0020 — Event–State–Object-Relationen und Runtime-Promotion

## Status

Canonical governance, 2026-08-31

## Zweck

KG-0020 konkretisiert KG-0009 und KG-0019 für die systemübergreifende Abbildung von Weltobjekten, Zuständen, Ereignissen und Consumer-Runtime-Projektionen.

Ziel ist eine gemeinsame Semantik für OTA, NOXIA, spätere Universe-/Authoring-Systeme und weitere Consumer, ohne deren lokale Speicherung oder Event-Sourcing-Architektur zu vereinheitlichen.

## Grundmodell

```text
OBJECT
  ^
  | DESCRIBES_STATE_OF
STATE
  ^
  | PRODUCES_STATE / ENDS_STATE
EVENT

RUNTIME EVENT/STATE
  -- PROJECTS_TO --> kanonisches EVENT/STATE
```

Ein kanonisches Objekt bleibt über Zeit stabil. States beschreiben zeitliche Ausprägungen. Events erklären Zustandsänderungen. Runtime-Projektionen können diese kanonischen Entitäten abbilden, besitzen aber keine eigene KG-Kanonizität.

## Kanonische Relationstypen

### `DESCRIBES_STATE_OF`

Richtung:

```text
STA:* --DESCRIBES_STATE_OF--> <canonical object/entity>
```

Bedeutung: Der State beschreibt den zeitgebundenen Zustand der Zielentität.

Regeln:
- `from` muss ein kanonischer `State` sein.
- `to` muss eine kanonische stabile Entität sein.
- Ein State darf genau ein primäres Subject besitzen.

### `AFFECTS`

Richtung:

```text
EVT:* --AFFECTS--> <canonical object/entity>
```

Bedeutung: Das Ereignis beeinflusst die Zielentität fachlich relevant.

`AFFECTS` setzt nicht zwingend voraus, dass ein eigener kanonischer State erzeugt wird.

### `PRODUCES_STATE`

Richtung:

```text
EVT:* --PRODUCES_STATE--> STA:*
```

Bedeutung: Das Ereignis begründet oder eröffnet den Ziel-State.

Regeln:
- `from` muss ein kanonischer `Event` sein.
- `to` muss ein kanonischer `State` sein.
- Der Ziel-State muss über `DESCRIBES_STATE_OF` auf ein kanonisches Subject zeigen.

### `ENDS_STATE`

Richtung:

```text
EVT:* --ENDS_STATE--> STA:*
```

Bedeutung: Das Ereignis beendet die Gültigkeit des Ziel-States.

Ein Event darf einen State beenden und gleichzeitig einen Folgezustand produzieren.

### `PARTICIPATES_IN`

Richtung:

```text
<canonical entity> --PARTICIPATES_IN--> EVT:*
```

Bedeutung: Eine Person, Organisation, ein Objekt, Fahrzeug oder anderes kanonisches Subjekt nimmt am Ereignis teil.

### `OCCURS_AT`

Richtung:

```text
EVT:* --OCCURS_AT--> PLC:* | BLD:* | OBJ:* | andere geeignete Ortsentität
```

Bedeutung: Verknüpft ein Ereignis mit einem kanonisch identifizierten Ort oder räumlichen Objekt.

### `PROJECTS_TO`

`PROJECTS_TO` ist eine Mapping-Semantik zwischen einer Consumer-Runtime-Identität und einer kanonischen KG-Identität.

Da Runtime-UUIDs keine KG-Entitäten sind, wird diese Relation nicht als normale `REL:*`-Kante zwischen zwei KG-Entitäten gespeichert. Sie wird im Runtime-Projection-Registry geführt.

Beispiele:

```json
{
  "consumer": "SYS:KUEPER:noxia",
  "runtimeKind": "event",
  "runtimeId": "7d4d...uuid",
  "canonicalId": "EVT:L4:example-event",
  "mapping": "PROJECTS_TO"
}
```

```json
{
  "consumer": "SYS:KUEPER:noxia",
  "runtimeKind": "state",
  "runtimeId": "9a21...uuid",
  "canonicalId": "STA:OBJ:L4:example:operational",
  "mapping": "PROJECTS_TO"
}
```

## Promotion-Prozess

Eine Runtime-Projektion darf nur über folgenden Prozess eine kanonische Ziel-ID erhalten:

1. Consumer erzeugt oder hält Runtime-Datensatz.
2. Consumer oder Kurator schlägt eine Promotion vor.
3. KG prüft stabile Identität, Subject, Zeit, Provenienz und Ownership.
4. KG weist bei Annahme eine kanonische `EVT:*`- oder `STA:*`-ID zu.
5. Runtime-Mapping wird als `PROJECTS_TO` registriert.
6. Erst danach darf der Consumer die kanonische ID als Cross-System-Referenz verwenden.

Eine Consumer-UUID wird niemals selbst zur kanonischen ID.

## Zeitkonsistenz

Für einen kanonischen State gilt weiterhin KG-0009:

- `validFrom` eröffnet die Gültigkeit.
- `validTo` beendet sie, falls bekannt.
- Widersprechende kanonische States desselben Property-Scopes dürfen sich nicht unmarkiert überlappen.

Wenn ein Event einen State produziert, soll dessen Ereigniszeit mit `validFrom` vereinbar sein. Wenn ein Event einen State beendet, soll dessen Ereigniszeit mit `validTo` vereinbar sein.

## Provenienz

Kanonische Events und States benötigen mindestens:

- `source` oder äquivalente Provenienz,
- Source-of-Truth-Owner,
- kanonisches Subject beziehungsweise Teilnehmerbezug,
- Zeitangabe oder explizit markierte zeitliche Unschärfe.

Runtime-Mappings benötigen zusätzlich:

- Consumer-System,
- Runtime-Kind,
- Runtime-ID,
- kanonische Ziel-ID,
- Mapping-Status,
- Provenienz der Promotion.

## Ownership

Der KG besitzt:
- Relationstypen und deren Semantik,
- kanonische `EVT:*`-/`STA:*`-IDs,
- Runtime-zu-Canon-Mappings,
- Promotion-Entscheidungen.

Consumer besitzen:
- lokale Eventtypen,
- lokale State-Schemata,
- UUIDs,
- Trigger, Tabellen und Event-Sourcing-Mechanik,
- projektspezifische Runtime-Effekte.

## Minimaler interoperabler Vertrag

Ein Consumer muss nicht alle Relationen materialisieren. Für systemübergreifende Kanonreferenzen gilt jedoch mindestens:

```text
State -> DESCRIBES_STATE_OF -> Object
Event -> AFFECTS -> Object          (wenn zutreffend)
Event -> PRODUCES_STATE -> State    (wenn ein kanonischer Folgezustand existiert)
Event -> ENDS_STATE -> State        (wenn ein kanonischer Zustand endet)
Runtime -> PROJECTS_TO -> Canon     (nur nach KG-Promotion)
```

Damit bleiben Runtime-Architekturen frei, während die kanonische Weltsemantik über Systeme hinweg stabil bleibt.
