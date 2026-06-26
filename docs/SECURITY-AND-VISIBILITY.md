# KUEPER Knowledge Graph - Security and Visibility Policy

## Zweck

Der KUEPER Knowledge Graph ist das langfristige Gedaechtnis des gesamten KUEPER-Oekosystems.

Er enthaelt Wissen, Dokumente, Modelle, Narrative, Registry-Daten, Governance-Informationen und langfristig geistiges Eigentum aus mehreren Jahrzehnten Projektarbeit.

Deshalb muessen Speicherung und Veroeffentlichung strikt getrennt werden.

---

## Prinzip 001

Der Knowledge Graph ist das Gedaechtnis.

Nicht die Veroeffentlichung.

---

## Prinzip 002

Der Master Graph ist privat.

Oeffentlich sichtbar sind ausschliesslich kuratierte Exporte.

---

## Architektur

```text
MASTER GRAPH
      |
      v
CURATED EXPORT
      |
      v
PUBLIC GRAPH
      |
      v
Websites
Apps
SSF
NOXIA
OTA
KI-Systeme
```

---

## Regel

Der Master Graph wird niemals direkt veroeffentlicht.

Es gibt keine automatische Freigabe aller Inhalte.

Jede Veroeffentlichung erfolgt ueber einen kuratierten Exportprozess.

---

## Sichtbarkeitsstufen

```text
public
members
internal
restricted
private
```

### public

Darf exportiert und oeffentlich konsumiert werden.

### members

Fuer Mitgliederbereiche und geschlossene Lernangebote.

### internal

Nur fuer interne Systeme.

### restricted

Kuratorische Inhalte, Modelle, Entwuerfe und geistiges Eigentum.

### private

Niemals exportieren.

---

## Narrative Regel

Narrative Inhalte sind standardmaessig nicht oeffentlich.

Beispiele:

- Zereya
- Soma Retep
- Feli
- OTA
- Bayt al Mira
- Omnizedenz
- Heimat aus Staub
- Die Horcher

Standard:

```text
visibility = restricted
```

Bis eine ausdrueckliche Freigabe erfolgt.

---

## Export-Regel

Export ist ein aktiver Vorgang.

```text
private
  -> review
  -> approved
  -> exported
```

Ohne Freigabe kein Export.

---

## Langfristiges Ziel

Einzelne Projekte, Websites, Spiele oder Plattformen koennen ersetzt werden.

Der Knowledge Graph bleibt die dauerhafte Wissensbasis.

Die Architektur muss fuer Zeitraeume von mehreren Jahrzehnten ausgelegt werden.
