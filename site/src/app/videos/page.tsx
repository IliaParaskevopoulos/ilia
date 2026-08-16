import { requireCurrentCompany, logView } from "@/lib/content";
import { PageShell, SectionCard, Tag } from "@/components/PageShell";

export default async function VideosPage() {
  const current = await requireCurrentCompany();
  const { company, videoScripts } = current.kit;
  await logView(current.id, "videos", "/videos");

  return (
    <PageShell
      company={company}
      kit={current.kit}
      title="Video Scripts"
      description="Scripted outlines for sales and demo videos — scene, voiceover, and on-screen text."
    >
      <div className="space-y-6">
        {videoScripts.map((v) => (
          <SectionCard key={v.id}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-white">{v.title}</h2>
              <div className="flex gap-1.5">
                <Tag>{v.targetLength}</Tag>
                <Tag>{v.purpose}</Tag>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-neutral-800">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-950/60 text-xs uppercase tracking-wide text-neutral-500">
                    <th className="px-4 py-2 font-semibold">Scene</th>
                    <th className="px-4 py-2 font-semibold">Voiceover</th>
                    <th className="px-4 py-2 font-semibold">On-screen text</th>
                  </tr>
                </thead>
                <tbody>
                  {v.scenes.map((scene, i) => (
                    <tr
                      key={i}
                      className="border-b border-neutral-900 last:border-0 align-top"
                    >
                      <td className="px-4 py-3 text-neutral-400">
                        {scene.shot}
                      </td>
                      <td className="px-4 py-3 text-neutral-200">
                        {scene.voiceover}
                      </td>
                      <td className="px-4 py-3 text-neutral-500">
                        {scene.onScreenText || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-neutral-400">
              <span className="font-semibold text-neutral-300">CTA:</span>{" "}
              {v.callToAction}
            </p>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}
