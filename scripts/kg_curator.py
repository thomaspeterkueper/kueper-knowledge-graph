#!/usr/bin/env python3
"""Bounded KG Curator v0.1: deterministic structural checks and finding dedup."""
from __future__ import annotations

import argparse
import hashlib
import json
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
STATE_PATH = ROOT / "state" / "kg-curator-findings.json"
OUTBOX = ROOT / ".kueper" / "outbox"

@dataclass(frozen=True)
class Finding:
    kind: str
    owner_target: str
    subject_refs: tuple[str, ...]
    claim_refs: tuple[str, ...]
    condition_key: str
    summary: str
    severity: str
    confidence: float
    evidence: tuple[str, ...]

    @property
    def fingerprint(self) -> str:
        payload = {
            "kind": self.kind,
            "owner_target": self.owner_target,
            "subject_refs": sorted(self.subject_refs),
            "claim_refs": sorted(self.claim_refs),
            "condition_key": " ".join(self.condition_key.split()).lower(),
        }
        raw = json.dumps(payload, sort_keys=True, separators=(",", ":")).encode()
        return hashlib.sha256(raw).hexdigest()


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def check_learning_export(data: dict) -> list[Finding]:
    findings: list[Finding] = []
    records = data.get("records")
    if not isinstance(records, dict) or not isinstance(records.get("learning_modules"), list):
        return [Finding("SCHEMA_DRIFT", "KG", ("exports/kxf-learning-modules-0.1.json",), (), "missing records.learning_modules", "Learning KXF lacks records.learning_modules array.", "high", 1.0, ("records.learning_modules missing or not array",))]

    modules = records["learning_modules"]
    ids = [m.get("id") for m in modules if isinstance(m, dict)]
    known = {i for i in ids if isinstance(i, str)}
    seen: set[str] = set()
    for module_id in ids:
        if not isinstance(module_id, str):
            continue
        if module_id in seen:
            findings.append(Finding("DUPLICATE_ENTITY", "KG", (module_id,), (), f"duplicate learning module id {module_id}", f"Canonical learning module ID {module_id} occurs more than once.", "high", 1.0, (module_id,)))
        seen.add(module_id)

    for module in modules:
        if not isinstance(module, dict) or not isinstance(module.get("id"), str):
            continue
        for ref in module.get("dependencies", {}).get("requires", []) or []:
            if ref not in known:
                findings.append(Finding("BROKEN_REFERENCE", "KG", (module["id"], ref), (), f"learning requires {module['id']} -> {ref}", f"{module['id']} requires unresolved module {ref}.", "high", 1.0, (f"dependencies.requires: {module['id']} -> {ref}",)))
    return findings


def check_entity_registry(data: dict) -> list[Finding]:
    findings: list[Finding] = []
    records = data.get("records")
    if not isinstance(records, list):
        return [Finding("SCHEMA_DRIFT", "KG", ("exports/entity-registry-0.1.json",), (), "entity registry records not array", "Entity registry lacks records array.", "high", 1.0, ("records missing or not array",))]
    seen: set[str] = set()
    for record in records:
        if not isinstance(record, dict):
            continue
        rid = record.get("id")
        if not isinstance(rid, str):
            continue
        if rid in seen:
            findings.append(Finding("DUPLICATE_ENTITY", "KG", (rid,), (), f"duplicate registry id {rid}", f"Entity registry contains duplicate canonical ID {rid}.", "high", 1.0, (rid,)))
        seen.add(rid)
        if record.get("status") == "canonical" and not record.get("source"):
            findings.append(Finding("PROVENANCE_GAP", "KG", (rid,), (), f"canonical registry record without source {rid}", f"Canonical registry record {rid} has no source provenance.", "medium", 1.0, (f"{rid}: status=canonical, source missing",)))
    return findings


def scan(root: Path = ROOT) -> list[Finding]:
    findings: list[Finding] = []
    learning = root / "exports" / "kxf-learning-modules-0.1.json"
    registry = root / "exports" / "entity-registry-0.1.json"
    if learning.exists(): findings.extend(check_learning_export(load_json(learning)))
    if registry.exists(): findings.extend(check_entity_registry(load_json(registry)))
    return sorted(findings, key=lambda f: f.fingerprint)


def load_state(path: Path = STATE_PATH) -> dict:
    if not path.exists(): return {"schema": "KG-CURATOR-STATE-0.1", "findings": {}}
    return load_json(path)


def update_state(findings: Iterable[Finding], now: str, state: dict | None = None) -> dict:
    state = state or {"schema": "KG-CURATOR-STATE-0.1", "findings": {}}
    table = state.setdefault("findings", {})
    active = set()
    for finding in findings:
        fp = finding.fingerprint
        active.add(fp)
        prior = table.get(fp, {})
        table[fp] = {
            "fingerprint": fp,
            "kind": finding.kind,
            "owner_target": finding.owner_target,
            "subject_refs": list(finding.subject_refs),
            "summary": finding.summary,
            "severity": finding.severity,
            "confidence": finding.confidence,
            "evidence": list(finding.evidence),
            "first_seen": prior.get("first_seen", now),
            "last_seen": now,
            "recurrence_count": int(prior.get("recurrence_count", 0)) + 1,
            "status": "active",
            "last_promoted": prior.get("last_promoted"),
        }
    for fp, row in table.items():
        if fp not in active and row.get("status") == "active":
            row["status"] = "resolved"
            row["resolved_at"] = now
    return state


def existing_task_contains(root: Path, fingerprint: str) -> bool:
    task_root = root / "external-tasks"
    if not task_root.exists(): return False
    for status in ("open", "done", "rejected"):
        folder = task_root / status
        if not folder.exists(): continue
        for path in folder.glob("*.md"):
            if fingerprint in path.read_text(encoding="utf-8", errors="ignore"):
                return True
    return False


def promotable(finding: Finding) -> bool:
    return finding.kind in {"BROKEN_REFERENCE", "SCHEMA_DRIFT", "PROVENANCE_GAP"} and finding.confidence >= 0.95


def envelope(finding: Finding) -> dict:
    return {
        "target": finding.owner_target,
        "title": f"KG Curator: {finding.kind}",
        "reason": finding.summary,
        "requested_change": "Reproduce the finding from canonical KG inputs and apply the minimal owner-repository correction without inventing canon.",
        "expected_result": "The structural/provenance inconsistency is resolved and the canonical validation surface passes.",
        "priority": "high" if finding.severity == "high" else "medium",
        "cost_policy": "immediate" if finding.kind in {"BROKEN_REFERENCE", "SCHEMA_DRIFT"} else "normal",
        "estimated_effort": "low",
        "depth": 1,
        "affects": [finding.owner_target],
        "finding_fingerprint": finding.fingerprint,
        "evidence": list(finding.evidence),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    parser.add_argument("--emit", action="store_true")
    parser.add_argument("--now")
    args = parser.parse_args()
    now = args.now or datetime.now(timezone.utc).isoformat()
    findings = scan(ROOT)
    state = update_state(findings, now, load_state())
    print(f"KG Curator findings: {len(findings)}")
    for finding in findings:
        print(f"{finding.kind} {finding.fingerprint[:12]} {finding.summary}")
    if args.write:
        STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
        STATE_PATH.write_text(json.dumps(state, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    if args.emit:
        OUTBOX.mkdir(parents=True, exist_ok=True)
        for finding in findings:
            if not promotable(finding) or existing_task_contains(ROOT, finding.fingerprint):
                continue
            path = OUTBOX / f"kg-curator-{finding.fingerprint[:16]}.json"
            if not path.exists():
                path.write_text(json.dumps(envelope(finding), indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return 1 if any(f.severity == "high" for f in findings) else 0

if __name__ == "__main__":
    raise SystemExit(main())
