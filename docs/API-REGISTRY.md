# API Registry

## Status

Draft productive, 2026-07-08

## Purpose

The API Registry lists public read APIs exposed by the KUEPER Knowledge Graph and connects each route to schema version, consumers, source exports and cache policy.

The registry export is:

```text
exports/api-registry-0.1.json
```

## Current scope

The first registered API family is:

```text
/api/ota/*
```

## Record type

Each API route record has:

```text
id
type
system
path
method
schema
status
visibility
consumerContract
description
sourceExports
consumers
cache
```

Optional fields:

```text
pathParameters
queryParameters
```

## Rule

Public consumer-facing API routes should be registered here. Internal implementation files and unstable private endpoints should not be marked as `consumerContract: true`.

## Relationship to KXF

KXF exports remain the canonical data artifacts. API routes are stable read interfaces over selected KG data.

Consumers may use either:

```text
exports/*.json
```

or:

```text
/api/*
```

but public API routes must be indexed in `exports/api-registry-0.1.json`.
