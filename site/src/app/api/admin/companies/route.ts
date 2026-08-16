import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateAccessCode, hashAccessCode } from "@/lib/codes";
import type { SalesPlayKit } from "@/lib/content-types";

const SECTION_KEYS: (keyof SalesPlayKit)[] = [
  "icpSegments",
  "marketReports",
  "battlecards",
  "objections",
  "imageAssets",
  "videoScripts",
  "certifications",
  "brochures",
  "salesDecks",
  "webinarIdeas",
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, tier, contentJson } = body as {
    name?: string;
    tier?: string;
    contentJson?: string;
  };

  if (!name || !tier || (tier !== "teaser" && tier !== "full")) {
    return NextResponse.json(
      { error: "name and tier (teaser|full) are required." },
      { status: 400 }
    );
  }

  let kit: Partial<SalesPlayKit>;
  try {
    kit = contentJson ? JSON.parse(contentJson) : {};
  } catch {
    return NextResponse.json({ error: "Content is not valid JSON." }, { status: 400 });
  }

  // Fill any omitted sections with an empty array rather than requiring
  // the operator to paste boilerplate for content types this client
  // doesn't need.
  for (const key of SECTION_KEYS) {
    if (!Array.isArray(kit[key])) {
      (kit as Record<string, unknown>)[key] = [];
    }
  }

  const slugBase = slugify(name);
  let slug = slugBase;
  let suffix = 1;
  while (await prisma.company.findUnique({ where: { slug } })) {
    slug = `${slugBase}-${++suffix}`;
  }

  kit.company = {
    ...(kit.company as SalesPlayKit["company"] | undefined),
    name,
    slug,
    tier: tier as "teaser" | "full",
    tagline: kit.company?.tagline || "",
    lastUpdated: kit.company?.lastUpdated || new Date().toISOString().slice(0, 10),
    preparedBy: kit.company?.preparedBy || "Product Marketing x Néstōr",
  };

  const accessCode = generateAccessCode();

  const company = await prisma.company.create({
    data: {
      slug,
      name,
      tier,
      accessCodeHash: hashAccessCode(accessCode),
      content: kit as unknown as object,
    },
  });

  return NextResponse.json({
    id: company.id,
    slug: company.slug,
    accessCode,
  });
}
