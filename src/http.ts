import { HttpError } from "./errors";

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8"
};

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: jsonHeaders
  });
}

export function errorResponse(error: unknown): Response {
  if (error instanceof HttpError) {
    return jsonResponse(
      {
        error: {
          code: error.code,
          message: error.message
        }
      },
      error.status
    );
  }

  return jsonResponse(
    {
      error: {
        code: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    },
    500
  );
}

export async function readJsonBody<T>(request: Request): Promise<T> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new HttpError(
      415,
      "UNSUPPORTED_MEDIA_TYPE",
      "Request body must be application/json"
    );
  }

  try {
    return (await request.json()) as T;
  } catch {
    throw new HttpError(400, "INVALID_JSON", "Request body is not valid JSON");
  }
}
