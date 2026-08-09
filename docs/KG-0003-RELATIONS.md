# KG-0003 - Relations als kanonische Graph-Kanten

## Status

Draft productive, 2026-07-02

## Zweck

KG-0003 macht Relationen zu eigenen Records im KUEPER Knowledge Graph.

Bis KG-0002 waren viele Beziehungen bereits vorhanden, aber teilweise nur implizit in Feldern wie `prerequisiteIds`, `relatedKnowledgeDomains`, `requires`, `teaches`, `unlocks` oder `mappings` gespeichert.

Ab KG-0003 koennen dieselben Beziehungen zusaetzlich als explizite Graph-Kanten exportiert und abgefragt werden.

## Grundregel

```text
Keine semantische Verbindung ohne Relation.
Keine Relation ohne Quelle, Relationstyp und Ziel.
Keine Relation ohne stabile ID.
```

## Relation-ID

```text
REL:<SOURCE-ID>:<RELATION-TYPE>:<TARGET-ID>
```

Beispiel:

```text
REL:DOC:OTA:OTA-SCI-0083-2026-DE:REQUIRES:KD:GEO-SEISM:N2
```

Bei sehr langen IDs darf die maschinenlesbare ID spaeter durch einen Slug oder Hash ergaenzt werden. Fuer KG-0003 bleibt die sprechende ID bevorzugt, weil sie Debugging und manuelle Kuratierung erleichtert.

## Minimalstruktur

```json
{
  "id": "REL:DOC:OTA:OTA-SCI-0083-2026-DE:REQUIRES:KD:GEO-SEISM:N2",
  "type": "Relation",
  "from": "DOC:OTA:OTA-SCI-0083-2026-DE",
  "relation": "REQUIRES",
  "to": "KD:GEO-SEISM:N2",
  "status": "canonical",
  "source": "KG-0003"
}
```

## Zeitgueltigkeit ab KG-0009

Relationen duerfen ab KG-0009 optional zeitgebunden sein. Das bestehende Relation-ID-Schema bleibt unveraendert; Zeit wird nicht in die ID eingebrannt.

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

Regeln:

1. `validFrom` und `validTo` sind optional.
2. Fehlende Zeitangaben bedeuten "nicht zeitlich spezifiziert", nicht automatisch "ewig".
3. Sobald Anfang oder Ende einer Relation kanonisch bekannt ist, soll die Gueltigkeit explizit gespeichert werden.
4. Zwei widersprechende kanonische Relationen duerfen sich fuer denselben semantischen Scope zeitlich nicht unerklaert ueberlappen.
5. Provenienz und Perspektive duerfen zur Aufloesung scheinbarer Widersprueche herangezogen werden.

## Relationstypen in KG-0003

| Relation | Von | Nach | Bedeutung |
|---|---|---|---|
| REQUIRES | Document, LearningModule, Project, Building | KnowledgeDomain, Unlock, LearningModule | setzt etwas voraus |
| COVERS | Document | KnowledgeDomain, Concept, Place | behandelt ein Thema oder Objekt |
| TEACHES | LearningModule | KnowledgeDomain, Concept | vermittelt Wissen |
| UNLOCKS | LearningModule, Unlock | Unlock, Building, Mechanic, Project | schaltet Anwendung frei |
| PARENT_OF | KnowledgeDomain | KnowledgeDomain | taxonomische Ober-/Unterordnung |
| MAPS_TO | Legacy-ID, Mapping | Canonical-ID | Migration oder Aequivalenzabbildung |
| OWNED_BY | Document, MetadataRecord | System, Repository, Organization | Zustaendigkeit oder Besitz |
| STORED_IN | Document | Repository, System | Speicherort / Quellsystem |

## Narrative Relationstypen ab KG-0009

Die folgenden Typen erweitern den Katalog fuer fiktionale und historische Weltmodelle:

| Relation | Von | Nach | Bedeutung |
|---|---|---|---|
| MEMBER_OF | Person, Organization | Organization, Group | Zugehoerigkeit / Mitgliedschaft |
| LOCATED_AT | Person, Object, Organization | Place, Building, Vehicle | zeitgebundener Aufenthalts-/Standortbezug |
| OWNS | Person, Organization | Object, Building, Vehicle, Artifact | Besitzrelation |
| OPERATES | Person, Organization | Building, Vehicle, System | betreibt / kontrolliert operativ |
| KNOWS | Person | Person | persoenliche Bekanntschaft, nicht Wissensinhalt |
| PARENT_OF_PERSON | Person | Person | biologische/soziale Elternrelation, falls als Kanonbeziehung modelliert |
| ALLIED_WITH | Person, Organization | Person, Organization | Allianz |
| HOSTILE_TO | Person, Organization | Person, Organization | feindliche Beziehung |
| PARTICIPATES_IN | Person, Organization, Object | Event | Teilnahme / Beteiligung |
| OCCURS_AT | Event | Place, Building | Ereignisort |
| CAUSED_BY | Event, State | Event, Person, Organization, Object | kausaler Bezug, sofern kanonisch gesetzt |
| RESULTS_IN | Event | Event, State | dokumentierte Folge |

Perspektivisches Wissen wird nicht ueber `KNOWS` modelliert, sondern ueber `KNO` / `KnowledgeAssertion` nach KG-0009.

## Abgrenzung zu Prerequisite

Eine `Prerequisite` ist eine fachlich bedeutsame Voraussetzung mit Zweck, Status und ggf. Quelle.

Eine `Relation` ist die generische Graph-Kante.

Beide duerfen dieselbe semantische Verbindung ausdruecken:

```text
Prerequisite:
REQ:DOC:OTA:OTA-SCI-0083-2026-DE:KD:GEO-SEISM:N2:READ

Relation:
REL:DOC:OTA:OTA-SCI-0083-2026-DE:REQUIRES:KD:GEO-SEISM:N2
```

Die Prerequisite bleibt fuer Lernpfad-Logik wichtig. Die Relation ist fuer allgemeine Graph-Abfragen wichtig.

## Beispielabfragen

```text
Welche Dokumente benoetigen KD:GEO-SEISM:N2?
-> from WHERE relation=REQUIRES AND to=KD:GEO-SEISM:N2
```

```text
Welche Module lehren Gravitation?
-> from WHERE relation=TEACHES AND to=CON:L1:gravitation
```

```text
Welche NOXIA-Objekte werden durch SSF-Modul PHY-1101 freigeschaltet?
-> to WHERE from=LRN:SSF:PHY-1101 AND relation=UNLOCKS
```

```text
Wo befand sich eine Figur am 17.03.2098?
-> to WHERE from=<PER-ID> AND relation=LOCATED_AT
   AND validFrom <= 2098-03-17
   AND (validTo IS NULL OR validTo >= 2098-03-17)
```

## Validierungsregeln

1. Jede Relation besitzt `id`, `type`, `from`, `relation`, `to`.
2. `type` ist immer `Relation`.
3. `relation` muss aus dem erlaubten Relationstyp-Katalog stammen.
4. `from` und `to` muessen auf existierende Records oder bekannte Legacy-Quellen zeigen.
5. Kanonische Relationen duerfen nicht auf freie Textlabels zeigen.
6. Relations duerfen implizite Felder nicht sofort ersetzen, sondern ergaenzen sie fuer Kompatibilitaet.
7. Zeitgebundene Relationen duerfen `validFrom` und `validTo` tragen.
8. `validTo` darf nicht vor `validFrom` liegen.
9. Zeitliche Relationenkonflikte muessen durch Status, Provenienz, Perspektive oder explizite Alternativkanon-Markierung erklaerbar sein.

## KG-0003 Ergebnis

KG-0003 fuehrt ein:

```text
docs/KG-0003-RELATIONS.md
exports/relations-0.1.json
exports/kxf-0.3.json
```

Damit wird KXF ab 0.3 graph-abfragefaehig, ohne die KG-0002-Struktur zu brechen.

KG-0009 erweitert dieses Modell additiv um zeitfaehige Relationen. Bestehende Relation-Records ohne Zeitfelder bleiben gueltig.
