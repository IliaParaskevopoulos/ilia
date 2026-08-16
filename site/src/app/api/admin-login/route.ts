import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/session";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") || "");
  const secret = process.env.AUTH_SECRET;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!secret || !adminPassword || password !== adminPassword) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, { status: 303 });
  }

  const token = await signToken("admin", secret);
  const res = NextResponse.redirect(new URL("/admin", req.url), { status: 303 });
  res.cookies.set("nestor_admin", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
