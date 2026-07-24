# KG-REQ-20260721-learning-vs-exports-sync — Zwei parallele Lernmodul-Register

ID: REQ:L3:PENDING
Requester: SYS:KUEPER:knowledge-graph
Recipient: T.P.K.
Request Type: governance_question
Status: resolved
Created: 2026-07-21
Resolved: 2026-07-24
Source: KB-REQUEST-0005 (Aufarbeitung)

## Kurator-Entscheidung (T.P.K., 2026-07-24)

### Zu Frage 1: Zweck von `learning/`

`learning/*.yaml` ist die **Autorenquelle** — reichhaltige Kurationsnotizen,
`teaches`-Konzeptlisten, Voraussetzungsketten, fachliche Hinweise für Kuratoren.

`exports/kxf-learning-modules-0.1.json` ist der **konsumierte Export** —
maschinenlesbar, von SSF (`lib/kxf.ts`) und NOXIA direkt gelesen.

Beide existieren bewusst nebeneinander. `learning/` ist nicht obsolet.

### Zu Frage 2: Wer pflegt `learning/`?

`learning/` wird durch KG-Requests gepflegt (KB-REQUEST-0005 hat das
exemplarisch getan). Der Export wird separat aktualisiert wenn neue Module
kanonisch werden. Das ist der korrekte Workflow.

### Zu Frage 3: Migration der 22 Legacy-Dateien

**Kein Migrations-Block.** Die 22 Dateien mit alten IDs (`LRN:SSF:PHY-1101` etc.)
bleiben erhalten. Inhalt ist weiterhin gültig.

Schrittweise Angleichung: wenn ein Legacy-Modul in einem SSF-Task referenziert wird,
wird die ID beim nächsten Commit auf das kanonische Schema (`{DOMAIN}-L{LEVEL}-{NNNNNN}`)
angepasst. Kein dedizierter Migrations-Sprint nötig.

### Zur Inkonsistenz layer vs. ID

`ssf-phy-wasser-molekuel.yaml`: `layer: L3` ist der didaktische Komplexitätsgrad
(Anwendungsebene, nicht Fundamentaldaten). Die ID `PHY-L1-000001` bezeichnet das
Niveau im Lernpfad-Graphen (L1 = Grundlagenwissen). Beide Skalen sind orthogonal
(EP0-EP4 vs. L0-L9 vs. N0-N3 per SSF-CORE.md §3.1). Kein Fehler.

### Zur Abweichung bei `unlocks`

`learning/`-Dateien dürfen reichhaltigere `unlocks`-Listen führen als der Export —
sie sind Planungsdokumente, nicht normative Quellen. Normativ ist ausschließlich
der Export + learningPaths.ts in SSF.

## Ergebnis

- `learning/` bleibt als Autorenquelle aktiv
- `exports/kxf-learning-modules-0.1.json` bleibt Single Source of Truth für Konsum
- 22 Legacy-Dateien: kein Migrationsbedarf, schrittweise Angleichung bei Bedarf
- Kein weiterer Task erforderlich
