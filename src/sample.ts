// Dev utility: renders a hardcoded sample issue with no API calls, so you can
// preview/tweak the template (src/template.ts) without spending API credits.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderIssueHtml } from "./template.js";
import type { CompanyConfig, DraftIssue } from "./types.js";

const company: CompanyConfig = {
  id: "example-co",
  companyName: "Example Co",
  market: "Enterprise Data Infrastructure",
  competitors: ["Vantage Cloud", "Ferrovia Systems"],
  trackedTopics: ["competitors", "regulation", "pricing", "funding_ma", "supply_chain", "key_customers"],
  subscribers: [],
};

const issue: DraftIssue = {
  title: "Vantage Cloud's usage-based repricing is the week's real signal",
  executiveSummary:
    "Vantage Cloud quietly moved its flagship tier to usage-based pricing — a shift that pressures Example Co's per-seat model and gives procurement teams new leverage in renewal conversations this quarter. Two smaller items reinforce the same direction: a proposed EU data-residency rule, and Ferrovia Systems' new logistics-sector hire.",
  sections: [
    {
      topic: "competitors",
      items: [
        {
          lead: "Vantage Cloud shifted its Growth tier to usage-based billing,",
          body: "dropping the seat floor entirely. Early customer commentary is positive; expect renewal conversations to reference this within 60 days.",
          source: "company pricing page, 3 trade outlets",
        },
        {
          lead: "Ferrovia Systems hired a VP of Logistics Partnerships,",
          body: "its first sector-specific exec hire — a signal it's about to push harder into supply-chain accounts, historically Example Co's strongest segment.",
          source: "LinkedIn, press release",
        },
      ],
    },
    {
      topic: "regulation",
      items: [
        {
          lead: "A draft EU data-residency rule",
          body: "would require in-region storage for infrastructure vendors serving public-sector clients — relevant to two active deals in Germany and France. Comment period closes in six weeks.",
          source: "EU Commission filing",
        },
      ],
    },
    {
      topic: "key_customers",
      items: [
        {
          lead: "Two of Vantage Cloud's public reference customers",
          body: "posted job listings for \"data infrastructure migration\" roles this week — often an early tell of a vendor switch in motion.",
          source: "job boards",
        },
      ],
    },
  ],
};

const isoDate = new Date().toISOString().slice(0, 10);
const html = renderIssueHtml(company, issue, isoDate);
const outDir = join(process.cwd(), "drafts", company.id);
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "sample.html");
writeFileSync(outPath, html, "utf-8");
console.log(`Wrote ${outPath}`);
