# KG-0005 - OTA Ingestion Pipeline

## Status

Draft productive, 2026-07-02

## Zweck

KG-0005 definiert, wie OTA-Dokumente aus dem OverTime Archive in den KUEPER Knowledge Graph uebernommen werden.

Der Import uebernimmt nicht den Volltext. Der Knowledge Graph erzeugt und pflegt nur kanonische Metadaten, IDs, KnowledgeDomain-Verweise, Prerequisites, Relations, Competencies und optionale LearningPath-Anknuepfungen.

## Grundsatz

```text
OTA besitzt den Volltext.
KG besitzt die kanonische Metadatenstruktur.
SSF nutzt die daraus ableitbaren Lernpfade.
NOXIA nutzt daraus ableitbare Forschungs- und Unlock-Mechaniken.
```

## Ingestion-Stufen

| Stufe | Name | Zweck |
|---|---|---|
| I0 | Source Detection | OTA-Dokument finden und identifizieren |
| I1 | Metadata Extraction | Signatur, Titel, Serie, Sprache, Status, Marker extrahieren |
| I2 | Domain Normalization | freie Domain-/Prerequisite-Angaben auf `KD:*:N*` mappen |
| I3 | KG Record Generation | Document, Prerequisite, Relation erzeugen |
| I4 | Learning Hook Generation | Competency- und LearningPath-Anknuepfung vorbereiten |
| I5 | Validation | IDs, Zielreferenzen, Schema und Legacy-Mappings pruefen |
| I6 | Export | KXF und Spezialexports aktualisieren |

## Minimaler OTA-Input

Ein OTA-Dokument muss fuer produktive Ingestion mindestens enthalten:

```text
Signatur
Titel
Serie
Sprache
Status
Kurzbeschreibung oder Abstract
Prerequisites oder Domain-Hinweise
Markerprofil
```

Fehlen Prerequisites, darf der Import ein Dokument registrieren, aber keine kanonischen `REQUIRES`-Kanten erzeugen.

## Normalisierung

Freie Angaben werden auf kanonische KnowledgeDomain-IDs gefuehrt.

```text
GEO-SEISM N2 -> KD:GEO-SEISM:N2
MATH-BAYES N2 -> KD:MATH-BAYES:N2
PHYS-QM N2 -> KD:PHYS-QM:N2
```

Wenn keine eindeutige Domain existiert, erzeugt der Import keinen neuen Domain-Record automatisch. Stattdessen wird ein Review-Eintrag erzeugt.

## Erzeugte Records

### Document

```json
{
  "id": "DOC:OTA:OTA-SCI-0083-2026-DE",
  "type": "Document",
  "system": "SYS:KUEPER:ota",
  "canonicalId": "OTA-SCI-0083-2026-DE",
  "title": "Transkrustaler Magmatismus am Mars",
  "status": "Canonical",
  "contentOwnership": "OverTime Archive",
  "metadataOwner": "KUEPER Knowledge Graph"
}
```

### Prerequisite

```json
{
  "id": "REQ:DOC:OTA:OTA-SCI-0083-2026-DE:KD:GEO-SEISM:N2:READ",
  "type": "Prerequisite",
  "from": "DOC:OTA:OTA-SCI-0083-2026-DE",
  "relation": "REQUIRES",
  "to": "KD:GEO-SEISM:N2",
  "purpose": "read",
  "status": "canonical",
  "source": "KG-0005"
}
```

### Relation

```json
{
  "id": "REL:DOC:OTA:OTA-SCI-0083-2026-DE:REQUIRES:KD:GEO-SEISM:N2",
  "type": "Relation",
  "from": "DOC:OTA:OTA-SCI-0083-2026-DE",
  "relation": "REQUIRES",
  "to": "KD:GEO-SEISM:N2",
  "status": "canonical",
  "source": "KG-0005"
}
```

## Review-Faelle

Ein Ingestion-Lauf darf keine neuen kanonischen Wissensobjekte ohne Kurationsentscheidung erfinden.

Review wird noetig, wenn:

1. ein Prerequisite-Kuerzel unbekannt ist,
2. das Level fehlt,
3. mehrere KnowledgeDomains passen,
4. ein Dokumentstatus unklar ist,
5. die Signatur nicht dem OTA-Schema entspricht,
6. ein Zielrecord fehlt,
7. ein Mapping nur heuristisch waere.

## IngestionRun

Jeder Importlauf wird als eigener Record protokolliert.

```json
{
  "id": "ING:OTA:2026-07-02:0001",
  "type": "IngestionRun",
  "sourceSystem": "SYS:KUEPER:ota",
  "targetSystem": "SYS:KUEPER:knowledge-graph",
  "status": "draft_productive",
  "documentsProcessed": 2,
  "recordsCreated": 0,
  "recordsProjected": 0,
  "reviewRequired": 0
}
```

## Validierungsregeln

1. Kein OTA-Import ueberschreibt Volltext.
2. Kein Import erzeugt ungeprueft neue `KD`-IDs.
3. Jede erzeugte Prerequisite muss auf existierende `KD` zeigen.
4. Jede erzeugte Relation muss auf existierende Quelle und Ziel zeigen.
5. Jedes Dokument erhaelt eine `DOC:OTA:*`-ID.
6. Jeder Lauf erzeugt einen `ING:*`-Record.
7. Review-Faelle werden exportiert, nicht stillschweigend korrigiert.

## Ergebnis von KG-0005

```text
docs/KG-0005-OTA-INGESTION.md
exports/ingestion-rules-0.1.json
exports/ingestion-runs-0.1.json
exports/kxf-0.5.json
```
