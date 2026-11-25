---
title: "Anuj's Field Journal (anujgtm.com)"
summary: "A fast, static personal website pairing archival editorial typography with an interactive bookshelf, vector travel atlas, and mobile-first Git CMS."
date: "Apr 22 2026"
status: "shipped"
role: "Design & Engineering"
tags:
  - Astro
  - SolidJS
  - Tailwind CSS
  - Typography
repoUrl: "https://github.com/anujgtm1/anujgtm1.github.io"
demoUrl: "https://www.anujgtm.com"
featured: true
---

## Design goals

Most personal websites feel either like sterile resumes or fragile apps overloaded with heavy client frameworks. I wanted a calm, warm digital notebook that stays fast, accessible, and genuinely fun to keep updated from a phone.

## Architecture highlights

- **Static-first Astro + selective SolidJS islands** for the interactive bookshelf (`<dialog closedby="any">`), vector world travel atlas, and unified Fuse.js search.
- **Native CSS `light-dark()` + `<meta name="color-scheme">`** dual theme ("Warm Archival Paper" and "Dark Atlas") with zero FOUC and zero layout shift.
- **Git-backed mobile publishing** via `.pages.yml` (Pages CMS) so adding a book review, essay, or passport stamp takes two minutes from anywhere.
