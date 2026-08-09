# KG-0009 - Narrative World Model

## Status

Draft productive, 2026-08-09

## Zweck

KG-0009 erweitert den KUEPER Knowledge Graph um ein maschinenlesbares Modell fuer fiktionale Welten, langfristige Universen und narrative Werke.

Ziel ist nicht, Romane in Softwareobjekte zu verwandeln. Ziel ist, die kanonische Welt so zu modellieren, dass Identitaet, Beziehungen, Zustaende, Ereignisse und Wissen ueber lange Zeitraeume konsistent abgefragt werden koennen.

Das Modell bildet die Grundlage fuer spaetere Werkzeuge wie Timeline Explorer, Relationship Graph, Canon Check, Continuity Check, Knowledge Check und Story-Arc Debugging.

---

## Grundsatz

Die Welt ist nicht das Buch.

```text
WORLD MODEL
    -> kanonische Objekte und Regeln

HISTORY
    -> Ereignisse veraendern Objektzustaende

STORY
    -> ein Werk waehlt und ordnet Ausschnitte dieser Historie

TEXT
    -> Szenen und Kapitel erzaehlen diese Ausschnitte
```

Ein Roman besitzt daher nicht den kanonischen Weltzustand. Ein Roman referenziert kanonische Objekte und Ereignisse und erzeugt eine narrative Projektion darauf.

---

## Kernmodell

KG-0009 definiert sieben semantische Bausteine:

1. `OBJECT` - was existiert?
2. `RELATION` - wie haengen Objekte zusammen?
3. `STATE` - wie ist ein Objekt zu einem bestimmten Zeitpunkt oder Zeitraum?
4. `EVENT` - was veraendert Zustaende oder Beziehungen?
5. `KNOWLEDGE_BELIEF` - wer weiss, glaubt, vermutet oder behauptet was?
6. `STORY_ARC` - welche narrative Entwicklung wird in einem Werk verfolgt?
7. `SCENE` - welcher konkrete Ausschnitt wird in einem Werk gezeigt?

Die ersten fuenf Bausteine gehoeren zur kanonischen Weltsemantik des KG. `STORY_ARC` und `SCENE` sind narrative Metadaten und duerfen werkbezogen aus einem Roman-/Universe-Repository projiziert oder referenziert werden.

---

## 1. Object

Ein Object ist jede kanonisch identifizierbare Entitaet, die ueber Zeit referenziert werden muss.

Beispiele:

- Person
- Organisation
- Ort
- Gebaeude
- Fahrzeug
- Raumschiff
- Technologie
- Artefakt
- Institution
- Dokument
- System

Bestehende KG-Typen wie `PER`, `ORG`, `PLC`, `BLD`, `DOC`, `SYS` bleiben gueltig. KG-0009 fuehrt keinen konkurrierenden Universaltyp ein.

Grundregel:

```text
Ein reales oder fiktionales Ding mit stabiler Identitaet bleibt dieselbe Entitaet,
auch wenn sich Eigenschaften, Besitzer, Beziehungen oder Aufenthaltsort aendern.
```

---

## 2. Relation

Relationen bleiben explizite Graph-Kanten nach KG-0003.

KG-0009 ergaenzt Relationen um optionale Zeitgueltigkeit und Provenienz:

```json
{
  "id": "REL:PER:L4:alice:MEMBER_OF:ORG:L4:expedition",
  "type": "Relation",
  "from": "PER:L4:alice",
  "relation": "MEMBER_OF",
  "to": "ORG:L4:expedition",
  "validFrom": "2098-03-01",
  "validTo": null,
  "status": "canonical",
  "source": "DOC:L4:example-novel"
}
```

Eine fehlende Zeitangabe bedeutet nicht automatisch "ewig", sondern nur "zeitlich nicht weiter spezifiziert".

---

## 3. State

Ein State beschreibt einen zeitgebundenen Zustand einer bereits existierenden Entitaet.

ID-Form:

```text
STA:<OBJECT-ID>:<STATE-SLUG>
```

Minimalstruktur:

```json
{
  "id": "STA:PER:L4:alice:2098-03",
  "type": "State",
  "subject": "PER:L4:alice",
  "validFrom": "2098-03-01",
  "validTo": "2098-03-31",
  "properties": {
    "location": "PLC:L4:korolev-alpha",
    "status": "active"
  },
  "source": "DOC:L4:example-novel"
}
```

States ersetzen nicht die stabile Entitaet. Sie beschreiben deren zeitliche Auspraegung.

### Invariante

Widersprechende kanonische States duerfen sich fuer denselben Property-Scope zeitlich nicht ueberlappen, sofern der Widerspruch nicht explizit als Unsicherheit, Perspektive oder Alternativkanon markiert ist.

---

## 4. Event

Ein Event ist ein zeitlich verortetes Geschehen, das einen Weltzustand beeinflusst oder fuer die Historie relevant ist.

ID-Form:

```text
EVT:<LAYER>:<slug>
```

Beispiel:

```json
{
  "id": "EVT:L4:korolev-incident-2098-001",
  "type": "Event",
  "time": {
    "from": "2098-03-17T21:14:00",
    "to": null,
    "precision": "minute"
  },
  "location": "PLC:L4:korolev-alpha",
  "participants": [
    "PER:L4:alice"
  ],
  "effects": [
    {
      "subject": "BLD:L4:station-module-3",
      "property": "status",
      "from": "operational",
      "to": "damaged"
    }
  ],
  "source": "DOC:L4:example-novel"
}
```

Events duerfen auch keine unmittelbare Zustandsaenderung besitzen, wenn sie historisch oder narrativ relevant sind.

### Event-Sourcing-Prinzip

Der KG ist nicht verpflichtet, jeden Weltzustand ausschliesslich aus Events zu berechnen. Langfristig soll jedoch gelten:

```text
Events erklaeren Zustandsaenderungen.
States erlauben effiziente Zustandsabfragen.
```

Beide Formen duerfen parallel existieren und muessen konsistent sein.

---

## 5. Knowledge / Belief

Narrative Konsistenz erfordert die Trennung von Weltwahrheit und Perspektive.

KG-0009 unterscheidet mindestens:

```text
REALITY             -> was im Kanon tatsaechlich gilt
CHARACTER_KNOWLEDGE -> was eine Figur weiss
CHARACTER_BELIEF    -> was eine Figur fuer wahr haelt
CHARACTER_CLAIM     -> was eine Figur behauptet
READER_KNOWLEDGE    -> was das Werk dem Leser bis zu einem Punkt offenbart hat
```

ID-Form:

```text
KNO:<SUBJECT-ID>:<MODE>:<ABOUT-ID>:<slug>
```

Beispiel:

```json
{
  "id": "KNO:PER:L4:alice:BELIEF:EVT:L4:incident-x:cause-y",
  "type": "KnowledgeAssertion",
  "subject": "PER:L4:alice",
  "mode": "BELIEF",
  "about": "EVT:L4:incident-x",
  "proposition": "cause-y",
  "validFrom": "2098-03-18",
  "validTo": "2098-03-22",
  "confidence": 0.8,
  "source": "SCN:L4:example-novel:0042"
}
```

`READER_KNOWLEDGE` ist werkbezogen und kein Ersatz fuer Weltwahrheit.

---

## 6. Story Arc

Ein Story Arc beschreibt eine narrative Entwicklung innerhalb eines Werkes oder Werkverbunds.

ID-Form:

```text
ARCST:<WORK-ID>:<slug>
```

`ARCST` ist absichtlich nicht `ARC`, damit keine Verwechslung mit OTA-ARC-Werk-Setzungen entsteht.

Beispiel:

```json
{
  "id": "ARCST:DOC:L4:example-novel:identity",
  "type": "StoryArc",
  "work": "DOC:L4:example-novel",
  "status": "open",
  "introducedIn": "SCN:L4:example-novel:0003",
  "resolvedIn": null
}
```

Story Arcs gehoeren zur narrativen Umsetzung eines Werkes. Sie duerfen im KG referenziert oder als Projektion konsumiert werden, ohne dass der KG die Autorenschaft oder Dramaturgie des Werkes uebernimmt.

---

## 7. Scene

Eine Scene beschreibt einen narrativen Ausschnitt eines Werkes.

ID-Form:

```text
SCN:<LAYER>:<work-slug>:<sequence>
```

Beispiel:

```json
{
  "id": "SCN:L4:example-novel:0042",
  "type": "Scene",
  "work": "DOC:L4:example-novel",
  "sequence": 42,
  "time": "2098-03-17T21:14:00",
  "location": "PLC:L4:korolev-alpha",
  "characters": ["PER:L4:alice"],
  "events": ["EVT:L4:korolev-incident-2098-001"],
  "advances": ["ARCST:DOC:L4:example-novel:identity"]
}
```

Szenen sind keine Weltwahrheit. Sie zeigen, ordnen oder verschweigen Weltwahrheit.

---

## Zeitmodell

Zeit ist in KG-0009 ein First-Class-Aspekt.

Zeitangaben duerfen sein:

- Zeitpunkt
- Zeitraum
- ungefaehre Zeit
- nur Reihenfolge
- unbekannt

Empfohlene Form:

```json
{
  "from": "2098-03-17T21:14:00",
  "to": null,
  "precision": "minute",
  "certainty": "canonical"
}
```

Historische oder fiktionale Kalender duerfen spaeter ueber Kalender-Metadaten normalisiert werden. KG-0009 v0.1 erzwingt keine einzelne Zeitrechnung.

---

## Provenienz und Kanonstatus

Jede narrative Aussage muss unterscheidbar machen, ob sie:

- kanonisch gesetzt,
- aus einem Werk abgeleitet,
- nur behauptet,
- unsicher,
- verworfen,
- alternativ / nicht-kanonisch

ist.

Empfohlene Statuswerte:

```text
canonical
work_derived
asserted
uncertain
superseded
non_canonical
```

Die konkrete Governance dieser Statuswerte bleibt mit OTA-/ARC-Kanonisierung kompatibel. KG-0009 kanonisiert kein Werk eigenmaechtig.

---

## Konsistenzchecks

KG-0009 schafft die Grundlage fuer vier getrennte Pruefklassen.

### Canon Check

Prueft, ob eine Aussage bestehenden kanonischen Weltobjekten, Regeln oder Ereignissen widerspricht.

### Continuity Check

Prueft zeitliche und raeumliche Konsistenz, beispielsweise:

- Figur gleichzeitig an unvereinbaren Orten
- Besitzrelation nach dokumentiertem Besitzerwechsel
- Nutzung eines zerstoerten Objekts ohne Reparaturereignis
- widersprechende ueberlappende States

### Knowledge Check

Prueft, ob eine Figur eine Information zu einem Zeitpunkt wissen kann.

Beispiel:

```text
Kapitel 12: Figur verwendet Information X
Kapitel 17: Figur erfaehrt erstmals Information X
=> moeglicher Continuity-/Knowledge-Fehler
```

### Narrative Check

Prueft werkbezogene Metadaten, beispielsweise:

- Arc eingefuehrt, aber nie weitergefuehrt
- Arc als geloest markiert ohne Resolution Scene
- Reveal vor vorgesehener Reader-Knowledge-Grenze

Narrative Checks sind Hinweise, keine automatische Dramaturgie-Autoritaet.

---

## Source of Truth

KG-0009 respektiert die Repo-Grenzen des Oekosystems.

```text
KG
  besitzt: kanonische semantische Identitaet, Relationen, States, Events,
           referenzierbare Wissens-/Glaubensaussagen zur Welt

Roman-/Universe-Repository
  besitzt: Manuskript, Kapitel, Szenenabfolge, Dramaturgie, Story Arcs,
           konkrete Reader-Knowledge-Inszenierung

OTA
  besitzt: Archivkanon / ARC-Werk-Setzungen
```

Ein anderes Repository wird nicht direkt durch den KG veraendert. Benoetigt ein Consumer neue Felder oder Exporte, wird im Ziel-Repository unter `external-tasks/open/` eine Anforderung angelegt.

---

## KXF-Projektion

KG-0009 definiert zunaechst Semantik, nicht sofort einen neuen verpflichtenden KXF-Major-Stand.

Vorgesehene additive Collections:

```text
states
events
knowledgeAssertions
storyArcs
scenes
```

Bestehende Consumer muessen diese Collections ignorieren duerfen, solange sie sie nicht verstehen.

Ein spaeterer KXF-Stand darf zeitgebundene Relationen durch optionale Felder `validFrom`, `validTo`, `time` und `provenance` erweitern.

---

## Harte Regeln

1. Kein kanonisches Weltobjekt ohne stabile ID.
2. Ein State darf keine neue Identitaet erfinden; er verweist auf ein bestehendes Object.
3. Ein Event besitzt eine ID und mindestens eine zeitliche oder ordinale Einordnung.
4. Weltwahrheit und Figurenwissen duerfen nicht im selben Feld vermischt werden.
5. `BELIEF`, `CLAIM` und `READER_KNOWLEDGE` duerfen niemals stillschweigend als `REALITY` interpretiert werden.
6. Zeitgebundene Relationen muessen ihre Gueltigkeit explizit tragen, sobald Anfang oder Ende bekannt ist.
7. Ein Roman-Repository darf kanonische IDs referenzieren, aber keine konkurrierenden KG-Identitaeten als kanonisch definieren.
8. Der KG besitzt keine Manuskriptwahrheit und keine dramaturgische Autoritaet.
9. Story-Arc-Checks sind diagnostisch, nicht normativ.
10. Bestehende KG-0003-Relationen ohne Zeitangabe bleiben gueltig.

---

## Einfuehrungsstrategie

### Phase A - Schema

- KG-0009 dokumentieren
- ID-Schema um `STA`, `EVT`, `KNO`, `ARCST`, `SCN` erweitern
- KG-0003 um optionale Zeitgueltigkeit erweitern
- Architekturgrenze KG vs. Werk-Repositories dokumentieren

### Phase B - Pilot

Ein einzelnes bestehendes Universum oder Werk wird mit wenigen Objekten pilotiert:

- 3-5 Personen
- 2-3 Orte
- 5-10 Events
- einige zeitgebundene Relationen
- mindestens ein Knowledge-/Belief-Fall
- 1-2 Story Arcs
- 5-10 Szenen

Ziel ist das Testen des Modells, nicht die Vollerfassung eines Romans.

### Phase C - Validatoren

- Zeitueberlappungen
- ungueltige Referenzen
- Knowledge-before-acquisition
- Arc ohne Fortsetzung/Resolution

### Phase D - Explorer

- Timeline
- Entity Inspector
- Relationship Graph
- Character Knowledge View
- Story Arc View

---

## Ergebnis

KG-0009 macht aus dem Knowledge Graph nicht nur ein Verzeichnis von Dingen, sondern ein zeitfaehiges Modell fuer Welten und Geschichten:

```text
OBJECT -> RELATION -> STATE -> EVENT
                  \-> KNOWLEDGE / BELIEF

WORLD + HISTORY -> STORY -> SCENE -> TEXT
```

Damit kann derselbe kanonische Gegenstand ueber mehrere Buecher, Spiele, Archive und spaetere Anwendungen hinweg konsistent referenziert werden, ohne dass eines dieser Werke zum Besitzer der Weltsemantik wird.
