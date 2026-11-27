import type {
  PhotoAlbum,
  PhotoAspectRatio,
  PhotoItem,
  TravelThumbnailItem,
} from "../types/domain.ts"

export const DEFAULT_ALBUM_NAME = "Field Notes"

export const PHOTO_ASPECT_RATIOS: Readonly<Record<PhotoAspectRatio, string>> = {
  landscape: "4 / 3",
  portrait: "3 / 4",
  square: "1 / 1",
  wide: "16 / 10",
}

export type PhotoAlbumSummary = {
  readonly name: string
  readonly count: number
}

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

export function slugifyAlbumName(name: string): string {
  const normalized = name
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return normalized.length > 0 ? normalized : "field-notes"
}

export function resolvePhotoAlbumName(album: string | undefined): string {
  const trimmed = album?.trim()
  return trimmed && trimmed.length > 0 ? trimmed : DEFAULT_ALBUM_NAME
}

export function buildAlbumHref(albumSlug: string): string {
  return `/photos/${albumSlug}/`
}

export function buildPhotoHref(slug: string, album?: string): string {
  const albumSlug = slugifyAlbumName(resolvePhotoAlbumName(album))
  return `/photos/${albumSlug}/#photo-${slug}`
}

export function resolvePhotoThumbnail(
  photo: Pick<PhotoItem, "imageUrl" | "thumbnailUrl">,
): string {
  const candidate = photo.thumbnailUrl?.trim()
  if (candidate && candidate.length > 0) {
    return candidate
  }
  return photo.imageUrl
}

export function sortPhotos(photos: readonly PhotoItem[]): readonly PhotoItem[] {
  return photos
    .filter((photo) => photo.draft !== true)
    .slice()
    .sort((a, b) => {
      const featuredDiff = Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      if (featuredDiff !== 0) {
        return featuredDiff
      }
      if (b.dateMs !== a.dateMs) {
        return b.dateMs - a.dateMs
      }
      const dateDiff = b.dateIso.localeCompare(a.dateIso)
      if (dateDiff !== 0) {
        return dateDiff
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
      href: buildPhotoHref(photo.slug, photo.album),
      imageSrc: resolvePhotoThumbnail(photo),
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

function formatAlbumDateRange(photos: readonly PhotoItem[]): string {
  const chronological = [...photos].sort((a, b) => a.dateIso.localeCompare(b.dateIso))
  const oldest = chronological[0]
  const newest = chronological[chronological.length - 1]
  if (!oldest || !newest) {
    return ""
  }
  if (oldest.date === newest.date) {
    return oldest.date
  }
  const oldestYear = oldest.dateIso.slice(0, 4)
  const newestYear = newest.dateIso.slice(0, 4)
  if (/^\d{4}$/.test(oldestYear) && /^\d{4}$/.test(newestYear) && oldestYear !== newestYear) {
    return `${oldestYear} – ${newestYear}`
  }
  return `${oldest.date} – ${newest.date}`
}

export function buildPhotoAlbums(photos: readonly PhotoItem[]): readonly PhotoAlbum[] {
  const sorted = sortPhotos(photos)
  if (sorted.length === 0) {
    return []
  }

  const groups = new Map<
    string,
    {
      readonly slug: string
      readonly name: string
      readonly photos: PhotoItem[]
    }
  >()

  for (const photo of sorted) {
    const name = resolvePhotoAlbumName(photo.album)
    const slug = slugifyAlbumName(name)
    const existing = groups.get(slug)
    if (existing) {
      existing.photos.push(photo)
    } else {
      groups.set(slug, {
        slug,
        name,
        photos: [photo],
      })
    }
  }

  const defaultSlug = slugifyAlbumName(DEFAULT_ALBUM_NAME)

  const albumsWithSortMeta = [...groups.values()].flatMap((group) => {
    const firstPhoto = group.photos[0]
    if (!firstPhoto) {
      return []
    }
    const coverPhoto = group.photos.find((photo) => photo.featured === true) ?? firstPhoto
    const previewPhotos: readonly PhotoItem[] = [
      coverPhoto,
      ...group.photos.filter((photo) => photo.slug !== coverPhoto.slug).slice(0, 2),
    ]

    const locationSet = new Set<string>()
    for (const photo of group.photos) {
      const trimmedLocation = photo.location?.trim()
      if (trimmedLocation && trimmedLocation.length > 0) {
        locationSet.add(trimmedLocation)
        if (locationSet.size >= 3) {
          break
        }
      }
    }

    let newestDateIso = firstPhoto.dateIso
    for (const photo of group.photos) {
      if (photo.dateIso.localeCompare(newestDateIso) > 0) {
        newestDateIso = photo.dateIso
      }
    }

    const album: PhotoAlbum = {
      slug: group.slug,
      name: group.name,
      count: group.photos.length,
      coverPhoto,
      previewPhotos,
      dateRange: formatAlbumDateRange(group.photos),
      locations: [...locationSet],
      photos: group.photos,
    }

    return [
      {
        album,
        newestDateIso,
        isDefault: group.slug === defaultSlug,
      },
    ]
  })

  return albumsWithSortMeta
    .sort((a, b) => {
      const defaultDiff = Number(a.isDefault) - Number(b.isDefault)
      if (defaultDiff !== 0) {
        return defaultDiff
      }
      const dateDiff = b.newestDateIso.localeCompare(a.newestDateIso)
      if (dateDiff !== 0) {
        return dateDiff
      }
      return a.album.name.localeCompare(b.album.name)
    })
    .map((entry) => entry.album)
}

export function filterPhotoAlbums(
  albums: readonly PhotoAlbum[],
  query: string,
): readonly PhotoAlbum[] {
  const normalizedQuery = query.trim().toLowerCase()
  if (normalizedQuery.length === 0) {
    return albums
  }

  return albums.filter((album) => {
    const haystackParts: string[] = [
      album.name,
      album.dateRange,
      ...album.locations,
      ...album.photos.flatMap((photo) => [
        photo.title,
        photo.caption ?? "",
        photo.location ?? "",
        photo.camera ?? "",
        ...photo.tags,
      ]),
    ]
    return haystackParts.join(" ").toLowerCase().includes(normalizedQuery)
  })
}

export function getPhotoAlbums(photos: readonly PhotoItem[]): readonly PhotoAlbumSummary[] {
  const counts = new Map<string, number>()
  for (const photo of photos) {
    if (photo.draft === true) continue
    const album = photo.album?.trim()
    if (album && album.length > 0) {
      counts.set(album, (counts.get(album) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count
      }
      return a.name.localeCompare(b.name)
    })
}

export function filterPhotos(
  photos: readonly PhotoItem[],
  album: string | "all",
  query: string,
): readonly PhotoItem[] {
  const normalizedAlbum = album === "all" ? "all" : album.trim()
  const normalizedQuery = query.trim().toLowerCase()

  return photos.filter((photo) => {
    if (photo.draft === true) {
      return false
    }

    if (normalizedAlbum !== "all") {
      const photoAlbum = photo.album?.trim() ?? ""
      if (photoAlbum !== normalizedAlbum) {
        return false
      }
    }

    if (normalizedQuery.length === 0) {
      return true
    }

    const haystack = [
      photo.title,
      photo.caption ?? "",
      photo.location ?? "",
      photo.album ?? "",
      photo.camera ?? "",
      ...photo.tags,
    ]
      .join(" ")
      .toLowerCase()

    return haystack.includes(normalizedQuery)
  })
}

export function getAdjacentPhotoIndex(
  currentIndex: number,
  total: number,
  direction: "prev" | "next",
): number {
  if (total <= 0) {
    return -1
  }
  const delta = direction === "next" ? 1 : -1
  return (((currentIndex + delta) % total) + total) % total
}
