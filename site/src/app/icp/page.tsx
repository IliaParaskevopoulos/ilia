import { requireCurrentCompany, logView } from "@/lib/content";
import { PageShell, SectionCard, Tag } from "@/components/PageShell";

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {title}
      </p>
      <ul className="mt-2 space-y-1 text-sm text-neutral-300">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-neutral-600">–</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ICPPage() {
  const current = await requireCurrentCompany();
  const { company, icpSegments } = current.kit;
  await logView(current.id, "icp", "/icp");

  return (
    <PageShell
      company={company}
      kit={current.kit}
      title="Target Audience / ICP Research"
      description="Who to prioritize, why they buy, and how to recognize them early in a deal."
    >
      <div className="space-y-6">
        {icpSegments.map((seg) => (
          <SectionCard key={seg.id}>
            <div className="mb-1 flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-white">{seg.name}</h2>
              <Tag>{seg.buyerRole}</Tag>
            </div>
            <p className="mb-5 text-sm text-neutral-400">{seg.description}</p>

            <div className="grid gap-6 sm:grid-cols-2">
              <List title="Firmographics" items={seg.firmographics} />
              <List title="Pain Points" items={seg.painPoints} />
              <List title="Goals" items={seg.goals} />
              <List title="Trigger Events" items={seg.triggerEvents} />
              <List title="Where to Find Them" items={seg.whereToFindThem} />
              <List title="Disqualifiers" items={seg.disqualifiers} />
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}
