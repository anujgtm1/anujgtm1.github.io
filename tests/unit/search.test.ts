import assert from "node:assert/strict"
import test from "node:test"
import {
  SEARCH_KIND_META,
  filterSearchItemsByKind,
  normalizeBlogToSearchItem,
  normalizeBookToSearchItem,
  normalizePhotoToSearchItem,
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
  const photo = normalizePhotoToSearchItem({
    slug: "morning-alley",
    title: "Morning Alley",
    imageUrl: "https://photos.example.com/alley.jpg",
    alt: "Stone alley at sunrise",
    caption: "Warm morning light across wet cobblestones.",
    date: "Jan 2026",
    dateIso: "2026-01-09T00:00:00.000Z",
    location: "Lisbon, Portugal",
    album: "Streets",
    camera: "Ricoh GR III",
    tags: ["Street"],
  })
  const photoWithoutCaption = normalizePhotoToSearchItem({
    slug: "quiet-shore",
    title: "Quiet Shore",
    imageUrl: "/images/uploads/shore.jpg",
    alt: "Calm tide at dusk",
    date: "Feb 2026",
    dateIso: "2026-02-01T00:00:00.000Z",
    tags: [],
  })

  const all = [blog, project, book, travel, photo]
  assert.equal(blog.href, "/blog/sisyphus/")
  assert.equal(project.href, "/projects/topo-deploy-graph/")
  assert.equal(book.href, "/books/#book-invisible-cities")
  assert.equal(travel.href, "/travel/tokyo/")
  assert.equal(photo.href, "/photos/#photo-morning-alley")
  assert.equal(photo.subtitle, "Streets · Lisbon, Portugal · Ricoh GR III")
  assert.equal(photo.summary, "Warm morning light across wet cobblestones.")
  assert.equal(photo.album, "Streets")
  assert.equal(photo.location, "Lisbon, Portugal")
  assert.equal(photoWithoutCaption.subtitle, "Photograph")
  assert.equal(photoWithoutCaption.summary, "Calm tide at dusk")

  assert.equal(filterSearchItemsByKind(all, "all").length, 5)
  assert.equal(filterSearchItemsByKind(all, "book").length, 1)
  assert.equal(filterSearchItemsByKind(all, "travel")[0]?.kind, "travel")
  assert.equal(filterSearchItemsByKind(all, "photo")[0]?.kind, "photo")
  assert.equal(SEARCH_KIND_META.travel.label, "Field Log")
  assert.equal(SEARCH_KIND_META.photo.label, "Photo")
  assert.equal(SEARCH_KIND_META.photo.plural, "Photos")
})
