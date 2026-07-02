# KG-0004 - SSF Learning Model

## Status

Draft productive, 2026-07-02

## Zweck

KG-0004 verbindet Knowledge Domains und Prerequisites mit der Solar Science Foundation.

Ab KG-0004 kann der Knowledge Graph nicht nur sagen, welches Vorwissen ein OTA-Dokument benoetigt, sondern auch, welche Kompetenzen und Lernmodule dieses Vorwissen aufbauen.

## Grundkette

```text
OTA Document
  -> REQUIRES
KnowledgeDomain
  -> REPRESENTED_BY
Competency
  -> TAUGHT_BY
LearningModule
  -> VALIDATED_BY
Assessment
  -> PART_OF
LearningPath
```

## Neue Entitaetstypen

| Typ | Praefix | Zweck |
|---|---|---|
| Competency | CMP | konkrete beherrschbare Kompetenz zu einer KnowledgeDomain |
| LearningModule | LRN | SSF-Modul, das Kompetenzen vermittelt |
| Assessment | ASM | prueft oder validiert Kompetenzen |
| LearningPath | PATH | geordnete Sequenz aus Modulen, Assessments und Zielobjekt |

## Competency

Eine `Competency` ist die didaktische Fassung einer KnowledgeDomain. Sie beschreibt, was ein Lernender konkret koennen oder verstehen soll.

```json
{
  "id": "CMP:GEO-SEISM:N2",
  "type": "Competency",
  "knowledgeDomain": "KD:GEO-SEISM:N2",
  "title": "Seismologie N2 anwenden",
  "description": "Arbeitsfaehiges Verstaendnis seismologischer Grundkonzepte fuer planetologische OTA-Dokumente.",
  "level": "N2",
  "status": "draft_productive"
}
```

## LearningModule

Ein `LearningModule` vermittelt mindestens eine Kompetenz oder ein Konzept.

```json
{
  "id": "LRN:SSF:GEO-2201",
  "type": "LearningModule",
  "system": "SYS:KUEPER:ssf",
  "title": "Einfuehrung in die planetare Seismologie",
  "teaches": ["CMP:GEO-SEISM:N2"],
  "estimatedEffort": "medium",
  "status": "draft_productive"
}
```

## Assessment

Ein `Assessment` validiert Kompetenzen. Es kann als Quiz, Aufgabe, Reflexionsfrage, Modellierungsuebung oder Kuratorenpruefung umgesetzt werden.

```json
{
  "id": "ASM:SSF:GEO-2201",
  "type": "Assessment",
  "system": "SYS:KUEPER:ssf",
  "validates": ["CMP:GEO-SEISM:N2"],
  "assessmentType": "conceptual_and_applied",
  "status": "draft_productive"
}
```

## LearningPath

Ein `LearningPath` ist eine geordnete Lernroute zu einem Ziel. Das Ziel kann ein OTA-Dokument, ein NOXIA-Research-Objekt, ein Unlock oder eine SSF-Zertifizierung sein.

```json
{
  "id": "PATH:OTA:OTA-SCI-0083-2026-DE:READ",
  "type": "LearningPath",
  "target": "DOC:OTA:OTA-SCI-0083-2026-DE",
  "purpose": "read",
  "requires": [
    "REQ:DOC:OTA:OTA-SCI-0083-2026-DE:KD:GEO-SEISM:N2:READ"
  ],
  "steps": [
    "LRN:SSF:GEO-2201",
    "ASM:SSF:GEO-2201"
  ],
  "status": "draft_productive"
}
```

## Neue Relationen

| Relation | Von | Nach | Bedeutung |
|---|---|---|---|
| REPRESENTS | Competency | KnowledgeDomain | Kompetenz repraesentiert Domain-Niveau |
| TEACHES | LearningModule | Competency | Modul vermittelt Kompetenz |
| VALIDATES | Assessment | Competency | Assessment prueft Kompetenz |
| SATISFIES | Competency, Assessment, LearningModule | Prerequisite | erfuellt konkrete Voraussetzung |
| PART_OF | LearningModule, Assessment | LearningPath | Element gehoert zu Lernpfad |
| TARGETS | LearningPath | Document, Unlock, Building, Project | Lernpfad fuehrt zu Ziel |

## Beispiel: OTA-SCI-0083

OTA-SCI-0083 benoetigt:

```text
KD:GEO-SEISM:N2
KD:GEO-PETRO:N2
KD:MATH-BAYES:N2
KD:GEO-PLANET:N1
KD:LANG-EN:N2
```

KG-0004 legt dazu Kompetenzen und erste SSF-Modulplatzhalter an:

```text
CMP:GEO-SEISM:N2 -> LRN:SSF:GEO-2201
CMP:GEO-PETRO:N2 -> LRN:SSF:GEO-2202
CMP:MATH-BAYES:N2 -> LRN:SSF:MATH-2201
CMP:GEO-PLANET:N1 -> LRN:SSF:GEO-1101
CMP:LANG-EN:N2 -> LRN:SSF:LANG-2201
```

Daraus entsteht:

```text
PATH:OTA:OTA-SCI-0083-2026-DE:READ
```

## Validierungsregeln

1. Keine Competency ohne KnowledgeDomain.
2. Kein LearningModule ohne `teaches`.
3. Kein Assessment ohne `validates`.
4. Kein LearningPath ohne `target` und `steps`.
5. Ein LearningPath darf auf ein OTA-Dokument zeigen, aber das OTA-Dokument bleibt im OTA-System.
6. SSF vermittelt und validiert Wissen; der Knowledge Graph definiert die kanonischen IDs.

## KG-0004 Ergebnis

```text
docs/KG-0004-LEARNING-MODEL.md
exports/competencies-0.1.json
exports/learning-model-0.1.json
exports/kxf-0.4.json
```
