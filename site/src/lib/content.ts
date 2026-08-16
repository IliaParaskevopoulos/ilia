import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/session";
import type { SalesPlayKit } from "@/lib/content-types";

export const SESSION_COOKIE = "nestor_session";

export interface CurrentCompany {
  id: string;
  slug: string;
  name: string;
  tier: string;
  kit: SalesPlayKit;
}

// Reads the signed session cookie, verifies it, and loads that company's
// kit from the DB. Returns null if there's no valid session or the
// company no longer exists — callers should redirect to /login.
export async function getCurrentCompany(): Promise<CurrentCompany | null> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");

  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const companyId = await verifyToken(token, secret);
  if (!companyId) return null;

  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) return null;

  return {
    id: company.id,
    slug: company.slug,
    name: company.name,
    tier: company.tier,
    kit: company.content as unknown as SalesPlayKit,
  };
}

// Convenience for pages: get the session or bounce to /login. Keeps the
// "no valid session" fallback in one place instead of repeated per page.
export async function requireCurrentCompany(): Promise<CurrentCompany> {
  const current = await getCurrentCompany();
  if (!current) redirect("/login");
  return current;
}

// Fire-and-forget style call from server components: log that a section
// (or a specific item within it) was viewed.
export async function logView(
  companyId: string,
  section: string,
  path: string,
  item?: { id: string; title: string }
) {
  await prisma.analyticsEvent.create({
    data: {
      companyId,
      kind: "view",
      section,
      itemId: item?.id,
      itemTitle: item?.title,
      path,
    },
  });
}
