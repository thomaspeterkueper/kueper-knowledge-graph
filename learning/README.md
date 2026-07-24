# Learning Modules

Produktive Lernmodule fuer Solar Science Foundation und NOXIA.

Ein Lernmodul ist kein Wissensknoten, sondern eine Vermittlungseinheit. Es verweist auf L0/L1-Wissen und kann von Lernpfaden, Assessments und NOXIA-Freischaltungen verwendet werden.

## Rolle dieses Verzeichnisses

`learning/*.yaml` ist die kuratierte **Autorenquelle** fuer konkrete Lernmodule.

Die maschinenlesbare Consumer-Projektion liegt in:

```text
exports/kxf-learning-modules-0.1.json
```

SSF und NOXIA konsumieren den KXF-Export. Der Export ist keine zweite unabhaengige Autorenquelle.

## Kanonische Modul-ID

Neue und migrierte Module verwenden:

```text
<DOMAIN>-L<LEVEL>-<NNNNNN>
```

Beispiel:

```yaml
module_id: PHY-L1-000003
legacy_id: LRN:SSF:PHY-L1-000003
typ: LearningModule
layer: L3
```

`layer: L3` und `L1` in der Modul-ID widersprechen sich nicht: `layer` ist der epistemische KG-Layer; `L1` ist die didaktische Lernstufe.

## Legacy

`LRN:SSF:*` darf bei LearningModules nur noch als `legacy_id`/Alias vorkommen. Bei Migrationen wird keine kanonische ID geraten. Fehlt ein eindeutiges Mapping im bestehenden KG/KXF, bleibt das Modul bis zur Kurationsentscheidung unveraendert sichtbar.

## Unlocks

`unlocks` ist fuer kanonische normative Unlock-IDs reserviert, insbesondere `UNL:NOX:*`.

Nicht-kanonische Planungsaliase bleiben erhalten unter:

```yaml
planned_unlocks:
  - CHEM:DIPOLE
```

## Konsistenzpruefung

```bash
npm run learning:check
```

Deterministisch abbildbare Legacy-IDs und Unlock-Aliase koennen mit folgendem Repository-Tool migriert werden:

```bash
npm run learning:migrate
```

Das Tool erfindet keine IDs. Nicht eindeutig gemappte Legacy-Module werden als `REVIEW` gemeldet.

Siehe auch `docs/decisions/KG-0013-learning-module-id-governance.md`.
