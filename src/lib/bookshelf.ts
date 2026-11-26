import type { BookItem, BookSpineTheme, BookStatus } from "../types/domain.ts"

export const BOOK_STATUS_ORDER: Readonly<Record<BookStatus, number>> = {
  reading: 0,
  favorite: 1,
  finished: 2,
  queued: 3,
}

export type BookStatusMeta = {
  readonly label: string
  readonly shortLabel: string
  readonly description: string
}

export const BOOK_STATUS_META: Readonly<Record<BookStatus, BookStatusMeta>> = {
  reading: {
    label: "Currently Reading",
    shortLabel: "Reading",
    description: "Open on the desk right now",
  },
  favorite: {
    label: "All-Time Favorite",
    shortLabel: "Favorites",
    description: "Books I return to and recommend often",
  },
  finished: {
    label: "Finished",
    shortLabel: "Finished",
    description: "Completed with notes in the margins",
  },
  queued: {
    label: "On the Stack",
    shortLabel: "Queued",
    description: "Waiting on the bedside table",
  },
}

export type SpinePalette = {
  readonly bg: string
  readonly text: string
  readonly band: string
  readonly border: string
}

export const SPINE_PALETTES: Readonly<Record<BookSpineTheme, SpinePalette>> = {
  burgundy: {
    bg: "#6B242B",
    text: "#F7EFE3",
    band: "#D4A35A",
    border: "#4B161C",
  },
  forest: {
    bg: "#23473C",
    text: "#F3EFE6",
    band: "#C9A66B",
    border: "#163028",
  },
  navy: {
    bg: "#21344D",
    text: "#F2EFE8",
    band: "#D4AF7A",
    border: "#142234",
  },
  ochre: {
    bg: "#A46F2A",
    text: "#1B1611",
    band: "#3B2814",
    border: "#774E19",
  },
  terracotta: {
    bg: "#A6452E",
    text: "#FBF5EC",
    band: "#E8C89B",
    border: "#792E1C",
  },
  slate: {
    bg: "#42525E",
    text: "#F4F1EA",
    band: "#D2B48C",
    border: "#2B3740",
  },
  charcoal: {
    bg: "#2A2724",
    text: "#F2ECE1",
    band: "#C87D55",
    border: "#171513",
  },
  plum: {
    bg: "#4E2C46",
    text: "#F7EFF4",
    band: "#D9B382",
    border: "#341B2E",
  },
}

export type SpineMetrics = {
  readonly widthPx: number
  readonly heightPx: number
  readonly bandOffsetPx: number
}

function stableHash(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 997
  }
  return Math.abs(hash)
}

const MIN_SPINE_PAGES = 60
const MAX_SPINE_PAGES = 1600
const MIN_SPINE_SQRT = Math.sqrt(MIN_SPINE_PAGES)
const MAX_SPINE_SQRT = Math.sqrt(MAX_SPINE_PAGES)

export function computeSpineMetrics(pages: number | undefined, title: string): SpineMetrics {
  const safePages =
    typeof pages === "number" && Number.isFinite(pages) && pages > 0 ? pages : 280
  const clampedPages = Math.min(MAX_SPINE_PAGES, Math.max(MIN_SPINE_PAGES, safePages))
  const t = (Math.sqrt(clampedPages) - MIN_SPINE_SQRT) / (MAX_SPINE_SQRT - MIN_SPINE_SQRT)
  const hash = stableHash(title)

  const widthPx = Math.min(74, Math.max(34, Math.round(34 + t * 40)))
  const heightRaw = 192 + Math.round(t * 14) + (hash % 47)
  const heightPx = Math.min(254, Math.max(192, heightRaw))
  const bandOffsetPx = 14 + (hash % 12)

  return { widthPx, heightPx, bandOffsetPx }
}

export function formatSpineTitle(title: string, heightPx: number): string {
  const trimmed = title.trim()
  const maxChars = Math.max(16, Math.min(34, Math.floor((heightPx - 76) / 6)))
  if (trimmed.length <= maxChars) {
    return trimmed
  }

  const rawSlice = trimmed.slice(0, maxChars - 1)
  const boundaryWindow = trimmed.slice(0, maxChars)
  const minBoundary = Math.floor(maxChars * 0.55)
  const lastSpace = boundaryWindow.lastIndexOf(" ")
  const candidate = lastSpace >= minBoundary ? boundaryWindow.slice(0, lastSpace) : rawSlice
  const cleaned = candidate.replace(/[\s:,;\-–—/(]+$/, "")
  const base = cleaned.length > 0 ? cleaned : rawSlice.trimEnd()

  return `${base.length > 0 ? base : rawSlice}…`
}

export type ShelfSection = {
  readonly key: string
  readonly label: string
  readonly kind: "reading" | "library"
  readonly books: readonly BookItem[]
}

function packRows(
  items: readonly BookItem[],
  maxWidthPx: number,
  gapPx: number,
): readonly (readonly BookItem[])[] {
  if (items.length === 0) {
    return []
  }

  const rows: BookItem[][] = []
  let currentRow: BookItem[] = []
  let currentWidth = 0

  for (const book of items) {
    const bookWidth = computeSpineMetrics(book.pages, book.title).widthPx
    const nextWidth = currentRow.length === 0 ? bookWidth : currentWidth + gapPx + bookWidth

    if (currentRow.length > 0 && nextWidth > maxWidthPx) {
      rows.push(currentRow)
      currentRow = [book]
      currentWidth = bookWidth
    } else {
      currentRow.push(book)
      currentWidth = nextWidth
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  return rows
}

export function packBooksIntoShelves(
  books: readonly BookItem[],
  shelfWidthPx: number,
  gapPx = 8,
): readonly ShelfSection[] {
  const safeWidth = Math.max(
    200,
    Number.isFinite(shelfWidthPx) ? Math.floor(shelfWidthPx) : 200,
  )
  const safeGap = Number.isFinite(gapPx) && gapPx >= 0 ? gapPx : 8

  const reading = books.filter((book) => book.status === "reading")
  const rest = books.filter((book) => book.status !== "reading")

  const sections: ShelfSection[] = []

  const readingRows = packRows(reading, safeWidth, safeGap)
  for (let idx = 0; idx < readingRows.length; idx += 1) {
    const row = readingRows[idx]
    const indexLabel = String(idx + 1).padStart(2, "0")
    sections.push({
      key: `reading-${idx + 1}`,
      label: readingRows.length > 1 ? `Currently Reading · ${indexLabel}` : "Currently Reading",
      kind: "reading",
      books: row,
    })
  }

  const libraryRows = packRows(rest, safeWidth, safeGap)
  for (let idx = 0; idx < libraryRows.length; idx += 1) {
    const row = libraryRows[idx]
    const indexLabel = String(idx + 1).padStart(2, "0")
    sections.push({
      key: `shelf-${idx + 1}`,
      label: `Shelf ${indexLabel}`,
      kind: "library",
      books: row,
    })
  }

  return sections
}

export function sortBooks(books: readonly BookItem[]): readonly BookItem[] {
  return [...books].sort((a, b) => {
    const statusDiff = BOOK_STATUS_ORDER[a.status] - BOOK_STATUS_ORDER[b.status]
    if (statusDiff !== 0) {
      return statusDiff
    }

    const timeA = a.dateRead ? new Date(a.dateRead).getTime() : 0
    const timeB = b.dateRead ? new Date(b.dateRead).getTime() : 0
    if (timeA !== timeB) {
      return timeB - timeA
    }

    return a.title.localeCompare(b.title)
  })
}

export function cleanIsbn(raw: string | undefined): string | null {
  if (!raw) {
    return null
  }
  const stripped = raw
    .trim()
    .replace(/^=+/, "")
    .replace(/^["']+|["']+$/g, "")
    .replace(/[-\s]/g, "")
    .toUpperCase()

  if (/^\d{13}$/.test(stripped) || /^\d{9}[\dX]$/.test(stripped)) {
    return stripped
  }
  return null
}

export function resolveBookCoverUrl(
  book: Pick<BookItem, "coverUrl" | "isbn">,
): string | null {
  const custom = book.coverUrl?.trim()
  if (custom && custom.length > 0) {
    return custom
  }
  const cleaned = cleanIsbn(book.isbn)
  if (!cleaned) {
    return null
  }
  return `https://covers.openlibrary.org/b/isbn/${cleaned}-L.jpg?default=false`
}

export function deriveYearRead(
  dateRead: Date | string | undefined,
  explicitYearRead?: number,
): number | null {
  if (
    typeof explicitYearRead === "number" &&
    Number.isInteger(explicitYearRead) &&
    explicitYearRead >= 1900 &&
    explicitYearRead <= 2100
  ) {
    return explicitYearRead
  }
  if (!dateRead) {
    return null
  }
  const parsed = dateRead instanceof Date ? dateRead : new Date(dateRead)
  const year = parsed.getFullYear()
  return Number.isFinite(year) ? year : null
}

export type BookYearGroup = {
  readonly key: string
  readonly label: string
  readonly year: number | null
  readonly books: readonly BookItem[]
}

export function getAvailableYears(books: readonly BookItem[]): readonly number[] {
  const years = new Set<number>()
  for (const book of books) {
    if (book.yearRead !== null) {
      years.add(book.yearRead)
    }
  }
  return [...years].sort((a, b) => b - a)
}

export function groupBooksByYear(books: readonly BookItem[]): readonly BookYearGroup[] {
  const reading = books.filter((book) => book.status === "reading")
  const rest = books.filter((book) => book.status !== "reading")

  const byYear = new Map<number, BookItem[]>()
  const undated: BookItem[] = []

  for (const book of rest) {
    if (book.yearRead !== null) {
      const bucket = byYear.get(book.yearRead)
      if (bucket) {
        bucket.push(book)
      } else {
        byYear.set(book.yearRead, [book])
      }
    } else {
      undated.push(book)
    }
  }

  const groups: BookYearGroup[] = []

  if (reading.length > 0) {
    groups.push({
      key: "reading",
      label: "Currently Reading",
      year: null,
      books: reading,
    })
  }

  const sortedYears = [...byYear.keys()].sort((a, b) => b - a)
  for (const year of sortedYears) {
    const yearBooks = byYear.get(year)
    if (yearBooks && yearBooks.length > 0) {
      groups.push({
        key: String(year),
        label: String(year),
        year,
        books: yearBooks,
      })
    }
  }

  if (undated.length > 0) {
    groups.push({
      key: "undated",
      label: "Undated",
      year: null,
      books: undated,
    })
  }

  return groups
}

export function filterBooks(
  books: readonly BookItem[],
  status: BookStatus | "all",
  query: string,
  yearFilter: number | "all" = "all",
): readonly BookItem[] {
  const normalizedQuery = query.trim().toLowerCase()

  return books.filter((book) => {
    if (status !== "all" && book.status !== status) {
      return false
    }

    if (yearFilter !== "all" && book.yearRead !== yearFilter) {
      return false
    }

    if (normalizedQuery.length === 0) {
      return true
    }

    const haystack = [
      book.title,
      book.author,
      book.summary,
      book.quote ?? "",
      book.isbn ?? "",
      book.yearRead !== null ? String(book.yearRead) : "",
      ...book.tags,
    ]
      .join(" ")
      .toLowerCase()

    return haystack.includes(normalizedQuery)
  })
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function formatInlineMarkdown(text: string): string {
  const escaped = escapeHtml(text)
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
}

export function buildBookHref(slug: string): string {
  return `/books/#book-${slug}`
}

export function formatRating(rating: number | undefined): string {
  if (!rating || rating < 1) {
    return ""
  }
  const clamped = Math.min(5, Math.max(1, Math.round(rating)))
  return "★".repeat(clamped) + "☆".repeat(5 - clamped)
}

export function getAuthorInitials(author: string): string {
  const parts = author.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ""
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase()
  const first = parts[0][0] ?? ""
  const last = parts[parts.length - 1][0] ?? ""
  return `${first}.${last}.`.toUpperCase()
}

export function renderBookNotesHtml(markdown: string): string {
  const trimmed = markdown.trim()
  if (trimmed.length === 0) {
    return ""
  }

  const blocks = trimmed.split(/\n{2,}/)
  return blocks
    .map((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)

      if (lines.length === 0) {
        return ""
      }

      if (lines.every((line) => line.startsWith("- "))) {
        const items = lines
          .map((line) => `<li>${formatInlineMarkdown(line.slice(2))}</li>`)
          .join("")
        return `<ul>${items}</ul>`
      }

      return `<p>${formatInlineMarkdown(lines.join(" "))}</p>`
    })
    .filter((html) => html.length > 0)
    .join("")
}

