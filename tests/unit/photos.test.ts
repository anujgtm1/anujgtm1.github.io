import assert from "node:assert/strict"
import test from "node:test"
import type { PhotoItem } from "../../src/types/domain.ts"
import {
  DEFAULT_ALBUM_NAME,
  PHOTO_ASPECT_RATIOS,
  buildAlbumHref,
  buildPhotoAlbums,
  buildPhotoHref,
  filterPhotoAlbums,
  filterPhotos,
  getAdjacentPhotoIndex,
  getPhotoAlbums,
  resolvePhotoAlbumName,
  resolvePhotoThumbnail,
  slugifyAlbumName,
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

test("slugifyAlbumName produces deterministic URL-safe kebab slugs with Field Notes fallback", () => {
  assert.equal(slugifyAlbumName("Japan"), "japan")
  assert.equal(slugifyAlbumName("  Kyoto & Hokkaido 2025! "), "kyoto-hokkaido-2025")
  assert.equal(slugifyAlbumName("Montréal Walks"), "montreal-walks")
  assert.equal(slugifyAlbumName("   "), "field-notes")
  assert.equal(slugifyAlbumName("---!!!---"), "field-notes")
})

test("resolvePhotoAlbumName trims explicit album names and falls back to DEFAULT_ALBUM_NAME", () => {
  assert.equal(DEFAULT_ALBUM_NAME, "Field Notes")
  assert.equal(resolvePhotoAlbumName("  Mountains  "), "Mountains")
  assert.equal(resolvePhotoAlbumName(""), "Field Notes")
  assert.equal(resolvePhotoAlbumName("   "), "Field Notes")
  assert.equal(resolvePhotoAlbumName(undefined), "Field Notes")
})

test("buildAlbumHref and buildPhotoHref construct canonical album-scoped URLs", () => {
  assert.equal(buildAlbumHref("japan"), "/photos/japan/")
  assert.equal(buildPhotoHref("kyoto-rain", "Japan"), "/photos/japan/#photo-kyoto-rain")
  assert.equal(
    buildPhotoHref("morning-alley", "  Old Town Lisbon "),
    "/photos/old-town-lisbon/#photo-morning-alley",
  )
  assert.equal(buildPhotoHref("quiet-shore"), "/photos/field-notes/#photo-quiet-shore")
  assert.equal(buildPhotoHref("quiet-shore", "   "), "/photos/field-notes/#photo-quiet-shore")
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

test("buildPhotoAlbums returns empty array for empty input", () => {
  assert.deepEqual(buildPhotoAlbums([]), [])
})

test("buildPhotoAlbums groups case/spacing variants, selects covers, formats date ranges, and orders Field Notes last", () => {
  const photos: readonly PhotoItem[] = [
    {
      slug: "kyoto-dawn",
      title: "Kyoto Dawn",
      imageUrl: "/images/kyoto-1.jpg",
      alt: "Dawn light in Kyoto",
      date: "Apr 2026",
      dateIso: "2026-04-02T00:00:00.000Z",
      location: "Kyoto, Japan",
      album: "Kyoto",
      featured: false,
      tags: ["Japan"],
    },
    {
      slug: "kyoto-lantern",
      title: "Kyoto Lantern",
      imageUrl: "/images/kyoto-2.jpg",
      alt: "Paper lantern in rain",
      date: "Jan 2026",
      dateIso: "2026-01-18T00:00:00.000Z",
      location: "Gion, Kyoto",
      album: " kyoto ",
      featured: true,
      tags: ["Rain"],
    },
    {
      slug: "kyoto-temple",
      title: "Kyoto Temple",
      imageUrl: "/images/kyoto-3.jpg",
      alt: "Cedar eaves",
      date: "Feb 2026",
      dateIso: "2026-02-10T00:00:00.000Z",
      location: "Arashiyama, Kyoto",
      album: "KYOTO",
      featured: false,
      tags: ["Wood"],
    },
    {
      slug: "kyoto-canal",
      title: "Kyoto Canal",
      imageUrl: "/images/kyoto-4.jpg",
      alt: "Canal reflection",
      date: "Mar 2026",
      dateIso: "2026-03-04T00:00:00.000Z",
      location: "Fushimi, Kyoto",
      album: "Kyoto",
      featured: false,
      tags: ["Water"],
    },
    {
      slug: "ridge-2024",
      title: "Ridge 2024",
      imageUrl: "/images/ridge-2024.jpg",
      alt: "Old mountain ridge",
      date: "Nov 2024",
      dateIso: "2024-11-05T00:00:00.000Z",
      location: "Blue Ridge, NC",
      album: "Mountains",
      featured: false,
      tags: ["Hills"],
    },
    {
      slug: "ridge-2026",
      title: "Ridge 2026",
      imageUrl: "/images/ridge-2026.jpg",
      alt: "Recent ridge",
      date: "Feb 2026",
      dateIso: "2026-02-12T00:00:00.000Z",
      location: "Blue Ridge, NC",
      album: "Mountains",
      featured: false,
      tags: ["Hills"],
    },
    {
      slug: "ungrouped-walk",
      title: "Ungrouped Walk",
      imageUrl: "/images/walk.jpg",
      alt: "Sidewalk shadows",
      date: "May 2026",
      dateIso: "2026-05-01T00:00:00.000Z",
      location: "Chicago, IL",
      tags: ["Walk"],
    },
  ]

  const albums = buildPhotoAlbums(photos)

  // Named albums sorted newest photo dateIso descending; Field Notes placed last despite newer date
  assert.deepEqual(
    albums.map((album) => album.slug),
    ["kyoto", "mountains", "field-notes"],
  )

  const kyoto = albums[0]
  assert.ok(kyoto)
  // Merged all 4 case/whitespace variants under first seen sorted photo's trimmed display name
  assert.equal(kyoto.count, 4)
  assert.equal(kyoto.name, "kyoto")
  // Featured photo wins cover even though kyoto-dawn is newer
  assert.equal(kyoto.coverPhoto.slug, "kyoto-lantern")
  // Preview photos capped at 3 starting with coverPhoto
  assert.deepEqual(
    kyoto.previewPhotos.map((photo) => photo.slug),
    ["kyoto-lantern", "kyoto-dawn", "kyoto-canal"],
  )
  // Same year with distinct months shows oldest – newest date without duplicating year-only range
  assert.equal(kyoto.dateRange, "Jan 2026 – Apr 2026")
  // Locations capped at 3 unique entries
  assert.equal(kyoto.locations.length, 3)

  const mountains = albums[1]
  assert.ok(mountains)
  // No featured photo -> falls back to newest photo
  assert.equal(mountains.coverPhoto.slug, "ridge-2026")
  // Multi-year span formats as YYYY – YYYY
  assert.equal(mountains.dateRange, "2024 – 2026")
  // Duplicate locations are deduplicated
  assert.deepEqual(mountains.locations, ["Blue Ridge, NC"])

  const fieldNotes = albums[2]
  assert.ok(fieldNotes)
  assert.equal(fieldNotes.name, DEFAULT_ALBUM_NAME)
  assert.equal(fieldNotes.count, 1)
  assert.equal(fieldNotes.dateRange, "May 2026")
})

test("buildPhotoAlbums preserves single-date formatting and returns Field Notes when it is the only album", () => {
  const onlyUngrouped: readonly PhotoItem[] = [
    {
      slug: "frame-a",
      title: "Frame A",
      imageUrl: "/a.jpg",
      alt: "Frame A",
      date: "Jan 2026",
      dateIso: "2026-01-05T00:00:00.000Z",
      tags: [],
    },
    {
      slug: "frame-b",
      title: "Frame B",
      imageUrl: "/b.jpg",
      alt: "Frame B",
      date: "Jan 2026",
      dateIso: "2026-01-20T00:00:00.000Z",
      album: "   ",
      tags: [],
    },
  ]

  const albums = buildPhotoAlbums(onlyUngrouped)
  assert.equal(albums.length, 1)
  assert.equal(albums[0]?.slug, "field-notes")
  assert.equal(albums[0]?.name, "Field Notes")
  assert.equal(albums[0]?.dateRange, "Jan 2026")
})

test("filterPhotoAlbums matches album metadata and contained frame metadata", () => {
  const albums = buildPhotoAlbums(SAMPLE_PHOTOS)

  assert.equal(filterPhotoAlbums(albums, "").length, albums.length)
  assert.deepEqual(
    filterPhotoAlbums(albums, "mountains").map((album) => album.slug),
    ["mountains"],
  )
  assert.deepEqual(
    filterPhotoAlbums(albums, "lisbon").map((album) => album.slug),
    ["streets"],
  )
  assert.deepEqual(
    filterPhotoAlbums(albums, "x100vi").map((album) => album.slug),
    ["mountains"],
  )
  assert.deepEqual(
    filterPhotoAlbums(albums, "snow").map((album) => album.slug),
    ["field-notes"],
  )
  assert.deepEqual(filterPhotoAlbums(albums, "nonexistent"), [])
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
