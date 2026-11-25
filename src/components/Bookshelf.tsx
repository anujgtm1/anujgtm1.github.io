import { For, Show, createMemo, createSignal, onCleanup, onMount } from "solid-js"
import type { BookItem, BookStatus } from "@types"
import {
  BOOK_STATUS_META,
  SPINE_PALETTES,
  computeSpineMetrics,
  filterBooks,
  getAvailableYears,
  groupBooksByYear,
  resolveBookCoverUrl,
  sortBooks,
} from "@lib/bookshelf"

type Props = {
  readonly books: readonly BookItem[]
}

type StatusFilter = BookStatus | "all"
type YearFilter = number | "all"
type ViewMode = "covers" | "shelf" | "catalog"

const FILTER_OPTIONS: readonly { readonly value: StatusFilter; readonly label: string }[] = [
  { value: "all", label: "All" },
  { value: "reading", label: "Reading" },
  { value: "favorite", label: "Favorites" },
  { value: "finished", label: "Finished" },
]

function formatRating(rating: number | undefined): string {
  if (!rating || rating < 1) {
    return ""
  }
  const clamped = Math.min(5, Math.max(1, Math.round(rating)))
  return "★".repeat(clamped) + "☆".repeat(5 - clamped)
}

function getAuthorInitials(author: string): string {
  const parts = author.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ""
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase()
  const first = parts[0][0] ?? ""
  const last = parts[parts.length - 1][0] ?? ""
  return `${first}.${last}.`.toUpperCase()
}

function BookCoverPlate(props: { readonly book: BookItem; readonly compact?: boolean }) {
  const palette = () => SPINE_PALETTES[props.book.spineTheme]
  const coverUrl = () => resolveBookCoverUrl(props.book)
  const [imgFailed, setImgFailed] = createSignal(false)

  return (
    <div
      class="relative aspect-[2/3] w-full overflow-hidden rounded-r-md rounded-l-[3px] border shadow-sm"
      style={{
        "background-color": palette().bg,
        color: palette().text,
        "border-color": palette().border,
        "box-shadow":
          "inset 8px 0 12px rgb(0 0 0 / 0.28), inset 2px 0 0 rgb(255 255 255 / 0.14)",
      }}
    >
      {/* Bespoke archival typographic book-cloth cover plate (always rendered beneath img) */}
      <div class="absolute inset-0 flex flex-col justify-between p-3.5 sm:p-4 text-start">
        <div
          class="h-full w-full rounded-sm border p-2.5 sm:p-3 flex flex-col justify-between"
          style={{ "border-color": `${palette().band}88` }}
        >
          <span
            class="font-mono text-[9px] uppercase tracking-widest opacity-80"
            style={{ color: palette().band }}
          >
            {props.book.yearRead ? String(props.book.yearRead) : BOOK_STATUS_META[props.book.status].shortLabel}
          </span>
          <div class="space-y-1.5 my-auto py-1">
            <p
              class={`font-serif font-medium leading-snug ${
                props.compact ? "text-xs" : "text-sm sm:text-base"
              }`}
            >
              {props.book.title}
            </p>
            <div
              class="h-px w-8 opacity-75"
              style={{ "background-color": palette().band }}
              aria-hidden="true"
            />
            <p class="font-sans text-[11px] opacity-85">{props.book.author}</p>
          </div>
          <span class="font-mono text-[9px] uppercase tracking-wider opacity-65">
            {props.book.tags[0] ?? "Archive"}
          </span>
        </div>
      </div>

      {/* Real book cover image layered cleanly on top; hides gracefully if missing/offline */}
      <Show when={!imgFailed() ? coverUrl() : null}>
        {(src) => (
          <img
            src={src()}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            class="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </Show>

      {/* Subtle tactile spine crease overlay */}
      <span
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 left-0 w-3"
        style={{
          background:
            "linear-gradient(90deg, rgb(0 0 0 / 0.34) 0%, rgb(255 255 255 / 0.14) 38%, rgb(0 0 0 / 0.14) 68%, transparent 100%)",
        }}
      />

      {/* Bookmark ribbon for currently reading */}
      <Show when={props.book.status === "reading"}>
        <span
          aria-hidden="true"
          class="pointer-events-none absolute top-0 right-3 h-7 w-2.5 shadow-sm"
          style={{
            "background-color": "#DF7B5E",
            "clip-path": "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)",
          }}
        />
      </Show>
    </div>
  )
}

export default function Bookshelf(props: Props) {
  const [statusFilter, setStatusFilter] = createSignal<StatusFilter>("all")
  const [yearFilter, setYearFilter] = createSignal<YearFilter>("all")
  const [query, setQuery] = createSignal("")
  const [viewMode, setViewMode] = createSignal<ViewMode>("covers")
  const [selectedBook, setSelectedBook] = createSignal<BookItem | null>(null)

  let dialogRef: HTMLDialogElement | undefined

  const sortedBooks = createMemo(() => sortBooks(props.books))
  const availableYears = createMemo(() => getAvailableYears(props.books))
  const visibleBooks = createMemo(() =>
    filterBooks(sortedBooks(), statusFilter(), query(), yearFilter()),
  )
  const yearGroups = createMemo(() => groupBooksByYear(visibleBooks()))

  const statusCounts = createMemo(() => {
    const map: Record<StatusFilter, number> = {
      all: props.books.length,
      reading: 0,
      favorite: 0,
      finished: 0,
      queued: 0,
    }
    for (const book of props.books) {
      map[book.status] += 1
    }
    return map
  })

  const yearCounts = createMemo(() => {
    const map = new Map<number, number>()
    for (const book of props.books) {
      if (book.yearRead !== null) {
        map.set(book.yearRead, (map.get(book.yearRead) ?? 0) + 1)
      }
    }
    return map
  })

  function openBookModal(book: BookItem) {
    setSelectedBook(book)
    if (dialogRef && !dialogRef.open) {
      dialogRef.showModal()
    }
  }

  function handleDialogClose() {
    if (dialogRef) {
      dialogRef.returnValue = ""
    }
    setSelectedBook(null)
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
    if (hash.startsWith("#book-")) {
      const targetSlug = hash.slice("#book-".length)
      const matched = props.books.find((book) => book.slug === targetSlug)
      if (matched) {
        openBookModal(matched)
      }
    }
  })

  const shelfRows = createMemo(() => {
    const list = visibleBooks()
    const rows: BookItem[][] = []
    const chunkSize = 5
    for (let i = 0; i < list.length; i += chunkSize) {
      rows.push(list.slice(i, i + chunkSize))
    }
    return rows
  })

  return (
    <div class="space-y-8">
      <Show
        when={props.books.length > 0}
        fallback={
          <div class="rounded-xl border border-dashed border-border bg-surface/55 px-6 py-12 sm:px-10 sm:py-14 text-center space-y-3">
            <p class="editorial-kicker text-accent">Stocking the Shelf</p>
            <h2 class="font-serif text-2xl sm:text-3xl font-medium text-ink">
              Reading covers and quick notes from the margins are on the way.
            </h2>
            <p class="mx-auto max-w-xl text-sm sm:text-base text-ink-muted leading-relaxed">
              Recent reads from 2024–2026 are being gathered with covers, favorites, and short marginalia. Check back soon as the shelf fills in.
            </p>
          </div>
        }
      >
        {/* Controls bar */}
        <div class="flex flex-col gap-4 rounded-xl border border-border bg-surface/75 p-4 sm:p-5">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Status Filter Pills */}
          <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Filter books by status">
            <For each={FILTER_OPTIONS}>
              {(option) => {
                const isActive = () => statusFilter() === option.value
                return (
                  <button
                    type="button"
                    aria-pressed={isActive()}
                    onClick={() => setStatusFilter(option.value)}
                    class={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                      isActive()
                        ? "border-accent bg-accent text-bg font-semibold"
                        : "border-border bg-surface-elevated text-ink-muted hover:border-accent hover:text-ink"
                    }`}
                  >
                    <span>{option.label}</span>
                    <span class="opacity-75">({statusCounts()[option.value]})</span>
                  </button>
                )
              }}
            </For>
          </div>

          {/* Search + 3-way View Mode Toggle */}
          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <label class="relative w-full sm:w-56">
              <span class="sr-only">Search books by title, author, or tag</span>
              <input
                type="search"
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
                placeholder="Filter title, author, tag..."
                class="w-full rounded-md border border-border bg-surface-elevated px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent"
              />
            </label>

            <div
              class="inline-flex w-fit rounded-md border border-border bg-surface-elevated p-0.5"
              role="group"
              aria-label="Bookshelf view mode"
            >
              <button
                type="button"
                aria-pressed={viewMode() === "covers"}
                onClick={() => setViewMode("covers")}
                class={`rounded px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  viewMode() === "covers"
                    ? "bg-ink text-bg font-medium"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Covers
              </button>
              <button
                type="button"
                aria-pressed={viewMode() === "shelf"}
                onClick={() => setViewMode("shelf")}
                class={`rounded px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  viewMode() === "shelf"
                    ? "bg-ink text-bg font-medium"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Shelf
              </button>
              <button
                type="button"
                aria-pressed={viewMode() === "catalog"}
                onClick={() => setViewMode("catalog")}
                class={`rounded px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  viewMode() === "catalog"
                    ? "bg-ink text-bg font-medium"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Catalog
              </button>
            </div>
          </div>
        </div>

        {/* Year Filter Pills */}
        <Show when={availableYears().length > 0}>
          <div
            class="flex flex-wrap items-center gap-2 border-t border-border pt-3.5"
            role="group"
            aria-label="Filter books by year read"
          >
            <span class="text-xs font-mono uppercase tracking-widest text-ink-muted mr-1">
              Year Read:
            </span>
            <button
              type="button"
              aria-pressed={yearFilter() === "all"}
              onClick={() => setYearFilter("all")}
              class={`rounded-full border px-3 py-1 text-xs font-mono transition-colors ${
                yearFilter() === "all"
                  ? "border-atlas bg-atlas text-bg font-semibold"
                  : "border-border bg-surface-elevated text-ink-muted hover:border-atlas hover:text-ink"
              }`}
            >
              All Years
            </button>
            <For each={availableYears()}>
              {(year) => {
                const active = () => yearFilter() === year
                return (
                  <button
                    type="button"
                    aria-pressed={active()}
                    onClick={() => setYearFilter(year)}
                    class={`rounded-full border px-3 py-1 text-xs font-mono transition-colors ${
                      active()
                        ? "border-atlas bg-atlas text-bg font-semibold"
                        : "border-border bg-surface-elevated text-ink-muted hover:border-atlas hover:text-ink"
                    }`}
                  >
                    {year} <span class="opacity-75">({yearCounts().get(year) ?? 0})</span>
                  </button>
                )
              }}
            </For>
          </div>
        </Show>
      </div>

      <Show
        when={visibleBooks().length > 0}
        fallback={
          <div class="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-12 text-center">
            <p class="font-serif text-xl text-ink">No books match that filter.</p>
            <p class="mt-1 text-sm text-ink-muted">
              Try clearing the search query or switching back to all years and statuses.
            </p>
          </div>
        }
      >
        {/* COVERS VIEW (Default): Year-by-year visual book cover wall */}
        <Show when={viewMode() === "covers"}>
          <div class="space-y-12">
            <For each={yearGroups()}>
              {(group) => (
                <section class="space-y-5" aria-labelledby={`year-group-${group.key}`}>
                  <div class="flex items-baseline justify-between gap-3 border-b border-border pb-3">
                    <h2
                      id={`year-group-${group.key}`}
                      class="font-serif text-2xl sm:text-3xl font-medium text-ink"
                    >
                      {group.label}
                    </h2>
                    <span class="font-mono text-xs uppercase tracking-widest text-ink-muted">
                      {group.books.length} {group.books.length === 1 ? "book" : "books"}
                    </span>
                  </div>

                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
                    <For each={group.books}>
                      {(book) => (
                        <button
                          type="button"
                          id={`book-${book.slug}`}
                          onClick={() => openBookModal(book)}
                          aria-label={`${book.title} by ${book.author} — read quick notes`}
                          class="book-cover-btn group flex flex-col text-start gap-2.5 focus-visible:outline-2"
                        >
                          <BookCoverPlate book={book} />
                          <div class="space-y-0.5 px-0.5">
                            <p class="font-serif text-sm sm:text-base font-medium text-ink group-hover:text-accent transition-colors leading-snug line-clamp-2">
                              {book.title}
                            </p>
                            <p class="text-xs text-ink-muted truncate">{book.author}</p>
                            <Show when={book.dateRead || book.status === "favorite"}>
                              <p class="font-mono text-[11px] text-ink-muted/90 flex items-center gap-1.5">
                                <Show when={book.dateRead}>
                                  <span>{book.dateRead}</span>
                                </Show>
                                <Show when={book.status === "favorite"}>
                                  <span class="text-accent">★ Favorite</span>
                                </Show>
                              </p>
                            </Show>
                          </div>
                        </button>
                      )}
                    </For>
                  </div>
                </section>
              )}
            </For>
          </div>
        </Show>

        {/* SHELF VIEW: Standing archival book spines on tactile wood/brass ledges */}
        <Show when={viewMode() === "shelf"}>
          <div class="space-y-10">
            <For each={shelfRows()}>
              {(row, rowIndex) => (
                <div class="space-y-0">
                  <div class="flex items-end justify-start sm:justify-center gap-2.5 sm:gap-3.5 overflow-x-auto px-4 pt-8 pb-0">
                    <For each={row}>
                      {(book) => {
                        const palette = SPINE_PALETTES[book.spineTheme]
                        const metrics = computeSpineMetrics(book.pages, book.title)
                        return (
                          <button
                            type="button"
                            id={`book-${book.slug}`}
                            onClick={() => openBookModal(book)}
                            aria-label={`${book.title} by ${book.author} (${BOOK_STATUS_META[book.status].label}) — open quick notes`}
                            class="book-spine-btn relative shrink-0 flex flex-col items-center justify-between rounded-t-md border px-2 py-3 text-center select-none cursor-pointer"
                            style={{
                              "background-color": palette.bg,
                              color: palette.text,
                              "border-color": palette.border,
                              "min-inline-size": `${metrics.widthPx}px`,
                              "min-block-size": `${metrics.heightPx}px`,
                              "box-shadow":
                                "inset 4px 0 6px rgb(255 255 255 / 0.14), inset -4px 0 8px rgb(0 0 0 / 0.28)",
                            }}
                          >
                            <Show when={book.status === "reading"}>
                              <span
                                aria-hidden="true"
                                class="absolute -top-3 right-2.5 h-7 w-2.5 rounded-t-sm shadow-sm"
                                style={{
                                  "background-color": "#DF7B5E",
                                  "clip-path": "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)",
                                }}
                              />
                            </Show>

                            <span
                              aria-hidden="true"
                              class="w-full h-1 rounded-full opacity-75"
                              style={{ "background-color": palette.band }}
                            />

                            <span
                              class="my-2 font-serif text-sm font-medium tracking-tight leading-snug"
                              style={{
                                "writing-mode": "vertical-rl",
                                "text-orientation": "mixed",
                                "max-block-size": `${metrics.heightPx - 64}px`,
                                overflow: "hidden",
                                "text-overflow": "ellipsis",
                              }}
                            >
                              {book.title}
                            </span>

                            <div class="flex flex-col items-center gap-1.5 w-full">
                              <span
                                class="font-mono text-[10px] uppercase tracking-wider opacity-85"
                                style={{ "writing-mode": "horizontal-tb" }}
                              >
                                {getAuthorInitials(book.author)}
                              </span>
                              <span
                                aria-hidden="true"
                                class="w-full h-0.5 rounded-full opacity-65"
                                style={{ "background-color": palette.band }}
                              />
                            </div>
                          </button>
                        )
                      }}
                    </For>
                  </div>

                  <div
                    aria-hidden="true"
                    class="h-3.5 w-full rounded-sm border-t border-b-4 border-border bg-surface shadow-sm"
                  />
                  <div class="pt-1.5 flex justify-between text-[11px] font-mono uppercase tracking-widest text-ink-muted px-1">
                    <span>Shelf 0{rowIndex() + 1}</span>
                    <span>Click any spine for quick notes</span>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>

        {/* CATALOG VIEW: Library index */}
        <Show when={viewMode() === "catalog"}>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <For each={visibleBooks()}>
              {(book) => {
                const palette = SPINE_PALETTES[book.spineTheme]
                return (
                  <button
                    type="button"
                    id={`book-${book.slug}`}
                    onClick={() => openBookModal(book)}
                    class="editorial-card group flex text-start gap-4 rounded-xl border border-border bg-surface-elevated p-5 hover:border-accent"
                  >
                    <div
                      class="w-3 shrink-0 self-stretch rounded-sm"
                      style={{ "background-color": palette.bg }}
                      aria-hidden="true"
                    />
                    <div class="min-w-0 flex-1 space-y-2">
                      <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted">
                        <span
                          class={
                            book.status === "reading"
                              ? "rounded bg-accent-soft px-2 py-0.5 text-accent font-medium"
                              : book.status === "favorite"
                                ? "rounded bg-atlas-soft px-2 py-0.5 text-atlas font-medium"
                                : ""
                          }
                        >
                          {BOOK_STATUS_META[book.status].shortLabel}
                          {book.yearRead ? ` · ${book.yearRead}` : ""}
                        </span>
                        <Show when={book.rating}>
                          <span class="text-accent" aria-label={`${book.rating} out of 5 stars`}>
                            {formatRating(book.rating)}
                          </span>
                        </Show>
                      </div>
                      <h2 class="font-serif text-xl font-medium text-ink group-hover:text-accent transition-colors">
                        {book.title}
                      </h2>
                      <p class="text-sm font-medium text-ink-muted">{book.author}</p>
                      <p class="text-sm text-ink-muted leading-relaxed">{book.summary}</p>
                      <div class="flex flex-wrap items-center gap-1.5 pt-1">
                        <For each={book.tags}>
                          {(tag) => (
                            <span class="rounded border border-border bg-surface px-2 py-0.5 text-xs font-mono text-ink-muted">
                              {tag}
                            </span>
                          )}
                        </For>
                      </div>
                    </div>
                  </button>
                )
              }}
            </For>
          </div>
        </Show>
      </Show>
      </Show>

      {/* Native <dialog> modal with closedby="any" — NO role="dialog", NO aria-modal, NO focus trap */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="book-dialog-title"
        onClose={handleDialogClose}
      >
        <Show when={selectedBook()}>
          {(book) => {
            const palette = SPINE_PALETTES[book().spineTheme]
            return (
              <div class="flex flex-col overflow-y-auto">
                {/* Header strip with cover thumbnail */}
                <div
                  class="flex items-start justify-between gap-4 border-b border-border p-6"
                  style={{ "border-top": `6px solid ${palette.bg}` }}
                >
                  <div class="flex items-start gap-4 min-w-0">
                    <div class="hidden sm:block w-20 shrink-0">
                      <BookCoverPlate book={book()} compact={true} />
                    </div>
                    <div class="space-y-2 min-w-0">
                      <div class="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted">
                        <span class="rounded bg-surface px-2 py-0.5 text-ink font-medium">
                          {BOOK_STATUS_META[book().status].label}
                        </span>
                        <Show when={book().rating}>
                          <span class="text-accent" aria-label={`${book().rating} out of 5 stars`}>
                            {formatRating(book().rating)}
                          </span>
                        </Show>
                        <Show when={book().pages}>
                          <span>· {book().pages} pp.</span>
                        </Show>
                        <Show when={book().dateRead}>
                          <span>· Read {book().dateRead}</span>
                        </Show>
                      </div>

                      <h1 id="book-dialog-title" class="font-serif text-2xl sm:text-3xl font-medium text-ink">
                        {book().title}
                      </h1>
                      <p class="text-sm font-medium text-ink-muted">by {book().author}</p>
                    </div>
                  </div>

                  <form method="dialog">
                    <button
                      type="submit"
                      autofocus
                      aria-label="Close book notes"
                      class="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-muted hover:border-accent hover:text-ink transition-colors"
                    >
                      Close
                    </button>
                  </form>
                </div>

                {/* Body */}
                <div class="space-y-5 p-6">
                  <p class="text-base text-ink leading-relaxed">{book().summary}</p>

                  <Show when={book().quote}>
                    <blockquote class="rounded-r-lg border-l-2 border-accent bg-surface/75 px-4 py-3 font-serif text-lg italic text-ink">
                      “{book().quote}”
                    </blockquote>
                  </Show>

                  <Show when={book().notesHtml.length > 0}>
                    <div class="space-y-2">
                      <h2 class="text-xs font-mono uppercase tracking-widest text-ink-muted">
                        Marginalia &amp; Quick Notes
                      </h2>
                      <div
                        class="prose dark:prose-invert prose-sm max-w-none text-ink"
                        innerHTML={book().notesHtml}
                      />
                    </div>
                  </Show>

                  <Show when={book().tags.length > 0}>
                    <div class="flex flex-wrap gap-1.5 border-t border-border pt-4">
                      <For each={book().tags}>
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
