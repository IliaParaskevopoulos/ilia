import "dotenv/config";
import { readFileSync } from "node:fs";
import { Resend } from "resend";
import { loadCompanyConfigs } from "./companies.js";

async function main() {
  const [, , filePath, companyId] = process.argv;
  if (!filePath || !companyId) {
    throw new Error("Usage: npm run send -- <path-to-draft.html> <company-id>");
  }
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set. Add it as a GitHub Actions secret (or in .env for local testing).");
  }
  if (!process.env.FROM_EMAIL) {
    throw new Error("FROM_EMAIL is not set. Add it to .env or as a GitHub Actions secret.");
  }

  const company = loadCompanyConfigs().find((c) => c.id === companyId);
  if (!company) throw new Error(`No company config found with id "${companyId}"`);
  if (company.subscribers.length === 0) {
    console.log(`No subscribers configured for ${company.id}, nothing to send.`);
    return;
  }

  const html = readFileSync(filePath, "utf-8");
  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log(`Sending ${filePath} to ${company.subscribers.length} subscriber(s) of ${company.companyName}...`);
  const { error } = await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: company.subscribers,
    subject: `${company.companyName} Weekly Intelligence Briefing`,
    html,
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);
  console.log("Sent.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
