# Market Sizing Brief: AI-powered inventory forecasting for retail — United States

*Produced by running `prompt.md` end-to-end with live web search, 2026-08-09.
Kept as a worked example so the prompt's behavior can be checked against a
real case, including where it hits a real data gap.*

## Summary
TAM: $27M–$420M (bottom-up) / ~$90M (top-down, modeled) — **midpoint ~$120M**
SAM: ~$75M
SOM: ~$1.5M

Wide range driven by one unresolved gap (buyer count, see below) — treat
this as a first-pass estimate, not a final number.

## Top-down estimate
- AI Demand Forecasting Software (global): **$0.9B in 2026**, growing at
  9.6% CAGR to $2.2B by 2036. [Future Market Insights](https://www.futuremarketinsights.com/reports/ai-demand-forecasting-software-market)
- Inventory Forecasting Software (global, broader category): $2.1B (2024)
  → $6.8B by 2033, 16.2% CAGR. [Future Market Insights](https://www.futuremarketinsights.com/reports/inventory-management-software-market)
- Retail/e-commerce vertical growing faster than the demand-planning
  software average (14.24% CAGR to 2030 vs. ~11.5% overall).
  [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/demand-planning-solutions-market)
- **Filter applied (assumption, not sourced):** global → US ≈ 40% share;
  all-verticals → retail vertical ≈ 25% share. $0.9B × 0.40 × 0.25 ≈ **$90M**.
- Confidence: **Low-Medium** — base figures are from vendor-run market
  research firms (not a top-tier analyst like Gartner/IDC), and the
  US/retail split is my own filter, not a sourced breakout.

## Bottom-up estimate
- **Buyer count — GAP.** Web search could not resolve "US retail firms
  with 50-500 employees" to an exact figure. Census County Business
  Patterns has the right breakdown (20-49, 50-99, 100-249, 250-499
  employee bands) but requires pulling the dataset directly, not just
  searching. [Census CBP](https://www.census.gov/programs-surveys/cbp/data/datasets.html)
  Per the agent's own rule, this is flagged rather than guessed — using a
  rough order-of-magnitude placeholder instead: 15,000–35,000 firms.
- **Price:** $1,800–$12,000/year (mid-market tier).
  [ERP Software Blog](https://erpsoftwareblog.com/2026/07/inventory-management-software-cost/),
  [Inflow Inventory](https://www.inflowinventory.com/blog/inventory-management-software-cost/)
- Calculation: 15,000–35,000 buyers × $1,800–$12,000/year = **$27M–$420M**

### Assumptions log
| Assumption | Value | Source | Confidence |
|---|---|---|---|
| Global AI demand forecasting market, 2026 | $0.9B | Future Market Insights | Medium |
| US share of global market | 40% | Not sourced — standard software-market rule of thumb | Low |
| Retail vertical share of category | 25% | Not sourced — estimated | Low |
| US mid-size retail firm count (50-500 employees) | 15,000–35,000 | Not sourced — placeholder pending Census CBP pull | **Low (gap)** |
| Annual price, mid-market tier | $1,800–$12,000 | ERP Software Blog, Inflow Inventory | Medium |
| SAM reachability filter (digitally-capable buyers) | 70% of TAM | Not sourced — estimated | Low |
| SOM capture rate | 2% of SAM | Rule of thumb for early-stage vertical SaaS, years 1-3 | Low |

## Triangulation
Top-down ($90M) sits inside the bottom-up range ($27M–$420M), so the two
methods don't contradict each other — but the bottom-up range is too wide
to be useful on its own, and that width traces to exactly one input: the
buyer count. **Next action, not a general "more research":** pull Census
CBP NAICS 44-45 data filtered to the 50-499 employee bands to replace that
placeholder — everything else in this brief is already reasonably sourced.

## Confidence rating
Overall: **Low-Medium** — directionally the market is real and roughly
$100M-ish in the US, but every number here should be treated as a
first-pass estimate until the buyer-count gap is closed.

## Sources
1. [AI Demand Forecasting Software Market — Future Market Insights](https://www.futuremarketinsights.com/reports/ai-demand-forecasting-software-market)
2. [Inventory Management Software Market — Future Market Insights](https://www.futuremarketinsights.com/reports/inventory-management-software-market)
3. [Demand Planning Solutions Market — Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/demand-planning-solutions-market)
4. [County Business Patterns — U.S. Census Bureau](https://www.census.gov/programs-surveys/cbp/data/datasets.html)
5. [Inventory Management Software Cost — ERP Software Blog](https://erpsoftwareblog.com/2026/07/inventory-management-software-cost/)
6. [Inventory Management Software Cost — Inflow Inventory](https://www.inflowinventory.com/blog/inventory-management-software-cost/)
