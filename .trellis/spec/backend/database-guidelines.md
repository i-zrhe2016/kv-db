# Database Guidelines

> Database patterns and conventions for this project.

---

## Overview

The repository currently uses Cloudflare Workers KV as its storage layer via the
`APP_KV` binding configured in [wrangler.jsonc](/root/kv/wrangler.jsonc:1).

Current storage contract:

- Binding name: `APP_KV`
- Key prefix: `record:`
- Stored payload: JSON-serialized `RecordData`
- Access layer: [src/record-repository.ts](/root/kv/src/record-repository.ts:1)

---

## Query Patterns

- Use a repository module for direct KV access.
- Centralize key creation through a helper such as `recordKey()` instead of
  repeating string concatenation.
- Read and write JSON payloads through one module so handlers never manipulate
  raw KV strings.
- For list operations, use `KVNamespace.list({ prefix })` and then hydrate each
  stored record by key.
- Treat immediate read-after-write as eventually consistent when using Workers
  KV; callers should not assume a just-written key is instantly readable
  everywhere.

---

## Migrations

There is no migration system because Workers KV is schemaless.

If the stored record shape changes:

- version the payload contract explicitly
- keep old/new read compatibility in one repository layer when needed
- avoid spreading compatibility shims across handlers

---

## Naming Conventions

- Keep environment binding names uppercase with underscores. Current binding:
  `APP_KV`.
- Keep key prefixes lowercase and colon-delimited. Current prefix: `record:`.
- Store record IDs separately from the prefix so routes and services work with
  plain IDs while the repository owns full key composition.
- Avoid raw key literals outside the repository layer.

---

## Common Mistakes

- Writing KV reads and writes directly in `src/index.ts`.
- Duplicating the `record:` prefix across multiple modules.
- Changing the stored payload shape without updating this document and the
  repository contract together.
- Assuming Workers KV provides strict immediate read-after-write consistency.
