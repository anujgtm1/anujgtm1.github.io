---
title: "Bookbinder Studio"
summary: "1:1 millimeter-accurate browser studio for designing and printing removable hardcover cases, dust jackets, slipcases, cutting jigs, and Cricut foil SVGs — fully offline with zero accounts."
date: "2026-11-24"
status: "shipped"
role: "Creator"
tags:
  - React
  - TypeScript
  - Vite
  - pdf-lib
  - SVG/CAD
  - Tailwind
demoUrl: "https://anujgtm.com/Bookbinder/"
repoUrl: "https://github.com/anujgtm1/Bookbinder"
featured: true
---

## Why I built it

Rebinding a beloved paperback or fitting a custom dust jacket usually means redoing tedious millimeter arithmetic by hand — board overhang, hinge gaps, spine rounding, turn-in allowance — and praying the home printer doesn't quietly rescale the PDF by 97%.

**Bookbinder Studio** turns those bench measurements into exact, print-ready 1:1 patterns directly in the browser.

## What it builds

- **Hardcover & flexible cases:** Rigid 3-board hardcover cases, flexible-spine covers, fold-and-glue slip covers, and replacement paperback covers.
- **Jackets & enclosures:** Classic dust jackets with calibrated flaps and 5-panel slipcase boxes sized to the exact text-block depth.
- **Workshop jigs & foil SVGs:** Printable bench recipe cards, 45° corner miter cutting jigs, and Cricut-ready foil stamping SVGs.

## Privacy-first, offline-capable architecture

All parametric CAD geometry, sheet tiling, and vector export run **100% client-side** using React 19, TypeScript, Vite, and `pdf-lib`. There are no accounts, no uploads, and no servers — custom cover artwork and measurements never leave your device.
