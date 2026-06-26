# KUEPER Knowledge Graph - Media Assets

## Zweck

Grafiken, Bilder, Videos und Audiodateien sind zentrale Bestandteile des KUEPER-Oekosystems.

Sie werden in Websites, Lernmodulen, Unterlagen, Spielen, Dokumenten, Buechern und narrativen Projekten verwendet.

Deshalb duerfen sie nicht nur als lose Dateien existieren.

Sie brauchen kanonische IDs, Metadaten, Rechte, Sichtbarkeit, Varianten und Verknuepfungen.

---

## Grundregel

Ein Medium ist nicht automatisch Wissen.

Ein Medium ist ein Asset, das Wissen, Modelle, Anwendungen oder Narrative darstellen, ergaenzen oder illustrieren kann.

---

## ID-Schema

Medien erhalten IDs nach dem Muster:

```text
MED:L3:<slug>
```

Beispiele:

```text
MED:L3:ssf-gravity-diagram-001
MED:L3:noxia-mars-habitat-background-001
MED:L3:feli-cover-band-1-001
MED:L3:winterlicht-demo-audio-001
MED:L3:ota-model-animation-001
```

`MED` ist der kanonische Obertyp. Die konkrete Medienart wird ueber `mediaType` bestimmt.

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

## Speicherung

Der Knowledge Graph muss die Datei nicht zwingend selbst speichern.

Der Knowledge Graph speichert:

- kanonische Asset-ID
- Titel
- Beschreibung
- Medienart
- Format
- Rechte
- Sichtbarkeit
- Speicherort
- Varianten
- Verknuepfungen
- Verwendungskontext

Die Datei selbst kann liegen in:

```text
repo
github_lfs
cloudflare_r2
s3
private_storage
youtube_private
vimeo_private
external_archive
```

---

## Sichtbarkeit

Medien verwenden dieselben Sichtbarkeitsstufen wie andere KG-Objekte:

```text
public
members
internal
restricted
private
```

Narrative Assets sind standardmaessig:

```text
restricted
```

bis eine ausdrueckliche Freigabe erfolgt.

---

## Rechte

Jedes Medien-Asset braucht Rechteinformationen.

Pflichtfragen:

- Wer besitzt das Asset?
- Wer darf es verwenden?
- In welchen Systemen darf es erscheinen?
- Darf es oeffentlich exportiert werden?
- Gibt es externe Lizenzbedingungen?
- Wurde es KI-generiert, fotografiert, komponiert, gezeichnet oder manuell erstellt?

---

## Varianten

Ein Asset kann mehrere Varianten haben:

```text
original
web
thumbnail
print
mobile
dark
light
transparent
poster
preview
transcript
subtitles
```

Beispiel:

```json
{
  "id": "MED:L3:ssf-gravity-diagram-001",
  "variants": [
    {
      "role": "web",
      "format": "image/png",
      "path": "media/images/ssf-gravity-diagram-001-web.png"
    },
    {
      "role": "thumbnail",
      "format": "image/webp",
      "path": "media/images/ssf-gravity-diagram-001-thumb.webp"
    }
  ]
}
```

---

## Verknuepfungen

Medien koennen auf KG-Objekte zeigen:

```text
CON:L1:gravitation
LRN:L3:ssf-phy-1101
DOC:L3:kue-ast-0001-2026-de
SYS:L3:noxia
PER:L4:soma_retep
```

Dadurch kann ein Bild in mehreren Kontexten wiederverwendet werden, ohne mehrfach definiert zu werden.

---

## KXF-Regel

KXF kann Medien referenzieren, aber soll keine grossen Binaerdateien transportieren.

KXF transportiert:

- ID
- Metadaten
- URLs oder Pfade
- Rechte
- Sichtbarkeit
- Varianten
- Relationen

Nicht transportiert:

- rohe Bilddaten
- rohe Audiodaten
- rohe Videodaten

---

## Beispiel

```json
{
  "id": "MED:L3:ssf-gravity-diagram-001",
  "type": "MediaAsset",
  "layer": "L3",
  "mediaType": "diagram",
  "format": "image/png",
  "title": {
    "de": "Diagramm zur Gravitation",
    "en": "Gravity diagram"
  },
  "description": {
    "de": "Vereinfachte Darstellung der Anziehung zwischen zwei Koerpern.",
    "en": "Simplified representation of attraction between two bodies."
  },
  "visibility": "public",
  "rights": {
    "owner": "PER:L3:thomas_peter_kueper",
    "license": "all_rights_reserved",
    "allowedSystems": ["SYS:KUEPER:ssf", "SYS:KUEPER:kueper-com"]
  },
  "source": {
    "storage": "repo",
    "path": "media/images/ssf-gravity-diagram-001.png"
  },
  "relatesTo": [
    "CON:L1:gravitation",
    "LRN:L3:ssf-phy-1101"
  ]
}
```

---

## Langfristige Bedeutung

Medien sind fuer alle KUEPER-Projekte wesentlich:

- Websites
- SSF-Lernmodule
- NOXIA-Assets
- OTA-Modelle
- Buchcover
- Karten
- Illustrationen
- Musik
- Videos
- Schulungsunterlagen

Deshalb gehoeren sie als kanonische Asset-Schicht in den Knowledge Graph.
