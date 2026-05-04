# Cloudflare Worker KV Basic API

Minimal Cloudflare Worker project with Workers KV-backed CRUD endpoints.

## Endpoints

- `GET /health`
- `GET /records`
- `POST /records`
- `GET /records/:id`
- `PUT /records/:id`
- `DELETE /records/:id`

## Request Shape

Create:

```json
{
  "id": "optional-custom-id",
  "value": {
    "title": "example"
  }
}
```

Update:

```json
{
  "value": {
    "title": "updated"
  }
}
```

## Local Development

1. Install dependencies: `npm install`
2. Generate Worker types if needed: `npm run cf-typegen`
3. Start local dev server: `npm run dev`

Cloudflare currently recommends `wrangler.jsonc` for new projects, and Workers
KV bindings are configured in the Wrangler config file.

## KV Binding Note

The current `wrangler.jsonc` declares `APP_KV` without a fixed namespace ID.
With current Wrangler behavior, local development can create/use local backing
storage automatically, and deploy flows can create or attach resources depending
on how you publish. If you want this Worker bound to a specific existing KV
namespace, add its `id` (and optionally `preview_id`) to `wrangler.jsonc`.

## One-Click Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/i-zrhe2016/kv-db)

This uses Cloudflare's official Deploy to Cloudflare flow. It lets someone clone
this public repository into their own GitHub account, provision the required KV
resource, and deploy the Worker in a few clicks.

Direct link:

```text
https://deploy.workers.cloudflare.com/?url=https://github.com/i-zrhe2016/kv-db
```
