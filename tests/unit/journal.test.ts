import assert from "node:assert/strict"
import test from "node:test"
import { buildRecentJournalEntries } from "../../src/lib/journal.ts"

test("buildRecentJournalEntries returns empty array when all collections are empty", () => {
  const result = buildRecentJournalEntries({
    blog: [],
    projects: [],
    travel: [],
    books: [],
  })
  assert.deepEqual(result, [])
})

test("buildRecentJournalEntries excludes drafts and sorts newest-first with deterministic slug tie-breaker", () => {
  const sharedDate = new Date("2026-04-15T00:00:00Z")
  const result = buildRecentJournalEntries(
    {
      blog: [
        {
          slug: "draft-post",
          title: "Unpublished Draft",
          date: new Date("2026-12-01T00:00:00Z"),
          draft: true,
        },
        {
          slug: "zeta-note",
          title: "Zeta Note",
          date: sharedDate,
          heroImage: "/images/uploads/zeta.jpg",
          heroImageAlt: "Zeta scene",
        },
      ],
      projects: [
        {
          slug: "alpha-tool",
          title: "Alpha Tool",
          date: sharedDate,
        },
        {
          slug: "draft-project",
          title: "Draft Project",
          date: new Date("2026-11-01T00:00:00Z"),
          draft: true,
        },
      ],
      travel: [
        {
          slug: "lisbon-walk",
          title: "Lisbon Walk",
          date: new Date("2026-06-01T00:00:00Z"),
          coverImage: "/images/uploads/lisbon.jpg",
        },
      ],
      books: [
        {
          slug: "the-book",
          title: "The Book",
          dateRead: new Date("2026-02-10T00:00:00Z"),
          coverUrl: "/images/uploads/book.jpg",
        },
        {
          slug: "draft-book",
          title: "Draft Book",
          dateRead: new Date("2026-09-10T00:00:00Z"),
          draft: true,
        },
      ],
    },
    4,
  )

  assert.equal(result.length, 4)
  assert.equal(result[0]?.kind, "travel")
  assert.equal(result[0]?.href, "/travel/lisbon-walk/")
  assert.equal(result[0]?.thumbnailSrc, "/images/uploads/lisbon.jpg")
  assert.equal(result[0]?.thumbnailAlt, "Lisbon Walk")

  // Tied date: "alpha-tool" sorts before "zeta-note"
  assert.equal(result[1]?.kind, "project")
  assert.equal(result[1]?.slug, "alpha-tool")
  assert.equal(result[1]?.href, "/projects/alpha-tool/")
  assert.equal(result[1]?.thumbnailSrc, undefined)

  assert.equal(result[2]?.kind, "blog")
  assert.equal(result[2]?.slug, "zeta-note")
  assert.equal(result[2]?.href, "/blog/zeta-note/")
  assert.equal(result[2]?.thumbnailSrc, "/images/uploads/zeta.jpg")
  assert.equal(result[2]?.thumbnailAlt, "Zeta scene")

  assert.equal(result[3]?.kind, "book")
  assert.equal(result[3]?.href, "/books/#book-the-book")
  assert.equal(result[3]?.thumbnailSrc, "/images/uploads/book.jpg")
  assert.equal(result[3]?.thumbnailAlt, "The Book")
})

test("buildRecentJournalEntries respects limit and handles yearRead-only or undated books", () => {
  const result = buildRecentJournalEntries(
    {
      blog: [],
      projects: [
        { slug: "p1", title: "Project One", date: new Date("2026-05-01T00:00:00Z") },
        { slug: "p2", title: "Project Two", date: new Date("2025-05-01T00:00:00Z") },
      ],
      travel: [],
      books: [
        { slug: "b-year", title: "Year Book", yearRead: 2026 },
        { slug: "b-reading", title: "Reading Book", status: "reading" },
      ],
    },
    3,
  )

  assert.equal(result.length, 3)
  assert.equal(result[0]?.slug, "p1")
  assert.equal(result[1]?.slug, "b-year")
  assert.equal(result[1]?.dateLabel, "2026")
  assert.equal(result[2]?.slug, "p2")

  assert.deepEqual(
    buildRecentJournalEntries(
      { blog: [], projects: [], travel: [], books: [{ slug: "b", title: "B", status: "reading" }] },
      0,
    ),
    [],
  )
})
