# Roadmap & Future Ideas

Ideas and enhancements tracked for `anujgtm.com`.

---

## 1. Photo Gallery — Implemented

Dedicated editorial photo gallery at `/photos` with Pages CMS and unified search integration:

- **Hosting & asset pipeline:** Supports both external CDN URLs (Cloudflare R2, Cloudinary, Flickr `live.staticflickr.com`) and local Pages CMS uploads (`/images/uploads/...`) via `imageUrl` and optional `thumbnailUrl` in the `photos` content collection (`src/content/photos/`). See `WRITING.md` for hosting and frontmatter recipes.
- **Display & layout:** Responsive CSS multi-column masonry (`.photo-masonry`) progressively enhanced with `@supports (grid-template-rows: masonry)`, balanced album filter pills (`.filter-pill-row`), metadata search, and a graceful Darkroom empty state when no frames are published yet.
- **Lightbox & interactions:** Native `<dialog closedby="any">` full-resolution lightbox with keyboard `ArrowLeft`/`ArrowRight` navigation, Previous/Next controls, frame counter, `#photo-<slug>` deep-linking from `/search`, `fetchpriority="high"` on the first 2 frames + `loading="lazy"` on subsequent frames, and hover lift/zoom strictly gated behind `prefers-reduced-motion: no-preference`.

---

## 2. Bookshelf Enhancements — Implemented

Interactive multi-layer bookcase and two-step homepage preview modal:

- **Home Page Mini Bookshelf (`src/pages/index.astro`, `src/components/HomeBookshelf.tsx`):** Clicking a book spine in the homepage teaser opens a native `<dialog closedby="any">` modal displaying the book cover (`BookCoverPlate`) and a brief summary blurb; clicking the cover/link in the modal navigates straight to `/books/#book-<slug>`.
- **Books Page Multi-Layer Bookshelf (`src/pages/books/index.astro`, `src/components/Bookshelf.tsx`, `src/components/BookcaseLayers.tsx`):** Displays a top-mounted multi-layer standing bookcase partitioned evenly across shelves above the `Covers` and `Catalog` views, with responsive adaptation on mobile.
