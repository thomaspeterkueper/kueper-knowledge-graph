# Project Contract - NOXIA

## System

```text
SYS:KUEPER:noxia
```

## Rolle

Spiel- und Simulationssystem.

## Darf

- Spielstaende speichern
- Kolonien erzeugen
- Produktion, Handel und Ressourcen simulieren
- Buildings darstellen
- Unlocks aus KG-/SSF-Daten konsumieren
- wissenschaftliche Inhalte spielerisch anwenden

## Darf nicht

- kanonische Wissenschaft definieren
- eigene wissenschaftliche Entitaeten erzeugen
- eigene kanonische Relationen erzeugen
- Lernmodule als Wissensquelle definieren
- KXF-Felder eigenmaechtig erweitern

## Konsumiert

- entities
- relations
- research
- unlocks
- buildings
- mappings
- KXF
- shared_site_records

## Request-Pflicht

Wenn NOXIA ein Gebaeude, eine Mechanik oder ein Spielsystem benoetigt, das neues Wissen oder neue kanonische Abhaengigkeiten braucht, stellt NOXIA einen Request an den KG.

```text
NOXIA besitzt keine eigene Wissenschaft.
NOXIA verwendet Wissenschaft.
```
