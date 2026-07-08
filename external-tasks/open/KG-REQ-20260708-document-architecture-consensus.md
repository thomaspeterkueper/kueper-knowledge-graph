# External Task: Document Architecture Consensus

Status: open
Requester: SolarScienceFoundation / SSF
Target repository: kueper-knowledge-graph
Created: 2026-07-08
Type: architecture-consensus-request

## Purpose

SSF needs a shared document architecture across the KUEPER ecosystem before it builds further document-based learning features.

The goal is not to move document ownership into SSF. SSF should primarily consume canonical documents and transform them into learning modules, learning paths, exercises, and progress records.

## Context

Current ecosystem roles appear to be:

- kueper-knowledge-graph: canonical knowledge entities, relations, taxonomies, identifiers, mappings, and KXF exports.
- kueper.com: likely canonical public document and publication layer.
- overtime-archive.org: in-universe, fictional, archival, or mirrored document layer.
- solarsciencefoundation: learning platform built on documents and KG mappings.
- noxiagame: game/application layer consuming SSF progress and knowledge references.

## Requested KG Clarification

Please confirm or correct the Knowledge Graph responsibility boundaries:

1. What document metadata belongs in the Knowledge Graph?
2. Should the KG store only document references, or also document contents?
3. Which fields should be canonical in KG for documents?
   - document_id
   - title
   - type
   - language
   - status
   - version
   - canonical_url
   - related_entities
   - source_repository
4. How should KG entities reference documents?
5. How should SSF learning modules reference KG entities and source documents?
6. Should KXF exports include document references?

## Proposed Principle For Review

Every information object should have exactly one canonical owner. Other systems reference it or derive project-specific views from it.

For KG, this likely means:

- KG owns concepts, entities, relations, identifiers, and mappings.
- KG references documents.
- KG does not own the full canonical document body unless explicitly decided otherwise.

## Expected Output

A short response document or decision note in this repository that states:

- accepted KG responsibilities
- rejected responsibilities
- required fields for document references in KG/KXF
- open questions for cross-repository consensus

## Downstream Dependency

SSF should wait for this clarification before defining a final document-source schema for learning modules.
