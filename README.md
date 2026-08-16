# Sales Plays Agent

A productized service: an AI "product marketer" agent that builds a
client's **Sales Play Kit** — target audience research, battlecards,
objection handling, market reports, image asset briefs, and video scripts
— then hands it off as a private, branded site for their sales team.

Two halves:

- **`agent/`** — the agent itself. A system prompt + intake questionnaire
  that turn a conversation with a client into a complete, structured sales
  enablement kit. This is the IP you're selling.
- **`site/`** — a Next.js app that renders a kit as a private,
  password-gated site. One deployment per client (single-tenant, so
  there's never any risk of one client seeing another's data).

## How this works as a business

1. Sell the engagement to a company (product marketing / sales enablement
   as a service, powered by this agent).
2. Run the agent with that client to produce their kit (`agent/` workflow,
   below).
3. Drop the resulting content into a new deployment of `site/`.
4. Hand the client a private URL + access code. Their sales team now has a
   living sales enablement hub instead of a stale Google Doc.
5. Re-run the agent periodically (new competitor, new objection pattern,
   quarterly refresh) and redeploy.

## Running the agent for a new client

1. Start a conversation (Claude Project, Claude Code, or any Claude
   session) using `agent/SYSTEM_PROMPT.md` as the system prompt.
2. Follow the workflow it defines:
   - **Ingest** whatever materials the client already has (website, deck,
     existing battlecards, CRM notes) — see `agent/INTAKE_QUESTIONNAIRE.md`
     section 0 for the checklist.
   - **Interview** the client for the gaps, using
     `agent/INTAKE_QUESTIONNAIRE.md`.
   - **Confirm** the positioning brief the agent produces before it
     generates the full kit — this checkpoint is what keeps you from
     regenerating a wrong kit.
   - **Generate** the full kit. Final output is one JSON object matching
     `site/src/lib/content-types.ts`.
3. Save that JSON to `site/src/content/<client-slug>.json`.
4. The agent cannot render final images — it produces creative briefs
   instead (see the `imageAssets` section of its output). Generate the
   actual images with an image model or a designer, upload them into
   `site/public/<client-slug>/`, and update each asset's `url` field.

## Deploying a client's site

Each client gets their own deployment — this keeps access control trivial
(one password per deployment, zero cross-tenant risk) and lets each
client's branding/domain be fully separate.

```bash
cd site
npm install
```

1. Register the new content file in `src/lib/content.ts`:
   ```ts
   import acme from "@/content/acme.json";
   // ...
   const registry: Record<string, SalesPlayKit> = {
     demo: demo as SalesPlayKit,
     acme: acme as SalesPlayKit,
   };
   ```
2. Deploy (e.g. to Vercel) with environment variables:
   - `CONTENT_SLUG=acme` — selects which content file this deployment serves
   - `ACCESS_CODE=<a shared password you give the client>` — gates the
     entire site behind a login page
3. Share the deployed URL + access code with the client's sales team.

### Local development

```bash
cd site
npm install
ACCESS_CODE=demo npm run dev
```

Visit `http://localhost:3000`, log in with the access code, and you'll see
the seeded demo kit (`site/src/content/demo.json`) for a fictional
company, "Northwind Analytics" — useful both as a working example of the
expected content depth and as a demo you can show prospective clients.

## Notes on the auth model

The site is intentionally single-tenant with a single shared access code
per deployment — simple, and there's no multi-tenant data store to secure.
If a client needs per-user logins, audit logs, or SSO, that's a
straightforward upgrade to `site/src/proxy.ts` (e.g. swap the shared
cookie check for a real auth provider) rather than a redesign.

## Repo layout

```
agent/
  SYSTEM_PROMPT.md          the agent's persona, workflow, and output contract
  INTAKE_QUESTIONNAIRE.md   structured discovery questions for a new client
site/
  src/lib/content-types.ts  the SalesPlayKit schema (source of truth)
  src/lib/content.ts        loads the active client's content by CONTENT_SLUG
  src/content/demo.json     worked example kit (fictional company)
  src/app/                  dashboard + one page per content section
  src/proxy.ts              access-code gate (Next.js 16 "Proxy", formerly middleware)
```
