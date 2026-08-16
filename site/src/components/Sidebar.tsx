"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CompanyMeta, SalesPlayKit } from "@/lib/content-types";

export function Sidebar({ company, kit }: { company: CompanyMeta; kit: SalesPlayKit }) {
  const pathname = usePathname();

  const nav = [
    { href: "/", label: "Overview", show: true },
    { href: "/icp", label: "Target Audience / ICP", show: kit.icpSegments.length > 0 },
    { href: "/battlecards", label: "Battlecards", show: kit.battlecards.length > 0 },
    { href: "/objections", label: "Objection Handling", show: kit.objections.length > 0 },
    { href: "/market-reports", label: "Market Reports", show: kit.marketReports.length > 0 },
    { href: "/images", label: "Image Assets", show: kit.imageAssets.length > 0 },
    { href: "/videos", label: "Video Scripts", show: kit.videoScripts.length > 0 },
    { href: "/certifications", label: "Certifications", show: kit.certifications.length > 0 },
    { href: "/brochures", label: "Brochures", show: kit.brochures.length > 0 },
    { href: "/sales-decks", label: "Sales Decks", show: kit.salesDecks.length > 0 },
    { href: "/webinars", label: "Webinar Ideas", show: kit.webinarIdeas.length > 0 },
  ].filter((item) => item.show);

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-neutral-800 bg-neutral-950">
      <div className="flex items-center gap-2 px-5 py-5">
        <div
          className="h-7 w-7 shrink-0 rounded-md"
          style={{ background: company.primaryColor || "#6366f1" }}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-100">
            {company.name}
          </p>
          <p className="truncate text-xs text-neutral-500">
            {company.tier === "teaser" ? "Sales Plays — Preview" : "Sales Plays"}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800 px-5 py-4">
        {company.tier === "teaser" ? (
          <p className="mb-3 rounded-lg border border-indigo-900/50 bg-indigo-950/30 px-3 py-2 text-xs text-indigo-200">
            This is a preview kit. Ask about the full engagement to unlock
            everything.
          </p>
        ) : null}
        <p className="text-xs text-neutral-500">Updated {company.lastUpdated}</p>
        <p className="mt-0.5 truncate text-xs text-neutral-600">
          {company.preparedBy}
        </p>
        <form method="POST" action="/api/logout" className="mt-3">
          <button
            type="submit"
            className="text-xs font-medium text-neutral-500 hover:text-neutral-300"
          >
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
