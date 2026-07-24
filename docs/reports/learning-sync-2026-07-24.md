# Learning Sync Audit — 2026-07-24

**Status:** migration_in_progress / semantic-safe  
**Decision:** KG-0013  
**Scope:** `learning/*.yaml` ↔ `exports/kxf-learning-modules-0.1.json`

## Ergebnis

Die LearningModule-Governance ist konsolidiert:

```text
learning/*.yaml
    -> kuratierte Autorenquelle
    -> exports/kxf-learning-modules-0.1.json
    -> SSF / NOXIA
```

Kanonische LearningModule-IDs verwenden `<DOMAIN>-L<LEVEL>-<NNNNNN>`. `LRN:SSF:*` bleibt als Legacy-Alias erhalten. LearningModules bleiben KG-Layer L3; die Lernstufe in der Modul-ID ist eine davon unabhaengige didaktische Skala.

## In diesem Lauf eindeutig migriert

Folgende Autorenmodule konnten anhand bestehender KXF-Identitaet beziehungsweise explizit registrierter kanonischer IDs ohne ID-Erfindung migriert werden:

- `ssf-phy-wasser-molekuel.yaml` → `PHY-L1-000003`
- `ssf-phy-wasser-aggregat.yaml` → `PHY-L1-000004`
- `ssf-phy-wasser-dichte.yaml` → `PHY-L1-000005`
- `ssf-phy-wasser-oberflaeche.yaml` → `PHY-L1-000006`
- `ssf-phy-wasser-sublimation.yaml` → `PHY-L1-000007`
- `ssf-phy-wasser-waerme.yaml` → `PHY-L1-000008`
- `ssf-phy-magnetismus.yaml` → `PHY-L1-000010`
- `ssf-phy-piezo.yaml` → `PHY-L1-000015`
- `ssf-phy-elektrolyse.yaml` → `PHY-L1-000016`
- `ssf-che-iridium.yaml` → `CHE-L1-000012`
- `ssf-env-rohstoffe.yaml` → `ENV-L1-000001`
- `ssf-bio-astrobiologie.yaml` → `BIO-L1-000001`
- `eng-colony-l1-000001.yaml` → `ENG-L1-000003`
- `eng-station-l1-000001.yaml` → `ENG-L1-000004`

Bei allen migrierten Dateien bleibt die bisherige ID als `legacy_id` erhalten. Eindeutig referenzierbare `requires` wurden auf kanonische Modul-IDs umgestellt.

## Unlock-Bereinigung

Flache `unlocks`-Listen wurden getrennt:

- normative NOXIA-Unlocks: `UNL:NOX:*` bleiben unter `unlocks`;
- nicht-kanonische Planungs-/Roh-Aliase bleiben verlustfrei unter `planned_unlocks`.

Historische verschachtelte Strukturen wie `unlocks: noxia:` werden nicht textuell automatisch konvertiert, da hierzu eine semantische Abbildung auf konkrete `UNL:NOX:*`-Objekte erforderlich ist.

## Bewusst nicht automatisch migriert

Historische Legacy-IDs sind teilweise semantisch mehrfach oder widerspruechlich verwendet worden. Beispiele:

### `LRN:SSF:AST-1101`

Autorenquelle historisch:

```text
Das Sonnensystem als Karte
```

KXF-Ziel unter derselben Legacy-ID:

```text
AST-L1-000001 — Orientierung Planetologie
```

Die ID-Gleichheit belegt keine identische Modulgranularitaet. Eine automatische Umschreibung wuerde zwei unterschiedliche Lernfragen verschmelzen.

### `LRN:SSF:PHY-1101`

Autorenquelle historisch:

```text
Was ist Gravitation?
```

KXF-Ziel unter derselben Legacy-ID:

```text
PHY-L1-000001 — Was die Welt aus sich macht
```

Auch dieser Fall bleibt Review-pflichtig.

Weitere Module mit `LRN:SSF:*` ohne eindeutige semantische KXF-Entsprechung werden durch den Sync-Checker als `REVIEW` ausgegeben und nicht automatisch umnummeriert.

## Reproduzierbare Pruefung

```bash
npm run learning:check
```

Deterministisch und semantisch sicher abbildbare Migrationen:

```bash
npm run learning:migrate
```

Das Tool erfindet keine kanonischen IDs und stoppt Review-Faelle mit Exit-Code 2.

## Verbleibende technische Schuld

Im Kopf von `exports/kxf-learning-modules-0.1.json` verweist `contracts.canonicalSource` historisch noch auf `exports/learning-model-0.1.json`.

Dieser Verweis ist funktional inzwischen ueber die aktualisierte Legacy-Kompatibilitaetsansicht aufgeloest: `exports/learning-model-0.1.json` kennzeichnet sich als `legacy_compatibility_model` und verweist explizit auf `learning/*.yaml` als Autorenquelle sowie auf den KXF-Export als Consumer-Projektion.

Der Literalwert `contracts.canonicalSource` sollte bei der naechsten kontrollierten Regeneration des grossen KXF-Exports direkt auf den aktuellen Source-/Projection-Vertrag angepasst werden. Der Export wurde in diesem Lauf nicht blind komplett neu geschrieben, um keine der bestehenden Modul-, Mapping- oder Path-Daten zu verlieren.

## Validierungsgrenze dieses Laufs

Die Repository-Aenderungen wurden gegen den aktuellen GitHub-`main` vorgenommen. Eine lokale End-to-End-Ausfuehrung von `npm run learning:check` war in der verwendeten Ausfuehrungsumgebung nicht moeglich, weil dort kein GitHub-DNS-Zugriff fuer einen lokalen Clone bestand. Deshalb wurde die Migration ueber die Repository-Daten direkt verifiziert und der Checker als reproduzierbares Repo-Werkzeug hinterlegt.
