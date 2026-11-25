# anujgtm.com

Personal website, field journal, interactive bookshelf, travel atlas, and engineering portfolio of **Anuj Gautam**.

Built with **Astro 4**, **SolidJS**, **Tailwind CSS**, and **TypeScript**, designed in an *Editorial Field Journal* aesthetic with dual **Warm Archival Paper** / **Dark Atlas** themes powered by native CSS `color-scheme` and `light-dark()`.

## Features

- **Blog & Dispatches (`/blog`)** — Short notes on books, software systems, and places worth remembering, complete with topic filters, Fuse.js search, and a CSS scroll-driven reading progress bar.
- **Interactive Bookshelf (`/books`)** — Year-by-year visual book cover wall (`Covers` / `Shelf` / `Catalog`), automatic ISBN cover resolution with bespoke archival cloth fallbacks, native `<dialog closedby="any">` marginalia modal, and a zero-dependency **Goodreads CSV importer**.
- **Interactive Travel Atlas (`/travel`)** — Custom equirectangular SVG world projection with interactive destination pins, vintage SVG passport stamp inspector, region filters, and full trip logs.
- **Engineering Dossiers (`/projects`)** — Showcasing *Bookbinder Studio*, *Travel Planner*, and *Personal CRM*.
- **Work Timeline (`/work`) & `/now` Ledger (`/now`)** — Career history and a live Field Desk snapshot.
- **Unified Search (`/search`) & RSS (`/rss.xml`)** — Instant client-side search across essays, projects, books, and travel logs.
- **Mobile-First Publishing (`.pages.yml`)** — Ready for [Pages CMS](https://app.pagescms.org) out of the box; see [`WRITING.md`](./WRITING.md).

## Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Run `astro check` typechecking + static production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run test:unit` | Run unit tests (`atlas`, `bookshelf`, `goodreads`, `rss`, `search`) |
| `npm run test:e2e` | Run end-to-end HTTP/HTML route & content verification against `dist/` |
| `npm test` | Run both unit and E2E test suites |
| `npm run import:goodreads -- <export.csv>` | Import books & dates from a Goodreads CSV export into `src/content/books/` |

## Deployment

Pushes to `master` automatically build and deploy to GitHub Pages (`https://www.anujgtm.com`) via [`.github/workflows/astro.yml`](./.github/workflows/astro.yml).
