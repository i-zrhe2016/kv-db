# Directory Structure

> How backend code is organized in this project.

---

## Overview

The repository currently has no backend application code. The only confirmed
structure is the Trellis workspace and repository-level instructions in
`AGENTS.md`.

This document defines the minimum backend layout that new code must follow until
real modules exist and these rules can be replaced with examples from
production code.

---

## Directory Layout

```
.
├── AGENTS.md
└── .trellis/
    ├── spec/
    ├── tasks/
    └── workspace/
```

---

## Module Organization

No backend module tree exists yet.

When backend code is introduced:

- Place runtime code under a single top-level application directory such as
  `src/` or `worker/`; do not scatter runtime files at repository root.
- Group files by feature or execution boundary, not by generic type-only folders
  when the project is still small.
- Keep request handlers, storage access, and shared utilities in separate files
  once a feature grows beyond a single module.
- Keep deployment/config files such as `wrangler.toml` at repository root.

---

## Naming Conventions

- Use lowercase kebab-case for directories and non-component backend files.
- Prefer descriptive filenames based on responsibility, such as
  `user-repository.ts` or `notes-handler.ts`.
- Avoid generic names like `utils.ts`, `helpers.ts`, or `common.ts` unless the
  scope is genuinely broad and already proven by multiple callers.

---

## Examples

- [src/index.ts](/root/kv/src/index.ts:1) is the request boundary and route
  dispatcher.
- [src/record-service.ts](/root/kv/src/record-service.ts:1) contains input
  validation and application-level record operations.
- [src/record-repository.ts](/root/kv/src/record-repository.ts:1) owns direct KV
  access and key naming.
