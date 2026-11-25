import assert from "node:assert/strict"
import test from "node:test"
import { buildRssItemUrl, prepareRssItems } from "../../src/lib/rss.ts"
import type { RssFeedEntry } from "../../src/types/domain.ts"

test("buildRssItemUrl builds canonical paths without relying on slug prefixes", () => {
  assert.equal(
    buildRssItemUrl({
      collection: "blog",
      slug: "2026-04-22-sisyphus-chooses-to-push",
      title: "Sisyphus",
      summary: "Summary",
      date: new Date("2024-03-17"),
    }),
    "/blog/2026-04-22-sisyphus-chooses-to-push/",
  )

  assert.equal(
    buildRssItemUrl({
      collection: "travel",
      slug: "tokyo",
      title: "Tokyo",
      summary: "Notes",
      date: new Date("2025-11-12"),
    }),
    "/travel/tokyo/",
  )

  assert.equal(
    buildRssItemUrl({
      collection: "projects",
      slug: "usable-auth-bench",
      title: "Usable Auth Bench",
      summary: "Bench",
      date: new Date("2025-05-01"),
    }),
    "/projects/usable-auth-bench/",
  )
})

test("prepareRssItems excludes drafts and sorts newest-first", () => {
  const entries: readonly RssFeedEntry[] = [
    {
      collection: "blog",
      slug: "older-post",
      title: "Older",
      summary: "Old summary",
      date: new Date("2024-03-17"),
    },
    {
      collection: "travel",
      slug: "draft-trip",
      title: "Draft",
      summary: "Hidden",
      date: new Date("2026-05-01"),
      draft: true,
    },
    {
      collection: "projects",
      slug: "newer-project",
      title: "Newer",
      summary: "New summary",
      date: new Date("2026-02-10"),
    },
  ]

  const prepared = prepareRssItems(entries)
  assert.equal(prepared.length, 2)
  assert.equal(prepared[0]?.link, "/projects/newer-project/")
  assert.equal(prepared[1]?.link, "/blog/older-post/")
})
