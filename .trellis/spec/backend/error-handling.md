# Error Handling

> How errors are handled in this project.

---

## Overview

The backend converts validation, not-found, conflict, and infrastructure errors
into JSON responses at the request boundary in
[src/index.ts](/root/kv/src/index.ts:1).

Current baseline:

- Throw typed `HttpError` instances for expected client-facing failures.
- Map errors to JSON in one place through [src/http.ts](/root/kv/src/http.ts:1).
- Keep raw internal exceptions behind a generic `500` response.

---

## Error Types

Current custom error type:

- [src/errors.ts](/root/kv/src/errors.ts:1) defines `HttpError(status, code, message)`

Current error codes in use:

- `UNSUPPORTED_MEDIA_TYPE`
- `INVALID_JSON`
- `INVALID_BODY`
- `INVALID_ID`
- `UNAUTHORIZED`
- `AUTH_NOT_CONFIGURED`
- `NOT_FOUND`
- `RECORD_EXISTS`
- `INTERNAL_ERROR`

---

## Error Handling Patterns

- Validate request body and route params before calling the repository.
- Validate bearer authentication at the request boundary before protected route
  handlers run.
- Let repository and service modules throw `HttpError` for expected failures.
- Catch errors once in the Worker fetch handler, log request context, and then
  convert the failure through `errorResponse()`.
- Do not return mixed success/error unions from repository methods.

---

## API Error Responses

All current API routes return JSON.

Error shape:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Record \"abc\" was not found"
  }
}
```

Rules:

- Keep `error.code` machine-readable.
- Keep `error.message` client-safe.
- Never expose stack traces or provider internals.
- Do not reveal configured token values or auth secrets in any error response.

---

## Common Mistakes

- Returning plain text for one route and JSON for another.
- Throwing bare strings instead of `HttpError` for expected failures.
- Catching repository errors inside service methods when the fetch handler is the
  real response boundary.
