#!/usr/bin/env python3
"""Validate uniqueness and basic consistency of external-task IDs."""
from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TASK_ROOT = ROOT / "external-tasks"
STATUSES = ("open", "done", "rejected")
ID_RE = re.compile(r"^\s*(?:id:\s*|(?:-\s*)?\*\*ID:\*\*\s*|ID:\s*)(`?)([^`\s]+)\1\s*$", re.IGNORECASE | re.MULTILINE)
FILENAME_ID_RE = re.compile(r"^(.+?)\.md$")


def declared_id(path: Path) -> str | None:
    text = path.read_text(encoding="utf-8", errors="replace")
    match = ID_RE.search(text)
    return match.group(2).strip() if match else None


def main() -> int:
    rows: list[tuple[Path, str | None]] = []
    for status in STATUSES:
        folder = TASK_ROOT / status
        if not folder.exists():
            continue
        for path in sorted(folder.glob("*.md")):
            if path.name == ".gitkeep":
                continue
            rows.append((path, declared_id(path)))

    by_id: dict[str, list[Path]] = defaultdict(list)
    missing: list[Path] = []
    for path, task_id in rows:
        if task_id:
            by_id[task_id].append(path)
        else:
            missing.append(path)

    duplicate_ids = {task_id: paths for task_id, paths in by_id.items() if len(paths) > 1}

    # Also catch filename-level collisions where a request family/date/sequence prefix
    # was reused with different descriptive suffixes, e.g. ...-002-foo and ...-002-bar.
    prefix_re = re.compile(r"^((?:[A-Z]+-)+REQ-\d{8}-\d{3})(?:-|\.md)", re.IGNORECASE)
    by_prefix: dict[str, list[Path]] = defaultdict(list)
    for path, _ in rows:
        match = prefix_re.match(path.name)
        if match:
            by_prefix[match.group(1).upper()].append(path)
    duplicate_prefixes = {prefix: paths for prefix, paths in by_prefix.items() if len(paths) > 1}

    problems = 0
    if duplicate_ids:
        problems += len(duplicate_ids)
        print("Duplicate declared external-task IDs:")
        for task_id, paths in sorted(duplicate_ids.items()):
            print(f"  {task_id}")
            for path in paths:
                print(f"    - {path.relative_to(ROOT)}")

    if duplicate_prefixes:
        problems += len(duplicate_prefixes)
        print("Duplicate request sequence prefixes:")
        for prefix, paths in sorted(duplicate_prefixes.items()):
            print(f"  {prefix}")
            for path in paths:
                print(f"    - {path.relative_to(ROOT)}")

    if missing:
        print("External tasks without a parseable declared ID (warning):")
        for path in missing:
            print(f"  - {path.relative_to(ROOT)}")

    if problems:
        print(f"external-task ID validation failed: {problems} collision group(s)")
        return 1

    print(f"external-task ID validation passed: {len(rows)} task file(s), {len(by_id)} declared ID(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
