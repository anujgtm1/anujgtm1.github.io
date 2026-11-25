import { For, Show, createMemo, createSignal, onCleanup, onMount } from "solid-js"
import type { BookItem, BookStatus } from "@types"
import {
  BOOK_STATUS_META,
  SPINE_PALETTES,
  computeSpineMetrics,
  filterBooks,
  sortBooks,
} from "@lib/bookshelf"

type Props = {
  readonly books: readonly BookItem[]
}

type StatusFilter = BookStatus | "all"
type ViewMode = "shelf" | "catalog"

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

function getLastName(author: string): string {
  const parts = author.trim().split(/\s+/)
  return parts[parts.length - 1] ?? author
}

export default function Bookshelf(props: Props) {
  const [statusFilter, setStatusFilter] = createSignal<StatusFilter>("all")
  const [query, setQuery] = createSignal("")
  const [viewMode, setViewMode] = createSignal<ViewMode>("shelf")
  const [selectedBook, setSelectedBook] = createSignal<BookItem | null>(null)

  let dialogRef: HTMLDialogElement | undefined

  const sortedBooks = createMemo(() => sortBooks(props.books))
  const visibleBooks = createMemo(() =>
    filterBooks(sortedBooks(), statusFilter(), query()),
  )

  const counts = createMemo(() => {
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
      {/* Controls bar */}
      <div class="flex flex-col gap-4 rounded-xl border border-border bg-surface/75 p-4 sm:p-5">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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
                    <span class="opacity-75">({counts()[option.value]})</span>
                  </button>
                )
              }}
            </For>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <label class="relative flex-1 sm:w-64 sm:flex-none">
              <span class="sr-only">Search books by title, author, or tag</span>
              <input
                type="search"
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
                placeholder="Filter by title, author, tag..."
                class="w-full rounded-md border border-border bg-surface-elevated px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent"
              />
            </label>

            <div
              class="inline-flex rounded-md border border-border bg-surface-elevated p-0.5"
              role="group"
              aria-label="Bookshelf view mode"
            >
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
      </div>

      <Show
        when={visibleBooks().length > 0}
        fallback={
          <div class="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-12 text-center">
            <p class="font-serif text-xl text-ink">No books match that filter.</p>
            <p class="mt-1 text-sm text-ink-muted">
              Try clearing the search query or switching back to all volumes.
            </p>
          </div>
        }
      >
        <Show
          when={viewMode() === "shelf"}
          fallback={
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
          }
        >
          {/* Shelf view: standing archival book spines on tactile wood/brass ledges */}
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
                            aria-label={`${book.title} by ${book.author} (${BOOK_STATUS_META[book.status].label}) — open reading notes`}
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
                            {/* Bookmark ribbon for currently reading */}
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

                            {/* Top archival foil band */}
                            <span
                              aria-hidden="true"
                              class="w-full h-1 rounded-full opacity-75"
                              style={{ "background-color": palette.band }}
                            />

                            {/* Spine title */}
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

                            {/* Bottom foil band + author surname */}
                            <div class="flex flex-col items-center gap-1.5 w-full">
                              <span
                                class="font-mono text-[10px] uppercase tracking-wider opacity-85 max-w-full truncate"
                                style={{ "writing-mode": "horizontal-tb" }}
                              >
                                {getLastName(book.author).slice(0, 6)}
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

                  {/* Archival shelf ledge */}
                  <div
                    aria-hidden="true"
                    class="h-3.5 w-full rounded-sm border-t border-b-4 border-border bg-surface shadow-sm"
                  />
                  <div class="pt-1.5 flex justify-between text-[11px] font-mono uppercase tracking-widest text-ink-muted px-1">
                    <span>Shelf 0{rowIndex() + 1}</span>
                    <span>Click any spine for marginalia</span>
                  </div>
                </div>
              )}
            </For>
          </div>
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
                {/* Decorative cover header strip */}
                <div
                  class="flex items-start justify-between gap-4 border-b border-border p-6"
                  style={{
                    "border-top": `6px solid ${palette.bg}`,
                  }}
                >
                  <div class="space-y-2">
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
                        Marginalia &amp; Notes
                      </h2>
                      <div
                        class="prose dark:prose-invert prose-sm max-w-none text-ink"
                        innerHTML={book().notesHtml}
                      />
                    </div>
                  </Show>

                  <div class="flex flex-wrap gap-1.5 border-t border-border pt-4">
                    <For each={book().tags}>
                      {(tag) => (
                        <span class="rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-mono text-ink-muted">
                          {tag}
                        </span>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            )
          }}
        </Show>
      </dialog>
    </div>
  )
}
