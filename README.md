[README.md](https://github.com/user-attachments/files/27146082/README.md)
# rover-navy

Inline case studies for ROVER's website. Hosted on GitHub Pages, embedded into the live Wix site via a single universal embed snippet.

---

## What's in this repo

| File | Purpose |
|---|---|
| `embed.js` | Universal embed loader. Holds the case registry and renders the iframe. Hosted at `https://roverlabmx.github.io/rover-navy/embed.js`. |
| `embed_snippet.html` | The HTML+script snippet to paste into Wix. Reference only — not deployed. |
| `rover_case_study_navy.html` | Case: Navy Training Center (Delivered). |
| `rover_case_study_biocotech.html` | Case: Biocotech Americas (Ongoing). |
| `fonts/` *(to add)* | Licensed `MADE EVOLVE Sans` font files. |

---

## Embedding into the Wix site

### One snippet, any case

Paste this into a Wix **Embed HTML → Custom Code** widget:

```html
<div data-rover-case="navy"></div>
<script src="https://roverlabmx.github.io/rover-navy/embed.js"></script>
```

Per Wix page, change the `data-rover-case` value to select which case loads:

| Slug | Case |
|---|---|
| `navy` | Navy Training Center |
| `biocotech` | Biocotech Americas |

The script reads the attribute, builds the iframe pointing at the right HTML file in this repo, and auto-resizes the iframe to match the case study's content height. The Wix wrapper height should be set to at least 3000px to give the auto-resize room to grow on mobile.

### Adding a new case

1. Add a new HTML file at the repo root (e.g. `rover_case_study_mpos.html`). Use one of the existing cases as a template — only the copy fields change.
2. Open `embed.js` and add an entry to the `CASES` registry:
   ```js
   mpos: {
     file:  'rover_case_study_mpos.html',
     title: 'mPos Global · ROVER case study'
   }
   ```
3. Commit and push. GitHub Pages redeploys in ~30s.
4. In Wix, on whichever page should host the new case, just paste the snippet above and set `data-rover-case="mpos"`. No further Wix work needed.

### Fallback — simple iframe (no script)

If your Wix tier blocks custom `<script>`, use a plain iframe instead:

```html
<iframe src="https://roverlabmx.github.io/rover-navy/rover_case_study_navy.html"
        style="width:100%; border:0; display:block; background:#000; min-height:2600px;"
        loading="lazy"></iframe>
```

Change the `src` URL per Wix page. No auto-resize, so set a generous fixed height (~2600px desktop / ~3600px mobile).

---

## Adding the brand fonts

The pages expect `MADE EVOLVE Sans` for display type. Until the files are uploaded, the pages fall back to Inter (loaded from Google Fonts) — readable but off-brand.

1. Create a `fonts/` directory at the repo root.
2. Drop the licensed `.woff2` and `.woff` files in. Filenames expected (edit the `@font-face` blocks in the case HTML if yours differ):
   - `MADE-Evolve-Sans-Regular.woff2` / `.woff`
   - `MADE-Evolve-Sans-Medium.woff2` / `.woff`
   - `MADE-Evolve-Sans-Bold.woff2` / `.woff`
3. Commit and push. GitHub Pages redeploys automatically.

> **License note:** MADE EVOLVE Sans is a paid font. Make sure your license permits self-hosting via GitHub Pages.

---

## Case study template fields

Each case study uses the same structural fields. Only the copy changes between cases — the structure stays constant. This is what makes the body of work read like one mind across cases (Master Doc Filter 1 — Unified Mind).

```
Tag strip       → Status (Delivered / Ongoing / Concluded) + discipline tags + year
Title + lede    → Client name + a quoted problem-language line
The problem     → Plain-language framing of what came in
The mechanism   → Diagnose → Define → Design → Deploy (always)
What we built   → Flat list of deliverables
The shift       → Before / After (Delivered)  OR  Before / In progress (Ongoing)
Scale or Status →
  • Delivered  → numbers grid (label "Program scale" or "Results")
  • Ongoing    → "Where we are now" prose block + "Next phases"
ROVER principle → Pull-quote summarizing the strategic insight
Scope           → Engagement type + Not included (or Collaborator credit)
Next case       → Link to the next item in the portfolio
```

---

## Auto-resize protocol

Each case study HTML emits its content height to the parent window via `postMessage`:

```js
{ type: 'rover:case-height', height: 2319 }
```

The `embed.js` loader listens for these messages and adjusts the iframe height accordingly. Once you confirm the embedding origin in production, tighten security in `embed.js` by adding an `e.origin === 'https://roverlabmx.github.io'` check.

---

## Future structure

Once there are 4+ case studies, consider migrating to a flatter folder layout:

```
/
├── README.md
├── embed.js
├── embed_snippet.html
├── cases/
│   ├── navy-training-center.html
│   ├── biocotech-americas.html
│   ├── mpos-global.html
│   ├── unruled-foods.html
│   └── muan.html
├── fonts/
└── shared/
    └── case.css       (extracted shared styles)
```

When that happens, update the `BASE` and `file` paths in `embed.js` and the migration is complete — Wix-side embeds don't need to change.
