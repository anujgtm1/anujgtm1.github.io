# Roadmap & Future Ideas

Ideas and enhancements tracked for `anujgtm.com`.

---

## 1. Photo Gallery — Implemented

Dedicated multi-album editorial photo gallery at `/photos` and `/photos/<album>/` with Pages CMS and unified search integration:

- **Hosting & asset pipeline:** Supports both external CDN URLs (Cloudflare R2, Cloudinary, Flickr `live.staticflickr.com`) and local Pages CMS uploads (`/images/uploads/...`) via `imageUrl` and optional `thumbnailUrl` in the `photos` content collection (`src/content/photos/`). See `WRITING.md` for hosting and frontmatter recipes.
- **Multi-album index & routes:** `/photos/` groups frames automatically by `album` (falling back to `"Field Notes"` so no photo is ever orphaned) into tactile archival album cards with cover selection (`featured: true` or newest), frame counts, date ranges, locations, album search, and an `Albums` / `All Frames` view toggle. Clicking an album opens its dedicated `/photos/<album>/` masonry gallery page.
- **Cross-site integration:** Photos also feed the homepage featured plate (`pickFeaturedPhoto`), `/about` portrait plate (`pickPortraitPhoto`), `/travel` visual ledger (`buildTravelThumbnails`), and unified `/search`.
- **Display & layout:** Responsive CSS multi-column masonry (`.photo-masonry`) progressively enhanced with `@supports (grid-template-rows: masonry)`, balanced filter pills (`.filter-pill-row`), metadata search, and a graceful Darkroom empty state when no frames are published yet.
- **Lightbox & interactions:** Native `<dialog closedby="any">` full-resolution lightbox with keyboard `ArrowLeft`/`ArrowRight` navigation, Previous/Next controls, frame counter, album-scoped `#photo-<slug>` deep-linking from `/search` (`/photos/<album>/#photo-<slug>`), `fetchpriority="high"` on the first 2 covers/frames + `loading="lazy"` on subsequent images, and hover lift/zoom strictly gated behind `prefers-reduced-motion: no-preference`.

---

## 2. Bookshelf Enhancements — Implemented

Interactive two-step homepage preview modal and dynamic multi-shelf spine packing:

- **Home Page Mini Bookshelf (`src/pages/index.astro`, `src/components/HomeBookshelf.tsx`):** Clicking a book spine in the homepage Swiss Notebook bookshelf opens a native `<dialog closedby="any">` modal displaying the book cover (`BookCoverPlate`) and a brief summary blurb; clicking the cover/link in the modal navigates straight to `/books/#book-<slug>`.
- **Books Page (`src/pages/books/index.astro`, `src/components/Bookshelf.tsx`, `src/components/BookCoverPlate.tsx`):** Preserves the 3-way `Covers | Shelf | Catalog` view toggle with dynamic `ResizeObserver` spine packing across shelves (`packBooksIntoShelves`) and non-linear spine thickness for all 105+ Goodreads volumes, sharing the extracted `BookCoverPlate` component.
