# CON:ECO:L1:grundrente

**Kanonische ID:** `CON:ECO:L1:grundrente`
**Domäne:** Economics · L1
**Verwandte Konzepte:** `CON:ECO:L1:henry-george`, `CON:ECO:L1:bodenwert`
**Erstellt:** 19.07.2026

---

## Definition

Grundrente ist das Einkommen das aus dem bloßen Besitz von Boden entsteht —
ohne eigene Arbeit oder Investition des Eigentümers.

Sie entsteht weil:
1. Boden nicht vermehrbar ist (endliches Angebot)
2. Lage nicht kopierbar ist (jede Kachel ist einzigartig)
3. Gesellschaftliche Aktivität den Wert steigert (Infrastruktur, Nachbarn)

## Abgrenzung

| Begriff | Definition |
|---------|-----------|
| Grundrente | Ertrag aus Bodenbesitz (lagebdingt) |
| Miete | Ertrag aus Gebäude (investitionsbedingt) |
| Zins | Ertrag aus Kapital (risikobedingt) |
| Lohn | Ertrag aus Arbeit |

## NOXIA-Referenz

`tile_entities.land_value` — wird täglich durch `runLandValueTick()`
berechnet. Formel: `10 + Bevölkerungsfaktor + Gebäudeaktivität + Näheprämie`
