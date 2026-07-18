# KG-REQ-20260718-005 — Feldnamen-Mismatch: entity.schema.json vs. Entity-YAMLs

```yaml
id: REQ:L3:20260718-005
type: Request
layer: L3
requester: SYS:KUEPER:knowledge-graph
requestType: schema_change
purpose: >
  Kein einziges Entity-YAML validiert gegen das eigene entity.schema.json.
  Das Schema verlangt deutsche Feldnamen (domäne, beschreibung, erstellt,
  kurator), sämtliche 29 Dateien unter entities/ verwenden englische
  (domain, definition, created, curator). Der Mismatch ist systematisch,
  nicht vereinzelt — er betrifft 29 von 29 Dateien.
requestedContent:
  - Kuratorentscheidung über die Richtung der Angleichung (Schema oder Dateien)
  - Angleichung der gewählten Seite
  - Ausschluss von entities/foundation/index.yaml aus der Entity-Validierung
  - Optional: Validierungslauf in die Pre-Commit-/CI-Prüfung aufnehmen
priority: medium
blocking: >
  Nicht blockierend für laufende Arbeit, aber jede Schema-Validierung des
  Entity-Bestands schlägt derzeit vollständig fehl. Damit ist das Schema als
  Qualitätssicherung praktisch wirkungslos, und neu angelegte Entitäten
  (zuletzt der Kontrakomologie-Cluster) erben den Fehler ungeprüft weiter.
suggestedIds: []
targetExport: schemas/entity.schema.json
status: open
created: 2026-07-18
curator: T.P.K.
createdObjects: []
notes: "Aufgefallen bei KG-REQ-20260715 (Kontrakomologie-Kanonisierung)."
```

## Befund

`schemas/entity.schema.json` fordert:

```
required: [entity_id, typ, name, domäne, status, beschreibung, erstellt, kurator]
```

Tatsächlich verwenden alle Dateien unter `entities/`:

```
entity_id, typ, layer, name, domain, status, definition, created, curator
```

Es fehlen also durchgängig `domäne`, `beschreibung`, `erstellt`, `kurator` — vorhanden
sind stattdessen die englischen Entsprechungen. Übereinstimmend sind nur `entity_id`,
`typ`, `name`, `status`.

Betroffen: **29 von 29** Dateien in `entities/concepts/` (12), `entities/foundation/` (12,
davon 1 Sonderfall) und `entities/models/` (5).

## Sonderfall

`entities/foundation/index.yaml` ist keine Entität, sondern eine Indexdatei. Ihr fehlen
zusätzlich `entity_id`, `typ` und `name`. Sie sollte von der Entity-Validierung
ausgenommen werden, statt sie schemakonform zu machen.

## Zwei mögliche Richtungen

**A — Schema an die Dateien angleichen** (englische Feldnamen ins Schema übernehmen).
Ändert 1 Datei statt 29. Deckt sich mit dem Governance-Präzedenzfall aus KG-0006
(„camelCase für alle KXF-JSON-Feldnamen"), der bereits englische Feldbenennung als
Ökosystem-Konvention gesetzt hat. Zusätzlich zu klären: `definition` vs. `beschreibung` —
die YAMLs benennen das Feld semantisch präziser als das Schema.

**B — Dateien an das Schema angleichen** (deutsche Feldnamen in 29 Dateien einsetzen).
Bewahrt das bestehende Schema, erzeugt aber Aufwand und Sprachbruch gegenüber KG-0006.
Zudem müssten alle Konsumenten, die die YAMLs lesen, mitgezogen werden.

**Empfehlung:** Richtung A. Der Mismatch entstand vermutlich, weil das Schema früh
deutsch formuliert und die Modellierung später englisch fortgeführt wurde; die 29 Dateien
bilden den gelebten Stand ab, das Schema den veralteten.

Die Entscheidung liegt beim Kurator — sie legt die Feldsprache des Entity-Layers
dauerhaft fest und wirkt damit über den KG hinaus.

## Nach der Entscheidung

Sobald die Richtung feststeht, ist die Umsetzung mechanisch. Sinnvoll wäre, im selben
Zug einen Validierungslauf zu etablieren, damit dieser Zustand nicht erneut unbemerkt
entsteht.
