---
id: SSF-NOXIA-REQ-20260719-ECO-L0
requester: SYS:KUEPER:ssf
target: SYS:KUEPER:kg
priority: high
type: entity_request
created: 2026-07-19
status: open
affects: [KG, SSF, NOXIA]
source_context: NOX-0007
---

# SSF-NOXIA-REQ-20260719-ECO-L0 — Kanonische Lernobjekte für Kredit und Zinseszins

## Anlass

NOXIA verwendet bzw. verwendete in der School-/Foundation-Integration zwei lokal erfundene SSF-Modul-IDs:

```text
LRN:SSF:ECO-L0-0001  „Was ist Kredit?“
LRN:SSF:ECO-L0-0002  „Was ist Zinseszins?“
```

Diese IDs wurden nicht vom Knowledge Graph registriert und dürfen daher nicht als kanonische Lernobjekte behandelt werden. Der fachliche Bedarf ist jedoch real: NOXIA benötigt wirtschaftliche Grundlagen, um School-Aufgaben, Bank-/Kreditmechaniken und spätere Lernfreischaltungen sauber an SSF anzubinden.

Die Mathematik-Grundlage ist inzwischen separat vorhanden: `MAT-L0-000001` wurde im KG auf `built` gesetzt und kann arithmetische Aufgaben abdecken. Offen bleibt die wirtschaftliche Bedeutung von Kredit, Zins und Zinseszins.

## Gewünschte Änderung im KG

Bitte zwei kanonische Learning Modules im Bereich wirtschaftliche Grundlagen registrieren. Die endgültigen IDs werden vom KG festgelegt; die bisherigen NOXIA-IDs sind nur historische Platzhalter und keine Vorgabe.

### Lernobjekt A — Kredit

Arbeitstitel:

> Was ist ein Kredit — und warum gibt jemand heute etwas, das erst später zurückkommt?

Minimaler fachlicher Scope:

- Kreditgeber und Kreditnehmer
- Kapitalüberlassung über Zeit
- Rückzahlung
- Zins als Preis bzw. Gegenleistung für zeitweise Kapitalüberlassung und Risiko
- Laufzeit
- Tilgung
- Unterschied zwischen Kreditbetrag, Zins und Gesamtrückzahlung
- Abgrenzung zu Einkommen, Geschenk und Eigenkapital

### Lernobjekt B — Zins und Zinseszins

Arbeitstitel:

> Warum wächst ein Betrag schneller, wenn auch die Zinsen wieder verzinst werden?

Minimaler fachlicher Scope:

- einfacher Zins
- Zinsperiode
- Zinssatz
- Zinseszins
- exponentielles Wachstum als Folge wiederholter Verzinsung
- Unterschied zwischen linearer und exponentieller Entwicklung
- Verbindung zu Sparen und Kreditkosten
- Beispiele mit kleinen, nachvollziehbaren Zahlen

## Erwartete Relationen

Die beiden Module sollten mindestens folgende Beziehung ausdrücken:

```text
Kredit-Grundlage
  ↓
Zins-Grundlage
  ↓
Zinseszins
```

Mathematische Voraussetzungen sollten auf das bereits registrierte L0-Arithmetik-Modul bzw. den passenden kanonischen Mathematikpfad verweisen, statt eigene Rechenregeln im Wirtschaftsmodul zu duplizieren.

## Rollen der Repositories

### KG

Source of Truth für:

- kanonische IDs
- Titel / Metadaten
- fachliche Relationen
- Voraussetzungen
- KXF-Export

### SSF

Nach Registrierung im KG:

- didaktische Lernreise ausarbeiten
- Beobachtungen und Alltagsbeispiele
- interaktive Kredit-/Zins-Simulation
- Verständnisquiz

SSF soll die Objekte nicht vorab unter eigenen kanonischen IDs erfinden.

### NOXIA

Nach Registrierung und SSF-Bereitstellung:

- nur kanonische KG-/SSF-IDs referenzieren
- lokale Fake-IDs entfernen bzw. migrieren
- Bank- und School-Gates auf die kanonischen Lernobjekte abbilden

## NOXIA-Kontext

Bezug: `NOX-0007 — School domain mapping and fake modules`.

NOXIA hatte folgende Objekte direkt im eigenen Code definiert:

```text
LRN:SSF:ECO-L0-0001  Was ist Kredit?
LRN:SSF:ECO-L0-0002  Was ist Zinseszins?
```

Der Request soll den fachlich sinnvollen Inhalt erhalten, aber die Ownership korrigieren.

## Akzeptanzkriterien

1. Zwei kanonische Lernmodule sind im KG registriert.
2. Ihre IDs erscheinen im relevanten KXF-Learning-Module-Export.
3. Die Abhängigkeit Kredit → Zins/Zinseszins ist modelliert.
4. Mathematik-Voraussetzungen referenzieren bestehende kanonische MAT-L0-Objekte.
5. SSF kann danach ohne ID-Erfindung die Lernreisen implementieren.
6. NOXIA kann seine bisherigen Platzhalter auf die kanonischen IDs migrieren.

## Priorität

**High** — ohne kanonische Objekte bleibt die NOXIA↔SSF-Integration für wirtschaftliche Grundlagen inkonsistent und NOXIA kann die derzeitigen Fake-IDs nicht sauber ersetzen.
