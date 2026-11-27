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

test("homepage renders clean borderless split hero, recents, photo/bookshelf portals, atlas band, and real projects without verbose clutter", async () => {
  const { body } = await fetchText("/")
  assert.ok(body.includes("A quiet archive of software, books, and journeys."))
  assert.ok(body.includes("Recent"))
  assert.ok(!body.includes("Recents"))
  assert.ok(!body.includes("INDEX · VOL. 2026"))
  assert.ok(!body.includes("Recent Across the Journal"))
  assert.ok(!body.includes("35MM PLATE ARCHIVE · READY FOR FIRST FRAMES"))
  assert.ok(!body.includes("FRAME 00 · 35MM"))
  assert.ok(!body.includes("SHELF 01 · READY FOR VOLUMES"))
  assert.ok(!body.includes("Coming soon."))
  assert.ok(body.includes('aria-label="All photos"'))
  assert.ok(body.includes("Bookshelf"))
  assert.ok(body.includes('aria-label="All books"'))
  assert.ok(!body.includes("All books →"))
  assert.ok(!body.includes("VOLUMES SHELVED"))
  assert.ok(!body.includes("QUICK MARGINALIA"))
  assert.ok(body.includes('href="/books/#book-'))
  assert.ok(body.includes("Travel Atlas"))
  assert.ok(!body.includes("Places and notes from the road."))
  assert.ok(body.includes('viewBox="0 0 1000 520"'), "Homepage should render the 1000x520 Natural Earth map")
  assert.ok(!body.includes("NATURAL EARTH I"))
  assert.ok(!body.includes("48/48 STATES"))
  assert.ok(body.includes("Lower 48 States"))
  assert.ok(body.includes("48 / 48"))
  assert.ok(body.includes("National Parks"))
  assert.ok(body.includes("50 / 64"))
  assert.ok(!body.includes("swiss-home-atlas-ocean"), "Homepage should no longer render the rough equirectangular ocean pattern")
  assert.ok(!body.includes("EQUIRECTANGULAR PROJECTION"), "Homepage should no longer label the old rough projection")
  assert.ok(!body.includes("<astro-island"), "Homepage static travel map must ship zero framework JS islands")
  assert.ok(body.includes('aria-label="All projects"'))
  assert.ok(!body.includes("All projects →"))
  assert.ok(body.includes("Bookbinder Studio"))
  assert.ok(body.includes("Travel Planner"))
  assert.ok(body.includes("Personal CRM"))
  assert.ok(!body.includes("Read →"))
  assert.ok(!body.includes(">shipped<"))
  assert.ok(!body.includes(">active<"))
  assert.ok(!body.includes("Elsewhere"))
  assert.ok(!body.includes("Always glad to trade"))
  assert.ok(!body.includes("Built with Astro"))
  assert.ok(body.includes('aria-label="Back to top"'))
  assert.ok(body.includes('aria-label="RSS"'))
  assert.ok(body.includes('href="/about"'))
})

test("blog renders clean empty state when no posts are published", async () => {
  const { body } = await fetchText("/blog/")
  assert.ok(body.includes("Nothing here yet."))
  assert.ok(!body.includes("Dispatches · Notes Desk"))
})

test("photos renders empty plate and native closedby lightbox dialog without instructional fluff", async () => {
  const { body } = await fetchText("/photos/")
  assert.ok(body.includes("Nothing here yet."))
  assert.ok(!body.includes("CONTACT SHEET · 35MM ARCHIVAL SLEEVE"))
  assert.ok(!body.includes("Select any standalone plate"))
  assert.ok(body.includes('id="swiss-photo-lightbox"'))
  assert.ok(body.includes('closedby="any"'))
  assert.ok(body.includes('aria-label="Close"'))
  assert.ok(!body.includes('role="dialog"'))
  assert.ok(!body.includes('aria-modal="true"'))
})

test("bookshelf renders imported Goodreads volumes, view controls, native closedby dialog, and Bookbinder Studio link", async () => {
  const { body } = await fetchText("/books/")
  assert.ok(body.includes("Bookshelf"))
  assert.ok(!body.includes("Pull any spine"))
  assert.ok(!body.includes("quick marginalia"))
  assert.ok(!body.includes("Want to bind a physical cover"))
  assert.ok(body.includes('aria-label="Covers view"'))
  assert.ok(body.includes('aria-label="Shelf view"'))
  assert.ok(body.includes('aria-label="Catalog view"'))
  assert.ok(!body.includes('aria-label="Filter books by status"'))
  assert.ok(!body.includes('aria-label="Filter books by year read"'))
  assert.ok(!body.includes('placeholder="Filter..."'))
  assert.ok(!body.includes("Filter books"))
  assert.ok(body.includes("Currently Reading"))
  assert.ok(body.includes("The Brothers Karamazov"))
  assert.ok(body.includes("1984"))
  assert.ok(!body.includes("On the Stack"), "Queued to-read books should not be imported by default")
  assert.ok(body.includes('closedby="any"'))
  assert.ok(body.includes("https://anujgtm.com/Bookbinder/"))
})

test("travel atlas renders lean, borderless World / U.S. atlas with perforated stamp poster frames and Travel Planner link", async () => {
  const { body } = await fetchText("/travel/")
  assert.ok(body.includes("Travel Atlas"))
  assert.ok(body.includes("50 / 64 National Parks"))
  assert.ok(body.includes(">World<"))
  assert.ok(body.includes(">U.S.<"))
  assert.ok(body.includes("Map"))
  assert.ok(body.includes("Poster"))
  assert.ok(body.includes("park-stamp-card"), "Travel page should render postal stamp Poster Mode by default")
  assert.ok(body.includes("Chiricahua"), "Travel page SSR poster view should include Chiricahua")
  assert.ok(body.includes('closedby="any"'))
  assert.ok(!body.includes("Archival World Projection"), "Should not render duplicate old World map")
  assert.ok(!body.includes("No stamps logged yet"), "Should omit empty ledger filler copy")
  assert.ok(!body.includes("Field Atlas · Ready for Stamps"), "Should omit redundant hero kicker")
  assert.ok(!body.includes("Collector’s Edition"), "Should omit poster collector kicker")
  assert.ok(!body.includes("Select any park emblem"), "Should omit poster instruction figcaption")
  assert.ok(body.includes("https://travel.anujgtm.com"))

  // Verify upgraded 3:4 WPA poster stylesheet and client island bundle are emitted cleanly
  const cssMatch = body.match(/href="(\/_astro\/[^"]+\.css)"/)
  assert.ok(cssMatch?.[1], "Travel page should link built Astro CSS stylesheet")
  const cssRes = await fetchText(cssMatch[1])
  assert.equal(cssRes.status, 200)
  assert.ok(cssRes.body.includes("park-emblem--stamp"), "Built CSS should include stamp poster frame styling")
  assert.ok(cssRes.body.includes("park-stamp-paper"), "Built CSS should include perforated stamp paper styling")
  assert.ok(!cssRes.body.includes("park-emblem--unvisited"), "Built CSS should keep all park stamps in full color")
  assert.ok(cssRes.body.includes("park-emblem--sky-night"), "Built CSS should include sky-mood classes")
  assert.ok(cssRes.body.includes("color-mix(in oklab"), "Built CSS should use oklab 6-ink color mixing")

  const islandMatch = body.match(/component-url="(\/_astro\/UnifiedTravelAtlas\.[^"]+\.js)"/)
  assert.ok(islandMatch?.[1], "Travel page should hydrate UnifiedTravelAtlas island")
  const islandRes = await fetchText(islandMatch[1])
  assert.equal(islandRes.status, 200)
  assert.ok(islandRes.body.includes("0 0 180 240"), "UnifiedTravelAtlas bundle should emit 3:4 WPA poster viewBox")
  assert.ok(islandRes.body.includes("park-stamp-card"), "UnifiedTravelAtlas bundle should render postal stamp cards")
  assert.ok(!islandRes.body.includes("parks-search"), "UnifiedTravelAtlas bundle should omit park search filter")
  assert.ok(!islandRes.body.includes("parks-sort"), "UnifiedTravelAtlas bundle should omit park sort control")
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
    "CHIR",
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
  assert.ok(!projectsRes.body.includes("Read →"))
  assert.ok(!projectsRes.body.includes(">shipped<"))
  assert.ok(!projectsRes.body.includes(">active<"))
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
  assert.ok(dossierRes.body.includes('aria-label="Back to all projects"'))

  const aboutRes = await fetchText("/about/")
  assert.ok(aboutRes.body.includes("Engineer, researcher, reader, and occasional bookbinder."))
  assert.ok(!aboutRes.body.includes("ABOUT · ANUJ GAUTAM"))
  assert.ok(!aboutRes.body.includes("FIG. 01 · MONOGRAM SPECIMEN"))
  assert.ok(!aboutRes.body.includes("ARCHIVAL SPECIMEN"))
  assert.ok(!aboutRes.body.includes("calm notebook for all of those threads"))
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
