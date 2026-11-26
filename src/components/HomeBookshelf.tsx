import { For, Show, createSignal, onCleanup, onMount } from "solid-js"
import type { BookItem } from "@types"
import BookCoverPlate from "@components/BookCoverPlate"
import {
  BOOK_STATUS_META,
  SPINE_PALETTES,
  buildBookHref,
  computeSpineMetrics,
  formatRating,
  getAuthorInitials,
} from "@lib/bookshelf"

type Props = {
  readonly books: readonly BookItem[]
  readonly totalBooks: number
}

export default function HomeBookshelf(props: Props) {
  const [selectedBook, setSelectedBook] = createSignal<BookItem | null>(null)
  let dialogRef: HTMLDialogElement | undefined

  function openPreview(book: BookItem) {
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
  })

  return (
    <div class="rounded-xl border border-border bg-surface-elevated p-6 flex flex-col justify-between gap-6 h-full">
      <div class="flex items-baseline justify-between gap-3">
        <div class="space-y-1">
          <h3 class="font-serif text-xl font-medium text-ink">Bookshelf</h3>
          <p class="text-sm text-ink-muted">Quick marginalia &amp; favorites on the desk.</p>
        </div>
        <a
          href="/books"
          class="text-xs font-mono uppercase tracking-wider text-accent hover:underline underline-offset-4 shrink-0"
        >
          {props.totalBooks > 0 ? `All ${props.totalBooks} →` : "Visit shelf →"}
        </a>
      </div>

      <Show
        when={props.books.length > 0}
        fallback={
          <div class="rounded-lg border border-dashed border-border bg-surface/60 p-5 space-y-2">
            <p class="text-xs font-mono uppercase tracking-widest text-accent">
              Stocking the Shelf
            </p>
            <p class="font-serif text-base font-medium text-ink">
              2024–2026 reading covers &amp; quick marginalia on the way.
            </p>
            <p class="text-xs text-ink-muted leading-relaxed">
              Recent reads, favorites, and short margin notes will appear here as volumes are shelved.
            </p>
          </div>
        }
      >
        <div>
          <div class="flex items-end justify-start gap-2 overflow-x-auto pt-4 pb-0 px-2">
            <For each={props.books}>
              {(book) => {
                const palette = SPINE_PALETTES[book.spineTheme]
                const metrics = computeSpineMetrics(book.pages, book.title)
                const widthPx = Math.max(40, Math.round(metrics.widthPx * 0.82))
                const heightPx = Math.max(152, Math.round(metrics.heightPx * 0.72))

                return (
                  <button
                    type="button"
                    onClick={() => openPreview(book)}
                    aria-label={`Preview ${book.title} by ${book.author}`}
                    class="book-spine-btn relative shrink-0 flex flex-col items-center justify-between rounded-t border px-1.5 py-2.5 text-center select-none cursor-pointer"
                    style={{
                      "background-color": palette.bg,
                      color: palette.text,
                      "border-color": palette.border,
                      "min-inline-size": `${widthPx}px`,
                      "min-block-size": `${heightPx}px`,
                      "box-shadow":
                        "inset 3px 0 5px rgb(255 255 255 / 0.14), inset -3px 0 6px rgb(0 0 0 / 0.26)",
                    }}
                  >
                    <Show when={book.status === "reading"}>
                      <span
                        aria-hidden="true"
                        class="absolute -top-2.5 right-2 h-6 w-2 rounded-t-sm shadow-sm"
                        style={{
                          "background-color": "#DF7B5E",
                          "clip-path": "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)",
                        }}
                      />
                    </Show>

                    <span
                      aria-hidden="true"
                      class="w-full h-0.5 rounded-full opacity-75"
                      style={{ "background-color": palette.band }}
                    />

                    <span
                      class="my-2 font-serif text-xs font-medium tracking-tight leading-snug"
                      style={{
                        "writing-mode": "vertical-rl",
                        "text-orientation": "mixed",
                        "max-block-size": `${heightPx - 52}px`,
                        overflow: "hidden",
                        "text-overflow": "ellipsis",
                      }}
                    >
                      {book.title}
                    </span>

                    <div class="flex flex-col items-center gap-1 w-full">
                      <span
                        class="font-mono text-[9px] uppercase tracking-wider opacity-80"
                        style={{ "writing-mode": "horizontal-tb" }}
                      >
                        {getAuthorInitials(book.author)}
                      </span>
                      <span
                        aria-hidden="true"
                        class="w-full h-0.5 rounded-full opacity-70"
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
            class="h-2.5 w-full rounded-sm border-t border-b-4 border-border shadow-sm"
            style={{
              background:
                "linear-gradient(180deg, var(--surface-elevated) 0%, var(--surface) 62%, var(--border) 100%)",
            }}
          />

          <p class="pt-1.5 text-[11px] font-mono uppercase tracking-widest text-ink-muted">
            Click any spine to preview
          </p>
        </div>
      </Show>

      {/* Native <dialog> modal with closedby="any" — NO role="dialog", NO aria-modal, NO focus trap */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="home-book-dialog-title"
        onClose={handleDialogClose}
      >
        <Show when={selectedBook()}>
          {(book) => {
            const palette = SPINE_PALETTES[book().spineTheme]
            const bookHref = () => buildBookHref(book().slug)

            return (
              <div class="flex flex-col overflow-y-auto">
                <div
                  class="flex items-center justify-between gap-4 border-b border-border px-6 py-4"
                  style={{ "border-top": `6px solid ${palette.bg}` }}
                >
                  <div class="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted">
                    <span class="rounded bg-surface px-2 py-0.5 text-ink font-medium">
                      {BOOK_STATUS_META[book().status].label}
                    </span>
                    <Show when={book().rating}>
                      <span class="text-accent" aria-label={`${book().rating} out of 5 stars`}>
                        {formatRating(book().rating)}
                      </span>
                    </Show>
                    <Show when={book().yearRead}>
                      <span>· {book().yearRead}</span>
                    </Show>
                    <Show when={book().pages}>
                      <span>· {book().pages} pp.</span>
                    </Show>
                  </div>

                  <form method="dialog">
                    <button
                      type="submit"
                      autofocus
                      aria-label="Close book preview"
                      class="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-muted hover:border-accent hover:text-ink transition-colors"
                    >
                      Close
                    </button>
                  </form>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-6 p-6 items-start">
                  {/* Second click: clickable cover leading directly to full notes */}
                  <a
                    href={bookHref()}
                    class="book-cover-btn group mx-auto sm:mx-0 w-40 sm:w-full block space-y-2.5 text-center sm:text-start focus-visible:outline-2"
                  >
                    <BookCoverPlate book={book()} />
                    <span class="block text-xs font-mono text-accent group-hover:underline underline-offset-4">
                      Click book to open full notes →
                    </span>
                  </a>

                  <div class="space-y-4 min-w-0">
                    <div class="space-y-1.5">
                      <h1
                        id="home-book-dialog-title"
                        class="font-serif text-2xl sm:text-3xl font-medium text-ink"
                      >
                        <a
                          href={bookHref()}
                          class="hover:text-accent transition-colors"
                        >
                          {book().title}
                        </a>
                      </h1>
                      <p class="text-sm font-medium text-ink-muted">by {book().author}</p>
                    </div>

                    <p class="text-sm sm:text-base text-ink leading-relaxed">
                      {book().summary}
                    </p>

                    <Show when={book().quote}>
                      <blockquote class="rounded-r-lg border-l-2 border-accent bg-surface/75 px-4 py-3 font-serif text-base italic text-ink">
                        “{book().quote}”
                      </blockquote>
                    </Show>

                    <div class="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href={bookHref()}
                        class="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-medium text-bg hover:bg-accent transition-colors"
                      >
                        <span>Open on Bookshelf →</span>
                      </a>
                    </div>
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
