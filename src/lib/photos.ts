import type { PhotoItem, TravelThumbnailItem } from "../types/domain.ts"

export type TravelThumbnailTripInput = {
  readonly slug: string
  readonly title: string
  readonly city: string
  readonly country: string
  readonly stampCode: string
  readonly date: string
  readonly dateMs: number
  readonly summary: string
  readonly coverImage?: string
  readonly coverImageAlt?: string
  readonly draft?: boolean
}

export function sortPhotos(photos: readonly PhotoItem[]): readonly PhotoItem[] {
  return photos
    .filter((photo) => photo.draft !== true)
    .slice()
    .sort((a, b) => {
      if (b.dateMs !== a.dateMs) {
        return b.dateMs - a.dateMs
      }
      const titleCmp = a.title.localeCompare(b.title)
      if (titleCmp !== 0) {
        return titleCmp
      }
      return a.slug.localeCompare(b.slug)
    })
}

export function pickFeaturedPhoto(photos: readonly PhotoItem[]): PhotoItem | undefined {
  const sorted = sortPhotos(photos)
  if (sorted.length === 0) {
    return undefined
  }
  return (
    sorted.find((photo) => photo.featured === true && photo.category !== "portrait") ??
    sorted.find((photo) => photo.featured === true) ??
    sorted[0]
  )
}

export function pickPortraitPhoto(photos: readonly PhotoItem[]): PhotoItem | undefined {
  const sorted = sortPhotos(photos)
  if (sorted.length === 0) {
    return undefined
  }
  return (
    sorted.find((photo) => photo.category === "portrait" && photo.featured === true) ??
    sorted.find((photo) => photo.category === "portrait") ??
    pickFeaturedPhoto(sorted)
  )
}

export function buildTravelThumbnails(
  trips: readonly TravelThumbnailTripInput[],
  photos: readonly PhotoItem[],
): readonly TravelThumbnailItem[] {
  const tripItems: readonly TravelThumbnailItem[] = trips
    .filter((trip) => trip.draft !== true)
    .map((trip) => ({
      id: `travel-${trip.slug}`,
      title: trip.title,
      subtitle: `${trip.city}, ${trip.country}`,
      dateLabel: trip.date,
      dateMs: trip.dateMs,
      destination: "travel" as const,
      href: `/travel/${trip.slug}/`,
      stampCode: trip.stampCode,
      summary: trip.summary,
      ...(trip.coverImage
        ? {
            imageSrc: trip.coverImage,
            imageAlt: trip.coverImageAlt ?? trip.title,
          }
        : {}),
    }))

  const galleryItems: readonly TravelThumbnailItem[] = sortPhotos(photos)
    .filter((photo) => photo.category === "travel")
    .map((photo) => ({
      id: `photo-${photo.slug}`,
      title: photo.title,
      subtitle: photo.location ?? "Photo Gallery",
      dateLabel: photo.date,
      dateMs: photo.dateMs,
      destination: "gallery" as const,
      href: `/photos/#plate-${photo.slug}`,
      imageSrc: photo.image,
      imageAlt: photo.alt,
      ...(photo.caption ? { summary: photo.caption } : {}),
    }))

  return [...tripItems, ...galleryItems].sort((a, b) => {
    if (b.dateMs !== a.dateMs) {
      return b.dateMs - a.dateMs
    }
    return a.id.localeCompare(b.id)
  })
}
