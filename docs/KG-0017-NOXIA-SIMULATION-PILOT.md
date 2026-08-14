# KG-0017 - NOXIA Simulation/Event Pilot 001

## Status
Draft productive, 2026-08-14

## Bezug
Antwortet auf `EXT-ECO-KG-20260811-001` (Generalisierbares Object-Relation-State-Event-Modell). Liefert den geforderten Mess-/Simulationsfall aus NOXIA als eines von drei Pflicht-Domänenbeispielen, neben dem narrativen Fall (`KG-0015`) und einem wissenschaftlichen Wissensfall (offen). Ergänzt `KG-0009 - Narrative World Model`, dessen fünf nicht-narrative Bausteine (`OBJECT`, `RELATION`, `STATE`, `EVENT`, `KNOWLEDGE_BELIEF`) hier auf eine reale, produktive Simulationsdomäne statt auf ein fiktionales Werk angewendet werden.

## Zweck
Prüft, ob der generalisierte Kern aus KG-0009 auf NOXIAs Simulations-/Ökonomiedomäne trägt - nicht durch Migration von NOXIA-Daten in den KG, sondern durch Abbildung von NOXIAs eigenem, bereits produktivem Supabase-Schema auf die fünf Bausteine.

## Source-of-Truth-Grenze
Der Knowledge Graph speichert keine NOXIA-Spieldaten. Schiffspositionen, Kolonie-Zustände, Handelstransaktionen und Tick-Protokolle bleiben vollständig in NOXIAs eigenem Supabase. KG-0017 bildet Struktur ab, nicht Inhalt. Übertragbar ist die Form (gemeinsames Event-/State-Schema als Konvention), nicht die Daten selbst. Ändert NOXIA sein eigenes Schema entsprechend, geschieht das in NOXIAs Repository, nicht im KG.

## Befund: NOXIA hat das Vielfach-Quellen-Problem bereits selbst

Bei der Untersuchung von `supabase/migrations/20260719000000_baseline.sql` zeigt sich: NOXIA hat unabhängig voneinander **vier parallele, uneinheitliche Ereignis-Tabellen** entwickelt, ohne gemeinsames Schema:

| Tabelle | Zweck | Zeitfeld | Effekt-Darstellung |
|---|---|---|---|
| `events` | generisches Ereignisprotokoll | `created_at` | `payload` (jsonb, unstrukturiert) |
| `world_events` | zeitlich begrenzte Standort-Effekte | `starts_at`/`ends_at` | `effect` (jsonb, unstrukturiert) |
| `historical_milestones` | Spieler-Meilensteine | `achieved_at` | `data` (jsonb, unstrukturiert) |
| `colony_ledger` | Tick-gebundenes Ressourcenprotokoll | `created_at` + `tick` | strukturierte Spalten (`resource_type`, `amount`) |

Dieses Muster entspricht exakt dem Vielfach-Quellen-Problem, das `ECO-ARC-0019` für den KG selbst adressiert (`learning/*.yaml` vs. `exports/kxf-learning-modules-0.1.json`) - nur unabhängig und in NOXIAs eigener Domäne entstanden. Das ist ein eigenständiger Befund dieses Piloten, kein Konstrukt zur Rechtfertigung der Generalisierung.

## Abbildung der fünf Bausteine auf reale NOXIA-Tabellen

### OBJECT
Stabile Identität über Zeit. Deckt sich unmittelbar mit bestehenden NOXIA-Tabellen, ohne neuen Universaltyp:

```text
celestial_bodies   -> Himmelskörper (Sonne, Planeten, Monde, Asteroiden)
locations          -> Kolonien, Stationen, Außenposten
ships              -> Raumschiffe
buildings          -> Gebäudeinstanzen
profiles           -> Spieler
actors             -> NPCs
```

### RELATION
```text
friendships        -> PER:profile_id MEMBER_OF/FRIEND_OF PER:friend_id
(implizit)         -> SHIP:id LOCATED_AT LOC:location
(implizit)         -> PROFILE:id OWNS SHIP:id / BLD:id
```

`friendships` ist die einzige bereits explizite Relations-Tabelle. Eigentümerschaft und Standort-Zugehörigkeit sind aktuell nur als Fremdschlüssel auf dem Objekt selbst kodiert (`ships.profile_id`, `ships.location`), nicht als eigenständige, zeitlich gültige Relation - ein Unterschied zu KG-0009s Empfehlung, aber keine Fehlmodellierung: für 1:1-Zuordnungen ohne Wechselhistorie ist das vertretbar.

### STATE - die eigentliche Lücke

**NOXIA hat aktuell keine STATE-Historie.** `ships.status`, `ships.location`, `ships.dest_location` werden in-place überschrieben. Es existiert keine Tabelle, die frühere Zustände aufbewahrt.

Konkrete, heute nicht beantwortbare Frage: *Wo befand sich Schiff X bei Tick 4200?*

KG-0009-Muster, angewendet (Konvention, nicht KG-gespeicherte Daten):

```json
{
  "id": "STA:SHIP:<ship-uuid>:2026-08-14T09:00",
  "type": "State",
  "subject": "SHIP:<ship-uuid>",
  "validFrom": "2026-08-14T09:00:00Z",
  "validTo": "2026-08-14T09:14:00Z",
  "properties": {
    "status": "in_transit",
    "location": "LOC:phobos-station",
    "dest_location": "LOC:mars-tharsis-hub"
  },
  "source": "SYS:NOXIA:tick-4200"
}
```

### EVENT - konkretes Fallbeispiel

Eine Schiffsreise, wie sie `calc_travel_time_seconds()` (siehe `20260720300000_weltarchitektur_phase1.sql`) und der Tick-Zyklus real erzeugen, im KG-0009-Schema:

```json
{
  "id": "EVT:SYS:NOXIA:ship-arrival-<ship-uuid>-4212",
  "type": "Event",
  "time": {
    "from": "2026-08-14T09:14:00Z",
    "to": null,
    "precision": "minute"
  },
  "location": "LOC:mars-tharsis-hub",
  "participants": ["SHIP:<ship-uuid>", "PER:<profile-uuid>"],
  "effects": [
    {
      "subject": "SHIP:<ship-uuid>",
      "property": "status",
      "from": "in_transit",
      "to": "docked"
    },
    {
      "subject": "SHIP:<ship-uuid>",
      "property": "location",
      "from": "LOC:phobos-station",
      "to": "LOC:mars-tharsis-hub"
    }
  ],
  "source": "SYS:NOXIA:tick-4212"
}
```

Dieses Event würde heute auf zwei verschiedene, uneinheitliche Tabellen verteilt entstehen (`events` generisch protokolliert, `colony_ledger` falls Ressourcen bewegt wurden) - im generalisierten Schema ist es ein einzelnes, konsistent geformtes Objekt.

`trade_transactions` ist bereits die am weitesten am Muster orientierte Tabelle: unveränderlich, zeitgestempelt (`traded_at`), mit klarem Effekt (`profit`, `amount`). Sie bräuchte für volle KG-0009-Konformität nur `effects` als strukturierte Liste statt Einzelspalten und ein einheitliches `source`-Feld.

### KNOWLEDGE_BELIEF
Kein Gegenstück in NOXIA. NOXIA kennt keine Perspektiven-Trennung (Figur weiß/glaubt/behauptet) - alle Spieler sehen denselben simulierten Weltzustand, gefiltert nur durch Sichtbarkeitsregeln (`is_public`, RLS-Policies), nicht durch narrative Perspektive. Dieser Baustein bleibt narrativ-exklusiv, wie in `KG-0009` und `EXT-ECO-KG-20260811-001` vorgesehen.

### Prospektionskette (Ground Truth -> Measurement -> Interpretation -> Discovery)
Passt nicht auf NOXIA. NOXIAs Zustände sind direkt simuliert, nicht durch Beobachtung/Messung vermittelt - es gibt keine Mess-Interpretations-Lücke wie bei OTA-Forschungsdokumenten oder SSF-Observationsdaten. Für NOXIA irrelevant, für SSF/OTA-Fälle vorbehalten.

## Was NOXIA aus diesem Piloten übernehmen könnte (Empfehlung, keine Vorgabe)

1. Die vier Ereignistabellen (`events`, `world_events`, `historical_milestones`, `colony_ledger`) auf eine gemeinsame Grundform ausrichten: `subject/participants`, `effects: [{property, from, to}]`, `time`, `source` - bei Beibehaltung ihrer jeweiligen Spezialfelder (`colony_ledger` bleibt tick-gebunden, `world_events` behält `starts_at`/`ends_at`).
2. Eine schlanke STATE-Snapshot-Tabelle für Schiffe/Standorte einführen, um Zustandshistorie erstmals abfragbar zu machen.

Beides ist NOXIAs eigene Entscheidung und eigene Migration, nicht Teil dieses KG-Dokuments. Bei Interesse: external-task nach NOXIA mit diesem Dokument als Referenz.

## Harte Regeln
1. Der KG speichert keine NOXIA-Live-Daten. Dieses Dokument bildet Struktur ab, nicht Inhalt.
2. `SHIP`, `LOC`, `BLD` als KG-Objekttypen werden hier nur zur Modellillustration verwendet; eine tatsächliche Registrierung einzelner NOXIA-Schiffe/Standorte als KG-Entitäten ist nicht Gegenstand dieses Piloten.
3. `KNOWLEDGE_BELIEF` wird für NOXIA nicht angewendet - keine Perspektiven-Trennung in der Domäne vorhanden.
4. Die Prospektionskette wird für NOXIA nicht angewendet - keine Mess-Interpretations-Lücke in der Domäne vorhanden.
5. Empfehlungen an NOXIA (Abschnitt "Was NOXIA übernehmen könnte") sind unverbindlich und werden, falls gewünscht, als eigener external-task an NOXIA gestellt.

## Ergebnis
Der generalisierte Kern aus KG-0009 trägt auf NOXIAs Simulationsdomäne, ohne einen künstlichen Universaltyp zu erzwingen: vier der fünf Bausteine (`OBJECT`, `RELATION`, `STATE`, `EVENT`) haben klare, konkrete NOXIA-Entsprechungen; der fünfte (`KNOWLEDGE_BELIEF`) bleibt korrekt narrativ-exklusiv. Der wertvollste Fund ist nicht die Passung selbst, sondern dass NOXIA unabhängig bereits an derselben Fragmentierung leidet, die `ECO-ARC-0019` für den KG behebt - ein eigenständiger Beleg dafür, dass der generalisierte Kern ein wiederkehrendes, nicht KG-spezifisches Muster trifft.

## Bezug zu EXT-ECO-KG-20260811-001
Erfüllt Domänenbeispiel 2 von 3 ("Mess-/Simulationsfall aus NOXIA/SSF/OTA"). Verbleibend: ein wissenschaftlicher Wissensfall (z. B. LUCA/Autonomiegradient oder AVI).
