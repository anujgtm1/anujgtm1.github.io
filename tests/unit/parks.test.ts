import assert from "node:assert/strict"
import test from "node:test"
import { NATIONAL_PARKS } from "../../src/data/nationalParks.ts"
import { US_ALBERS_VIEWBOX, US_STATES } from "../../src/data/usStates.ts"
import {
  computeParkSurveySummary,
  computeVisitedLower48Route,
  generateParkContourRings,
  getProjectedParks,
  projectParkToAlbersUsa,
  projectParkToHumboldt,
} from "../../src/lib/parks.ts"

test("national parks dataset has all 63 parks with Anuj's exact 50/63 visited ledger", () => {
  assert.equal(NATIONAL_PARKS.length, 63)

  const codes = new Set(NATIONAL_PARKS.map((p) => p.code))
  assert.equal(codes.size, 63, "Every park must have a unique NPS alpha code")

  const summary = computeParkSurveySummary(NATIONAL_PARKS, US_STATES)
  assert.equal(summary.totalParks, 63)
  assert.equal(summary.visitedParks, 50)
  assert.equal(summary.remainingParks, 13)
  assert.equal(summary.lower48ParksTotal, 51)
  assert.equal(summary.lower48ParksVisited, 49)
  assert.equal(summary.lower48StatesTotal, 48)
  assert.equal(summary.lower48StatesVisited, 48)
  assert.equal(summary.totalStates, 50)
  assert.equal(summary.visitedStates, 48)

  const unvisitedCodes = NATIONAL_PARKS.filter((p) => !p.visited)
    .map((p) => p.code)
    .sort()
  assert.deepEqual(unvisitedCodes, [
    "BLCA",
    "CHIS",
    "DENA",
    "GAAR",
    "GLBA",
    "HALE",
    "HAVO",
    "KATM",
    "KEFJ",
    "KOVA",
    "LACL",
    "NPSA",
    "WRST",
  ])
})

test("Albers USA projection places every park cleanly inside the 975x610 viewport near its state", () => {
  const stateByAbbr = new Map(US_STATES.map((s) => [s.abbr, s]))

  for (const park of NATIONAL_PARKS) {
    const pt = projectParkToAlbersUsa(park)
    assert.ok(
      pt.x >= 0 && pt.x <= US_ALBERS_VIEWBOX.width,
      `${park.name} x=${pt.x} out of bounds`,
    )
    assert.ok(
      pt.y >= 0 && pt.y <= US_ALBERS_VIEWBOX.height,
      `${park.name} y=${pt.y} out of bounds`,
    )

    // Sanity check alignment with its primary state centroid for Lower 48 + HI
    if (park.inset === "lower48" || park.inset === "hawaii") {
      const state = stateByAbbr.get(park.states[0])
      assert.ok(state, `Missing state geometry for ${park.states[0]}`)
      const dist = Math.hypot(pt.x - state.centroidX, pt.y - state.centroidY)
      assert.ok(
        dist < 140,
        `${park.name} (${pt.x},${pt.y}) too far (${dist.toFixed(1)}px) from ${state.abbr} centroid (${state.centroidX},${state.centroidY})`,
      )
    }
  }
})

test("Humboldt elevation projection orders Denali above Everglades and Acadia east of Yosemite", () => {
  const byCode = new Map(NATIONAL_PARKS.map((p) => [p.code, p]))
  const denaPark = byCode.get("DENA")
  const everPark = byCode.get("EVER")
  const yosePark = byCode.get("YOSE")
  const acadPark = byCode.get("ACAD")
  assert.ok(denaPark && everPark && yosePark && acadPark)

  const dena = projectParkToHumboldt(denaPark)
  const ever = projectParkToHumboldt(everPark)
  const yose = projectParkToHumboldt(yosePark)
  const acad = projectParkToHumboldt(acadPark)

  assert.ok(dena.y < ever.y, "Denali must sit higher (smaller Y) than Everglades")
  assert.ok(acad.x > yose.x, "Acadia must sit east (larger X) of Yosemite")
})

test("contour ring generator and visited route produce deterministic geometry", () => {
  const projected = getProjectedParks()
  const ringsA = generateParkContourRings(projected[0], 4, 14)
  const ringsB = generateParkContourRings(projected[0], 4, 14)
  assert.equal(ringsA.length, 4)
  assert.deepEqual(ringsA, ringsB)

  const route = computeVisitedLower48Route(projected)
  assert.equal(route.length, 49)
  assert.equal(new Set(route.map((p) => p.code)).size, 49)
})
