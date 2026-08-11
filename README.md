# Market Intelligence Newsletter

A weekly, automated market-intelligence briefing per company. Each company gets a config
file describing what to track; a scheduled job researches the week's developments, drafts
the issue in-house style, opens a PR for review, and sending happens on merge.

## How it works

1. **Every Monday**, GitHub Actions runs `npm run research`, which for each file in
   `config/companies/` searches the web for the last 7 days of relevant news, drafts the
   issue, and writes an HTML file to `drafts/<company-id>/<date>.html`.
2. That run opens a **pull request** with the new draft(s) — this is the review checkpoint.
   Read it like any other PR: open the HTML file's diff, or download it and open in a browser.
3. **Merging the PR sends it.** A second workflow watches for changes landing on `master`
   under `drafts/**` and emails each changed issue to that company's subscriber list via Resend.

No draft is ever sent without a merge. Closing the PR without merging discards that week's issue.

## One-time setup

1. **Anthropic API key** (powers research + drafting): create one at
   [console.anthropic.com](https://console.anthropic.com), add billing. Add it as a repo
   secret named `ANTHROPIC_API_KEY` (Settings → Secrets and variables → Actions).
2. **Resend account** (sends the email, only needed once you're ready to actually send):
   sign up at [resend.com](https://resend.com), verify a sending domain. Add two repo
   secrets: `RESEND_API_KEY` and `FROM_EMAIL` (e.g. `weekly-briefing@yourdomain.com`,
   must be on the verified domain).
3. **Allow Actions to open PRs**: repo Settings → Actions → General → Workflow permissions →
   enable "Allow GitHub Actions to create and approve pull requests". Without this, the
   Monday workflow can generate the draft but can't open the review PR.

## Adding or editing a company

Add a JSON file to `config/companies/`, e.g. `config/companies/acme.json`:

```json
{
  "id": "acme",
  "companyName": "Acme Corp",
  "market": "Industrial Robotics",
  "competitors": ["Rival One", "Rival Two"],
  "trackedTopics": ["competitors", "regulation", "pricing", "funding_ma", "supply_chain", "key_customers"],
  "subscribers": ["someone@acmecorp.com"]
}
```

`id` must be unique and filesystem-safe (used as the folder name under `drafts/`).
`trackedTopics` can be any subset of the six listed above.

## Running locally

```bash
npm install
cp .env.example .env   # fill in ANTHROPIC_API_KEY at minimum
npm run sample          # renders a hardcoded example issue, no API calls — good for
                         # previewing template changes (src/template.ts) for free
npm run research         # real run: researches + drafts every company in config/companies/
npm run send -- drafts/example-co/2026-08-11.html example-co   # sends one draft manually
```

## Project layout

- `config/companies/*.json` — one file per subscribed company
- `src/research.ts` — web-search-powered research step (Claude API)
- `src/draft.ts` — turns research findings into the written issue (Claude API, house style)
- `src/template.ts` — HTML rendering (visual brand: Byzantium purple, Calibri, minimal)
- `src/send.ts` — sends one rendered draft via Resend
- `.github/workflows/generate-draft.yml` — weekly trigger → research → draft → PR
- `.github/workflows/send-on-merge.yml` — merge → send
