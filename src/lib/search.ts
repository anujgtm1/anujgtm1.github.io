import type {
  BlogItem,
  BookItem,
  PhotoItem,
  ProjectItem,
  SearchItem,
  TravelItem,
} from "../types/domain.ts"
import { buildPhotoHref } from "./photos.ts"

export type SearchKindMeta = {
  readonly label: string
  readonly plural: string
}

export const SEARCH_KIND_META: Readonly<Record<SearchItem["kind"], SearchKindMeta>> = {
  blog: { label: "Essay", plural: "Essays" },
  project: { label: "Project", plural: "Projects" },
  book: { label: "Book", plural: "Books" },
  travel: { label: "Field Log", plural: "Travel" },
  photo: { label: "Photo", plural: "Photos" },
}

export function normalizeBlogToSearchItem(item: BlogItem): Extract<SearchItem, { kind: "blog" }> {
  return {
    kind: "blog",
    id: `blog:${item.slug}`,
    title: item.title,
    subtitle: "Essay",
    summary: item.summary,
    href: `/blog/${item.slug}/`,
    date: item.date,
    tags: item.tags,
  }
}

export function normalizeProjectToSearchItem(
  item: ProjectItem,
): Extract<SearchItem, { kind: "project" }> {
  return {
    kind: "project",
    id: `project:${item.slug}`,
    title: item.title,
    subtitle: item.role ?? "Engineering Project",
    summary: item.summary,
    href: `/projects/${item.slug}/`,
    date: item.date,
    tags: item.tags,
    status: item.status,
  }
}

export function normalizeBookToSearchItem(item: BookItem): Extract<SearchItem, { kind: "book" }> {
  return {
    kind: "book",
    id: `book:${item.slug}`,
    title: item.title,
    subtitle: item.author,
    summary: item.summary,
    href: `/books/#book-${item.slug}`,
    date: item.dateRead,
    tags: item.tags,
    status: item.status,
    author: item.author,
  }
}

export function normalizeTravelToSearchItem(
  item: TravelItem,
): Extract<SearchItem, { kind: "travel" }> {
  return {
    kind: "travel",
    id: `travel:${item.slug}`,
    title: `${item.city}, ${item.country}`,
    subtitle: `${item.stampCode} · ${item.region}`,
    summary: item.summary,
    href: `/travel/${item.slug}/`,
    date: item.date,
    tags: [item.region, item.country, item.stampCode, ...item.highlights],
    region: item.region,
    stampCode: item.stampCode,
  }
}

export function normalizePhotoToSearchItem(
  item: PhotoItem,
): Extract<SearchItem, { kind: "photo" }> {
  const subtitleParts = [item.album, item.location, item.camera]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part && part.length > 0))

  const tagSet = new Set<string>(item.tags)
  if (item.album?.trim()) {
    tagSet.add(item.album.trim())
  }
  if (item.location?.trim()) {
    tagSet.add(item.location.trim())
  }
  if (item.camera?.trim()) {
    tagSet.add(item.camera.trim())
  }

  return {
    kind: "photo",
    id: `photo:${item.slug}`,
    title: item.title,
    subtitle: subtitleParts.length > 0 ? subtitleParts.join(" · ") : "Photograph",
    summary: item.caption?.trim() || item.alt,
    href: buildPhotoHref(item.slug, item.album),
    date: item.date,
    tags: [...tagSet],
    album: item.album,
    location: item.location,
  }
}

export function filterSearchItemsByKind(
  items: readonly SearchItem[],
  kind: SearchItem["kind"] | "all",
): readonly SearchItem[] {
  if (kind === "all") {
    return items
  }
  return items.filter((item) => item.kind === kind)
}
