import assert from "node:assert/strict"
import test from "node:test"
import type { PhotoItem } from "../../src/types/domain.ts"
import {
  PHOTO_ASPECT_RATIOS,
  buildPhotoHref,
  filterPhotos,
  getAdjacentPhotoIndex,
  getPhotoAlbums,
  resolvePhotoThumbnail,
  sortPhotos,
} from "../../src/lib/photos.ts"

const SAMPLE_PHOTOS: readonly PhotoItem[] = [
  {
    slug: "golden-hour-ridge",
    title: "Golden Hour Ridge",
    imageUrl: "https://photos.example.com/ridge-full.jpg",
    thumbnailUrl: "https://photos.example.com/ridge-thumb.jpg",
    alt: "Warm evening light over a mountain ridge",
    caption: "Last light after the rain cleared along the crest.",
    date: "Oct 2025",
    dateIso: "2025-10-14T00:00:00.000Z",
    location: "Smoky Mountains, TN",
    album: "Mountains",
    camera: "Fujifilm X100VI",
    aspectRatio: "landscape",
    featured: false,
    tags: ["Mountains", "Light"],
  },
  {
    slug: "morning-alley",
    title: "Morning Alley",
    imageUrl: "https://photos.example.com/alley-full.jpg",
    alt: "Quiet stone alley at sunrise",
    date: "Jan 2026",
    dateIso: "2026-01-09T00:00:00.000Z",
    location: "Lisbon, Portugal",
    album: "Streets",
    camera: "Ricoh GR III",
    aspectRatio: "portrait",
    featured: true,
    tags: ["Street", "Morning"],
  },
  {
    slug: "cedar-rain",
    title: "Cedar Rain",
    imageUrl: "https://photos.example.com/cedar-full.jpg",
    thumbnailUrl: "   ",
    alt: "Wet cedar needles in fog",
    caption: "Mist rolling across the trailhead.",
    date: "Jan 2026",
    dateIso: "2026-01-09T00:00:00.000Z",
    location: "Olympic Peninsula, WA",
    album: " Mountains ",
    camera: "Sony A7C II",
    aspectRatio: "square",
    featured: false,
    tags: ["Forest", "Fog"],
  },
  {
    slug: "alpenglow-pass",
    title: "Alpenglow Pass",
    imageUrl: "/images/uploads/alpenglow.jpg",
    alt: "Alpenglow across snowy peaks",
    date: "Jan 2026",
    dateIso: "2026-01-09T00:00:00.000Z",
    album: "   ",
    aspectRatio: "wide",
    featured: false,
    tags: ["Snow"],
  },
]

test("PHOTO_ASPECT_RATIOS covers all four declared aspect ratio keys", () => {
  assert.deepEqual(PHOTO_ASPECT_RATIOS, {
    landscape: "4 / 3",
    portrait: "3 / 4",
    square: "1 / 1",
    wide: "16 / 10",
  })
})

test("buildPhotoHref returns canonical /photos/#photo-<slug> anchor", () => {
  assert.equal(buildPhotoHref("morning-alley"), "/photos/#photo-morning-alley")
})

test("resolvePhotoThumbnail prefers trimmed thumbnailUrl and falls back to imageUrl", () => {
  assert.equal(
    resolvePhotoThumbnail({
      imageUrl: "https://photos.example.com/full.jpg",
      thumbnailUrl: "  https://photos.example.com/thumb.jpg  ",
    }),
    "https://photos.example.com/thumb.jpg",
  )
  assert.equal(
    resolvePhotoThumbnail({
      imageUrl: "https://photos.example.com/full.jpg",
      thumbnailUrl: "   ",
    }),
    "https://photos.example.com/full.jpg",
  )
  assert.equal(
    resolvePhotoThumbnail({
      imageUrl: "/images/uploads/frame.webp",
    }),
    "/images/uploads/frame.webp",
  )
})

test("sortPhotos places featured first, then newest dateIso descending, then title ascending", () => {
  const originalSlugs = SAMPLE_PHOTOS.map((photo) => photo.slug)
  const sorted = sortPhotos(SAMPLE_PHOTOS)

  assert.deepEqual(
    sorted.map((photo) => photo.slug),
    ["morning-alley", "alpenglow-pass", "cedar-rain", "golden-hour-ridge"],
  )
  // Does not mutate input array
  assert.deepEqual(
    SAMPLE_PHOTOS.map((photo) => photo.slug),
    originalSlugs,
  )
})

test("getPhotoAlbums returns unique non-empty trimmed albums sorted by count desc then name asc", () => {
  const albums = getPhotoAlbums([
    ...SAMPLE_PHOTOS,
    {
      slug: "coastal-fog",
      title: "Coastal Fog",
      imageUrl: "/images/uploads/coast.jpg",
      alt: "Fog along the rocky coast",
      date: "Feb 2026",
      dateIso: "2026-02-01T00:00:00.000Z",
      album: "Architecture",
      tags: [],
    },
  ])

  assert.deepEqual(albums, [
    { name: "Mountains", count: 2 },
    { name: "Architecture", count: 1 },
    { name: "Streets", count: 1 },
  ])
})

test("filterPhotos filters by trimmed album name and case-insensitive search across metadata fields", () => {
  assert.equal(filterPhotos(SAMPLE_PHOTOS, "all", "").length, 4)

  const mountainPhotos = filterPhotos(SAMPLE_PHOTOS, "Mountains", "")
  assert.deepEqual(
    mountainPhotos.map((photo) => photo.slug),
    ["golden-hour-ridge", "cedar-rain"],
  )

  // Search by camera
  assert.deepEqual(
    filterPhotos(SAMPLE_PHOTOS, "all", "x100vi").map((photo) => photo.slug),
    ["golden-hour-ridge"],
  )

  // Search by location
  assert.deepEqual(
    filterPhotos(SAMPLE_PHOTOS, "all", "lisbon").map((photo) => photo.slug),
    ["morning-alley"],
  )

  // Search by caption
  assert.deepEqual(
    filterPhotos(SAMPLE_PHOTOS, "all", "trailhead").map((photo) => photo.slug),
    ["cedar-rain"],
  )

  // Search by tag
  assert.deepEqual(
    filterPhotos(SAMPLE_PHOTOS, "all", "snow").map((photo) => photo.slug),
    ["alpenglow-pass"],
  )

  // Combined album + query
  assert.deepEqual(
    filterPhotos(SAMPLE_PHOTOS, "Mountains", "fog").map((photo) => photo.slug),
    ["cedar-rain"],
  )

  // Non-matching query returns empty
  assert.deepEqual(filterPhotos(SAMPLE_PHOTOS, "Streets", "fog"), [])
})

test("getAdjacentPhotoIndex wraps cleanly around bounds and returns -1 for empty lists", () => {
  assert.equal(getAdjacentPhotoIndex(0, 0, "next"), -1)
  assert.equal(getAdjacentPhotoIndex(0, -3, "prev"), -1)

  assert.equal(getAdjacentPhotoIndex(0, 1, "next"), 0)
  assert.equal(getAdjacentPhotoIndex(0, 1, "prev"), 0)

  assert.equal(getAdjacentPhotoIndex(0, 4, "prev"), 3)
  assert.equal(getAdjacentPhotoIndex(3, 4, "next"), 0)
  assert.equal(getAdjacentPhotoIndex(1, 4, "next"), 2)
  assert.equal(getAdjacentPhotoIndex(2, 4, "prev"), 1)
})
