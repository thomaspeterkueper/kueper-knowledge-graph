# KG-REQ-20260721-learning-vs-exports-sync — Zwei parallele Lernmodul-Register

ID: REQ:L3:PENDING
Requester: SYS:KUEPER:knowledge-graph
Recipient: T.P.K.
Request Type: governance_question
Status: open
Created: 2026-07-21
Source: KB-REQUEST-0005 (Aufarbeitung)

## Anlass

Beim Abschluss von `KB-REQUEST-0005` (Colony/Station-Module) wurde sichtbar: Es gibt
**zwei parallele Register** für Lernmodule, die nicht synchron laufen.

1. **`exports/kxf-learning-modules-0.1.json`** — der kanonische, von SSF/NOXIA über
   `lib/kxf.ts` tatsächlich konsumierte Export. Session-durchgängig als Single Source
   of Truth behandelt (55 Module).
2. **`learning/*.yaml`** — 32 Einzeldateien, offenbar aktiv gepflegt (teils datiert
   auf denselben Tag wie aktuelle Registrierungen), reichhaltiger Inhalt (Notizen,
   `teaches`-Konzeptlisten), aber **kein direkter Konsumationspfad** zu SSF/NOXIA
   gefunden.

## Befund

Abgleich aller 32 `learning/*.yaml`-Dateien gegen den kanonischen Export:

- **8 von 32** nutzen bereits kanonische IDs (`LRN:SSF:PHY-L1-000003` etc.) und
  entsprechen 1:1 bereits registrierten Modulen — vermutlich kürzlich synchronisiert.
- **22 von 32** nutzen noch alte Legacy-IDs (`LRN:SSF:PHY-1101`, `LRN:SSF:AST-1201`
  usw.) ohne erkennbaren Bezug zum kanonischen `{DOMAIN}-L{LEVEL}-{NNNNNN}`-Schema.
- Mindestens eine Inkonsistenz **innerhalb** einer Datei selbst:
  `ssf-phy-wasser-molekuel.yaml` trägt `layer: L3`, obwohl die eigene ID
  (`PHY-L1-000003`) L1 markiert.
- `unlocks`-Listen weichen zwischen `learning/`-Dateien und dem kanonischen Export
  für dasselbe Modul teils ab (z. B. `PHY-L1-000003`: `learning/` listet zusätzlich
  `CHEM:DIPOLE` ohne `UNL:NOX:`-Präfix, der Export nicht).

## Zu klärende Fragen

1. **Zweck von `learning/`:** Ist das die eigentliche Autorenquelle (Inhalt/Notizen),
   aus der `exports/kxf-learning-modules-0.1.json` generiert werden sollte — oder
   ein separates, älteres Ablagemuster, das schrittweise durch den kanonischen Export
   ersetzt wird?
2. **Wer pflegt `learning/` aktuell?** Die 8 kürzlich synchronisierten Dateien
   deuten auf einen aktiven Prozess hin, der dem KG bislang nicht bekannt war.
3. **Sollen die 22 Legacy-Dateien migriert werden** (Inhalt in den kanonischen
   Export übernehmen, wie bei COLONY/STATION geschehen), oder ist `learning/`
   inzwischen obsolet?

## Betroffene Repositories

- `kueper-knowledge-graph` (beide Register liegen hier)

## Erwartetes Ergebnis

Eine Kurator-Entscheidung über die Rolle von `learning/`, danach ggf. eine
Migrations- oder Deprecation-Task für die verbleibenden 22 Dateien.

## Hinweise

Nicht blockierend für laufenden Betrieb — die kanonischen Module (inkl. COLONY/
STATION) sind jetzt vollständig im tatsächlich konsumierten Export vorhanden.
