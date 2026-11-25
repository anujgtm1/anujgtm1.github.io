import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { goodreadsRecordToMarkdown, parseGoodreadsCsv } from "../src/lib/goodreads.ts"

const args = process.argv.slice(2)
const overwrite = args.includes("--overwrite")
const csvArg = args.find((arg) => !arg.startsWith("--"))

if (!csvArg) {
  console.error(
    "Usage: npm run import:goodreads -- <path/to/goodreads_library_export.csv> [--overwrite]",
  )
  process.exit(1)
}

const csvPath = path.resolve(process.cwd(), csvArg)
if (!existsSync(csvPath)) {
  console.error(`Goodreads CSV file not found: ${csvPath}`)
  process.exit(1)
}

const csvText = readFileSync(csvPath, "utf8")
const records = parseGoodreadsCsv(csvText)

const outDir = path.resolve(process.cwd(), "src/content/books")
mkdirSync(outDir, { recursive: true })

let importedCount = 0
let skippedCount = 0
const years = new Set()

for (const record of records) {
  const filePath = path.join(outDir, `${record.slug}.md`)
  if (existsSync(filePath) && !overwrite) {
    skippedCount += 1
    continue
  }

  writeFileSync(filePath, goodreadsRecordToMarkdown(record), "utf8")
  importedCount += 1
  if (record.yearRead !== null) {
    years.add(record.yearRead)
  }
}

const sortedYears = [...years].sort((a, b) => a - b)
const yearSpan =
  sortedYears.length > 1
    ? `${sortedYears[0]}–${sortedYears[sortedYears.length - 1]}`
    : sortedYears.length === 1
      ? String(sortedYears[0])
      : "undated"

console.log(
  `Imported ${importedCount} book${importedCount === 1 ? "" : "s"} (skipped ${skippedCount} existing) across ${yearSpan}.`,
)
