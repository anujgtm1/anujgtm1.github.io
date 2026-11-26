import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import {
  filterImportableGoodreadsRecords,
  goodreadsRecordToMarkdown,
  mergeGoodreadsIntoMarkdown,
  parseGoodreadsCsv,
} from "../src/lib/goodreads.ts"

const args = process.argv.slice(2)
const overwrite = args.includes("--overwrite")
const includeQueued = args.includes("--include-queued")
const csvArg = args.find((arg) => !arg.startsWith("--"))

if (!csvArg) {
  console.error(
    "Usage: npm run import:goodreads -- <path/to/goodreads_library_export.csv> [--overwrite] [--include-queued]",
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
const { selected, skippedQueuedCount, duplicateSlugCount } = filterImportableGoodreadsRecords(
  records,
  { includeQueued },
)

const outDir = path.resolve(process.cwd(), "src/content/books")
mkdirSync(outDir, { recursive: true })

let importedCount = 0
let overwrittenCount = 0
let updatedCount = 0
let unchangedCount = 0
const years = new Set()

for (const record of selected) {
  const filePath = path.join(outDir, `${record.slug}.md`)
  const fileExists = existsSync(filePath)

  if (!fileExists) {
    writeFileSync(filePath, goodreadsRecordToMarkdown(record), "utf8")
    importedCount += 1
  } else if (overwrite) {
    writeFileSync(filePath, goodreadsRecordToMarkdown(record), "utf8")
    overwrittenCount += 1
  } else {
    const existingMarkdown = readFileSync(filePath, "utf8")
    const merged = mergeGoodreadsIntoMarkdown(existingMarkdown, record)
    if (merged.changed) {
      writeFileSync(filePath, merged.markdown, "utf8")
      updatedCount += 1
    } else {
      unchangedCount += 1
    }
  }

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

const summaryParts = [
  `${updatedCount} updated`,
  `${unchangedCount} unchanged`,
  ...(overwrittenCount > 0 ? [`${overwrittenCount} overwritten`] : []),
  `${skippedQueuedCount} skipped to-read`,
  `${duplicateSlugCount} skipped duplicate${duplicateSlugCount === 1 ? "" : "s"}`,
]

console.log(
  `Imported ${importedCount} book${importedCount === 1 ? "" : "s"} (${summaryParts.join(", ")}) across ${yearSpan}.`,
)
