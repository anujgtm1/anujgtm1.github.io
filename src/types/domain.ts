export type Page = {
  readonly TITLE: string
  readonly DESCRIPTION: string
}

export interface Site extends Page {
  readonly AUTHOR: string
}

export type NavLink = {
  readonly TEXT: string
  readonly HREF: string
}

export type Links = readonly NavLink[]

export type SocialLink = {
  readonly NAME: string
  readonly ICON: string
  readonly TEXT: string
  readonly HREF: string
}

export type Socials = readonly SocialLink[]

export type BookStatus = "reading" | "favorite" | "finished" | "queued"

export type BookSpineTheme =
  | "burgundy"
  | "forest"
  | "navy"
  | "ochre"
  | "terracotta"
  | "slate"
  | "charcoal"
  | "plum"

export type TravelRegion =
  | "North America"
  | "Europe"
  | "Asia"
  | "South America"
  | "Africa"
  | "Oceania"

export type ProjectStatus = "active" | "shipped" | "research" | "archived"

export type Coordinates = {
  readonly lat: number
  readonly lng: number
}

export type MapPoint = {
  readonly x: number
  readonly y: number
}

export type BookItem = {
  readonly slug: string
  readonly title: string
  readonly author: string
  readonly status: BookStatus
  readonly rating?: number
  readonly dateRead?: string
  readonly yearRead: number | null
  readonly pages?: number
  readonly isbn?: string
  readonly coverUrl?: string
  readonly tags: readonly string[]
  readonly spineTheme: BookSpineTheme
  readonly quote?: string
  readonly summary: string
  readonly notesHtml: string
}

export type TravelItem = {
  readonly slug: string
  readonly title: string
  readonly city: string
  readonly country: string
  readonly region: TravelRegion
  readonly stampCode: string
  readonly date: string
  readonly coordinates: Coordinates
  readonly summary: string
  readonly highlights: readonly string[]
}

export type ProjectItem = {
  readonly slug: string
  readonly title: string
  readonly summary: string
  readonly date: string
  readonly status: ProjectStatus
  readonly role?: string
  readonly tags: readonly string[]
  readonly repoUrl?: string
  readonly demoUrl?: string
  readonly featured?: boolean
}

export type BlogItem = {
  readonly slug: string
  readonly title: string
  readonly summary: string
  readonly date: string
  readonly tags: readonly string[]
  readonly readingMinutes?: number
}

export type NowSnapshot = {
  readonly updatedAt: string
  readonly location: string
  readonly currentlyReading?: string
  readonly currentlyBuilding: string
  readonly nextTrip?: string
  readonly listeningOrThinking: string
}

export type SearchItem =
  | {
      readonly kind: "blog"
      readonly id: string
      readonly title: string
      readonly subtitle: string
      readonly summary: string
      readonly href: string
      readonly date?: string
      readonly tags: readonly string[]
    }
  | {
      readonly kind: "project"
      readonly id: string
      readonly title: string
      readonly subtitle: string
      readonly summary: string
      readonly href: string
      readonly date?: string
      readonly tags: readonly string[]
      readonly status: ProjectStatus
    }
  | {
      readonly kind: "book"
      readonly id: string
      readonly title: string
      readonly subtitle: string
      readonly summary: string
      readonly href: string
      readonly date?: string
      readonly tags: readonly string[]
      readonly status: BookStatus
      readonly author: string
    }
  | {
      readonly kind: "travel"
      readonly id: string
      readonly title: string
      readonly subtitle: string
      readonly summary: string
      readonly href: string
      readonly date?: string
      readonly tags: readonly string[]
      readonly region: TravelRegion
      readonly stampCode: string
    }

export type RssFeedEntry =
  | {
      readonly collection: "blog"
      readonly slug: string
      readonly title: string
      readonly summary: string
      readonly date: Date
      readonly draft?: boolean
    }
  | {
      readonly collection: "travel"
      readonly slug: string
      readonly title: string
      readonly summary: string
      readonly date: Date
      readonly draft?: boolean
    }
  | {
      readonly collection: "projects"
      readonly slug: string
      readonly title: string
      readonly summary: string
      readonly date: Date
      readonly draft?: boolean
    }

export type RssFeedItem = {
  readonly title: string
  readonly description: string
  readonly pubDate: Date
  readonly link: string
}
