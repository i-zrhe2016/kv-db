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
2. Create `.dev.vars`:

```text
AUTH_TOKEN=your-token
```

3. Generate Worker types if needed: `npm run cf-typegen`
4. Start local dev server: `npm run dev`

Cloudflare currently recommends `wrangler.jsonc` for new projects, and Workers
KV bindings are configured in the Wrangler config file.

## KV Binding Note

The current `wrangler.jsonc` declares `APP_KV` without a fixed namespace ID.
With current Wrangler behavior, local development can create/use local backing
storage automatically, and deploy flows can create or attach resources depending
on how you publish. If you want this Worker bound to a specific existing KV
namespace, add its `id` (and optionally `preview_id`) to `wrangler.jsonc`.

## Authentication

All `/records` routes require:

```text
Authorization: Bearer <AUTH_TOKEN>
```

`GET /health` remains public.

Set the Worker secret with Wrangler:

```bash
cd /root/kv
export CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
export CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
echo 'your-token' | npx wrangler secret put AUTH_TOKEN
```

For local development with `wrangler dev`, put the same value in `.dev.vars`.

Example request:

```bash
curl https://your-worker.workers.dev/records \
  -H 'authorization: Bearer your-token'
```

## KV Consistency Note

Cloudflare Workers KV is eventually consistent for reads. A write can succeed
and an immediate follow-up read may briefly return `NOT_FOUND` before the new
value becomes visible everywhere.

In practice:

- trust the successful `POST` or `PUT` response as the latest value
- if an immediate `GET` misses, retry after a short delay
- use a stronger-consistency store such as D1 or Durable Objects if your use
  case requires immediate read-after-write guarantees

## One-Click Deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/i-zrhe2016/kv-db)

This uses Cloudflare's official Deploy to Cloudflare flow. It lets someone clone
this public repository into their own GitHub account, provision the required KV
resource, and deploy the Worker in a few clicks.

Direct link:

```text
https://deploy.workers.cloudflare.com/?url=https://github.com/i-zrhe2016/kv-db
```
