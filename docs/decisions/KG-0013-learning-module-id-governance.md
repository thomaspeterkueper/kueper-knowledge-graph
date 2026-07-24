# KG-0013 — LearningModule-ID-Governance und Source/Projection-Vertrag

**Status:** accepted  
**Date:** 2026-07-24  
**Owner:** SYS:KUEPER:knowledge-graph  
**Curator:** T.P.K.

## Entscheidung

Konkrete SSF-Lernmodule verwenden kanonisch:

```text
<DOMAIN>-L<LEVEL>-<NNNNNN>
```

Beispiele:

```text
PHY-L1-000003
AST-L1-000001
MAT-L2-000002
```

Fruehere LearningModule-IDs im Muster `LRN:SSF:*` sind Legacy-Aliase. Sie werden nicht fuer neue kanonische Module vergeben.

## Zwei orthogonale Ebenen

Ein LearningModule bleibt im Knowledge Graph ein L3-Objekt. Das `L<LEVEL>` in der Modul-ID ist die didaktische Lernstufe und nicht der epistemische KG-Layer.

Damit ist beispielsweise diese Kombination korrekt:

```yaml
module_id: PHY-L1-000003
layer: L3
```

## Source-of-Truth-Vertrag

```text
learning/*.yaml
    -> kuratierte Autorenquelle
    -> exports/kxf-learning-modules-0.1.json
    -> SSF / NOXIA
```

`learning/*.yaml` enthaelt die reichhaltige kuratorische Moduldefinition. Der KXF-Export ist die maschinenlesbare Consumer-Projektion. Beide duerfen nicht unabhaengig voneinander als konkurrierende Modulregister gepflegt werden.

`exports/learning-model-0.1.json` bleibt nur als Legacy-/Kompatibilitaetsansicht des fruehen Learning Models bestehen und ist keine Autorenquelle fuer neue konkrete Lernmodule.

## Migration

Legacy-Inhalte werden nicht geloescht.

Bei einer Migration gilt:

1. eine bestehende Legacy-ID allein reicht **nicht** als Migrationsbeweis, wenn Autorenquelle und Export semantisch unterschiedliche Module beschreiben;
2. automatisch migriert werden darf nur bei explizitem Mapping oder bei eindeutigem ID-Mapping **und** semantischer Uebereinstimmung der Modulidentitaet (mindestens Titel/Frage);
3. die alte ID wird als `legacy_id` erhalten;
4. existiert kein eindeutiges, semantisch konsistentes Mapping, wird keine neue kanonische ID geraten oder automatisch erfunden;
5. solche Faelle bleiben als `semantic conflict` beziehungsweise `unmapped legacy` sichtbar und benoetigen Kurationsentscheidung;
6. neue Module duerfen nur noch kanonische IDs erhalten.

Beispiel fuer einen blockierten Automatismus:

```text
learning: LRN:SSF:AST-1101 -> "Das Sonnensystem als Karte"
export:   LRN:SSF:AST-1101 -> AST-L1-000001 -> "Orientierung Planetologie"
```

Die historische ID ist gleich, die Modulidentitaet aber nicht hinreichend gleich. Dieser Fall darf nicht automatisch auf `AST-L1-000001` umgeschrieben werden.

## Unlock-Semantik

`unlocks` ist fuer normative NOXIA-Unlocks reserviert und verwendet `UNL:NOX:*`.

Historische oder kuratorische Roh-Aliase wie `CHEM:DIPOLE` werden bei der Bereinigung nicht geloescht, sondern in `planned_unlocks` verschoben, bis ein kanonisches `UNL:NOX:*`-Objekt existiert.

Historische verschachtelte Strukturen wie `unlocks: noxia:` werden nicht rein textuell migriert; ihre Semantik muss explizit auf kanonische `UNL:NOX:*`-Objekte abgebildet werden.

## Uebersteuerung des frueheren Governance-Vermerks

Der am 2026-07-24 zunaechst dokumentierte Beschluss, die Legacy-YAML-Dateien nur schrittweise bei spaeteren Tasks anzugleichen, wird durch die spaetere explizite Kuratoranweisung desselben Tages ersetzt: Die Governance soll jetzt konsolidiert und die Migration fuer eindeutig abbildbare Module durchgefuehrt werden.

Die Vollmigration ist jedoch **kein blindes Renaming**. Semantisch kollidierende Altmodule werden bewusst als Review-Faelle stehen gelassen, bis ihre Identitaet geklaert ist.

Harte Regel: **keine kanonische ID erfinden und keine historische ID-Gleichheit mit semantischer Identitaet verwechseln.**
