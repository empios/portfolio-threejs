# The Engineer's Codex

Portfolio of Paweł Włodarczyk, implemented in React + TypeScript and set in the
[Pangolin](https://github.com/empios/Pangolin) design system.

Built from the Claude Design source `Engineers Codex.dc.html`.

```bash
npm install
npm run dev
```

| Script      | Does                                        |
| ----------- | ------------------------------------------- |
| `dev`       | Vite dev server on :5173                    |
| `build`     | `tsc --noEmit` then a production build       |
| `preview`   | Serve `dist/`                               |
| `typecheck` | Types only                                  |

The build emits a relative `base`, so `dist/` serves from any shelf — GitHub
Pages included.

## Publishing

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.
Two things must be done once, by hand:

1. **Create the remote and push.** The repository is initialised locally with
   `main` as its branch, but has no remote:

```bash
git remote add origin git@github.com:empios/personal-portfolio.git && git push -u origin main
```

2. **Turn Pages on.** In the repository's *Settings → Pages*, set **Source** to
   **GitHub Actions**. Without this the workflow builds and then fails at the
   deploy step.

If the folio ends up anywhere other than
`https://empios.github.io/personal-portfolio/`, change the four absolute URLs
in the `<head>` of `index.html` — `og:image` in particular must be absolute or
no platform will render the card.

The sharing card is authored as `scripts/og.svg` and committed as
`public/og.png`, because no platform renders an SVG in an `og:image`.
Regenerate it after editing:

```bash
npm run og
```

## The CV is the same document

There is no second source for a résumé. `src/styles/print.css` reflows the
folio into two sheets of A4: the header, the orrery, the search drawer and the
diagrams fall away; the sections reorder so contact details sit under the name;
and the whole register of service prints, most recent first — the screen can
show one chapter at a time, paper cannot. It prints in whichever language is on
screen. Ctrl/Cmd-P to see it.

## How Pangolin is used

Pangolin is a static HTML/CSS study, not a published package, so its two
foundation files are **vendored pristine** under `src/styles/pangolin/` and
imported ahead of everything else:

```bash
curl -o src/styles/pangolin/tokens.css https://raw.githubusercontent.com/empios/Pangolin/master/pangolin/tokens.css
curl -o src/styles/pangolin/base.css   https://raw.githubusercontent.com/empios/Pangolin/master/pangolin/base.css
```

They are never edited — re-running the above re-syncs them. `base.css` also
brings Ubuntu Sans and Ubuntu Sans Mono, so `index.html` loads only the display
serif the folio itself introduces.

`components.css` is deliberately **not** used. Its components are product-UI
shapes (filled badges, boxed fields, sans buttons); the codex speaks a different
idiom — outlined chips, ruled writing lines, mono small-caps. So `folio.css`
defines the codex's own components, built entirely from `--pg-*` tokens and
following Pangolin's `block__element--modifier` naming so it reads as a sibling
layer rather than a fork.

The design's palette turned out to be Pangolin's almost exactly:
`#FAF7F4` → `--pg-warm-10`, `#77216F` → `--pg-aubergine-50`, `#E95420` →
`--pg-orange-50`, `#2C001E` → `--pg-aubergine-80`. What the folio genuinely adds
— plate whites, dotted leaders, brass drawer fittings, sealing wax — is declared
once as `--fo-*` tokens at the top of `folio.css`.

## Two languages

The folio is set in Polish and English. There is no i18n dependency — the
seam is a type:

```ts
type Localized<T> = Readonly<Record<Locale, T>>;
```

Anything translatable is declared as `Localized<T>`, which puts both languages
adjacent in the source and makes a missing translation a **type error** rather
than a runtime fallback. What should *not* be translated stays a plain
value — tool names, URLs, figure ids, the engineer's own name — so the model
says out loud which is which:

```ts
title: { en: 'The Translation Engine', pl: 'Maszyna translatorska' },
stack: ['Python', 'FastAPI', 'CTranslate2'],
```

Components read through one hook, `const t = useT()`, then `t(plate.title)`.
Interface copy lives in `content/ui.ts`; content proper stays in its own module.

**Polish takes three plural forms** where English takes two, so counts go
through `pluralize()` — *1 zapis odnaleziony*, *2 zapisy odnalezione*,
*5 zapisów odnalezionych*, including the 12–14 exception. Sentences with
numbers in them are templates with `{placeholders}`, never concatenation, so
word order and punctuation stay inside the translation — Polish gets its own
quotation marks (`„…”`) that way.

The choice persists to `localStorage`, falls back to the browser's languages,
and drives `<html lang>` and the tab title.

### Retrieval across both

Archive tags are **shared between languages** rather than translated, so one
record is reachable from either — a Polish reader searching *wykształcenie* and
an English one searching *education* land on the same card. Only the prose is
scored in the language on screen.

Folding strips diacritics so `gdansk` finds `Gdańsk`. Note `ł`: unlike `ą` or
`ś` it has no canonical decomposition, so NFD leaves it whole and a naive
tokenizer splits `wykształcenie` in half — it is mapped to `l` explicitly
before normalising.

Matching is stem-based rather than prefix-based, because the two languages
inflect differently. English appends (`deploy` → `deployment`), so a prefix
test carries it. Polish *changes the ending* — `wdrożenie` / `wdrożenia` /
`wdrożeniu` — where neither form is a prefix of the other, and a prefix test
returns nothing at all. Two words therefore also match when they share a stem
of at least four letters and part ways only in the last two. The slack stops
at two deliberately: `kontrakt` and `kontrola` share five letters, which is
not enough to confuse them.

## Layout

```
src/
  content/     plates · career · archive · instruments · site · ui  (typed data)
  i18n/        locale (Localized, pluralize, format) · LocaleProvider
  lib/         searchArchive · roman · usePrefersReducedMotion     (pure)
  three/       ink · stage · useInkStage · heroInstrument · courseOrrery
  components/  one file per section, plus common.tsx and figures.tsx
  styles/      pangolin/{tokens,base}.css + folio.css
```

**Content is data.** Every repeated collection — six plates, six chapters,
nineteen archive records, twenty-one instruments — is a typed array. One-off
prose stays inline in its section, where JSX reads better than indirection.

**Style is CSS.** The source carries roughly eight hundred inline style
declarations. They collapse into `folio.css`, mostly via three moves: `.fo-mono`
carries the caption hand and takes its size and tracking from two custom
properties; `.fo-fig` styles every diagram's ink, weight and labels, so the SVGs
stay pure geometry; `.fo-leader` serves both the register of service and the
specimen catalogue.

**Both instruments share one bench.** `useInkStage` owns everything that is the
same either time — renderer, fitting, visibility gating, the frame loop,
reduced-motion, teardown — and a builder only describes its mechanism.
`heroInstrument.ts` and `courseOrrery.ts` are plain scene-graph code with no
React in them.

**three.js is never in the critical path.** It is reached only through the
dynamic `load` on `useInkStage`, so text and plates paint immediately and the
renderer arrives after: 231 kB initial, against 759 kB if bundled in.

## Deliberate departures from the source

- **three.js from npm, code-split**, replacing the CDN `<script>` and the
  `pollThree` retry loop. `THREE.Clock` is deprecated in r185, so the stage keeps
  time with `performance.now()`.
- **The drop cap uses `::first-letter`.** The source floats an
  `aria-hidden` span holding the `T`, which made screen readers announce
  "his folio records…".
- **Small caps come from `text-transform`,** so content stays in prose case and
  the stylesheet decides how it is engraved.
- **`#C7431A`** (a hand-picked hover shade) uses `--pg-orange-60` instead — the
  same colour to the eye, and on-system.
- **The frontispiece instrument is a watermark, not a layer of equal weight.**
  In the source it renders at full strength across the whole leaf, so its rings
  cross the title and the lede — measured at 1265px, the armillary spans
  405–1200px while the text runs to 765px, a 360px overlap of aubergine line
  work at up to 0.8 alpha. It is now drawn back and weighted towards the right
  margin with a gradient mask, putting at most ~0.2 alpha over any text while
  staying clearly visible (0.27–0.40) in the margin it belongs to. Tune the
  three `opacity` values on `.fo-hero__stage` in `folio.css` to taste.
- **The canvas is pointer-only by design**; the chapter list beside it is the
  keyboard-accessible control and carries the same selection, so the orrery is
  an enhancement rather than a requirement.
- **The three design-time dials** (`heroInstrument`, `rotationSpeed`,
  `paperGrain`) are typed props on `<App>` with the source's defaults.

## Notes

Archive retrieval is a pure function in `lib/searchArchive.ts` — no server, no
index, no network. It folds diacritics (so `gdansk` finds `Gdańsk`) and matches
tags by prefix in either direction (so `deploy` finds `deployment`).

If WebGL is unavailable the frontispiece falls back to a drawn armillary sphere,
and `prefers-reduced-motion` stops both instruments turning while leaving them
drawn and interactive.
