import assert from "node:assert/strict"
import test from "node:test"
import {
  ATLAS_VIEWBOX,
  filterTravelByRegion,
  formatCoordinates,
  getAvailableRegions,
  isValidCoordinates,
  projectCoordinatesToMap,
} from "../../src/lib/atlas.ts"
import type { TravelItem } from "../../src/types/domain.ts"

const sampleTrips: readonly TravelItem[] = [
  {
    slug: "tokyo",
    title: "Tokyo in Late Autumn",
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    stampCode: "HND",
    date: "2025-11-12",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    summary: "Morning coffee in Shimokitazawa and quiet temple alleys.",
    highlights: ["Shimokitazawa", "Meiji Jingu"],
  },
  {
    slug: "reykjavik",
    title: "Iceland Ring Road Notes",
    city: "Reykjavik",
    country: "Iceland",
    region: "Europe",
    stampCode: "KEF",
    date: "2025-07-04",
    coordinates: { lat: 64.1466, lng: -21.9426 },
    summary: "Basalt cliffs and midnight twilight.",
    highlights: ["Vik", "Golden Circle"],
  },
]

test("projectCoordinatesToMap projects null island to center of viewbox", () => {
  const point = projectCoordinatesToMap({ lat: 0, lng: 0 })
  assert.deepEqual(point, {
    x: ATLAS_VIEWBOX.width / 2,
    y: ATLAS_VIEWBOX.height / 2,
  })
})

test("projectCoordinatesToMap projects Tokyo and Reykjavik into expected hemispheres", () => {
  const tokyo = projectCoordinatesToMap({ lat: 35.6762, lng: 139.6503 })
  assert.ok(tokyo.x > 850 && tokyo.x < 920)
  assert.ok(tokyo.y > 130 && tokyo.y < 170)

  const reykjavik = projectCoordinatesToMap({ lat: 64.1466, lng: -21.9426 })
  assert.ok(reykjavik.x > 420 && reykjavik.x < 460)
  assert.ok(reykjavik.y > 60 && reykjavik.y < 85)
})

test("projectCoordinatesToMap rejects out-of-range coordinates and invalid dimensions", () => {
  assert.equal(isValidCoordinates({ lat: 91, lng: 0 }), false)
  assert.equal(isValidCoordinates({ lat: 0, lng: -181 }), false)
  assert.equal(isValidCoordinates({ lat: Number.NaN, lng: 10 }), false)

  assert.throws(() => projectCoordinatesToMap({ lat: 95, lng: 10 }), RangeError)
  assert.throws(() => projectCoordinatesToMap({ lat: 10, lng: 200 }), RangeError)
  assert.throws(() => projectCoordinatesToMap({ lat: 10, lng: 10 }, 0, 500), RangeError)
})

test("formatCoordinates formats N/S and E/W hemispheres accurately", () => {
  assert.equal(formatCoordinates({ lat: 35.6762, lng: 139.6503 }), "35.68° N, 139.65° E")
  assert.equal(formatCoordinates({ lat: 64.1466, lng: -21.9426 }), "64.15° N, 21.94° W")
  assert.equal(formatCoordinates({ lat: -33.8688, lng: 151.2093 }), "33.87° S, 151.21° E")
})

test("filterTravelByRegion and getAvailableRegions return expected subsets", () => {
  assert.equal(filterTravelByRegion(sampleTrips, "All").length, 2)
  assert.equal(filterTravelByRegion(sampleTrips, "Asia").length, 1)
  assert.equal(filterTravelByRegion(sampleTrips, "Asia")[0]?.slug, "tokyo")
  assert.equal(filterTravelByRegion(sampleTrips, "Africa").length, 0)
  assert.deepEqual(getAvailableRegions(sampleTrips), ["Europe", "Asia"])
})
