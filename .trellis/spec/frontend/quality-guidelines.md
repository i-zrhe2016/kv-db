# Quality Guidelines

> Code quality standards for frontend development.

---

## Overview

The repository has no frontend runtime code yet, so this document defines the
minimum quality bar for the first implementation.

These rules are meant to prevent the initial UI code from becoming the de facto
legacy standard.

---

## Forbidden Patterns

- Large multi-purpose components with many behavior flags
- Untyped component props or hook returns
- Direct DOM workarounds when declarative state can solve the problem cleanly
- Accessibility regressions justified as "temporary" with no follow-up plan
- Introducing multiple UI/state libraries at once without documenting why

---

## Required Patterns

- Keep components and hooks focused on one concern.
- Type component and hook interfaces explicitly.
- Preserve semantic HTML and keyboard accessibility.
- Document any new frontend library choice in the relevant spec file when it is
  introduced.

---

## Testing Requirements

No frontend test setup exists yet.

When the first frontend feature is added:

- add at least one runnable verification path
- test meaningful user behavior, not only implementation details
- cover at least one failure or empty-state path for data-driven UI

---

## Code Review Checklist

- Is the component/hook boundary clear?
- Are props and state typed?
- Does the UI preserve accessible semantics?
- Is state kept at the right level?
- Does the change introduce a new dependency or pattern that should also update
  spec documentation?
