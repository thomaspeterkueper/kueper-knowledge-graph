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

1. existiert im KXF bereits ein eindeutiges `legacyId -> canonical id` Mapping, wird die YAML-`module_id` auf die kanonische ID umgestellt;
2. die alte ID wird als `legacy_id` erhalten;
3. existiert kein eindeutiges Mapping, wird keine neue kanonische ID geraten oder automatisch erfunden;
4. solche Faelle bleiben als `unmapped legacy` sichtbar und benoetigen Kurationsentscheidung;
5. neue Module duerfen nur noch kanonische IDs erhalten.

## Unlock-Semantik

`unlocks` ist fuer normative NOXIA-Unlocks reserviert und verwendet `UNL:NOX:*`.

Historische oder kuratorische Roh-Aliase wie `CHEM:DIPOLE` werden bei der Bereinigung nicht geloescht, sondern in `planned_unlocks` verschoben, bis ein kanonisches `UNL:NOX:*`-Objekt existiert.

## Uebersteuerung des frueheren Governance-Vermerks

Der am 2026-07-24 zunaechst dokumentierte Beschluss, die 22 Legacy-YAML-Dateien nur schrittweise bei spaeteren Tasks anzugleichen, wird durch die spaetere explizite Kuratoranweisung desselben Tages ersetzt: Die Governance soll jetzt konsolidiert und die Migration deterministisch vorbereitet beziehungsweise fuer eindeutig gemappte Module durchgefuehrt werden.

Es bleibt jedoch die harte Regel bestehen: **keine kanonische ID erfinden, wenn das bestehende Repository kein eindeutiges Mapping liefert.**
