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
]

let serverProcess = null

async function waitForServer(url, timeoutMs = 15000) {
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
  "/books/",
  "/travel/",
  "/projects/",
  "/projects/bookbinder-studio/",
  "/projects/travel-planner/",
  "/projects/personal-crm/",
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

test("homepage renders editorial masthead, Day Job field desk card, real projects, and graceful empty teasers", async () => {
  const { body } = await fetchText("/")
  assert.ok(body.includes("Software Engineer"))
  assert.ok(body.includes("Day Job"))
  assert.ok(body.includes("Google · Software Engineer"))
  assert.ok(body.includes("Currently Building"))
  assert.ok(body.includes("Bookbinder Studio"))
  assert.ok(body.includes("Travel Planner"))
  assert.ok(body.includes("Personal CRM"))
  assert.ok(body.includes("First dispatches on the desk"))
  assert.ok(body.includes("Stocking the Shelf"))
  assert.ok(body.includes("Ready for Stamps"))
})

test("blog renders clean Notes Desk empty state when no posts are published", async () => {
  const { body } = await fetchText("/blog/")
  assert.ok(body.includes("Dispatches · Notes Desk"))
  assert.ok(body.includes("First dispatches on the desk"))
})

test("bookshelf renders warm empty state, native closedby dialog, and Bookbinder Studio link", async () => {
  const { body } = await fetchText("/books/")
  assert.ok(body.includes("Reading Room · Stocking the Shelf"))
  assert.ok(body.includes("Reading covers and quick notes from the margins are on the way."))
  assert.ok(body.includes('closedby="any"'))
  assert.ok(body.includes("https://anujgtm.com/Bookbinder/"))
})

test("travel atlas renders single unified World / U.S. atlas without duplicate maps or unrequested parks banner in World mode", async () => {
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
  assert.ok(body.includes("https://travel.anujgtm.com"))
})

test("projects, project dossiers, work, and /now showcase Anuj's real engineering history and builds", async () => {
  const projectsRes = await fetchText("/projects/")
  assert.ok(projectsRes.body.includes("Bookbinder Studio"))
  assert.ok(projectsRes.body.includes("https://anujgtm.com/Bookbinder/"))
  assert.ok(projectsRes.body.includes("Travel Planner"))
  assert.ok(projectsRes.body.includes("https://travel.anujgtm.com"))
  assert.ok(projectsRes.body.includes("Personal CRM"))
  assert.ok(projectsRes.body.includes("https://github.com/anujgtm1/personal-crm"))

  const dossierRes = await fetchText("/projects/bookbinder-studio/")
  assert.ok(dossierRes.body.includes('id="reading-progress"'))

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

test("Pages CMS config (.pages.yml) exists and configures all collections", () => {
  const pagesYmlPath = path.join(ROOT_DIR, ".pages.yml")
  assert.ok(existsSync(pagesYmlPath), ".pages.yml must exist at repository root")
  const content = readFileSync(pagesYmlPath, "utf8")
  for (const required of [
    "public/images/uploads",
    "src/content/blog",
    "src/content/books",
    "src/content/travel",
    "src/content/projects",
    "src/content/work",
    "src/content/now/current.md",
  ]) {
    assert.ok(content.includes(required), `.pages.yml missing "${required}"`)
  }
})
