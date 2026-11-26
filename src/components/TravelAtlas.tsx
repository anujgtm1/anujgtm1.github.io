import { For, Show, createMemo, createSignal } from "solid-js"
import type { TravelItem, TravelRegion, TravelThumbnailItem } from "@types"
import {
  ATLAS_VIEWBOX,
  WORLD_LANDMASSES,
  filterTravelByRegion,
  formatCoordinates,
  getAvailableRegions,
  projectCoordinatesToMap,
} from "@lib/atlas"

type Props = {
  readonly trips: readonly TravelItem[]
  readonly thumbnails: readonly TravelThumbnailItem[]
}

type RegionFilter = TravelRegion | "All"

const LAT_LINES = [60, 30, 0, -30, -60] as const
const LNG_LINES = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150] as const

export default function TravelAtlas(props: Props) {
  const [regionFilter, setRegionFilter] = createSignal<RegionFilter>("All")
  const [selectedSlug, setSelectedSlug] = createSignal<string>(props.trips[0]?.slug ?? "")

  const availableRegions = createMemo(() => getAvailableRegions(props.trips))
  const filteredTrips = createMemo(() => filterTravelByRegion(props.trips, regionFilter()))

  const activeTrip = createMemo<TravelItem | undefined>(() => {
    const visible = filteredTrips()
    const current = visible.find((trip) => trip.slug === selectedSlug())
    return current ?? visible[0] ?? props.trips[0]
  })

  function selectRegion(region: RegionFilter) {
    setRegionFilter(region)
    const nextList = filterTravelByRegion(props.trips, region)
    if (nextList.length > 0 && !nextList.some((trip) => trip.slug === selectedSlug())) {
      setSelectedSlug(nextList[0]?.slug ?? "")
    }
  }

  return (
    <div class="space-y-12">
      {/* Top & Foremost: Full-Width Archival World Map */}
      <section
        id="travel-atlas-map"
        aria-label="Interactive archival world map"
        class="scroll-mt-24 rounded-none border border-border bg-surface-elevated"
      >
        {/* Top Swiss Control Strip */}
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div class="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
            <span class="text-atlas font-medium">Archival World Projection</span>
            <span aria-hidden="true">·</span>
            <span>
              {props.trips.length > 0
                ? `${filteredTrips().length} Stamped Destinations`
                : "Ready for Stamps"}
            </span>
          </div>

          <Show when={availableRegions().length > 0}>
            <div
              class="flex flex-wrap items-center gap-1.5"
              role="group"
              aria-label="Filter destinations by region"
            >
              <button
                type="button"
                aria-pressed={regionFilter() === "All"}
                onClick={() => selectRegion("All")}
                class={`rounded-none border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  regionFilter() === "All"
                    ? "border-ink bg-ink text-bg font-medium"
                    : "border-border bg-surface text-ink-muted hover:border-accent hover:text-ink"
                }`}
              >
                All ({props.trips.length})
              </button>
              <For each={availableRegions()}>
                {(region) => (
                  <button
                    type="button"
                    aria-pressed={regionFilter() === region}
                    onClick={() => selectRegion(region)}
                    class={`rounded-none border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                      regionFilter() === region
                        ? "border-ink bg-ink text-bg font-medium"
                        : "border-border bg-surface text-ink-muted hover:border-accent hover:text-ink"
                    }`}
                  >
                    {region}
                  </button>
                )}
              </For>
            </div>
          </Show>
        </div>

        {/* Full-Width Vector Projection Canvas */}
        <div class="relative w-full aspect-[2/1] overflow-hidden bg-surface">
          <svg
            viewBox={`0 0 ${ATLAS_VIEWBOX.width} ${ATLAS_VIEWBOX.height}`}
            class="block h-full w-full"
            role="img"
            aria-label="Archival equirectangular world map displaying travel coordinates"
          >
            <defs>
              <pattern id="travel-atlas-ocean" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="9" cy="9" r="0.8" fill="var(--border)" opacity="0.85" />
              </pattern>
            </defs>

            <rect width={ATLAS_VIEWBOX.width} height={ATLAS_VIEWBOX.height} fill="url(#travel-atlas-ocean)" />

            {/* Graticule grid */}
            <g stroke="var(--border)" stroke-width="0.7" opacity="0.65">
              <For each={LAT_LINES}>
                {(lat) => {
                  const y = ((90 - lat) / 180) * ATLAS_VIEWBOX.height
                  return (
                    <line
                      x1="0"
                      y1={y}
                      x2={ATLAS_VIEWBOX.width}
                      y2={y}
                      stroke-dasharray={lat === 0 ? "4 4" : undefined}
                    />
                  )
                }}
              </For>
              <For each={LNG_LINES}>
                {(lng) => {
                  const x = ((lng + 180) / 360) * ATLAS_VIEWBOX.width
                  return <line x1={x} y1="0" x2={x} y2={ATLAS_VIEWBOX.height} />
                }}
              </For>
            </g>

            {/* Stylized continents */}
            <g fill="var(--atlas-soft)" stroke="var(--atlas)" stroke-width="1" stroke-opacity="0.52">
              <For each={WORLD_LANDMASSES}>
                {(landmass) => <path d={landmass.d} />}
              </For>
            </g>

            {/* Compass rose */}
            <g transform="translate(64, 434)" stroke="var(--ink-muted)" fill="none" opacity="0.55">
              <circle cx="0" cy="0" r="20" stroke-width="0.9" stroke-dasharray="2 2" />
              <line x1="0" y1="-26" x2="0" y2="26" stroke-width="1" />
              <line x1="-26" y1="0" x2="26" y2="0" stroke-width="1" />
              <polygon points="0,-22 4,-6 -4,-6" fill="var(--accent)" stroke="none" />
              <text
                x="0"
                y="-30"
                text-anchor="middle"
                fill="var(--ink-muted)"
                stroke="none"
                font-size="9"
                font-family="JetBrains Mono, monospace"
              >
                N
              </text>
            </g>

            {/* Connecting route hairlines */}
            <Show when={filteredTrips().length > 1}>
              <polyline
                fill="none"
                stroke="var(--accent)"
                stroke-width="1.2"
                stroke-dasharray="4 5"
                stroke-opacity="0.5"
                points={filteredTrips()
                  .map((trip) => {
                    const pt = projectCoordinatesToMap(trip.coordinates)
                    return `${pt.x},${pt.y}`
                  })
                  .join(" ")}
              />
            </Show>
          </svg>

          {/* Accessible HTML button pins aligned to exact projected percentages */}
          <For each={filteredTrips()}>
            {(trip) => {
              const pt = projectCoordinatesToMap(trip.coordinates)
              const leftPct = `${(pt.x / ATLAS_VIEWBOX.width) * 100}%`
              const topPct = `${(pt.y / ATLAS_VIEWBOX.height) * 100}%`
              const isSelected = () => activeTrip()?.slug === trip.slug
              return (
                <button
                  type="button"
                  aria-label={`${trip.city}, ${trip.country} (${trip.stampCode})`}
                  aria-pressed={isSelected()}
                  onClick={() => setSelectedSlug(trip.slug)}
                  onFocus={() => setSelectedSlug(trip.slug)}
                  class="group absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full focus-visible:outline-2"
                  style={{ left: leftPct, top: topPct }}
                >
                  <span
                    class={`block rounded-full border-2 transition-colors ${
                      isSelected()
                        ? "size-4 border-bg bg-accent ring-4 ring-accent/30"
                        : "size-3 border-bg bg-atlas group-hover:bg-accent"
                    }`}
                  />
                  <span
                    class={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-none px-1.5 py-0.5 font-mono text-[10px] font-medium shadow-sm ${
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

        {/* Sleek Inline Pin Inspector Bar directly beneath the map */}
        <Show
          when={activeTrip()}
          fallback={
            <div
              aria-live="polite"
              class="border-t border-border bg-surface-elevated px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div class="flex flex-col sm:flex-row sm:items-baseline gap-x-4 gap-y-1 min-w-0">
                <span class="w-fit shrink-0 rounded-none border border-border bg-surface px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-atlas">
                  Passport Inspector
                </span>
                <p class="text-sm text-ink-muted leading-relaxed">
                  Awaiting first coordinates — destination pins and field notes will appear here as journeys are logged.
                </p>
              </div>
              <span class="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                0 Stamps
              </span>
            </div>
          }
        >
          {(trip) => (
            <div
              aria-live="polite"
              class="border-t border-border bg-surface-elevated px-4 py-4 sm:px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div class="flex flex-col sm:flex-row sm:items-baseline gap-x-4 gap-y-1 min-w-0">
                <span class="w-fit shrink-0 rounded-none border border-atlas/30 bg-atlas-soft px-2 py-0.5 font-mono text-[11px] font-semibold tracking-widest text-atlas">
                  {trip().stampCode}
                </span>

                <div class="min-w-0 space-y-0.5">
                  <p class="font-serif text-lg sm:text-xl font-medium text-ink">
                    {trip().city}, {trip().country}{" "}
                    <span class="font-mono text-xs font-normal text-ink-muted">
                      · {formatCoordinates(trip().coordinates)}
                    </span>
                  </p>
                  <p class="text-sm text-ink-muted leading-relaxed">
                    {trip().summary}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4 shrink-0 font-mono text-[11px] uppercase tracking-[0.12em]">
                <span class="text-ink-muted">{trip().date}</span>
                <a
                  href={`/travel/${trip().slug}/`}
                  class="inline-flex items-center gap-1.5 rounded-none bg-ink px-3.5 py-2 text-bg hover:bg-accent transition-colors"
                >
                  <span>Read travel log</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          )}
        </Show>
      </section>

      {/* Below the Map: Places & Visual Notes */}
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
          when={props.thumbnails.length > 0}
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
            <For each={props.thumbnails}>
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
                            setRegionFilter("All")
                            setSelectedSlug(tripSlug)
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
    </div>
  )
}
