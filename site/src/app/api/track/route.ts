import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/session";
import { SESSION_COOKIE } from "@/lib/content";
import { prisma } from "@/lib/db";

// Called from the client when someone opens/downloads a specific asset.
// The company is derived from the session cookie server-side — never
// trust a companyId passed in the request body.
export async function POST(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const companyId = await verifyToken(req.cookies.get(SESSION_COOKIE)?.value, secret || "");
  if (!companyId) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const kind = body?.kind === "download" ? "download" : "view";
  const section = typeof body?.section === "string" ? body.section : "unknown";
  const itemId = typeof body?.itemId === "string" ? body.itemId : undefined;
  const itemTitle = typeof body?.itemTitle === "string" ? body.itemTitle : undefined;
  const path = typeof body?.path === "string" ? body.path : section;

  await prisma.analyticsEvent.create({
    data: { companyId, kind, section, itemId, itemTitle, path },
  });

  return NextResponse.json({ ok: true });
}
