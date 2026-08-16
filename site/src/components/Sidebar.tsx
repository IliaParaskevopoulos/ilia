"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CompanyMeta } from "@/lib/content-types";

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/icp", label: "Target Audience / ICP" },
  { href: "/battlecards", label: "Battlecards" },
  { href: "/objections", label: "Objection Handling" },
  { href: "/market-reports", label: "Market Reports" },
  { href: "/images", label: "Image Assets" },
  { href: "/videos", label: "Video Scripts" },
];

export function Sidebar({ company }: { company: CompanyMeta }) {
  const pathname = usePathname();

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
          <p className="truncate text-xs text-neutral-500">Sales Plays</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {NAV.map((item) => {
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
        <p className="text-xs text-neutral-500">
          Updated {company.lastUpdated}
        </p>
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
