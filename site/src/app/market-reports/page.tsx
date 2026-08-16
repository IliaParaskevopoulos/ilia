import { getKit } from "@/lib/content";
import { PageShell, SectionCard } from "@/components/PageShell";

export default function MarketReportsPage() {
  const { company, marketReports } = getKit();

  return (
    <PageShell
      company={company}
      title="Market Reports"
      description="Context and stats to build credibility in discovery and share as low-pressure follow-up content."
    >
      <div className="space-y-8">
        {marketReports.map((report) => (
          <SectionCard key={report.id}>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {report.publishedDate}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">
              {report.title}
            </h2>
            <p className="mt-2 text-sm text-neutral-400">{report.summary}</p>

            {report.keyStats.length ? (
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {report.keyStats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4"
                  >
                    <p className="text-lg font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {stat.label}
                    </p>
                    {stat.source ? (
                      <p className="mt-2 text-[11px] text-neutral-600">
                        {stat.source}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-6 space-y-5">
              {report.sections.map((s, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-neutral-200">
                    {s.heading}
                  </h3>
                  <div className="mt-1.5 whitespace-pre-line text-sm text-neutral-400">
                    {s.body}
                  </div>
                </div>
              ))}
            </div>

            {report.sources.length ? (
              <div className="mt-6 border-t border-neutral-800 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Sources
                </p>
                <ul className="mt-2 space-y-1 text-xs text-neutral-500">
                  {report.sources.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}
