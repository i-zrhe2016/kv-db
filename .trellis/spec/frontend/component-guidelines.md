# Component Guidelines

> How components are built in this project.

---

## Overview

There are no frontend components in the repository yet.

Bootstrap baseline:

- Start with small function components named for one responsibility.
- Keep props explicit and typed.
- Prefer composition over flag-heavy "do everything" components.
- Build accessible semantics in from the first component instead of retrofitting
  later.

---

## Component Structure

Recommended starting structure for the first real components:

- imports
- exported props type/interface
- component function
- small private helpers only when they improve readability

Avoid mixing unrelated components into one file unless they are tiny and tightly
coupled.

---

## Props Conventions

- Type props explicitly; do not leave component inputs implicit.
- Prefer a narrow props surface over many boolean toggles.
- Use descriptive callback names such as `onSubmit` or `onSelect`.
- Keep presentational components stateless unless local interaction requires
  state.

---

## Styling Patterns

No styling system exists yet.

When one is chosen:

- Document it here and use it consistently.
- Avoid mixing multiple styling systems in the first implementation without a
  deliberate reason.
- Keep styling decisions local to the component/feature unless a shared design
  token is truly cross-cutting.

---

## Accessibility

- Use semantic HTML before ARIA workarounds.
- Ensure interactive controls have visible labels or accessible names.
- Keep keyboard interaction and focus behavior intact.

---

## Common Mistakes

- Building one component that encodes several screens or states through many
  flags.
- Leaving props untyped because the project is still small.
- Using non-semantic clickable `div` elements instead of real controls.
