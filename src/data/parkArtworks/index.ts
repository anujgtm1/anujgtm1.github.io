import type { ParkArtworkSpec } from "../../types/parks.ts"

export const PARK_ARTWORKS: Readonly<Record<string, ParkArtworkSpec>> = {}

export function getParkArtwork(code: string): ParkArtworkSpec | undefined {
  return PARK_ARTWORKS[code]
}
