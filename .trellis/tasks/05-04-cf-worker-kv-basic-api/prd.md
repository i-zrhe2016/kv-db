# Cloudflare Worker KV Basic API

## Goal

Create a minimal Cloudflare Worker project that uses Workers KV as its storage
layer and exposes basic database-style CRUD endpoints over HTTP.

## Requirements

- Build the backend as a Cloudflare Worker written in TypeScript
- Configure a Workers KV binding for persistence
- Expose basic CRUD routes for records
- Keep HTTP handling, storage access, and payload validation separated
- Return JSON responses for both success and error cases
- Document the storage contract and backend conventions in `.trellis/spec/`

## Acceptance Criteria

- [ ] Repository contains a runnable Worker project structure
- [ ] `wrangler.jsonc` defines a KV binding for the Worker
- [ ] API supports create, list, read, update, and delete operations
- [ ] Record payloads are validated at the request boundary
- [ ] Errors are returned as stable JSON responses
- [ ] Backend spec documents are updated to reflect the real implementation

## Technical Notes

- Use `wrangler.jsonc`, which Cloudflare currently recommends for new projects
- Use a single KV binding named `APP_KV`
- Store records under a namespaced key prefix instead of raw IDs
- Keep the implementation dependency-light unless tooling is required for local
  development and verification
