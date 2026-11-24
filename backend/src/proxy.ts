import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = [process.env.FRONTEND_URL!];

function setCorsHeaders(res: NextResponse, origin: string) {
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.headers.set("Access-Control-Max-Age", "86400");
  res.headers.append("Vary", "Origin");
  return res;
}

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const isAllowed = allowedOrigins.includes(origin);

  // preflight
  if (request.method === "OPTIONS") {
    const res = new NextResponse(null, { status: 204 });
    return isAllowed ? setCorsHeaders(res, origin) : res;
  }

  const res = NextResponse.next();
  return isAllowed ? setCorsHeaders(res, origin) : res;
}

export const config = {
  matcher: "/api/:path*",
};