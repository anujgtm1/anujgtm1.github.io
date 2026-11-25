import assert from "node:assert/strict"
import test from "node:test"
import {
  SEARCH_KIND_META,
  filterSearchItemsByKind,
  normalizeBlogToSearchItem,
  normalizeBookToSearchItem,
  normalizeProjectToSearchItem,
  normalizeTravelToSearchItem,
} from "../../src/lib/search.ts"

test("normalizers produce typed SearchItem entries with canonical hrefs", () => {
  const blog = normalizeBlogToSearchItem({
    slug: "sisyphus",
    title: "Sisyphus chooses to push the boulder",
    summary: "Camus essay",
    date: "2024-03-17",
    tags: ["Camus"],
  })
  const project = normalizeProjectToSearchItem({
    slug: "topo-deploy-graph",
    title: "Topo Deploy Graph",
    summary: "Topology planner",
    date: "2026-01-12",
    status: "active",
    tags: ["Infrastructure"],
  })
  const book = normalizeBookToSearchItem({
    slug: "invisible-cities",
    title: "Invisible Cities",
    author: "Italo Calvino",
    status: "reading",
    yearRead: null,
    tags: ["Fiction"],
    spineTheme: "forest",
    summary: "Imaginary cities",
    notesHtml: "",
  })
  const travel = normalizeTravelToSearchItem({
    slug: "tokyo",
    title: "Tokyo",
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    stampCode: "HND",
    date: "2025-11-12",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    summary: "Autumn alleys",
    highlights: ["Shibuya"],
  })

  const all = [blog, project, book, travel]
  assert.equal(blog.href, "/blog/sisyphus/")
  assert.equal(project.href, "/projects/topo-deploy-graph/")
  assert.equal(book.href, "/books/#book-invisible-cities")
  assert.equal(travel.href, "/travel/tokyo/")

  assert.equal(filterSearchItemsByKind(all, "all").length, 4)
  assert.equal(filterSearchItemsByKind(all, "book").length, 1)
  assert.equal(filterSearchItemsByKind(all, "travel")[0]?.kind, "travel")
  assert.equal(SEARCH_KIND_META.travel.label, "Field Log")
})
