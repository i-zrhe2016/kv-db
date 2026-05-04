# State Management

> How state is managed in this project.

---

## Overview

No frontend state-management solution is configured yet.

Bootstrap baseline:

- Default to local component state first.
- Promote state only when multiple distant consumers or URL/app lifecycle
  requirements justify it.
- Keep server state and UI state conceptually separate even if the first
  implementation is small.

---

## State Categories

- Local UI state: component-local interactions such as open/closed or input
  drafts.
- Shared client state: values needed across multiple features or pages.
- Server state: remotely loaded data and its loading/error lifecycle.
- URL state: filters or navigation state that must survive refresh/share.

---

## When to Use Global State

Promote state only when at least one of these is true:

- multiple distant consumers need the same live value
- the value must survive route changes
- duplicating fetches or synchronization logic would otherwise become error-prone

---

## Server State

No caching or server-state library has been selected.

When one is introduced:

- document cache ownership and invalidation rules here
- avoid duplicating remote data into several client stores without a reason
- normalize API error/loading handling consistently across screens

---

## Common Mistakes

- Introducing global state for one component tree.
- Mirroring server responses into local state without a synchronization plan.
- Mixing routing state and ephemeral UI state into one shared store.
