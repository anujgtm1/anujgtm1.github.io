import type { Coordinates, MapPoint } from "./domain.ts"

export type ParkBiome =
  | "Alpine & Glacial"
  | "Arid & Canyon"
  | "Volcanic & Geothermal"
  | "Coastal & Island"
  | "Temperate Forest"
  | "Karst & Cavern"

export type ParkRegion =
  | "West"
  | "Mountain West"
  | "Southwest"
  | "Midwest"
  | "East"
  | "Alaska"
  | "Pacific Islands"
  | "Caribbean"

export type ParkInset = "lower48" | "alaska" | "hawaii" | "virgin-islands" | "american-samoa"

export type ParkEmblemKind =
  | "arch"
  | "gateway-arch"
  | "half-dome"
  | "geyser"
  | "canyon"
  | "hoodoos"
  | "cathedral-peaks"
  | "volcano-cone"
  | "caldera-lake"
  | "giant-trees"
  | "saguaro"
  | "joshua-tree"
  | "dunes"
  | "lighthouse-coast"
  | "reef-island"
  | "fort-island"
  | "marsh-heron"
  | "misty-ridges"
  | "cavern"
  | "cliff-dwelling"
  | "monolith-fold"
  | "hot-springs"
  | "glacier-fjord"

export type ParkArtworkInk =
  | "sky-top"
  | "sky-bottom"
  | "far"
  | "mid"
  | "ink"
  | "deep"
  | "accent"
  | "accent-soft"
  | "paper"
  | "none"

export type ParkArtworkSkyMood = "dawn" | "noon" | "dusk" | "night" | "mist"

type ParkArtworkPaint = {
  readonly fill?: ParkArtworkInk
  readonly stroke?: ParkArtworkInk
  readonly strokeWidth?: number
  readonly strokeLinecap?: "round" | "butt" | "square"
  readonly strokeLinejoin?: "round" | "miter" | "bevel"
  readonly strokeDasharray?: string
  readonly opacity?: number
}

export type ParkArtworkNode =
  | (ParkArtworkPaint & {
      readonly kind: "path"
      readonly d: string
    })
  | (ParkArtworkPaint & {
      readonly kind: "circle"
      readonly cx: number
      readonly cy: number
      readonly r: number
    })
  | (ParkArtworkPaint & {
      readonly kind: "ellipse"
      readonly cx: number
      readonly cy: number
      readonly rx: number
      readonly ry: number
    })
  | (ParkArtworkPaint & {
      readonly kind: "rect"
      readonly x: number
      readonly y: number
      readonly width: number
      readonly height: number
      readonly rx?: number
    })
  | (ParkArtworkPaint & {
      readonly kind: "line"
      readonly x1: number
      readonly y1: number
      readonly x2: number
      readonly y2: number
    })
  | (ParkArtworkPaint & {
      readonly kind: "polygon"
      readonly points: string
    })

export type ParkArtworkSpec = {
  readonly code: string
  readonly subject: string
  readonly accentLight: string
  readonly accentDark: string
  readonly skyMood: ParkArtworkSkyMood
  readonly nodes: readonly ParkArtworkNode[]
}

export type ParkPhoto = {
  readonly src: string
  readonly alt: string
  readonly caption?: string
}

export type ParkJournalEntry = {
  readonly visitedDate?: string
  readonly quote?: string
  readonly liked?: readonly string[]
  readonly notes?: string
  readonly photos?: readonly ParkPhoto[]
}

export type NationalPark = {
  readonly code: string
  readonly name: string
  readonly states: readonly string[]
  readonly region: ParkRegion
  readonly biome: ParkBiome
  readonly emblem: ParkEmblemKind
  readonly inset: ParkInset
  readonly coordinates: Coordinates
  readonly highPointFt: number
  readonly lowPointFt: number
  readonly acres: number
  readonly established: number
  readonly visited: boolean
  readonly pigmentLight: string
  readonly pigmentDark: string
  readonly landscapeNote: string
}

export type UsStateGeometry = {
  readonly fips: string
  readonly abbr: string
  readonly name: string
  readonly isLower48: boolean
  readonly visited: boolean
  readonly centroidX: number
  readonly centroidY: number
  readonly d: string
}

export type WorldCountryGeometry = {
  readonly id: string
  readonly name: string
  readonly centroidX: number
  readonly centroidY: number
  readonly d: string
}

export type ProjectedPark = NationalPark & {
  readonly mapPoint: MapPoint
  readonly humboldtPoint: MapPoint
  readonly journal?: ParkJournalEntry
}

export type ParkSurveySummary = {
  readonly totalParks: number
  readonly visitedParks: number
  readonly remainingParks: number
  readonly lower48ParksTotal: number
  readonly lower48ParksVisited: number
  readonly totalStates: number
  readonly visitedStates: number
  readonly lower48StatesTotal: number
  readonly lower48StatesVisited: number
  readonly totalVisitedAcres: number
  readonly elevationSpanFt: {
    readonly min: number
    readonly max: number
  }
}
