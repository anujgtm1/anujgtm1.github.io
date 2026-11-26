import assert from "node:assert/strict"
import test from "node:test"
import {
  BOOK_STATUS_META,
  SPINE_PALETTES,
  buildBookHref,
  computeSpineMetrics,
  deriveYearRead,
  filterBooks,
  formatRating,
  getAuthorInitials,
  getAvailableYears,
  groupBooksByYear,
  partitionBookcaseLayers,
  renderBookNotesHtml,
  resolveBookCoverUrl,
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
    yearRead: 2025,
    pages: 616,
    isbn: "9781449373320",
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
    yearRead: 2024,
    pages: 212,
    isbn: "9780525564454",
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
    yearRead: null,
    pages: 165,
    isbn: "978-0-15-645380-6",
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

test("resolveBookCoverUrl prefers coverUrl, resolves valid ISBNs, and returns null otherwise", () => {
  assert.equal(
    resolveBookCoverUrl({ coverUrl: "/images/custom.jpg", isbn: "9781449373320" }),
    "/images/custom.jpg",
  )
  assert.equal(
    resolveBookCoverUrl({ isbn: "978-0-15-645380-6" }),
    "https://covers.openlibrary.org/b/isbn/9780156453806-L.jpg?default=false",
  )
  assert.equal(resolveBookCoverUrl({ isbn: "bad-isbn" }), null)
  assert.equal(resolveBookCoverUrl({}), null)
})

test("groupBooksByYear and getAvailableYears group reading first and years descending", () => {
  assert.deepEqual(getAvailableYears(sampleBooks), [2025, 2024])
  const groups = groupBooksByYear(sampleBooks)
  assert.deepEqual(
    groups.map((g) => g.label),
    ["Currently Reading", "2025", "2024"],
  )
  assert.equal(filterBooks(sampleBooks, "all", "", 2024).length, 1)
  assert.equal(deriveYearRead(new Date("2026-03-18")), 2026)
  assert.equal(deriveYearRead(undefined, 2025), 2025)
  assert.equal(deriveYearRead(undefined), null)
})

function makeBooks(count: number): readonly BookItem[] {
  return Array.from({ length: count }, (_, idx) => ({
    slug: `book-${idx + 1}`,
    title: `Volume ${idx + 1}`,
    author: `Author ${idx + 1}`,
    status: "finished" as const,
    yearRead: 2025,
    pages: 260 + idx * 10,
    tags: ["Archive"],
    spineTheme: "navy" as const,
    summary: `Summary for volume ${idx + 1}.`,
    notesHtml: "",
  }))
}

test("buildBookHref returns canonical bookshelf hash URL", () => {
  assert.equal(buildBookHref("ddia"), "/books/#book-ddia")
  assert.equal(buildBookHref("the-myth-of-sisyphus"), "/books/#book-the-myth-of-sisyphus")
})

test("partitionBookcaseLayers handles empty and single-shelf sets (1..5 books)", () => {
  assert.deepEqual(partitionBookcaseLayers([]), {
    layers: [],
    totalLayers: 0,
    hiddenBookCount: 0,
  })

  const one = partitionBookcaseLayers(makeBooks(1))
  assert.equal(one.totalLayers, 1)
  assert.equal(one.hiddenBookCount, 0)
  assert.equal(one.layers.length, 1)
  assert.equal(one.layers[0]?.index, 0)
  assert.equal(one.layers[0]?.label, "Shelf 01")
  assert.equal(one.layers[0]?.books.length, 1)

  const five = partitionBookcaseLayers(makeBooks(5))
  assert.equal(five.totalLayers, 1)
  assert.equal(five.hiddenBookCount, 0)
  assert.deepEqual(
    five.layers.map((layer) => [layer.label, layer.books.length]),
    [["Shelf 01", 5]],
  )
})

test("partitionBookcaseLayers balances 6..12 books cleanly across 2 shelves", () => {
  const six = partitionBookcaseLayers(makeBooks(6))
  assert.equal(six.totalLayers, 2)
  assert.equal(six.hiddenBookCount, 0)
  assert.deepEqual(
    six.layers.map((layer) => [layer.label, layer.books.length]),
    [
      ["Shelf 01", 3],
      ["Shelf 02", 3],
    ],
  )

  const seven = partitionBookcaseLayers(makeBooks(7))
  assert.deepEqual(
    seven.layers.map((layer) => [layer.label, layer.books.length]),
    [
      ["Shelf 01", 4],
      ["Shelf 02", 3],
    ],
  )

  const twelve = partitionBookcaseLayers(makeBooks(12))
  assert.deepEqual(
    twelve.layers.map((layer) => [layer.label, layer.books.length]),
    [
      ["Shelf 01", 6],
      ["Shelf 02", 6],
    ],
  )
})

test("partitionBookcaseLayers distributes larger sets evenly and supports capped vs expanded layers", () => {
  const seventeen = partitionBookcaseLayers(makeBooks(17))
  assert.equal(seventeen.totalLayers, 3)
  assert.equal(seventeen.hiddenBookCount, 0)
  assert.deepEqual(
    seventeen.layers.map((layer) => [layer.label, layer.books.length]),
    [
      ["Shelf 01", 6],
      ["Shelf 02", 6],
      ["Shelf 03", 5],
    ],
  )

  const capped = partitionBookcaseLayers(makeBooks(25))
  assert.equal(capped.totalLayers, 4)
  assert.equal(capped.layers.length, 3)
  assert.deepEqual(
    capped.layers.map((layer) => [layer.index, layer.label, layer.books.length]),
    [
      [0, "Shelf 01", 7],
      [1, "Shelf 02", 6],
      [2, "Shelf 03", 6],
    ],
  )
  assert.equal(capped.hiddenBookCount, 6)

  const expanded = partitionBookcaseLayers(makeBooks(25), {
    maxVisibleLayers: Number.POSITIVE_INFINITY,
  })
  assert.equal(expanded.totalLayers, 4)
  assert.equal(expanded.layers.length, 4)
  assert.equal(expanded.hiddenBookCount, 0)
  assert.deepEqual(
    expanded.layers.map((layer) => [layer.label, layer.books.length]),
    [
      ["Shelf 01", 7],
      ["Shelf 02", 6],
      ["Shelf 03", 6],
      ["Shelf 04", 6],
    ],
  )
})

test("partitionBookcaseLayers honors custom booksPerShelf and clamps invalid values", () => {
  const sideFive = partitionBookcaseLayers(makeBooks(5), { booksPerShelf: 5 })
  assert.equal(sideFive.totalLayers, 1)
  assert.equal(sideFive.layers[0]?.books.length, 5)

  const sideEleven = partitionBookcaseLayers(makeBooks(11), { booksPerShelf: 5 })
  assert.equal(sideEleven.totalLayers, 3)
  assert.deepEqual(
    sideEleven.layers.map((layer) => [layer.label, layer.books.length]),
    [
      ["Shelf 01", 4],
      ["Shelf 02", 4],
      ["Shelf 03", 3],
    ],
  )

  const narrow = partitionBookcaseLayers(makeBooks(4), { booksPerShelf: 3 })
  assert.equal(narrow.totalLayers, 2)
  assert.deepEqual(
    narrow.layers.map((layer) => layer.books.length),
    [2, 2],
  )

  const clamped = partitionBookcaseLayers(makeBooks(10), {
    booksPerShelf: 0,
    maxVisibleLayers: Number.POSITIVE_INFINITY,
  })
  assert.equal(clamped.totalLayers, 10)
  assert.equal(clamped.layers[9]?.label, "Shelf 10")
  assert.equal(clamped.hiddenBookCount, 0)
})

test("formatRating and getAuthorInitials handle normal and edge inputs", () => {
  assert.equal(formatRating(undefined), "")
  assert.equal(formatRating(0), "")
  assert.equal(formatRating(4), "★★★★☆")
  assert.equal(formatRating(7), "★★★★★")

  assert.equal(getAuthorInitials("Martin Kleppmann"), "M.K.")
  assert.equal(getAuthorInitials("Plato"), "PLA")
  assert.equal(getAuthorInitials("   "), "")
})
