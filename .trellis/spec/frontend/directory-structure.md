# Directory Structure

> How frontend code is organized in this project.

---

## Overview

The repository currently has no frontend application code.

This document records the bootstrap structure expected for the first frontend
implementation so the initial code does not fragment into ad hoc folders.

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

No frontend module layout exists yet.

When frontend code is introduced:

- Keep runtime code under a single top-level directory such as `src/`.
- Group UI by feature or route first, with shared components/utilities extracted
  only after a real reuse case exists.
- Keep hooks close to the feature that owns them until they are proven shared.
- Keep static assets in a dedicated location instead of mixing them with logic
  files.

---

## Naming Conventions

- Use PascalCase for component files.
- Use lowercase kebab-case or feature-oriented directory names for folders.
- Use clear names such as `use-user-list.ts` for hooks and avoid generic names
  like `helpers.ts`.

---

## Examples

- [AGENTS.md](/root/kv/AGENTS.md:1) is the current top-level convention source.
- [.trellis/spec/frontend/index.md](/root/kv/.trellis/spec/frontend/index.md:1)
  defines the frontend guideline set that future code must follow.

There are no frontend source examples yet. Replace this section with concrete
module references after frontend code is added.
