---
title: "Travel Planner"
summary: "Map-first group trip command center to plan multi-stop routes, coordinate shared bookings and logistics, and settle travel expenses in an offline-capable cartographic workspace."
date: "2026-11-20"
status: "shipped"
role: "Creator"
tags:
  - Next.js
  - TypeScript
  - MapLibre GL
  - Firebase
  - Zustand
  - Turf.js
demoUrl: "https://travel.anujgtm.com"
repoUrl: "https://github.com/anujgtm1/travel-app-2"
featured: true
---

## Why I built it

Group trips normally splinter across four apps at once: pinned maps in one tab, lodging confirmations in an email thread, a packing checklist in Notes, and a messy spreadsheet for splitting expenses at the end.

**Travel Planner** brings the whole itinerary into a single cartographic workspace where the map is the primary interface, not an afterthought.

## Architecture highlights

- **Map-first spatial engine:** Built on **MapLibre GL** and **Turf.js** to render multi-stop route polylines, leg distances, and synchronized itinerary markers with smooth camera framing.
- **Offline-capable collaborative state:** Real-time shared trips, logistics checklists, and expense ledgers backed by **Firestore native offline persistence** and domain-isolated **Zustand** stores, so the itinerary stays usable on spotty train or mountain connections.
- **Server-side route handlers:** Clean Next.js API routes orchestrating live weather forecasts, routing geometry, and trip-planning assistance without leaking keys to the client.
