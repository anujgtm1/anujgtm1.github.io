import type { Coordinates, MapPoint, WorldCountryGeometry } from "../types/index.ts"

const DEG_TO_RAD = Math.PI / 180

export const USA_ISO_ID = "840" as const

export const WORLD_NE_FRAME = {
  width: 1000,
  height: 520,
  scale: 178,
  cx: 500,
  cy: 292,
} as const

export const WORLD_NE_LAT_MIN = -60
export const WORLD_NE_LAT_MAX = 84

export type NaturalEarthGraticuleLine = {
  readonly value: number
  readonly isPrimary: boolean
  readonly d: string
}

export type NaturalEarthGraticule = {
  readonly outlinePath: string
  readonly parallels: readonly NaturalEarthGraticuleLine[]
  readonly meridians: readonly NaturalEarthGraticuleLine[]
}

/**
 * Natural Earth I forward projection (Tom Patterson, 2012) matching
 * `src/data/worldCountries.ts` pixel-for-pixel.
 */
export function projectNaturalEarth(coords: Coordinates): MapPoint {
  const phi = Math.max(WORLD_NE_LAT_MIN, Math.min(WORLD_NE_LAT_MAX, coords.lat)) * DEG_TO_RAD
  const lam = coords.lng * DEG_TO_RAD
  const phi2 = phi * phi
  const phi4 = phi2 * phi2

  const xRaw =
    lam *
    (0.8707 -
      0.131979 * phi2 -
      0.013791 * phi4 +
      phi4 * phi2 * (0.003971 * phi2 - 0.001529 * phi4))
  const yRaw =
    phi *
    (1.007226 +
      phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))

  return {
    x: Math.round((WORLD_NE_FRAME.cx + xRaw * WORLD_NE_FRAME.scale) * 10) / 10,
    y: Math.round((WORLD_NE_FRAME.cy - yRaw * WORLD_NE_FRAME.scale) * 10) / 10,
  }
}

function pointsToSvgPath(points: readonly MapPoint[], closed = false): string {
  if (points.length === 0) return ""
  const [first, ...rest] = points
  const segments = rest.map((pt) => `L${pt.x},${pt.y}`).join("")
  return `M${first.x},${first.y}${segments}${closed ? "Z" : ""}`
}

/**
 * Builds the curved Natural Earth I projection boundary and ocean graticule lines
 * within the exact 1000x520 coordinate space of `WORLD_COUNTRIES`.
 */
export function buildNaturalEarthGraticule(): NaturalEarthGraticule {
  const outlinePoints: MapPoint[] = []
  for (let lat = WORLD_NE_LAT_MIN; lat <= WORLD_NE_LAT_MAX; lat += 6) {
    outlinePoints.push(projectNaturalEarth({ lat, lng: -180 }))
  }
  for (let lng = -165; lng <= 180; lng += 15) {
    outlinePoints.push(projectNaturalEarth({ lat: WORLD_NE_LAT_MAX, lng }))
  }
  for (let lat = WORLD_NE_LAT_MAX - 6; lat >= WORLD_NE_LAT_MIN; lat -= 6) {
    outlinePoints.push(projectNaturalEarth({ lat, lng: 180 }))
  }
  for (let lng = 165; lng >= -180; lng -= 15) {
    outlinePoints.push(projectNaturalEarth({ lat: WORLD_NE_LAT_MIN, lng }))
  }

  const parallelLats = [-30, 0, 30, 60] as const
  const parallels: NaturalEarthGraticuleLine[] = parallelLats.map((lat) => {
    const pts: MapPoint[] = []
    for (let lng = -180; lng <= 180; lng += 15) {
      pts.push(projectNaturalEarth({ lat, lng }))
    }
    return {
      value: lat,
      isPrimary: lat === 0,
      d: pointsToSvgPath(pts),
    }
  })

  const meridianLngs = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150] as const
  const meridians: NaturalEarthGraticuleLine[] = meridianLngs.map((lng) => {
    const pts: MapPoint[] = []
    for (let lat = WORLD_NE_LAT_MIN; lat <= WORLD_NE_LAT_MAX; lat += 6) {
      pts.push(projectNaturalEarth({ lat, lng }))
    }
    return {
      value: lng,
      isPrimary: lng === 0,
      d: pointsToSvgPath(pts),
    }
  })

  return {
    outlinePath: pointsToSvgPath(outlinePoints, true),
    parallels,
    meridians,
  }
}

export type WorldCountryFilter = "all" | "visited"

export function filterWorldCountries(
  countries: readonly WorldCountryGeometry[],
  visitedIds: ReadonlySet<string>,
  filter: WorldCountryFilter,
  query: string,
): readonly WorldCountryGeometry[] {
  const normalizedQuery = query.trim().toLowerCase()
  return countries.filter((country) => {
    if (filter === "visited" && !visitedIds.has(country.id)) {
      return false
    }
    if (normalizedQuery.length > 0) {
      const haystack = `${country.name} ${country.id}`.toLowerCase()
      if (!haystack.includes(normalizedQuery)) {
        return false
      }
    }
    return true
  })
}
