# External Task: Computational Lab Layer

Status: open
Requester: KUEPER Project Administration / ChatGPT Repository Coordinator
Requester System: SYS:KUEPER:knowledge-graph
Origin Agent: ChatGPT Repository Coordinator
Origin Context: Cross-project administration request from Thomas Peter Kueper, 2026-07-09
Target repository: kueper-knowledge-graph
Target System: SYS:KUEPER:knowledge-graph
Created: 2026-07-09
Type: architecture-consensus-request / system_request
Priority: medium
Blocking: Safe introduction of JupyterLab, marimo, Observable or DuckDB based analysis/prototyping without damaging current KG, SSF, OTA and NOXIA connections.

---

## Purpose

The KUEPER ecosystem is considering a computational lab layer for internal analysis, prototyping, data checks, notebook experiments and learning-module experiments.

This request asks the Knowledge Graph to define whether and how such a layer may exist without violating the current single-source-of-truth boundaries.

The lab layer must not become an alternative Knowledge Graph, an alternative KXF producer, or an unreviewed source of canonical IDs, relations, mappings or exports.

---

## Context

Current ecosystem direction:

- kueper-knowledge-graph owns canonical IDs, entities, relations, mappings, KXF contracts and registry exports.
- SSF consumes KG/KXF for learning modules, learning paths, exercises and progress logic.
- OTA owns or references archive/document bodies and epistemically marked documents.
- NOXIA consumes SSF/KG-derived learning and unlock information for game/application logic.
- kueper.com remains a public-facing publication/presentation layer.

A computational lab layer could be useful for:

- validating KXF exports,
- analyzing KnowledgeDomain coverage,
- testing prerequisite graphs,
- prototyping SSF learning-module transformations,
- simulating NOXIA balancing or unlock logic,
- preparing visualizations or reports.

However, this must be non-invasive and read-oriented by default.

---

## Requested KG Clarification

Please decide or propose:

1. Whether a computational lab layer is allowed as a formal ecosystem component.
2. Whether it should be registered as a system candidate, for example `SYS:KUEPER:lab`.
3. Whether JupyterLab, marimo, Observable Framework and DuckDB should be treated as implementation tools rather than canonical systems.
4. Which KG/KXF exports a lab layer may consume.
5. Whether lab outputs may be referenced by SSF, OTA, NOXIA or kueper.com.
6. Which outputs must never be considered canonical without a later KG decision.
7. Whether the request workflow should formally include explicit sender/origin and target fields for all cross-project requests.

---

## Proposed Principle For Review

The computational lab layer is a consuming analysis and prototyping layer.

It may:

- read KG/KXF exports,
- read project-owned public or internal exports where permitted,
- run consistency checks,
- produce reports, notebooks, mockups, derived visualizations and prototype transformations.

It may not:

- create canonical IDs,
- create canonical relations,
- alter KXF contracts,
- overwrite project ownership boundaries,
- write back into KG, SSF, OTA, NOXIA or kueper.com without a separate accepted request,
- treat notebook outputs as canonical knowledge.

---

## Suggested IDs

These are suggestions only and are not canonical until accepted by KG:

```text
SYS:KUEPER:lab
ARC-LAB-0001
KXF-LAB-CONSUMER-0.1
```

---

## Expected Output

A short KG decision note or architecture document that states:

- accepted responsibility boundary for the computational lab layer,
- whether `SYS:KUEPER:lab` should exist,
- allowed input exports,
- forbidden write-back behavior,
- recommended folder/repository placement for notebooks or lab artifacts,
- whether sender/origin and target fields should become mandatory in KG requests.

---

## Downstream Dependency

No SSF, OTA, NOXIA or kueper.com implementation should be changed for this topic until the KG clarifies the boundary.

SSF and NOXIA production API connections should remain untouched.

---

## Administrative Note

This request is intentionally non-invasive. It asks for a KG decision before any project implementation begins.
