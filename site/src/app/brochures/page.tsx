import { requireCurrentCompany, logView } from "@/lib/content";
import { PageShell, SectionCard } from "@/components/PageShell";
import { TrackedLink } from "@/components/TrackedLink";

export default async function BrochuresPage() {
  const current = await requireCurrentCompany();
  const { company, brochures } = current.kit;
  await logView(current.id, "brochures", "/brochures");

  return (
    <PageShell
      company={company}
      kit={current.kit}
      title="Brochures"
      description="Leave-behind PDFs for after a meeting or as a follow-up attachment."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {brochures.map((b) => (
          <SectionCard key={b.id}>
            <h2 className="text-base font-semibold text-white">{b.title}</h2>
            <p className="mt-1 text-sm text-neutral-400">{b.description}</p>
            <p className="mt-2 text-xs text-neutral-500">Use case: {b.useCase}</p>
            {b.audience ? (
              <p className="mt-1 text-xs text-neutral-500">Audience: {b.audience}</p>
            ) : null}
            <TrackedLink
              href={b.fileUrl}
              section="brochures"
              itemId={b.id}
              itemTitle={b.title}
              kind="download"
              className="mt-3 inline-block rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200 transition hover:bg-neutral-700"
            >
              Download PDF
            </TrackedLink>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}
