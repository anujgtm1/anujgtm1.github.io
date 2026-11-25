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
  "/blog/2026-04-22-sisyphus-chooses-to-push/",
  "/books/",
  "/travel/",
  "/travel/tokyo/",
  "/projects/",
  "/projects/bookbinder-studio/",
  "/projects/travel-planner/",
  "/projects/personal-crm/",
  "/work/",
  "/now/",
  "/search/",
]

test("all primary HTML routes return 200, declare dual color-scheme, and contain zero template leftovers", async () => {
  for (const route of HTML_ROUTES) {
    const { status, body } = await fetchText(route)
    assert.equal(status, 200, `Expected 200 for ${route}, got ${status}`)
    assert.ok(
      body.includes('<meta name="color-scheme" content="light dark">'),
      `Missing color-scheme meta tag on ${route}`,
    )
    assert.ok(body.includes("Anuj Gautam"), `Missing author brand on ${route}`)
    for (const forbidden of FORBIDDEN_TEMPLATE_STRINGS) {
      assert.ok(
        !body.includes(forbidden),
        `Found forbidden template leftover "${forbidden}" on ${route}`,
      )
    }
  }
})

test("homepage renders editorial masthead, real projects, field desk, bookshelf, and travel previews", async () => {
  const { body } = await fetchText("/")
  assert.ok(body.includes("Software Engineer"))
  assert.ok(body.includes("Currently Reading"))
  assert.ok(body.includes("Bookbinder Studio"))
  assert.ok(body.includes("Travel Planner"))
  assert.ok(body.includes("Personal CRM"))
  assert.ok(body.includes("Invisible Cities"))
  assert.ok(body.includes("HND"))
})

test("blog preserves Anuj's Sisyphus note and includes reading progress bar on article pages", async () => {
  const indexRes = await fetchText("/blog/")
  assert.ok(indexRes.body.includes("Sisyphus chooses to push the boulder"))

  const postRes = await fetchText("/blog/2026-04-22-sisyphus-chooses-to-push/")
  assert.ok(postRes.body.includes("Sisyphus still chooses push the boulder"))
  assert.ok(postRes.body.includes('id="reading-progress"'))
})

test("bookshelf renders year-by-year cover wall, native closedby dialog, and Bookbinder Studio link", async () => {
  const { body } = await fetchText("/books/")
  assert.ok(body.includes("2026"))
  assert.ok(body.includes("2025"))
  assert.ok(body.includes("2024"))
  assert.ok(body.includes("The Myth of Sisyphus"))
  assert.ok(body.includes('closedby="any"'))
  assert.ok(body.includes("https://anujgtm.com/Bookbinder/"))
})

test("travel atlas renders world projection, Tokyo stamp, and Travel Planner companion link", async () => {
  const indexRes = await fetchText("/travel/")
  assert.ok(indexRes.body.includes("Archival World Projection"))
  assert.ok(indexRes.body.includes("Tokyo"))
  assert.ok(indexRes.body.includes("HND"))
  assert.ok(indexRes.body.includes("https://travel.anujgtm.com"))

  const tokyoRes = await fetchText("/travel/tokyo/")
  assert.ok(tokyoRes.body.includes("Late Autumn Alleys"))
  assert.ok(tokyoRes.body.includes("35.68° N, 139.65° E"))
})

test("projects and work showcase Anuj's authentic engineering history and real builds", async () => {
  const projectsRes = await fetchText("/projects/")
  assert.ok(projectsRes.body.includes("Bookbinder Studio"))
  assert.ok(projectsRes.body.includes("https://anujgtm.com/Bookbinder/"))
  assert.ok(projectsRes.body.includes("Travel Planner"))
  assert.ok(projectsRes.body.includes("https://travel.anujgtm.com"))
  assert.ok(projectsRes.body.includes("Personal CRM"))
  assert.ok(projectsRes.body.includes("https://github.com/anujgtm1/personal-crm"))

  const workRes = await fetchText("/work/")
  assert.ok(workRes.body.includes("Google"))
  assert.ok(workRes.body.includes("University of Illinois"))
  assert.ok(workRes.body.includes("Facebook"))
  assert.ok(workRes.body.includes("University of Tennessee"))
})

test("rss.xml returns valid XML with canonical links for blog, travel, and projects", async () => {
  const { status, body } = await fetchText("/rss.xml")
  assert.equal(status, 200)
  assert.ok(body.includes("<rss"))
  assert.ok(body.includes("/blog/2026-04-22-sisyphus-chooses-to-push/"))
  assert.ok(body.includes("/travel/tokyo/"))
  assert.ok(body.includes("/projects/bookbinder-studio/"))
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
