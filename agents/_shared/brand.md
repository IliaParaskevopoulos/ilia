# Scout — Visual Identity

Applies to every presented Scout output (dashboards, reports, artifacts).
Content structure and sourcing rules stay in
[`conventions.md`](conventions.md) — this file governs presentation only.

## Typeface
**Montserrat**, all weights. One family throughout — no secondary serif
or mono pairing. Use weight (400/500/600/700) and letter-spacing to carry
hierarchy instead of switching typefaces.

## Color
**Byzantine purple — `#702963`** — is the one accent color. Used
sparingly: brand mark, links, key emphasis, active nav state, rating
badges. It does not double as the confidence-tag palette — High/Medium/Low
stay semantic (green/amber/rust) so state and brand never compete for the
same color.

| Token | Light | Dark |
|---|---|---|
| Background | `#FFFFFF` | `#150F17` |
| Surface | `#FAF8FA` | `#1C151E` |
| Ink | `#1B1420` | `#F3EEF4` |
| Ink muted | `#6E6270` | `#B6A9B8` |
| Hairline | `#E7E1E9` | `#332835` |
| Accent | `#702963` | `#C98FC2` (lightened for dark-ground contrast) |
| Confidence: High | `#2F7A5E` | `#63B999` |
| Confidence: Medium | `#9C7A1F` | `#D6AE5B` |
| Confidence: Low | `#A6432E` | `#DE8267` |

## Style: minimalist
- Generous whitespace over dense boxes; hairline dividers instead of
  bordered cards or drop shadows.
- One accent color, used deliberately, not decoratively.
- No gradients, no heavy shadows, no multi-color flourishes.
- Structure (numbering, section markers) only where it encodes something
  real — see `conventions.md`'s output rules.

## Implementation note
Montserrat isn't available via CDN under the artifact CSP — embed it as
a `@font-face` data URI (weights 400/500/700 minimum) rather than linking
to Google Fonts. Source: `fonts.googleapis.com/css2?family=Montserrat`
→ resolve the `fonts.gstatic.com` `.ttf` URLs → base64-embed.
