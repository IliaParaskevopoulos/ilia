# Hermes: Market Intelligence Agent

Five modules that share one input schema and compose into a single Market
Intelligence Report. Shared rules (sourcing, assumptions logging,
confidence rating) live in [`_shared/conventions.md`](_shared/conventions.md).
Writing style rules live in [`_shared/voice.md`](_shared/voice.md). Visual
presentation rules live in [`_shared/brand.md`](_shared/brand.md). Read
those first, then run each module against the same three inputs
(`product_category`, `geography`, `target_customer_profile`).

| Module | Answers | Prompt |
|---|---|---|
| Market Sizing | How big is this, and how confident should I be in that number? | [`market-sizing/prompt.md`](market-sizing/prompt.md) |
| Competitors & Substitutes | Who else wins this sale, including the substitute the customer picks instead of any of us? | [`competitors/prompt.md`](competitors/prompt.md) |
| Barriers to Entry | What protects incumbents, and what would a new entrant have to clear? | [`barriers-to-entry/prompt.md`](barriers-to-entry/prompt.md) |
| Buyer Concentration | Is demand a few large accounts or a long tail of small ones? | [`buyer-concentration/prompt.md`](buyer-concentration/prompt.md) |
| Demand Drivers | Why is this growing now, and is that durable or a fad? | [`demand-drivers/prompt.md`](demand-drivers/prompt.md) |

Run order isn't strict, but sizing first is usually most useful. Later
modules (buyer concentration, demand drivers) can cross-check their
findings against it.

## Composite report

Run all five and assemble into one document, in this shape:

```markdown
# Market Intelligence Report: [product_category], [geography]

## One-page summary
| Module | Headline finding | Confidence |
|---|---|---|
| Market Sizing | TAM $X-$Y (mid $Z) | High/Medium/Low |
| Competitors & Substitutes | [top threat in one line] | |
| Barriers to Entry | [overall rating + why in one line] | |
| Buyer Concentration | Concentrated/Fragmented/Unknown | |
| Demand Drivers | [net assessment in one line] | |

## [Full module output: Market Sizing]
## [Full module output: Competitors & Substitutes]
## [Full module output: Barriers to Entry]
## [Full module output: Buyer Concentration]
## [Full module output: Demand Drivers]
```

The one-page summary is what a decision-maker actually reads. The full
module outputs behind it are what makes each summary line defensible
under a follow-up question. Confidence is shown at the summary level too,
so a reader can tell at a glance which numbers are solid and which are
placeholders, without opening every module.

For anything beyond two modules, present the composite report as a
dashboard (e.g. an HTML artifact) rather than one long markdown file.
Five modules of tables and assumption logs are easy to skim visually and
hard to skim as scrolling text. Add a chart wherever a picture would show
a proportion, range, or comparison faster than a table row would.
