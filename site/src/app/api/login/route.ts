import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashAccessCode } from "@/lib/codes";
import { signToken } from "@/lib/session";
import { SESSION_COOKIE } from "@/lib/content";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const code = String(form.get("code") || "");
  const next = String(form.get("next") || "/");
  const secret = process.env.AUTH_SECRET;

  if (!secret || !code) {
    return failRedirect(req, next);
  }

  const company = await prisma.company.findUnique({
    where: { accessCodeHash: hashAccessCode(code) },
  });
  if (!company) {
    return failRedirect(req, next);
  }

  const token = await signToken(company.id, secret);
  const res = NextResponse.redirect(new URL(next || "/", req.url), {
    status: 303,
  });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
  });
  return res;
}

function failRedirect(req: NextRequest, next: string) {
  const url = new URL("/login", req.url);
  url.searchParams.set("error", "1");
  url.searchParams.set("next", next);
  return NextResponse.redirect(url, { status: 303 });
}
