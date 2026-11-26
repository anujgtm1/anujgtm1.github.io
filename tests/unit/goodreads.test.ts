import assert from "node:assert/strict"
import test from "node:test"
import {
  cleanGoodreadsIsbn,
  filterImportableGoodreadsRecords,
  goodreadsRecordToMarkdown,
  mergeGoodreadsIntoMarkdown,
  parseBookMarkdown,
  parseCsvRows,
  parseGoodreadsCsv,
  slugifyBookTitle,
} from "../../src/lib/goodreads.ts"

const SAMPLE_CSV = [
  "Book Id,Title,Author,ISBN,ISBN13,My Rating,Number of Pages,Date Read,Bookshelves,Exclusive Shelf,My Review",
  '1,"Invisible Cities",Italo Calvino,="0156453800",="9780156453806",0,165,,"fiction, travel",currently-reading,"Dreamlike tiny chapters.<br/><br/>Reading slowly."',
  '2,"The Myth of Sisyphus, and Other Essays",Albert Camus,="0525564454",="9780525564454",5,212,2024/03/17,"philosophy, favorites",read,"Strangely joyful."',
  '3,"Unrated Short Book",Jane Doe,="",="",0,,2026/02/10,,read,""',
  '4,"On the Nightstand",Ada Lovelace,="",="",0,,,to-read,to-read,""',
].join("\n")

test("cleanGoodreadsIsbn strips Excel-style Goodreads wrappers and validates length", () => {
  assert.equal(cleanGoodreadsIsbn('="9780143127741"'), "9780143127741")
  assert.equal(cleanGoodreadsIsbn('="015645380X"'), "015645380X")
  assert.equal(cleanGoodreadsIsbn('=""'), undefined)
  assert.equal(cleanGoodreadsIsbn("invalid"), undefined)
})

test("parseCsvRows handles quoted commas, escaped quotes, and multiline values", () => {
  const rows = parseCsvRows('A,B\n"hello, ""world""","line1\nline2"')
  assert.equal(rows.length, 2)
  assert.deepEqual(rows[1], ['hello, "world"', "line1\nline2"])
})

test("parseGoodreadsCsv maps shelves, ISBNs, dates, years, ratings, and review HTML", () => {
  const records = parseGoodreadsCsv(SAMPLE_CSV)
  assert.equal(records.length, 4)

  const calvino = records[0]
  assert.equal(calvino?.status, "reading")
  assert.equal(calvino?.isbn, "9780156453806")
  assert.equal(calvino?.rating, undefined)
  assert.equal(calvino?.yearRead, null)
  assert.equal(calvino?.notes, "Dreamlike tiny chapters.\n\nReading slowly.")
  assert.deepEqual(calvino?.tags, ["fiction", "travel"])

  const camus = records[1]
  assert.equal(camus?.title, "The Myth of Sisyphus, and Other Essays")
  assert.equal(camus?.status, "finished")
  assert.equal(camus?.rating, 5)
  assert.equal(camus?.dateRead, "2024-03-17")
  assert.equal(camus?.yearRead, 2024)

  const unrated = records[2]
  assert.equal(unrated?.isbn, undefined)
  assert.equal(unrated?.pages, undefined)
  assert.equal(unrated?.yearRead, 2026)

  const queued = records[3]
  assert.equal(queued?.status, "queued")
})

test("goodreadsRecordToMarkdown emits valid frontmatter and optional fields cleanly", () => {
  const records = parseGoodreadsCsv(SAMPLE_CSV)
  const camus = records[1]
  assert.ok(camus)
  const md = goodreadsRecordToMarkdown(camus)
  assert.ok(md.includes('title: "The Myth of Sisyphus, and Other Essays"'))
  assert.ok(md.includes('isbn: "9780525564454"'))
  assert.ok(md.includes("yearRead: 2024"))
  assert.ok(md.includes("Strangely joyful."))
  assert.equal(slugifyBookTitle("The Myth of Sisyphus, and Other Essays"), "the-myth-of-sisyphus-and-other-essays")
})

test("filterImportableGoodreadsRecords excludes queued by default, supports includeQueued, and deduplicates slugs", () => {
  const csvWithDuplicates = [
    "Book Id,Title,Author,ISBN,ISBN13,My Rating,Number of Pages,Date Read,Bookshelves,Exclusive Shelf,My Review",
    '10,"Dune",Frank Herbert,="",="",0,688,,to-read,to-read,""',
    '11,"Dune",Frank Herbert,="",="9780441172719",5,688,2023/08/10,"sci-fi",read,"Desert classic."',
    '12,"Dune",Frank Herbert,="",="",4,688,2024/01/02,"reread",read,"Second pass."',
    '13,"On the Nightstand",Ada Lovelace,="",="",0,,,to-read,to-read,""',
    '14,"Invisible Cities",Italo Calvino,="",="",0,165,,"fiction",currently-reading,""',
  ].join("\n")

  const records = parseGoodreadsCsv(csvWithDuplicates)

  const defaultFiltered = filterImportableGoodreadsRecords(records)
  assert.equal(defaultFiltered.skippedQueuedCount, 2)
  assert.equal(defaultFiltered.duplicateSlugCount, 1)
  assert.deepEqual(
    defaultFiltered.selected.map((record) => `${record.slug}:${record.status}:${record.rating ?? "none"}`),
    ["dune:finished:5", "invisible-cities:reading:none"],
  )

  const withQueued = filterImportableGoodreadsRecords(records, { includeQueued: true })
  assert.equal(withQueued.skippedQueuedCount, 0)
  assert.equal(withQueued.duplicateSlugCount, 2)
  assert.deepEqual(
    withQueued.selected.map((record) => `${record.slug}:${record.status}`),
    ["dune:queued", "on-the-nightstand:queued", "invisible-cities:reading"],
  )
})

test("parseBookMarkdown parses quoted, single-quoted, and unquoted Pages CMS frontmatter and tags", () => {
  const pagesCmsMarkdown = [
    "---",
    "title: 'Dune: Messiah''s Echo'",
    'author: "Frank \\"Spice\\" Herbert"',
    "status: favorite",
    "rating: 5",
    "dateRead: 2024-03-17",
    "yearRead: 2024",
    "pages: 688",
    "isbn: 9780441172719",
    "coverUrl: /images/uploads/dune.jpg",
    'tags: [sci-fi, "space, opera", \'classic\']',
    "spineTheme: ochre",
    'quote: "Fear is the mind-killer."',
    "summary: Unquoted quick take from Pages CMS.",
    "draft: false",
    "---",
    "",
    "First paragraph of marginalia.",
    "",
    "Second paragraph.",
    "",
  ].join("\n")

  const parsed = parseBookMarkdown(pagesCmsMarkdown)
  assert.ok(parsed)
  assert.equal(parsed.title, "Dune: Messiah's Echo")
  assert.equal(parsed.author, 'Frank "Spice" Herbert')
  assert.equal(parsed.status, "favorite")
  assert.equal(parsed.rating, 5)
  assert.equal(parsed.dateRead, "2024-03-17")
  assert.equal(parsed.yearRead, 2024)
  assert.equal(parsed.pages, 688)
  assert.equal(parsed.isbn, "9780441172719")
  assert.equal(parsed.coverUrl, "/images/uploads/dune.jpg")
  assert.deepEqual(parsed.tags, ["sci-fi", "space, opera", "classic"])
  assert.equal(parsed.spineTheme, "ochre")
  assert.equal(parsed.quote, "Fear is the mind-killer.")
  assert.equal(parsed.summary, "Unquoted quick take from Pages CMS.")
  assert.equal(parsed.draft, false)
  assert.equal(parsed.body, "First paragraph of marginalia.\n\nSecond paragraph.")

  const multilineTagsMarkdown = [
    "---",
    'title: "Invisible Cities"',
    'author: "Italo Calvino"',
    'status: "reading"',
    "tags:",
    '  - "fiction"',
    "  - travel",
    "draft: true",
    "---",
  ].join("\n")

  const parsedMultiline = parseBookMarkdown(multilineTagsMarkdown)
  assert.ok(parsedMultiline)
  assert.deepEqual(parsedMultiline.tags, ["fiction", "travel"])
  assert.equal(parsedMultiline.draft, true)
  assert.equal(parsedMultiline.summary, "")
  assert.equal(parsedMultiline.body, "")

  const emptyTagsMarkdown = [
    "---",
    "title: Minimal Book",
    "author: Minimal Author",
    "status: finished",
    "tags: []",
    "---",
  ].join("\n")

  const parsedEmptyTags = parseBookMarkdown(emptyTagsMarkdown)
  assert.ok(parsedEmptyTags)
  assert.deepEqual(parsedEmptyTags.tags, [])
})

test("parseBookMarkdown returns null on malformed frontmatter or invalid required fields", () => {
  assert.equal(parseBookMarkdown("No frontmatter at all"), null)
  assert.equal(parseBookMarkdown("---\ntitle: Missing Close\nauthor: A\nstatus: finished\n"), null)
  assert.equal(parseBookMarkdown("---\nauthor: Missing Title\nstatus: finished\n---\n"), null)
  assert.equal(parseBookMarkdown("---\ntitle: Missing Author\nstatus: finished\n---\n"), null)
  assert.equal(
    parseBookMarkdown("---\ntitle: Bad Status\nauthor: Someone\nstatus: archived\n---\n"),
    null,
  )
  assert.equal(
    parseBookMarkdown("---\ntitle: Broken Line\nauthor: Someone\nstatus: finished\nnot valid yaml\n---\n"),
    null,
  )
  assert.equal(
    parseBookMarkdown("---\ntitle: Wrapped\nauthor: Someone\nstatus: finished\n  indented: continuation\n---\n"),
    null,
  )
  assert.equal(
    parseBookMarkdown("---\ntitle: Custom Key\nauthor: Someone\nstatus: finished\ncustomField: keep me\n---\n"),
    null,
  )
})

test("parseBookMarkdown parses folded and literal YAML block scalars including indented dashes", () => {
  const blockScalarMd = [
    "---",
    "title: Block Scalar Book",
    "author: Jane Author",
    "status: finished",
    "summary: >-",
    "  First folded line",
    "  continues cleanly.",
    "",
    "  Second paragraph.",
    "quote: |-",
    "  Line one",
    "  ---",
    "  Line two",
    "---",
    "",
    "Body marginalia.",
  ].join("\n")

  const parsed = parseBookMarkdown(blockScalarMd)
  assert.ok(parsed)
  assert.equal(parsed.summary, "First folded line continues cleanly.\n\nSecond paragraph.")
  assert.equal(parsed.quote, "Line one\n---\nLine two")
  assert.equal(parsed.body, "Body marginalia.")
})

test("mergeGoodreadsIntoMarkdown preserves manual Pages CMS edits while syncing Goodreads updates", () => {
  const existing = [
    "---",
    'title: "Invisible Cities (Archival Edition)"',
    'author: "Italo Calvino"',
    'status: "favorite"',
    "rating: 4",
    'isbn: "0156453800"',
    'coverUrl: "/images/uploads/invisible-cities.jpg"',
    "tags:",
    '  - "Fiction"',
    '  - "architecture"',
    'spineTheme: "burgundy"',
    'quote: "Cities, like dreams, are made of desires and fears."',
    'summary: "My personal note on Calvino."',
    "draft: false",
    "---",
    "",
    "Handwritten marginalia from Pages CMS.",
    "",
  ].join("\n")

  const incoming = {
    slug: "invisible-cities",
    title: "Invisible Cities",
    author: "Italo Calvino",
    status: "finished" as const,
    rating: 5,
    dateRead: "2026-01-14",
    yearRead: 2026,
    pages: 165,
    isbn: "9780156453806",
    spineTheme: "navy" as const,
    tags: ["fiction", "travel"],
    summary: "Goodreads review summary.",
    notes: "Goodreads review body.",
  }

  const merged = mergeGoodreadsIntoMarkdown(existing, incoming)
  assert.equal(merged.changed, true)

  const parsed = parseBookMarkdown(merged.markdown)
  assert.ok(parsed)
  assert.equal(parsed.title, "Invisible Cities (Archival Edition)")
  assert.equal(parsed.author, "Italo Calvino")
  assert.equal(parsed.status, "favorite")
  assert.equal(parsed.rating, 5)
  assert.equal(parsed.dateRead, "2026-01-14")
  assert.equal(parsed.yearRead, 2026)
  assert.equal(parsed.pages, 165)
  assert.equal(parsed.isbn, "0156453800")
  assert.equal(parsed.coverUrl, "/images/uploads/invisible-cities.jpg")
  assert.equal(parsed.spineTheme, "burgundy")
  assert.equal(parsed.quote, "Cities, like dreams, are made of desires and fears.")
  assert.equal(parsed.summary, "My personal note on Calvino.")
  assert.equal(parsed.draft, false)
  assert.deepEqual(parsed.tags, ["Fiction", "architecture", "travel"])
  assert.equal(parsed.body, "Handwritten marginalia from Pages CMS.")

  const secondPass = mergeGoodreadsIntoMarkdown(merged.markdown, incoming)
  assert.equal(secondPass.changed, false)
  assert.equal(secondPass.markdown, merged.markdown)
})

test("mergeGoodreadsIntoMarkdown updates reading->finished, placeholder summary, empty body, and never clobbers malformed files", () => {
  const existingReading = [
    "---",
    'title: "The Myth of Sisyphus"',
    'author: "Albert Camus"',
    'status: "reading"',
    "tags: []",
    'spineTheme: "slate"',
    'summary: "Logged on Goodreads."',
    "---",
    "",
  ].join("\n")

  const incomingFinished = {
    slug: "the-myth-of-sisyphus",
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    status: "finished" as const,
    rating: 5,
    dateRead: "2025-11-02",
    yearRead: 2025,
    pages: 212,
    isbn: "9780525564454",
    spineTheme: "plum" as const,
    tags: ["philosophy"],
    summary: "Strangely joyful.",
    notes: "Strangely joyful.\n\nOne must imagine Sisyphus happy.",
  }

  const merged = mergeGoodreadsIntoMarkdown(existingReading, incomingFinished)
  assert.equal(merged.changed, true)

  const parsed = parseBookMarkdown(merged.markdown)
  assert.ok(parsed)
  assert.equal(parsed.status, "finished")
  assert.equal(parsed.rating, 5)
  assert.equal(parsed.dateRead, "2025-11-02")
  assert.equal(parsed.yearRead, 2025)
  assert.equal(parsed.pages, 212)
  assert.equal(parsed.isbn, "9780525564454")
  assert.equal(parsed.spineTheme, "slate")
  assert.equal(parsed.summary, "Strangely joyful.")
  assert.deepEqual(parsed.tags, ["philosophy"])
  assert.equal(parsed.body, "Strangely joyful.\n\nOne must imagine Sisyphus happy.")

  const malformed = "Not valid frontmatter — do not touch."
  const untouched = mergeGoodreadsIntoMarkdown(malformed, incomingFinished)
  assert.equal(untouched.changed, false)
  assert.equal(untouched.markdown, malformed)
})
