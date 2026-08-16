import { requireCurrentCompany, logView } from "@/lib/content";
import { PageShell, SectionCard } from "@/components/PageShell";
import type { Battlecard } from "@/lib/content-types";

function groupByProduct(battlecards: Battlecard[]) {
  const groups = new Map<string, Battlecard[]>();
  for (const bc of battlecards) {
    const key = bc.product || "General";
    groups.set(key, [...(groups.get(key) ?? []), bc]);
  }
  return [...groups.entries()];
}

function List({ title, items, tone }: { title: string; items: string[]; tone?: "positive" | "negative" | "warning" }) {
  if (!items.length) return null;
  const dot =
    tone === "positive"
      ? "bg-emerald-500"
      : tone === "negative"
      ? "bg-red-500"
      : tone === "warning"
      ? "bg-amber-500"
      : "bg-neutral-600";
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {title}
      </p>
      <ul className="mt-2 space-y-1.5 text-sm text-neutral-300">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function BattlecardsPage() {
  const current = await requireCurrentCompany();
  const { company, battlecards } = current.kit;
  await logView(current.id, "battlecards", "/battlecards");

  return (
    <PageShell
      company={company}
      kit={current.kit}
      title="Battlecards"
      description="How to win specific competitive deals — use this live, in the call."
    >
      <div className="space-y-12">
        {groupByProduct(battlecards).map(([product, cards]) => (
          <div key={product}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
              {product}
            </h2>
            <div className="space-y-8">
              {cards.map((bc) => (
                <SectionCard key={bc.id}>
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {company.name} vs.
                    </p>
                    <h3 className="text-xl font-semibold text-white">
                      {bc.competitorName}
                    </h3>
                  </div>

                  <p className="mb-6 rounded-lg border border-indigo-900/50 bg-indigo-950/30 p-4 text-sm text-indigo-200">
                    {bc.positioningStatement}
                  </p>

                  <div className="mb-6 grid gap-6 sm:grid-cols-2">
                    <List title="Their strengths" items={bc.competitor.strengths} tone="warning" />
                    <List title="Their weaknesses" items={bc.competitor.weaknesses} tone="negative" />
                    <List title="When they win" items={bc.competitor.whenTheyWin} tone="warning" />
                    <List title="When we win" items={bc.competitor.whenWeWin} tone="positive" />
                  </div>

                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Pricing notes
                    </p>
                    <p className="mt-2 text-sm text-neutral-300">
                      {bc.competitor.pricingNotes}
                    </p>
                  </div>

                  <div className="mb-6 grid gap-6 sm:grid-cols-2">
                    <List title="Landmine questions to ask" items={bc.competitor.landmines} />
                    <List title="Proof points to use" items={bc.competitor.proofPoints} tone="positive" />
                  </div>

                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Talk track
                    </p>
                    <ol className="mt-2 space-y-1.5 text-sm text-neutral-300">
                      {bc.talkTrack.map((step, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="shrink-0 font-mono text-xs text-neutral-600">
                            {i + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <List title="Do not say" items={bc.doNotSay} tone="negative" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                        Battle-tested quotes
                      </p>
                      <div className="mt-2 space-y-2">
                        {bc.battleTestedQuotes.map((q, i) => (
                          <p key={i} className="text-sm italic text-neutral-400">
                            {q}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
