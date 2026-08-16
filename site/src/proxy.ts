import { NextRequest, NextResponse } from "next/server";

// Each deployment belongs to exactly one company and is gated by a single
// shared access code (ACCESS_CODE env var). This is intentionally simple:
// one deploy = one client = one password. No cross-tenant data ever exists
// in a given deployment, so this is not multi-tenant access control — it's
// a door lock on a private site.
const PUBLIC_PREFIXES = ["/login", "/api/login", "/favicon.ico"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_PREFIXES.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  const accessCode = process.env.ACCESS_CODE;

  if (!accessCode && process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const session = req.cookies.get("sp_session")?.value;
  if (accessCode && session === accessCode) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
