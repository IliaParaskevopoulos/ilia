import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/session";

// Two independent auth domains share this deployment:
//   - company sessions (nestor_session): one per client, scoped to their
//     own kit only.
//   - the operator admin area (nestor_admin): you, creating companies and
//     reading cross-client usage analytics.
// This only checks signature validity (edge-safe, no DB round trip) —
// pages still re-verify against the DB before trusting a session.

const PUBLIC_PREFIXES = [
  "/login",
  "/api/login",
  "/api/logout",
  "/admin/login",
  "/api/admin-login",
  "/api/admin-logout",
  "/favicon.ico",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_PREFIXES.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV !== "production") return NextResponse.next();
    return new NextResponse("Server misconfigured: AUTH_SECRET is not set.", {
      status: 500,
    });
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin/")) {
    const payload = await verifyToken(req.cookies.get("nestor_admin")?.value, secret);
    if (payload === "admin") return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const companyId = await verifyToken(req.cookies.get("nestor_session")?.value, secret);
  if (companyId) return NextResponse.next();

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
