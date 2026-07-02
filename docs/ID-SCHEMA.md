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
LRN:L3:ssf-phy-1101
BLD:L3:noxia-raumhafen-1
PER:L4:soma_retep
DOC:L4:die-horcher
```

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

## Layer

| Layer | Bedeutung | Beispiele |
|---|---|---|
| L0 | Foundation / universelle Konzepte | Information, Energie, Zeit, Raum |
| L1 | Fachwissen | Gravitation, Evolution, Photosynthese, Knowledge Domains |
| L2 | Modelle und Theorien | AVI, Temenon |
| L3 | Anwendungen, Systeme, Kurse, technische Artefakte, Registry | SSF-Kurs, NOXIA-Gebaeude, Domain, Legal-Dokument |
| L4 | Narrative, Figuren, fiktionale Artefakte | Soma Retep, Mia, Die Horcher |

---

## Typ-Praefixe

| Praefix | Typ | Layer-Hinweis |
|---|---|---|
| CON | Concept | meist L0 oder L1 |
| KD | KnowledgeDomain | L1, mit Sonderform `KD:<DOMAIN-CODE>:<LEVEL>` |
| MOD | Model | meist L2 |
| SYS | System | meist L3 |
| ORG | Organization | meist L3 |
| DOM | Domain | meist L3 |
| REPO | Repository | meist L3 |
| LRN | LearningModule | meist L3 |
| UNL | Unlock | meist L3 |
| BLD | Building | meist L3 |
| LEGAL | LegalRecord | meist L3 |
| DOC | Document | L1 bis L4 je nach Funktion |
| PER | Person | meist L3 real oder L4 narrativ |
| PLC | Place | L1 real/wissenschaftlich oder L4 narrativ |
| REQ | Prerequisite | eigene Voraussetzung-ID, verweist auf Source und KnowledgeDomain |
| REL | Relation | eigene Relation-ID, verweist auf Source und Target |
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

Bestehende IDs nach dem Muster:

```text
CON:PHY:gravitation
CON:CHE:wasser
CON:BIO:leben
```

werden nicht blind geloescht, sondern ueber Mappings auf die neue kanonische Layer-ID gefuehrt.

Beispiel:

```json
{
  "id": "MAP:L3:id-migration-con-phy-gravitation",
  "type": "Mapping",
  "source": "CON:PHY:gravitation",
  "target": "CON:L1:gravitation",
  "mappingType": "legacy_id_to_canonical_id",
  "status": "draft_productive"
}
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

---

## Gueltige Richtung

```text
L0 -> L1 -> L2 -> L3 -> L4
```

Nicht gueltig:

```text
L4 -> L0
```
