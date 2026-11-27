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
    dateMs: Date.UTC(2026, 0, 9),
    location: "Lisbon, Portugal",
    album: "Streets",
    category: "travel",
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
    dateMs: Date.UTC(2026, 1, 1),
    category: "everyday",
    tags: [],
  })

  const all = [blog, project, book, travel, photo]
  assert.equal(blog.href, "/blog/sisyphus/")
  assert.equal(project.href, "/projects/topo-deploy-graph/")
  assert.equal(book.href, "/books/#book-invisible-cities")
  assert.equal(travel.href, "/travel/tokyo/")
  assert.equal(photo.href, "/photos/streets/#photo-morning-alley")
  assert.equal(photo.subtitle, "Streets · Lisbon, Portugal · Ricoh GR III")
  assert.equal(photo.summary, "Warm morning light across wet cobblestones.")
  assert.equal(photo.album, "Streets")
  assert.equal(photo.location, "Lisbon, Portugal")
  assert.deepEqual(photo.tags, ["Street", "Streets", "Lisbon, Portugal", "Ricoh GR III"])
  assert.equal(photoWithoutCaption.href, "/photos/field-notes/#photo-quiet-shore")
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

test("photo search items deduplicate repeated album, location, camera, and tag metadata", () => {
  const photo = normalizePhotoToSearchItem({
    slug: "kyoto-rain",
    title: "Kyoto Rain",
    imageUrl: "https://photos.example.com/kyoto.jpg",
    alt: "Rain on stone steps",
    caption: "   ",
    date: "Mar 2026",
    dateIso: "2026-03-14T00:00:00.000Z",
    dateMs: Date.UTC(2026, 2, 14),
    location: " Kyoto, Japan ",
    album: " Kyoto ",
    category: "travel",
    camera: " Fujifilm X100VI ",
    tags: ["Kyoto", "Fujifilm X100VI", "Rain"],
  })

  assert.equal(photo.href, "/photos/kyoto/#photo-kyoto-rain")
  assert.equal(photo.subtitle, "Kyoto · Kyoto, Japan · Fujifilm X100VI")
  assert.equal(photo.summary, "Rain on stone steps")
  assert.deepEqual(photo.tags, ["Kyoto", "Fujifilm X100VI", "Rain", "Kyoto, Japan"])
})
