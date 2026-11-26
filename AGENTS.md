# AGENTS.md — Repository Guide for `anujgtm.com`

This repository builds Anuj Gautam's personal editorial field journal, interactive bookshelf, travel atlas, and engineering portfolio at `anujgtm.com`.

---

## 1. Stack & Commands

- **Framework:** Astro 4 (static output) + Tailwind CSS + SolidJS islands + TypeScript
- **Hosting:** GitHub Pages (`anujgtm.com`, deployed automatically from `master` via `.github/workflows/astro.yml`)
- **Key Commands:**
  - `npm run dev` — Start local Astro dev server
  - `npm run build` — Run `astro check && astro build` (type-check + static build to `dist/`)
  - `npm run test:unit` — Run Node built-in TypeScript unit tests (`tests/unit/*.test.ts`)
  - `npm run test:e2e` — Run E2E smoke & regression tests against `dist/` via `astro preview` (`tests/e2e/site.test.mjs`; run `npm run build` first)
  - `npm test` — Run unit + E2E test suites
  - `npm run import:goodreads -- <path/to/goodreads_library_export.csv>` — Import Goodreads library CSV into `src/content/books/`

---

## 2. Git & Quality Guardrails

- **Branching & Deploy:** Default all work to `develop` (`develop` → `master` via PR). Never commit or push directly to `master`, which auto-deploys live to GitHub Pages via `.github/workflows/astro.yml`.
- **Atomic Commits:** Keep commits small, focused, and independently green using Conventional Commits (`feat(...)`, `fix(...)`, `chore(...)`, `test(...)`, `docs(...)`).
- **Dependencies:** Do not add new npm dependencies without explicit approval from Anuj.
- **Type & Lint Hygiene:** Zero `@ts-ignore`, `@ts-expect-error`, `eslint-disable`, `any`, or non-null `!` assertions.
- **Leaf Types Boundary:** Keep `src/types/` strictly dependency-free (no Astro or SolidJS imports so unit tests can import domain types directly in Node). Ambient SolidJS JSX extensions (such as `<dialog closedby>`) belong in `src/solid-jsx.d.ts`, and ambient Astro HTML JSX extensions belong in `src/env.d.ts`.
- **Verification Before Merge/Push:** Always run `npm run build && npm run test:unit && npm run test:e2e` and confirm zero errors/warnings and 100% passing tests.

---

## 3. Directory Map & Where to Tweak Things

| Area | Files |
| --- | --- |
| **Theme, Colors & Typography** | `src/styles/global.css` (CSS variables, archival light/dark palettes, typography classes, animations), `tailwind.config.mjs` (font families, semantic color tokens, prose styling) |
| **Site Metadata, Nav & Socials** | `src/consts.ts` (`SITE`, page titles/descriptions, `LINKS`, `SOCIALS`), `src/components/Header.astro`, `src/components/Footer.astro` |
| **Homepage & Swiss Journal** | `src/pages/index.astro`, `src/lib/journal.ts`, `tests/unit/journal.test.ts` |
| **Blog** | `src/pages/blog/index.astro`, `src/pages/blog/[...slug].astro` |
| **Photo Gallery** | `src/pages/photos/index.astro`, `src/lib/photos.ts`, `tests/unit/photos.test.ts` |
| **Bookshelf** | `src/pages/books/index.astro`, `src/components/Bookshelf.tsx`, `src/lib/bookshelf.ts`, `tests/unit/bookshelf.test.ts` |
| **Travel Atlas** | `src/pages/travel/index.astro`, `src/pages/travel/[...slug].astro`, `src/components/UnifiedTravelAtlas.tsx`, `src/components/ParkEmblem.tsx`, `src/data/nationalParks.ts`, `src/data/parkJournal.ts`, `src/data/visitedCountries.ts`, `src/lib/parks.ts`, `src/lib/worldProjection.ts`, `src/lib/atlas.ts`, `tests/unit/parks.test.ts`, `tests/unit/atlas.test.ts` |
| **Projects & Blueprint Plates** | `src/pages/projects/index.astro`, `src/pages/projects/[...slug].astro`, `src/components/ProjectVisualPlate.astro` |
| **About, Work & Now** | `src/pages/about/index.astro`, `src/pages/work/index.astro`, `src/pages/now/index.astro` |
| **Unified Search** | `src/pages/search/index.astro`, `src/components/Search.tsx`, `src/lib/search.ts`, `tests/unit/search.test.ts` |
| **RSS Feed** | `src/pages/rss.xml.ts`, `src/lib/rss.ts`, `tests/unit/rss.test.ts` |
| **Goodreads Importer** | `scripts/import-goodreads.mjs`, `src/lib/goodreads.ts`, `tests/unit/goodreads.test.ts` |
| **Mobile / Web CMS** | `.pages.yml` (Pages CMS config for editing all collections directly on GitHub) |
| **Shared Layouts** | `src/layouts/PageLayout.astro`, `src/layouts/TopLayout.astro`, `src/layouts/BottomLayout.astro`, `src/layouts/ArticleTopLayout.astro`, `src/layouts/ArticleBottomLayout.astro` |
| **E2E Regression Suite** | `tests/e2e/site.test.mjs` |

---

## 4. Content Collections & Schema Sync Rule

The site defines **7 Astro Content Collections** in `src/content/config.ts`:

1. **`blog`** (`src/content/blog/`) — Essays & short notes (`title`, `summary`, `date`, `tags`, optional `heroImage`, `heroImageAlt`, `draft`)
2. **`books`** (`src/content/books/`) — Bookshelf & marginalia (`title`, `author`, `status`, `summary`, optional `rating`, `dateRead`, `yearRead`, `pages`, `isbn`, `coverUrl`, `tags`, `spineTheme`, `quote`, `draft`)
3. **`travel`** (`src/content/travel/`) — Travel Atlas passport stamps & field notes (`title`, `city`, `country`, `region`, `stampCode`, `date`, `lat`, `lng`, `summary`, `highlights`, optional `coverImage`, `coverImageAlt`, `draft`)
4. **`projects`** (`src/content/projects/`) — Engineering dossiers (`title`, `summary`, `date`, `status`, `tags`, optional `role`, `repoUrl`, `demoUrl`, `featured`, `draft`)
5. **`work`** (`src/content/work/`) — Career & academic timeline (`company`, `role`, `dateStart`, `dateEnd`, optional `location`)
6. **`now`** (`src/content/now/current.md`) — Living `/now` snapshot (`updatedAt`, `location`, `currentlyBuilding`, `listeningOrThinking`, optional `currentlyReading`, `nextTrip`)
7. **`photos`** (`src/content/photos/`) — Photo gallery contact plates (`title`, `image`, `alt`, `date`, `category`, optional `location`, `camera`, `caption`, `featured`, `linkedHref`, `linkedLabel`, `draft`)

**Mandatory Schema Sync Rule:**
Any field addition, rename, or optionality change in `src/content/config.ts` **MUST** be mirrored in:
1. `.pages.yml` (so Pages CMS stays in sync), and
2. `src/types/domain.ts` (so shared TypeScript domain types stay in sync).

**Content Integrity Rules:**
- **Never commit dummy or placeholder seed content** (fake books, fake trips, fake blog posts, fake photos, or invented `/now` items).
- Keep `draft: true` entries filtered out of both index listings and `getStaticPaths()` detail routes (`blog`, `travel`, `projects`) and RSS.
- Always preserve graceful editorial empty states when `blog`, `books`, `travel`, or `photos` has zero published entries, and keep `.gitkeep` in empty collection directories.

---

## 5. Modern Web Platform Conventions

Preserve these platform-native patterns when modifying UI or styles:

- **Color Scheme & `light-dark()` Theming:** Every page declares `<meta name="color-scheme" content="light dark">` and `:root { color-scheme: light dark; }`. Theme overrides update `<meta name="color-scheme">` and resolve tokens via CSS `light-dark()` with `@media (prefers-color-scheme: dark)` and `:has(> head > meta[name="color-scheme"][content="..."])` fallbacks in `src/styles/global.css`.
- **Native Modal `<dialog>`:** `Bookshelf.tsx` (typed via `src/solid-jsx.d.ts`) and `src/pages/photos/index.astro` (typed via `src/env.d.ts`) use native `<dialog closedby="any">` without redundant `role="dialog"`, `aria-modal`, or manual focus traps, paired with a lightweight outside-click pointer fallback for browsers without `closedBy` (e.g., Safari) and `overscroll-behavior: contain` on `dialog:modal` and `dialog::backdrop`.
- **Motion Opt-In:** Smooth scrolling, spine hover lifts, card transitions, and scroll-driven animations are gated inside `@media (prefers-reduced-motion: no-preference)`. Never enable motion unconditionally.
- **Scroll-Driven Reading Progress Bar:** Article/dossier pages (`showReadingProgress={true}`) render `#reading-progress` driven by `@supports (animation-timeline: scroll())` with `animation-timeline: scroll(root block)` inside `prefers-reduced-motion: no-preference`.
