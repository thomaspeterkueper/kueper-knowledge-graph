# KXF Learning Paths

## Status

Implemented for KG-0002, 2026-07-08

## Purpose

This document defines the consumer-facing KXF shape for SSF learning paths.

The export is:

```text
exports/kxf-learning-paths-0.1.json
```

## Record set

```text
records.learning_paths
```

## Required fields

Each learning path record contains:

```text
id
title
status
sourceModuleId
knowledgeDomains
prerequisites
sourceDocuments
archiveDocuments
unlocks
nextPaths
```

## Notes

Learning paths are ordered or directed routes through modules, prerequisites and document unlocks.

Learning modules remain module records. Learning paths may reference modules, but they are not modules themselves.

## Source of truth

The Knowledge Graph remains the canonical source for learning path IDs, domain IDs, document IDs and prerequisite IDs.
