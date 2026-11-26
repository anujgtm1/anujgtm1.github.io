import type { ParkArtworkSpec } from "../../types/parks.ts"
import { ALASKA_VOLCANIC_PARK_ARTWORKS } from "./alaskaVolcanic.ts"
import { ALPINE_FORESTS_PARK_ARTWORKS } from "./alpineForests.ts"
import { COASTS_EAST_PARK_ARTWORKS } from "./coastsEast.ts"
import { DESERTS_KARST_PARK_ARTWORKS } from "./desertsKarst.ts"
import { PILOT_PARK_ARTWORKS } from "./pilot.ts"
import { SOUTHWEST_PARK_ARTWORKS } from "./southwest.ts"

export const ALL_PARK_ARTWORKS: readonly ParkArtworkSpec[] = [
  ...PILOT_PARK_ARTWORKS,
  ...SOUTHWEST_PARK_ARTWORKS,
  ...DESERTS_KARST_PARK_ARTWORKS,
  ...ALPINE_FORESTS_PARK_ARTWORKS,
  ...ALASKA_VOLCANIC_PARK_ARTWORKS,
  ...COASTS_EAST_PARK_ARTWORKS,
]

const artworkEntries: readonly (readonly [string, ParkArtworkSpec])[] = ALL_PARK_ARTWORKS.map(
  (artwork) => [artwork.code, artwork] as const,
)

export const PARK_ARTWORKS: Readonly<Record<string, ParkArtworkSpec>> =
  Object.fromEntries(artworkEntries)

export function getParkArtwork(code: string): ParkArtworkSpec | undefined {
  return PARK_ARTWORKS[code]
}

export {
  ALASKA_VOLCANIC_PARK_ARTWORKS,
  ALPINE_FORESTS_PARK_ARTWORKS,
  COASTS_EAST_PARK_ARTWORKS,
  DESERTS_KARST_PARK_ARTWORKS,
  PILOT_PARK_ARTWORKS,
  SOUTHWEST_PARK_ARTWORKS,
}
