import { For, Show, createMemo, createSignal } from "solid-js"
import type { TravelItem, TravelRegion } from "@types"
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
}

type RegionFilter = TravelRegion | "All"

const LAT_LINES = [60, 30, 0, -30, -60]
const LNG_LINES = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150]

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
    <div class="space-y-10">
      {/* Atlas Map + Active Stamp Inspector */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div class="lg:col-span-8 rounded-xl border border-border bg-surface-elevated p-4 sm:p-5 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted">
            <span>Archival World Projection</span>
            <span>{filteredTrips().length} Stamped Destinations</span>
          </div>

          <div class="relative w-full aspect-[2/1] overflow-hidden rounded-lg border border-border bg-surface">
            <svg
              viewBox={`0 0 ${ATLAS_VIEWBOX.width} ${ATLAS_VIEWBOX.height}`}
              class="block h-full w-full"
              role="img"
              aria-label="Stylized world map displaying Anuj Gautam's travel pins"
            >
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
              <g fill="var(--atlas-soft)" stroke="var(--atlas)" stroke-width="1" stroke-opacity="0.45">
                <For each={WORLD_LANDMASSES}>
                  {(landmass) => <path d={landmass.d} />}
                </For>
              </g>

              {/* Compass rose in bottom-left ocean */}
              <g transform="translate(68, 430)" stroke="var(--ink-muted)" fill="none" opacity="0.55">
                <circle cx="0" cy="0" r="22" stroke-width="0.9" stroke-dasharray="2 2" />
                <line x1="0" y1="-28" x2="0" y2="28" stroke-width="1" />
                <line x1="-28" y1="0" x2="28" y2="0" stroke-width="1" />
                <polygon points="0,-24 4,-6 -4,-6" fill="var(--accent)" stroke="none" />
                <text
                  x="0"
                  y="-32"
                  text-anchor="middle"
                  fill="var(--ink-muted)"
                  stroke="none"
                  font-size="9"
                  font-family="JetBrains Mono, monospace"
                >
                  N
                </text>
              </g>

              {/* Subtle connecting route hairlines */}
              <Show when={filteredTrips().length > 1}>
                <polyline
                  fill="none"
                  stroke="var(--accent)"
                  stroke-width="1.1"
                  stroke-dasharray="3 5"
                  stroke-opacity="0.4"
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
        </div>

        {/* Active Stamp Inspector Card */}
        <Show when={activeTrip()}>
          {(trip) => (
            <aside
              aria-label="Selected destination stamp"
              class="lg:col-span-4 rounded-xl border border-border bg-surface-elevated p-6 space-y-5"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="space-y-1">
                  <p class="text-xs font-mono uppercase tracking-widest text-atlas">
                    {trip().region}
                  </p>
                  <h2 class="font-serif text-2xl font-medium text-ink">
                    {trip().city}
                  </h2>
                  <p class="text-sm text-ink-muted">{trip().country}</p>
                </div>

                {/* Vintage SVG Passport Stamp Seal */}
                <svg
                  viewBox="0 0 88 88"
                  class="size-20 shrink-0 text-accent -rotate-6"
                  aria-hidden="true"
                >
                  <circle
                    cx="44"
                    cy="44"
                    r="39"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-dasharray="4 2"
                  />
                  <circle
                    cx="44"
                    cy="44"
                    r="33"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                  />
                  <text
                    x="44"
                    y="38"
                    text-anchor="middle"
                    fill="currentColor"
                    font-size="16"
                    font-weight="700"
                    font-family="JetBrains Mono, monospace"
                    letter-spacing="1.5"
                  >
                    {trip().stampCode}
                  </text>
                  <line x1="20" y1="45" x2="68" y2="45" stroke="currentColor" stroke-width="1" />
                  <text
                    x="44"
                    y="58"
                    text-anchor="middle"
                    fill="currentColor"
                    font-size="8.5"
                    font-family="JetBrains Mono, monospace"
                  >
                    {trip().date}
                  </text>
                </svg>
              </div>

              <div class="rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs text-ink-muted">
                {formatCoordinates(trip().coordinates)}
              </div>

              <div class="space-y-2">
                <h3 class="font-serif text-lg font-medium text-ink">{trip().title}</h3>
                <p class="text-sm text-ink-muted leading-relaxed">{trip().summary}</p>
              </div>

              <div class="space-y-2">
                <p class="text-xs font-mono uppercase tracking-widest text-ink-muted">
                  Highlights
                </p>
                <ul class="space-y-1.5 text-sm text-ink">
                  <For each={trip().highlights}>
                    {(highlight) => (
                      <li class="flex items-start gap-2">
                        <span class="text-accent" aria-hidden="true">·</span>
                        <span>{highlight}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>

              <a
                href={`/travel/${trip().slug}/`}
                class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-bg hover:bg-accent transition-colors"
              >
                <span>Read field notes</span>
                <span aria-hidden="true">→</span>
              </a>
            </aside>
          )}
        </Show>
      </div>

      {/* Passport Stamp Collection Grid */}
      <section class="space-y-5" aria-labelledby="passport-stamps-heading">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
          <h2 id="passport-stamps-heading" class="font-serif text-2xl font-medium text-ink">
            Passport Stamp Collection
          </h2>

          <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Filter destinations by region">
            <button
              type="button"
              aria-pressed={regionFilter() === "All"}
              onClick={() => selectRegion("All")}
              class={`rounded-full border px-3.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                regionFilter() === "All"
                  ? "border-accent bg-accent text-bg font-semibold"
                  : "border-border bg-surface-elevated text-ink-muted hover:border-accent hover:text-ink"
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
                  class={`rounded-full border px-3.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                    regionFilter() === region
                      ? "border-accent bg-accent text-bg font-semibold"
                      : "border-border bg-surface-elevated text-ink-muted hover:border-accent hover:text-ink"
                  }`}
                >
                  {region}
                </button>
              )}
            </For>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={filteredTrips()}>
            {(trip) => {
              const isSelected = () => activeTrip()?.slug === trip.slug
              return (
                <article
                  class={`editorial-card flex flex-col justify-between gap-4 rounded-xl border p-5 ${
                    isSelected()
                      ? "border-accent bg-surface-elevated"
                      : "border-border bg-surface-elevated/80 hover:border-accent"
                  }`}
                >
                  <div class="space-y-3">
                    <div class="flex items-center justify-between gap-2">
                      <span class="rounded border border-accent/40 bg-accent-soft px-2.5 py-0.5 font-mono text-xs font-semibold tracking-widest text-accent">
                        {trip.stampCode}
                      </span>
                      <span class="font-mono text-xs text-ink-muted">{trip.date}</span>
                    </div>

                    <div>
                      <h3 class="font-serif text-xl font-medium text-ink">
                        {trip.city}, {trip.country}
                      </h3>
                      <p class="mt-0.5 font-mono text-xs text-ink-muted">
                        {formatCoordinates(trip.coordinates)}
                      </p>
                    </div>

                    <p class="text-sm text-ink-muted leading-relaxed">{trip.summary}</p>
                  </div>

                  <div class="flex items-center justify-between gap-3 border-t border-border pt-3 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(trip.slug)}
                      class="text-atlas hover:text-accent underline decoration-border underline-offset-4 transition-colors"
                    >
                      Focus on map
                    </button>
                    <a
                      href={`/travel/${trip.slug}/`}
                      class="font-medium text-ink hover:text-accent transition-colors"
                    >
                      Field notes →
                    </a>
                  </div>
                </article>
              )
            }}
          </For>
        </div>
      </section>
    </div>
  )
}
