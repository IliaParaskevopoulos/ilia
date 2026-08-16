import { requireCurrentCompany, logView } from "@/lib/content";
import { PageShell, SectionCard, Tag } from "@/components/PageShell";
import { TrackedLink } from "@/components/TrackedLink";

export default async function ImagesPage() {
  const current = await requireCurrentCompany();
  const { company, imageAssets } = current.kit;
  await logView(current.id, "images", "/images");

  return (
    <PageShell
      company={company}
      kit={current.kit}
      title="Image Assets"
      description="Ready-to-use creative for outbound, social, and sales collateral."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {imageAssets.map((asset) => (
          <SectionCard key={asset.id}>
            <TrackedLink
              href={asset.url}
              section="images"
              itemId={asset.id}
              itemTitle={asset.title}
              kind="download"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.url}
                alt={asset.altText}
                className="mb-4 aspect-video w-full rounded-lg border border-neutral-800 object-cover"
              />
            </TrackedLink>
            <h2 className="text-sm font-semibold text-white">{asset.title}</h2>
            <p className="mt-1 text-sm text-neutral-400">{asset.description}</p>
            <p className="mt-2 text-xs text-neutral-500">
              Use case: {asset.useCase}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {asset.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}
