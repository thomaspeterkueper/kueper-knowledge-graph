# KG-REQ-20260718-004 — Unregistrierte KD-IDs aus OTA-Dokumenten

```yaml
id: REQ:L3:20260718-004
type: Request
layer: L3
requester: SYS:KUEPER:ssf
requestType: entity_request
purpose: >
  OTA-Dokumente referenzieren KD-IDs die im KG noch nicht registriert sind.
  Diese KD-IDs sind in OTA-Frontmatter enthalten aber nicht in
  exports/knowledge-domains-0.1.json vorhanden.
requestedContent:
  - KD:PHYS-THERM:N1 — Thermodynamik (OTA-Referenz)
  - KD:PHIL-SCI:N2 — Wissenschaftsphilosophie (OTA-Referenz)
  - KD:MATH-STAT:N1 — Statistik und Wahrscheinlichkeit (OTA-Referenz)
  - Viertes unregistriertes KD (aus OTA-Dokument, ID noch zu ermitteln)
priority: medium
blocking: >
  OTA-Batch-Registrierung (204 Dokumente) kann nicht abgeschlossen
  werden solange referenzierte KD-IDs nicht im KG existieren.
  Betrifft SSF-OTA-Bruecke (REQUEST-OTA-BRIDGE-2026-07.md).
suggestedIds:
  - KD:PHYS-THERM:N1
  - KD:PHIL-SCI:N2
  - KD:MATH-STAT:N1
targetExport: exports/knowledge-domains-0.1.json
status: open
created: 2026-07-18
curator: T.P.K.
createdObjects: []
notes: >
  Identifiziert in SSF-Session Juli 2026.
  OTA-Batch-Registrierung haengt an dieser Freigabe.
  Viertes KD-ID muss aus OTA-Dokumenten ermittelt werden.
```

## Kontext

Die vier KD-IDs wurden bei der Vorbereitung der OTA-Batch-Registrierung
(204 Dokumente) als unregistriert identifiziert. Die Registrierung
kann erst abgeschlossen werden, wenn alle referenzierten KD-IDs
im KG kanonisch existieren.

## Verwandte Tasks

- SSF `/docs/REQUEST-OTA-BRIDGE-2026-07.md` — OTA-Bruecke
- OTA-Batch-Registrierung (offen)


---
_Resolved 2026-07-19: KD:PHYS-THERM:N1 und KD:PHIL-SCI:N2 waren bereits registriert. KD:MATH-STAT:N1 ergaenzt (14 referenzierende OTA-Dokumente). Viertes KD identifiziert: KD:KON-KONTR:N1 in OTA-BIO-0032-2026-DE.md - ist der bekannte Tippfehler fuer KD:KON:N1, keine eigene Domain. Nicht registriert; external-task an OTA gestellt (Quellkorrektur statt KG-Dublette). OTA-Batch-Registrierung damit fuer alle referenzierten KD-IDs entblockt._
