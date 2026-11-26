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
  if (
    !Number.isInteger(year) ||
    year < 1900 ||
    year > 2100 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
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

export type FilterGoodreadsOptions = {
  readonly includeQueued?: boolean
}

export type FilteredGoodreadsRecords = {
  readonly selected: readonly GoodreadsBookRecord[]
  readonly skippedQueuedCount: number
  readonly duplicateSlugCount: number
}

export type ParsedBookMarkdown = {
  readonly title: string
  readonly author: string
  readonly status: BookStatus
  readonly rating?: number
  readonly dateRead?: string
  readonly yearRead?: number
  readonly pages?: number
  readonly isbn?: string
  readonly coverUrl?: string
  readonly tags: readonly string[]
  readonly spineTheme?: BookSpineTheme
  readonly quote?: string
  readonly summary: string
  readonly draft?: boolean
  readonly body: string
}

export type MergeGoodreadsResult = {
  readonly markdown: string
  readonly changed: boolean
}

type SerializableBookMarkdown = {
  readonly title: string
  readonly author: string
  readonly status: BookStatus
  readonly rating?: number
  readonly dateRead?: string
  readonly yearRead?: number
  readonly pages?: number
  readonly isbn?: string
  readonly coverUrl?: string
  readonly tags: readonly string[]
  readonly spineTheme: BookSpineTheme
  readonly quote?: string
  readonly summary: string
  readonly draft?: boolean
  readonly body: string
}

function isBookStatus(value: string): value is BookStatus {
  return (
    value === "reading" ||
    value === "favorite" ||
    value === "finished" ||
    value === "queued"
  )
}

function isBookSpineTheme(value: string): value is BookSpineTheme {
  return (
    value === "burgundy" ||
    value === "forest" ||
    value === "navy" ||
    value === "ochre" ||
    value === "terracotta" ||
    value === "slate" ||
    value === "charcoal" ||
    value === "plum"
  )
}

function yamlQuote(value: string): string {
  return JSON.stringify(value)
}

function serializeBookMarkdown(book: SerializableBookMarkdown): string {
  const lines: string[] = [
    "---",
    `title: ${yamlQuote(book.title)}`,
    `author: ${yamlQuote(book.author)}`,
    `status: ${yamlQuote(book.status)}`,
  ]

  if (book.rating !== undefined) {
    lines.push(`rating: ${book.rating}`)
  }
  if (book.dateRead !== undefined) {
    lines.push(`dateRead: ${yamlQuote(book.dateRead)}`)
  }
  if (book.yearRead !== undefined) {
    lines.push(`yearRead: ${book.yearRead}`)
  }
  if (book.pages !== undefined) {
    lines.push(`pages: ${book.pages}`)
  }
  if (book.isbn !== undefined) {
    lines.push(`isbn: ${yamlQuote(book.isbn)}`)
  }
  if (book.coverUrl !== undefined) {
    lines.push(`coverUrl: ${yamlQuote(book.coverUrl)}`)
  }
  if (book.tags.length > 0) {
    lines.push("tags:")
    for (const tag of book.tags) {
      lines.push(`  - ${yamlQuote(tag)}`)
    }
  } else {
    lines.push("tags: []")
  }
  lines.push(`spineTheme: ${yamlQuote(book.spineTheme)}`)
  if (book.quote !== undefined) {
    lines.push(`quote: ${yamlQuote(book.quote)}`)
  }
  lines.push(`summary: ${yamlQuote(book.summary)}`)
  if (book.draft !== undefined) {
    lines.push(`draft: ${book.draft}`)
  }
  lines.push("---")

  if (book.body.length > 0) {
    lines.push("", book.body)
  }

  return `${lines.join("\n")}\n`
}

export function goodreadsRecordToMarkdown(record: GoodreadsBookRecord): string {
  return serializeBookMarkdown({
    title: record.title,
    author: record.author,
    status: record.status,
    rating: record.rating,
    dateRead: record.dateRead,
    yearRead: record.yearRead !== null ? record.yearRead : undefined,
    pages: record.pages,
    isbn: record.isbn,
    tags: record.tags,
    spineTheme: record.spineTheme,
    summary: record.summary,
    body: record.notes,
  })
}

export function filterImportableGoodreadsRecords(
  records: readonly GoodreadsBookRecord[],
  options?: FilterGoodreadsOptions,
): FilteredGoodreadsRecords {
  const includeQueued = options?.includeQueued ?? false
  const selected: GoodreadsBookRecord[] = []
  const seenSlugs = new Set<string>()
  let skippedQueuedCount = 0
  let duplicateSlugCount = 0

  for (const record of records) {
    if (!includeQueued && record.status === "queued") {
      skippedQueuedCount += 1
      continue
    }
    if (seenSlugs.has(record.slug)) {
      duplicateSlugCount += 1
      continue
    }
    seenSlugs.add(record.slug)
    selected.push(record)
  }

  return {
    selected,
    skippedQueuedCount,
    duplicateSlugCount,
  }
}

function parseYamlScalar(raw: string): string {
  const trimmed = raw.trim()
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      const parsed: unknown = JSON.parse(trimmed)
      if (typeof parsed === "string") {
        return parsed
      }
    } catch {
      return trimmed
        .slice(1, -1)
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r")
        .replace(/\\t/g, "\t")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\")
    }
  }
  if (trimmed.length >= 2 && trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'")
  }
  return trimmed
}

function parseOptionalYamlString(raw: string): string | undefined {
  const trimmed = raw.trim()
  if (trimmed.length === 0 || trimmed === "null" || trimmed === "~") {
    return undefined
  }
  const value = parseYamlScalar(trimmed)
  return value.length > 0 ? value : undefined
}

function parseStrictInt(raw: string): number | undefined {
  const trimmed = parseYamlScalar(raw).trim()
  if (!/^-?\d+$/.test(trimmed)) {
    return undefined
  }
  const parsed = Number(trimmed)
  return Number.isSafeInteger(parsed) ? parsed : undefined
}

function parseYamlBoolean(raw: string): boolean | undefined {
  const trimmed = raw.trim().toLowerCase()
  if (trimmed === "true") {
    return true
  }
  if (trimmed === "false") {
    return false
  }
  return undefined
}

function parseInlineYamlList(raw: string): readonly string[] | null {
  const trimmed = raw.trim()
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
    return null
  }
  const inner = trimmed.slice(1, -1).trim()
  if (inner.length === 0) {
    return []
  }

  const items: string[] = []
  let current = ""
  let inDoubleQuotes = false
  let inSingleQuotes = false

  for (let i = 0; i < inner.length; i += 1) {
    const ch = inner[i]
    const next = inner[i + 1]

    if (inDoubleQuotes) {
      if (ch === "\\" && next !== undefined) {
        current += ch + next
        i += 1
        continue
      }
      if (ch === '"') {
        inDoubleQuotes = false
      }
      current += ch
      continue
    }

    if (inSingleQuotes) {
      if (ch === "'" && next === "'") {
        current += "''"
        i += 1
        continue
      }
      if (ch === "'") {
        inSingleQuotes = false
      }
      current += ch
      continue
    }

    if (ch === '"') {
      inDoubleQuotes = true
      current += ch
    } else if (ch === "'") {
      inSingleQuotes = true
      current += ch
    } else if (ch === ",") {
      const value = parseYamlScalar(current)
      if (value.length > 0) {
        items.push(value)
      }
      current = ""
    } else {
      current += ch
    }
  }

  if (inDoubleQuotes || inSingleQuotes) {
    return null
  }

  const trailing = parseYamlScalar(current)
  if (trailing.length > 0) {
    items.push(trailing)
  }

  return items
}

function consumeBlockScalar(
  lines: readonly string[],
  startIndex: number,
  indicator: string,
): { readonly value: string; readonly nextIndex: number } {
  const blockLines: string[] = []
  let idx = startIndex
  while (idx < lines.length) {
    const line = lines[idx]
    if (line === undefined) {
      break
    }
    if (line.trim().length === 0 || /^[ \t]/.test(line)) {
      blockLines.push(line)
      idx += 1
    } else {
      break
    }
  }

  while (blockLines.length > 0 && (blockLines[blockLines.length - 1] ?? "").trim().length === 0) {
    blockLines.pop()
  }

  const indents = blockLines
    .filter((line) => line.trim().length > 0)
    .map((line) => (/^[ \t]*/.exec(line)?.[0].length ?? 0))
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0
  const stripped = blockLines.map((line) =>
    line.trim().length === 0 ? "" : line.slice(minIndent),
  )

  if (indicator.startsWith(">")) {
    const paragraphs: string[] = []
    let currentParagraph: string[] = []
    for (const line of stripped) {
      if (line.length === 0) {
        if (currentParagraph.length > 0) {
          paragraphs.push(currentParagraph.join(" "))
          currentParagraph = []
        }
      } else {
        currentParagraph.push(line)
      }
    }
    if (currentParagraph.length > 0) {
      paragraphs.push(currentParagraph.join(" "))
    }
    return { value: paragraphs.join("\n\n").trim(), nextIndex: idx - 1 }
  }

  return { value: stripped.join("\n").trim(), nextIndex: idx - 1 }
}

export function parseBookMarkdown(markdown: string): ParsedBookMarkdown | null {
  const normalized = markdown.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n")
  const lines = normalized.split("\n")

  if (!/^---[ \t]*$/.test(lines[0] ?? "")) {
    return null
  }

  let closingIndex = -1
  for (let i = 1; i < lines.length; i += 1) {
    if (/^---[ \t]*$/.test(lines[i] ?? "")) {
      closingIndex = i
      break
    }
  }

  if (closingIndex === -1) {
    return null
  }

  const frontmatterLines = lines.slice(1, closingIndex)
  const body = lines
    .slice(closingIndex + 1)
    .join("\n")
    .trim()

  let title: string | undefined
  let author: string | undefined
  let status: BookStatus | undefined
  let rating: number | undefined
  let dateRead: string | undefined
  let yearRead: number | undefined
  let pages: number | undefined
  let isbn: string | undefined
  let coverUrl: string | undefined
  let tags: readonly string[] = []
  let spineTheme: BookSpineTheme | undefined
  let quote: string | undefined
  let summary = ""
  let draft: boolean | undefined

  for (let i = 0; i < frontmatterLines.length; i += 1) {
    const line = frontmatterLines[i]
    if (line === undefined) {
      continue
    }
    const trimmedLine = line.trim()
    if (trimmedLine.length === 0 || trimmedLine.startsWith("#")) {
      continue
    }

    if (/^[ \t]/.test(line)) {
      return null
    }

    const colonIndex = line.indexOf(":")
    if (colonIndex <= 0) {
      return null
    }

    const key = line.slice(0, colonIndex).trim()
    if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(key)) {
      return null
    }

    const rawValue = line.slice(colonIndex + 1).trim()

    if (key === "tags") {
      if (rawValue.length === 0) {
        const listItems: string[] = []
        let nextIdx = i + 1
        while (nextIdx < frontmatterLines.length) {
          const itemLine = frontmatterLines[nextIdx]
          if (itemLine === undefined) {
            break
          }
          const itemTrimmed = itemLine.trim()
          if (itemTrimmed.length === 0 || itemTrimmed.startsWith("#")) {
            nextIdx += 1
            continue
          }
          const listMatch = /^\s*-\s*(.*)$/.exec(itemLine)
          if (!listMatch) {
            break
          }
          const parsedItem = parseOptionalYamlString(listMatch[1] ?? "")
          if (parsedItem !== undefined) {
            listItems.push(parsedItem)
          }
          nextIdx += 1
        }
        tags = listItems
        i = nextIdx - 1
      } else {
        const inlineList = parseInlineYamlList(rawValue)
        if (inlineList === null) {
          return null
        }
        tags = inlineList
      }
      continue
    }

    const isBlockScalar = /^[|>][+-]?$/.test(rawValue)
    let resolvedRawValue = rawValue
    if (isBlockScalar) {
      const block = consumeBlockScalar(frontmatterLines, i + 1, rawValue)
      resolvedRawValue = block.value
      i = block.nextIndex
    }

    const resolveOptionalString = (): string | undefined =>
      isBlockScalar
        ? resolvedRawValue.length > 0
          ? resolvedRawValue
          : undefined
        : parseOptionalYamlString(resolvedRawValue)

    switch (key) {
      case "title": {
        title = resolveOptionalString()
        break
      }
      case "author": {
        author = resolveOptionalString()
        break
      }
      case "status": {
        const parsedStatus = resolveOptionalString()
        if (parsedStatus !== undefined && isBookStatus(parsedStatus)) {
          status = parsedStatus
        } else {
          return null
        }
        break
      }
      case "rating": {
        const parsedRating = parseStrictInt(resolvedRawValue)
        if (parsedRating !== undefined && parsedRating >= 1 && parsedRating <= 5) {
          rating = parsedRating
        }
        break
      }
      case "dateRead": {
        dateRead = resolveOptionalString()
        break
      }
      case "yearRead": {
        const parsedYear = parseStrictInt(resolvedRawValue)
        if (parsedYear !== undefined && parsedYear >= 1900 && parsedYear <= 2100) {
          yearRead = parsedYear
        }
        break
      }
      case "pages": {
        const parsedPages = parseStrictInt(resolvedRawValue)
        if (parsedPages !== undefined && parsedPages > 0) {
          pages = parsedPages
        }
        break
      }
      case "isbn": {
        isbn = resolveOptionalString()
        break
      }
      case "coverUrl": {
        coverUrl = resolveOptionalString()
        break
      }
      case "spineTheme": {
        const parsedTheme = resolveOptionalString()
        if (parsedTheme !== undefined && isBookSpineTheme(parsedTheme)) {
          spineTheme = parsedTheme
        }
        break
      }
      case "quote": {
        quote = resolveOptionalString()
        break
      }
      case "summary": {
        if (isBlockScalar) {
          summary = resolvedRawValue
        } else {
          const trimmedSummary = resolvedRawValue.trim()
          if (trimmedSummary === "null" || trimmedSummary === "~") {
            summary = ""
          } else {
            summary = parseYamlScalar(resolvedRawValue)
          }
        }
        break
      }
      case "draft": {
        draft = parseYamlBoolean(resolvedRawValue)
        break
      }
      default: {
        return null
      }
    }
  }

  if (title === undefined || author === undefined || status === undefined) {
    return null
  }

  return {
    title,
    author,
    status,
    rating,
    dateRead,
    yearRead,
    pages,
    isbn,
    coverUrl,
    tags,
    spineTheme,
    quote,
    summary,
    draft,
    body,
  }
}

function mergeTags(
  existingTags: readonly string[],
  incomingTags: readonly string[],
): readonly string[] {
  const merged: string[] = []
  const seen = new Set<string>()

  for (const tag of existingTags) {
    const normalized = tag.toLowerCase()
    if (!seen.has(normalized)) {
      seen.add(normalized)
      merged.push(tag)
    }
  }

  for (const tag of incomingTags) {
    const normalized = tag.toLowerCase()
    if (!seen.has(normalized)) {
      seen.add(normalized)
      merged.push(tag)
    }
  }

  return merged
}

export function mergeGoodreadsIntoMarkdown(
  existingMarkdown: string,
  incoming: GoodreadsBookRecord,
): MergeGoodreadsResult {
  const existing = parseBookMarkdown(existingMarkdown)
  if (existing === null) {
    return {
      markdown: existingMarkdown,
      changed: false,
    }
  }

  const isPlaceholderSummary =
    existing.summary.trim().length === 0 ||
    existing.summary.trim().startsWith("Logged on Goodreads")

  const nextMarkdown = serializeBookMarkdown({
    title: existing.title,
    author: existing.author,
    status: existing.status === "favorite" ? "favorite" : incoming.status,
    rating: incoming.rating ?? existing.rating,
    dateRead: incoming.dateRead ?? existing.dateRead,
    yearRead: incoming.yearRead !== null ? incoming.yearRead : existing.yearRead,
    pages: incoming.pages ?? existing.pages,
    isbn: existing.isbn ?? incoming.isbn,
    coverUrl: existing.coverUrl,
    tags: mergeTags(existing.tags, incoming.tags),
    spineTheme: existing.spineTheme ?? incoming.spineTheme,
    quote: existing.quote,
    summary: isPlaceholderSummary ? incoming.summary : existing.summary,
    draft: existing.draft,
    body: existing.body.trim().length > 0 ? existing.body : incoming.notes,
  })

  return {
    markdown: nextMarkdown,
    changed: nextMarkdown !== existingMarkdown,
  }
}
