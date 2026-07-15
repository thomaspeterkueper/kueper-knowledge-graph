# REQ:L3:000002 - BIO-Wissensdomaenen fuer Mikrobiom- und Neuroimmunologie-Dokumente

## Status

```text
open
```

## Requester

```text
SYS:KUEPER:ota
```

## Request Type

```text
entity_request
relation_request
```

## Purpose

Zwei neu kanonisierte OTA-Dokumente (`OTA-SCI-0084-2163-EN`, `OTA-SCI-0085-2164-EN`,
Temenon-Universum, Mikrobiom-/Neuroimmunologie-Strang) benoetigen Lernpfade nach
dem etablierten Muster `PATH:OTA:<doc-id>:READ --TARGETS--> DOC:OTA:<doc-id>`.

Das Wissensdomaenen-Register (`exports/knowledge-domains-0.1.json`, 15 Eintraege)
deckt aktuell GEO, MATH, PHYS, PHIL, KON und LANG-EN ab - keine biologische
Domaene existiert, obwohl `KG-0011` (kueper.com-Systemrolle) BIO bereits als
vorgesehenes Themenfeld nennt. Ohne `KD:BIO-*` koennen fuer diese und
zukuenftige biologische OTA-Dokumente keine sinnvollen Prerequisites gebildet
werden.

Zur Klarstellung: Die fiktive Temenon-Feldphysik selbst wird bewusst **nicht**
als KD-Domaene beantragt. Fiktive Theorien werden innerhalb der Fiktion durch
das Referenzdokument (`OTA-MON-0002-2142-DE`) erschlossen, nicht als real
lernbares Wissensgebiet modelliert. Beantragt werden ausschliesslich reale,
lehrbare Grundlagenfaecher.

## Requested Content

Zwei neue Wissensdomaenen, analog zur bestehenden GEO-Struktur (Elternknoten +
zwei N2-Kindknoten):

```yaml
- id: "KD:BIO:N1"
  type: KnowledgeDomain
  layer: L1
  code: BIO
  level: N1
  title: "Biologie - Orientierung"
  parent: null
  description: >
    Orientierung in grundlegenden biologischen Begriffen, Zellbiologie,
    Immunsystem-Grundlagen und Oekosystem-Denken, ausreichend als Basis fuer
    vertiefende N2-Domaenen.
  aliases: ["BIO N1", "Biology N1"]

- id: "KD:BIO-MICROBIOME:N2"
  type: KnowledgeDomain
  layer: L1
  code: BIO-MICROBIOME
  level: N2
  title: "Mikrobiom und Dysbiose - arbeitsfaehiges Grundverstaendnis"
  parent: "KD:BIO:N1"
  description: >
    Grundlagen der Mikrobiom-Oekologie: 16S-rRNA-basierte Taxonomie,
    Alpha-/Beta-Diversitaetsmetriken, Dysbiose als Krankheitssignatur,
    kurzkettige Fettsaeuren und Darmbarrierefunktion, gnotobiotische
    Modellsysteme. Ausreichend zum Lesen mikrobiomzentrierter OTA-Dokumente.
  aliases: ["BIO-MICROBIOME N2", "Microbiome N2", "Dysbiose N2"]

- id: "KD:BIO-NEUROIMMUN:N2"
  type: KnowledgeDomain
  layer: L1
  code: BIO-NEUROIMMUN
  level: N2
  title: "Neuroimmunologie - arbeitsfaehiges Grundverstaendnis"
  parent: "KD:BIO:N1"
  description: >
    Grundlagen der Neuroimmunologie: Mikroglia-Biologie und Aktivierungsstatus,
    Blut-Hirn-Schranke und Translokationswege, perivaskulaere Immunzellen,
    fruehe Proteinopathie-Marker (Tau-Phosphorylierung, Alpha-Synuclein-
    Oligomere). Baut auf KD:BIO-MICROBIOME:N2 auf (Darm-Hirn-Achse).
  aliases: ["BIO-NEUROIMMUN N2", "Neuroimmunology N2", "Mikroglia N2"]
```

Zugehoerige Relation (Domaenen-Abhaengigkeit, analog zu bestehenden
`REQUIRES`-Kanten):

```yaml
- from: "KD:BIO-NEUROIMMUN:N2"
  type: REQUIRES
  to: "KD:BIO-MICROBIOME:N2"
```

Zwei Lernpfade nach etabliertem Muster:

```yaml
- id: "PATH:OTA:OTA-SCI-0084-2163-EN:READ"
  type: LearningPath
  target: "DOC:OTA:OTA-SCI-0084-2163-EN"
  purpose: read
  requiredDomains:
    - "KD:BIO-MICROBIOME:N2"
    - "KD:MATH-STAT:N2"
    - "KD:LANG-EN:N2"

- id: "PATH:OTA:OTA-SCI-0085-2164-EN:READ"
  type: LearningPath
  target: "DOC:OTA:OTA-SCI-0085-2164-EN"
  purpose: read
  requiredDomains:
    - "KD:BIO-NEUROIMMUN:N2"
    - "KD:BIO-MICROBIOME:N2"
    - "KD:MATH-STAT:N2"
    - "KD:LANG-EN:N2"
```

## Priority

```text
medium
```

## Blocking

Ohne diese Domaenen bleiben `OTA-SCI-0084-2163-EN` und `OTA-SCI-0085-2164-EN`
im SSF-Lernpfadsystem unerreichbar - kein `PATH:*`-Eintrag kann sinnvolle
Voraussetzungen referenzieren, solange `KD:BIO-*` fehlt. Beide Dokumente
fuehren ihre Domaenen bereits jetzt im Frontmatter, aber mit Status
`[OFFEN]`, bis dieser Request umgesetzt ist.

Zusaetzlich blockiert dies jedes zukuenftige biologische OTA-Dokument
(BIO-Serie umfasst allein im aktiven Archiv bereits >25 Dokumente, keines
davon hat bislang eine KD-Domaene) - dieser Request ist insofern kein
Einzelfall, sondern schliesst eine strukturelle Luecke.

## Reason

Siehe Purpose. Kurzfassung: Biologische Grundlagenkompetenz ist im KG bislang
nicht modellierbar, obwohl sowohl OTA (BIO-Serie, >25 Dokumente) als auch
kueper.com (`KG-0011`, BIO als vorgesehenes MINT-Themenfeld) sie voraussetzen.

## Suggested Target

```text
exports/knowledge-domains-0.1.json
exports/kxf-0.6.json (Folgeversion)
learning/ (LRN:SSF:BIO-* Module, falls SSF-seitig gewuenscht - separater Scope)
```

## Suggested Implementation Notes

- `KD:BIO:N1` als neuer Elternknoten, analog zu `KD:GEO:N1` / `KD:MATH:N1` /
  `KD:PHYS:N1` - gleiches Strukturmuster, keine Abweichung noetig.
- Die `REQUIRES`-Kante `BIO-NEUROIMMUN -> BIO-MICROBIOME` spiegelt die
  inhaltliche Abhaengigkeit beider OTA-Dokumente (0085 ist direkte
  Folgestudie zu 0084) und sollte sich in der Modulreihenfolge fortsetzen,
  falls spaeter `LRN:SSF:BIO-*`-Module entstehen.
- SSF-Modulinhalte (`LRN:SSF:BIO-L0-*` etc.) sind bewusst **nicht** Teil
  dieses Requests - das waere ein eigener, kueper.com-seitiger
  Content-Auftrag (`KG-0011`-Scope). Dieser Request schafft nur die
  Domaenen- und Pfadstruktur, auf die spaetere Module zeigen koennen.
- Bitte pruefen, ob `KD:MATH-STAT:N2` (Mediationsanalyse, bootstrapped
  Mediation) inhaltlich bereits ausreichend abgedeckt ist oder ob ein
  Alias/Zusatz noetig ist - beide OTA-Dokumente nutzen Mediationsanalyse
  als zentrales statistisches Werkzeug.

## Created

```text
2026-07-15
```

## Curator

```text
T.P.K.
```

## Created Objects

Noch keine.

## Notes

Dieser Request wurde vom OTA-Kurator ausgeloest, nachdem bei der
Archivierung von `OTA-SCI-0084-2163-EN` und `OTA-SCI-0085-2164-EN` auffiel,
dass zunaechst frei erfundene `KD:*`-IDs im Frontmatter verwendet wurden
(`KD:BIO-MICROBIOME:N2`, `KD:PHYS-TEMENON:N2`) - letztere wurde als
grundsaetzlich fehlerhaftes Modellierungsmuster erkannt und verworfen
(fiktive Theorien sind keine KD-Domaenen), erstere wird hiermit als
regulaerer Request nachgereicht. Beide Dokumente fuehren bis zur Umsetzung
den Status `[OFFEN]` im Frontmatter.
