# KG-ARC-0001-2026-DE

## Wissensdomänen und Voraussetzungen im KUEPER Knowledge Graph

*Projektübergreifender Standard für Knowledge Domains, Kompetenzstufen und Voraussetzungskanten im KUEPER-Ökosystem*

---

| Feld | Inhalt |
|------|--------|
| **Signatur** | KG-ARC-0001-2026-DE |
| **Titel** | Wissensdomänen und Voraussetzungen im KUEPER Knowledge Graph |
| **Kategorie** | KG-ARC (Knowledge Graph Architecture) |
| **Temporaler Marker** | 2026 (achronisch gültig) |
| **Version** | 1.0 |
| **Status** | Kanonisch |
| **Geltungsbereich** | KUEPER Knowledge Graph; OTA; SSF; NOXIA; KUEPER.com; weitere KUEPER-Projekte |
| **Bezug** | OTA-ARC-0005-2026-DE; KXF-SPEC; ECOSYSTEM; ID-SCHEMA |

---

Kurator: **Thomas Peter Küper** · Frankfurt am Main · 2026-07-01

---

## PRÄAMBEL

> **[KN-0.1]**
>
> Wissen ist nicht nur Inhalt. Wissen hat Voraussetzungen.
>
> Der KUEPER Knowledge Graph definiert deshalb Wissensdomänen nicht als freie Textlabels, sondern als kanonische Entitäten. OTA-Dokumente, SSF-Lernmodule, NOXIA-Forschungsobjekte und KUEPER.com-Inhalte referenzieren diese Entitäten über stabile IDs.
>
> Dadurch entsteht eine projektübergreifende Lern- und Forschungsarchitektur: OTA beschreibt Wissensvoraussetzungen, SSF erfüllt sie durch Lernmodule, NOXIA nutzt sie als Forschungs- und Spielmechanik, KUEPER.com veröffentlicht verständliche Einstiege. Der Knowledge Graph bleibt die Single Source of Truth. — T.P.K.

---

## I. GRUNDSATZ [R]

### 1.1 Zentrale Regel

Keine Wissensvoraussetzung ohne kanonische KnowledgeDomain-ID.

Das bedeutet:

- Wissensvoraussetzungen werden nicht frei als Text gepflegt.
- Jedes Wissensgebiet erhält eine stabile ID im KUEPER Knowledge Graph.
- Alle Projekte referenzieren dieselbe ID.
- Synonyme, Übersetzungen und Projektvarianten werden als Aliase oder Mappings gepflegt, nicht als neue Primärobjekte.

### 1.2 Beispiel

Nicht kanonisch:

```text
GEO-SEISM
Seismologie
Planetary Seismology
Mars-Seismik
```

Kanonisch:

```text
KNOW:GEO-SEISM
```

Diese ID kann anschließend von OTA, SSF, NOXIA und KUEPER.com gemeinsam verwendet werden.

---

## II. ENTITÄTSKLASSE KNOWLEDGEDOMAIN [R]

### 2.1 Definition

Eine `KnowledgeDomain` ist ein kanonisches Wissensgebiet, das als Voraussetzung, Lernziel, Forschungsanforderung oder Veröffentlichungsrahmen verwendet werden kann.

### 2.2 Minimalstruktur

```json
{
  "id": "KNOW:GEO-SEISM",
  "type": "KnowledgeDomain",
  "name": "Seismologie",
  "description": "Seismische Wellenausbreitung, Tomographie und Interpretation geophysikalischer Signale.",
  "levelSupport": ["N1", "N2", "N3", "N4"],
  "aliases": ["GEO-SEISM", "Planetary seismology", "Mars-Seismik"]
}
```

### 2.3 ID-Schema

KnowledgeDomain-IDs verwenden das Präfix:

```text
KNOW:
```

Format:

```text
KNOW:<BEREICH>-<DOMÄNE>
```

Beispiele:

```text
KNOW:PHYS-WAVE
KNOW:GEO-SEISM
KNOW:MATH-BAYES
KNOW:LANG-SCI
KNOW:TOOL-PEERLIT
```

### 2.4 Abgrenzung

Eine KnowledgeDomain ist kein Dokument, kein Modul und kein Projekt.

| Objekt | Beispiel | Bedeutung |
|--------|----------|-----------|
| Dokument | OTA-SCI-0083-2026-DE | Kuratierter Wissensinhalt |
| Lernmodul | SSF-GEO-2101 | Didaktische Vermittlung |
| Forschungsobjekt | NOXIA-RESEARCH-MARS-MANTLE | Anwendung im Spiel-/Forschungssystem |
| KnowledgeDomain | KNOW:GEO-SEISM | Kanonisches Wissensgebiet |

---

## III. KOMPETENZSTUFEN [R]

### 3.1 Standardstufen

| Stufe | Bezeichnung | Definition |
|-------|-------------|------------|
| **N1** | Grundlagen | Schulwissen oder populärwissenschaftliche Einführung genügt. Das Material erklärt zentrale Begriffe kurz mit. |
| **N2** | Fortgeschritten | Universitäres Grundstudium oder äquivalente Selbstbildung nötig. Fachbegriffe werden nicht vollständig eingeführt. |
| **N3** | Experte | Primärliteratur, Fachmethodik und peer-review-nahe Argumentation werden vorausgesetzt. |
| **N4** | Kurator / Forschung | Fähigkeit, Quellen, Modelle, Daten und epistemologische Marker eigenständig kuratorisch oder forschungsnah zu integrieren. |

### 3.2 Verhältnis zu OTA-ARC-0005

OTA-ARC-0005-2026-DE arbeitet zunächst mit N1 bis N3. Der Knowledge Graph definiert N4 bereits als projektübergreifende Erweiterungsstufe, damit OTA-, SSF- und NOXIA-Strukturen später nicht migriert werden müssen.

N4 ist optional. Ein Projekt muss N4 nicht verwenden, darf aber keine eigene vierte Stufe unter anderem Namen einführen.

---

## IV. PROJEKTÜBERGREIFENDE ROLLEN [R]

### 4.1 OTA

OTA beschreibt Wissensvoraussetzungen.

Ein OTA-Dokument verweist auf KnowledgeDomains, wenn bestimmte Kenntnisse nötig sind, um das Dokument zu lesen oder selbst gleichwertig zu kuratieren.

Beispiel:

```json
{
  "document": "OTA-SCI-0083-2026-DE",
  "requires": [
    { "domain": "KNOW:GEO-SEISM", "level": "N2", "purpose": "read" },
    { "domain": "KNOW:GEO-PETRO", "level": "N2", "purpose": "read" },
    { "domain": "KNOW:MATH-BAYES", "level": "N2", "purpose": "read" }
  ]
}
```

### 4.2 SSF

SSF erfüllt Wissensvoraussetzungen durch Lernmodule.

Ein SSF-Modul gibt an, welche KnowledgeDomain es auf welchem Niveau vermittelt.

Beispiel:

```json
{
  "module": "SSF-GEO-2101",
  "teaches": {
    "domain": "KNOW:GEO-SEISM",
    "level": "N2"
  }
}
```

### 4.3 NOXIA

NOXIA nutzt Wissensvoraussetzungen als Forschungs-, Spiel- und Entscheidungsmechanik.

Ein NOXIA-Forschungsprojekt kann ermitteln, welche Domains fehlen und welche SSF-Module empfohlen werden.

Beispiel:

```json
{
  "project": "NOXIA-RESEARCH-MARS-MANTLE",
  "requires": [
    { "domain": "KNOW:GEO-SEISM", "level": "N2" },
    { "domain": "KNOW:MATH-BAYES", "level": "N2" }
  ]
}
```

### 4.4 KUEPER.com

KUEPER.com veröffentlicht verständliche Einstiege, Übersichten und öffentliche Erklärtexte. Diese Inhalte dürfen KnowledgeDomains verwenden, ersetzen aber nicht die kanonische Definition im Knowledge Graph.

---

## V. RELATIONSTYPEN [R]

### 5.1 Neue kanonische Relationen

| Relation | Von | Nach | Bedeutung |
|----------|-----|------|-----------|
| `DOCUMENT_REQUIRES_DOMAIN` | OTA/KUEPER-Dokument | KnowledgeDomain | Dokument setzt Wissensgebiet voraus |
| `MODULE_TEACHES_DOMAIN` | SSF-Modul | KnowledgeDomain | Modul vermittelt Wissensgebiet |
| `PROJECT_REQUIRES_DOMAIN` | NOXIA-Projekt | KnowledgeDomain | Projekt benötigt Wissensgebiet |
| `DOMAIN_REQUIRES_DOMAIN` | KnowledgeDomain | KnowledgeDomain | Wissensgebiet setzt anderes Wissensgebiet voraus |
| `CONTENT_INTRODUCES_DOMAIN` | KUEPER.com-Inhalt | KnowledgeDomain | Öffentlicher Inhalt führt in Wissensgebiet ein |

### 5.2 Relation mit Niveauangabe

Voraussetzungskanten müssen mindestens enthalten:

```json
{
  "from": "OTA-SCI-0083-2026-DE",
  "relation": "DOCUMENT_REQUIRES_DOMAIN",
  "to": "KNOW:GEO-SEISM",
  "level": "N2",
  "purpose": "read"
}
```

Zulässige `purpose`-Werte:

| Wert | Bedeutung |
|------|-----------|
| `read` | Voraussetzung zum Lesen oder Verstehen |
| `create` | Voraussetzung zum Erstellen eines gleichwertigen Dokuments |
| `teach` | Voraussetzung zum Unterrichten oder Erklären |
| `research` | Voraussetzung für Forschung, Analyse oder Modellierung |
| `play` | Voraussetzung oder Fähigkeit innerhalb einer NOXIA-Spielmechanik |

---

## VI. KXF-ERWEITERUNG [R]

### 6.1 Neue Top-Level-Felder

KXF-Exporte sollen zusätzlich zu bestehenden Feldern folgende Felder unterstützen:

```json
{
  "knowledgeDomains": [],
  "prerequisites": []
}
```

### 6.2 Beispiel KnowledgeDomain

```json
{
  "id": "KNOW:MATH-BAYES",
  "type": "KnowledgeDomain",
  "name": "Bayes'sche Inferenz",
  "description": "Wahrscheinlichkeitstheoretische Aktualisierung von Annahmen anhand von Evidenz.",
  "levelSupport": ["N1", "N2", "N3", "N4"],
  "aliases": ["MATH-BAYES", "Bayesian inference", "Bayes-Inferenz"]
}
```

### 6.3 Beispiel Voraussetzung

```json
{
  "id": "REQ:OTA-SCI-0083-2026-DE:KNOW-MATH-BAYES:N2:READ",
  "type": "Prerequisite",
  "from": "OTA-SCI-0083-2026-DE",
  "relation": "DOCUMENT_REQUIRES_DOMAIN",
  "to": "KNOW:MATH-BAYES",
  "level": "N2",
  "purpose": "read"
}
```

---

## VII. START-TAXONOMIE [R]

Diese Start-Taxonomie übernimmt die in OTA-ARC-0005 eingeführten Kürzel, hebt sie aber auf die Ebene kanonischer KnowledgeGraph-Entitäten.

| ID | Name |
|----|------|
| `KNOW:PHYS-MECH` | Klassische Mechanik |
| `KNOW:PHYS-WAVE` | Wellenphysik, Akustik, Resonanz |
| `KNOW:PHYS-EM` | Elektromagnetismus, Magnetfelder |
| `KNOW:PHYS-THERM` | Thermodynamik, Wärmelehre |
| `KNOW:PHYS-QM` | Quantenmechanik |
| `KNOW:GEO-SEISM` | Seismologie |
| `KNOW:GEO-PETRO` | Petrologie, Mineralogie, Gesteinsbildung |
| `KNOW:GEO-PLANET` | Planetologie, innere Struktur |
| `KNOW:GEO-DYNA` | Geodynamik, Plattentektonik, Mantelkonvektion |
| `KNOW:GEO-PALEO` | Paläogeologie, geologische Zeitskalen |
| `KNOW:ASTRO-BASIC` | Astronomische Grundlagen, Sonnensystem |
| `KNOW:ASTRO-SPEC` | Spektroskopie, Emissionslinien |
| `KNOW:ASTRO-RADIO` | Radioastronomie, Interferometrie |
| `KNOW:MATH-STAT` | Statistik, Wahrscheinlichkeitsrechnung |
| `KNOW:MATH-BAYES` | Bayes'sche Inferenz |
| `KNOW:MATH-DIFF` | Differentialgleichungen |
| `KNOW:MATH-ANAL` | Analysis, Fourieranalyse |
| `KNOW:BIO-BASIC` | Biologie Grundlagen |
| `KNOW:BIO-NEURO` | Neurowissenschaften |
| `KNOW:BIO-EVOL` | Evolutionsbiologie, Habitabilität |
| `KNOW:CHEM-BASIC` | Chemie Grundlagen |
| `KNOW:CHEM-GEO` | Geochemie |
| `KNOW:HIS-METHOD` | Historiographische Methodik |
| `KNOW:HIS-ARCH` | Archäologie, Befundinterpretation |
| `KNOW:PHIL-EPIST` | Erkenntnistheorie, Epistemologie |
| `KNOW:PHIL-SCI` | Wissenschaftstheorie, Falsifikation |
| `KNOW:LANG-DE` | Deutsch, Lesekompetenz |
| `KNOW:LANG-EN` | Englisch, Lesekompetenz und Primärliteratur |
| `KNOW:LANG-SCI` | Wissenschaftliches Lesen |
| `KNOW:TOOL-PEERLIT` | Umgang mit peer-reviewed Literatur |
| `KNOW:TOOL-DATASCI` | Datenauswertung und Modellierung |

---

## VIII. MIGRATIONSREGELN [R]

### 8.1 Für OTA

OTA-Dokumente dürfen im Fließtext weiterhin Kurzformen wie `GEO-SEISM N2` zeigen, müssen aber im maschinenlesbaren Export auf `KNOW:GEO-SEISM` abbilden.

### 8.2 Für SSF

SSF-Module müssen mindestens eine `MODULE_TEACHES_DOMAIN`-Relation besitzen. Ein Modul ohne Domain-Zuordnung ist kein kanonisches SSF-Lernmodul.

### 8.3 Für NOXIA

NOXIA-Forschungsobjekte und Technologien dürfen Voraussetzungen als Gameplay anzeigen, müssen intern aber KnowledgeDomain-IDs verwenden.

### 8.4 Für KUEPER.com

Öffentliche Texte dürfen vereinfachte Namen nutzen. Die Zuordnung zur KnowledgeDomain erfolgt über Metadaten oder KXF-Export.

---

## IX. OFFENE FRAGEN [OFFEN]

| # | Frage |
|---|-------|
| 1 | Soll `TOOL:` langfristig ein eigenes ID-Präfix erhalten oder als `KNOW:TOOL-*` im KnowledgeDomain-System bleiben? |
| 2 | Wird `LANG-SCI` als eigene Domain geführt oder als Niveauerweiterung von `LANG-DE` und `LANG-EN` modelliert? |
| 3 | Welche Domains benötigen als erste vollständige Beschreibungen mit Aliases und Beispielrelationen? |
| 4 | Soll N4 sofort in SSF sichtbar sein oder zunächst nur im Knowledge Graph reserviert werden? |

---

## X. REVISIONSVERLAUF

| Version | Datum | Änderung |
|---------|-------|----------|
| v1.0 | 2026-07-01 | Erstellung. KnowledgeDomain als kanonische Entitätsklasse definiert. N1–N4 festgelegt. Relationstypen und KXF-Erweiterung eingeführt. Start-Taxonomie aus OTA-ARC-0005 übernommen und um `KNOW:`-IDs erweitert. |

---

**ENDE DES DOKUMENTS**

*Für den KUEPER Knowledge Graph*  
Signatur: KG-ARC-0001-2026-DE
