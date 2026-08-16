import Link from "next/link";
import { listCompaniesWithStats } from "@/lib/admin";

export default async function AdminPage() {
  const companies = await listCompaniesWithStats();

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-100">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Néstōr Admin</h1>
            <p className="mt-1 text-sm text-neutral-400">
              Companies, access codes, and usage.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/new"
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              + New company
            </Link>
            <form method="POST" action="/api/admin-logout">
              <button
                type="submit"
                className="text-sm text-neutral-500 hover:text-neutral-300"
              >
                Log out
              </button>
            </form>
          </div>
        </div>

        {companies.length === 0 ? (
          <p className="text-sm text-neutral-500">
            No companies yet.{" "}
            <Link href="/admin/new" className="text-indigo-400 hover:underline">
              Create the first one
            </Link>
            .
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-neutral-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/60 text-xs uppercase tracking-wide text-neutral-500">
                  <th className="px-4 py-3 font-semibold">Company</th>
                  <th className="px-4 py-3 font-semibold">Tier</th>
                  <th className="px-4 py-3 font-semibold">Views</th>
                  <th className="px-4 py-3 font-semibold">Downloads</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr key={c.id} className="border-b border-neutral-900 last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/${c.slug}`}
                        className="font-medium text-white hover:underline"
                      >
                        {c.name}
                      </Link>
                      <p className="text-xs text-neutral-500">{c.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-400">{c.tier}</td>
                    <td className="px-4 py-3 text-neutral-400">{c.views}</td>
                    <td className="px-4 py-3 text-neutral-400">{c.downloads}</td>
                    <td className="px-4 py-3 text-neutral-500">
                      {c.createdAt.toISOString().slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
