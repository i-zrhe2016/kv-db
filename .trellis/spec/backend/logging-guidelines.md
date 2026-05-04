# Logging Guidelines

> How logging is done in this project.

---

## Overview

The Worker currently uses the platform logger through `console.error` in
[src/index.ts](/root/kv/src/index.ts:1).

Current baseline:

- Log one structured error event at the request boundary.
- Include request method, path, and safe error context.
- Do not add extra logging inside repository/service methods unless they can add
  unique diagnostic value.

---

## Log Levels

- `debug`: local-only inspection while developing or debugging.
- `info`: deploy/runtime lifecycle events when they become useful.
- `warn`: recoverable or degraded behavior.
- `error`: failed requests and storage operations that need investigation.

Do not invent extra levels unless the chosen logger requires them.

---

## Structured Logging

Current error log shape is object-style:

- event name string
- request method
- request path
- safe error message

Prefer object-style logs over interpolated strings.

---

## What to Log

- Unexpected failures that reach the fetch handler
- Storage access failures
- Configuration/runtime issues that prevent the Worker from serving requests

---

## What NOT to Log

- Secrets and API keys
- Full request bodies by default
- Authorization headers, cookies, or bearer tokens
- Full KV payloads unless a redacted subset is necessary for debugging
