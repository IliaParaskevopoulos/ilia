import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadCompanyConfigs } from "./companies.js";
import { researchCompany } from "./research.js";
import { draftIssue } from "./draft.js";
import { renderIssueHtml } from "./template.js";

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set. Copy .env.example to .env and fill it in, or set it as a GitHub Actions secret.");
  }

  const companies = loadCompanyConfigs();
  const isoDate = new Date().toISOString().slice(0, 10);

  for (const company of companies) {
    console.log(`\n=== ${company.companyName} (${company.id}) ===`);

    console.log("[1/3] Researching this week's developments...");
    const research = await researchCompany(company);
    const foundTopics = Object.keys(research).filter((k) => (research as Record<string, unknown[]>)[k]?.length);
    console.log(`      found relevant items in: ${foundTopics.join(", ") || "(nothing this week)"}`);

    console.log("[2/3] Drafting the issue in house style...");
    const issue = await draftIssue(company, research);

    console.log("[3/3] Rendering HTML...");
    const html = renderIssueHtml(company, issue, isoDate);

    const outDir = join(process.cwd(), "drafts", company.id);
    mkdirSync(outDir, { recursive: true });
    const outPath = join(outDir, `${isoDate}.html`);
    writeFileSync(outPath, html, "utf-8");
    console.log(`      wrote ${outPath}`);
  }

  console.log("\nDone. Review the draft(s) under drafts/, then open (or merge) the PR to send.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
