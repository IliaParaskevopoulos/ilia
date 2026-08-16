import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import type { CompanyMeta, SalesPlayKit } from "@/lib/content-types";

export function PageShell({
  company,
  kit,
  title,
  description,
  children,
}: {
  company: CompanyMeta;
  kit: SalesPlayKit;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <Sidebar company={company} kit={kit} />
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-4xl px-8 py-10">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {description ? (
              <p className="mt-2 max-w-2xl text-sm text-neutral-400">
                {description}
              </p>
            ) : null}
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}

export function SectionCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6">
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
      {children}
    </span>
  );
}
