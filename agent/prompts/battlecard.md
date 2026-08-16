# Prompt: Generate a Battlecard

Battlecards are scoped **per product × per competitor** — run this once
for each combination you need (e.g. "Product A vs. CompetitorX",
"Product A vs. CompetitorY", "Product B vs. CompetitorX"). Don't try to
cover multiple competitors or multiple products in one pass; it dilutes
the talk track.

Fill in the brackets and paste the whole thing to Néstōr.

---

I need a battlecard for the sales play kit. Here's the input:

**Scope**
- Company: [name]
- Product / line this card is for: [name — matches `Battlecard.product`]
- Competitor: [name]
- ICP segment this matchup is most relevant to, if not all of them: [optional]

**What you know about the competitor**
- Their pricing (even directionally): [paste what you know]
- What they're genuinely good at — where it would be dishonest to claim we're better: [be honest here, this determines `doNotSay`]
- Where they're weak: [slow implementation? missing feature? bad support? pricing that scales badly?]
- Anything public about them worth knowing (recent funding, layoffs, a product pivot, reviews): [optional]

**How this matchup actually plays out in deals**
- When do we lose to them? Be specific about deal type/buyer: [describe]
- When do we win against them? Also specific: [describe]
- Has a rep ever asked a question live that exposed a real weakness in this competitor? What was it: [this becomes a `landmines` entry — the more specific, the better]
- Is there a claim reps currently make about this competitor that isn't fully accurate and should stop: [important — feeds `doNotSay`]

**Proof**
- Customer results, quotes, or stats that specifically help against this competitor: [paste them — do not ask Néstōr to invent these]

---

**Reminder to Néstōr:** follow the `battlecards` guidance in
`SYSTEM_PROMPT.md`. `landmines` must be genuinely useful live-call
questions, not generic sales tactics. If pricing or product details
above are incomplete, mark the relevant field `NEEDS CLIENT INPUT`
rather than guessing at a competitor's actual behavior.

Output one `Battlecard` object matching the schema in
`content-types.ts`, with `product` set to what was given above.
