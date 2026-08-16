import { getKit } from "@/lib/content";
import { PageShell, SectionCard, Tag } from "@/components/PageShell";

const CATEGORY_LABEL: Record<string, string> = {
  price: "Price",
  product: "Product",
  competitor: "Competitor",
  timing: "Timing",
  trust: "Trust",
  "internal-champion": "Internal Champion",
  other: "Other",
};

export default function ObjectionsPage() {
  const { company, objections } = getKit();

  return (
    <PageShell
      company={company}
      title="Objection Handling"
      description="Verbatim responses for the objections you'll actually hear, with the concern underneath each one."
    >
      <div className="space-y-5">
        {objections.map((obj) => (
          <SectionCard key={obj.id}>
            <div className="mb-3 flex items-center gap-2">
              <Tag>{CATEGORY_LABEL[obj.category] || obj.category}</Tag>
            </div>

            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              What they say
            </p>
            <p className="mb-4 text-base font-medium text-white">
              &ldquo;{obj.objection}&rdquo;
            </p>

            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              What they actually mean
            </p>
            <p className="mb-4 text-sm text-neutral-400">
              {obj.underlyingConcern}
            </p>

            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              How to respond
            </p>
            <p className="mb-4 rounded-lg border border-emerald-900/50 bg-emerald-950/20 p-4 text-sm text-emerald-200">
              {obj.response}
            </p>

            {obj.followUpQuestions.length ? (
              <div className="mb-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Follow-up questions
                </p>
                <ul className="space-y-1 text-sm text-neutral-300">
                  {obj.followUpQuestions.map((q, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-neutral-600">–</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {obj.supportingProof.length ? (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Supporting proof
                </p>
                <ul className="space-y-1 text-sm text-neutral-400">
                  {obj.supportingProof.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-neutral-600">–</span>
                      <span>{p}</span>
                    </li>
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
