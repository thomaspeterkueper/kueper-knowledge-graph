# KUEPER Knowledge Graph – Projektbriefing

## Mission

Der KUEPER Knowledge Graph ist das Master-System des gesamten KUEPER-Ökosystems.

Er ist keine Website.
Er ist kein Spiel.
Er ist keine Lernplattform.

Er ist die zentrale Wissens-, Entitäten-, System- und Registry-Basis, aus der alle anderen Systeme ihre Struktur beziehen.

---

## Kanonischer Endpunkt

```text
kg.kueper.com
```

`kg.kueper.com` ist der vorgesehene öffentliche Konsum-Endpunkt für kanonische Exporte, Registry-Daten, System-Mappings und rechtliche Stammdaten.

Das GitHub-Repository `thomaspeterkueper/kueper-knowledge-graph` bleibt die kuratorische Arbeits- und Versionsquelle.

---

## Ökosystem

```text
KUEPER Knowledge Graph
        │
        ▼
       KXF
        │
 ┌──────┼────────┬─────────┬─────────┐
 ▼      ▼        ▼         ▼
SSF   NOXIA   kueper.com  OTA
```

---

## Verantwortlichkeiten

### KUEPER Knowledge Graph

Single Source of Truth.

Verantwortlich für:

- Entitäten
- Relationen
- IDs
- Taxonomien
- Mappings
- KXF-Export
- System-Registry
- Domain-Registry
- Legal-/Impressums-Stammdaten

Nur hier werden kanonische Entitäten definiert.

Beispiele:

```text
CON:L0:information
CON:L0:energie
CON:L1:gravitation
CON:L1:orbitalmechanik
PLC:L1:mars
PER:L4:soma_retep
PER:L4:thomas_peter_kueper
ORG:L3:ssf
ORG:L3:noxia
```

---

### kueper.com

Publiziert Wissen.

Konsumiert:

- Dokumente
- Entitäten
- Relationen
- Impressums-/Legal-Stammdaten

Erzeugt:

- Veröffentlichte Artikel
- Beobachtungsnotizen
- Forschungsnotizen
- Grundlagenwissen

---

### Solar Science Foundation

Vermittelt Wissen.

Konsumiert:

- Entitäten
- Dokumente
- Beziehungen
- Impressums-/Legal-Stammdaten

Erzeugt:

- Lernmodule
- Quiz
- Zertifikate
- Fortschritt
- NOXIA-Unlocks

SSF definiert keine eigenen wissenschaftlichen Objekte.

---

### NOXIA

Nutzt Wissen spielerisch.

Konsumiert:

- Entitäten
- Forschung
- Unlocks
- Buildings
- Impressums-/Legal-Stammdaten

Erzeugt:

- Spielstände
- Kolonien
- Produktion
- Handel

NOXIA besitzt keine eigene Wissenschaft.
NOXIA verwendet Wissenschaft.

---

### OTA

Modell- und Archivschicht.

Konsumiert:

- Entitäten
- Dokumente
- Modelle
- Impressums-/Legal-Stammdaten

Erzeugt:

- Hypothesen
- Alternativmodelle
- Archive
- Fiktionalisierungen

---

## Wissenspyramide

### L0 – Foundation

Universelle Konzepte.

Beispiele:

- Information
- Mathematik
- Energie
- Materie
- Zeit
- Raum
- Leben
- Sprache
- Bewusstsein
- Komplexität

---

### L1 – Knowledge

Fachwissen.

Beispiele:

- Gravitation
- Orbitalmechanik
- Evolution
- Magnetismus
- Photosynthese

---

### L2 – Models

Modelle und Theorien.

Beispiele:

- AVI
- χ-Feld
- Temenon
- Gravastar-Kosmogonie

---

### L3 – Applications

Anwendungen, Systeme, Kurse und technische Nutzung.

Beispiele:

- SSF-Kurse
- NOXIA-Systeme
- KXF-Endpunkte
- System-Registry
- Domain-Registry
- Legal-Registry

---

### L4 – Narratives

Geschichten, Figuren und fiktionale Artefakte.

Beispiele:

- Soma Retep
- Mia
- Die Große Stille
- Die Kette vom Hexenteich

---

## Zentrale Regel

Narrative dürfen niemals die Wissensbasis definieren.

Der Fluss ist immer:

```text
L0 → L1 → L2 → L3 → L4
```

niemals:

```text
L4 → L0
```

Geschichten illustrieren Wissen.
Sie erzeugen kein Wissen.

---

## Registry-Regel

Stammdaten, die von mehreren Systemen konsumiert werden, gehören in den Knowledge Graph.

Dazu zählen insbesondere:

- System-IDs
- Domains
- Repositories
- Impressumsangaben
- Datenschutz-/Kontaktverweise
- öffentliche Endpunkte
- KXF-Exportpfade

Websites dürfen diese Daten darstellen, aber nicht kanonisch definieren.

---

## Aktuelle Priorität

1. L0-Konzepte vollständig definieren
2. L1-Grundwissen aufbauen
3. ID-Schema auf Wissensebenen stabilisieren
4. KXF stabilisieren
5. zentrale Legal-/Impressums-Registry etablieren
6. SSF-Anbindung
7. NOXIA-Anbindung
8. OTA-Anbindung
9. automatisierte Synchronisation

Der Knowledge Graph wird langfristig das Herzstück des gesamten KUEPER-Ökosystems.
