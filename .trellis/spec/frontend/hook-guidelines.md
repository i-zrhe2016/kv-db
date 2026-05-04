# Hook Guidelines

> How hooks are used in this project.

---

## Overview

There are no frontend hooks in the repository yet.

Bootstrap baseline:

- Add a custom hook only when stateful behavior or side-effect coordination is
  reused or meaningfully isolated by extraction.
- Keep hooks narrow and feature-focused.
- Do not create wrapper hooks around one built-in hook unless they add domain
  value.

---

## Custom Hook Patterns

- Name hooks with a `use` prefix.
- Keep side effects inside hooks or components that own them; avoid leaking
  mutable module-level state.
- Return a stable, readable shape that callers can consume without guessing.

---

## Data Fetching

No frontend data-fetching library is configured.

When data fetching is introduced:

- Document the chosen library or native pattern here immediately.
- Keep fetch orchestration out of presentational components when it grows beyond
  a trivial one-off.
- Centralize response parsing and error normalization where possible.

---

## Naming Conventions

- Use `useX` naming consistently.
- Prefer names tied to behavior, such as `useNotes`, `useSession`, or
  `useAutoSave`.
- Avoid vague names like `useData` or `useThing`.

---

## Common Mistakes

- Extracting a hook too early with only one caller and no clarity benefit.
- Hiding network, storage, and UI concerns together inside one hook.
- Returning ambiguous tuples or overloaded shapes without documentation.
