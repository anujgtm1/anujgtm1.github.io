import type { Coordinates, MapPoint } from "../types/index.ts"

const DEG_TO_RAD = Math.PI / 180

export const WORLD_NE_FRAME = {
  width: 1000,
  height: 520,
  scale: 178,
  cx: 500,
  cy: 292,
} as const

/**
 * Natural Earth I forward projection (Tom Patterson, 2012) matching
 * `src/data/worldCountries.ts` and `src/data/usStatesWorld.ts` pixel-for-pixel.
 */
export function projectNaturalEarth(coords: Coordinates): MapPoint {
  const phi = Math.max(-60, Math.min(84, coords.lat)) * DEG_TO_RAD
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
