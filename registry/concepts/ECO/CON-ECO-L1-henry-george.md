# CON:ECO:L1:henry-george

**Kanonische ID:** `CON:ECO:L1:henry-george`
**Domäne:** Economics · L1
**Verwandte Konzepte:** `CON:ECO:L1:grundrente`, `CON:ECO:L1:bodenwert`, `CON:ECO:L0:kredit`
**NOXIA-Unlock:** `UNL:NOX:land-value`
**SSF-Modul:** `ECO-L1-0003 — Was ist Grundrente?` (KB-REQUEST-0003)
**Erstellt:** 19.07.2026

---

## Definition

Henry George (1839–1897) war ein amerikanischer Ökonom und Sozialreformer.
Sein Hauptwerk *Progress and Poverty* (1879) stellt eine einfache Frage:
Warum wächst Armut trotz wachsendem Wohlstand?

Seine Antwort: **Weil der Zuwachs an Wohlstand im Bodenwert landet** —
nicht bei denen die arbeiten oder investieren, sondern bei denen die
Grund und Boden besitzen.

---

## Kernthese: Grundrente

**Grundrente** (engl. *land rent*) ist der Ertrag den ein Grundstück
allein durch seine Lage erzielt — unabhängig von Arbeit oder Kapital des
Eigentümers.

Beispiel: Ein Grundstück in der Innenstadt steigt im Wert weil die Stadt
wächst, Infrastruktur gebaut wird, Menschen zuziehen. Der Eigentümer hat
dazu nichts beigetragen — er profitiert trotzdem.

George nennt das **unverdientes Einkommen** (*unearned increment*).

---

## Die Lösung: Einheitssteuer auf Boden

George schlägt vor: **Besteuere nicht Arbeit oder Kapital — besteuere
den Bodenwert.** Eine einzige Steuer auf den Grundwert (ohne Gebäude)
würde reichen um alle anderen Steuern zu ersetzen.

Wirkung:
- Bodenspekulation wird unrentabel
- Brachflächen werden bebaut (Leerstand kostet)
- Arbeit und Investitionen bleiben unbesteuert
- Gemeinde schöpft ab was sie selbst geschaffen hat

---

## Relevanz für NOXIA / Mars-Kolonien

In einer Marskolonie ist Grundrente keine abstrakte Theorie:

- **Boden ist knapp** — unter der Kuppel gibt es begrenzte Fläche
- **Lage entscheidet** — eine Kachel neben der Energieversorgung ist
  mehr wert als eine am Rand der Kolonie
- **Gemeinde baut Infrastruktur** — der Wert entsteht kollektiv

NOXIA implementiert Henry Georges Prinzip durch `land_value` auf
`tile_entities`: Der Bodenwert jeder Kachel wird täglich berechnet aus
Bevölkerungsdichte, Nähe zum Zentrum und Nachfrage. Gebäude auf
wertvollen Kacheln zahlen höhere Abgaben — unabhängig vom Eigentümer.

---

## Historische Rezeption

- **Verbreitung:** *Progress and Poverty* war Ende des 19. Jh. eines der
  meistverkauften Bücher der Welt — nach der Bibel
- **Umsetzung:** Ansätze in Australien, Dänemark, Singapur, Taiwan;
  vollständige Umsetzung nirgends
- **Moderne:** Ökonomen wie Joseph Stiglitz, Paul Krugman und Milton
  Friedman (!) haben Georges Analyse im Kern als korrekt bezeichnet
- **Kritik:** Politisch kaum durchsetzbar — Grundeigentümer sind eine
  mächtige Lobby

---

## Lernpfad

```
CON:ECO:L0:kredit          (Voraussetzung)
  ↓
CON:ECO:L1:henry-george    (dieses Konzept)
CON:ECO:L1:grundrente      (Kernmechanik)
CON:ECO:L1:bodenwert       (NOXIA land_value)
  ↓
UNL:NOX:land-value         (NOXIA Freischaltung)
```
