# KUEPER Knowledge Graph — Importplan KUEPER.COM

## Pilot 4 · KUE-Basiscluster

Arbeitsprotokoll · kein kanonisches Archivdokument

Stand: 2026-06-24 · Kurator: T.P.K.

## Quelle

Repository: `thomaspeterkueper/kueper.com`

Astro Content Collection: `kue`

Schema laut `src/content/config.ts`:

```ts
{
  datum: string,
  titel: string,
  kategorie: BIO | SCI | TEC | LSC | PHY | PHI | ARC | HIS | GEO | PSY | SOC | LNG | ECO | ORG | OBS | FND | OPS | MET,
  marker: R | T | S | P | H | I,
  version: string,
  status: string,
  sprache: DE | EN,
  keywords: string[],
  kurator: string,
  signatur: string
}
```

## Ziel

Erster echter Importlauf aus KUEPER.COM in den gemeinsamen Knowledge Graph.

Nicht alle Dokumente importieren. Zuerst ein KUE-Basiscluster mit 10–20 Dokumenten.

## Auswahlpriorität

1. PHY — Physikgrundlagen
2. GEO / AST — Planetologie, Geologie, Astronomie
3. CHE — Chemiegrundlagen
4. BIO / LSC — Biologie, Leben, Evolution
5. MAT/MET — Mathematik und Methodik, soweit im Bestand vorhanden
6. OBS — reale Beobachtungsnotizen als [R]-Anker

## Extraktionsformat

Für jedes KUE-Dokument entsteht ein DOC-Knoten:

```text
entity_id:       DOC:KUE:<signatur-slug>
typ:             Document
name:            <titel>
domäne:          <kategorie>
status:          <marker oder dominanter epistemischer Status>
is_instance:     true
beschreibung:    Kurzfassung des Dokuments.
erster_nachweis: <Repo-Pfad oder kueper.com-URL>
erstellt:        2026-06-24
kurator:         T.P.K.
```

Dazu Relationen:

```text
DOC:KUE:<signatur> describes CON:<domain>:<concept>
DOC:KUE:<signatur> references DOC:KUE:<andere-signatur>
DOC:KUE:<signatur> anchors CON:<domain>:<foundation-node>
```

## Erste erwartete Foundation Nodes

- CON:CHE:wasser
- CON:PHY:energie
- CON:PHY:gravitation
- CON:PHY:zeit
- CON:MET:information
- CON:BIO:leben
- CON:BIO:evolution
- CON:GEO:atmosphaere
- CON:AST:habitable-zone
- CON:PHY:strahlung

## Offene technische Notiz

Der GitHub-Connector kann aktuell Dateien abrufen, aber keine Verzeichnisse auflisten, wenn der genaue Pfad unbekannt ist. Sobald die KUE-Dokumentpfade bekannt sind oder ein Dokumentindex vorliegt, kann der Import automatisiert fortgesetzt werden.

ᐃ
