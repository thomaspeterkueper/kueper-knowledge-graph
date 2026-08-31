# KG-0019 — Runtime Event Projections und kanonische Weltidentitäten

## Status

Canonical governance, 2026-08-31

## Zweck

KG-0019 präzisiert KG-0009 für Laufzeitsysteme wie NOXIA. Ein Consumer darf eigene Event-Streams, Zustands-Historien, Datenbank-UUIDs und technische Projektionen führen. Diese lokalen Laufzeitidentitäten werden dadurch jedoch nicht zu kanonischen KUEPER-Weltidentitäten.

Die Regel verhindert, dass operative Datenbankobjekte eines Consumers versehentlich den globalen Canon-Namespace des Knowledge Graph übernehmen.

## Grundregel

```text
KG CANON
  EVT:* / STA:* / KNO:* / ARCST:* / SCN:*
  = systemübergreifend referenzierbare kanonische Identität

CONSUMER RUNTIME
  UUID / lokale event_type / lokale state row
  = technische Laufzeitprojektion des jeweiligen Systems
```

Ein lokaler Runtime-Datensatz darf einen kanonischen Datensatz repräsentieren, aber nicht allein durch seine Existenz kanonisch werden.

## Event

KG-0009 definiert kanonische Ereignisse mit IDs der Form:

```text
EVT:<LAYER>:<slug>
```

Consumer dürfen zusätzlich lokale Events führen, zum Beispiel:

```json
{
  "id": "7d4d...uuid",
  "event_type": "build.status_changed",
  "subject_id": "...uuid"
}
```

Solche Events sind standardmäßig `runtime_local`.

Wenn ein Ereignis als systemübergreifend kanonisches Weltereignis kuratiert wird, erhält es zusätzlich eine KG-ID. Empfohlene Abbildung:

```json
{
  "runtimeEventId": "7d4d...uuid",
  "canonicalEventId": "EVT:L4:example-event"
}
```

`canonicalEventId` darf nur auf eine im KG registrierte ID zeigen. Consumer erfinden keine eigenen `EVT:*`-IDs.

## State

Dasselbe gilt für Zustände. Eine lokale temporale Historienzeile mit UUID ist eine effiziente Consumer-Projektion. Ein kanonischer State nach KG-0009 verwendet dagegen:

```text
STA:<OBJECT-ID>:<STATE-SLUG>
```

Empfohlene Abbildung:

```json
{
  "runtimeStateId": "...uuid",
  "canonicalStateId": "STA:OBJ:...:state-slug"
}
```

Nicht jeder Runtime-State benötigt eine kanonische State-ID. Kurzlebige Simulationszustände, UI-Zustände, Cache-Zustände und rein spielmechanische Zwischenstände bleiben Consumer-intern.

## Promotion Gate

Eine lokale Event- oder State-Projektion wird nur dann in den KG-Canon promoviert, wenn mindestens folgende Bedingungen erfüllt sind:

1. stabile fachliche Identität über den Consumer hinaus,
2. kanonischer Subject-/Object-Bezug,
3. geklärte Zeitgültigkeit bzw. Ereigniszeit,
4. Provenienz,
5. zuständiger Source-of-Truth-Owner,
6. explizite KG-ID-Zuweisung.

Ein technischer Trigger, Datenbankeintrag oder Simulations-Tick ist für sich kein Promotion-Kriterium.

## Consumer-Regel für NOXIA

NOXIA darf seine Tabellen `events` und `entity_states` als authoritative simulation runtime verwenden. Die darin verwendeten UUIDs, `event_type`-Strings und `subject_type`-Strings bleiben NOXIA-eigene Runtime-Semantik.

Bezeichnungen wie `canonical event` sind für diese lokalen Datensätze zu vermeiden, solange keine KG-ID vorhanden ist. Präzise Begriffe sind beispielsweise:

- `authoritative simulation event`
- `runtime event`
- `runtime entity state`
- `event projection`
- `state projection`

Wenn NOXIA später kanonische Weltobjekte oder Ereignisse referenziert, soll die Abbildung über getrennte Felder oder Mappingtabellen erfolgen, beispielsweise `canonical_entity_id`, `canonical_event_id` und `canonical_state_id`.

## Ownership

Der Knowledge Graph besitzt:

- kanonische Identität und ID-Schema,
- systemübergreifende Event-/State-Semantik,
- Promotion in den Canon,
- Cross-System-Mappings.

Der Consumer besitzt:

- Runtime-Speicherung,
- Trigger und Event-Sourcing-Mechanik,
- Datenbank-UUIDs,
- spiel- oder anwendungsspezifische Eventtypen,
- technische Projektionen und Performance-Modelle.

## Verhältnis zu KG-0009

KG-0019 ändert KG-0009 nicht. Es konkretisiert dessen Event-Sourcing-Prinzip für Consumer-Systeme:

```text
Canonical Event/State != Runtime Event/State
```

Beide Ebenen dürfen parallel existieren. Die Verknüpfung ist explizit und niemals implizit.
