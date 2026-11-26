import assert from "node:assert/strict"
import test from "node:test"
import {
  buildTravelThumbnails,
  pickFeaturedPhoto,
  pickPortraitPhoto,
  sortPhotos,
} from "../../src/lib/photos.ts"
import type { PhotoItem } from "../../src/types/domain.ts"

const SAMPLE_PHOTOS: readonly PhotoItem[] = [
  {
    slug: "older-craft",
    title: "Bench Thread",
    image: "/images/uploads/bench.jpg",
    alt: "Bookbinding thread on bench",
    date: "Jan 2026",
    dateMs: Date.UTC(2026, 0, 15),
    category: "craft",
    featured: true,
  },
  {
    slug: "newest-travel",
    title: "Harbor Mist",
    image: "/images/uploads/harbor.jpg",
    alt: "Fog over morning harbor",
    date: "May 2026",
    dateMs: Date.UTC(2026, 4, 20),
    location: "San Francisco",
    caption: "Early ferry crossing.",
    category: "travel",
  },
  {
    slug: "portrait-featured",
    title: "Studio Desk Portrait",
    image: "/images/uploads/portrait.jpg",
    alt: "Portrait at studio desk",
    date: "Jun 2026",
    dateMs: Date.UTC(2026, 5, 1),
    category: "portrait",
    featured: true,
  },
  {
    slug: "draft-photo",
    title: "Hidden Frame",
    image: "/images/uploads/draft.jpg",
    alt: "Draft frame",
    date: "Dec 2026",
    dateMs: Date.UTC(2026, 11, 1),
    category: "travel",
    featured: true,
    draft: true,
  },
]

test("sortPhotos excludes drafts and sorts newest-first with title tie-breaker", () => {
  const tiedDate = Date.UTC(2026, 3, 10)
  const sorted = sortPhotos([
    {
      slug: "b-slug",
      title: "Zebra",
      image: "/z.jpg",
      alt: "Z",
      date: "Apr 2026",
      dateMs: tiedDate,
      category: "everyday",
    },
    {
      slug: "a-slug",
      title: "Alpha",
      image: "/a.jpg",
      alt: "A",
      date: "Apr 2026",
      dateMs: tiedDate,
      category: "everyday",
    },
    {
      slug: "draft-slug",
      title: "Draft",
      image: "/d.jpg",
      alt: "D",
      date: "May 2026",
      dateMs: Date.UTC(2026, 4, 1),
      category: "everyday",
      draft: true,
    },
  ])

  assert.equal(sorted.length, 2)
  assert.equal(sorted[0]?.slug, "a-slug")
  assert.equal(sorted[1]?.slug, "b-slug")
})

test("pickFeaturedPhoto prefers non-portrait featured photo, then featured portrait, then newest", () => {
  assert.equal(pickFeaturedPhoto([]), undefined)
  assert.equal(pickFeaturedPhoto(SAMPLE_PHOTOS)?.slug, "older-craft")

  const onlyPortraitFeatured = SAMPLE_PHOTOS.filter((p) => p.slug !== "older-craft")
  assert.equal(pickFeaturedPhoto(onlyPortraitFeatured)?.slug, "portrait-featured")

  const noFeatured = SAMPLE_PHOTOS.filter((p) => !p.featured)
  assert.equal(pickFeaturedPhoto(noFeatured)?.slug, "newest-travel")
})

test("pickPortraitPhoto prefers featured portrait, then portrait, then featured fallback", () => {
  assert.equal(pickPortraitPhoto([]), undefined)
  assert.equal(pickPortraitPhoto(SAMPLE_PHOTOS)?.slug, "portrait-featured")

  const unfeaturedPortrait: readonly PhotoItem[] = [
    ...SAMPLE_PHOTOS.filter((p) => p.slug !== "portrait-featured"),
    {
      slug: "regular-portrait",
      title: "Regular Portrait",
      image: "/p.jpg",
      alt: "Portrait",
      date: "Feb 2026",
      dateMs: Date.UTC(2026, 1, 1),
      category: "portrait",
    },
  ]
  assert.equal(pickPortraitPhoto(unfeaturedPortrait)?.slug, "regular-portrait")

  const noPortraits = SAMPLE_PHOTOS.filter((p) => p.category !== "portrait")
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
    SAMPLE_PHOTOS,
  )

  assert.equal(thumbnails.length, 2)
  assert.equal(thumbnails[0]?.destination, "travel")
  assert.equal(thumbnails[0]?.href, "/travel/zurich/")
  assert.equal(thumbnails[0]?.imageSrc, "/images/uploads/zurich.jpg")
  assert.equal(thumbnails[0]?.imageAlt, "Limmat river in autumn")
  assert.equal(thumbnails[0]?.stampCode, "ZRH")

  assert.equal(thumbnails[1]?.destination, "gallery")
  assert.equal(thumbnails[1]?.href, "/photos/#plate-newest-travel")
  assert.equal(thumbnails[1]?.imageSrc, "/images/uploads/harbor.jpg")
  assert.equal(thumbnails[1]?.subtitle, "San Francisco")
  assert.equal(thumbnails[1]?.summary, "Early ferry crossing.")
})
