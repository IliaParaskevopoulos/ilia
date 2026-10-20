# Intelligence Layer — PAJ GPS

The context everything else reads from. Role context: this company, this quarter.

## Output rule
**Extremely minimal. Laconic.** Applies to every file and every answer Claude gives.
- Bullets and tables, not prose.
- One line per point. No filler, no preamble, no recap.
- Numbers over adjectives. Mark unverified data `(verify)`.

## Brand rule
Every output carries PAJ GPS branding (source: PAJ affiliate brand guide).
- Orange `#f05123` · black `#111111` · white. Logo on black.
- Font: Inter. A4 landscape. Black header bar, orange rule.
- Shared styles: [`outputs/src/brand.css`](../outputs/src/brand.css).

## Outputs
Rendered PDFs in [`outputs/`](../outputs/). Rebuild: `node outputs/src/render.js`.
| PDF | From |
|---|---|
| `PAJ_icp.pdf` | icp.md · one page per ICP |
| `PAJ_competitors.pdf` | competitors.md · summary, one page per competitor, battle card |
| `PAJ_positioning.pdf` | positioning.md · 4 maps + summary |
| `PAJ_messaging.pdf` | messaging.md · one house per ICP |

## Files
| File | Holds |
|---|---|
| [goals.md](role-context/goals.md) | Quarter targets, off-track triggers |
| [icp.md](role-context/icp.md) | 3 ICPs: pets, seniors, fleet |
| [competitors.md](role-context/competitors.md) | Who, how they position, win/lose |
| [positioning.md](role-context/positioning.md) | Exec summary, 4 perceptual maps, claims + proof |
| [messaging.md](role-context/messaging.md) | Messaging house, per segment |
| [team.md](role-context/team.md) | 3 PMs, patches, KPIs |
| [execs.md](role-context/execs.md) | CEO |
