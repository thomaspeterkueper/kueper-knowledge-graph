# Media Registry

## Zweck

Dieses Verzeichnis enthaelt kanonische Medien-Asset-Definitionen fuer das KUEPER-Oekosystem.

Die Dateien selbst muessen nicht zwingend hier liegen.

Der Knowledge Graph verwaltet:

- Medien-ID
- Metadaten
- Rechte
- Sichtbarkeit
- Speicherort
- Varianten
- Verknuepfungen
- Systemverwendung

---

## ID-Format

```text
MED:L3:<slug>
```

---

## Medienarten

```text
image
diagram
video
audio
score
animation
interactive
model3d
thumbnail
cover
map
```

---

## Standard-Sichtbarkeit

Wissenschaftliche, allgemeine und oeffentliche Lehrgrafiken koennen `public` sein.

Narrative, unveroeffentlichte oder projektinterne Assets sind standardmaessig `restricted` oder `private`.

---

## Registry-Dateien

```text
media/index.json
media/images/
media/audio/
media/video/
media/diagrams/
media/covers/
media/maps/
```

---

## Regel

Kein Medien-Asset ohne ID.

Kein Medien-Asset ohne Rechtefeld.

Kein Medien-Asset ohne Sichtbarkeit.

Kein oeffentlicher Export ohne Freigabe.
