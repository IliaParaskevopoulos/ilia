import { requireCurrentCompany, logView } from "@/lib/content";
import { PageShell, SectionCard, Tag } from "@/components/PageShell";
import { TrackedLink } from "@/components/TrackedLink";

const TYPE_LABEL: Record<string, string> = {
  quality: "Quality",
  legal: "Legal",
  compliance: "Compliance",
  "supply-chain": "Supply Chain",
  other: "Other",
};

export default async function CertificationsPage() {
  const current = await requireCurrentCompany();
  const { company, certifications } = current.kit;
  await logView(current.id, "certifications", "/certifications");

  return (
    <PageShell
      company={company}
      kit={current.kit}
      title="Certifications & Compliance"
      description="Quality documentation, legal statements, and supply chain records — for when procurement or security asks."
    >
      <div className="space-y-4">
        {certifications.map((cert) => (
          <SectionCard key={cert.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Tag>{TYPE_LABEL[cert.type] || cert.type}</Tag>
                  {cert.issuedBy ? (
                    <span className="text-xs text-neutral-500">{cert.issuedBy}</span>
                  ) : null}
                </div>
                <h2 className="text-base font-semibold text-white">{cert.title}</h2>
                <p className="mt-1 max-w-xl text-sm text-neutral-400">
                  {cert.description}
                </p>
                {cert.issuedDate || cert.expiryDate ? (
                  <p className="mt-2 text-xs text-neutral-500">
                    {cert.issuedDate ? `Issued ${cert.issuedDate}` : ""}
                    {cert.issuedDate && cert.expiryDate ? " · " : ""}
                    {cert.expiryDate ? `Expires ${cert.expiryDate}` : ""}
                  </p>
                ) : null}
              </div>
              <TrackedLink
                href={cert.fileUrl}
                section="certifications"
                itemId={cert.id}
                itemTitle={cert.title}
                kind="download"
                className="shrink-0 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200 transition hover:bg-neutral-700"
              >
                Download
              </TrackedLink>
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}
