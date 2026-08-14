#!/usr/bin/env python3
"""
scripts/check_source_of_truth.py

Prueft das KG-Repository gegen registry/source-of-truth.json (ECO-ARC-0019 §II.3)
und gegen grundlegende referenzielle Integritaet.

Exit 0: keine Verstoesse (Warnungen erlaubt).
Exit 1: mindestens ein blockierender Verstoss.

Blockierend:
  - Neue, nicht in der Baseline erfasste verwaiste Dateien in deklarierten
    "deprecated"-Orten (module_id ohne Entsprechung im kanonischen Ort).
  - Drift zwischen kanonischer und veralteter Quelle fuer dieselbe ID
    (z. B. abweichende unlocks-Liste fuer dasselbe Modul).
  - Haengende dependencies.requires-Referenzen im kanonischen Lernmodul-Export.
  - Referenzen auf nicht registrierte KD:*-Domaenen in knowledgeDomain-Feldern.

Nur Warnung (nicht blockierend):
  - Bekannte Baseline-Waisen (siehe registry/source-of-truth.json).
"""
import json
import sys
import glob
import os

try:
    import yaml
except ImportError:
    print("FEHLER: PyYAML nicht installiert (pip install pyyaml)", file=sys.stderr)
    sys.exit(2)

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_json(path):
    with open(os.path.join(REPO_ROOT, path), encoding="utf-8") as f:
        return json.load(f)


def load_yaml(path):
    with open(os.path.join(REPO_ROOT, path), encoding="utf-8") as f:
        return yaml.safe_load(f)


def check_learning_modules(decl, errors, warnings):
    canonical_path = decl["canonical"]["path"]
    kxf = load_json(canonical_path)
    modules = kxf["records"]["learning_modules"]
    canonical_ids = {m["id"] for m in modules}
    legacy_map = {m["legacyId"]: m for m in modules if m.get("legacyId")}
    by_id = {m["id"]: m for m in modules}

    # Referenzielle Integritaet: requires muessen aufloesen
    for m in modules:
        for req in m.get("dependencies", {}).get("requires", []):
            if req not in canonical_ids:
                errors.append(
                    f"[requires] {m['id']}: haengende Referenz auf '{req}' "
                    f"(existiert nicht in {canonical_path})"
                )

    for dep_decl in decl.get("deprecated", []):
        glob_pattern = dep_decl["pathGlob"]
        baseline = set(dep_decl.get("knownOrphansBaseline", []))
        drift_baseline = dep_decl.get("knownDriftBaseline", {})  # {filename: [erwartete unlocks]}
        files = sorted(glob.glob(os.path.join(REPO_ROOT, glob_pattern)))
        for fpath in files:
            fname = os.path.basename(fpath)
            if fname == "README.md":
                continue
            try:
                data = load_yaml(os.path.relpath(fpath, REPO_ROOT))
            except Exception as e:
                warnings.append(f"[{fname}] YAML nicht lesbar: {e}")
                continue
            if not isinstance(data, dict):
                continue
            mid_raw = data.get(dep_decl.get("idField", "module_id"), "")
            canon_guess = mid_raw.replace("LRN:SSF:", "") if mid_raw.startswith("LRN:SSF:") else mid_raw

            matched = by_id.get(canon_guess) or legacy_map.get(mid_raw)

            if not matched:
                if fname in baseline:
                    warnings.append(
                        f"[{fname}] bekannte Baseline-Waise ({mid_raw}) - "
                        f"unveraendert seit Einfuehrung der Pruefung"
                    )
                else:
                    errors.append(
                        f"[{fname}] NEUE verwaiste Datei: module_id '{mid_raw}' "
                        f"loest weder als kanonische ID noch als legacyId in "
                        f"{canonical_path} auf. Entweder registrieren oder als "
                        f"bekannte Ausnahme in registry/source-of-truth.json "
                        f"eintragen (mit Begruendung)."
                    )
                continue

            # Drift-Check: unlocks-Liste vergleichen, falls in beiden vorhanden
            legacy_unlocks = set(data.get("unlocks", []) or [])
            canon_unlocks = set(matched.get("unlocks", []) or [])
            # nur vergleichen, wenn beide nicht leer sind (leer=nicht gepflegt, kein Signal)
            if legacy_unlocks and canon_unlocks and legacy_unlocks != canon_unlocks:
                msg = (
                    f"Drift: unlocks in {fname} "
                    f"({sorted(legacy_unlocks)}) weicht von kanonischem "
                    f"{matched['id']} in {canonical_path} "
                    f"({sorted(canon_unlocks)}) ab."
                )
                expected_baseline_value = set(drift_baseline.get(fname, []))
                if fname in drift_baseline and legacy_unlocks == expected_baseline_value:
                    warnings.append(
                        f"[{fname}] bekannte Baseline-Drift (Wert unveraendert) - {msg} "
                        f"(kanonischer Export gilt gemaess ECO-ARC-0019 §II.5.1)"
                    )
                elif fname in drift_baseline:
                    errors.append(
                        f"[{fname}] NEUE Drift-Aenderung: unlocks weicht jetzt von "
                        f"BEIDEM ab - vom kanonischen Export UND vom als bekannt "
                        f"hinterlegten Baseline-Wert ({sorted(expected_baseline_value)}). "
                        f"{msg}"
                    )
                else:
                    errors.append(f"[{fname}] NEUE {msg}")


def check_kd_references(errors, warnings):
    kd_path = "exports/knowledge-domains-0.1.json"
    if not os.path.exists(os.path.join(REPO_ROOT, kd_path)):
        return
    kd = load_json(kd_path)
    kd_ids = {r["id"] for r in kd["records"]}

    kxf_path = "exports/kxf-learning-modules-0.1.json"
    if os.path.exists(os.path.join(REPO_ROOT, kxf_path)):
        kxf = load_json(kxf_path)
        for m in kxf["records"]["learning_modules"]:
            ref = m.get("knowledgeDomain")
            if ref and ref not in kd_ids:
                errors.append(
                    f"[knowledgeDomain] {m['id']}: referenziert unregistrierte "
                    f"Domaene '{ref}' (nicht in {kd_path})"
                )


def main():
    sot = load_json("registry/source-of-truth.json")
    errors = []
    warnings = []

    for decl in sot["declarations"]:
        if decl["dataType"] == "learning_modules":
            check_learning_modules(decl, errors, warnings)

    check_kd_references(errors, warnings)

    if warnings:
        print(f"--- {len(warnings)} Warnung(en) (nicht blockierend) ---")
        for w in warnings:
            print("  WARN:", w)
        print()

    if errors:
        print(f"--- {len(errors)} Verstoss/Verstoesse (blockierend) ---")
        for e in errors:
            print("  FEHLER:", e)
        print()
        print("Source-of-Truth-Pruefung FEHLGESCHLAGEN (ECO-ARC-0019).")
        sys.exit(1)

    print("Source-of-Truth-Pruefung bestanden (ECO-ARC-0019).")
    sys.exit(0)


if __name__ == "__main__":
    main()
