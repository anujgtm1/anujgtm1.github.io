import { For, Show, createMemo, createSignal, onCleanup, onMount } from "solid-js"
import type { PhotoItem } from "@types"
import {
  PHOTO_ASPECT_RATIOS,
  filterPhotos,
  getAdjacentPhotoIndex,
  getPhotoAlbums,
  resolvePhotoThumbnail,
  sortPhotos,
} from "@lib/photos"

type Props = {
  readonly photos: readonly PhotoItem[]
  readonly hideAlbumFilter?: boolean
}

function formatFrameNumber(index: number): string {
  return String(index + 1).padStart(2, "0")
}

export default function PhotoGallery(props: Props) {
  const [albumFilter, setAlbumFilter] = createSignal<string | "all">("all")
  const [query, setQuery] = createSignal("")
  const [selectedSlug, setSelectedSlug] = createSignal<string | null>(null)
  const [failedThumbUrls, setFailedThumbUrls] = createSignal<ReadonlySet<string>>(new Set())
  const [failedLightboxUrl, setFailedLightboxUrl] = createSignal<string | null>(null)

  let dialogRef: HTMLDialogElement | undefined

  const sortedPhotos = createMemo(() => sortPhotos(props.photos))
  const albums = createMemo(() => getPhotoAlbums(sortedPhotos()))
  const visiblePhotos = createMemo(() =>
    filterPhotos(sortedPhotos(), props.hideAlbumFilter ? "all" : albumFilter(), query()),
  )

  const lightboxList = createMemo(() => {
    const slug = selectedSlug()
    const visible = visiblePhotos()
    if (slug && visible.some((photo) => photo.slug === slug)) {
      return visible
    }
    return sortedPhotos()
  })

  const selectedIndex = createMemo(() => {
    const slug = selectedSlug()
    if (!slug) {
      return -1
    }
    return lightboxList().findIndex((photo) => photo.slug === slug)
  })

  const selectedPhoto = createMemo<PhotoItem | null>(() => {
    const idx = selectedIndex()
    if (idx < 0) {
      return null
    }
    return lightboxList()[idx] ?? null
  })

  function markThumbFailed(url: string) {
    setFailedThumbUrls((prev) => {
      if (prev.has(url)) {
        return prev
      }
      const next = new Set(prev)
      next.add(url)
      return next
    })
  }

  function openPhotoLightbox(photo: PhotoItem) {
    setSelectedSlug(photo.slug)
    if (dialogRef && !dialogRef.open) {
      dialogRef.showModal()
    }
  }

  function stepPhoto(direction: "prev" | "next") {
    const list = lightboxList()
    const currentIdx = selectedIndex()
    if (currentIdx < 0 || list.length <= 1) {
      return
    }
    const nextIdx = getAdjacentPhotoIndex(currentIdx, list.length, direction)
    const nextPhoto = list[nextIdx]
    if (nextPhoto) {
      setSelectedSlug(nextPhoto.slug)
    }
  }

  function handleDialogClose() {
    if (dialogRef) {
      dialogRef.returnValue = ""
    }
    setFailedLightboxUrl(null)
    setSelectedSlug(null)
  }

  function handleDialogKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      stepPhoto("prev")
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      stepPhoto("next")
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
    if (hash.startsWith("#photo-")) {
      const targetSlug = hash.slice("#photo-".length)
      const matched = props.photos.find((photo) => photo.slug === targetSlug)
      if (matched) {
        openPhotoLightbox(matched)
      }
    }
  })

  return (
    <div class="space-y-8">
      <Show
        when={props.photos.length > 0}
        fallback={
          <div class="rounded-xl border border-dashed border-border bg-surface/55 px-6 py-12 sm:px-10 sm:py-14 text-center space-y-3">
            <p class="editorial-kicker text-accent">Darkroom · Contact Sheets on the Way</p>
            <h2 class="font-serif text-2xl sm:text-3xl font-medium text-ink">
              Field photographs and travel contact sheets will appear here soon.
            </h2>
            <p class="mx-auto max-w-xl text-sm sm:text-base text-ink-muted leading-relaxed">
              The gallery is set up for quiet light, street scenes, and places worth remembering — with albums, camera notes, and a full-resolution lightbox ready for the first frames.
            </p>
          </div>
        }
      >
        {/* Filter bar */}
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-xl border border-border bg-surface/75 p-4 sm:p-5">
          <Show
            when={!props.hideAlbumFilter}
            fallback={
              <p class="text-xs font-mono uppercase tracking-wider text-ink-muted">
                Showing {visiblePhotos().length} of {props.photos.length}{" "}
                {props.photos.length === 1 ? "frame" : "frames"}
              </p>
            }
          >
            <div
              class="filter-pill-row"
              role="group"
              aria-label="Filter photos by album"
            >
              <button
                type="button"
                aria-pressed={albumFilter() === "all"}
                onClick={() => setAlbumFilter("all")}
                class={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  albumFilter() === "all"
                    ? "border-accent bg-accent text-bg font-semibold"
                    : "border-border bg-surface-elevated text-ink-muted hover:border-accent hover:text-ink"
                }`}
              >
                <span>All Frames</span>
                <span class="opacity-75">({props.photos.length})</span>
              </button>

              <For each={albums()}>
                {(album) => {
                  const isActive = () => albumFilter() === album.name
                  return (
                    <button
                      type="button"
                      aria-pressed={isActive()}
                      onClick={() => setAlbumFilter(album.name)}
                      class={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                        isActive()
                          ? "border-accent bg-accent text-bg font-semibold"
                          : "border-border bg-surface-elevated text-ink-muted hover:border-accent hover:text-ink"
                      }`}
                    >
                      <span>{album.name}</span>
                      <span class="opacity-75">({album.count})</span>
                    </button>
                  )
                }}
              </For>
            </div>
          </Show>

          <label class="relative w-full lg:w-64 shrink-0">
            <span class="sr-only">Filter photos by title, location, camera, or tag</span>
            <input
              type="search"
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
              placeholder="Filter title, location, camera, tag..."
              class="w-full rounded-md border border-border bg-surface-elevated px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent"
            />
          </label>
        </div>

        {/* Masonry gallery or empty filter notice */}
        <Show
          when={visiblePhotos().length > 0}
          fallback={
            <div class="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-12 text-center space-y-2">
              <p class="font-serif text-xl text-ink">No photographs match that filter.</p>
              <p class="text-sm text-ink-muted">
                {props.hideAlbumFilter
                  ? "Try clearing the search query to see every frame in this album."
                  : "Try clearing the search query or switching back to all albums."}
              </p>
            </div>
          }
        >
          <div class="photo-masonry">
            <For each={visiblePhotos()}>
              {(photo, index) => {
                const thumbSrc = () => resolvePhotoThumbnail(photo)
                const isFailed = () => failedThumbUrls().has(thumbSrc())
                const aspectStyle = () =>
                  photo.aspectRatio
                    ? { "aspect-ratio": PHOTO_ASPECT_RATIOS[photo.aspectRatio] }
                    : undefined
                const isPriorityFrame = () => index() < 2

                return (
                  <figure class="photo-masonry-item">
                    <button
                      type="button"
                      id={`photo-${photo.slug}`}
                      onClick={() => openPhotoLightbox(photo)}
                      aria-label={`Open photograph: ${photo.title}`}
                      class="photo-card group block w-full text-start overflow-hidden rounded-xl border border-border bg-surface-elevated hover:border-accent focus-visible:outline-2"
                    >
                      <div
                        class="relative w-full overflow-hidden bg-surface"
                        style={aspectStyle()}
                      >
                        <Show
                          when={!isFailed()}
                          fallback={
                            <div
                              class="flex min-h-48 w-full flex-col items-center justify-center gap-1.5 bg-surface px-4 py-8 text-center"
                              role="img"
                              aria-label={photo.alt}
                            >
                              <span class="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                                Frame Unavailable
                              </span>
                              <span class="font-serif text-sm text-ink-muted">{photo.title}</span>
                            </div>
                          }
                        >
                          <img
                            src={thumbSrc()}
                            alt={photo.alt}
                            fetchpriority={isPriorityFrame() ? "high" : undefined}
                            loading={isPriorityFrame() ? undefined : "lazy"}
                            decoding="async"
                            onError={() => markThumbFailed(thumbSrc())}
                            class={`photo-card-img block w-full ${
                              photo.aspectRatio ? "h-full object-cover" : "h-auto"
                            }`}
                          />
                        </Show>
                      </div>

                      <div class="space-y-1.5 p-4">
                        <div class="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-wider text-ink-muted">
                          <Show
                            when={!props.hideAlbumFilter && photo.album}
                            fallback={<span>{photo.date}</span>}
                          >
                            <span class="rounded bg-atlas-soft px-2 py-0.5 text-atlas font-medium">
                              {photo.album}
                            </span>
                          </Show>
                          <Show when={!props.hideAlbumFilter && photo.album}>
                            <span>{photo.date}</span>
                          </Show>
                        </div>

                        <p class="font-serif text-lg font-medium text-ink group-hover:text-accent transition-colors leading-snug">
                          {photo.title}
                        </p>

                        <Show when={photo.location}>
                          <p class="text-xs font-mono text-ink-muted">{photo.location}</p>
                        </Show>
                      </div>
                    </button>
                  </figure>
                )
              }}
            </For>
          </div>
        </Show>
      </Show>

      {/* Native <dialog> lightbox with closedby="any" — NO role="dialog", NO aria-modal, NO focus trap */}
      <dialog
        ref={dialogRef}
        closedby="any"
        class="lightbox-dialog"
        aria-labelledby="photo-lightbox-title"
        onClose={handleDialogClose}
        onKeyDown={handleDialogKeyDown}
      >
        <Show when={selectedPhoto()}>
          {(photo) => {
            const isLightboxImageFailed = () => failedLightboxUrl() === photo().imageUrl
            const totalFrames = () => lightboxList().length
            const currentIndex = () => selectedIndex()

            return (
              <div class="flex flex-col overflow-y-auto">
                {/* Lightbox top bar */}
                <div class="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
                  <div class="flex flex-wrap items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-ink-muted">
                    <span>
                      {formatFrameNumber(Math.max(0, currentIndex()))} /{" "}
                      {String(totalFrames()).padStart(2, "0")}
                    </span>
                    <Show when={photo().album}>
                      <span class="rounded bg-atlas-soft px-2 py-0.5 text-atlas font-medium">
                        {photo().album}
                      </span>
                    </Show>
                    <span>· {photo().date}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <Show when={totalFrames() > 1}>
                      <button
                        type="button"
                        onClick={() => stepPhoto("prev")}
                        aria-label="Previous photograph"
                        class="inline-flex min-h-9 items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-muted hover:border-accent hover:text-ink transition-colors"
                      >
                        ← Prev
                      </button>
                      <button
                        type="button"
                        onClick={() => stepPhoto("next")}
                        aria-label="Next photograph"
                        class="inline-flex min-h-9 items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-muted hover:border-accent hover:text-ink transition-colors"
                      >
                        Next →
                      </button>
                    </Show>

                    <form method="dialog">
                      <button
                        type="submit"
                        autofocus
                        aria-label="Close photo lightbox"
                        class="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-muted hover:border-accent hover:text-ink transition-colors"
                      >
                        Close
                      </button>
                    </form>
                  </div>
                </div>

                {/* Full-resolution image stage */}
                <div class="flex items-center justify-center bg-surface/80 p-4 sm:p-6">
                  <Show
                    when={!isLightboxImageFailed()}
                    fallback={
                      <div
                        class="flex min-h-60 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface-elevated px-6 py-12 text-center"
                        role="img"
                        aria-label={photo().alt}
                      >
                        <span class="font-mono text-xs uppercase tracking-widest text-ink-muted">
                          Full-Resolution Image Unavailable
                        </span>
                        <span class="text-sm text-ink-muted">{photo().alt}</span>
                      </div>
                    }
                  >
                    <img
                      src={photo().imageUrl}
                      alt={photo().alt}
                      decoding="async"
                      onError={() => setFailedLightboxUrl(photo().imageUrl)}
                      class="block max-h-[62dvh] w-auto max-w-full rounded-md border border-border object-contain"
                    />
                  </Show>
                </div>

                {/* Metadata & caption */}
                <div class="space-y-4 border-t border-border p-5 sm:p-6">
                  <div class="space-y-1.5">
                    <h1
                      id="photo-lightbox-title"
                      class="font-serif text-2xl sm:text-3xl font-medium text-ink"
                    >
                      {photo().title}
                    </h1>

                    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-ink-muted">
                      <Show when={photo().location}>
                        <span>{photo().location}</span>
                      </Show>
                      <Show when={photo().camera}>
                        <span>
                          {photo().location ? "· " : ""}
                          {photo().camera}
                        </span>
                      </Show>
                    </div>
                  </div>

                  <Show when={photo().caption}>
                    <p class="max-w-3xl text-sm sm:text-base text-ink-muted leading-relaxed">
                      {photo().caption}
                    </p>
                  </Show>

                  <Show when={photo().linkedHref}>
                    {(href) => (
                      <p class="pt-1">
                        <a
                          href={href()}
                          class="font-mono text-xs uppercase tracking-[0.12em] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
                        >
                          {photo().linkedLabel ?? "Open linked entry →"}
                        </a>
                      </p>
                    )}
                  </Show>

                  <Show when={photo().tags.length > 0}>
                    <div class="flex flex-wrap gap-1.5 pt-1">
                      <For each={photo().tags}>
                        {(tag) => (
                          <span class="rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-mono text-ink-muted">
                            {tag}
                          </span>
                        )}
                      </For>
                    </div>
                  </Show>
                </div>
              </div>
            )
          }}
        </Show>
      </dialog>
    </div>
  )
}
