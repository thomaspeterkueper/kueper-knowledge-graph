# KG-REQ-20260718-001 — KNOW:* → KD:* Migration in kxf-0.1.json

```yaml
id: REQ:L3:20260718-001
type: Request
layer: L3
requester: SYS:KUEPER:ssf
requestType: schema_migration
purpose: >
  kxf-0.1.json verwendet noch KNOW:* als Domain-Praefix.
  Alle anderen KG-Exporte (entity-registry, relation-registry)
  nutzen bereits KD:* gemaess ECO-ARC-0014. Der Drift
  erzeugt Integrationsprobleme fuer SSF und OTA als Konsumenten.
requestedContent:
  - Migration aller KNOW:* Vorkommen in exports/kxf-0.1.json auf KD:*
  - Optional: Alias-Aufloesung KNOW:* -> KD:* fuer Rueckwaertskompatibilitaet
  - Update kxf-0.2.json bis kxf-0.6.json falls betroffen
priority: high
blocking: >
  SSF-Lernpfade referenzieren domainsNeeded mit KNOW:*-Schreibweise.
  Solange kxf-0.1.json nicht migriert ist, besteht Export-Drift
  zwischen KG-Exporten. Betrifft alle 50 SSF-Lernpfade.
suggestedIds: []
targetExport: exports/kxf-0.1.json
status: open
created: 2026-07-18
curator: T.P.K.
createdObjects: []
notes: >
  Supersedes EXT-ECO-KG-20260714-002 (gleiches Thema, formalisiert).
  Reine Schreibweisen-Migration — keine inhaltliche Aenderung.
  SSF passt domainsNeeded-Felder nach KG-Migration an.
```

## Kontext

`EXT-ECO-KG-20260714-002` hat diesen Bedarf bereits identifiziert.
Dieser Request formalisiert ihn im Standard-Request-Format.

## Betroffene Exports

| Datei | Status |
|-------|--------|
| `exports/kxf-0.1.json` | Migration noetig |
| `exports/kxf-0.2.json` — `kxf-0.6.json` | Pruefen |
| `exports/entity-registry-0.1.json` | bereits KD:* ✓ |
| `exports/relation-registry-0.1.json` | bereits KD:* ✓ |

## SSF-Folgeaktion

Nach KG-Migration: SSF aktualisiert `domainsNeeded`-Felder
in `learningPaths.ts` von `KNOW:*` auf `KD:*`.


---
_Resolved 2026-07-18: Migration ausgefuehrt (kxf-0.1/0.2/0.3). kxf-0.4/0.5/0.6 waren nicht betroffen. SSF-Folgeaktion (domainsNeeded in learningPaths.ts) steht noch aus._
