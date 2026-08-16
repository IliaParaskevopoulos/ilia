# Néstōr

A productized service: an AI "product marketer" agent that builds a
client's **Sales Play Kit** — target audience research, battlecards,
objection handling, market reports, image assets, video scripts,
certifications, brochures, sales decks, and webinar ideas — then hands it
off as a private site for their sales team, with a unique access code per
client and usage analytics for you.

Two halves:

- **`agent/`** — the agent itself. A system prompt, an intake
  questionnaire, and focused per-artifact prompts that turn a
  conversation with a client into a complete, structured sales enablement
  kit. This is the IP you're selling.
- **`site/`** — one multi-tenant Next.js app + Postgres database. Every
  client lives in the same deployment, each gated behind their own access
  code, with no way to see another client's data. You manage everything
  — creating clients, publishing kits, reading usage — from `/admin`.

## How this works as a business

1. Sell the engagement to a company (or use a **teaser** kit as the sales
   tool itself — see below).
2. Run the agent with that client to produce their kit (`agent/`
   workflow, below) — you can do this right here in a chat with Néstōr.
3. Paste the resulting JSON into `/admin/new` on your deployment. You get
   back a unique access code for that client.
4. Hand the client their URL + code. Their sales team now has a living
   sales enablement hub instead of a stale Google Doc.
5. Watch `/admin` to see which battlecards, brochures, and other assets
   they're actually opening and downloading.
6. Re-run the agent periodically (new competitor, new objection pattern,
   quarterly refresh) and update their kit.

### Using teaser kits to sell the full engagement

`company.tier` on a kit is `"teaser"` or `"full"`. A teaser is a
deliberately partial kit (say, one ICP segment, one battlecard, a couple
of objections) you generate quickly from public information about a
prospect and hand them a private preview link for — a concrete "here's
what we'd build you" instead of a generic pitch. The site shows a small
"this is a preview" banner on teaser kits automatically.

## Running the agent for a new client

Start a conversation (Claude Project, Claude Code, or any Claude session)
using `agent/SYSTEM_PROMPT.md` as the system prompt, then:

1. **Ingest** whatever materials the client already has (website, deck,
   existing battlecards, CRM notes) — see `agent/INTAKE_QUESTIONNAIRE.md`
   section 0 for the checklist.
2. **Interview** the client for the gaps, using
   `agent/INTAKE_QUESTIONNAIRE.md`.
3. **Confirm** the positioning brief the agent produces before it
   generates the full kit — this checkpoint is what keeps you from
   regenerating a wrong kit.
4. **Generate** the kit, either as a whole or artifact-by-artifact using
   the focused prompts in `agent/prompts/` (market reports, battlecards
   — each spells out exactly what input it needs from you beyond the
   base company info). Final output is JSON matching
   `site/src/lib/content-types.ts`.

The agent cannot render final images — it produces creative briefs
instead (the `imageAssets` section). Generate the actual images with an
image model or a designer and host them somewhere reachable (e.g.
Vercel Blob, S3, or `site/public/`) before publishing, then point each
asset's `url` at the real file.

## Publishing a client's kit

```bash
cd site
npm install
```

1. Provision a Postgres database (Neon, Vercel Postgres, Supabase — any
   of them work). Set these in `site/.env` locally and as deployment env
   vars in production (copy `site/.env.example`):
   - `DATABASE_URL` — your Postgres connection string
   - `AUTH_SECRET` — random string signing session cookies (`openssl rand -hex 32`)
   - `ADMIN_PASSWORD` — your own password for `/admin`
2. Run migrations: `npx prisma migrate deploy` (or `migrate dev` locally).
3. Deploy `site/` (e.g. to Vercel).
4. Go to `/admin`, log in with `ADMIN_PASSWORD`, click **New company**,
   paste the kit JSON, pick a tier, and submit. You get back a one-time
   access code — save it, it's hashed in the DB and never shown again.
5. Share the client's URL + code. They log in at `/login`.

### Local development

```bash
cd site
npm install
cp .env.example .env   # fill in DATABASE_URL, AUTH_SECRET, ADMIN_PASSWORD
npx prisma migrate dev
npm run dev
```

Log in at `/admin` to create a company (the demo kit in
`site/src/content/demo.json` — a fictional company, "Northwind
Analytics" — is a ready-made example to paste in), or log in at `/login`
with any company's access code to see their kit.

## Usage analytics

Every page view and every asset open/download is logged
(`AnalyticsEvent` in `prisma/schema.prisma`): which company, which
section, which specific item, view vs. download, when. `/admin`
lists per-company totals; `/admin/<slug>` breaks it down by asset and
shows a recent activity feed. This is what tells you whether a client's
reps are actually using their battlecards — or whether it's time to
follow up.

## Notes on the auth model

Two independent, cookie-based sessions share one deployment:
company sessions (`nestor_session`, scoped to one company's kit only)
and your own admin session (`nestor_admin`). Access codes are hashed
(SHA-256) before storage — the plaintext is shown once, at creation
time, and never stored. See `site/src/lib/session.ts` and
`site/src/proxy.ts`.

## Repo layout

```
agent/
  SYSTEM_PROMPT.md          the agent's persona, workflow, and output contract
  INTAKE_QUESTIONNAIRE.md   structured discovery questions for a new client
  prompts/                  focused prompts per artifact type (market reports, battlecards, ...)
site/
  prisma/schema.prisma      Company + AnalyticsEvent models
  src/lib/content-types.ts  the SalesPlayKit schema (source of truth)
  src/lib/content.ts        session -> company -> kit lookup, view logging
  src/lib/admin.ts          usage queries for /admin
  src/content/demo.json     worked example kit (fictional company)
  src/app/                  client-facing pages (one per content section) + /admin
  src/proxy.ts              company + admin auth gate (Next.js 16 "Proxy")
```
