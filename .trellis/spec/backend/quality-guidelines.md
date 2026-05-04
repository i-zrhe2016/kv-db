# Quality Guidelines

> Code quality standards for backend development.

---

## Overview

The backend now has a minimal Worker implementation under
[src/](/root/kv/src/index.ts:1). These rules describe the current project
baseline and should evolve from this code.

---

## Forbidden Patterns

- Mixing HTTP handling, validation, storage access, and serialization in one
  large function.
- Copy-pasting storage key strings or environment binding names across files.
- Silent catch blocks or returning raw `Error` objects from APIs.
- Introducing untyped payloads without a documented runtime shape.
- Adding framework or library choices without updating the corresponding spec
  file.

---

## Required Patterns

- Keep runtime code under `src/`.
- Name modules by responsibility, as in `record-repository.ts` and
  `record-service.ts`.
- Document environment bindings, request/response contracts, and storage
  contracts in `.trellis/spec/` when they are introduced.
- Add at least one targeted verification step for each backend feature.

---

## Testing Requirements

Current verification baseline:

- Run `npm run check` for type validation.
- Run `wrangler dev` and exercise CRUD endpoints manually or via HTTP client.
- Test success cases plus at least one invalid-body and not-found path.
- For deployment UX changes, verify the README deployment instructions still
  match the current Cloudflare workflow.

---

## Code Review Checklist

- Does the change keep concerns separated?
- Are environment bindings and storage contracts documented?
- Is error handling explicit and client-safe?
- Are logs useful without leaking secrets?
- Is there a concrete verification step that exercises the changed path?
