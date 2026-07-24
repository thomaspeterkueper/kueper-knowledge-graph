# KG-REQ-20260721-learning-vs-exports-sync — Zwei parallele Lernmodul-Register

ID: REQ:L3:PENDING
Requester: SYS:KUEPER:knowledge-graph
Recipient: T.P.K.
Request Type: governance_question
Status: resolved
Created: 2026-07-21
Resolved: 2026-07-24
Source: KB-REQUEST-0005 (Aufarbeitung)
Superseded-Decision: partial-migration-only
Final-Decision: KG-0013-LEARNING-MODULE-ID-GOVERNANCE

## Kurator-Entscheidung (T.P.K., 2026-07-24)

### Zu Frage 1: Zweck von `learning/`

`learning/*.yaml` ist die **Autorenquelle** — reichhaltige Kurationsnotizen,
`teaches`-Konzeptlisten, Voraussetzungsketten, fachliche Hinweise fuer Kuratoren.

`exports/kxf-learning-modules-0.1.json` ist der **konsumierte Export** —
maschinenlesbar, von SSF (`lib/kxf.ts`) und NOXIA direkt gelesen.

Beide existieren bewusst nebeneinander. `learning/` ist nicht obsolet.

### Zu Frage 2: Wer pflegt `learning/`?

`learning/` wird durch KG-Requests gepflegt. Der Export ist die Consumer-Projektion
dieser kuratierten Quelle und darf nicht als unabhaengiges zweites Autorenregister
gepflegt werden.

### Zu Frage 3: Migration der Legacy-Dateien

Die erste Entscheidung desselben Tages lautete, die Legacy-Dateien nur schrittweise
bei spaeteren Tasks anzugleichen. Diese Entscheidung wurde durch eine spaetere,
ausdrueckliche Kuratoranweisung am 2026-07-24 uebersteuert.

**Finale Entscheidung:** Die Governance wird jetzt konsolidiert und die Migration wird
fuer alle eindeutig abbildbaren Module deterministisch durchgefuehrt bzw. durch ein
Repository-Tool reproduzierbar gemacht.

Regeln:

1. Kanonische LearningModule-ID: `<DOMAIN>-L<LEVEL>-<NNNNNN>`.
2. `LRN:SSF:*` bleibt als `legacy_id`/Alias erhalten.
3. Keine kanonische ID wird geraten oder erfunden.
4. Fehlt ein eindeutiges Mapping im bestehenden KG/KXF, bleibt die Datei als
   `unmapped legacy` sichtbar und benoetigt eine Kurationsentscheidung.
5. `scripts/learning-sync.mjs` ist der deterministische Check/Migrationspfad.

### Zur Inkonsistenz layer vs. ID

`layer: L3` ist fuer LearningModules korrekt. Die Lernstufe (`L0`, `L1`, `L2`, ...)
in der kanonischen Modul-ID ist eine didaktische Skala und orthogonal zum epistemischen
KG-Layer. Ein Modul wie `PHY-L1-000003` bleibt daher ein KG-L3-Objekt.

### Zur Abweichung bei `unlocks`

Normative NOXIA-Unlocks in `learning/*.yaml` verwenden `UNL:NOX:*`.
Kuratorische Roh-Aliase wie `CHEM:DIPOLE` werden nicht geloescht, sondern bei der
Bereinigung nach `planned_unlocks` verschoben, bis ein kanonisches Unlock-Objekt
existiert.

## Ergebnis

- `learning/*.yaml` bleibt Autorenquelle.
- `exports/kxf-learning-modules-0.1.json` bleibt Consumer-Projektion fuer SSF/NOXIA.
- `<DOMAIN>-L<LEVEL>-<NNNNNN>` ist die kanonische LearningModule-ID.
- `LRN:SSF:*` ist Legacy/Alias.
- `exports/learning-model-0.1.json` ist nur noch Legacy-Kompatibilitaetsansicht.
- KG-0013 dokumentiert die finale Governance.
- `scripts/learning-sync.mjs` validiert und migriert eindeutig gemappte Dateien ohne ID-Erfindung.
