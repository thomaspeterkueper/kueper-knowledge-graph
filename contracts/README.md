# Project Contracts

## Zweck

Project Contracts definieren, was ein angeschlossenes KUEPER-System darf und was nicht.

Sie verhindern, dass Websites, Lernplattformen, Spiele oder narrative Spezialseiten eigene kanonische Wissensobjekte erzeugen.

---

## Grundregel fuer alle Projekte

```text
Das Projekt konsumiert den Knowledge Graph.
Das Projekt erweitert den Knowledge Graph nicht selbst.
```

Wenn ein Projekt etwas braucht, stellt es einen KG-Request.

---

## Gilt fuer

Aktuelle Systeme:

- SYS:KUEPER:kueper-com
- SYS:KUEPER:ssf
- SYS:KUEPER:noxia
- SYS:KUEPER:ota

Geplante oder moegliche Spezialseiten:

- SYS:KUEPER:zereya
- SYS:KUEPER:contracosmology
- SYS:KUEPER:feli
- SYS:KUEPER:soma-retep
- SYS:KUEPER:omnizedenz

---

## Contract-Prinzip

Jeder Contract definiert:

- System-ID
- erlaubte Outputs
- verbotene Masterdaten
- konsumierte KG-Daten
- Request-Pflicht
- Export-/Mapping-Abhaengigkeiten
