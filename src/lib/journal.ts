import type { BookStatus, RecentJournalEntry } from "../types/domain.ts"

export type JournalBlogInput = {
  readonly slug: string
  readonly title: string
  readonly date: Date
  readonly heroImage?: string
  readonly heroImageAlt?: string
  readonly draft?: boolean
}

export type JournalProjectInput = {
  readonly slug: string
  readonly title: string
  readonly date: Date
  readonly draft?: boolean
}

export type JournalTravelInput = {
  readonly slug: string
  readonly title: string
  readonly date: Date
  readonly coverImage?: string
  readonly coverImageAlt?: string
  readonly draft?: boolean
}

export type JournalBookInput = {
  readonly slug: string
  readonly title: string
  readonly status?: BookStatus
  readonly dateRead?: Date
  readonly yearRead?: number
  readonly coverUrl?: string
  readonly draft?: boolean
}

export type RecentJournalInputs = {
  readonly blog: readonly JournalBlogInput[]
  readonly projects: readonly JournalProjectInput[]
  readonly travel: readonly JournalTravelInput[]
  readonly books: readonly JournalBookInput[]
}

function formatMonthYear(date: Date): string {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

function resolveBookTiming(book: JournalBookInput): {
  readonly dateLabel: string
  readonly dateMs: number
} {
  if (book.dateRead instanceof Date && !Number.isNaN(book.dateRead.getTime())) {
    return {
      dateLabel: formatMonthYear(book.dateRead),
      dateMs: book.dateRead.getTime(),
    }
  }
  if (typeof book.yearRead === "number" && Number.isFinite(book.yearRead)) {
    return {
      dateLabel: String(book.yearRead),
      dateMs: Date.UTC(book.yearRead, 0, 1),
    }
  }
  return {
    dateLabel: book.status === "reading" ? "Reading" : "Shelved",
    dateMs: 0,
  }
}

export function buildRecentJournalEntries(
  inputs: RecentJournalInputs,
  limit = 4,
): readonly RecentJournalEntry[] {
  const safeLimit = Math.max(0, Math.floor(limit))
  if (safeLimit === 0) {
    return []
  }

  const blogEntries: readonly RecentJournalEntry[] = inputs.blog
    .filter((entry) => entry.draft !== true)
    .map((entry) => ({
      kind: "blog" as const,
      slug: entry.slug,
      title: entry.title,
      href: `/blog/${entry.slug}/`,
      dateLabel: formatMonthYear(entry.date),
      dateMs: entry.date.getTime(),
      ...(entry.heroImage
        ? {
            thumbnailSrc: entry.heroImage,
            thumbnailAlt: entry.heroImageAlt ?? entry.title,
          }
        : {}),
    }))

  const projectEntries: readonly RecentJournalEntry[] = inputs.projects
    .filter((entry) => entry.draft !== true)
    .map((entry) => ({
      kind: "project" as const,
      slug: entry.slug,
      title: entry.title,
      href: `/projects/${entry.slug}/`,
      dateLabel: formatMonthYear(entry.date),
      dateMs: entry.date.getTime(),
    }))

  const travelEntries: readonly RecentJournalEntry[] = inputs.travel
    .filter((entry) => entry.draft !== true)
    .map((entry) => ({
      kind: "travel" as const,
      slug: entry.slug,
      title: entry.title,
      href: `/travel/${entry.slug}/`,
      dateLabel: formatMonthYear(entry.date),
      dateMs: entry.date.getTime(),
      ...(entry.coverImage
        ? {
            thumbnailSrc: entry.coverImage,
            thumbnailAlt: entry.coverImageAlt ?? entry.title,
          }
        : {}),
    }))

  const bookEntries: readonly RecentJournalEntry[] = inputs.books
    .filter((entry) => entry.draft !== true)
    .map((entry) => {
      const timing = resolveBookTiming(entry)
      return {
        kind: "book" as const,
        slug: entry.slug,
        title: entry.title,
        href: `/books/#book-${entry.slug}`,
        dateLabel: timing.dateLabel,
        dateMs: timing.dateMs,
        ...(entry.coverUrl
          ? {
              thumbnailSrc: entry.coverUrl,
              thumbnailAlt: entry.title,
            }
          : {}),
      }
    })

  return [...blogEntries, ...projectEntries, ...travelEntries, ...bookEntries]
    .sort((a, b) => {
      if (b.dateMs !== a.dateMs) {
        return b.dateMs - a.dateMs
      }
      const slugCmp = a.slug.localeCompare(b.slug)
      if (slugCmp !== 0) {
        return slugCmp
      }
      return a.kind.localeCompare(b.kind)
    })
    .slice(0, safeLimit)
}
