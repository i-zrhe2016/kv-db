import { requireAuth } from "./auth";
import { errorResponse, jsonResponse, readJsonBody } from "./http";
import { RecordService } from "./record-service";
import type { Env } from "./types";

function notFound(): Response {
  return jsonResponse(
    {
      error: {
        code: "NOT_FOUND",
        message: "Route not found"
      }
    },
    404
  );
}

export default {
  async fetch(request, env): Promise<Response> {
    const service = new RecordService(env as Env);
    const typedEnv = env as Env;
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/").filter(Boolean);

    try {
      if (request.method === "GET" && url.pathname === "/health") {
        return jsonResponse({
          ok: true,
          service: "cf-worker-kv-basic-api"
        });
      }

      if (pathSegments[0] !== "records") {
        return notFound();
      }

      requireAuth(request, typedEnv);

      if (request.method === "GET" && pathSegments.length === 1) {
        const records = await service.listRecords();
        return jsonResponse({ data: records });
      }

      if (request.method === "POST" && pathSegments.length === 1) {
        const body = await readJsonBody<unknown>(request);
        const record = await service.createRecord(body);
        return jsonResponse({ data: record }, 201);
      }

      if (pathSegments.length !== 2) {
        return notFound();
      }

      const id = decodeURIComponent(pathSegments[1]);

      if (request.method === "GET") {
        const record = await service.getRecord(id);
        return jsonResponse({ data: record });
      }

      if (request.method === "PUT") {
        const body = await readJsonBody<unknown>(request);
        const record = await service.updateRecord(id, body);
        return jsonResponse({ data: record });
      }

      if (request.method === "DELETE") {
        await service.deleteRecord(id);
        return jsonResponse({ data: { id, deleted: true } });
      }

      return notFound();
    } catch (error) {
      console.error("worker_request_failed", {
        method: request.method,
        path: url.pathname,
        error: error instanceof Error ? error.message : "unknown"
      });
      return errorResponse(error);
    }
  }
} satisfies ExportedHandler<Env>;
