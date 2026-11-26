import { For, Show, createMemo, createSignal, onCleanup, onMount } from "solid-js"
import type { ProjectedPark, UsStateGeometry } from "@types"
import { US_ALBERS_VIEWBOX, US_STATES } from "@data/usStates"
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
import ParkEmblem from "./ParkEmblem"

type ViewMode = "map" | "poster"

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

export default function NationalParksAtlas() {
  const allParks = getProjectedParks()
  const summary = computeParkSurveySummary(allParks, US_STATES)

  const [viewMode, setViewMode] = createSignal<ViewMode>("map")
  const [visitFilter, setVisitFilter] = createSignal<ParkVisitFilter>("all")
  const [sortOrder, setSortOrder] = createSignal<ParkSortOrder>("alpha")
  const [query, setQuery] = createSignal("")
  const [selectedCode, setSelectedCode] = createSignal<string>("YOSE")
  const [hoveredCode, setHoveredCode] = createSignal<string | null>(null)
  const [activeStateAbbr, setActiveStateAbbr] = createSignal<string | null>(null)
  const [modalPark, setModalPark] = createSignal<ProjectedPark | null>(null)

  let dialogRef: HTMLDialogElement | undefined

  const visibleParks = createMemo(() =>
    filterAndSortParks(allParks, visitFilter(), query(), sortOrder()),
  )

  const visibleCodeSet = createMemo(() => new Set(visibleParks().map((p) => p.code)))

  const selectedPark = createMemo<ProjectedPark>(() => {
    const visible = visibleParks()
    const exact = visible.find((p) => p.code === selectedCode())
    return exact ?? allParks.find((p) => p.code === selectedCode()) ?? allParks[0]
  })

  const hoveredPark = createMemo<ProjectedPark | undefined>(() => {
    const code = hoveredCode()
    if (!code) return undefined
    return allParks.find((p) => p.code === code)
  })

  const stateParkCounts = createMemo(() => {
    const counts = new Map<string, { visited: number; total: number }>()
    for (const park of allParks) {
      for (const st of park.states) {
        const prev = counts.get(st) ?? { visited: 0, total: 0 }
        counts.set(st, {
          visited: prev.visited + (park.visited ? 1 : 0),
          total: prev.total + 1,
        })
      }
    }
    return counts
  })

  const activeStateInfo = createMemo(() => {
    const abbr = activeStateAbbr()
    if (!abbr) return null
    const geom = US_STATES.find((s) => s.abbr === abbr)
    if (!geom) return null
    const counts = stateParkCounts().get(abbr) ?? { visited: 0, total: 0 }
    return { geom, counts }
  })

  const visitCounts = createMemo<Record<ParkVisitFilter, number>>(() => ({
    all: summary.totalParks,
    visited: summary.visitedParks,
    unvisited: summary.remainingParks,
  }))

  function openParkModal(park: ProjectedPark) {
    setSelectedCode(park.code)
    setModalPark(park)
    if (dialogRef && !dialogRef.open) {
      dialogRef.showModal()
    }
  }

  function handleDialogClose() {
    if (dialogRef) {
      dialogRef.returnValue = ""
    }
    setModalPark(null)
  }

  function stepPark(delta: number, inModal: boolean) {
    const list = visibleParks().length > 0 ? visibleParks() : allParks
    const currentCode = inModal ? (modalPark()?.code ?? selectedCode()) : selectedCode()
    const idx = list.findIndex((p) => p.code === currentCode)
    const nextIdx = idx === -1 ? 0 : (idx + delta + list.length) % list.length
    const next = list[nextIdx]
    if (!next) return
    setSelectedCode(next.code)
    if (inModal) {
      setModalPark(next)
    }
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
        openParkModal(matched)
      }
    }
  })

  const lower48AndTerritoryStates = US_STATES.filter((s) => s.abbr !== "DC")

  function hasPersonalNotes(park: ProjectedPark): boolean {
    const j = park.journal
    if (!j) return false
    return Boolean(
      j.quote || j.notes || (j.liked && j.liked.length > 0) || (j.photos && j.photos.length > 0),
    )
  }

  return (
    <section class="space-y-6" aria-labelledby="national-parks-heading">
      {/* Masthead & Mode Switcher */}
      <div class="rounded-xl border border-border bg-surface-elevated p-5 sm:p-6 space-y-5">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div class="space-y-2">
            <p class="editorial-kicker text-atlas">
              {`U.S. National Parks · ${summary.lower48StatesVisited}/${summary.lower48StatesTotal} Lower States Complete`}
            </p>
            <h2 id="national-parks-heading" class="font-serif text-2xl sm:text-3xl font-medium text-ink">
              {`${summary.visitedParks} of ${summary.totalParks} National Parks`}
            </h2>
            <p class="max-w-2xl text-sm sm:text-base text-ink-muted leading-relaxed">
              {`Every state in the contiguous 48 visited and ${summary.visitedParks} of ${summary.totalParks} U.S. National Parks explored — select any park on the map or poster to inspect its field card, favorite highlights, and notes.`}
            </p>
          </div>

          {/* Primary Map / Poster Mode Switch */}
          <div
            class="inline-flex self-start lg:self-end rounded-lg border border-border bg-surface p-1 gap-1 shrink-0"
            role="group"
            aria-label="National Parks view mode"
          >
            <button
              type="button"
              aria-pressed={viewMode() === "map"}
              onClick={() => setViewMode("map")}
              class={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                viewMode() === "map"
                  ? "bg-ink text-bg font-semibold shadow-sm"
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
              class={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                viewMode() === "poster"
                  ? "bg-ink text-bg font-semibold shadow-sm"
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

        {/* Filter & Search Bar */}
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-border pt-4">
          <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Filter parks by visit status">
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
      </div>

      {/* MAP MODE */}
      <Show when={viewMode() === "map"}>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Albers USA Map */}
          <figure class="lg:col-span-8 rounded-xl border border-border bg-surface-elevated p-4 sm:p-5 space-y-3">
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
                      when={activeStateInfo()}
                      fallback={`${visibleParks().length} of ${summary.totalParks} shown`}
                    >
                      {(info) =>
                        `${info().geom.name} · ${info().geom.visited ? "Visited" : "Unvisited"}${
                          info().counts.total > 0
                            ? ` (${info().counts.visited}/${info().counts.total} parks)`
                            : ""
                        }`
                      }
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

                {/* Cartographic inset frames for Alaska, Hawaii, USVI, and American Samoa */}
                <g fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="3 3">
                  <rect x="26" y="424" width="194" height="168" rx="6" />
                  <rect x="230" y="492" width="128" height="100" rx="6" />
                  <rect
                    x={TERRITORY_INSETS.virginIslands.x}
                    y={TERRITORY_INSETS.virginIslands.y}
                    width={TERRITORY_INSETS.virginIslands.width}
                    height={TERRITORY_INSETS.virginIslands.height}
                    rx="6"
                    fill="var(--atlas-soft)"
                    fill-opacity="0.35"
                    stroke-dasharray={undefined}
                  />
                  <rect
                    x={TERRITORY_INSETS.americanSamoa.x}
                    y={TERRITORY_INSETS.americanSamoa.y}
                    width={TERRITORY_INSETS.americanSamoa.width}
                    height={TERRITORY_INSETS.americanSamoa.height}
                    rx="6"
                  />
                </g>

                {/* Inset labels */}
                <g
                  fill="var(--ink-muted)"
                  font-family="JetBrains Mono, monospace"
                  font-size="9.5"
                  letter-spacing="0.08em"
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
                />
                <path
                  d={`M${TERRITORY_INSETS.americanSamoa.cx - 14},${TERRITORY_INSETS.americanSamoa.cy + 3} Q${TERRITORY_INSETS.americanSamoa.cx},${TERRITORY_INSETS.americanSamoa.cy - 5} ${TERRITORY_INSETS.americanSamoa.cx + 14},${TERRITORY_INSETS.americanSamoa.cy - 1} Q${TERRITORY_INSETS.americanSamoa.cx + 3},${TERRITORY_INSETS.americanSamoa.cy + 6} ${TERRITORY_INSETS.americanSamoa.cx - 14},${TERRITORY_INSETS.americanSamoa.cy + 3}Z`}
                  fill="var(--surface-elevated)"
                  stroke="var(--border)"
                  stroke-width="1"
                  stroke-dasharray="2 2"
                />

                {/* All 50 U.S. States */}
                <g>
                  <For each={lower48AndTerritoryStates}>
                    {(state: UsStateGeometry) => {
                      const isStateHighlighted = () =>
                        activeStateAbbr() === state.abbr ||
                        selectedPark().states.includes(state.abbr)
                      return (
                        <path
                          d={state.d}
                          onMouseEnter={() => setActiveStateAbbr(state.abbr)}
                          onMouseLeave={() => setActiveStateAbbr(null)}
                          class="transition-colors duration-150"
                          fill={
                            state.visited
                              ? isStateHighlighted()
                                ? "var(--atlas-soft)"
                                : "var(--atlas-soft)"
                              : "var(--surface-elevated)"
                          }
                          fill-opacity={
                            state.visited ? (isStateHighlighted() ? 1 : 0.72) : 0.65
                          }
                          stroke={
                            isStateHighlighted()
                              ? "var(--atlas)"
                              : state.visited
                                ? "var(--bg)"
                                : "var(--border)"
                          }
                          stroke-width={isStateHighlighted() ? 1.5 : 0.9}
                          stroke-dasharray={state.visited ? undefined : "3 2"}
                        />
                      )
                    }}
                  </For>
                </g>
              </svg>

              {/* Accessible native HTML <button> pins positioned over exact Albers coordinates */}
              <For each={allParks}>
                {(park) => {
                  const leftPct = `${(park.mapPoint.x / US_ALBERS_VIEWBOX.width) * 100}%`
                  const topPct = `${(park.mapPoint.y / US_ALBERS_VIEWBOX.height) * 100}%`
                  const isVisible = () => visibleCodeSet().has(park.code)
                  const isSelected = () => selectedPark().code === park.code
                  const isHovered = () => hoveredCode() === park.code

                  return (
                    <button
                      type="button"
                      aria-label={`${park.name} National Park (${park.states.join(", ")}) — ${
                        park.visited ? "Visited" : "Not yet visited"
                      }`}
                      aria-pressed={isSelected()}
                      onClick={() => setSelectedCode(park.code)}
                      onDblClick={() => openParkModal(park)}
                      onFocus={() => {
                        setSelectedCode(park.code)
                        setHoveredCode(park.code)
                      }}
                      onBlur={() => setHoveredCode(null)}
                      onMouseEnter={() => setHoveredCode(park.code)}
                      onMouseLeave={() => setHoveredCode(null)}
                      class={`park-map-pin group absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full focus-visible:outline-2 ${
                        isSelected() ? "z-20" : isHovered() ? "z-30" : "z-10"
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
                            ? isSelected()
                              ? "size-3.5 border-2 border-bg ring-4 ring-accent/30 scale-110"
                              : "size-2.5 border border-bg group-hover:scale-125"
                            : isSelected()
                              ? "size-3.5 border-2 border-ink bg-surface ring-4 ring-ink/15 scale-110"
                              : "size-2.5 border border-dashed border-ink-muted bg-surface/90 group-hover:scale-125"
                        }`}
                        style={
                          park.visited
                            ? { "background-color": "var(--park-pigment)" }
                            : undefined
                        }
                      />
                      <Show when={isSelected() || isHovered()}>
                        <span
                          class={`pointer-events-none absolute left-1/2 bottom-full mb-1 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10px] font-medium shadow-sm ${
                            isSelected()
                              ? "bg-ink text-bg"
                              : "bg-surface-elevated text-ink border border-border"
                          }`}
                        >
                          {park.name}
                        </span>
                      </Show>
                    </button>
                  )
                }}
              </For>
            </div>

            <figcaption class="text-xs text-ink-muted">
              Click any pin on the map to view its field card, or switch to Poster Mode to browse all 63 park emblems in order.
            </figcaption>
          </figure>

          {/* Map Mode Side Field Card Inspector */}
          <aside
            aria-label="Selected national park field card"
            class="lg:col-span-4 rounded-xl border border-border bg-surface-elevated p-5 sm:p-6 space-y-5"
          >
            <div class="flex items-start gap-4">
              <div class="size-20 shrink-0">
                <ParkEmblem park={selectedPark()} idPrefix="inspector" decorative={true} />
              </div>
              <div class="min-w-0 space-y-1.5 flex-1">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span
                    class={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold ${
                      selectedPark().visited
                        ? "bg-atlas-soft text-atlas"
                        : "border border-dashed border-border bg-surface text-ink-muted"
                    }`}
                  >
                    {selectedPark().visited ? "Visited" : "Not yet visited"}
                  </span>
                  <span class="font-mono text-[11px] text-ink-muted">
                    Est. {selectedPark().established}
                  </span>
                </div>
                <h3 class="font-serif text-xl sm:text-2xl font-medium text-ink leading-tight">
                  {selectedPark().name}
                </h3>
                <p class="font-mono text-xs text-ink-muted">
                  {selectedPark().states.join(" · ")} · {selectedPark().biome}
                </p>
              </div>
            </div>

            {/* Optional Hero Photo */}
            <Show when={selectedPark().journal?.photos?.[0]}>
              {(photo) => (
                <figure class="overflow-hidden rounded-lg border border-border bg-surface">
                  <img
                    src={photo().src}
                    alt={photo().alt}
                    loading="lazy"
                    class="w-full aspect-[16/10] object-cover"
                  />
                  <Show when={photo().caption}>
                    <figcaption class="px-3 py-1.5 font-mono text-[11px] text-ink-muted border-t border-border">
                      {photo().caption}
                    </figcaption>
                  </Show>
                </figure>
              )}
            </Show>

            {/* Optional Quote */}
            <Show when={selectedPark().journal?.quote}>
              {(quote) => (
                <blockquote class="border-l-2 border-accent pl-3.5 font-serif text-base italic text-ink leading-relaxed">
                  “{quote()}”
                </blockquote>
              )}
            </Show>

            {/* Optional What We Liked */}
            <Show when={selectedPark().journal?.liked && (selectedPark().journal?.liked?.length ?? 0) > 0}>
              <div class="space-y-1.5">
                <p class="text-[11px] font-mono uppercase tracking-widest text-ink-muted">
                  What we liked
                </p>
                <ul class="space-y-1 text-sm text-ink">
                  <For each={selectedPark().journal?.liked ?? []}>
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

            {/* Factual Landscape Note + Telemetry */}
            <p class="text-sm text-ink-muted leading-relaxed">
              {selectedPark().journal?.notes ?? selectedPark().landscapeNote}
            </p>

            <dl class="grid grid-cols-2 gap-2.5 rounded-lg border border-border bg-surface p-3 text-xs font-mono">
              <div>
                <dt class="text-[10px] uppercase tracking-wider text-ink-muted">High Point</dt>
                <dd class="mt-0.5 text-ink font-medium">{formatElevationFt(selectedPark().highPointFt)}</dd>
              </div>
              <div>
                <dt class="text-[10px] uppercase tracking-wider text-ink-muted">Area</dt>
                <dd class="mt-0.5 text-ink font-medium">{formatAcres(selectedPark().acres)}</dd>
              </div>
              <div class="col-span-2 border-t border-border/70 pt-2">
                <dt class="text-[10px] uppercase tracking-wider text-ink-muted">Coordinates</dt>
                <dd class="mt-0.5 text-ink">{formatCoordinates(selectedPark().coordinates)}</dd>
              </div>
            </dl>

            <Show when={!hasPersonalNotes(selectedPark())}>
              <p class="text-xs font-mono text-ink-muted/85">
                {selectedPark().visited
                  ? "Photos, quotes, and trip highlights coming soon."
                  : "Still on the list to visit."}
              </p>
            </Show>

            <div class="flex items-center justify-between gap-2 pt-1">
              <div class="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => stepPark(-1, false)}
                  aria-label="Previous park"
                  class="inline-flex items-center justify-center rounded-md border border-border bg-surface px-2.5 py-2 text-xs font-mono text-ink hover:border-accent hover:text-accent transition-colors"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => stepPark(1, false)}
                  aria-label="Next park"
                  class="inline-flex items-center justify-center rounded-md border border-border bg-surface px-2.5 py-2 text-xs font-mono text-ink hover:border-accent hover:text-accent transition-colors"
                >
                  Next →
                </button>
              </div>

              <button
                type="button"
                onClick={() => openParkModal(selectedPark())}
                class="inline-flex items-center gap-1.5 rounded-md bg-ink px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-medium text-bg hover:bg-accent transition-colors"
              >
                <span>Open card</span>
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </aside>
        </div>
      </Show>

      {/* POSTER MODE */}
      <Show when={viewMode() === "poster"}>
        <figure class="rounded-2xl border-2 border-border bg-surface-elevated p-3 sm:p-5 shadow-sm">
          <div class="rounded-xl border border-border/80 bg-surface/55 p-4 sm:p-7 space-y-6">
            {/* Vintage Collector Poster Title Plate */}
            <header class="text-center space-y-2 border-b border-border pb-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.22em] text-atlas">
                United States National Park Service · Collector’s Edition
              </p>
              <h3 class="font-serif text-2xl sm:text-4xl font-medium tracking-tight text-ink">
                The Sixty-Three National Parks
              </h3>
              <div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 pt-1 text-xs font-mono text-ink-muted">
                <span>
                  <strong class="text-ink font-semibold">{summary.visitedParks}/{summary.totalParks}</strong> Visited
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong class="text-ink font-semibold">{summary.lower48StatesVisited}/{summary.lower48StatesTotal}</strong> Lower States
                </span>
                <span aria-hidden="true">·</span>
                <span class="inline-flex items-center gap-1.5">
                  <span class="inline-block size-2 rounded-full bg-accent" aria-hidden="true" />
                  <span>Color = Visited</span>
                </span>
                <span class="inline-flex items-center gap-1.5">
                  <span class="inline-block size-2 rounded-full bg-ink-muted/40" aria-hidden="true" />
                  <span>Grayed = Remaining ({summary.remainingParks})</span>
                </span>
              </div>
            </header>

            {/* Ordered 63-Park Emblem Poster Grid */}
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
                            {park.states.join("/")} · {park.established}
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

      {/* Native <dialog closedby="any"> Park Journal Modal */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="park-modal-title"
        onClose={handleDialogClose}
      >
        <Show when={modalPark()}>
          {(park) => (
            <div class="flex flex-col max-h-[86dvh]">
              {/* Modal Header */}
              <div class="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
                <div class="flex items-start gap-4 min-w-0">
                  <div class="size-20 sm:size-24 shrink-0">
                    <ParkEmblem park={park()} idPrefix="modal" decorative={true} />
                  </div>
                  <div class="space-y-1.5 min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                      <span
                        class={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold ${
                          park().visited
                            ? "bg-atlas-soft text-atlas"
                            : "border border-dashed border-border bg-surface text-ink-muted"
                        }`}
                      >
                        {park().visited ? "Visited" : "Not yet visited"}
                      </span>
                      <span class="font-mono text-xs text-ink-muted">
                        {park().code} · Est. {park().established}
                      </span>
                      <Show when={park().journal?.visitedDate}>
                        {(date) => (
                          <span class="font-mono text-xs text-accent">· {date()}</span>
                        )}
                      </Show>
                    </div>
                    <h3 id="park-modal-title" class="font-serif text-2xl sm:text-3xl font-medium text-ink">
                      {park().name} National Park
                    </h3>
                    <p class="font-mono text-xs text-ink-muted">
                      {park().states.join(", ")} · {park().region} · {park().biome}
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

              {/* Scrollable Modal Body */}
              <div class="overflow-y-auto p-5 sm:p-6 space-y-6">
                {/* Photos Gallery (when present) */}
                <Show when={park().journal?.photos && (park().journal?.photos?.length ?? 0) > 0}>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <For each={park().journal?.photos ?? []}>
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

                {/* Pull Quote (when present) */}
                <Show when={park().journal?.quote}>
                  {(quote) => (
                    <blockquote class="border-l-2 border-accent pl-4 py-1 font-serif text-lg sm:text-xl italic text-ink leading-relaxed">
                      “{quote()}”
                    </blockquote>
                  )}
                </Show>

                {/* What We Liked (when present) */}
                <Show when={park().journal?.liked && (park().journal?.liked?.length ?? 0) > 0}>
                  <div class="space-y-2">
                    <h4 class="font-mono text-xs uppercase tracking-widest text-ink-muted">
                      What we liked
                    </h4>
                    <ul class="space-y-2 text-sm sm:text-base text-ink">
                      <For each={park().journal?.liked ?? []}>
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

                {/* Personal Notes or Landscape Overview */}
                <div class="space-y-2">
                  <h4 class="font-mono text-xs uppercase tracking-widest text-ink-muted">
                    {park().journal?.notes ? "Field Notes" : "Landscape Overview"}
                  </h4>
                  <p class="text-sm sm:text-base text-ink leading-relaxed">
                    {park().journal?.notes ?? park().landscapeNote}
                  </p>
                  <Show when={park().journal?.notes}>
                    <p class="text-xs text-ink-muted pt-1">{park().landscapeNote}</p>
                  </Show>
                </div>

                {/* Telemetry Strip */}
                <dl class="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-lg border border-border bg-surface p-4 text-xs font-mono">
                  <div>
                    <dt class="text-[10px] uppercase tracking-wider text-ink-muted">High Point</dt>
                    <dd class="mt-0.5 text-ink font-medium">{formatElevationFt(park().highPointFt)}</dd>
                  </div>
                  <div>
                    <dt class="text-[10px] uppercase tracking-wider text-ink-muted">Low Point</dt>
                    <dd class="mt-0.5 text-ink font-medium">{formatElevationFt(park().lowPointFt)}</dd>
                  </div>
                  <div>
                    <dt class="text-[10px] uppercase tracking-wider text-ink-muted">Area</dt>
                    <dd class="mt-0.5 text-ink font-medium">{formatAcres(park().acres)}</dd>
                  </div>
                  <div>
                    <dt class="text-[10px] uppercase tracking-wider text-ink-muted">Coordinates</dt>
                    <dd class="mt-0.5 text-ink font-medium">{formatCoordinates(park().coordinates)}</dd>
                  </div>
                </dl>

                <Show when={!hasPersonalNotes(park())}>
                  <p class="rounded-lg border border-dashed border-border bg-surface/60 px-4 py-3 text-xs font-mono text-ink-muted">
                    {park().visited
                      ? "Photos, favorite spots, and quotes for this park haven’t been logged yet."
                      : "Not visited yet — still on the list."}
                  </p>
                </Show>
              </div>

              {/* Modal Footer Navigation */}
              <div class="flex items-center justify-between gap-3 border-t border-border bg-surface/60 px-5 py-3.5 sm:px-6">
                <button
                  type="button"
                  onClick={() => stepPark(-1, true)}
                  class="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs font-mono text-ink hover:border-accent hover:text-accent transition-colors"
                >
                  <span>← Previous park</span>
                </button>
                <button
                  type="button"
                  onClick={() => stepPark(1, true)}
                  class="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs font-mono text-ink hover:border-accent hover:text-accent transition-colors"
                >
                  <span>Next park →</span>
                </button>
              </div>
            </div>
          )}
        </Show>
      </dialog>
    </section>
  )
}
