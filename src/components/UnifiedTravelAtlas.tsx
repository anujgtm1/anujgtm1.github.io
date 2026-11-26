import { For, Show, createMemo, createSignal, onCleanup, onMount } from "solid-js"
import type {
  ProjectedPark,
  TravelItem,
  TravelThumbnailItem,
  UsStateGeometry,
  WorldCountryGeometry,
} from "@types"
import { US_ALBERS_VIEWBOX, US_STATES } from "@data/usStates"
import { VISITED_COUNTRY_IDS } from "@data/visitedCountries"
import { WORLD_COUNTRIES, WORLD_NE_VIEWBOX } from "@data/worldCountries"
import { formatCoordinates } from "@lib/atlas"
import {
  TERRITORY_INSETS,
  computeParkSurveySummary,
  filterAndSortParks,
  formatAcres,
  formatElevationFt,
  getProjectedParks,
  type ParkSortOrder,
  type ParkVisitFilter,
} from "@lib/parks"
import {
  USA_ISO_ID,
  buildNaturalEarthGraticule,
  projectNaturalEarth,
} from "@lib/worldProjection"
import ParkEmblem from "./ParkEmblem"

type Props = {
  readonly trips: readonly TravelItem[]
  readonly thumbnails?: readonly TravelThumbnailItem[]
}

type AtlasScope = "world" | "us"
type ViewMode = "map" | "poster"

type WorldSelection =
  | { readonly kind: "none" }
  | { readonly kind: "country"; readonly country: WorldCountryGeometry }
  | { readonly kind: "trip"; readonly trip: TravelItem }

type ModalTarget =
  | { readonly kind: "park"; readonly park: ProjectedPark }
  | { readonly kind: "trip"; readonly trip: TravelItem }

type UsPlaceSelection = {
  readonly code: string
  readonly name: string
  readonly visited: boolean
}

const VISIT_FILTERS: readonly { readonly value: ParkVisitFilter; readonly label: string }[] = [
  { value: "all", label: "All" },
  { value: "visited", label: "Visited" },
  { value: "unvisited", label: "Unvisited" },
] as const

const SORT_OPTIONS: readonly { readonly value: ParkSortOrder; readonly label: string }[] = [
  { value: "alpha", label: "Alphabetical (A–Z)" },
  { value: "established", label: "Year Founded" },
  { value: "state", label: "By State" },
  { value: "visited", label: "Visited First" },
] as const

const FEATURED_PARK_STATES: readonly string[] = ["CA", "AK", "UT", "CO", "FL", "WA", "AZ"]

function VintageStampSeal(props: {
  readonly code: string
  readonly subtitle: string
  readonly muted?: boolean
}) {
  return (
    <svg
      viewBox="0 0 88 88"
      class={`size-16 sm:size-20 shrink-0 -rotate-6 ${
        props.muted ? "text-ink-muted/50" : "text-accent"
      }`}
      aria-hidden="true"
    >
      <circle
        cx="44"
        cy="44"
        r="39"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-dasharray="4 2.5"
      />
      <circle cx="44" cy="44" r="33" fill="none" stroke="currentColor" stroke-width="1" />
      <text
        x="44"
        y="39"
        text-anchor="middle"
        fill="currentColor"
        font-size="15"
        font-weight="700"
        font-family="JetBrains Mono, monospace"
        letter-spacing="1.4"
      >
        {props.code}
      </text>
      <line x1="20" y1="46" x2="68" y2="46" stroke="currentColor" stroke-width="1" />
      <text
        x="44"
        y="59"
        text-anchor="middle"
        fill="currentColor"
        font-size="8"
        font-family="JetBrains Mono, monospace"
        letter-spacing="0.6"
      >
        {props.subtitle}
      </text>
    </svg>
  )
}

export default function UnifiedTravelAtlas(props: Props) {
  const allParks = getProjectedParks()
  const summary = computeParkSurveySummary(allParks, US_STATES)
  const graticule = buildNaturalEarthGraticule()
  const visitedCountrySet = new Set<string>(VISITED_COUNTRY_IDS)

  const [scope, setScope] = createSignal<AtlasScope>("world")
  const [viewMode, setViewMode] = createSignal<ViewMode>("map")

  // World scope state
  const [worldSelection, setWorldSelection] = createSignal<WorldSelection>(
    props.trips[0] ? { kind: "trip", trip: props.trips[0] } : { kind: "none" },
  )
  const [hoveredCountryId, setHoveredCountryId] = createSignal<string | null>(null)
  const [hoveredTripSlug, setHoveredTripSlug] = createSignal<string | null>(null)

  // U.S. scope state
  const [visitFilter, setVisitFilter] = createSignal<ParkVisitFilter>("all")
  const [sortOrder, setSortOrder] = createSignal<ParkSortOrder>("alpha")
  const [query, setQuery] = createSignal("")
  const [selectedUsPlace, setSelectedUsPlace] = createSignal<UsPlaceSelection | null>(null)
  const [hoveredUsStateAbbr, setHoveredUsStateAbbr] = createSignal<string | null>(null)
  const [hoveredParkCode, setHoveredParkCode] = createSignal<string | null>(null)

  // Shared native <dialog closedby="any"> modal
  const [modalTarget, setModalTarget] = createSignal<ModalTarget | null>(null)
  let dialogRef: HTMLDialogElement | undefined

  const realStates = US_STATES.filter((s) => s.abbr !== "DC")

  const visibleParks = createMemo(() =>
    filterAndSortParks(allParks, visitFilter(), query(), sortOrder()),
  )
  const visibleParkCodes = createMemo(() => new Set(visibleParks().map((p) => p.code)))

  const parksByStateCode = createMemo(() => {
    const map = new Map<string, ProjectedPark[]>()
    for (const park of allParks) {
      for (const st of park.states) {
        const list = map.get(st) ?? []
        list.push(park)
        map.set(st, list)
      }
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }
    return map
  })

  const selectedStateParks = createMemo<readonly ProjectedPark[]>(() => {
    const place = selectedUsPlace()
    if (!place) return []
    const parks = parksByStateCode().get(place.code) ?? []
    const visible = visibleParkCodes()
    return parks.filter((p) => visible.has(p.code))
  })

  const selectedStateAllParks = createMemo<readonly ProjectedPark[]>(() => {
    const place = selectedUsPlace()
    if (!place) return []
    return parksByStateCode().get(place.code) ?? []
  })

  const hoveredPark = createMemo(() => {
    const code = hoveredParkCode()
    return code ? allParks.find((p) => p.code === code) : undefined
  })

  const hoveredUsState = createMemo(() => {
    const abbr = hoveredUsStateAbbr()
    if (!abbr) return null
    if (abbr === "VI") return { name: "U.S. Virgin Islands", visited: true, code: "VI" }
    if (abbr === "AS") return { name: "American Samoa", visited: false, code: "AS" }
    const found = US_STATES.find((s) => s.abbr === abbr)
    return found ? { name: found.name, visited: found.visited, code: found.abbr } : null
  })

  const hoveredCountry = createMemo(() => {
    const id = hoveredCountryId()
    return id ? WORLD_COUNTRIES.find((c) => c.id === id) : undefined
  })

  const hoveredTrip = createMemo(() => {
    const slug = hoveredTripSlug()
    return slug ? props.trips.find((t) => t.slug === slug) : undefined
  })

  const visitCounts = createMemo<Record<ParkVisitFilter, number>>(() => ({
    all: summary.totalParks,
    visited: summary.visitedParks,
    unvisited: summary.remainingParks,
  }))

  const visitedCountries = createMemo(() =>
    WORLD_COUNTRIES.filter((c) => visitedCountrySet.has(c.id)),
  )

  function openParkModal(park: ProjectedPark) {
    setModalTarget({ kind: "park", park })
    if (dialogRef && !dialogRef.open) {
      dialogRef.showModal()
    }
  }

  function openTripModal(trip: TravelItem) {
    setModalTarget({ kind: "trip", trip })
    if (dialogRef && !dialogRef.open) {
      dialogRef.showModal()
    }
  }

  function handleDialogClose() {
    if (dialogRef) {
      dialogRef.returnValue = ""
    }
    setModalTarget(null)
  }

  function stepModalPark(delta: number) {
    const current = modalTarget()
    if (!current || current.kind !== "park") return
    const pool = visibleParks().length > 0 ? visibleParks() : allParks
    const idx = pool.findIndex((p) => p.code === current.park.code)
    const nextIdx = idx === -1 ? 0 : (idx + delta + pool.length) % pool.length
    const next = pool[nextIdx]
    if (next) {
      setModalTarget({ kind: "park", park: next })
    }
  }

  function selectUsState(abbr: string) {
    if (abbr === "VI") {
      setSelectedUsPlace({ code: "VI", name: "U.S. Virgin Islands", visited: true })
      return
    }
    if (abbr === "AS") {
      setSelectedUsPlace({ code: "AS", name: "American Samoa", visited: false })
      return
    }
    const st = US_STATES.find((s) => s.abbr === abbr)
    if (st) {
      setSelectedUsPlace({ code: st.abbr, name: st.name, visited: st.visited })
    }
  }

  function enterUsScope(initialMode?: ViewMode) {
    setScope("us")
    if (initialMode) {
      setViewMode(initialMode)
    }
  }

  function hasPersonalNotes(park: ProjectedPark): boolean {
    const j = park.journal
    if (!j) return false
    return Boolean(
      j.quote || j.notes || (j.liked && j.liked.length > 0) || (j.photos && j.photos.length > 0),
    )
  }

  onMount(() => {
    const dialog = dialogRef
    if (dialog && !("closedBy" in HTMLDialogElement.prototype)) {
      let pressedOutside = false
      const isOutside = (event: PointerEvent) => {
        const rect = dialog.getBoundingClientRect()
        return (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
      }
      const onPointerDown = (event: PointerEvent) => {
        pressedOutside = isOutside(event)
      }
      const onPointerUp = (event: PointerEvent) => {
        if (pressedOutside && isOutside(event)) {
          dialog.close()
        }
        pressedOutside = false
      }
      dialog.addEventListener("pointerdown", onPointerDown)
      dialog.addEventListener("pointerup", onPointerUp)
      onCleanup(() => {
        dialog.removeEventListener("pointerdown", onPointerDown)
        dialog.removeEventListener("pointerup", onPointerUp)
      })
    }

    const hash = window.location.hash
    if (hash.startsWith("#park-")) {
      const targetCode = hash.slice("#park-".length).toUpperCase()
      const matched = allParks.find((p) => p.code === targetCode)
      if (matched) {
        setScope("us")
        openParkModal(matched)
      }
    }
  })

  return (
    <div class="space-y-6">
      {/* Unified Header & Scope / Mode Controls */}
      <div class="rounded-xl border border-border bg-surface-elevated p-5 sm:p-6 space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <Show
              when={scope() === "us"}
              fallback={
                <>
                  <p class="editorial-kicker text-atlas">
                    {props.trips.length > 0
                      ? `World Archive · ${props.trips.length} Passport Stamps`
                      : "World Archive · Natural Earth Projection"}
                  </p>
                  <h2 class="font-serif text-2xl sm:text-3xl font-medium text-ink">
                    World Atlas
                  </h2>
                </>
              }
            >
              <p class="editorial-kicker text-atlas">
                {`United States · ${summary.lower48StatesVisited}/${summary.lower48StatesTotal} Lower States Complete`}
              </p>
              <h2 class="font-serif text-2xl sm:text-3xl font-medium text-ink">
                {`${summary.visitedParks} of ${summary.totalParks} National Parks`}
              </h2>
            </Show>
          </div>

          {/* Scope Switcher (World / U.S.) + View Switcher (Map / Poster) */}
          <div class="flex flex-wrap items-center gap-2.5">
            <div
              class="inline-flex rounded-lg border border-border bg-surface p-1 gap-1"
              role="group"
              aria-label="Atlas scope"
            >
              <button
                type="button"
                aria-pressed={scope() === "world"}
                onClick={() => setScope("world")}
                class={`rounded-md px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  scope() === "world"
                    ? "bg-ink text-bg font-semibold shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                World
              </button>
              <button
                type="button"
                aria-pressed={scope() === "us"}
                onClick={() => setScope("us")}
                class={`rounded-md px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  scope() === "us"
                    ? "bg-ink text-bg font-semibold shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                U.S.
              </button>
            </div>

            <div
              class="inline-flex rounded-lg border border-border bg-surface p-1 gap-1"
              role="group"
              aria-label="Atlas view mode"
            >
              <button
                type="button"
                aria-pressed={viewMode() === "map"}
                onClick={() => setViewMode("map")}
                class={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  viewMode() === "map"
                    ? "bg-accent text-bg font-semibold shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <svg class="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path d="M1.5 3.5 5.5 2 10.5 4 14.5 2.5v10l-4 1.5-5-2-4 1.5z" />
                  <path d="M5.5 2v10M10.5 4v10" />
                </svg>
                <span>Map Mode</span>
              </button>
              <button
                type="button"
                aria-pressed={viewMode() === "poster"}
                onClick={() => setViewMode("poster")}
                class={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  viewMode() === "poster"
                    ? "bg-accent text-bg font-semibold shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <svg class="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <rect x="2" y="2" width="5" height="5" rx="1" />
                  <rect x="9" y="2" width="5" height="5" rx="1" />
                  <rect x="2" y="9" width="5" height="5" rx="1" />
                  <rect x="9" y="9" width="5" height="5" rx="1" />
                </svg>
                <span>Poster Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* U.S. Filter & Search Strip (only shown in U.S. scope) */}
        <Show when={scope() === "us"}>
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-border pt-4">
            <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Filter U.S. parks by visit status">
              <For each={VISIT_FILTERS}>
                {(opt) => {
                  const isActive = () => visitFilter() === opt.value
                  return (
                    <button
                      type="button"
                      aria-pressed={isActive()}
                      onClick={() => setVisitFilter(opt.value)}
                      class={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                        isActive()
                          ? "border-accent bg-accent text-bg font-semibold"
                          : "border-border bg-surface text-ink-muted hover:border-accent hover:text-ink"
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span class="opacity-80">({visitCounts()[opt.value]})</span>
                    </button>
                  )
                }}
              </For>
            </div>

            <div class="flex flex-wrap items-center gap-2.5">
              <div class="relative flex-1 sm:flex-none">
                <label for="parks-search" class="sr-only">
                  Search national parks or states
                </label>
                <input
                  id="parks-search"
                  type="search"
                  value={query()}
                  onInput={(e) => setQuery(e.currentTarget.value)}
                  placeholder="Filter park or state…"
                  class="w-full sm:w-52 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-mono text-ink placeholder:text-ink-muted/75 focus:border-accent focus:outline-none"
                />
              </div>

              <Show when={viewMode() === "poster"}>
                <div class="flex items-center gap-2">
                  <label for="parks-sort" class="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
                    Order
                  </label>
                  <select
                    id="parks-sort"
                    value={sortOrder()}
                    onChange={(e) => {
                      const matched = SORT_OPTIONS.find((o) => o.value === e.currentTarget.value)
                      if (matched) setSortOrder(matched.value)
                    }}
                    class="rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-mono text-ink focus:border-accent focus:outline-none"
                  >
                    <For each={SORT_OPTIONS}>
                      {(opt) => <option value={opt.value}>{opt.label}</option>}
                    </For>
                  </select>
                </div>
              </Show>
            </div>
          </div>
        </Show>
      </div>

      {/* ================================================================ */}
      {/* WORLD SCOPE                                                      */}
      {/* ================================================================ */}
      <Show when={scope() === "world"}>
        {/* WORLD MAP MODE (FULL WIDTH) */}
        <Show when={viewMode() === "map"}>
          <div class="space-y-5">
            <figure class="rounded-xl border border-border bg-surface-elevated p-4 sm:p-5 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-ink-muted">
                <div class="flex flex-wrap items-center gap-3">
                  <span class="inline-flex items-center gap-1.5">
                    <span class="inline-block size-2.5 rounded-sm bg-atlas-soft border border-atlas/60" aria-hidden="true" />
                    <span>Visited ({visitedCountries().length})</span>
                  </span>
                  <Show when={props.trips.length > 0}>
                    <span class="inline-flex items-center gap-1.5">
                      <span class="inline-block size-2.5 rounded-full bg-accent" aria-hidden="true" />
                      <span>Stamped Logs ({props.trips.length})</span>
                    </span>
                  </Show>
                </div>

                <span class="uppercase tracking-wider text-[11px]">
                  <Show
                    when={hoveredTrip()}
                    fallback={
                      <Show
                        when={hoveredCountry()}
                        fallback="Click any country to inspect"
                      >
                        {(c) =>
                          `${c().name} · ${visitedCountrySet.has(c().id) ? "Visited" : "Not logged"}`
                        }
                      </Show>
                    }
                  >
                    {(t) => `${t().city}, ${t().country} (${t().stampCode})`}
                  </Show>
                </span>
              </div>

              <div class="relative w-full aspect-[1000/520] overflow-hidden rounded-lg border border-border bg-surface">
                <svg
                  viewBox={`0 0 ${WORLD_NE_VIEWBOX.width} ${WORLD_NE_VIEWBOX.height}`}
                  class="block h-full w-full"
                  role="img"
                  aria-labelledby="world-atlas-map-title"
                >
                  <title id="world-atlas-map-title">
                    Natural Earth world map displaying visited countries and passport stamp locations
                  </title>

                  {/* Curved Natural Earth ocean frame & subtle graticule */}
                  <path
                    d={graticule.outlinePath}
                    fill="var(--surface)"
                    stroke="var(--border)"
                    stroke-width="1"
                  />
                  <g fill="none" stroke="var(--border)" stroke-width="0.6" opacity="0.55">
                    <For each={graticule.parallels}>
                      {(line) => (
                        <path
                          d={line.d}
                          stroke-dasharray={line.isPrimary ? "4 4" : undefined}
                        />
                      )}
                    </For>
                    <For each={graticule.meridians}>
                      {(line) => <path d={line.d} />}
                    </For>
                  </g>

                  {/* 176 Natural Earth Countries — clickable, zero floating banners */}
                  <g>
                    <For each={WORLD_COUNTRIES}>
                      {(country) => {
                        const isVisited = visitedCountrySet.has(country.id)
                        const isSelected = () => {
                          const sel = worldSelection()
                          return sel.kind === "country" && sel.country.id === country.id
                        }
                        const isHovered = () => hoveredCountryId() === country.id
                        return (
                          <path
                            d={country.d}
                            class="cursor-pointer transition-colors duration-150"
                            onClick={() => setWorldSelection({ kind: "country", country })}
                            onMouseEnter={() => setHoveredCountryId(country.id)}
                            onMouseLeave={() => setHoveredCountryId(null)}
                            fill={
                              isSelected()
                                ? isVisited
                                  ? "var(--atlas)"
                                  : "var(--border)"
                                : isVisited
                                  ? "var(--atlas-soft)"
                                  : isHovered()
                                    ? "var(--border)"
                                    : "var(--surface-elevated)"
                            }
                            fill-opacity={isSelected() && isVisited ? 0.42 : isVisited ? 0.92 : 0.85}
                            stroke={
                              isSelected()
                                ? "var(--accent)"
                                : isVisited
                                  ? "var(--atlas)"
                                  : "var(--border)"
                            }
                            stroke-width={isSelected() ? 1.4 : isVisited ? 0.9 : 0.55}
                          />
                        )
                      }}
                    </For>
                  </g>
                </svg>

                {/* International Trip Pins from src/content/travel/ */}
                <For each={props.trips}>
                  {(trip) => {
                    const pt = projectNaturalEarth(trip.coordinates)
                    const leftPct = `${(pt.x / WORLD_NE_VIEWBOX.width) * 100}%`
                    const topPct = `${(pt.y / WORLD_NE_VIEWBOX.height) * 100}%`
                    const isSelected = () => {
                      const sel = worldSelection()
                      return sel.kind === "trip" && sel.trip.slug === trip.slug
                    }
                    return (
                      <button
                        type="button"
                        aria-label={`${trip.city}, ${trip.country} (${trip.stampCode})`}
                        aria-pressed={isSelected()}
                        onClick={() => setWorldSelection({ kind: "trip", trip })}
                        onFocus={() => {
                          setWorldSelection({ kind: "trip", trip })
                          setHoveredTripSlug(trip.slug)
                        }}
                        onBlur={() => setHoveredTripSlug(null)}
                        onMouseEnter={() => setHoveredTripSlug(trip.slug)}
                        onMouseLeave={() => setHoveredTripSlug(null)}
                        class="park-map-pin group absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full focus-visible:outline-2 z-20"
                        style={{ left: leftPct, top: topPct }}
                      >
                        <span
                          class={`block rounded-full border-2 transition-transform ${
                            isSelected()
                              ? "size-4 border-bg bg-accent ring-4 ring-accent/30"
                              : "size-3 border-bg bg-atlas group-hover:bg-accent group-hover:scale-125"
                          }`}
                        />
                        <span
                          class={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10px] font-medium shadow-sm ${
                            isSelected()
                              ? "bg-ink text-bg"
                              : "bg-surface-elevated/95 text-ink border border-border"
                          }`}
                        >
                          {trip.stampCode}
                        </span>
                      </button>
                    )
                  }}
                </For>
              </div>

              <figcaption class="text-xs text-ink-muted">
                Click any country on the map to view its stamp &amp; travel notes — click the United States for state and national park details.
              </figcaption>
            </figure>

            {/* Full-Width Horizontal Stamp Inspector Strip Below World Map */}
            <aside
              aria-label="Selected destination stamp"
              class="rounded-xl border border-border bg-surface-elevated p-5 sm:p-6"
            >
              <Show when={worldSelection().kind === "none"}>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div class="space-y-1.5 max-w-2xl">
                    <p class="text-xs font-mono uppercase tracking-widest text-atlas">
                      Passport Inspector
                    </p>
                    <h3 class="font-serif text-xl sm:text-2xl font-medium text-ink">
                      Select a country or stamp on the map
                    </h3>
                    <p class="text-sm text-ink-muted leading-relaxed">
                      Click any shaded country on the map above to view notes and stamps. International trip logs added to the journal appear automatically as pins.
                    </p>
                  </div>
                  <VintageStampSeal code="---" subtitle="ATLAS" muted={true} />
                </div>
              </Show>

              <Show when={worldSelection().kind === "country"}>
                {(() => {
                  const sel = worldSelection()
                  if (sel.kind !== "country") return null
                  const country = sel.country
                  const isUsa = country.id === USA_ISO_ID
                  const isVisited = visitedCountrySet.has(country.id)
                  return (
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                      <div class="space-y-2.5 max-w-2xl">
                        <div class="flex flex-wrap items-center gap-2">
                          <span
                            class={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold ${
                              isVisited
                                ? "bg-atlas-soft text-atlas"
                                : "border border-dashed border-border bg-surface text-ink-muted"
                            }`}
                          >
                            {isVisited ? "Visited" : "Not logged yet"}
                          </span>
                          <Show when={isUsa}>
                            <span class="font-mono text-xs text-ink-muted">
                              {`${summary.lower48StatesVisited}/${summary.lower48StatesTotal} Lower States · ${summary.visitedParks}/${summary.totalParks} National Parks`}
                            </span>
                          </Show>
                        </div>

                        <h3 class="font-serif text-2xl font-medium text-ink">
                          {country.name}
                        </h3>

                        <Show
                          when={isUsa}
                          fallback={
                            <p class="text-sm text-ink-muted leading-relaxed">
                              {isVisited
                                ? "Marked as visited — field notes and photos for this country haven’t been logged yet."
                                : "No stamps logged for this country yet."}
                            </p>
                          }
                        >
                          <p class="text-sm text-ink-muted leading-relaxed">
                            All 48 contiguous states visited and {summary.visitedParks} of {summary.totalParks} U.S. National Parks explored — click below to browse every state and park emblem.
                          </p>
                          <div class="flex flex-wrap items-center gap-2.5 pt-1">
                            <button
                              type="button"
                              onClick={() => enterUsScope("map")}
                              class="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-xs font-mono uppercase tracking-wider font-medium text-bg hover:bg-accent transition-colors"
                            >
                              <span>Open U.S. Map</span>
                              <span aria-hidden="true">→</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => enterUsScope("poster")}
                              class="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-medium text-ink hover:border-accent hover:text-accent transition-colors"
                            >
                              <span>View 63-Park Poster</span>
                            </button>
                          </div>
                        </Show>
                      </div>

                      <VintageStampSeal
                        code={isUsa ? "USA" : country.name.slice(0, 3).toUpperCase()}
                        subtitle={isUsa ? "50 / 63" : isVisited ? "VISITED" : "UNLOGGED"}
                        muted={!isVisited}
                      />
                    </div>
                  )
                })()}
              </Show>

              <Show when={worldSelection().kind === "trip"}>
                {(() => {
                  const sel = worldSelection()
                  if (sel.kind !== "trip") return null
                  const trip = sel.trip
                  return (
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                      <div class="space-y-3 flex-1 min-w-0">
                        <div class="space-y-1">
                          <p class="text-xs font-mono uppercase tracking-widest text-atlas">
                            {trip.region} · {formatCoordinates(trip.coordinates)}
                          </p>
                          <h3 class="font-serif text-2xl font-medium text-ink">
                            {trip.city}, {trip.country}
                          </h3>
                          <p class="text-sm text-ink-muted leading-relaxed">{trip.summary}</p>
                        </div>

                        <Show when={trip.highlights.length > 0}>
                          <ul class="flex flex-wrap gap-2 text-xs text-ink">
                            <For each={trip.highlights}>
                              {(h) => (
                                <li class="rounded-full border border-border bg-surface px-2.5 py-0.5">
                                  {h}
                                </li>
                              )}
                            </For>
                          </ul>
                        </Show>

                        <div class="flex flex-wrap items-center gap-2.5 pt-1">
                          <a
                            href={`/travel/${trip.slug}/`}
                            class="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-xs font-mono uppercase tracking-wider font-medium text-bg hover:bg-accent transition-colors"
                          >
                            <span>Read field notes</span>
                            <span aria-hidden="true">→</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => openTripModal(trip)}
                            class="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-ink hover:border-accent hover:text-accent transition-colors"
                          >
                            <span>Quick view ↗</span>
                          </button>
                        </div>
                      </div>

                      <VintageStampSeal code={trip.stampCode} subtitle={trip.date} />
                    </div>
                  )
                })()}
              </Show>
            </aside>
          </div>
        </Show>

        {/* WORLD POSTER MODE */}
        <Show when={viewMode() === "poster"}>
          <figure class="rounded-2xl border-2 border-border bg-surface-elevated p-3 sm:p-5 shadow-sm">
            <div class="rounded-xl border border-border/80 bg-surface/55 p-5 sm:p-7 space-y-6">
              <header class="text-center space-y-2 border-b border-border pb-5">
                <p class="font-mono text-[11px] uppercase tracking-[0.22em] text-atlas">
                  Passport &amp; Country Archive
                </p>
                <h3 class="font-serif text-2xl sm:text-4xl font-medium tracking-tight text-ink">
                  World Travel Stamps
                </h3>
                <p class="text-xs font-mono text-ink-muted">
                  {`${visitedCountries().length} ${visitedCountries().length === 1 ? "Country" : "Countries"} Marked · ${props.trips.length} Field Logs`}
                </p>
              </header>

              <ul role="list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* United States Stamp Card */}
                <li>
                  <button
                    type="button"
                    onClick={() => enterUsScope("poster")}
                    class="park-poster-tile group w-full h-full text-start rounded-xl border border-border bg-surface-elevated p-5 flex items-center justify-between gap-4 hover:border-accent"
                  >
                    <div class="space-y-1.5 min-w-0">
                      <p class="font-mono text-[10px] uppercase tracking-widest text-atlas">
                        North America
                      </p>
                      <h4 class="font-serif text-xl font-medium text-ink group-hover:text-accent transition-colors">
                        United States
                      </h4>
                      <p class="font-mono text-xs text-ink-muted">
                        {`${summary.lower48StatesVisited}/${summary.lower48StatesTotal} Lower States · ${summary.visitedParks}/${summary.totalParks} Parks`}
                      </p>
                      <p class="pt-1 font-mono text-[11px] uppercase tracking-wider text-accent">
                        Open U.S. Poster →
                      </p>
                    </div>
                    <VintageStampSeal code="USA" subtitle="50 / 63" />
                  </button>
                </li>

                {/* Logged International Trips */}
                <For each={props.trips}>
                  {(trip) => (
                    <li>
                      <button
                        type="button"
                        onClick={() => openTripModal(trip)}
                        class="park-poster-tile group w-full h-full text-start rounded-xl border border-border bg-surface-elevated p-5 flex items-center justify-between gap-4 hover:border-accent"
                      >
                        <div class="space-y-1.5 min-w-0">
                          <p class="font-mono text-[10px] uppercase tracking-widest text-atlas">
                            {trip.region}
                          </p>
                          <h4 class="font-serif text-xl font-medium text-ink group-hover:text-accent transition-colors">
                            {trip.city}
                          </h4>
                          <p class="font-mono text-xs text-ink-muted">{trip.country}</p>
                          <p class="text-xs text-ink-muted line-clamp-2 pt-0.5">{trip.summary}</p>
                        </div>
                        <VintageStampSeal code={trip.stampCode} subtitle={trip.date} />
                      </button>
                    </li>
                  )}
                </For>

                {/* Graceful empty slot when no international trips are logged yet */}
                <Show when={props.trips.length === 0}>
                  <li class="rounded-xl border border-dashed border-border bg-surface/65 p-5 flex items-center justify-between gap-4">
                    <div class="space-y-1.5">
                      <p class="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                        International Stamps
                      </p>
                      <h4 class="font-serif text-lg font-medium text-ink">
                        Ready for more stamps
                      </h4>
                      <p class="text-xs text-ink-muted leading-relaxed">
                        Add countries or international trip logs to fill out the world poster.
                      </p>
                    </div>
                    <VintageStampSeal code="---" subtitle="SOON" muted={true} />
                  </li>
                </Show>
              </ul>
            </div>
            <figcaption class="pt-3 text-center font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              Select the United States stamp to explore all 63 National Parks, or open any trip stamp
            </figcaption>
          </figure>
        </Show>
      </Show>

      {/* ================================================================ */}
      {/* U.S. SCOPE                                                       */}
      {/* ================================================================ */}
      <Show when={scope() === "us"}>
        {/* U.S. MAP MODE (FULL WIDTH + CLICK STATE TO SHOW PARK THUMBNAILS) */}
        <Show when={viewMode() === "map"}>
          <div class="space-y-5">
            <figure class="rounded-xl border border-border bg-surface-elevated p-4 sm:p-5 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-ink-muted">
                <div class="flex flex-wrap items-center gap-3">
                  <span class="inline-flex items-center gap-1.5">
                    <span class="inline-block size-2.5 rounded-sm bg-atlas-soft border border-atlas/60" aria-hidden="true" />
                    <span>48/48 Lower States</span>
                  </span>
                  <span class="inline-flex items-center gap-1.5">
                    <span class="inline-block size-2.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Visited ({summary.visitedParks})</span>
                  </span>
                  <span class="inline-flex items-center gap-1.5">
                    <span class="inline-block size-2.5 rounded-full border border-dashed border-ink-muted bg-surface" aria-hidden="true" />
                    <span>Unvisited ({summary.remainingParks})</span>
                  </span>
                </div>

                <span class="uppercase tracking-wider text-[11px]">
                  <Show
                    when={hoveredPark()}
                    fallback={
                      <Show
                        when={hoveredUsState()}
                        fallback="Click any state to see its parks · click any pin to open"
                      >
                        {(st) => {
                          const parks = parksByStateCode().get(st().code) ?? []
                          const vCount = parks.filter((p) => p.visited).length
                          return `${st().name} · ${st().visited ? "Visited" : "Unvisited"}${
                            parks.length > 0 ? ` (${vCount}/${parks.length} parks)` : ""
                          }`
                        }}
                      </Show>
                    }
                  >
                    {(park) =>
                      `${park().name} (${park().states.join("/")}) · ${park().visited ? "Visited" : "Unvisited"}`
                    }
                  </Show>
                </span>
              </div>

              <div class="relative w-full aspect-[975/610] overflow-hidden rounded-lg border border-border bg-surface">
                <svg
                  viewBox={`0 0 ${US_ALBERS_VIEWBOX.width} ${US_ALBERS_VIEWBOX.height}`}
                  class="block h-full w-full"
                  role="img"
                  aria-labelledby="us-parks-map-title"
                >
                  <title id="us-parks-map-title">
                    Albers map of the United States showing all 48 visited Lower States, 50 visited National Parks, and 13 unvisited National Parks
                  </title>

                  {/* Cartographic inset frames for AK, HI, USVI, and American Samoa */}
                  <g fill="none" stroke="var(--border)" stroke-width="1">
                    <rect
                      x="26"
                      y="424"
                      width="194"
                      height="168"
                      rx="6"
                      stroke-dasharray="3 3"
                      class="cursor-pointer"
                      fill={selectedUsPlace()?.code === "AK" ? "var(--surface-elevated)" : "transparent"}
                      onClick={() => selectUsState("AK")}
                    />
                    <rect
                      x="230"
                      y="492"
                      width="128"
                      height="100"
                      rx="6"
                      stroke-dasharray="3 3"
                      class="cursor-pointer"
                      fill={selectedUsPlace()?.code === "HI" ? "var(--surface-elevated)" : "transparent"}
                      onClick={() => selectUsState("HI")}
                    />
                    <rect
                      x={TERRITORY_INSETS.virginIslands.x}
                      y={TERRITORY_INSETS.virginIslands.y}
                      width={TERRITORY_INSETS.virginIslands.width}
                      height={TERRITORY_INSETS.virginIslands.height}
                      rx="6"
                      class="cursor-pointer"
                      fill="var(--atlas-soft)"
                      fill-opacity={selectedUsPlace()?.code === "VI" ? 0.85 : 0.38}
                      stroke={selectedUsPlace()?.code === "VI" ? "var(--accent)" : "var(--border)"}
                      stroke-width={selectedUsPlace()?.code === "VI" ? 1.6 : 1}
                      onClick={() => selectUsState("VI")}
                      onMouseEnter={() => setHoveredUsStateAbbr("VI")}
                      onMouseLeave={() => setHoveredUsStateAbbr(null)}
                    />
                    <rect
                      x={TERRITORY_INSETS.americanSamoa.x}
                      y={TERRITORY_INSETS.americanSamoa.y}
                      width={TERRITORY_INSETS.americanSamoa.width}
                      height={TERRITORY_INSETS.americanSamoa.height}
                      rx="6"
                      stroke-dasharray="3 3"
                      class="cursor-pointer"
                      fill={selectedUsPlace()?.code === "AS" ? "var(--surface-elevated)" : "transparent"}
                      stroke={selectedUsPlace()?.code === "AS" ? "var(--accent)" : "var(--border)"}
                      stroke-width={selectedUsPlace()?.code === "AS" ? 1.6 : 1}
                      onClick={() => selectUsState("AS")}
                      onMouseEnter={() => setHoveredUsStateAbbr("AS")}
                      onMouseLeave={() => setHoveredUsStateAbbr(null)}
                    />
                  </g>

                  {/* Inset labels */}
                  <g
                    fill="var(--ink-muted)"
                    font-family="JetBrains Mono, monospace"
                    font-size="9.5"
                    letter-spacing="0.08em"
                    class="pointer-events-none"
                  >
                    <text x="36" y="440">ALASKA · 0/8</text>
                    <text x="240" y="508">HAWAIʻI · 0/2</text>
                    <text x={TERRITORY_INSETS.virginIslands.x + 8} y={TERRITORY_INSETS.virginIslands.y + 15}>
                      USVI · 1/1
                    </text>
                    <text x={TERRITORY_INSETS.americanSamoa.x + 8} y={TERRITORY_INSETS.americanSamoa.y + 15}>
                      SAMOA · 0/1
                    </text>
                  </g>

                  {/* Stylized island silhouettes inside USVI & American Samoa insets */}
                  <path
                    d={`M${TERRITORY_INSETS.virginIslands.cx - 14},${TERRITORY_INSETS.virginIslands.cy + 2} Q${TERRITORY_INSETS.virginIslands.cx},${TERRITORY_INSETS.virginIslands.cy - 6} ${TERRITORY_INSETS.virginIslands.cx + 15},${TERRITORY_INSETS.virginIslands.cy + 1} Q${TERRITORY_INSETS.virginIslands.cx + 2},${TERRITORY_INSETS.virginIslands.cy + 7} ${TERRITORY_INSETS.virginIslands.cx - 14},${TERRITORY_INSETS.virginIslands.cy + 2}Z`}
                    fill="var(--atlas-soft)"
                    stroke="var(--atlas)"
                    stroke-width="0.9"
                    stroke-opacity="0.6"
                    class="pointer-events-none"
                  />
                  <path
                    d={`M${TERRITORY_INSETS.americanSamoa.cx - 14},${TERRITORY_INSETS.americanSamoa.cy + 3} Q${TERRITORY_INSETS.americanSamoa.cx},${TERRITORY_INSETS.americanSamoa.cy - 5} ${TERRITORY_INSETS.americanSamoa.cx + 14},${TERRITORY_INSETS.americanSamoa.cy - 1} Q${TERRITORY_INSETS.americanSamoa.cx + 3},${TERRITORY_INSETS.americanSamoa.cy + 6} ${TERRITORY_INSETS.americanSamoa.cx - 14},${TERRITORY_INSETS.americanSamoa.cy + 3}Z`}
                    fill="var(--surface-elevated)"
                    stroke="var(--border)"
                    stroke-width="1"
                    stroke-dasharray="2 2"
                    class="pointer-events-none"
                  />

                  {/* All 50 Clickable U.S. States */}
                  <g>
                    <For each={realStates}>
                      {(state: UsStateGeometry) => {
                        const isSelected = () => selectedUsPlace()?.code === state.abbr
                        const isHovered = () => hoveredUsStateAbbr() === state.abbr
                        return (
                          <path
                            d={state.d}
                            onClick={() => selectUsState(state.abbr)}
                            onMouseEnter={() => setHoveredUsStateAbbr(state.abbr)}
                            onMouseLeave={() => setHoveredUsStateAbbr(null)}
                            class="cursor-pointer transition-colors duration-150"
                            fill={
                              isSelected()
                                ? state.visited
                                  ? "var(--atlas)"
                                  : "var(--border)"
                                : state.visited
                                  ? "var(--atlas-soft)"
                                  : isHovered()
                                    ? "var(--border)"
                                    : "var(--surface-elevated)"
                            }
                            fill-opacity={
                              isSelected()
                                ? state.visited
                                  ? 0.42
                                  : 0.75
                                : state.visited
                                  ? isHovered()
                                    ? 1
                                    : 0.74
                                  : 0.7
                            }
                            stroke={
                              isSelected()
                                ? "var(--accent)"
                                : isHovered()
                                  ? "var(--atlas)"
                                  : state.visited
                                    ? "var(--bg)"
                                    : "var(--border)"
                            }
                            stroke-width={isSelected() ? 1.8 : isHovered() ? 1.3 : 0.9}
                            stroke-dasharray={state.visited ? undefined : "3 2"}
                          />
                        )
                      }}
                    </For>
                  </g>
                </svg>

                {/* Accessible Clickable Park Pins */}
                <For each={allParks}>
                  {(park) => {
                    const leftPct = `${(park.mapPoint.x / US_ALBERS_VIEWBOX.width) * 100}%`
                    const topPct = `${(park.mapPoint.y / US_ALBERS_VIEWBOX.height) * 100}%`
                    const isVisible = () => visibleParkCodes().has(park.code)
                    const isInSelectedState = () => {
                      const st = selectedUsPlace()
                      return st ? park.states.includes(st.code) : false
                    }
                    const isHovered = () => hoveredParkCode() === park.code

                    return (
                      <button
                        type="button"
                        aria-label={`${park.name} National Park (${park.states.join(", ")}) — ${
                          park.visited ? "Visited" : "Not yet visited"
                        }`}
                        onClick={() => {
                          if (park.states[0]) selectUsState(park.states[0])
                          openParkModal(park)
                        }}
                        onFocus={() => setHoveredParkCode(park.code)}
                        onBlur={() => setHoveredParkCode(null)}
                        onMouseEnter={() => setHoveredParkCode(park.code)}
                        onMouseLeave={() => setHoveredParkCode(null)}
                        class={`park-map-pin group absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full focus-visible:outline-2 ${
                          isHovered() ? "z-30" : isInSelectedState() ? "z-20" : "z-10"
                        } ${isVisible() ? "opacity-100" : "opacity-20"}`}
                        style={{
                          left: leftPct,
                          top: topPct,
                          "--park-light": park.pigmentLight,
                          "--park-dark": park.pigmentDark,
                        }}
                      >
                        <span
                          class={`park-pin-dot block rounded-full transition-transform ${
                            park.visited
                              ? isInSelectedState()
                                ? "size-3.5 border-2 border-bg ring-2 ring-accent/50 scale-110"
                                : "size-2.5 border border-bg group-hover:scale-125"
                              : isInSelectedState()
                                ? "size-3.5 border-2 border-ink bg-surface ring-2 ring-ink/20 scale-110"
                                : "size-2.5 border border-dashed border-ink-muted bg-surface/90 group-hover:scale-125"
                          }`}
                          style={
                            park.visited
                              ? { "background-color": "var(--park-pigment)" }
                              : undefined
                          }
                        />
                        <Show when={isHovered()}>
                          <span class="pointer-events-none absolute left-1/2 bottom-full mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] font-medium text-bg shadow-sm">
                            {park.name}
                          </span>
                        </Show>
                      </button>
                    )
                  }}
                </For>
              </div>

              <figcaption class="text-xs text-ink-muted">
                Click any state to browse its National Park thumbnails below, or click any pin directly to open its field card.
              </figcaption>
            </figure>

            {/* Full-Width State Parks Tray Below U.S. Map */}
            <aside
              aria-label="Selected state and national parks"
              class="rounded-xl border border-border bg-surface-elevated p-5 sm:p-6"
            >
              <Show
                when={selectedUsPlace()}
                fallback={
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="space-y-1.5">
                      <p class="text-xs font-mono uppercase tracking-widest text-atlas">
                        State Explorer
                      </p>
                      <h3 class="font-serif text-xl sm:text-2xl font-medium text-ink">
                        Click a state on the map to see its parks
                      </h3>
                      <p class="text-sm text-ink-muted">
                        Or jump straight to a multi-park state below:
                      </p>
                    </div>
                    <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Quick select states with multiple national parks">
                      <For each={FEATURED_PARK_STATES}>
                        {(abbr) => {
                          const st = US_STATES.find((s) => s.abbr === abbr)
                          const count = parksByStateCode().get(abbr)?.length ?? 0
                          return (
                            <button
                              type="button"
                              onClick={() => selectUsState(abbr)}
                              class="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-mono text-ink hover:border-accent hover:text-accent transition-colors"
                            >
                              {st ? `${st.name} (${count})` : abbr}
                            </button>
                          )
                        }}
                      </For>
                    </div>
                  </div>
                }
              >
                {(place) => {
                  const totalInState = () => selectedStateAllParks().length
                  const visitedInState = () =>
                    selectedStateAllParks().filter((p) => p.visited).length
                  return (
                    <div class="space-y-5">
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                        <div class="space-y-1.5">
                          <div class="flex flex-wrap items-center gap-2">
                            <span
                              class={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold ${
                                place().visited
                                  ? "bg-atlas-soft text-atlas"
                                  : "border border-dashed border-border bg-surface text-ink-muted"
                              }`}
                            >
                              {place().visited ? "State Visited" : "Not yet visited"}
                            </span>
                            <span class="font-mono text-xs text-ink-muted">
                              {totalInState() > 0
                                ? `${visitedInState()} / ${totalInState()} National ${
                                    totalInState() === 1 ? "Park" : "Parks"
                                  } visited`
                                : "No U.S. National Parks in this state"}
                            </span>
                          </div>
                          <h3 class="font-serif text-2xl sm:text-3xl font-medium text-ink">
                            {place().name}
                          </h3>
                        </div>

                        <div class="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => setSelectedUsPlace(null)}
                            class="text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-accent underline underline-offset-4 transition-colors"
                          >
                            Clear
                          </button>
                          <VintageStampSeal
                            code={place().code}
                            subtitle={place().visited ? "VISITED" : "TO GO"}
                            muted={!place().visited}
                          />
                        </div>
                      </div>

                      <Show
                        when={selectedStateParks().length > 0}
                        fallback={
                          <p class="text-sm text-ink-muted">
                            {totalInState() > 0
                              ? "No parks in this state match your current filter."
                              : place().visited
                                ? `Visited ${place().name} as part of all 48 Lower States — there are no designated U.S. National Parks located inside ${place().name}.`
                                : `No designated U.S. National Parks located inside ${place().name}.`}
                          </p>
                        }
                      >
                        <ul
                          role="list"
                          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                        >
                          <For each={selectedStateParks()}>
                            {(park) => (
                              <li>
                                <button
                                  type="button"
                                  onClick={() => openParkModal(park)}
                                  class={`park-poster-tile group w-full h-full flex flex-col items-center text-center rounded-xl border p-3 transition-colors ${
                                    park.visited
                                      ? "border-border bg-surface hover:border-accent"
                                      : "border-dashed border-border/80 bg-surface/50 hover:border-ink-muted"
                                  }`}
                                >
                                  <div class="relative w-full aspect-square max-w-[104px]">
                                    <ParkEmblem park={park} idPrefix="state-tray" decorative={true} />
                                    <Show when={hasPersonalNotes(park)}>
                                      <span
                                        class="absolute top-1.5 right-1.5 size-2 rounded-full bg-accent ring-2 ring-surface"
                                        aria-hidden="true"
                                      />
                                    </Show>
                                  </div>
                                  <div class="mt-2.5 space-y-0.5 w-full">
                                    <p
                                      class={`font-serif text-sm font-medium leading-snug ${
                                        park.visited
                                          ? "text-ink group-hover:text-accent transition-colors"
                                          : "text-ink-muted"
                                      }`}
                                    >
                                      {park.name}
                                    </p>
                                    <p class="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                                      {park.visited ? `Est. ${park.established}` : "Unvisited"}
                                    </p>
                                  </div>
                                </button>
                              </li>
                            )}
                          </For>
                        </ul>
                      </Show>
                    </div>
                  )
                }}
              </Show>
            </aside>
          </div>
        </Show>

        {/* U.S. POSTER MODE (ALL 63 PARK EMBLEMS IN ORDER) */}
        <Show when={viewMode() === "poster"}>
          <figure class="rounded-2xl border-2 border-border bg-surface-elevated p-3 sm:p-5 shadow-sm">
            <div class="rounded-xl border border-border/80 bg-surface/55 p-4 sm:p-7 space-y-6">
              <header class="text-center space-y-2 border-b border-border pb-5">
                <p class="font-mono text-[11px] uppercase tracking-[0.22em] text-atlas">
                  United States National Park Service · Collector’s Edition
                </p>
                <h3 class="font-serif text-2xl sm:text-4xl font-medium tracking-tight text-ink">
                  The Sixty-Three National Parks
                </h3>
                <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 pt-1 text-xs font-mono text-ink-muted">
                  <span>
                    <strong class="text-ink font-semibold">{`${summary.visitedParks}/${summary.totalParks}`}</strong> Visited
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    <strong class="text-ink font-semibold">{`${summary.lower48StatesVisited}/${summary.lower48StatesTotal}`}</strong> Lower States
                  </span>
                  <span aria-hidden="true">·</span>
                  <span class="inline-flex items-center gap-1.5">
                    <span class="inline-block size-2 rounded-full bg-accent" aria-hidden="true" />
                    <span>Color = Visited</span>
                  </span>
                  <span class="inline-flex items-center gap-1.5">
                    <span class="inline-block size-2 rounded-full bg-ink-muted/40" aria-hidden="true" />
                    <span>{`Grayed = Remaining (${summary.remainingParks})`}</span>
                  </span>
                </div>
              </header>

              <Show
                when={visibleParks().length > 0}
                fallback={
                  <div class="py-12 text-center space-y-2">
                    <p class="font-serif text-xl text-ink">No parks match that filter.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setVisitFilter("all")
                        setQuery("")
                      }}
                      class="text-xs font-mono uppercase tracking-wider text-accent underline underline-offset-4"
                    >
                      Reset filters
                    </button>
                  </div>
                }
              >
                <ul
                  role="list"
                  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4"
                >
                  <For each={visibleParks()}>
                    {(park) => (
                      <li>
                        <button
                          type="button"
                          onClick={() => openParkModal(park)}
                          class={`park-poster-tile group w-full h-full flex flex-col items-center text-center rounded-xl border p-2.5 sm:p-3 transition-colors ${
                            park.visited
                              ? "border-border bg-surface-elevated hover:border-accent"
                              : "border-dashed border-border/80 bg-surface/60 hover:border-ink-muted"
                          }`}
                        >
                          <div class="relative w-full aspect-square max-w-[116px]">
                            <ParkEmblem park={park} idPrefix="poster" decorative={true} />
                            <Show when={hasPersonalNotes(park)}>
                              <span
                                class="absolute top-1.5 right-1.5 size-2 rounded-full bg-accent ring-2 ring-surface-elevated"
                                aria-hidden="true"
                              />
                            </Show>
                          </div>

                          <div class="mt-2.5 space-y-0.5 w-full">
                            <p
                              class={`font-serif text-sm font-medium leading-snug line-clamp-2 ${
                                park.visited
                                  ? "text-ink group-hover:text-accent transition-colors"
                                  : "text-ink-muted"
                              }`}
                            >
                              {park.name}
                            </p>
                            <p class="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                              {`${park.states.join("/")} · ${park.established}`}
                            </p>
                          </div>
                        </button>
                      </li>
                    )}
                  </For>
                </ul>
              </Show>
            </div>
            <figcaption class="pt-3 text-center font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              Select any park emblem to open its photos, quotes, and field notes
            </figcaption>
          </figure>
        </Show>
      </Show>

      {/* ================================================================ */}
      {/* PLACES & VISUAL NOTES (SWISS NOTEBOOK PHOTO + TRAVEL LEDGER)     */}
      {/* ================================================================ */}
      <section class="border-t border-border pt-10 space-y-6" aria-labelledby="travel-dispatches-heading">
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div class="space-y-1">
            <p class="editorial-kicker">Dispatches &amp; Frames</p>
            <h2 id="travel-dispatches-heading" class="font-serif text-2xl sm:text-3xl font-medium text-ink">
              Places &amp; Visual Notes
            </h2>
          </div>

          <div class="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em]">
            <span class="inline-flex items-center gap-1.5 border border-atlas/25 bg-atlas-soft px-2 py-0.5 text-atlas">
              TRAVEL LOG →
            </span>
            <span class="inline-flex items-center gap-1.5 border border-accent/25 bg-accent-soft px-2 py-0.5 text-accent">
              PHOTO GALLERY ↗
            </span>
          </div>
        </div>

        <Show
          when={(props.thumbnails ?? []).length > 0}
          fallback={
            <div class="border-t border-b border-border py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
              <p class="md:col-span-4 font-mono text-xs uppercase tracking-[0.12em] text-atlas">
                Field Ledger · Empty
              </p>
              <p class="md:col-span-8 text-sm sm:text-base text-ink-muted leading-relaxed">
                No stamps logged yet — add a travel entry or travel photograph to populate the field ledger.
              </p>
            </div>
          }
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={props.thumbnails ?? []}>
              {(item) => {
                const isGallery = item.destination === "gallery"
                const tripSlug = isGallery ? "" : item.id.replace(/^travel-/, "")
                return (
                  <article class="flex flex-col justify-between border border-border bg-surface-elevated hover:border-accent/70 transition-colors">
                    <a href={item.href} class="group flex flex-1 flex-col">
                      <Show
                        when={item.imageSrc}
                        fallback={
                          <div class="aspect-[4/3] border-b border-border bg-surface p-5 flex flex-col justify-between">
                            <div class="flex items-center justify-between gap-2">
                              <span class="rounded-none border border-atlas/25 bg-atlas-soft px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-atlas">
                                TRAVEL LOG →
                              </span>
                              <span class="font-mono text-[11px] text-ink-muted">
                                {item.dateLabel}
                              </span>
                            </div>

                            <div class="space-y-1">
                              <Show when={item.stampCode}>
                                {(code) => (
                                  <p class="font-mono text-2xl font-semibold tracking-widest text-ink/85">
                                    {code()}
                                  </p>
                                )}
                              </Show>
                              <p class="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>
                        }
                      >
                        {(src) => (
                          <div class="overflow-hidden border-b border-border bg-surface">
                            <img
                              src={src()}
                              alt={item.imageAlt ?? item.title}
                              loading="lazy"
                              decoding="async"
                              class="editorial-photo aspect-[4/3] w-full object-cover"
                            />
                          </div>
                        )}
                      </Show>

                      <div class="flex flex-1 flex-col gap-2.5 p-4">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                          <span
                            class={`rounded-none border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${
                              isGallery
                                ? "border-accent/25 bg-accent-soft text-accent"
                                : "border-atlas/25 bg-atlas-soft text-atlas"
                            }`}
                          >
                            {isGallery ? "PHOTO GALLERY ↗" : "TRAVEL LOG →"}
                          </span>
                          <span class="font-mono text-[11px] text-ink-muted">
                            {item.dateLabel}
                          </span>
                        </div>

                        <div class="space-y-1">
                          <h3 class="font-serif text-xl font-medium text-ink group-hover:text-accent transition-colors leading-snug">
                            {item.title}
                          </h3>
                          <p class="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                            {item.subtitle}
                          </p>
                          <Show when={item.summary}>
                            {(summary) => (
                              <p class="pt-0.5 text-sm text-ink-muted leading-relaxed line-clamp-2">
                                {summary()}
                              </p>
                            )}
                          </Show>
                        </div>
                      </div>
                    </a>

                    <Show when={!isGallery && tripSlug.length > 0}>
                      <div class="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5 font-mono text-[11px]">
                        <button
                          type="button"
                          onClick={() => {
                            const matched = props.trips.find((t) => t.slug === tripSlug)
                            if (matched) {
                              setScope("world")
                              setViewMode("map")
                              setWorldSelection({ kind: "trip", trip: matched })
                            }
                          }}
                          class="text-atlas hover:text-accent underline decoration-border underline-offset-4 transition-colors"
                        >
                          Focus on map
                        </button>
                        <a
                          href={item.href}
                          class="text-ink hover:text-accent transition-colors"
                        >
                          Open log →
                        </a>
                      </div>
                    </Show>
                  </article>
                )
              }}
            </For>
          </div>
        </Show>
      </section>

      {/* ================================================================ */}
      {/* SHARED NATIVE <dialog closedby="any"> FIELD CARD MODAL           */}
      {/* ================================================================ */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="atlas-modal-title"
        onClose={handleDialogClose}
      >
        <Show when={modalTarget()}>
          {(target) => (
            <Show
              when={target().kind === "park"}
              fallback={(() => {
                const t = target()
                if (t.kind !== "trip") return null
                const trip = t.trip
                return (
                  <div class="flex flex-col max-h-[86dvh]">
                    <div class="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
                      <div class="flex items-start gap-4 min-w-0">
                        <VintageStampSeal code={trip.stampCode} subtitle={trip.date} />
                        <div class="space-y-1 min-w-0">
                          <p class="font-mono text-xs uppercase tracking-widest text-atlas">
                            {trip.region}
                          </p>
                          <h3 id="atlas-modal-title" class="font-serif text-2xl sm:text-3xl font-medium text-ink">
                            {trip.city}, {trip.country}
                          </h3>
                          <p class="font-mono text-xs text-ink-muted">
                            {formatCoordinates(trip.coordinates)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => dialogRef?.close()}
                        aria-label="Close trip card"
                        class="shrink-0 inline-flex size-9 items-center justify-center rounded-md border border-border bg-surface text-ink-muted hover:border-accent hover:text-ink transition-colors"
                      >
                        <span aria-hidden="true" class="text-lg leading-none">×</span>
                      </button>
                    </div>
                    <div class="overflow-y-auto p-5 sm:p-6 space-y-5">
                      <p class="font-serif text-lg text-ink">{trip.title}</p>
                      <p class="text-sm sm:text-base text-ink-muted leading-relaxed">{trip.summary}</p>
                      <Show when={trip.highlights.length > 0}>
                        <div class="space-y-2">
                          <h4 class="font-mono text-xs uppercase tracking-widest text-ink-muted">
                            Highlights
                          </h4>
                          <ul class="space-y-1.5 text-sm text-ink">
                            <For each={trip.highlights}>
                              {(item) => (
                                <li class="flex items-start gap-2">
                                  <span class="text-accent" aria-hidden="true">·</span>
                                  <span>{item}</span>
                                </li>
                              )}
                            </For>
                          </ul>
                        </div>
                      </Show>
                      <a
                        href={`/travel/${trip.slug}/`}
                        class="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent transition-colors"
                      >
                        <span>Read full field notes</span>
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                )
              })()}
            >
              {(() => {
                const t = target()
                if (t.kind !== "park") return null
                const park = t.park
                return (
                  <div class="flex flex-col max-h-[86dvh]">
                    <div class="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
                      <div class="flex items-start gap-4 min-w-0">
                        <div class="size-20 sm:size-24 shrink-0">
                          <ParkEmblem park={park} idPrefix="modal" decorative={true} />
                        </div>
                        <div class="space-y-1.5 min-w-0">
                          <div class="flex flex-wrap items-center gap-2">
                            <span
                              class={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold ${
                                park.visited
                                  ? "bg-atlas-soft text-atlas"
                                  : "border border-dashed border-border bg-surface text-ink-muted"
                              }`}
                            >
                              {park.visited ? "Visited" : "Not yet visited"}
                            </span>
                            <span class="font-mono text-xs text-ink-muted">
                              {`${park.code} · Est. ${park.established}`}
                            </span>
                            <Show when={park.journal?.visitedDate}>
                              {(date) => (
                                <span class="font-mono text-xs text-accent">{`· ${date()}`}</span>
                              )}
                            </Show>
                          </div>
                          <h3 id="atlas-modal-title" class="font-serif text-2xl sm:text-3xl font-medium text-ink">
                            {`${park.name} National Park`}
                          </h3>
                          <p class="font-mono text-xs text-ink-muted">
                            {`${park.states.join(", ")} · ${park.region} · ${park.biome}`}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => dialogRef?.close()}
                        aria-label="Close park field card"
                        class="shrink-0 inline-flex size-9 items-center justify-center rounded-md border border-border bg-surface text-ink-muted hover:border-accent hover:text-ink transition-colors"
                      >
                        <span aria-hidden="true" class="text-lg leading-none">×</span>
                      </button>
                    </div>

                    <div class="overflow-y-auto p-5 sm:p-6 space-y-6">
                      <Show when={park.journal?.photos && (park.journal?.photos?.length ?? 0) > 0}>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <For each={park.journal?.photos ?? []}>
                            {(photo) => (
                              <figure class="overflow-hidden rounded-lg border border-border bg-surface">
                                <img
                                  src={photo.src}
                                  alt={photo.alt}
                                  loading="lazy"
                                  class="w-full aspect-[4/3] object-cover"
                                />
                                <Show when={photo.caption}>
                                  <figcaption class="px-3 py-2 font-mono text-[11px] text-ink-muted border-t border-border">
                                    {photo.caption}
                                  </figcaption>
                                </Show>
                              </figure>
                            )}
                          </For>
                        </div>
                      </Show>

                      <Show when={park.journal?.quote}>
                        {(quote) => (
                          <blockquote class="border-l-2 border-accent pl-4 py-1 font-serif text-lg sm:text-xl italic text-ink leading-relaxed">
                            “{quote()}”
                          </blockquote>
                        )}
                      </Show>

                      <Show when={park.journal?.liked && (park.journal?.liked?.length ?? 0) > 0}>
                        <div class="space-y-2">
                          <h4 class="font-mono text-xs uppercase tracking-widest text-ink-muted">
                            What we liked
                          </h4>
                          <ul class="space-y-2 text-sm sm:text-base text-ink">
                            <For each={park.journal?.liked ?? []}>
                              {(item) => (
                                <li class="flex items-start gap-2.5">
                                  <span class="text-accent font-bold" aria-hidden="true">·</span>
                                  <span>{item}</span>
                                </li>
                              )}
                            </For>
                          </ul>
                        </div>
                      </Show>

                      <div class="space-y-2">
                        <h4 class="font-mono text-xs uppercase tracking-widest text-ink-muted">
                          {park.journal?.notes ? "Field Notes" : "Landscape Overview"}
                        </h4>
                        <p class="text-sm sm:text-base text-ink leading-relaxed">
                          {park.journal?.notes ?? park.landscapeNote}
                        </p>
                        <Show when={park.journal?.notes}>
                          <p class="text-xs text-ink-muted pt-1">{park.landscapeNote}</p>
                        </Show>
                      </div>

                      <dl class="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-lg border border-border bg-surface p-4 text-xs font-mono">
                        <div>
                          <dt class="text-[10px] uppercase tracking-wider text-ink-muted">High Point</dt>
                          <dd class="mt-0.5 text-ink font-medium">{formatElevationFt(park.highPointFt)}</dd>
                        </div>
                        <div>
                          <dt class="text-[10px] uppercase tracking-wider text-ink-muted">Low Point</dt>
                          <dd class="mt-0.5 text-ink font-medium">{formatElevationFt(park.lowPointFt)}</dd>
                        </div>
                        <div>
                          <dt class="text-[10px] uppercase tracking-wider text-ink-muted">Area</dt>
                          <dd class="mt-0.5 text-ink font-medium">{formatAcres(park.acres)}</dd>
                        </div>
                        <div>
                          <dt class="text-[10px] uppercase tracking-wider text-ink-muted">Coordinates</dt>
                          <dd class="mt-0.5 text-ink font-medium">{formatCoordinates(park.coordinates)}</dd>
                        </div>
                      </dl>

                      <Show when={!hasPersonalNotes(park)}>
                        <p class="rounded-lg border border-dashed border-border bg-surface/60 px-4 py-3 text-xs font-mono text-ink-muted">
                          {park.visited
                            ? "Photos, favorite spots, and quotes for this park haven’t been logged yet."
                            : "Not visited yet — still on the list."}
                        </p>
                      </Show>
                    </div>

                    <div class="flex items-center justify-between gap-3 border-t border-border bg-surface/60 px-5 py-3.5 sm:px-6">
                      <button
                        type="button"
                        onClick={() => stepModalPark(-1)}
                        class="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs font-mono text-ink hover:border-accent hover:text-accent transition-colors"
                      >
                        <span>← Previous park</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => stepModalPark(1)}
                        class="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs font-mono text-ink hover:border-accent hover:text-accent transition-colors"
                      >
                        <span>Next park →</span>
                      </button>
                    </div>
                  </div>
                )
              })()}
            </Show>
          )}
        </Show>
      </dialog>
    </div>
  )
}
