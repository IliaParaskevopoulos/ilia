# PAJ GPS site for Lovable

React + TypeScript + Tailwind, the same stack Lovable uses. Tested: builds clean and works on desktop and mobile.

| File | What |
|---|---|
| `src/data/paj.ts` | All content (ICPs, competitors, scores, maps, houses). Edit text here. |
| `src/components/PerceptualMap.tsx` | Positioning chart (SVG, hover shows scores) |
| `src/pages/Index.tsx` | The full one-page site |
| `public/pdfs/*.pdf` | The 5 PDFs, linked from the Downloads section |

## Option A: GitHub sync (recommended, exact copy)
1. In Lovable, create a new project. Prompt: `Blank page.`
2. Open **GitHub → Connect**. Lovable creates a repo for the project.
3. On GitHub, upload this folder's `src/data`, `src/components/PerceptualMap.tsx`, `src/pages/Index.tsx` and `public/pdfs` into the same paths. Overwrite `Index.tsx`.
4. Lovable syncs automatically. Done.

Or: add that new repo to this Claude session and I'll push the files for you.

## Option B: Paste into Lovable chat
Paste the messages in [`PROMPT.md`](PROMPT.md) one at a time.
Then upload the 5 PDFs (Lovable chat → attach) and say: `Put these in public/pdfs/`.

## Option C: PDFs only
Prompt Lovable: `A PAJ GPS branded page (orange #f05123, black, Inter) with 5 download cards`, then attach the PDFs.
