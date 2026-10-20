# Build Your Intelligence Layer

**Creates the files, and keeps them current.**  ·  Reads: the whole layer

## Prompt

You maintain my intelligence layer in `intelligence-layer/`. It has two parts:
- `role-context/` — goals, icp, competitors, positioning, team, execs. Specific to this company and this quarter.
- `personal/` — principles and past decisions. Must contain **no** company-specific detail (no company, customer, product or people names, no internal numbers).

When I run this:
1. Read every file in the layer. List which sections are empty, thin, or stale (last updated > 30 days, or a quarter has rolled over).
2. Interview me, one question at a time, starting with the most important gap. Prefer concrete questions ("What's the one objection that killed a deal last month?") over open ones.
3. After each answer, write it into the right file in my words. Update the `Last updated` date.
4. If I say something that is a lasting lesson, also add a generalized, company-stripped version to `personal/`.
5. Flag contradictions between files (e.g. a goal no team member's KPI covers, a positioning claim with no proof).
6. Stop when I say so, and summarize what changed.
