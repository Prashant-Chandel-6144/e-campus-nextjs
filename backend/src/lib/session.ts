import { auth } from "./auth";

export async function getSession(request: Request) {
  return auth.api.getSession({ headers: request.headers });
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbidden() {
  return Response.json({ error: "Forbidden" }, { status: 403 });
}