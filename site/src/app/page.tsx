import Link from "next/link";
import { getKit } from "@/lib/content";
import { PageShell, SectionCard } from "@/components/PageShell";

export default function Home() {
  const kit = getKit();
  const { company } = kit;

  const stats = [
    { href: "/icp", label: "ICP Segments", value: kit.icpSegments.length },
    { href: "/battlecards", label: "Battlecards", value: kit.battlecards.length },
    { href: "/objections", label: "Objection Responses", value: kit.objections.length },
    { href: "/market-reports", label: "Market Reports", value: kit.marketReports.length },
    { href: "/images", label: "Image Assets", value: kit.imageAssets.length },
    { href: "/videos", label: "Video Scripts", value: kit.videoScripts.length },
  ];

  return (
    <PageShell
      company={company}
      title={`Welcome to the ${company.name} sales play kit`}
      description={company.tagline}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.href} href={s.href}>
            <SectionCard>
              <p className="text-3xl font-semibold text-white">{s.value}</p>
              <p className="mt-1 text-sm text-neutral-400">{s.label}</p>
            </SectionCard>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <SectionCard>
          <h2 className="text-sm font-semibold text-neutral-200">
            How to use this
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li>
              <strong className="text-neutral-200">Target Audience / ICP</strong>{" "}
              — who to prioritize, their pain points, and where to find them.
            </li>
            <li>
              <strong className="text-neutral-200">Battlecards</strong> — how
              to win specific competitive deals, live in the call.
            </li>
            <li>
              <strong className="text-neutral-200">Objection Handling</strong>{" "}
              — verbatim responses for the objections you&apos;ll actually hear.
            </li>
            <li>
              <strong className="text-neutral-200">Market Reports</strong> —
              context and stats to build credibility in discovery.
            </li>
            <li>
              <strong className="text-neutral-200">Image Assets &amp; Video Scripts</strong>{" "}
              — ready-to-use creative for outbound and social.
            </li>
          </ul>
        </SectionCard>
      </div>
    </PageShell>
  );
}
