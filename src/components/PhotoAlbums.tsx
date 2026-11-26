import { For, Show, createMemo, createSignal, onMount } from "solid-js"
import type { PhotoAlbum, PhotoItem } from "@types"
import PhotoGallery from "@components/PhotoGallery"
import { buildAlbumHref, filterPhotoAlbums, resolvePhotoThumbnail } from "@lib/photos"

type Props = {
  readonly albums: readonly PhotoAlbum[]
  readonly photos: readonly PhotoItem[]
}

type GalleryViewMode = "albums" | "frames"

export default function PhotoAlbums(props: Props) {
  const [viewMode, setViewMode] = createSignal<GalleryViewMode>("albums")
  const [query, setQuery] = createSignal("")
  const [failedCoverUrls, setFailedCoverUrls] = createSignal<ReadonlySet<string>>(new Set())

  const visibleAlbums = createMemo(() => filterPhotoAlbums(props.albums, query()))

  function markCoverFailed(url: string) {
    setFailedCoverUrls((prev) => {
      if (prev.has(url)) {
        return prev
      }
      const next = new Set(prev)
      next.add(url)
      return next
    })
  }

  onMount(() => {
    const hash = window.location.hash
    if (hash.startsWith("#photo-")) {
      const targetSlug = hash.slice("#photo-".length)
      if (props.photos.some((photo) => photo.slug === targetSlug)) {
        setViewMode("frames")
      }
    }
  })

  return (
    <div class="space-y-8">
      <Show
        when={props.photos.length > 0}
        fallback={
          <div class="rounded-xl border border-dashed border-border bg-surface/55 px-6 py-12 sm:px-10 sm:py-14 text-center space-y-3">
            <p class="editorial-kicker text-accent">
              Darkroom · Albums &amp; Contact Sheets on the Way
            </p>
            <h2 class="font-serif text-2xl sm:text-3xl font-medium text-ink">
              Photo albums and travel contact sheets will appear here soon.
            </h2>
            <p class="mx-auto max-w-xl text-sm sm:text-base text-ink-muted leading-relaxed">
              The gallery is set up for curated photo albums, quiet light, and street scenes — each
              album opens into its own contact sheet with camera notes and a full-resolution
              lightbox.
            </p>
          </div>
        }
      >
        {/* View mode toggle & search */}
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-border bg-surface/75 p-4 sm:p-5">
          <div
            class="filter-pill-row"
            role="group"
            aria-label="Choose photo gallery view"
          >
            <button
              type="button"
              aria-pressed={viewMode() === "albums"}
              onClick={() => setViewMode("albums")}
              class={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                viewMode() === "albums"
                  ? "border-accent bg-accent text-bg font-semibold"
                  : "border-border bg-surface-elevated text-ink-muted hover:border-accent hover:text-ink"
              }`}
            >
              <span>Albums</span>
              <span class="opacity-75">({props.albums.length})</span>
            </button>

            <button
              type="button"
              aria-pressed={viewMode() === "frames"}
              onClick={() => setViewMode("frames")}
              class={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                viewMode() === "frames"
                  ? "border-accent bg-accent text-bg font-semibold"
                  : "border-border bg-surface-elevated text-ink-muted hover:border-accent hover:text-ink"
              }`}
            >
              <span>All Frames</span>
              <span class="opacity-75">({props.photos.length})</span>
            </button>
          </div>

          <Show
            when={viewMode() === "albums"}
            fallback={
              <p class="text-xs font-mono uppercase tracking-wider text-ink-muted">
                Browsing every frame across {props.albums.length}{" "}
                {props.albums.length === 1 ? "album" : "albums"}
              </p>
            }
          >
            <label class="relative w-full sm:w-72 shrink-0">
              <span class="sr-only">Search albums or frames</span>
              <input
                type="search"
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
                placeholder="Search albums or frames..."
                class="w-full rounded-md border border-border bg-surface-elevated px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent"
              />
            </label>
          </Show>
        </div>

        <Show
          when={viewMode() === "albums"}
          fallback={<PhotoGallery photos={props.photos} />}
        >
          <Show
            when={visibleAlbums().length > 0}
            fallback={
              <div class="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-12 text-center space-y-2">
                <p class="font-serif text-xl text-ink">No albums match that search.</p>
                <p class="text-sm text-ink-muted">
                  Try clearing the search query or switch to All Frames to browse every photograph.
                </p>
              </div>
            }
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <For each={visibleAlbums()}>
                {(album, index) => {
                  const coverSrc = () => resolvePhotoThumbnail(album.coverPhoto)
                  const isFailed = () => failedCoverUrls().has(coverSrc())
                  const isPriorityCover = () => index() < 2

                  return (
                    <a
                      href={buildAlbumHref(album.slug)}
                      class="group block rounded-xl focus-visible:outline-2"
                    >
                      <div class={album.count > 1 ? "relative pt-2" : "relative"}>
                        <Show when={album.count > 1}>
                          <div
                            aria-hidden="true"
                            class="album-stack-sheet pointer-events-none absolute inset-x-3 top-0 bottom-4 rounded-xl border border-border bg-surface/90 group-hover:border-accent/60"
                          />
                        </Show>

                        <div class="photo-card relative overflow-hidden rounded-xl border border-border bg-surface-elevated group-hover:border-accent">
                          <div class="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                            <Show
                              when={!isFailed()}
                              fallback={
                                <div
                                  class="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-surface px-4 py-8 text-center"
                                  role="img"
                                  aria-label={album.coverPhoto.alt}
                                >
                                  <span class="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                                    Cover Unavailable
                                  </span>
                                  <span class="font-serif text-sm text-ink-muted">
                                    {album.name}
                                  </span>
                                </div>
                              }
                            >
                              <img
                                src={coverSrc()}
                                alt={album.coverPhoto.alt}
                                fetchpriority={isPriorityCover() ? "high" : undefined}
                                loading={isPriorityCover() ? undefined : "lazy"}
                                decoding="async"
                                onError={() => markCoverFailed(coverSrc())}
                                class="photo-card-img block h-full w-full object-cover"
                              />
                            </Show>
                          </div>

                          <div class="space-y-2.5 p-4 sm:p-5">
                            <div class="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-wider text-ink-muted">
                              <span class="rounded bg-atlas-soft px-2 py-0.5 text-atlas font-medium">
                                {album.count} {album.count === 1 ? "frame" : "frames"}
                              </span>
                              <Show when={album.dateRange}>
                                <span>{album.dateRange}</span>
                              </Show>
                            </div>

                            <h2 class="font-serif text-xl font-medium text-ink group-hover:text-accent transition-colors leading-snug">
                              {album.name}
                            </h2>

                            <Show when={album.locations.length > 0}>
                              <p class="truncate text-xs font-mono text-ink-muted">
                                {album.locations.join(" · ")}
                              </p>
                            </Show>

                            <div class="flex items-center justify-between border-t border-border/70 pt-3 text-xs font-mono uppercase tracking-wider text-ink-muted group-hover:text-accent transition-colors">
                              <span>Open gallery</span>
                              <span aria-hidden="true">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  )
                }}
              </For>
            </div>
          </Show>
        </Show>
      </Show>
    </div>
  )
}
