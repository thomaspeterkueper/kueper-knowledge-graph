# KG-0002 - Kanonische Knowledge Domains

## Status

Draft productive, 2026-07-02

## Zweck

KG-0002 hebt die in KG-0001 eingefuehrten Wissensdomaenen vom Muster `KNOW:*` auf konkrete, niveaugebundene KnowledgeDomain-Entitaeten.

Damit werden freie Voraussetzungen wie `GEO-SEISM N2` nicht mehr als Text oder als Domain-plus-Level-Kombination gepflegt, sondern als stabile ID:

```text
KD:GEO-SEISM:N2
```

## Grundregel

```text
Keine Prerequisite ohne KnowledgeDomain-ID.
Keine Domain ohne Beschreibung.
Keine OTA-Verknuepfung ohne Relation.
```

## Kanonische ID-Form

```text
KD:<DOMAIN-CODE>:<LEVEL>
```

Beispiele:

```text
KD:GEO-SEISM:N2
KD:MATH-BAYES:N2
KD:PHYS-QM:N2
```

`KD` bezeichnet eine KnowledgeDomain auf einem konkreten Niveau. Ein reiner Themenraum ohne Niveau kann weiterhin als Alias, Klassifikator oder Legacy-Mapping existieren, ist aber keine vollstaendige Prerequisite.

## Level

| Level | Bedeutung | Primaere Nutzung |
|---|---|---|
| N1 | Orientierung / Grundbegriffe | Einstieg, Glossar, Erstverstehen |
| N2 | Arbeitsfaehiges Grundverstaendnis | Lesen anspruchsvoller OTA-Dokumente |
| N3 | Vertiefte Anwendung | Modelle, Daten, Uebungen, Transfer |
| N4 | Fachnahe Expertise | Analyse, Kritik, eigene Modellbildung |

## KnowledgeDomain-Struktur

```json
{
  "id": "KD:GEO-SEISM:N2",
  "type": "KnowledgeDomain",
  "layer": "L1",
  "code": "GEO-SEISM",
  "level": "N2",
  "title": "Seismologie - arbeitsfaehiges Grundverstaendnis",
  "parent": "KD:GEO:N1",
  "description": "Grundlagen seismischer Wellen, Messdaten und Interpretationslogik, ausreichend zum Lesen planetologischer OTA-Dokumente.",
  "aliases": ["GEO-SEISM N2", "Seismology N2", "Mars-Seismik N2"]
}
```

## Prerequisite-Struktur

```json
{
  "id": "REQ:DOC:OTA:OTA-SCI-0083-2026-DE:KD:GEO-SEISM:N2:READ",
  "type": "Prerequisite",
  "from": "DOC:OTA:OTA-SCI-0083-2026-DE",
  "relation": "REQUIRES",
  "to": "KD:GEO-SEISM:N2",
  "purpose": "read",
  "status": "canonical"
}
```

## Zulaessige Relationen

| Relation | Quelle | Ziel | Bedeutung |
|---|---|---|---|
| REQUIRES | Document, LearningModule, Project | KnowledgeDomain | benoetigt Vorwissen |
| TEACHES | LearningModule | KnowledgeDomain | vermittelt Wissen |
| COVERS | Document | KnowledgeDomain | behandelt Thema, aber nicht zwingend Voraussetzung |
| PARENT_OF | KnowledgeDomain | KnowledgeDomain | Taxonomie / Oberbegriff |
| SATISFIES | LearningModule | Prerequisite | Modul deckt konkrete Voraussetzung ab |

## Migration aus KG-0001

KG-0001 enthielt bereits Domains und Prerequisites im Muster:

```text
KNOW:GEO-SEISM
REQ:OTA-SCI-0083-2026-DE:KNOW-GEO-SEISM:N2:READ
```

KG-0002 fuehrt diese auf kanonische IDs:

```text
KNOW:GEO-SEISM -> KD:GEO-SEISM:N1 bis KD:GEO-SEISM:N4
REQ:...:KNOW-GEO-SEISM:N2:READ -> REQ:DOC:OTA:OTA-SCI-0083-2026-DE:KD:GEO-SEISM:N2:READ
```

Die alten `KNOW:*`-IDs gelten ab KG-0002 als Legacy-Aliase, nicht als Ziel fuer neue Prerequisites.

## Erste kanonische Domains

| ID | Titel | Parent |
|---|---|---|
| KD:GEO:N1 | Geowissenschaften - Orientierung | - |
| KD:GEO-SEISM:N2 | Seismologie - arbeitsfaehiges Grundverstaendnis | KD:GEO:N1 |
| KD:GEO-PETRO:N2 | Petrologie - arbeitsfaehiges Grundverstaendnis | KD:GEO:N1 |
| KD:GEO-PLANET:N1 | Planetologie und planetare Struktur - Orientierung | KD:GEO:N1 |
| KD:MATH:N1 | Mathematik - Orientierung | - |
| KD:MATH-BAYES:N2 | Bayes'sche Inferenz - arbeitsfaehiges Grundverstaendnis | KD:MATH:N1 |
| KD:MATH-DIFF:N2 | Differentialgleichungen - arbeitsfaehiges Grundverstaendnis | KD:MATH:N1 |
| KD:PHYS:N1 | Physik - Orientierung | - |
| KD:PHYS-QM:N2 | Quantenmechanik - arbeitsfaehiges Grundverstaendnis | KD:PHYS:N1 |
| KD:PHYS-EM:N2 | Elektromagnetismus - arbeitsfaehiges Grundverstaendnis | KD:PHYS:N1 |
| KD:PHIL-SCI:N2 | Wissenschaftstheorie - arbeitsfaehiges Grundverstaendnis | - |
| KD:LANG-EN:N2 | Englisch fuer wissenschaftliche Primaerliteratur | - |

## OTA zu SSF zu NOXIA

```text
OTA-Dokument
  -> REQUIRES
KnowledgeDomain
  -> SATISFIED_BY / TEACHES
SSF LearningModule
  -> UNLOCKS
NOXIA Anwendung, Gebaeude, Mechanik oder Forschungsoption
```

Damit wird aus einer dokumentarischen Voraussetzung ein maschinenlesbarer Lernpfad.
