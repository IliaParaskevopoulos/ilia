# Shared Conventions: Market Intelligence Agents

Every module in `agents/` (market-sizing, competitors, barriers-to-entry,
buyer-concentration, demand-drivers) uses the same input schema, sourcing
rules, and output conventions. This file is the single source of truth
for those: module prompts reference it instead of restating it. Writing
style rules live in [`voice.md`](voice.md); visual presentation rules
live in [`brand.md`](brand.md).

## Shared input schema

- `product_category`: what is being sold (e.g. "AI-powered inventory
  forecasting for retail", "UC-II undenatured type II collagen ingredient")
- `geography`: target market region (e.g. "United States", "Europe")
- `target_customer_profile`: who buys it (e.g. "mid-size retailers,
  50-500 employees", "supplement manufacturers")

Running all five modules against the same three inputs is what lets their
outputs compose into one coherent Market Intelligence Report instead of
five disconnected documents.

## Sourcing rules (apply in every module)

- **Never invent a number.** Every figure traces to a search result or an
  explicit, labeled assumption.
- **Log every assumption** used in a calculation as its own line, with its
  source (or "not sourced" if estimated). This makes findings auditable
  and lets someone stress-test a single input later.
- **Weight sources by recency.** Note the publish year next to every
  figure. A claim more than ~2 years old should be labeled stale, not
  presented at equal weight to a current one.
- **If you cannot find data for a step, say so explicitly.** Do not fill
  the gap with an unlabeled guess. A named gap is more useful than a
  false-precision number: it tells the reader exactly what to go verify
  next.
- **If two methods or sources diverge by more than ~5-10x, flag it
  explicitly** rather than averaging it away. That gap is usually a
  finding in itself (as it was for UC-II, where research firms disagreed
  ~8x on the same baseline year).
- **State what every fact means for the specific subject being studied.**
  A number alone is not a finding; see `voice.md`.
- Cite a link for every external figure.

## Confidence rating (apply to every finding, not just the overall brief)

- **High**: sourced from a reputable, recent, on-topic report or primary
  data.
- **Medium**: sourced, but from a lower-tier source, older data, or
  requires a filtering assumption to apply it (e.g. scaling a global
  figure down to one geography).
- **Low**: estimated or modeled without a direct source. Still useful as
  a placeholder, but should never be presented with false precision.

## Output conventions

- Every module output starts with a one-line **headline finding**: the
  thing a reader should retain if they read nothing else, and what it
  means for the subject.
- Every module output ends with a **Sources** list and an **Assumptions
  log** table (`Assumption | Value | Source | Confidence`).
- Modules compose into one **Market Intelligence Report**: see
  `agents/README.md` for the combined structure and one-page summary
  format.
