---
id: SSF-KG-REQ-20260901-001
title: Verbleibende SSF-KNOW-Domains kanonisch klassifizieren
status: open
source: SSF
target: KG
created: 2026-09-01
priority: high
affects: [KG, SSF]
---

## Anlass

SSF hat den aktiven Lernpfad-Registry-Audit umgesetzt und die 39 im kanonischen KG-Vertrag `exports/legacy-knowledge-domain-mappings-0.1.json` enthaltenen `KNOW:*`-IDs auf `KD:*` migriert.

Vier weiterhin fachlich benötigte Legacy-IDs sind in diesem Vertrag nicht enthalten. SSF erfindet hierfür gemäß Source-of-Truth-Regel keine eigenen kanonischen `KD:*`-Identitäten. Die betroffenen Pfade werden bis zur KG-Entscheidung aus dem konsumierbaren Runtime-Registry quarantänisiert.

## Zu klassifizierende Legacy-IDs

1. `KNOW:CHE-REACTIONS`
   - aktuell benötigt von `PATH:SSF:CHE-KUECHE-MAILLARD-0001`
2. `KNOW:CHE-ORGANIC`
   - aktuell benötigt von `PATH:SSF:CHE-KUECHE-MAILLARD-0001`
3. `KNOW:PHY-SURFACE-TENSION`
   - aktuell benötigt von `PATH:SSF:PHY-WASSER-OBERFL-0001`
4. `KNOW:PHY-CAPILLARITY`
   - aktuell benötigt von `PATH:SSF:PHY-WASSER-OBERFL-0001`

## Anforderung an KG

Bitte jede ID nach den bestehenden KG-Regeln klassifizieren:

- auf vorhandene kanonische `KD:*`-Domain mappen, **oder**
- falls fachlich erforderlich eine kanonische Domain im KG anlegen, **oder**
- explizit als zu breit/obsolet ablehnen und eine vorhandene Ersatzdomain bestimmen.

Bitte anschließend den maschinenlesbaren Legacy-Migrationsvertrag aktualisieren, damit SSF die Zuordnung konsumieren kann.

## Nicht mehr angefordert

`KNOW:ENG-MINING` und `KNOW:CHE-SEPARATION` waren ebenfalls in alten SSF-Daten vorhanden. Der betreffende alte Rohstoffgewinnungs-Pfad wurde inzwischen durch den kanonisch angebundenen NOXIA-Resource-Extraction-Pfad ersetzt und ist nicht mehr Teil des konsumierbaren SSF-Registry. Für diese beiden IDs ist daher aktuell keine neue KG-Identität allein aufgrund des SSF-Legacybestands erforderlich.

## SSF-Zwischenzustand

Bis zur Rückmeldung werden ausschließlich die beiden betroffenen Pfade quarantänisiert; alle anderen aktiven Pfade dürfen keine `KNOW:*`-Domain mehr exponieren.

## Rückgabeformat

Gewünscht ist je Legacy-ID mindestens:
- `legacyId`
- `canonicalIds`
- `classification`
- kurze fachliche Begründung

Danach kann SSF die Quarantäne entfernen und den Registry-Audit vollständig schließen.
