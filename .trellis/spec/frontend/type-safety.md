# Type Safety

> Type safety patterns in this project.

---

## Overview

There is no TypeScript or runtime validation setup in the repository yet.

Bootstrap baseline:

- Prefer TypeScript for new frontend code.
- Keep types close to the feature that owns them until a real shared boundary
  appears.
- Treat runtime validation as a separate concern from compile-time typing.

---

## Type Organization

- Co-locate feature-local types with the feature.
- Extract shared API or domain types only when multiple modules consume them.
- Avoid a single global `types.ts` dumping ground.

---

## Validation

No validation library is configured.

When external data enters the frontend:

- validate it at the boundary if the data shape is important to rendering or
  behavior
- document the chosen validation library here once adopted
- keep validation schemas and inferred types aligned

---

## Common Patterns

- Prefer inference when it keeps code clear.
- Add explicit exported types at public component or hook boundaries.
- Use small type guards or parsing helpers when runtime checks are needed.

---

## Forbidden Patterns

- Unexplained `any`
- Broad type assertions used to silence errors
- Shared types that are copied manually between modules
- Accepting unvalidated external payloads as trusted application state
