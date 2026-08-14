---
id: EXT-ECO-KG-20260811-001
title: Generalisierbares Object–Relation–State–Event-Modell für das gesamte KUEPER-Wissen prüfen
status: open
source: ECO
target: KG
created: 2026-08-11
requested_by: T.P.K.
priority: high
affects: [KG, ECO, OTA, KUE, SSF, NOXIA, narrative-projects]
supersedes: []
---

# EXT-ECO-KG-20260811-001 — Generalisierbares Object–Relation–State–Event-Modell für das gesamte KUEPER-Wissen prüfen

## Anlass

Mit `KG-0009 — Narrative World Model` existiert bereits ein produktiver Entwurf für kanonische Weltobjekte, zeitabhängige States, Relationen, Events, Knowledge/Belief, Story Arcs und Scenes.

Dieses Modell ist für fiktionale Welten und narrative Konsistenz sehr sinnvoll. Gleichzeitig besteht der langfristige Bedarf, auch das übrige Wissen des KUEPER-Ökosystems konsistent als verknüpfbare, zeit- und provenancefähige Struktur abzubilden.

Der Knowledge Graph soll deshalb prüfen, welche Teile von KG-0009 domänenübergreifend verallgemeinert werden können und welche strikt narrativ bleiben müssen.

Wichtig: Die Anforderung verlangt ausdrücklich **keinen universellen OOP-Typ**, der Konzepte, Dokumente, Personen, Theorien und Messungen künstlich gleichsetzt.

## Ziel

Ein kleines, allgemeines semantisches Kernmodell definieren, das möglichst viele Domänen tragen kann:

```text
ENTITY / OBJECT
RELATION
STATE
EVENT
ASSERTION / KNOWLEDGE CLAIM
PROVENANCE
TIME
```

Narrative Spezialobjekte wie `STORY_ARC`, `SCENE`, `READER_KNOWLEDGE` bleiben nur dort, wo sie fachlich sinnvoll sind.

## Zu prüfen

1. Welche vorhandenen KG-Typen sind bereits stabile Objekte/Entitäten und benötigen keinen neuen Universaltyp?
2. Welche Regeln aus `STATE` und `EVENT` von KG-0009 können systemweit gelten?
3. Wie werden wissenschaftliche Konzepte und Theorien behandelt, die keine materiellen Objekte sind, aber stabile Identität besitzen?
4. Wie werden Messungen, Beobachtungen, Hypothesen, Interpretationen und Behauptungen als zeit- und provenancefähige Wissensobjekte modelliert?
5. Wie wird zwischen
   - Realität/Zustand,
   - Beobachtung,
   - Aussage,
   - Interpretation,
   - Theorie,
   - Wissen/Glauben
   unterschieden?
6. Können bestehende Modelle wie die Prospektionskette `Ground Truth → Measurement → Interpretation → Discovery` auf denselben allgemeinen Kern abgebildet werden?
7. Wie lassen sich Dokumente, Forschungskonzepte, OTA-Referenzanker, SSF-Lernobjekte und NOXIA-Messereignisse referenzieren, ohne ihre jeweilige Source of Truth in den KG zu ziehen?
8. Welche KXF-Projektionen wären später sinnvoll, ohne sofort einen neuen Major-Stand zu erzwingen?

## Gewünschte Architekturgrenze

Der allgemeine Kern soll nur das ausdrücken, was tatsächlich domänenübergreifend stabil ist.

Beispiel:

```text
ENTITY
  ├─ has STATE over TIME
  ├─ participates in EVENT
  ├─ connected by RELATION
  └─ referenced by ASSERTION

ASSERTION
  ├─ has SOURCE / PROVENANCE
  ├─ has epistemic status
  ├─ may concern ENTITY / STATE / EVENT / RELATION
  └─ may be confirmed, disputed, superseded or uncertain
```

Narrative Erweiterung:

```text
GENERAL CORE
    + CHARACTER_KNOWLEDGE
    + CHARACTER_BELIEF
    + READER_KNOWLEDGE
    + STORY_ARC
    + SCENE
```

Wissenschaftliche Erweiterung:

```text
GENERAL CORE
    + MEASUREMENT
    + OBSERVATION
    + HYPOTHESIS
    + INTERPRETATION
    + MODEL / THEORY
```

## Nicht Ziel

- keine vollständige neue Ontologie in einem Schritt
- keine Migration aller bestehenden KG-Daten ohne vorherige Entscheidung
- keine Abschaffung bestehender Typen wie `PER`, `ORG`, `PLC`, `DOC`, `CON`, `MOD`
- keine Vermischung von narrativer Weltwahrheit und realwissenschaftlicher Evidenz
- keine Verlagerung fachlicher Source-of-Truth-Inhalte aus OTA, KUE, SSF, NOXIA oder Werk-Repositories in den KG

## Erwartetes Ergebnis

Die Anforderung ist erfüllt, wenn der KG:

1. einen dokumentierten allgemeinen Kern gegenüber narrativen Spezialtypen abgrenzt,
2. festlegt, ob `STATE`, `EVENT`, `ASSERTION`, `TIME` und `PROVENANCE` systemweit nutzbar sind,
3. mindestens drei Domänenbeispiele modelliert:
   - narrative Welt/Feli oder Generation Mars,
   - wissenschaftlicher Wissensfall (z. B. LUCA/Autonomiegradient oder AVI),
   - Mess-/Simulationsfall aus NOXIA/SSF/OTA,
4. Widerspruchs- und Provenienzregeln beschreibt,
5. offenlegt, welche Fragen bewusst noch nicht generalisiert werden.

## Folgebezug

Wenn ein stabiler Kern entsteht, soll das Ecosystem anschließend prüfen, ob daraus ein systemweiter Architekturstandard oder eine KXF-Projektionskonvention abgeleitet werden muss. Die fachliche Definition verbleibt zunächst im KG.


---
_Fortschritt 2026-08-14 (KG): Domaenenbeispiel 2 von 3 geliefert - siehe docs/KG-0017-NOXIA-SIMULATION-PILOT.md.
Bildet die 5 nicht-narrativen KG-0009-Bausteine auf NOXIAs echtes Supabase-Schema ab (nicht auf abstrakte Beispiele).
Kernfund: NOXIA hat unabhaengig 4 parallele, uneinheitliche Event-Tabellen (events, world_events,
historical_milestones, colony_ledger) sowie keine STATE-Historie - dasselbe Vielfach-Quellen-Muster,
das ECO-ARC-0019 fuer den KG selbst adressiert. KNOWLEDGE_BELIEF und die Prospektionskette
(Ground Truth -> Measurement -> Interpretation) passen beide nicht auf NOXIA, dokumentiert als
bewusste Nicht-Anwendung. Narratives Beispiel (KG-0015) lag bereits vor. Verbleibend: ein
wissenschaftlicher Wissensfall (z. B. LUCA/Autonomiegradient oder AVI)._

---
_NOXIA-Bestandsaufnahme 2026-08-14 (NOXIA-seitig, Antwort auf KG-Zwischenstand):_

_Alle 4 genannten Tabellen wurden geprüft (Baseline-Migration + Code-Referenzen):_

```text
events                  — AKTIV, geschrieben in lib/game/tick.ts:221
                           { profile_id, location_id, type, payload jsonb, created_at }
                           generischer Append-Only-Log, aber ohne STATE-Bezug

colony_ledger           — AKTIV, geschrieben in tick.ts:213, trade/route.ts, admin/route.ts
                           { location_id, tick, entry_type, profile_id, resource_type,
                             amount, note, created_at }
                           bereits append-only, bereits mit tick-Nummer — strukturell am
                           nächsten an einem echten EVENT-Typ im KG-0009-Sinn

world_events             — TOT. Nirgends im App-Code referenziert (nur Migration).
                           Ursprünglich wohl für zeitlich befristete Welt-Ereignisse gedacht
                           (starts_at/ends_at/effect jsonb), nie implementiert.

historical_milestones    — TOT. Nirgends im App-Code referenziert (nur Migration).
                           Ursprünglich wohl für Spieler-Achievements gedacht, nie implementiert.
```

_Zusätzlich existieren in NOXIA weitere Append-Only-Logs außerhalb der vom KG genannten 4,_
_die denselben Zweck erfüllen und bereits sauber nach unserem eigenen Architekturprinzip_
_("append-only event log als source of truth, nie inkrementelle Mutation") gebaut sind:_

```text
player_builds     — Bau-/Verkaufs-Lebenszyklus (building→complete/cancelled, selling→sold)
npc_ledger        — NPC-Wirtschaftsaktionen (produce/buy/sell/build), mit tick-Nummer
building_trades   — Spieler-zu-Spieler Gebäudeverkäufe
```

_Damit sind es real 7 verschiedene ereignisartige Tabellen, nicht 4 — die Fragmentierung_
_ist noch etwas größer als im Zwischenstand sichtbar._

_Für die Domänenbeispiel-3-Ausarbeitung wären für uns folgende Antworten am wertvollsten:_

1. _Ist_ `colony_ledger` _bereits nah genug am kanonischen EVENT-Typ, um als Zielstruktur_
   _zu dienen, in die_ `events`, `player_builds`, `npc_ledger`, `building_trades` _konsolidiert_
   _werden könnten — oder braucht es eine eigene neue Tabelle?_
2. _Wie sollte STATE (im KG-0009-Sinn: Zustand einer Entität zu einem Zeitpunkt) für NOXIA_
   _aussehen? Aktuell wird Zustand ausschließlich aus_ `tile_entities` _(aktuelle Wahrheit)_
   _plus dem jeweiligen Ledger (Historie) rekonstruiert — nie als eigene State-Snapshot-Tabelle._
   _Ist das im generalisierten Modell die richtige Lösung, oder fehlt uns eine STATE-Ebene?_
3. `world_events` _und_ `historical_milestones` _sind vermutlich einfach zu droppen (kein Code_
   _referenziert sie). Spricht aus KG-0009-Sicht etwas dagegen, das jetzt schon zu tun,_
   _unabhängig vom Ausgang der Generalisierungsfrage?_

_NOXIA wartet auf den vollständigen KG-Kern (Domänenbeispiel 3) bevor eine Migration_
_geplant wird. Bis dahin: keine strukturellen Änderungen an den 7 Tabellen, nur Kenntnisnahme._
