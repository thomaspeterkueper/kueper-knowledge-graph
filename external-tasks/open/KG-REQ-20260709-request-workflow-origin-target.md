# External Task: Request Workflow Evolution

Status: open
Requester: KUEPER Project Administration / ChatGPT Repository Coordinator
Requester System: SYS:KUEPER:knowledge-graph
Target repository: kueper-knowledge-graph
Target System: SYS:KUEPER:knowledge-graph
Created: 2026-07-09
Type: schema_request
Priority: medium

## Purpose

Extend the existing request workflow without breaking compatibility.

## Requested additions

Keep all existing fields and semantics.

Add optional governance metadata:
- Origin System
- Origin Agent
- Target System
- Target Agent (optional)
- DependsOn
- Blocks
- FollowUpSystems
- Lifecycle (received/review/accepted/implemented/consumed/closed)

## Design principles

- Backward compatible.
- Existing requests remain valid.
- New metadata improves cross-project administration.
- No change to KG authority over canonical knowledge.

## Expected output

A revised REQUEST-WORKFLOW documenting the additional governance metadata and lifecycle for cross-project communication.