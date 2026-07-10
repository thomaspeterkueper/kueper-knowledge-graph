# KG-DECISION: Computational Lab Layer

**ID:** KG-DEC-20260710-LAB
**Status:** Accepted
**Date:** 2026-07-10
**Curator:** T.P.K.

---

## Entscheidung

Der Computational Lab Layer ist als **lesend-analysierendes System** im KUEPER-Ökosystem erlaubt.

---

## Grenzen

### Erlaubt
- KXF-Exporte lesen (`exports/kxf-*.json`)
- KG-Registry-Exporte lesen (domains, systems, relations)
- OTA-Index lesen (`exports/ota-index-v4.json`)
- Konsistenzprüfungen, Abhängigkeitsgraphen, Visualisierungen
- Prototypische Transformationen (nicht-destruktiv)
- Notebooks, Reports, Mockups als interne Arbeitsartefakte

### Nicht erlaubt
- Kanonische IDs vergeben
- KXF-Contracts ändern
- Direktes Schreiben in KG, SSF, OTA, NOXIA oder kueper.com
- Notebook-Outputs ohne KG-Request als kanonisch behandeln
- Alternative KXF-Exporte produzieren

---

## System-Registrierung

`SYS:KUEPER:lab` wird **nicht** als eigenständiges System registriert.

Begründung: Ein reines Analysetool ohne Schreibrechte und ohne eigene Verträge
ist kein System im Sinne der System-Registry — es ist ein Werkzeug.
JupyterLab, marimo, Observable und DuckDB sind Implementierungstools, keine Systeme.

---

## Empfohlene Ablage

Notebooks und Lab-Artefakte gehören in:
```
kueper-knowledge-graph/lab/
  notebooks/     ← Jupyter / marimo Notebooks
  reports/       ← Generierte Reports (nie kanonisch)
  scripts/       ← Einmal-Skripte für Konsistenzprüfungen
  README.md      ← Lab-Boundaries-Dokument
```

---

## Request-Workflow

Die Frage nach expliziten `Sender/Origin` und `Target`-Feldern wird in
`KG-REQ-20260709-request-workflow-origin-target` separat adressiert.

---

*Kurator: T.P.K. · 2026-07-10*
