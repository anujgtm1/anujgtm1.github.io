import type { ParkArtworkSpec } from "../../types/parks.ts"
import { PILOT_PARK_ARTWORKS } from "./pilot.ts"
import { SOUTHWEST_PARK_ARTWORKS } from "./southwest.ts"

const ALL_PARK_ARTWORKS: readonly ParkArtworkSpec[] = [
  ...PILOT_PARK_ARTWORKS,
  ...SOUTHWEST_PARK_ARTWORKS,
]

const artworkEntries: readonly (readonly [string, ParkArtworkSpec])[] = ALL_PARK_ARTWORKS.map(
  (artwork) => [artwork.code, artwork] as const,
)

export const PARK_ARTWORKS: Readonly<Record<string, ParkArtworkSpec>> =
  Object.fromEntries(artworkEntries)

export function getParkArtwork(code: string): ParkArtworkSpec | undefined {
  return PARK_ARTWORKS[code]
}

export { PILOT_PARK_ARTWORKS, SOUTHWEST_PARK_ARTWORKS }
