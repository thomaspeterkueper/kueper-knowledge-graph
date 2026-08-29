# KUEPER Knowledge Graph - ID-Schema

## Grundentscheidung

Die kanonische ID orientiert sich primaer an der Wissensebene, nicht an der Fachdomaene.

Die Fachdomaene bleibt Metadatum.

Begruendung: Foundation-Konzepte wie Information, Zeit, Sprache, Bewusstsein oder Komplexitaet ueberschreiten einzelne Fachdomaenen. Die Wissensebene beschreibt ihre epistemische Rolle stabiler als eine Fachzuordnung.

---

## Grundform

```text
<TYP>:<LAYER>:<slug>
```

Beispiele:

```text
CON:L0:information
CON:L0:energie
CON:L1:gravitation
CON:L1:orbitalmechanik
MOD:L2:avi
SYS:L3:noxia
BLD:L3:noxia-raumhafen-1
PER:L4:soma_retep
OBJ:L4:feli-muschel-mit-sprung
ANI:L4:lumen-katze
DOC:L4:die-horcher
```

LearningModules verwenden ab KG-0013 eine eigene Sonderform; siehe unten.

---

## Sonderform fuer Knowledge Domains

Ab KG-0002 besitzen Knowledge Domains eine eigene kanonische, niveaugebundene ID-Form:

```text
KD:<DOMAIN-CODE>:<LEVEL>
```

Beispiele:

```text
KD:GEO-SEISM:N2
KD:GEO-PETRO:N2
KD:MATH-BAYES:N2
KD:PHYS-QM:N2
```

Begruendung: Eine Wissensvoraussetzung ist nicht nur ein Themenfeld, sondern ein Themenfeld auf einem bestimmten Kompetenzniveau. `GEO-SEISM` allein ist daher kein vollstaendiges Prerequisite-Ziel.

Legacy-IDs im Muster `KNOW:*` bleiben als Aliase und Migrationsquellen erlaubt, duerfen aber nicht mehr als Ziel neuer Prerequisites verwendet werden.

---

## Sonderformen fuer Learning Model

Ab KG-0004 gelten fuer Kompetenzen, Assessments und Lernpfade:

```text
CMP:<DOMAIN-CODE>:<LEVEL>
ASM:SSF:<DOMAIN>-<NUMBER>
PATH:<TARGET-SYSTEM>:<TARGET-ID>:<PURPOSE>
```

Ab KG-0013 gilt fuer konkrete SSF-Lernmodule die kanonische Modul-ID:

```text
<DOMAIN>-L<LEVEL>-<NNNNNN>
```

Beispiele:

```text
CMP:GEO-SEISM:N2
PHY-L1-000003
AST-L1-000001
ASM:SSF:GEO-2201
PATH:OTA:OTA-SCI-0083-2026-DE:READ
```

`CMP` bildet die didaktische Kompetenz zu einer `KD` ab. Ein LearningModule vermittelt Wissen oder Kompetenz und ist als Vermittlungsobjekt weiterhin KG-Layer L3. Das `L<LEVEL>` innerhalb der Modul-ID bezeichnet die didaktische Lernstufe des Moduls und ist nicht der epistemische KG-Layer.

Fruehere Modul-IDs im Muster `LRN:SSF:<DOMAIN>-<NUMBER>` beziehungsweise `LRN:SSF:<DOMAIN>-L<LEVEL>-<NNNNNN>` sind Legacy-IDs. Sie bleiben als `legacyId`/Alias fuer Rueckwaertskompatibilitaet erhalten, duerfen aber nicht mehr als kanonische ID neuer Module vergeben werden.

`ASM` validiert Kompetenz. `PATH` ordnet Module und Assessments zu einem Zielpfad.

---

## LearningModule Source-of-Truth und Projektion

Fuer konkrete SSF-Lernmodule gilt:

```text
learning/*.yaml
    -> Autorenquelle / kuratierte Moduldefinition
    -> exports/kxf-learning-modules-0.1.json
    -> SSF / NOXIA Consumer-Projektion
```

Regeln:

1. `learning/*.yaml` ist die kuratierte Autorenquelle fuer konkrete Lernmodule und deren inhaltliche Metadaten.
2. `exports/kxf-learning-modules-0.1.json` ist die maschinenlesbare KXF-Consumer-Projektion, nicht eine zweite unabhaengige Autorenquelle.
3. Die Projektion darf keine Modul-ID erfinden, die nicht auf eine kuratierte Moduldefinition oder eine explizite Registry-/Migrationsentscheidung zurueckgefuehrt werden kann.
4. Legacy-IDs werden nicht geloescht, sondern als Alias/`legacyId` mitgefuehrt.
5. Consumer wie SSF und NOXIA konsumieren KXF; sie definieren keine kanonischen LearningModule-IDs.

---

## Narrative World Model Sonderformen

Ab KG-0009 gelten fuer zeitfaehige Welt- und Narrativobjekte folgende ID-Formen:

```text
STA:<OBJECT-ID>:<STATE-SLUG>
EVT:<LAYER>:<slug>
KNO:<SUBJECT-ID>:<MODE>:<ABOUT-ID>:<slug>
ARCST:<WORK-ID>:<slug>
SCN:<LAYER>:<work-slug>:<sequence>
PRI:<LAYER>:<slug>
REP:<WORK-ID>:<SUBJECT-ID>:<slug>
```

Ab KG-0015 gelten fuer stabile narrative Einzelobjekte und Tiere zusaetzlich die Grundformen:

```text
OBJ:<LAYER>:<slug>
ANI:<LAYER>:<slug>
```

Beispiele:

```text
STA:PER:L4:alice:2098-03
EVT:L4:korolev-incident-2098-001
KNO:PER:L4:alice:BELIEF:EVT:L4:incident-x:cause-y
ARCST:DOC:L4:example-novel:identity
SCN:L4:example-novel:0042
PRI:L0:perspektive-ist-nicht-weltwahrheit
REP:DOC:L4:feli-band-1:PLC:L4:ort-x:kinderperspektive
OBJ:L4:feli-muschel-mit-sprung
ANI:L4:lumen-katze
```

`ARCST` bezeichnet einen Story Arc und ist bewusst von `ARC` fuer OTA-Werk-Setzungen getrennt.

`STA` beschreibt den zeitgebundenen Zustand einer bereits existierenden Entitaet und erzeugt keine neue Weltidentitaet.

`KNO` beschreibt perspektivische Wissens-, Glaubens- oder Behauptungszustaende. Der Modus muss mindestens zwischen `KNOWLEDGE`, `BELIEF`, `CLAIM` und `READER_KNOWLEDGE` unterscheiden koennen.

`PRI` beschreibt ein explizit kuratiertes Principle. Ein Principle kann philosophisch, ethisch, weltlogisch oder narrativ relevant sein. Es darf nicht allein aus einer einzelnen Szene als allgemeine Weltanschauung abgeleitet werden.

`REP` beschreibt eine werk- oder perspektivgebundene Representation eines bereits kanonisch identifizierten Subjects. Eine Representation erzeugt keine konkurrierende Identitaet fuer Person, Ort, Objekt oder Ereignis.

`OBJ` bezeichnet ein individuelles, nicht-lebendiges physisches oder narratives Objekt mit stabiler Identitaet, sofern kein spezifischerer KG-Typ greift. Stoffklassen, allgemeine Gegenstandsklassen und Konzepte werden nicht als `OBJ` modelliert.

`ANI` bezeichnet ein individuelles Tier mit stabiler narrativer Identitaet. Biologische Arten und Taxa werden nicht als `ANI` modelliert.

---

## Layer

| Layer | Bedeutung | Beispiele |
|---|---|---|
| L0 | Foundation / universelle Konzepte | Information, Energie, Zeit, Raum, fundamentale Principles |
| L1 | Fachwissen | Gravitation, Evolution, Photosynthese, Knowledge Domains |
| L2 | Modelle und Theorien | AVI, Temenon |
| L3 | Anwendungen, Systeme, Kurse, technische Artefakte, Registry | SSF-Kurs, LearningModule, Kompetenz, Assessment, NOXIA-Gebaeude, Domain, Legal-Dokument |
| L4 | Narrative, Figuren, fiktionale Artefakte | Soma Retep, Mia, Die Horcher, fiktionale Events, individuelle Objekte, Tiere, Scenes, Story Arcs, werkbezogene Representations |

---

## Typ-Praefixe

| Praefix | Typ | Layer-Hinweis |
|---|---|---|
| CON | Concept | meist L0 oder L1 |
| KD | KnowledgeDomain | L1, mit Sonderform `KD:<DOMAIN-CODE>:<LEVEL>` |
| CMP | Competency | meist L3, didaktische Kompetenz zu KD |
| ASM | Assessment | meist L3, validiert Competency |
| PATH | LearningPath | meist L3, geordnete Lernroute |
| MOD | Model | meist L2 |
| SYS | System | meist L3 |
| ORG | Organization | meist L3 |
| DOM | Domain | meist L3 |
| REPO | Repository | meist L3 |
| LRN | Legacy-Praefix fuer LearningModule | L3; keine neue kanonische Modul-ID |
| UNL | Unlock | meist L3 |
| BLD | Building | meist L3 |
| LEGAL | LegalRecord | meist L3 |
| DOC | Document | L1 bis L4 je nach Funktion |
| PER | Person | meist L3 real oder L4 narrativ |
| PLC | Place | L1 real/wissenschaftlich oder L4 narrativ |
| OBJ | Object | individuelles nicht-lebendiges Objekt mit stabiler Identitaet; meist L4 narrativ |
| ANI | Animal | individuelles Tier mit stabiler narrativer Identitaet; meist L4 |
| STA | State | zeitgebundener Zustand einer bestehenden Entitaet; meist L4 narrativ |
| EVT | Event | zeitlich oder ordinal eingeordnetes Ereignis; meist L4 narrativ |
| KNO | KnowledgeAssertion | Wissen, Glauben, Behauptung oder Reader Knowledge |
| ARCST | StoryArc | werkbezogene narrative Entwicklung; meist L4 |
| SCN | Scene | werkbezogener narrativer Ausschnitt; L4 |
| PRI | Principle | explizit kuratierter philosophischer, ethischer oder weltlogischer Grundsatz; meist L0-L2 |
| REP | Representation | werk-/perspektivgebundene Darstellung eines kanonischen Subjects; meist L4 |
| REQ | Prerequisite | eigene Voraussetzung-ID, verweist auf Source und KnowledgeDomain |
| REL | Relation | eigene Relation-ID, verweist auf Quelle und Target |
| MAP | Mapping | eigene Mapping-ID, verweist auf Quelle und Ziel |

---

## Domaene als Metadatum

Fachdomaenen werden nicht in die primaere ID gezwungen.

Beispiel:

```json
{
  "id": "CON:L1:gravitation",
  "type": "Concept",
  "layer": "L1",
  "domain": ["PHY", "AST"],
  "name": "Gravitation"
}
```

Knowledge Domains sind die Ausnahme: Sie modellieren eine Wissensvoraussetzung und duerfen deshalb den fachlichen Domain-Code direkt in ihrer ID tragen.

LearningModules besitzen ebenfalls eine explizite Sonderform, weil ihre Modul-ID zugleich als stabile didaktische Adresse in SSF/KXF dient. Diese Ausnahme aendert nicht ihren KG-Layer L3.

```json
{
  "id": "KD:GEO-SEISM:N2",
  "type": "KnowledgeDomain",
  "layer": "L1",
  "code": "GEO-SEISM",
  "level": "N2",
  "title": "Seismologie - arbeitsfaehiges Grundverstaendnis"
}
```

---

## Prerequisite-IDs

Prerequisites verwenden ab KG-0002 diese Form:

```text
REQ:<SOURCE-ID>:<TARGET-KD-ID>:<PURPOSE>
```

Beispiel:

```text
REQ:DOC:OTA:OTA-SCI-0083-2026-DE:KD:GEO-SEISM:N2:READ
```

Die ID ist bewusst aus Quelle, Ziel und Zweck zusammengesetzt, damit sie eindeutig und maschinenlesbar bleibt.

---

## Migration bestehender IDs

Bestehende IDs werden nicht blind geloescht, sondern ueber Alias-/Mapping-Felder auf die neue kanonische ID gefuehrt.

Beispiele:

```text
CON:PHY:gravitation -> CON:L1:gravitation
LRN:SSF:PHY-1101   -> PHY-L1-000001
```

Legacy-Wissensdomaenen aus KG-0001 werden ebenfalls gemappt:

```json
{
  "id": "MAP:KG-0002:KNOW-GEO-SEISM-N2",
  "type": "Mapping",
  "source": "KNOW:GEO-SEISM + N2",
  "target": "KD:GEO-SEISM:N2",
  "mappingType": "legacy_domain_level_to_canonical_knowledge_domain",
  "status": "draft_productive"
}
```

---

## Harte Regeln

1. Keine neuen Inhalte ohne ID.
2. Keine ID ohne Typ.
3. Keine kanonische Entitaet ohne Layer.
4. Keine Relation ohne Quelle und Ziel.
5. Kein Mapping ohne Quelle und Ziel.
6. Kein Export ohne Schema-Version.
7. Narrative duerfen keine L0- oder L1-Wissensbasis definieren.
8. Websites konsumieren kanonische Daten, sie definieren sie nicht.
9. Keine neue Prerequisite ohne `KD:<DOMAIN-CODE>:<LEVEL>`-Ziel.
10. Keine neue KnowledgeDomain ohne Beschreibung.
11. Keine Competency ohne KnowledgeDomain.
12. Kein LearningModule ohne `teaches`.
13. Kein Assessment ohne `validates`.
14. Kein LearningPath ohne `target` und `steps`; geplante `purpose: "learn"`-Pfade duerfen `target` offen lassen, bis das Zielobjekt (Document/Unlock/Certification) vom kuratierenden System definiert ist.
15. Neue LearningModules verwenden `<DOMAIN>-L<LEVEL>-<NNNNNN>` als kanonische ID.
16. `LRN:SSF:*` darf fuer LearningModules nur noch als Legacy-ID/Alias vorkommen.
17. Ein LearningModule bleibt KG-Layer L3; die Lernstufe in seiner Modul-ID ist davon unabhaengig.
18. KXF-LearningModule-Exporte sind Projektionen der kuratierten KG-Modulquelle und keine unabhaengige zweite Source of Truth.
19. Kein `STA` ohne bestehendes `subject`-Objekt.
20. Kein `EVT` ohne zeitliche oder ordinale Einordnung.
21. `KNO` darf perspektivisches Wissen oder Glauben nie als objektive Weltwahrheit implizieren.
22. `ARCST` darf nicht fuer OTA-ARC-Werk-Setzungen verwendet werden.
23. `SCN` und `ARCST` bleiben werkbezogene Narrativmetadaten; sie ersetzen keine kanonischen Weltobjekte.
24. Kein `REP` ohne kanonisches `subject` und werk- oder perspektivbezogenen Kontext.
25. Eine `REP` darf keine zweite kanonische Identitaet fuer ihr `subject` erzeugen.
26. Ein `PRI` wird nur als allgemeiner Grundsatz angelegt, wenn seine Geltung explizit kuratiert ist; einzelne Werke oder Szenen duerfen keine universelle Principle-Geltung implizieren.
27. `OBJ` bezeichnet nur individuelle Objekte mit stabiler Identitaet; spezifischere vorhandene Typen haben Vorrang.
28. `ANI` bezeichnet individuelle Tiere und keine biologischen Taxa.
29. Sprach- oder werkbezogene Benennungen von `OBJ` und `ANI` werden ueber Representation/Terminologie modelliert und erzeugen keine sprachspezifischen Doppelidentitaeten.

---

## Gueltige Richtung

```text
L0 -> L1 -> L2 -> L3 -> L4
```

Nicht gueltig:

```text
L4 -> L0
```
