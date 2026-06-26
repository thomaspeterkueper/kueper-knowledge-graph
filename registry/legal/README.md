# Legal Registry

## Zweck

Die Legal Registry ist die zentrale Stammdatenquelle fuer rechtliche Website-Angaben im KUEPER-Oekosystem.

Sie gehoert in den KUEPER Knowledge Graph, weil mehrere Systeme dieselben Angaben konsumieren sollen:

- kg.kueper.com
- kueper.com
- solarsciencefoundation.org
- overtimearchive.org
- noxiagame.vercel.app

## Kanonische ID

```text
LEGAL:L3:impressum-master
```

## Regel

Websites pflegen keine eigenen Masterdaten fuer rechtliche Pflichtangaben.

Sie konsumieren die kanonischen Daten aus dem Knowledge Graph und rendern sie lokal.

## Datenschutz- und Veroeffentlichungsregel

Personenbezogene Kontaktdaten werden nicht automatisch in dieses oeffentliche Repository geschrieben.

Sie duerfen erst eingetragen werden, wenn sie ausdruecklich fuer die Veroeffentlichung freigegeben wurden.

Bis dahin enthaelt die Registry nur Struktur, IDs, Systeme, Domains und Konsumregeln.

## Geplanter oeffentlicher Endpunkt

```text
https://kg.kueper.com/legal/impressum.json
```

## Konsumenten

Die folgenden Systeme sollen die Legal Registry konsumieren:

```text
SYS:KUEPER:knowledge-graph
SYS:KUEPER:kueper-com
SYS:KUEPER:ssf
SYS:KUEPER:noxia
SYS:KUEPER:ota
```
