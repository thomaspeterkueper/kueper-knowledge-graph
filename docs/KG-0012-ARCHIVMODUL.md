# KG-0012 - Archivmodul Linking

Origin: SSF
Date: 2026-07-03
Status: Implemented

## Purpose

`archivmodul` is a SSF learning module type that leads a learner toward reading a specific source document.

Although `OTA-ARC-0005-2026-DE` uses OTA-specific wording, the Knowledge Graph linking pattern is source-agnostic.

## Canonical pattern

```text
PATH:<system>:<doc-id>:READ
  --TARGETS-->
DOC:<system>:<doc-id>
```

Examples:

```text
PATH:OTA:OTA-SCI-0083-2026-DE:READ
  --TARGETS-->
DOC:OTA:OTA-SCI-0083-2026-DE
```

```text
PATH:KUE:KUE-PHI-0001-2026-DE:READ
  --TARGETS-->
DOC:KUE:KUE-PHI-0001-2026-DE
```

## Module type vocabulary

The module type vocabulary is exported in:

```text
exports/learning-module-types-0.1.json
```

It includes:

```text
grundmodul
brueckenmodul
archivmodul
reference
learning_path
experiment
```

## Relation registry update

`exports/relation-registry-0.1.json` now includes the Archivmodul linking pattern and the complete prerequisite relations for the currently registered OTA documents.

## Curatorial note

Whether the wording in `OTA-ARC-0005-2026-DE` should be generalized is a separate standards-document decision. KG-0012 only confirms the Knowledge Graph mechanism.
