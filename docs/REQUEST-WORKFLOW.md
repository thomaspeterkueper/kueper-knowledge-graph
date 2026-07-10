# REQUEST-WORKFLOW.md
## KUEPER Ecosystem — Cross-Project Request Protocol

**Version:** 0.2.0
**Updated:** 2026-07-10
**Source:** KG-REQ-20260709-request-workflow-origin-target

---

## Pflichtfelder (alle Requests)

```yaml
id: REQ-KUEPER-YYYYMMDD-SLUG
status: open | in_review | accepted | implemented | consumed | closed
requester: SYS:KUEPER:*
target: SYS:KUEPER:*
created: YYYY-MM-DD
priority: low | medium | high | critical
type: architecture | schema | implementation | documentation | decision
blocking: description or "none"
```

---

## Optionale Governance-Felder (v0.2.0 — rückwärtskompatibel)

```yaml
# Sender-Kontext
originSystem: SYS:KUEPER:*      # Welches System initiiert
originAgent: ChatGPT | Claude | T.P.K. | automated
originContext: Freitext          # Warum / aus welchem Anlass

# Ziel-Kontext
targetSystem: SYS:KUEPER:*      # Welches System soll reagieren
targetAgent: optional           # Wer im Zielsystem

# Abhängigkeiten
dependsOn:                      # Muss vor diesem Request erledigt sein
  - REQ-ID-1
  - REQ-ID-2
blocks:                         # Wird durch diesen Request blockiert
  - REQ-ID-3
followUpSystems:                # Systeme die nach Umsetzung informiert werden
  - SYS:KUEPER:ssf
  - SYS:KUEPER:ota
```

---

## Lifecycle

```
open → in_review → accepted → implemented → consumed → closed
              ↓
           rejected (mit Begründung)
```

| Status | Bedeutung |
|--------|-----------|
| `open` | Eingereicht, noch nicht geprüft |
| `in_review` | Kuratorische Prüfung läuft |
| `accepted` | Entscheidung: wird umgesetzt |
| `implemented` | Code/Dok fertig, noch nicht konsumiert |
| `consumed` | Downstream-System hat übernommen |
| `closed` | Abgeschlossen (auch: rejected, superseded) |

---

## Ablage-Konvention

```
external-tasks/
  open/           ← Status: open, in_review
  in-progress/    ← Status: accepted, implemented
  done/           ← Status: consumed, closed
  rejected/       ← Status: rejected
```

---

## Backward-Kompatibilität

Alle Requests ohne Governance-Felder bleiben gültig.
Neue Felder sind optional. Bestehende Requests müssen nicht migriert werden.

---

*Kurator: T.P.K. · 2026-07-10*
