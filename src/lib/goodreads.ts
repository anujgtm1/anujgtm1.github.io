import type { BookSpineTheme, BookStatus } from "../types/domain.ts"
import { cleanIsbn } from "./bookshelf.ts"

const SPINE_THEMES: readonly BookSpineTheme[] = [
  "burgundy",
  "forest",
  "navy",
  "ochre",
  "terracotta",
  "slate",
  "charcoal",
  "plum",
] as const

export type GoodreadsBookRecord = {
  readonly slug: string
  readonly title: string
  readonly author: string
  readonly status: BookStatus
  readonly rating?: number
  readonly dateRead?: string
  readonly yearRead: number | null
  readonly pages?: number
  readonly isbn?: string
  readonly spineTheme: BookSpineTheme
  readonly tags: readonly string[]
  readonly summary: string
  readonly notes: string
}

export function cleanGoodreadsIsbn(raw: string | undefined): string | undefined {
  const cleaned = cleanIsbn(raw)
  return cleaned ?? undefined
}

export function slugifyBookTitle(title: string): string {
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64)
  return slug.length > 0 ? slug : "untitled-book"
}

function pickSpineTheme(title: string): BookSpineTheme {
  let hash = 0
  for (let i = 0; i < title.length; i += 1) {
    hash = (hash * 31 + title.charCodeAt(i)) % 997
  }
  return SPINE_THEMES[Math.abs(hash) % SPINE_THEMES.length] ?? "charcoal"
}

export function parseCsvRows(csvText: string): readonly (readonly string[])[] {
  const input = csvText.replace(/^\uFEFF/, "")
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentField = ""
  let inQuotes = false

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i]
    const next = input[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        currentField += '"'
        i += 1
      } else if (ch === '"') {
        inQuotes = false
      } else {
        currentField += ch
      }
      continue
    }

    if (ch === '"') {
      inQuotes = true
    } else if (ch === ",") {
      currentRow.push(currentField)
      currentField = ""
    } else if (ch === "\r" && next === "\n") {
      currentRow.push(currentField)
      rows.push(currentRow)
      currentRow = []
      currentField = ""
      i += 1
    } else if (ch === "\n" || ch === "\r") {
      currentRow.push(currentField)
      rows.push(currentRow)
      currentRow = []
      currentField = ""
    } else {
      currentField += ch
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField)
    rows.push(currentRow)
  }

  return rows.filter((row) => row.some((cell) => cell.trim().length > 0))
}

function parseGoodreadsDate(raw: string | undefined): {
  readonly isoDate?: string
  readonly yearRead: number | null
} {
  if (!raw) {
    return { yearRead: null }
  }
  const trimmed = raw.trim()
  const match = /^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/.exec(trimmed)
  if (!match) {
    return { yearRead: null }
  }
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  if (!Number.isInteger(year) || month < 1 || month > 12 || day < 1 || day > 31) {
    return { yearRead: null }
  }
  const isoDate = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  return { isoDate, yearRead: year }
}

function mapExclusiveShelf(shelf: string, hasDateRead: boolean): BookStatus {
  const normalized = shelf.trim().toLowerCase()
  if (normalized === "currently-reading") {
    return "reading"
  }
  if (normalized === "to-read") {
    return "queued"
  }
  if (normalized === "read" || hasDateRead) {
    return "finished"
  }
  return "queued"
}

function cleanReviewText(raw: string | undefined): string {
  if (!raw) {
    return ""
  }
  return raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function parseBookshelfTags(raw: string | undefined): readonly string[] {
  if (!raw) {
    return []
  }
  const ignored = new Set(["read", "currently-reading", "to-read"])
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0 && !ignored.has(part.toLowerCase()))
}

export function parseGoodreadsCsv(csvText: string): readonly GoodreadsBookRecord[] {
  const rows = parseCsvRows(csvText)
  if (rows.length < 2) {
    return []
  }

  const header = rows[0] ?? []
  const colIndex = new Map<string, number>()
  header.forEach((name, idx) => {
    colIndex.set(name.trim().toLowerCase(), idx)
  })

  const getCell = (row: readonly string[], colName: string): string => {
    const idx = colIndex.get(colName.toLowerCase())
    if (idx === undefined) {
      return ""
    }
    return (row[idx] ?? "").trim()
  }

  const records: GoodreadsBookRecord[] = []

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i]
    if (!row) {
      continue
    }

    const title = getCell(row, "Title")
    const author = getCell(row, "Author")
    if (title.length === 0 || author.length === 0) {
      continue
    }

    const isbn13 = cleanGoodreadsIsbn(getCell(row, "ISBN13"))
    const isbn10 = cleanGoodreadsIsbn(getCell(row, "ISBN"))
    const isbn = isbn13 ?? isbn10

    const dateInfo = parseGoodreadsDate(getCell(row, "Date Read"))
    const exclusiveShelf = getCell(row, "Exclusive Shelf")
    const status = mapExclusiveShelf(exclusiveShelf, dateInfo.isoDate !== undefined)

    const rawRating = Number(getCell(row, "My Rating"))
    const rating =
      Number.isInteger(rawRating) && rawRating >= 1 && rawRating <= 5 ? rawRating : undefined

    const rawPages = Number(getCell(row, "Number of Pages"))
    const pages = Number.isInteger(rawPages) && rawPages > 0 ? rawPages : undefined

    const notes = cleanReviewText(getCell(row, "My Review"))
    const tags = parseBookshelfTags(getCell(row, "Bookshelves"))

    const firstSentence = notes.split(/\n/)[0]?.trim() ?? ""
    const summary =
      firstSentence.length > 0
        ? firstSentence.slice(0, 180)
        : `Logged on Goodreads${dateInfo.yearRead ? ` in ${dateInfo.yearRead}` : ""}.`

    records.push({
      slug: slugifyBookTitle(title),
      title,
      author,
      status,
      rating,
      dateRead: dateInfo.isoDate,
      yearRead: dateInfo.yearRead,
      pages,
      isbn,
      spineTheme: pickSpineTheme(title),
      tags,
      summary,
      notes,
    })
  }

  return records
}

function yamlQuote(value: string): string {
  return JSON.stringify(value)
}

export function goodreadsRecordToMarkdown(record: GoodreadsBookRecord): string {
  const lines: string[] = [
    "---",
    `title: ${yamlQuote(record.title)}`,
    `author: ${yamlQuote(record.author)}`,
    `status: ${yamlQuote(record.status)}`,
  ]

  if (record.rating !== undefined) {
    lines.push(`rating: ${record.rating}`)
  }
  if (record.dateRead !== undefined) {
    lines.push(`dateRead: ${yamlQuote(record.dateRead)}`)
  }
  if (record.yearRead !== null) {
    lines.push(`yearRead: ${record.yearRead}`)
  }
  if (record.pages !== undefined) {
    lines.push(`pages: ${record.pages}`)
  }
  if (record.isbn !== undefined) {
    lines.push(`isbn: ${yamlQuote(record.isbn)}`)
  }
  if (record.tags.length > 0) {
    lines.push("tags:")
    for (const tag of record.tags) {
      lines.push(`  - ${yamlQuote(tag)}`)
    }
  } else {
    lines.push("tags: []")
  }
  lines.push(`spineTheme: ${yamlQuote(record.spineTheme)}`)
  lines.push(`summary: ${yamlQuote(record.summary)}`)
  lines.push("---")

  if (record.notes.length > 0) {
    lines.push("", record.notes)
  }

  return `${lines.join("\n")}\n`
}
