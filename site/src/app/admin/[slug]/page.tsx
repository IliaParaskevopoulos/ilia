import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCompanyUsage } from "@/lib/admin";

export default async function AdminCompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await prisma.company.findUnique({ where: { slug } });
  if (!company) notFound();

  const usage = await getCompanyUsage(company.id);
  if (!usage) notFound();

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-100">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin" className="text-xs text-neutral-500 hover:text-neutral-300">
          ← All companies
        </Link>
        <div className="mt-2 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{company.name}</h1>
            <p className="mt-1 text-sm text-neutral-400">
              {company.tier} kit · created {company.createdAt.toISOString().slice(0, 10)}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-neutral-200">
            Usage by asset
          </h2>
          {usage.byItem.length === 0 ? (
            <p className="text-sm text-neutral-500">No activity yet.</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-neutral-800">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/60 text-xs uppercase tracking-wide text-neutral-500">
                    <th className="px-4 py-2 font-semibold">Section</th>
                    <th className="px-4 py-2 font-semibold">Item</th>
                    <th className="px-4 py-2 font-semibold">Kind</th>
                    <th className="px-4 py-2 font-semibold">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {usage.byItem.map((row, i) => (
                    <tr key={i} className="border-b border-neutral-900 last:border-0">
                      <td className="px-4 py-2 text-neutral-300">{row.section}</td>
                      <td className="px-4 py-2 text-neutral-400">
                        {row.itemTitle || row.itemId || "— (page view)"}
                      </td>
                      <td className="px-4 py-2 text-neutral-400">{row.kind}</td>
                      <td className="px-4 py-2 text-neutral-200">{row._count._all}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-neutral-200">
            Recent activity
          </h2>
          {usage.recent.length === 0 ? (
            <p className="text-sm text-neutral-500">Nothing yet.</p>
          ) : (
            <ul className="space-y-1.5 text-sm text-neutral-400">
              {usage.recent.map((e) => (
                <li key={e.id} className="flex justify-between gap-4">
                  <span>
                    {e.kind} · {e.section}
                    {e.itemTitle ? ` — ${e.itemTitle}` : ""}
                  </span>
                  <span className="shrink-0 text-neutral-600">
                    {e.createdAt.toISOString().replace("T", " ").slice(0, 19)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
