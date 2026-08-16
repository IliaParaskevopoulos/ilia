import { requireCurrentCompany, logView } from "@/lib/content";
import { PageShell, SectionCard, Tag } from "@/components/PageShell";
import type { WebinarIdea } from "@/lib/content-types";

const FORMAT_LABEL: Record<WebinarIdea["format"], string> = {
  live: "Live",
  recorded: "Recorded",
  panel: "Panel",
  workshop: "Workshop",
};

const FUNNEL_LABEL: Record<WebinarIdea["funnelStage"], string> = {
  top: "Top of funnel",
  middle: "Mid funnel",
  bottom: "Bottom of funnel",
};

export default async function WebinarsPage() {
  const current = await requireCurrentCompany();
  const { company, webinarIdeas } = current.kit;
  await logView(current.id, "webinars", "/webinars");

  return (
    <PageShell
      company={company}
      kit={current.kit}
      title="Webinar Ideas"
      description="A scannable backlog of content ideas — pick a few per quarter, don't try to run them all."
    >
      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
                <th className="px-3 py-2 font-semibold">Content idea</th>
                <th className="px-3 py-2 font-semibold">Value / hook</th>
                <th className="px-3 py-2 font-semibold">Target audience</th>
                <th className="px-3 py-2 font-semibold">Product marketed</th>
                <th className="px-3 py-2 font-semibold">Format</th>
                <th className="px-3 py-2 font-semibold">Funnel stage</th>
                <th className="px-3 py-2 font-semibold">Suggested CTA</th>
              </tr>
            </thead>
            <tbody>
              {webinarIdeas.map((idea) => (
                <tr
                  key={idea.id}
                  className="border-b border-neutral-900 align-top last:border-0"
                >
                  <td className="px-3 py-3 font-medium text-white">
                    {idea.contentIdea}
                  </td>
                  <td className="px-3 py-3 text-neutral-400">{idea.value}</td>
                  <td className="px-3 py-3 text-neutral-400">
                    {idea.targetAudience}
                  </td>
                  <td className="px-3 py-3 text-neutral-400">
                    {idea.productMarketed}
                  </td>
                  <td className="px-3 py-3">
                    <Tag>{FORMAT_LABEL[idea.format]}</Tag>
                  </td>
                  <td className="px-3 py-3">
                    <Tag>{FUNNEL_LABEL[idea.funnelStage]}</Tag>
                  </td>
                  <td className="px-3 py-3 text-neutral-400">{idea.cta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  );
}
