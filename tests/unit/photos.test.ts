import assert from "node:assert/strict"
import test from "node:test"
import type { PhotoItem } from "../../src/types/domain.ts"
import {
  DEFAULT_ALBUM_NAME,
  PHOTO_ASPECT_RATIOS,
  buildAlbumHref,
  buildPhotoAlbums,
  buildPhotoHref,
  buildTravelThumbnails,
  filterPhotoAlbums,
  filterPhotos,
  getAdjacentPhotoIndex,
  getPhotoAlbums,
  pickFeaturedPhoto,
  pickPortraitPhoto,
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
    dateMs: Date.UTC(2025, 9, 14),
    location: "Smoky Mountains, TN",
    album: "Mountains",
    category: "travel",
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
    dateMs: Date.UTC(2026, 0, 9),
    location: "Lisbon, Portugal",
    album: "Streets",
    category: "travel",
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
    dateMs: Date.UTC(2026, 0, 9),
    location: "Olympic Peninsula, WA",
    album: " Mountains ",
    category: "travel",
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
    dateMs: Date.UTC(2026, 0, 9),
    album: "   ",
    category: "everyday",
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

test("sortPhotos excludes drafts, places featured first, then newest date descending, then title ascending", () => {
  const originalSlugs = SAMPLE_PHOTOS.map((photo) => photo.slug)
  const withDraft: readonly PhotoItem[] = [
    ...SAMPLE_PHOTOS,
    {
      slug: "draft-hidden",
      title: "Hidden Draft",
      imageUrl: "/images/draft.jpg",
      alt: "Hidden draft",
      date: "Dec 2026",
      dateIso: "2026-12-01T00:00:00.000Z",
      dateMs: Date.UTC(2026, 11, 1),
      category: "everyday",
      featured: true,
      tags: [],
      draft: true,
    },
  ]

  const sorted = sortPhotos(withDraft)
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
      dateMs: Date.UTC(2026, 3, 2),
      location: "Kyoto, Japan",
      album: "Kyoto",
      category: "travel",
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
      dateMs: Date.UTC(2026, 0, 18),
      location: "Gion, Kyoto",
      album: " kyoto ",
      category: "travel",
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
      dateMs: Date.UTC(2026, 1, 10),
      location: "Arashiyama, Kyoto",
      album: "KYOTO",
      category: "travel",
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
      dateMs: Date.UTC(2026, 2, 4),
      location: "Fushimi, Kyoto",
      album: "Kyoto",
      category: "travel",
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
      dateMs: Date.UTC(2024, 10, 5),
      location: "Blue Ridge, NC",
      album: "Mountains",
      category: "travel",
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
      dateMs: Date.UTC(2026, 1, 12),
      location: "Blue Ridge, NC",
      album: "Mountains",
      category: "travel",
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
      dateMs: Date.UTC(2026, 4, 1),
      location: "Chicago, IL",
      category: "everyday",
      tags: ["Walk"],
    },
  ]

  const albums = buildPhotoAlbums(photos)

  assert.deepEqual(
    albums.map((album) => album.slug),
    ["kyoto", "mountains", "field-notes"],
  )

  const kyoto = albums[0]
  assert.ok(kyoto)
  assert.equal(kyoto.count, 4)
  assert.equal(kyoto.name, "kyoto")
  assert.equal(kyoto.coverPhoto.slug, "kyoto-lantern")
  assert.deepEqual(
    kyoto.previewPhotos.map((photo) => photo.slug),
    ["kyoto-lantern", "kyoto-dawn", "kyoto-canal"],
  )
  assert.equal(kyoto.dateRange, "Jan 2026 – Apr 2026")
  assert.equal(kyoto.locations.length, 3)

  const mountains = albums[1]
  assert.ok(mountains)
  assert.equal(mountains.coverPhoto.slug, "ridge-2026")
  assert.equal(mountains.dateRange, "2024 – 2026")
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
      dateMs: Date.UTC(2026, 0, 5),
      category: "everyday",
      tags: [],
    },
    {
      slug: "frame-b",
      title: "Frame B",
      imageUrl: "/b.jpg",
      alt: "Frame B",
      date: "Jan 2026",
      dateIso: "2026-01-20T00:00:00.000Z",
      dateMs: Date.UTC(2026, 0, 20),
      album: "   ",
      category: "everyday",
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
      dateMs: Date.UTC(2026, 1, 1),
      album: "Architecture",
      category: "travel",
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

  assert.deepEqual(
    filterPhotos(SAMPLE_PHOTOS, "all", "x100vi").map((photo) => photo.slug),
    ["golden-hour-ridge"],
  )
  assert.deepEqual(
    filterPhotos(SAMPLE_PHOTOS, "all", "lisbon").map((photo) => photo.slug),
    ["morning-alley"],
  )
  assert.deepEqual(
    filterPhotos(SAMPLE_PHOTOS, "all", "trailhead").map((photo) => photo.slug),
    ["cedar-rain"],
  )
  assert.deepEqual(
    filterPhotos(SAMPLE_PHOTOS, "all", "snow").map((photo) => photo.slug),
    ["alpenglow-pass"],
  )
  assert.deepEqual(
    filterPhotos(SAMPLE_PHOTOS, "Mountains", "fog").map((photo) => photo.slug),
    ["cedar-rain"],
  )
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

const EDITORIAL_PHOTOS: readonly PhotoItem[] = [
  {
    slug: "older-craft",
    title: "Bench Thread",
    imageUrl: "/images/uploads/bench.jpg",
    alt: "Bookbinding thread on bench",
    date: "Jan 2026",
    dateIso: "2026-01-15T00:00:00.000Z",
    dateMs: Date.UTC(2026, 0, 15),
    category: "craft",
    featured: true,
    tags: [],
  },
  {
    slug: "newest-travel",
    title: "Harbor Mist",
    imageUrl: "/images/uploads/harbor.jpg",
    alt: "Fog over morning harbor",
    date: "May 2026",
    dateIso: "2026-05-20T00:00:00.000Z",
    dateMs: Date.UTC(2026, 4, 20),
    location: "San Francisco",
    album: "California",
    caption: "Early ferry crossing.",
    category: "travel",
    tags: [],
  },
  {
    slug: "portrait-featured",
    title: "Studio Desk Portrait",
    imageUrl: "/images/uploads/portrait.jpg",
    alt: "Portrait at studio desk",
    date: "Jun 2026",
    dateIso: "2026-06-01T00:00:00.000Z",
    dateMs: Date.UTC(2026, 5, 1),
    category: "portrait",
    featured: true,
    tags: [],
  },
  {
    slug: "draft-photo",
    title: "Hidden Frame",
    imageUrl: "/images/uploads/draft.jpg",
    alt: "Draft frame",
    date: "Dec 2026",
    dateIso: "2026-12-01T00:00:00.000Z",
    dateMs: Date.UTC(2026, 11, 1),
    category: "travel",
    featured: true,
    tags: [],
    draft: true,
  },
]

test("pickFeaturedPhoto prefers non-portrait featured photo, then featured portrait, then newest", () => {
  assert.equal(pickFeaturedPhoto([]), undefined)
  assert.equal(pickFeaturedPhoto(EDITORIAL_PHOTOS)?.slug, "older-craft")

  const onlyPortraitFeatured = EDITORIAL_PHOTOS.filter((p) => p.slug !== "older-craft")
  assert.equal(pickFeaturedPhoto(onlyPortraitFeatured)?.slug, "portrait-featured")

  const noFeatured = EDITORIAL_PHOTOS.filter((p) => !p.featured)
  assert.equal(pickFeaturedPhoto(noFeatured)?.slug, "newest-travel")
})

test("pickPortraitPhoto prefers featured portrait, then portrait, then featured fallback", () => {
  assert.equal(pickPortraitPhoto([]), undefined)
  assert.equal(pickPortraitPhoto(EDITORIAL_PHOTOS)?.slug, "portrait-featured")

  const unfeaturedPortrait: readonly PhotoItem[] = [
    ...EDITORIAL_PHOTOS.filter((p) => p.slug !== "portrait-featured"),
    {
      slug: "regular-portrait",
      title: "Regular Portrait",
      imageUrl: "/p.jpg",
      alt: "Portrait",
      date: "Feb 2026",
      dateIso: "2026-02-01T00:00:00.000Z",
      dateMs: Date.UTC(2026, 1, 1),
      category: "portrait",
      tags: [],
    },
  ]
  assert.equal(pickPortraitPhoto(unfeaturedPortrait)?.slug, "regular-portrait")

  const noPortraits = EDITORIAL_PHOTOS.filter((p) => p.category !== "portrait")
  assert.equal(pickPortraitPhoto(noPortraits)?.slug, "older-craft")
})

test("buildTravelThumbnails merges non-draft trips and travel-category photos sorted newest-first", () => {
  const thumbnails = buildTravelThumbnails(
    [
      {
        slug: "zurich",
        title: "Autumn Tramways",
        city: "Zurich",
        country: "Switzerland",
        stampCode: "ZRH",
        date: "Oct 2026",
        dateMs: Date.UTC(2026, 9, 10),
        summary: "Walked along the Limmat.",
        coverImage: "/images/uploads/zurich.jpg",
        coverImageAlt: "Limmat river in autumn",
      },
      {
        slug: "draft-trip",
        title: "Draft Trip",
        city: "Nowhere",
        country: "None",
        stampCode: "XXX",
        date: "Nov 2026",
        dateMs: Date.UTC(2026, 10, 10),
        summary: "Hidden",
        draft: true,
      },
    ],
    EDITORIAL_PHOTOS,
  )

  assert.equal(thumbnails.length, 2)
  assert.equal(thumbnails[0]?.destination, "travel")
  assert.equal(thumbnails[0]?.href, "/travel/zurich/")
  assert.equal(thumbnails[0]?.imageSrc, "/images/uploads/zurich.jpg")
  assert.equal(thumbnails[0]?.imageAlt, "Limmat river in autumn")
  assert.equal(thumbnails[0]?.stampCode, "ZRH")

  assert.equal(thumbnails[1]?.destination, "gallery")
  assert.equal(thumbnails[1]?.href, "/photos/california/#photo-newest-travel")
  assert.equal(thumbnails[1]?.imageSrc, "/images/uploads/harbor.jpg")
  assert.equal(thumbnails[1]?.subtitle, "San Francisco")
  assert.equal(thumbnails[1]?.summary, "Early ferry crossing.")
})
