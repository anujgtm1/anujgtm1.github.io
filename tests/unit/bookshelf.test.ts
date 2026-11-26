import assert from "node:assert/strict"
import test from "node:test"
import {
  BOOK_STATUS_META,
  SPINE_PALETTES,
  computeSpineMetrics,
  deriveYearRead,
  filterBooks,
  formatSpineTitle,
  getAvailableYears,
  groupBooksByYear,
  packBooksIntoShelves,
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

test("computeSpineMetrics produces deterministic non-linear thickness and title-length-independent height variance", () => {
  const novella = computeSpineMetrics(86, "Animal Farm")
  const medium = computeSpineMetrics(318, "1984")
  const thick = computeSpineMetrics(928, "The Brothers Karamazov")
  const doorstopper = computeSpineMetrics(1796, "Complete Works")
  const fallback = computeSpineMetrics(undefined, "Untitled")
  const hugeTitle = computeSpineMetrics(
    300,
    "A Remarkably Exhaustive Multi-Volume Archival Treatise on Distributed Systems, Consensus, and Modern Computing Infrastructure",
  )

  assert.deepEqual(novella, computeSpineMetrics(86, "Animal Farm"))
  assert.ok(novella.widthPx >= 34 && novella.widthPx <= 74)
  assert.ok(medium.widthPx > novella.widthPx)
  assert.ok(thick.widthPx > medium.widthPx)
  assert.ok(doorstopper.widthPx >= thick.widthPx && doorstopper.widthPx <= 74)

  // Diminishing marginal width per page (sqrt curve keeps novellas readable without making epics absurd)
  const smallGrowthPerPage = (medium.widthPx - novella.widthPx) / (318 - 86)
  const largeGrowthPerPage = (thick.widthPx - medium.widthPx) / (928 - 318)
  assert.ok(smallGrowthPerPage > largeGrowthPerPage)

  // Realistic height variance across distinct books, never inflated by long subtitles
  const heights = new Set(
    [
      computeSpineMetrics(250, "Dune"),
      computeSpineMetrics(250, "Sapiens"),
      computeSpineMetrics(250, "Snow Crash"),
      computeSpineMetrics(250, "Piranesi"),
      computeSpineMetrics(250, "The Overstory"),
    ].map((m) => m.heightPx),
  )
  assert.ok(heights.size >= 3)
  assert.ok(fallback.heightPx >= 192 && fallback.heightPx <= 254)
  assert.ok(hugeTitle.heightPx >= 192 && hugeTitle.heightPx <= 254)
  assert.ok(novella.bandOffsetPx >= 14 && novella.bandOffsetPx <= 25)
})

test("formatSpineTitle keeps short titles intact and prunes long titles cleanly at word boundaries", () => {
  assert.equal(formatSpineTitle("1984", 192), "1984")
  assert.equal(formatSpineTitle("  Invisible Cities  ", 220), "Invisible Cities")

  const longTitle =
    "Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems"
  const shortSpine = formatSpineTitle(longTitle, 192)
  const tallSpine = formatSpineTitle(longTitle, 254)

  assert.ok(shortSpine.endsWith("…"))
  assert.ok(shortSpine.length <= 19)
  assert.ok(tallSpine.endsWith("…"))
  assert.ok(tallSpine.length <= 29)
  assert.ok(tallSpine.length >= shortSpine.length)

  const subtitleBoundary = formatSpineTitle("Sapiens: A Brief History of Humankind", 220)
  assert.ok(subtitleBoundary.endsWith("…"))
  assert.ok(!/[:,\-–—/(\s]…$/.test(subtitleBoundary))
  assert.ok(subtitleBoundary.length <= 24)

  const punctuationOnly = formatSpineTitle(":::::-----:::::-----:::::", 192)
  assert.ok(punctuationOnly.endsWith("…"))
  assert.ok(punctuationOnly.length > 1 && punctuationOnly.length <= 19)
})

test("packBooksIntoShelves separates Currently Reading and packs rows dynamically by container width", () => {
  const libraryFixture: readonly BookItem[] = [
    ...sampleBooks,
    ...Array.from({ length: 12 }, (_, idx) => ({
      slug: `fixture-${idx + 1}`,
      title: `Archival Volume ${idx + 1}`,
      author: "A. Reader",
      status: "finished" as const,
      yearRead: 2024,
      pages: 220 + idx * 70,
      tags: ["Fiction"],
      spineTheme: "slate" as const,
      summary: "Fixture volume for shelf packing tests.",
      notesHtml: "",
    })),
  ]

  const wide = packBooksIntoShelves(libraryFixture, 900, 8)
  const narrow = packBooksIntoShelves(libraryFixture, 260, 8)

  assert.equal(wide[0]?.kind, "reading")
  assert.equal(wide[0]?.label, "Currently Reading")
  assert.deepEqual(
    wide[0]?.books.map((b) => b.slug),
    ["invisible-cities"],
  )
  assert.equal(wide[1]?.kind, "library")
  assert.equal(wide[1]?.label, "Shelf 01")

  const wideLibraryCount = wide.filter((s) => s.kind === "library").length
  const narrowLibraryCount = narrow.filter((s) => s.kind === "library").length
  assert.ok(narrowLibraryCount > wideLibraryCount)

  // Every packed row with 2+ books must fit within its shelf width budget
  for (const section of [...wide, ...narrow]) {
    assert.ok(section.books.length >= 1)
    const budget = section === wide.find((s) => s === section) ? 900 : 260
    const rowWidth =
      section.books.reduce((sum, b) => sum + computeSpineMetrics(b.pages, b.title).widthPx, 0) +
      Math.max(0, section.books.length - 1) * 8
    if (section.books.length > 1) {
      assert.ok(rowWidth <= budget, `${section.label} overflowed ${budget}px (${rowWidth}px)`)
    }
  }

  // Always places at least 1 book per shelf even on very narrow widths
  const ultraNarrow = packBooksIntoShelves(libraryFixture, 120, 8)
  assert.ok(ultraNarrow.every((section) => section.books.length >= 1))
  const totalPacked = ultraNarrow.reduce((sum, s) => sum + s.books.length, 0)
  assert.equal(totalPacked, libraryFixture.length)

  // Multiple reading books across rows get numbered Currently Reading labels
  const manyReading: readonly BookItem[] = Array.from({ length: 6 }, (_, idx) => ({
    slug: `reading-${idx + 1}`,
    title: `Current Read ${idx + 1}`,
    author: "B. Author",
    status: "reading" as const,
    yearRead: null,
    pages: 800,
    tags: ["Reading"],
    spineTheme: "forest" as const,
    summary: "Currently reading fixture.",
    notesHtml: "",
  }))
  const readingSections = packBooksIntoShelves(manyReading, 200, 8)
  assert.ok(readingSections.length > 1)
  assert.equal(readingSections[0]?.label, "Currently Reading · 01")
  assert.equal(readingSections[1]?.label, "Currently Reading · 02")
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
