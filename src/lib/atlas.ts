import type { Coordinates, MapPoint, TravelItem, TravelRegion } from "../types/domain.ts"

export const ATLAS_VIEWBOX = {
  width: 1000,
  height: 500,
} as const

export const TRAVEL_REGIONS: readonly TravelRegion[] = [
  "North America",
  "Europe",
  "Asia",
  "South America",
  "Africa",
  "Oceania",
] as const

export type LandmassShape = {
  readonly id: string
  readonly label: string
  readonly d: string
}

/**
 * Stylized equirectangular landmass silhouettes in the 1000x500 coordinate frame
 * where x = ((lng + 180) / 360) * 1000 and y = ((90 - lat) / 180) * 500.
 */
export const WORLD_LANDMASSES: readonly LandmassShape[] = [
  {
    id: "north-america",
    label: "North America",
    d: "M 42 74 L 78 58 L 128 56 L 178 60 L 222 68 L 266 78 L 288 94 L 328 100 L 336 116 L 310 132 L 292 146 L 282 166 L 274 182 L 264 176 L 244 168 L 232 178 L 248 190 L 264 202 L 280 224 L 270 228 L 248 214 L 220 202 L 198 186 L 172 162 L 154 136 L 146 112 L 122 88 L 88 82 L 54 90 Z",
  },
  {
    id: "greenland",
    label: "Greenland",
    d: "M 352 78 L 368 42 L 408 24 L 444 36 L 434 62 L 402 82 L 372 86 Z",
  },
  {
    id: "iceland",
    label: "Iceland",
    d: "M 432 70 L 446 66 L 462 68 L 460 75 L 444 77 L 434 74 Z",
  },
  {
    id: "south-america",
    label: "South America",
    d: "M 282 224 L 314 218 L 346 232 L 382 252 L 404 270 L 396 298 L 378 326 L 352 356 L 326 386 L 310 404 L 298 394 L 294 358 L 284 316 L 272 276 L 274 246 Z",
  },
  {
    id: "uk-ireland",
    label: "British Isles",
    d: "M 480 94 L 492 88 L 502 98 L 504 110 L 488 113 L 480 104 Z",
  },
  {
    id: "europe",
    label: "Europe",
    d: "M 474 146 L 474 130 L 492 118 L 512 104 L 522 96 L 512 80 L 538 64 L 578 52 L 594 64 L 584 82 L 606 72 L 622 88 L 614 118 L 598 132 L 578 136 L 566 148 L 552 146 L 542 134 L 534 142 L 522 134 L 504 138 L 490 148 Z",
  },
  {
    id: "africa",
    label: "Africa",
    d: "M 480 152 L 526 148 L 566 158 L 594 166 L 612 192 L 640 216 L 634 244 L 612 278 L 598 312 L 570 346 L 546 346 L 532 310 L 524 274 L 516 244 L 480 238 L 456 222 L 452 196 L 466 168 Z",
  },
  {
    id: "madagascar",
    label: "Madagascar",
    d: "M 626 292 L 636 286 L 642 308 L 632 322 L 622 312 Z",
  },
  {
    id: "asia",
    label: "Asia",
    d: "M 604 72 L 664 58 L 748 44 L 832 46 L 916 54 L 976 66 L 952 86 L 942 108 L 920 96 L 888 104 L 866 130 L 856 154 L 842 164 L 834 190 L 806 218 L 788 238 L 774 226 L 762 200 L 740 198 L 718 228 L 704 222 L 690 186 L 664 188 L 642 208 L 622 214 L 602 182 L 592 162 L 574 144 L 598 132 L 614 114 Z",
  },
  {
    id: "japan",
    label: "Japan",
    d: "M 888 126 L 902 130 L 896 146 L 888 156 L 868 160 L 864 152 L 882 144 Z",
  },
  {
    id: "southeast-islands",
    label: "Maritime Southeast Asia",
    d: "M 776 248 L 808 256 L 838 262 L 862 260 L 856 270 L 820 272 L 782 262 Z",
  },
  {
    id: "australia",
    label: "Australia",
    d: "M 818 308 L 856 284 L 896 282 L 926 312 L 924 342 L 898 358 L 866 340 L 826 346 L 814 328 Z",
  },
  {
    id: "new-zealand",
    label: "New Zealand",
    d: "M 976 346 L 988 354 L 974 374 L 962 378 L 968 360 Z",
  },
] as const

export function isValidCoordinates(coords: Coordinates): boolean {
  return (
    Number.isFinite(coords.lat) &&
    Number.isFinite(coords.lng) &&
    coords.lat >= -90 &&
    coords.lat <= 90 &&
    coords.lng >= -180 &&
    coords.lng <= 180
  )
}

export function projectCoordinatesToMap(
  coords: Coordinates,
  width: number = ATLAS_VIEWBOX.width,
  height: number = ATLAS_VIEWBOX.height,
): MapPoint {
  if (!isValidCoordinates(coords)) {
    throw new RangeError(
      `Invalid coordinates: lat=${String(coords.lat)}, lng=${String(coords.lng)}`,
    )
  }
  if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
    throw new RangeError(`Invalid map dimensions: width=${String(width)}, height=${String(height)}`)
  }

  const rawX = ((coords.lng + 180) / 360) * width
  const rawY = ((90 - coords.lat) / 180) * height

  return {
    x: Math.round(rawX * 100) / 100,
    y: Math.round(rawY * 100) / 100,
  }
}

export function formatCoordinates(coords: Coordinates): string {
  if (!isValidCoordinates(coords)) {
    throw new RangeError(
      `Invalid coordinates: lat=${String(coords.lat)}, lng=${String(coords.lng)}`,
    )
  }

  const latHemisphere = coords.lat >= 0 ? "N" : "S"
  const lngHemisphere = coords.lng >= 0 ? "E" : "W"
  const latVal = Math.abs(coords.lat).toFixed(2)
  const lngVal = Math.abs(coords.lng).toFixed(2)

  return `${latVal}° ${latHemisphere}, ${lngVal}° ${lngHemisphere}`
}

export function filterTravelByRegion(
  items: readonly TravelItem[],
  region: TravelRegion | "All",
): readonly TravelItem[] {
  if (region === "All") {
    return items
  }
  return items.filter((item) => item.region === region)
}

export function getAvailableRegions(items: readonly TravelItem[]): readonly TravelRegion[] {
  const present = new Set(items.map((item) => item.region))
  return TRAVEL_REGIONS.filter((region) => present.has(region))
}
