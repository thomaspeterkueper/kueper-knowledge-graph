# Schichtenkarte des Kueper-Ökosystems

**KG-Arbeitsdokument · Vorschlag zur Konsensfindung · NICHT kanonisch**
*Vorgesehener Ort: `docs/ARCHITECTURE.md` im KG-Repo.*
*Revision 0.4 — drei geplante Apps benannt (KI, Mininodes, Assistent); kanonisch-vs-lebend präzisiert.*

> Vom KG verfasst. Kanonisiert nichts. Eine Kanonisierung (als OTA-ARC-0008) wäre
> ein OTA-Akt und liefe als external-task ins OTA — nicht als KG-Alleingang.

> **Kanonisch vs. lebend:** Dies ist die **lebende** operative Schicht. Sie
> *verweist* auf den Kanon (ARC-Serie), ersetzt ihn nicht. ARC-0005/0006/0007
> bleiben kanonisches Archiv (`[W]`, eingefroren) — sie werden **nicht** zu
> „lebenden Regeln" umdeklariert. Wer die Regeln ändern will, ändert dieses
> Dokument oder erzeugt ein neues ARC; er verändert kein bestehendes ARC.

**Status-Vokabular:** `[R]` existiert/beobachtbar · `[AUSSTEHEND]` geplant · `[OFFEN]`
unbekannt/unentschieden · *kanonisch (ARC-0006)* = bereits als Werk-Setzung gesetzt.

---

## Grundthese

Kein einzelnes Zentrum, sondern **Schichten mit je eigenem Zuhause**. „Zentral"
heißt saubere Schichtung — nicht ein Repo, das alles schluckt.

---

## Schicht 0 — Identität / Akteure  `[OFFEN vorgeschlagen]`
*„Wer handelt überhaupt?"*

- **Inhalt:** Personen, Organisationen, KI-Systeme, Rollen, Gruppen, Fraktionen.
  Beispiele: Thomas Küper, SSF, HeliosCorp, Omni, Lernende, Spieler, Kuratoren, Autoren.
- **Warum eigene Schicht:** Akteure existieren systemübergreifend — NOXIA bekommt
  Fraktionen, SSF Lernende, KUE Autoren, OTA Kuratoren. Sie sind kein Anhängsel
  eines einzelnen Systems.
- **Source of Truth (vorgeschlagen):** KG für **semantische** Identität; jede
  Anwendung für ihre **lokalen** Zustände.
- **Status:** `[OFFEN]` — diese Schicht erweitert die KG-Rolle in Richtung
  Identität. Ich verzeichne sie als Vorschlag; die Setzung „KG besitzt semantische
  Identität" ist eine eigene Architekturentscheidung und Kurator-Ebene, nicht vom
  KG allein zu setzen.

---

## Schicht 1 — Governance / Semantik
*„Was ist wahr, wer ist Source of Truth, wie verweist man darauf?"*

- **Inhalt:** kanonische Entscheidungen (ARC-Serie), Signatur→Ort-Auflösung
  (`signature-registry`), ID- und **Signatur-Standards**, Rollen-/Systemgrenzen.
- **Zuhause:** OTA (ARC-Werk-Setzungen) + KG (Resolver, Mappings).
- **Änderungsrhythmus:** Zielzustand selten/formal — *aktuell hochfrequent*
  (Bootstrap-Phase, heute ARC-0005/0006/0007).

---

## Schicht 2 — Laufzeit-Integration / Verträge
*„Wie rufen Systeme sich zur Laufzeit auf, welche Form geht über die Leitung?"*

- **Inhalt:** Hermes verwaltet **technische Integrationsartefakte** — OpenAPI,
  Event-Schemas, DTOs, Client-SDKs, geteilte Typen, Kompatibilitäts-CI.
- **Grenze (Steward-Korrektur zum Review):** **Signatur-*Standards* und Semantik
  gehören NICHT in Hermes**, sondern in Schicht 1. Hermes darf Signaturen technisch
  *transportieren*, aber nicht *definieren*. Sonst wandert Governance in die
  Integrationsschicht.
- **Zuhause:** `kueper-ecosystem-contracts` — **`[AUSSTEHEND]`, existiert nicht.**
- **Source of Truth für:** die *Form* der Schnittstellen, nicht die Bedeutung der Daten.
- **Kernregel:** Ein Vertrag ist vom System *abgeleitet* (PR ins System-Repo +
  paralleler PR nach Hermes) — deckungsgleich mit dem external-task-Prinzip.

---

## Schicht 3 — Implementierung
*„Die Systeme selbst."* Jedes ist Source of Truth nur für seine eigene Domäne.

- **KG** (`kueper-knowledge-graph`) — Wissen. **Knowledge Domains (KD) bilden die
  primäre Strukturierungsebene des Wissens**; dazu IDs, Relationen, Voraussetzungen,
  KXF-Exports, Resolver, Mappings.
  → **KG-Doppelrolle, präzise:** Der KG ist **keine Governance-Autorität**. Er
  *implementiert* nur die technische Auflösung bereits kanonisierter Entscheidungen.
  „KG hält ARC-Mappings" heißt ausdrücklich **nicht** „KG entscheidet ARC".
- **SSF** (`solarsciencefoundation`) — Lernen. **SSF konsumiert Wissensobjekte aus
  dem KG, erzeugt jedoch eigene Lernobjekte und Lerndaten** (Module, Lernpfade,
  Fortschritt, Difficulty, Empfehlungen, Achievements, Unlocks). Kein bloßer Viewer.
- **NOXIA** (`noxiagame`) — Spiel: Spielstand, Fraktionen, narrative Freischaltungen.
- **OTA** — Archiv: **Archivwahrheit** (Archivobjekte, ARC-Dokumente, versionierte
  Quellen). Trifft **keine** Wissensklassifikationen.
- **KUE / kueper.com** — **Publikationswahrheit** (veröffentlichte Darstellung,
  Autorenstruktur, Publikationsmetadaten). Hält keine semantische Systemwahrheit.
  → Dieselbe Datei kann in OTA *archiviert* und auf KUE *veröffentlicht* sein — die
  Wahrheit ist je Ebene verschieden.
- **Publikations-Frontends:** `overtime-archive.org`, `thomas-kueper.de` — konsumierend.
- **Drei geplante Anwendungen** `[AUSSTEHEND]` (noch nicht in Git, Rolle/Schicht `[OFFEN]`):
  - **KI** — vermutlich lesender KG-Konsument. Bei direktem KG-Zugriff später
    nötig: Authentifizierung + Rate-Limit (KG-seitig vorbereitbar).
  - **Mininodes** — vermutlich *datenerzeugend* (Push/Sensorik). Das wäre kein
    OpenAPI-Vertrag, sondern ein Event-/Message-Pfad — eigene Integrationsform.
  - **Assistent** — bei personenbezogenen Daten later eine Datenschutz-/Zugriffsfrage.
  Alle drei sind heute zu vage für Verträge; sie werden hier nur verzeichnet, nicht
  eingeplant. Erst wenn eine davon real einen anderen Dienst aufruft, entsteht
  Integrationsbedarf.

---

## Source-of-Truth-Kanon (Kurator-Setzung)

```
Identität  = KG (semantisch) · Anwendungen (lokale Zustände)   [vorgeschlagen]
kueper.com = veröffentlichte reale Texte/Dokumente (Publikationswahrheit)
OTA        = Archivkanon / ARC / Werk-Setzungen (Archivwahrheit)
KG         = semantische Einordnung / Wissen / KD
SSF        = Lernen (inkl. eigener Lerndaten)
NOXIA      = Spiel
Hermes     = Vertrags-/Integrationsformen
```

---

## Abhängigkeitsfluss vs. technische Datenpfade

**Kanonischer Abhängigkeitsfluss** (*ARC-0006 §I*): `KG → SSF → NOXIA`.

Wichtig: Der kanonische Fluss beschreibt **Abhängigkeiten, nicht notwendigerweise
alle technischen Datenpfade.** Praktisch könnten später zusätzliche Lesepfade
entstehen (`KG → NOXIA`, `SSF → NOXIA`).

**Steward-Vermerk:** Solche zusätzlichen direkten Pfade sind `[OFFEN]` — sie
berühren die kanonische Setzung ARC-0006 §I. Ich verzeichne sie als möglich, setze
sie aber nicht als gegeben. Ihre Aufnahme in den Kanon ist Kurator-/OTA-Ebene.

---

## Architektur-Invarianten — *Was niemals passieren darf*

- SSF schreibt **nie** direkt in KG-Daten.
- NOXIA schreibt **nie** direkt in SSF-Daten.
- Frontends besitzen **nie** Systemwahrheit.
- Hermes besitzt **keine** Fachlogik und definiert **keine** Signatur-Standards.
- OTA trifft **keine** Wissensklassifikationen.
- KG veröffentlicht **keine** Texte und entscheidet **keine** ARC-Kanonisierung.

---

## Daten-Topologie (Supabase) — Querschnitt in Schicht 2

- **Direkter DB-Zugriff (halten Keys):** KG, SSF, NOXIA — **nur eigene
  Projekte/Scopes; kein fremder DB-Zugriff ohne Vertrag.** NOXIA-DB heute: `[OFFEN]`.
- **Kein direkter Zugriff:** Publikations-Frontends und die ≥3 weiteren Apps.
- Geteilte Supabase-**Typen** (künftig) in Hermes; **Keys nie**.

---

## Zielbild (schematisch, keine Setzung)

```
        OTA  (Governance / Archivkanon)
         │
         ▼
        KG   (Wissen / KD / Resolver)
       ↙   ↘
     SSF     NOXIA        Akteure (Schicht 0) quer über alle
       ↘   ↙
      Hermes (Integrationsformen)
         │
         ▼
   Frontends / Apps
```
*Vision, nicht exaktes Diagramm. Hermes ist Quer-/Vertragsschicht, kein bloßer Downstream.*

---

## Offen (nächste Runde)

- **Schicht 0:** Setzung „KG besitzt semantische Identität" bestätigen oder verwerfen.
- **KI / Mininodes / Assistent:** Zugriffsart auf den KG festlegen (lesen? pushen?),
  sobald sie konkreter werden — dann Schicht + Integrationsform bestimmen.
- **NOXIA-DB-Status** und zusätzliche Datenpfade (`KG→NOXIA`, `SSF→NOXIA`) klären.
- **Repo-Status** von kueper.com, overtime-archive.org, thomas-kueper.de, noxiagame.
- **Kanonisierung** als OTA-ARC-0008 — falls gewünscht: OTA-external-task.
