import type { PhotoAspectRatio, PhotoItem } from "../types/domain.ts"

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

export function buildPhotoHref(slug: string): string {
  return `/photos/#photo-${slug}`
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
  return [...photos].sort((a, b) => {
    const featuredDiff = Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    if (featuredDiff !== 0) {
      return featuredDiff
    }
    const dateDiff = b.dateIso.localeCompare(a.dateIso)
    if (dateDiff !== 0) {
      return dateDiff
    }
    return a.title.localeCompare(b.title)
  })
}

export function getPhotoAlbums(photos: readonly PhotoItem[]): readonly PhotoAlbumSummary[] {
  const counts = new Map<string, number>()
  for (const photo of photos) {
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
