# Hermes: Visual Identity

Applies to every presented Hermes output (dashboards, reports,
artifacts). Content structure and sourcing rules stay in
[`conventions.md`](conventions.md). Writing style rules are in
[`voice.md`](voice.md). This file governs presentation only.

## Typeface
**Montserrat**, all weights. One family throughout, no secondary serif
or mono pairing. Use weight (400/500/600/700) and letter-spacing to carry
hierarchy instead of switching typefaces.

## Color
**Byzantine purple, `#702963`,** is the one accent color. Used
sparingly: brand mark, links, key emphasis, active nav state, rating
badges. It does not double as the confidence-tag palette. High, Medium,
and Low stay semantic (green, amber, rust) so state and brand never
compete for the same color.

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
- Generous whitespace over dense boxes. Hairline dividers instead of
  bordered cards or drop shadows.
- One accent color, used deliberately, not decoratively.
- No gradients, no heavy shadows, no multi-color flourishes.
- Structure (numbering, section markers) only where it encodes something
  real. See `conventions.md`'s output rules.
- Visualize insights where a chart says something a table cannot:
  proportions, ranges, comparisons. Keep charts in the same restrained
  palette (accent purple plus semantic tags), never a rainbow.

## Implementation note
Montserrat is not available via CDN under the artifact CSP. Embed it as
a `@font-face` data URI (weights 400/500/600/700) instead of linking to
Google Fonts. Source: `fonts.googleapis.com/css2?family=Montserrat`,
resolve the `fonts.gstatic.com` `.ttf` URLs, then base64-embed them.
