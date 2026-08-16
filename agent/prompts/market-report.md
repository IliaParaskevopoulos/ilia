# Prompt: Generate a Market Report

Use this to generate one `MarketReport` (see `content-types.ts`) either as
part of a full kit run, or standalone once you already have a client's
positioning locked in. Fill in the brackets and paste the whole thing to
Néstōr (with `agent/SYSTEM_PROMPT.md` as its system prompt, or in a
conversation that already has it loaded).

---

I need a market report for the sales play kit. Here's the input:

**Company & product**
- Company: [name]
- Product / category: [one line — what it is]
- Primary ICP segment this report targets: [paste from icpSegments, or describe]

**Report angle**
- Working title or topic: [e.g. "The State of X, 2026" — or leave blank and suggest one]
- Why this report, why now: [what's changed in the market that makes this relevant — a trend, a regulation, a shift in buyer behavior]
- What you want a rep to be able to do with it: [e.g. "open a discovery call with a credible stat," "send as a low-pressure follow-up after a stalled deal," "use in an outbound sequence"]

**Data sources — be specific about what's real**
- [ ] We have real market/industry data to cite: [paste it, or a link/description of the source]
- [ ] We have internal data (usage stats, customer survey results, etc.): [paste it]
- [ ] We don't have hard external data — build this from our own customer conversations and positioning instead. Cite sources as e.g. "Customer discovery interviews, [timeframe]," not an external authority we don't have.

**Constraints**
- Target length: [e.g. "3 sections, 3-5 key stats" — default to that if unsure]
- Tone: [e.g. "credible and a little contrarian" / "neutral and data-forward" — default to matching our existing positioning voice if you have it]
- Anything this report must NOT claim: [e.g. don't imply a specific competitor is named in any external research]

---

**Reminder to Néstōr:** follow the `marketReports` guidance in
`SYSTEM_PROMPT.md` — if real external data wasn't provided above, do not
invent a statistic or cite a research firm/publication that wasn't given
to you. A qualitative report clearly sourced to customer conversations is
more useful, and safer, than a fabricated stat that sounds authoritative.

Output one `MarketReport` object matching the schema in
`content-types.ts`.
