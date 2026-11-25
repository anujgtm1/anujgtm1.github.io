import assert from "node:assert/strict"
import test from "node:test"
import {
  BOOK_STATUS_META,
  SPINE_PALETTES,
  computeSpineMetrics,
  filterBooks,
  renderBookNotesHtml,
  sortBooks,
} from "../../src/lib/bookshelf.ts"
import type { BookItem } from "../../src/types/domain.ts"

const sampleBooks: readonly BookItem[] = [
  {
    slug: "ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "finished",
    rating: 5,
    dateRead: "2025-09-14",
    pages: 616,
    tags: ["Systems", "Engineering"],
    spineTheme: "navy",
    summary: "The canonical field manual for distributed data systems.",
    notesHtml: "<p>Essential reference.</p>",
  },
  {
    slug: "sisyphus",
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    status: "favorite",
    rating: 5,
    dateRead: "2024-03-17",
    pages: 212,
    tags: ["Philosophy"],
    spineTheme: "terracotta",
    quote: "One must imagine Sisyphus happy.",
    summary: "Absurdism as an invitation to live lucidly.",
    notesHtml: "<p>Lucid rebellion.</p>",
  },
  {
    slug: "invisible-cities",
    title: "Invisible Cities",
    author: "Italo Calvino",
    status: "reading",
    pages: 165,
    tags: ["Fiction", "Travel"],
    spineTheme: "forest",
    summary: "Marco Polo imagines fifty-five impossible cities for Kublai Khan.",
    notesHtml: "<p>Reading slowly.</p>",
  },
]

test("computeSpineMetrics produces deterministic clamped geometry", () => {
  const thin = computeSpineMetrics(120, "Short")
  const thick = computeSpineMetrics(1200, "A Remarkably Long Archival Volume About Systems")
  const fallback = computeSpineMetrics(undefined, "Untitled")

  assert.deepEqual(thin, computeSpineMetrics(120, "Short"))
  assert.ok(thin.widthPx >= 44 && thin.widthPx <= 68)
  assert.ok(thick.widthPx >= 44 && thick.widthPx <= 68)
  assert.ok(thick.widthPx > thin.widthPx)
  assert.ok(fallback.heightPx >= 198 && fallback.heightPx <= 264)
})

test("sortBooks orders reading first, then favorites, then finished by dateRead", () => {
  const sorted = sortBooks(sampleBooks)
  assert.deepEqual(
    sorted.map((b) => b.slug),
    ["invisible-cities", "sisyphus", "ddia"],
  )
})

test("filterBooks filters by status and case-insensitive search query across fields", () => {
  assert.equal(filterBooks(sampleBooks, "all", "").length, 3)
  assert.equal(filterBooks(sampleBooks, "favorite", "").length, 1)
  assert.equal(filterBooks(sampleBooks, "all", "camus")[0]?.slug, "sisyphus")
  assert.equal(filterBooks(sampleBooks, "all", "distributed")[0]?.slug, "ddia")
  assert.equal(filterBooks(sampleBooks, "reading", "camus").length, 0)
})

test("status metadata and spine palettes cover all expected keys", () => {
  assert.equal(BOOK_STATUS_META.reading.shortLabel, "Reading")
  assert.equal(BOOK_STATUS_META.favorite.shortLabel, "Favorites")
  assert.ok(SPINE_PALETTES.terracotta.bg.startsWith("#"))
  assert.ok(SPINE_PALETTES.burgundy.text.startsWith("#"))
})

test("renderBookNotesHtml escapes raw HTML and formats markdown safely", () => {
  const html = renderBookNotesHtml(
    "A **bold** note with *italics* and <script>alert(1)</script>.\n\n- First `code` item\n- Second item",
  )
  assert.ok(html.includes("<strong>bold</strong>"))
  assert.ok(html.includes("<em>italics</em>"))
  assert.ok(html.includes("<code>code</code>"))
  assert.ok(html.includes("&lt;script&gt;alert(1)&lt;/script&gt;"))
  assert.ok(!html.includes("<script>"))
})
