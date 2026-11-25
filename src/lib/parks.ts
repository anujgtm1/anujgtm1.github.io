import type {
  Coordinates,
  MapPoint,
  NationalPark,
  ParkBiome,
  ParkSurveySummary,
  ProjectedPark,
  UsStateGeometry,
} from "../types/index.ts"
import { NATIONAL_PARKS } from "../data/nationalParks.ts"
import { US_ALBERS_VIEWBOX, US_STATES } from "../data/usStates.ts"

const DEG_TO_RAD = Math.PI / 180

export const PARK_BIOMES: readonly ParkBiome[] = [
  "Alpine & Glacial",
  "Volcanic & Geothermal",
  "Arid & Canyon",
  "Temperate Forest",
  "Coastal & Island",
  "Karst & Cavern",
] as const

export const TERRITORY_INSETS = {
  virginIslands: {
    id: "virgin-islands",
    label: "U.S. Virgin Islands",
    shortLabel: "USVI",
    x: 786,
    y: 506,
    width: 78,
    height: 76,
    cx: 825,
    cy: 548,
  },
  americanSamoa: {
    id: "american-samoa",
    label: "American Samoa",
    shortLabel: "AS",
    x: 874,
    y: 506,
    width: 78,
    height: 76,
    cx: 913,
    cy: 548,
  },
} as const

type ConicParams = {
  readonly parallel0Deg: number
  readonly parallel1Deg: number
  readonly rotateLngDeg: number
  readonly centerLngDeg: number
  readonly centerLatDeg: number
  readonly scale: number
  readonly translateX: number
  readonly translateY: number
}

const ALBERS_SCALE = 1300
const ALBERS_TX = 487.5
const ALBERS_TY = 305

const LOWER48_CONIC: ConicParams = {
  parallel0Deg: 29.5,
  parallel1Deg: 45.5,
  rotateLngDeg: 96,
  centerLngDeg: -0.6,
  centerLatDeg: 38.7,
  scale: ALBERS_SCALE,
  translateX: ALBERS_TX,
  translateY: ALBERS_TY,
}

const ALASKA_CONIC: ConicParams = {
  parallel0Deg: 55,
  parallel1Deg: 65,
  rotateLngDeg: 154,
  centerLngDeg: -2,
  centerLatDeg: 58.5,
  scale: ALBERS_SCALE * 0.35,
  translateX: ALBERS_TX - 0.307 * ALBERS_SCALE,
  translateY: ALBERS_TY + 0.201 * ALBERS_SCALE,
}

const HAWAII_CONIC: ConicParams = {
  parallel0Deg: 8,
  parallel1Deg: 18,
  rotateLngDeg: 157,
  centerLngDeg: -3,
  centerLatDeg: 19.9,
  scale: ALBERS_SCALE,
  translateX: ALBERS_TX - 0.205 * ALBERS_SCALE,
  translateY: ALBERS_TY + 0.212 * ALBERS_SCALE,
}

function projectConicEqualArea(coords: Coordinates, params: ConicParams): MapPoint {
  const phi0 = params.parallel0Deg * DEG_TO_RAD
  const phi1 = params.parallel1Deg * DEG_TO_RAD
  const sinPhi0 = Math.sin(phi0)
  const n = (sinPhi0 + Math.sin(phi1)) / 2
  const c = 1 + sinPhi0 * (2 * n - sinPhi0)
  const r0 = Math.sqrt(c) / n

  const raw = (lambdaDeg: number, phiDeg: number): [number, number] => {
    const lambda = lambdaDeg * DEG_TO_RAD
    const phi = phiDeg * DEG_TO_RAD
    const r = Math.sqrt(Math.max(0, c - 2 * n * Math.sin(phi))) / n
    const theta = n * lambda
    return [r * Math.sin(theta), r0 - r * Math.cos(theta)]
  }

  const [dx, dy] = raw(params.centerLngDeg, params.centerLatDeg)
  const [rx, ry] = raw(coords.lng + params.rotateLngDeg, coords.lat)

  return {
    x: Math.round((params.translateX + params.scale * (rx - dx)) * 10) / 10,
    y: Math.round((params.translateY - params.scale * (ry - dy)) * 10) / 10,
  }
}

export function projectParkToAlbersUsa(park: NationalPark): MapPoint {
  switch (park.inset) {
    case "lower48":
      return projectConicEqualArea(park.coordinates, LOWER48_CONIC)
    case "alaska":
      return projectConicEqualArea(park.coordinates, ALASKA_CONIC)
    case "hawaii":
      return projectConicEqualArea(park.coordinates, HAWAII_CONIC)
    case "virgin-islands":
      return { x: TERRITORY_INSETS.virginIslands.cx, y: TERRITORY_INSETS.virginIslands.cy }
    case "american-samoa":
      return { x: TERRITORY_INSETS.americanSamoa.cx, y: TERRITORY_INSETS.americanSamoa.cy }
  }
}

/**
 * Projects a park into the Humboldt Naturgemälde elevation-vs-longitude panorama
 * within the same 975x610 coordinate space so map <-> panorama morphing is seamless.
 */
export function projectParkToHumboldt(
  park: NationalPark,
  width: number = US_ALBERS_VIEWBOX.width,
  height: number = US_ALBERS_VIEWBOX.height,
): MapPoint {
  const padLeft = 74
  const padRight = 54
  const padTop = 64
  const padBottom = 86

  // Normalize longitude smoothly from Pacific/Alaska (-171°) to Maine/USVI (-64°)
  // Give the dense Lower 48 corridor (-125° to -67°) generous horizontal breathing room
  const lng = park.coordinates.lng
  let normX: number
  if (lng < -125) {
    // Pacific & Alaska (-171..-125) occupy leftmost 20%
    const t = Math.max(0, Math.min(1, (lng - -171) / 46))
    normX = 0.02 + t * 0.18
  } else {
    // Lower 48 + USVI (-125..-64) occupy remaining 78%
    const t = Math.max(0, Math.min(1, (lng - -125) / 61))
    normX = 0.22 + t * 0.76
  }

  // Elevation scale: non-linear sqrt curve so coastal/lowland parks don't crush together
  // while Denali (20,310 ft) crowns the alpine horizon.
  const maxElev = 20500
  const clampedElev = Math.max(0, Math.min(maxElev, park.highPointFt))
  const normY = Math.pow(clampedElev / maxElev, 0.72)

  const x = padLeft + normX * (width - padLeft - padRight)
  const y = height - padBottom - normY * (height - padTop - padBottom)

  return {
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10,
  }
}

export function getProjectedParks(
  parks: readonly NationalPark[] = NATIONAL_PARKS,
): readonly ProjectedPark[] {
  return parks.map((park) => ({
    ...park,
    mapPoint: projectParkToAlbersUsa(park),
    humboldtPoint: projectParkToHumboldt(park),
  }))
}

export function computeParkSurveySummary(
  parks: readonly NationalPark[] = NATIONAL_PARKS,
  states: readonly UsStateGeometry[] = US_STATES,
): ParkSurveySummary {
  const visitedParksList = parks.filter((p) => p.visited)
  const lower48Parks = parks.filter((p) => p.inset === "lower48")
  const realStates = states.filter((s) => s.abbr !== "DC")
  const lower48States = realStates.filter((s) => s.isLower48)

  let minElev = Number.POSITIVE_INFINITY
  let maxElev = Number.NEGATIVE_INFINITY
  for (const park of parks) {
    if (park.lowPointFt < minElev) minElev = park.lowPointFt
    if (park.highPointFt > maxElev) maxElev = park.highPointFt
  }

  return {
    totalParks: parks.length,
    visitedParks: visitedParksList.length,
    remainingParks: parks.length - visitedParksList.length,
    lower48ParksTotal: lower48Parks.length,
    lower48ParksVisited: lower48Parks.filter((p) => p.visited).length,
    totalStates: realStates.length,
    visitedStates: realStates.filter((s) => s.visited).length,
    lower48StatesTotal: lower48States.length,
    lower48StatesVisited: lower48States.filter((s) => s.visited).length,
    totalVisitedAcres: visitedParksList.reduce((acc, p) => acc + p.acres, 0),
    elevationSpanFt: {
      min: Number.isFinite(minElev) ? minElev : 0,
      max: Number.isFinite(maxElev) ? maxElev : 0,
    },
  }
}

/**
 * Deterministic hash in [0, 1) from a string seed for organic procedural contours.
 */
export function hashSeed(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) / 4294967296
}

export type ContourRingSpec = {
  readonly level: number
  readonly radius: number
  readonly path: string
}

/**
 * Generates deterministic, organic closed topographic contour rings unique to each park.
 * Centered at (0, 0) so callers can translate/scale cleanly in SVG.
 */
export function generateParkContourRings(
  park: NationalPark,
  ringCount: number = 4,
  maxRadius: number = 14,
): readonly ContourRingSpec[] {
  const s1 = hashSeed(`${park.code}-a`) * Math.PI * 2
  const s2 = hashSeed(`${park.code}-b`) * Math.PI * 2
  const s3 = hashSeed(`${park.code}-c`) * Math.PI * 2
  const lobes = 2 + Math.floor(hashSeed(`${park.code}-l`) * 3) // 2..4 ridge lobes
  const steps = 28

  const rings: ContourRingSpec[] = []
  for (let level = 0; level < ringCount; level++) {
    const frac = (level + 1) / ringCount
    const rBase = maxRadius * frac
    const wobbleAmp = 0.14 + (1 - frac) * 0.08
    const pts: Array<[number, number]> = []

    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2
      const mod =
        1 +
        wobbleAmp * Math.sin(a * lobes + s1) +
        wobbleAmp * 0.55 * Math.cos(a * (lobes + 1) + s2) +
        wobbleAmp * 0.3 * Math.sin(a * 2 + s3 + level * 0.6)
      const r = rBase * mod
      pts.push([Math.round(Math.cos(a) * r * 10) / 10, Math.round(Math.sin(a) * r * 10) / 10])
    }

    let d = `M${pts[0][0]},${pts[0][1]}`
    for (let i = 1; i < pts.length; i++) {
      d += `L${pts[i][0]},${pts[i][1]}`
    }
    d += "Z"
    rings.push({ level, radius: rBase, path: d })
  }

  return rings
}

/**
 * Computes a clean nearest-neighbor pen-plotter route threading all visited Lower 48 parks,
 * starting at Olympic (northwest corner) and sweeping across the continent to Acadia.
 */
export function computeVisitedLower48Route(
  parks: readonly ProjectedPark[],
): readonly ProjectedPark[] {
  const pool = parks.filter((p) => p.visited && p.inset === "lower48")
  if (pool.length <= 1) return pool

  const remaining = [...pool]
  // Start at Olympic (most northwestern visited Lower 48 park)
  remaining.sort((a, b) => a.mapPoint.x - b.mapPoint.x || a.mapPoint.y - b.mapPoint.y)
  const first = remaining.shift()
  if (!first) return []
  const route: ProjectedPark[] = [first]

  while (remaining.length > 0) {
    const last = route[route.length - 1]
    let bestIdx = 0
    let bestDist = Number.POSITIVE_INFINITY
    for (let i = 0; i < remaining.length; i++) {
      const cand = remaining[i]
      const dx = cand.mapPoint.x - last.mapPoint.x
      const dy = cand.mapPoint.y - last.mapPoint.y
      const dist = dx * dx + dy * dy
      if (dist < bestDist) {
        bestDist = dist
        bestIdx = i
      }
    }
    route.push(remaining.splice(bestIdx, 1)[0])
  }

  return route
}

export function formatElevationFt(ft: number): string {
  return `${ft.toLocaleString("en-US")} ft`
}

export function formatAcres(acres: number): string {
  if (acres >= 1_000_000) {
    return `${(acres / 1_000_000).toFixed(2)}M ac`
  }
  return `${acres.toLocaleString("en-US")} ac`
}
