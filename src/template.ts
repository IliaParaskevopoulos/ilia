import { TOPIC_LABELS, type CompanyConfig, type DraftIssue } from "./types.js";

function esc(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderIssueHtml(company: CompanyConfig, issue: DraftIssue, isoDate: string): string {
  const sectionsHtml = issue.sections
    .map((section) => {
      const itemsHtml = section.items
        .map(
          (item) => `
        <li>
          <b>${esc(item.lead)}</b> ${esc(item.body)}
          ${item.source ? `<span class="src"> — ${esc(item.source)}</span>` : ""}
        </li>`
        )
        .join("");
      return `
      <div>
        <h4 class="section-h">${esc(TOPIC_LABELS[section.topic] ?? section.topic)}</h4>
        <ul class="brief">${itemsHtml}</ul>
      </div>`;
    })
    .join("\n");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${esc(company.companyName)} — Weekly Intelligence Briefing — ${isoDate}</title>
<style>
  body { margin:0; background:#faf7fa; color:#221a26; font-family: Calibri, Carlito, "Segoe UI", ui-sans-serif, system-ui, sans-serif; }
  .wrap { max-width: 640px; margin: 0 auto; padding: 2rem 1.5rem 3rem; }
  .brand-row { display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #702963; padding-bottom:0.9rem; }
  .brand { font-weight:700; font-size:1.1rem; }
  .brand span { color:#702963; }
  .issue-meta { font-size:0.75rem; color:#5c5162; text-align:right; }
  h3.title { font-size:1.35rem; margin:1.4rem 0 0.2rem; font-weight:700; }
  .summary-panel { background:#f1e4ef; border-left:3px solid #702963; border-radius:6px; padding:1.1rem 1.3rem; font-size:0.94rem; margin-top:0.8rem; }
  .summary-panel b { color:#4e1d46; }
  h4.section-h { font-size:0.82rem; text-transform:uppercase; letter-spacing:0.08em; color:#702963; margin:1.6rem 0 0.7rem; padding-bottom:0.4rem; border-bottom:1px solid #e3dae6; font-weight:700; }
  ul.brief { list-style:none; margin:0; padding:0; }
  ul.brief li { margin-bottom:0.85rem; padding-left:1rem; position:relative; font-size:0.93rem; }
  ul.brief li::before { content:""; width:7px; height:7px; background:#702963; position:absolute; left:0; top:0.5em; border-radius:1px; }
  .src { color:#5c5162; font-size:0.83rem; }
  .footer { border-top:1px solid #e3dae6; margin-top:2rem; padding-top:1rem; font-size:0.72rem; color:#5c5162; }
</style>
</head>
<body>
  <div class="wrap">
    <div class="brand-row">
      <div class="brand">${esc(company.companyName)} <span>Intelligence</span></div>
      <div class="issue-meta">${isoDate}<br>${esc(company.market)}</div>
    </div>
    <h3 class="title">${esc(issue.title)}</h3>
    <div class="summary-panel"><b>The takeaway:</b> ${esc(issue.executiveSummary)}</div>
    ${sectionsHtml}
    <div class="footer">
      For informational purposes only — not investment, legal, or procurement advice.<br>
      You're receiving this because you subscribe to ${esc(company.companyName)} Intelligence. Unsubscribe · Manage preferences
    </div>
  </div>
</body>
</html>`;
}
