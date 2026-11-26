import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { after, before, test } from "node:test"

const PORT = 4399
const BASE_URL = `http://127.0.0.1:${PORT}`
const ROOT_DIR = process.cwd()

const FORBIDDEN_TEMPLATE_STRINGS = [
  "All systems normal",
  "Lorem ipsum",
  "astro-sphere",
  "Website build with",
]

const FORBIDDEN_DUMMY_STRINGS = [
  "Invisible Cities",
  "Late Autumn Alleys",
  "Why I Keep a Digital Bookshelf",
  "Field Notes on Building Resilient",
  "Kyoto & Hokkaido",
  "HND",
  "PROTOTYPE PREVIEW",
  "Morning trains and folded paper maps",
  "Why small tools outlast big platforms",
  "PREVIEW PINS",
  "PREVIEW SHELF",
]

let serverProcess = null

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        return
      }
    } catch {
      // Server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error(`Timed out waiting for astro preview server at ${url}`)
}

async function fetchText(route) {
  const response = await fetch(`${BASE_URL}${route}`)
  const body = await response.text()
  return { status: response.status, headers: response.headers, body }
}

before(async () => {
  assert.ok(
    existsSync(path.join(ROOT_DIR, "dist", "index.html")),
    "dist/index.html missing — run `npm run build` before `npm run test:e2e`",
  )

  serverProcess = spawn(
    process.execPath,
    [
      path.join(ROOT_DIR, "node_modules", "astro", "astro.js"),
      "preview",
      "--port",
      String(PORT),
      "--host",
      "127.0.0.1",
    ],
    {
      cwd: ROOT_DIR,
      stdio: ["ignore", "pipe", "pipe"],
    },
  )

  await waitForServer(`${BASE_URL}/`)
})

after(async () => {
  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill("SIGTERM")
    await new Promise((resolve) => {
      serverProcess.once("exit", resolve)
      setTimeout(resolve, 2000)
    })
  }
})

const HTML_ROUTES = [
  "/",
  "/blog/",
  "/photos/",
  "/books/",
  "/travel/",
  "/projects/",
  "/projects/bookbinder-studio/",
  "/projects/travel-planner/",
  "/projects/personal-crm/",
  "/about/",
  "/work/",
  "/now/",
  "/search/",
]

test("all active HTML routes return 200, declare dual color-scheme, and contain zero template or dummy strings", async () => {
  for (const route of HTML_ROUTES) {
    const { status, body } = await fetchText(route)
    assert.equal(status, 200, `Expected 200 for ${route}, got ${status}`)
    assert.ok(
      body.includes('<meta name="color-scheme" content="light dark">'),
      `Missing color-scheme meta tag on ${route}`,
    )
    assert.ok(body.includes("Anuj Gautam"), `Missing author brand on ${route}`)
    for (const forbidden of [...FORBIDDEN_TEMPLATE_STRINGS, ...FORBIDDEN_DUMMY_STRINGS]) {
      assert.ok(
        !body.includes(forbidden),
        `Found forbidden string "${forbidden}" on ${route}`,
      )
    }
  }
})

test("draft blog entries are excluded from static output", async () => {
  const { status } = await fetchText("/blog/2026-04-22-sisyphus-chooses-to-push/")
  assert.equal(status, 404, "Draft blog post should not be built into live routes")
})

test("homepage renders Swiss Notebook split hero, recent journal, viewfinder, interactive bookshelf modal, static atlas band, and real projects", async () => {
  const { body } = await fetchText("/")
  assert.ok(body.includes("INDEX · VOL. 2026"))
  assert.ok(body.includes("A quiet archive of software, books, and journeys."))
  assert.ok(body.includes("Recent Across the Journal"))
  assert.ok(body.includes("35MM PLATE ARCHIVE · READY FOR FIRST FRAMES"))
  assert.ok(body.includes("PL. I · THROUGH THE LENS"))
  assert.ok(body.includes("Open photo gallery"))
  assert.ok(body.includes("BOOKSHELF"))
  assert.match(body, /\d+ VOLUMES SHELVED · QUICK MARGINALIA/)
  assert.ok(body.includes('closedby="any"'))
  assert.ok(body.includes('aria-labelledby="home-book-dialog-title"'))
  assert.ok(!body.includes('role="dialog"'))
  assert.ok(!body.includes('aria-modal='))
  assert.ok(body.includes("TRAVEL ATLAS"))
  assert.ok(body.includes("Places &amp; Field Coordinates"))
  assert.ok(body.includes('viewBox="0 0 1000 520"'), "Homepage should render the 1000x520 Natural Earth map")
  assert.ok(body.includes("NATURAL EARTH I · 48/48 LOWER STATES · 50/63 PARKS"))
  assert.ok(body.includes("Lower 48 States"))
  assert.ok(body.includes("48 / 48"))
  assert.ok(body.includes("National Parks"))
  assert.ok(body.includes("50 / 63"))
  assert.ok(body.includes("Ready for Stamps"))
  assert.ok(!body.includes("swiss-home-atlas-ocean"), "Homepage should no longer render the rough equirectangular ocean pattern")
  assert.ok(!body.includes("EQUIRECTANGULAR PROJECTION"), "Homepage should no longer label the old rough projection")
  assert.ok(!body.includes("UnifiedTravelAtlas"), "Homepage static travel map must ship zero travel atlas JS islands")
  assert.ok(body.includes("WORKSHOP · SELECTED PROJECTS"))
  assert.ok(body.includes("Bookbinder Studio"))
  assert.ok(body.includes("Travel Planner"))
  assert.ok(body.includes("Personal CRM"))
  assert.ok(body.includes('href="/about"'))
})

test("blog renders clean Swiss Notes Desk empty state when no posts are published", async () => {
  const { body } = await fetchText("/blog/")
  assert.ok(body.includes("Dispatches · Notes Desk"))
  assert.ok(body.includes("First dispatches on the desk"))
})

test("photo gallery renders graceful multi-album empty state, nav link, and excludes nonexistent album routes", async () => {
  const { body } = await fetchText("/photos/")
  assert.ok(body.includes("Through the Lens · Photo Archive"))
  assert.ok(body.includes("Albums") && body.includes("Contact Sheets on the Way"))
  assert.ok(body.includes("Photo albums and travel contact sheets will appear here soon."))
  assert.ok(!body.includes('role="dialog"'))
  assert.ok(!body.includes('aria-modal='))
  assert.ok(body.includes('href="/photos"'))

  const missingAlbum = await fetchText("/photos/nonexistent-album/")
  assert.equal(missingAlbum.status, 404, "Nonexistent photo album route should return 404")
})

test("bookshelf renders imported Goodreads volumes, view controls, native closedby dialog, and Bookbinder Studio link", async () => {
  const { body } = await fetchText("/books/")
  assert.match(body, /Reading Room · \d+ Volumes/)
  assert.ok(body.includes("Currently Reading"))
  assert.ok(body.includes("The Brothers Karamazov"))
  assert.ok(body.includes("1984"))
  assert.ok(!body.includes("On the Stack"), "Queued to-read books should not be imported by default")
  assert.ok(body.includes('closedby="any"'))
  assert.ok(body.includes('aria-labelledby="book-dialog-title"'))
  assert.ok(!body.includes('role="dialog"'))
  assert.ok(!body.includes('aria-modal='))
  assert.ok(body.includes("https://anujgtm.com/Bookbinder/"))
})

test("travel atlas renders unified World / U.S. atlas, visual notes ledger, and Travel Planner companion link", async () => {
  const { body } = await fetchText("/travel/")
  assert.ok(body.includes("Field Atlas · Ready for Stamps"))
  assert.ok(body.includes("World Atlas"))
  assert.ok(body.includes(">World<"))
  assert.ok(body.includes(">U.S.<"))
  assert.ok(body.includes("Map Mode"))
  assert.ok(body.includes("Poster Mode"))
  assert.ok(body.includes('closedby="any"'))
  assert.ok(!body.includes("Archival World Projection"), "Should not render duplicate old World map")
  assert.ok(!body.includes("50/63 U.S. Parks"), "Should not show 50/63 U.S. Parks banner while World is active")
  assert.ok(body.includes("Places &amp; Visual Notes"))
  assert.ok(body.includes("TRAVEL LOG"))
  assert.ok(body.includes("PHOTO GALLERY"))
  assert.ok(body.includes("No stamps logged yet"))
  assert.ok(body.includes("https://travel.anujgtm.com"))

  // Verify upgraded 3:4 WPA poster stylesheet and client island bundle are emitted cleanly
  const cssMatch = body.match(/href="(\/_astro\/[^"]+\.css)"/)
  assert.ok(cssMatch?.[1], "Travel page should link built Astro CSS stylesheet")
  const cssRes = await fetchText(cssMatch[1])
  assert.equal(cssRes.status, 200)
  assert.ok(cssRes.body.includes("park-emblem--sky-night"), "Built CSS should include sky-mood classes")
  assert.ok(cssRes.body.includes("color-mix(in oklab"), "Built CSS should use oklab 6-ink color mixing")

  const islandMatch = body.match(/component-url="(\/_astro\/UnifiedTravelAtlas\.[^"]+\.js)"/)
  assert.ok(islandMatch?.[1], "Travel page should hydrate UnifiedTravelAtlas island")
  const islandRes = await fetchText(islandMatch[1])
  assert.equal(islandRes.status, 200)
  assert.ok(islandRes.body.includes("0 0 180 240"), "UnifiedTravelAtlas bundle should emit 3:4 WPA poster viewBox")
  for (const bespokeCode of [
    "ACAD",
    "ARCH",
    "BADL",
    "BIBE",
    "BISC",
    "BLCA",
    "BRCA",
    "CANY",
    "CARE",
    "CAVE",
    "CHIS",
    "CONG",
    "CRLA",
    "CUVA",
    "DENA",
    "DEVA",
    "DRTO",
    "EVER",
    "GAAR",
    "GLAC",
    "GLBA",
    "GRBA",
    "GRCA",
    "GRSA",
    "GRSM",
    "GRTE",
    "GUMO",
    "HALE",
    "HAVO",
    "HOSP",
    "INDU",
    "ISRO",
    "JEFF",
    "JOTR",
    "KATM",
    "KEFJ",
    "KICA",
    "KOVA",
    "LACL",
    "LAVO",
    "MACA",
    "MEVE",
    "MORA",
    "NERI",
    "NOCA",
    "NPSA",
    "OLYM",
    "PEFO",
    "PINN",
    "REDW",
    "ROMO",
    "SAGU",
    "SEQU",
    "SHEN",
    "THRO",
    "VIIS",
    "VOYA",
    "WHSA",
    "WICA",
    "WRST",
    "YELL",
    "YOSE",
    "ZION",
  ]) {
    assert.ok(
      islandRes.body.includes(bespokeCode),
      `UnifiedTravelAtlas bundle should include bespoke artwork "${bespokeCode}"`,
    )
  }
})

test("projects, blueprint plates, dossiers, about, work, and /now showcase Anuj's real engineering history and builds", async () => {
  const projectsRes = await fetchText("/projects/")
  assert.ok(projectsRes.body.includes("Bookbinder Studio"))
  assert.ok(projectsRes.body.includes("https://anujgtm.com/Bookbinder/"))
  assert.ok(projectsRes.body.includes("PLATE 01 · 1:1 HARDCOVER CASE PATTERN"))
  assert.ok(projectsRes.body.includes("Travel Planner"))
  assert.ok(projectsRes.body.includes("https://travel.anujgtm.com"))
  assert.ok(projectsRes.body.includes("PLATE 02 · MAP-FIRST ROUTE ENGINE"))
  assert.ok(projectsRes.body.includes("Personal CRM"))
  assert.ok(projectsRes.body.includes("https://github.com/anujgtm1/personal-crm"))
  assert.ok(projectsRes.body.includes("PLATE 03 · WEEKLY CALL PICKER"))

  const dossierRes = await fetchText("/projects/bookbinder-studio/")
  assert.ok(dossierRes.body.includes('id="reading-progress"'))

  const aboutRes = await fetchText("/about/")
  assert.ok(aboutRes.body.includes("ABOUT · ANUJ GAUTAM"))
  assert.ok(aboutRes.body.includes("FIG. 01 · MONOGRAM SPECIMEN"))
  assert.ok(aboutRes.body.includes("Google"))
  assert.ok(aboutRes.body.includes("University of Illinois"))
  assert.ok(aboutRes.body.includes("Facebook"))
  assert.ok(aboutRes.body.includes("University of Tennessee"))
  assert.ok(aboutRes.body.includes("Currently"))
  assert.ok(aboutRes.body.includes("Personal CRM"))
  assert.ok(!aboutRes.body.includes("Currently Reading"))
  assert.ok(!aboutRes.body.includes("Next Trip"))

  const workRes = await fetchText("/work/")
  assert.ok(workRes.body.includes("Google"))
  assert.ok(workRes.body.includes("University of Illinois"))
  assert.ok(workRes.body.includes("Facebook"))
  assert.ok(workRes.body.includes("University of Tennessee"))

  const nowRes = await fetchText("/now/")
  assert.ok(nowRes.body.includes("Personal CRM"))
  assert.ok(nowRes.body.includes("Google"))
  assert.ok(!nowRes.body.includes("Currently Reading"))
  assert.ok(!nowRes.body.includes("Next Trip"))
})

test("rss.xml returns valid XML containing real projects and zero dummy or draft entries", async () => {
  const { status, body } = await fetchText("/rss.xml")
  assert.equal(status, 200)
  assert.ok(body.includes("<rss"))
  assert.ok(body.includes("/projects/bookbinder-studio/"))
  assert.ok(body.includes("/projects/travel-planner/"))
  assert.ok(body.includes("/projects/personal-crm/"))
  assert.ok(!body.includes("sisyphus-chooses-to-push"))
  for (const forbidden of FORBIDDEN_DUMMY_STRINGS) {
    assert.ok(!body.includes(forbidden), `Found dummy string "${forbidden}" in /rss.xml`)
  }
})

test("Pages CMS config (.pages.yml) exists and configures all collections and media fields", () => {
  const pagesYmlPath = path.join(ROOT_DIR, ".pages.yml")
  assert.ok(existsSync(pagesYmlPath), ".pages.yml must exist at repository root")
  const content = readFileSync(pagesYmlPath, "utf8")
  for (const required of [
    "public/images/uploads",
    "src/content/blog",
    "heroImage",
    "src/content/books",
    "src/content/travel",
    "coverImage",
    "src/content/projects",
    "src/content/work",
    "src/content/now/current.md",
    "src/content/photos",
  ]) {
    assert.ok(content.includes(required), `.pages.yml missing "${required}"`)
  }
})
