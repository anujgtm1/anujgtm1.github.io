import assert from "node:assert/strict"
import test from "node:test"
import {
  cleanGoodreadsIsbn,
  goodreadsRecordToMarkdown,
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
