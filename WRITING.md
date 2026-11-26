# Writing & Publishing Guide

This site is plain Markdown in Git, deployed automatically to `https://www.anujgtm.com` via GitHub Actions whenever changes land on `master`. You can publish a short book note, essay, travel stamp, or `/now` update in under two minutes straight from your phone.

---

## Option 1: Mobile Publishing with Pages CMS (Recommended — 1-Minute Setup)

This repository already ships with a preconfigured [`.pages.yml`](./.pages.yml) schema for **Pages CMS**.

1. Visit **[app.pagescms.org](https://app.pagescms.org)** on your iPhone, Android, or laptop and sign in with GitHub.
2. Select `anujgtm1/anujgtm1.github.io` (and add it to your phone Home Screen as a web app).
3. Tap any collection:
   - **Bookshelf & Marginalia** — Only `title`, `author`, `status`, and `summary` are required. Add an `isbn` (10 or 13 digits) to auto-fetch the book cover via Open Library, and optionally drop a 2–4 sentence quick note in the body.
   - **Blog & Short Notes** — Write a quick dispatch or longer essay.
   - **Travel Atlas** — Drop in a city, 3-letter `stampCode`, `lat`/`lng`, and highlights to pin it on the world map.
   - **Photo Gallery** — Upload a photo directly (or paste an external CDN URL), add `alt` text, optional `album`, `location`, `camera`, and `aspectRatio`, and publish straight to `/photos`. Each distinct `album` automatically gets its own album card on `/photos/` and a dedicated `/photos/<album>/` gallery page.
   - **Now Page (`/now`)** — Update what you are reading, building, or planning next; the homepage Field Desk strip updates automatically.
4. Tap **Save**. Pages CMS commits directly to GitHub, and GitHub Actions rebuilds the live site automatically.

---

## Option 2: Offline Mobile Writing (Obsidian + Working Copy / Git Sync)

Great for writing on flights or trailheads without cell reception:

1. **iOS:** Clone `anujgtm1/anujgtm1.github.io` in **Working Copy**, link `src/content/` as an Obsidian Mobile vault (or edit right inside Working Copy), and push when back online.
2. **Android:** Clone the repo with **Obsidian Mobile + Git Sync** (or Termux).
3. **iOS Quick Capture Shortcut:** Create a Shortcut that asks for *Title* + *Quick Note*, formats a frontmatter Markdown file in `src/content/blog/` or `src/content/books/`, and calls Working Copy's *Commit & Push* action.

---

## Importing Your Reading Log from Goodreads (2 Steps)

Populate your year-by-year book cover wall (`2026`, `2025`, `2024`, …) straight from Goodreads:

1. On Goodreads desktop web, go to **My Books → Import and export → Export Library** and download `goodreads_library_export.csv`.
2. Run the built-in importer:

```bash
npm run import:goodreads -- ~/Downloads/goodreads_library_export.csv
```

What the importer does automatically:
- Parses Goodreads' `="978..."` ISBN wrappers so covers resolve automatically via Open Library (with an archival typographic fallback if a cover is missing).
- Maps `currently-reading` → `reading`, `read` → `finished`, and `to-read` → `queued`, extracting `dateRead` and `yearRead` for the year filter pills.
- Cleans `<br/>` tags from Goodreads reviews into crisp Markdown notes.
- **Protects your existing notes:** skips any `src/content/books/<slug>.md` file that already exists unless you pass `--overwrite`.

---

## Photo Hosting & Publishing

The Photo Gallery (`/photos`) accepts **both local repo paths** and **external HTTPS URLs** in `imageUrl` and optional `thumbnailUrl` (grid preview URL; falls back to `imageUrl`). Pick whichever workflow fits the volume of photos you plan to publish:

1. **Pages CMS Direct Upload (Zero Extra Accounts — Best for a Handful of Photos)**
   - Upload compressed WebP/JPEG files directly inside the **Photo Gallery** collection in Pages CMS.
   - Files are saved under `public/images/uploads/` and referenced as `/images/uploads/<filename>.webp`. Keep uploads under ~500 KB each so the Git repository stays lean.
2. **Cloudflare R2 + Custom Domain (Best for High-Resolution Libraries)**
   - Create a public R2 bucket mapped to a subdomain like `https://photos.anujgtm.com`.
   - Zero egress fees, 10 GB free storage, and your GitHub repo stays lightweight. Upload a full-res image (`imageUrl`) and optionally a ~900px grid preview (`thumbnailUrl`).
3. **Cloudinary Free Tier (Easiest Automatic Thumbnails)**
   - Upload originals once and use URL transformation parameters for fast delivery:
     - `thumbnailUrl`: `https://res.cloudinary.com/<cloud>/image/upload/w_900,f_auto,q_auto/<id>.jpg`
     - `imageUrl`: `https://res.cloudinary.com/<cloud>/image/upload/w_2000,f_auto,q_auto/<id>.jpg`
4. **Flickr Direct `live.staticflickr.com` URLs**
   - If your photos already live on Flickr, paste the direct static image URLs (`_c.jpg` / `_z.jpg` for `thumbnailUrl`, `_b.jpg` / `_k.jpg` for `imageUrl`).

> **Tip:** Set `album` (e.g. `"Japan"`, `"Mountains"`, `"Street Walk"`) to group photographs into archival album cards on `/photos/` — clicking any album opens its dedicated `/photos/<album>/` gallery and lightbox. Photos without an explicit `album` group automatically into `"Field Notes"`. Set `featured: true` on a frame to choose it as that album's cover image, and set `aspectRatio` (`landscape`, `portrait`, `square`, or `wide`) whenever you know the frame orientation so the masonry grid reserves exact space before images load and avoids layout shift.

---

## Frontmatter Cheat Sheet

### Quick Book Note (`src/content/books/<slug>.md`)

```yaml
---
title: "Invisible Cities"
author: "Italo Calvino"
status: "reading" # reading | favorite | finished | queued
summary: "Fifty-five miniature portraits of impossible cities."
isbn: "9780156453806" # optional — auto-fetches book cover
dateRead: "2026-04-12" # optional — groups into the year cover wall
rating: 5 # optional (1-5)
quote: "Optional favorite line." # optional
spineTheme: "forest" # optional: burgundy | forest | navy | ochre | terracotta | slate | charcoal | plum
tags: ["Fiction", "Travel"] # optional
---

Short, funny, sharp, or grim marginalia goes here.
```

### Short Blog Note (`src/content/blog/YYYY-MM-DD-<slug>.md`)

```yaml
---
title: "Sisyphus chooses to push the boulder"
summary: "The myth of Sisyphus and the joy of life."
date: "2026-04-22"
tags: ["Camus", "Philosophy", "Book"]
draft: false
---

Write as little or as much as the thought deserves.
```

### Travel Passport Stamp (`src/content/travel/<slug>.md`)

```yaml
---
title: "Late Autumn Alleys & Quiet Coffee Counters"
city: "Tokyo"
country: "Japan"
region: "Asia" # North America | Europe | Asia | South America | Africa | Oceania
stampCode: "HND"
date: "2025-11-12"
lat: 35.6762
lng: 139.6503
summary: "Walking twenty thousand steps a day between cedar temples and ramen counters."
highlights:
  - "Morning espresso in Kiyosumi-Shirakawa"
  - "Shimokitazawa secondhand bookstores"
---

Trip field notes go here.
```

### Photo Gallery Frame (`src/content/photos/YYYY-MM-DD-<slug>.md`)

```yaml
---
title: "Morning Light over the Ridge"
imageUrl: "https://photos.anujgtm.com/2026/morning-ridge-full.webp" # or /images/uploads/...
thumbnailUrl: "https://photos.anujgtm.com/2026/morning-ridge-thumb.webp" # optional
alt: "Warm sunrise breaking through mist over a forested mountain ridge"
caption: "First five minutes after the fog lifted along the overlook." # optional
date: "2026-04-18"
location: "Smoky Mountains, TN" # optional
album: "Mountains" # optional — groups into an album card on /photos/ and builds /photos/mountains/ (defaults to "Field Notes")
camera: "Fujifilm X100VI" # optional
aspectRatio: "landscape" # optional: landscape | portrait | square | wide
featured: false # optional — selects the album cover & pins frame first in the gallery
tags: ["Mountains", "Sunrise"] # optional
draft: false # optional
---
```
