import { HttpError } from "./errors";
import type { Env } from "./types";

function readBearerToken(request: Request): string {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    throw new HttpError(401, "UNAUTHORIZED", "Missing bearer token");
  }

  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer" || !token) {
    throw new HttpError(401, "UNAUTHORIZED", "Invalid bearer token");
  }

  return token;
}

export function requireAuth(request: Request, env: Env): void {
  if (!env.AUTH_TOKEN) {
    throw new HttpError(
      500,
      "AUTH_NOT_CONFIGURED",
      "Authentication is not configured"
    );
  }

  const token = readBearerToken(request);
  if (token !== env.AUTH_TOKEN) {
    throw new HttpError(401, "UNAUTHORIZED", "Invalid bearer token");
  }
}
