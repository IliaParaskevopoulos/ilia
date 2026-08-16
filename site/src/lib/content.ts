import "server-only";
import demo from "@/content/demo.json";
import type { SalesPlayKit } from "@/lib/content-types";

// Each deployment of this site serves exactly one company (single-tenant),
// selected via CONTENT_SLUG. This keeps access control simple: one deploy,
// one password, one company's data — no risk of cross-tenant leakage.
const ACTIVE_SLUG = process.env.CONTENT_SLUG || "demo";

const registry: Record<string, SalesPlayKit> = {
  demo: demo as SalesPlayKit,
};

export function getKit(): SalesPlayKit {
  const kit = registry[ACTIVE_SLUG];
  if (!kit) {
    throw new Error(
      `No content found for CONTENT_SLUG="${ACTIVE_SLUG}". Add content/${ACTIVE_SLUG}.json and register it in src/lib/content.ts.`
    );
  }
  return kit;
}
