---
title: "Personal CRM"
summary: "Private, multi-account household CRM on Cloudflare Workers, D1, and Access — starting with a weekly call picker that answers \"who do I call today?\" from a calendar link."
date: "2026-11-25"
status: "active"
role: "Creator"
tags:
  - Cloudflare Workers
  - D1
  - React Router
  - Drizzle ORM
  - TypeScript
repoUrl: "https://github.com/anujgtm1/personal-crm"
featured: true
---

## Why I built it

Staying in touch with family and close friends across time zones shouldn't require a heavy enterprise CRM — and it definitely shouldn't hand your personal relationships over to a third-party SaaS database.

**Personal CRM** is a lightweight, private relationship notebook designed to run at the edge for a single household, starting with one focused job: answering *"who should I call today?"* straight from a weekly cadence and calendar link.

## Architecture highlights

- **Household-isolated security:** Multi-account data isolation protected at the edge with **Cloudflare Access** — zero public signup surfaces, zero password sprawl.
- **Edge SQLite & typed schema:** Powered by **Cloudflare Workers**, **Cloudflare D1**, and **Drizzle ORM**, keeping reads fast and migrations cleanly versioned.
- **Modular & end-to-end verified:** Built with React Router, strict boundary validation in **Zod**, and full **Playwright** E2E coverage as the weekly call picker expands into birthdays, notes, and lightweight check-in history.
