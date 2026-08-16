import { requireCurrentCompany, logView } from "@/lib/content";
import { PageShell, SectionCard } from "@/components/PageShell";
import { TrackedLink } from "@/components/TrackedLink";

export default async function SalesDecksPage() {
  const current = await requireCurrentCompany();
  const { company, salesDecks } = current.kit;
  await logView(current.id, "sales-decks", "/sales-decks");

  return (
    <PageShell
      company={company}
      kit={current.kit}
      title="Sales Decks"
      description="Ready-to-present decks for each stage of the deal."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {salesDecks.map((deck) => (
          <SectionCard key={deck.id}>
            <h2 className="text-base font-semibold text-white">{deck.title}</h2>
            <p className="mt-1 text-sm text-neutral-400">{deck.description}</p>
            <p className="mt-2 text-xs text-neutral-500">
              {[
                deck.audience,
                deck.slideCount ? `${deck.slideCount} slides` : null,
                deck.lastUpdated ? `updated ${deck.lastUpdated}` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <TrackedLink
              href={deck.fileUrl}
              section="sales-decks"
              itemId={deck.id}
              itemTitle={deck.title}
              kind="download"
              className="mt-3 inline-block rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200 transition hover:bg-neutral-700"
            >
              Download deck
            </TrackedLink>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}
