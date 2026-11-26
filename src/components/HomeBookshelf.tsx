import { For, Show, createSignal, onCleanup, onMount } from "solid-js"
import type { BookItem } from "@types"
import BookCoverPlate from "@components/BookCoverPlate"
import {
  BOOK_STATUS_META,
  SPINE_PALETTES,
  buildBookHref,
  formatRating,
  formatSpineTitle,
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
    <div
      class="mt-8 pt-8 border-t border-border flex flex-col gap-4"
      aria-labelledby="hero-bookshelf-heading"
    >
      <div class="flex items-baseline justify-between gap-4">
        <h2 id="hero-bookshelf-heading" class="editorial-kicker text-accent">
          BOOKSHELF
        </h2>
        <a
          href="/books"
          class="whitespace-nowrap shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent transition-colors"
        >
          {props.totalBooks > 0 ? `All ${props.totalBooks} books →` : "All books →"}
        </a>
      </div>

      <Show
        when={props.books.length > 0}
        fallback={
          <a href="/books" class="group block space-y-4 focus-visible:outline-2">
            <div class="border border-border bg-surface/55 px-4 pt-5 pb-3 group-hover:border-accent/60 transition-colors">
              <svg
                viewBox="0 0 560 112"
                class="block w-full h-auto select-none"
                role="img"
                aria-label="Minimalist archival bookshelf with brass bookends awaiting volumes"
              >
                <g stroke="var(--border)" stroke-width="0.75" opacity="0.65">
                  <line x1="112" y1="24" x2="112" y2="84" stroke-dasharray="3 4" />
                  <line x1="224" y1="24" x2="224" y2="84" stroke-dasharray="3 4" />
                  <line x1="336" y1="24" x2="336" y2="84" stroke-dasharray="3 4" />
                  <line x1="448" y1="24" x2="448" y2="84" stroke-dasharray="3 4" />
                </g>

                <path
                  d="M 28 24 L 36 24 L 36 86 L 74 86 L 74 90 L 28 90 Z"
                  fill="var(--accent)"
                  opacity="0.78"
                />
                <rect
                  x="42"
                  y="32"
                  width="18"
                  height="54"
                  fill="none"
                  stroke="var(--border)"
                  stroke-width="1"
                  stroke-dasharray="3 2"
                />

                <path
                  d="M 532 24 L 524 24 L 524 86 L 486 86 L 486 90 L 532 90 Z"
                  fill="var(--accent)"
                  opacity="0.78"
                />
                <rect
                  x="500"
                  y="38"
                  width="18"
                  height="48"
                  fill="none"
                  stroke="var(--border)"
                  stroke-width="1"
                  stroke-dasharray="3 2"
                />

                <text
                  x="280"
                  y="59"
                  text-anchor="middle"
                  fill="var(--ink-muted)"
                  font-family="JetBrains Mono, monospace"
                  font-size="10.5"
                  letter-spacing="1.8"
                >
                  SHELF 01 · READY FOR VOLUMES
                </text>

                <rect
                  x="12"
                  y="90"
                  width="536"
                  height="9"
                  fill="var(--surface-elevated)"
                  stroke="var(--border)"
                  stroke-width="1"
                />
                <line
                  x1="12"
                  y1="90"
                  x2="548"
                  y2="90"
                  stroke="var(--accent)"
                  stroke-width="1.2"
                  opacity="0.5"
                />
                <rect
                  x="26"
                  y="99"
                  width="508"
                  height="4"
                  fill="var(--border)"
                  opacity="0.7"
                />
              </svg>
            </div>

            <div class="flex flex-wrap items-baseline justify-between gap-2 text-xs text-ink-muted">
              <span class="font-mono text-[10px] uppercase tracking-[0.12em] text-ink group-hover:text-accent transition-colors">
                Stocking the Shelf
              </span>
              <span class="text-xs text-ink-muted">
                Reading covers &amp; quick marginalia coming soon.
              </span>
            </div>
          </a>
        }
      >
        <div class="space-y-0">
          <div class="flex items-end justify-start sm:justify-between gap-2 overflow-x-auto pt-3 pb-0 px-1">
            <For each={props.books}>
              {(book) => {
                const palette = SPINE_PALETTES[book.spineTheme]
                return (
                  <button
                    type="button"
                    title={book.title}
                    onClick={() => openPreview(book)}
                    aria-label={`Preview ${book.title} by ${book.author}`}
                    class="book-spine-btn relative shrink-0 flex-1 max-w-[60px] min-w-[42px] flex flex-col items-center justify-between rounded-none border px-1.5 py-3 shadow-sm cursor-pointer select-none"
                    style={{
                      "background-color": palette.bg,
                      color: palette.text,
                      "border-color": palette.border,
                      "block-size": "188px",
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
                      class="w-full h-0.5 shrink-0 opacity-80"
                      style={{ "background-color": palette.band }}
                    />

                    <span
                      class="my-1.5 font-serif text-xs font-medium tracking-tight leading-none"
                      style={{
                        "writing-mode": "vertical-rl",
                        "text-orientation": "mixed",
                        "white-space": "nowrap",
                        overflow: "hidden",
                        "text-overflow": "ellipsis",
                        "max-block-size": "116px",
                      }}
                    >
                      {formatSpineTitle(book.title, 188)}
                    </span>

                    <div class="flex flex-col items-center gap-1 w-full shrink-0">
                      <span
                        class="font-mono text-[8.5px] uppercase tracking-wider opacity-80"
                        style={{ "writing-mode": "horizontal-tb" }}
                      >
                        {getAuthorInitials(book.author)}
                      </span>
                      <span
                        aria-hidden="true"
                        class="w-full h-0.5 opacity-70"
                        style={{ "background-color": palette.band }}
                      />
                    </div>
                  </button>
                )
              }}
            </For>
          </div>

          <div aria-hidden="true" class="space-y-0">
            <div class="h-2.5 w-full border-t border-accent/45 border-x border-border bg-surface-elevated shadow-[0_8px_16px_-10px_rgba(19,18,16,0.45)]" />
            <div class="h-1 w-[97%] mx-auto bg-border/80" />
          </div>
        </div>

        <div class="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
          <span>{`${props.totalBooks} VOLUMES SHELVED · QUICK MARGINALIA`}</span>
          <span>CLICK ANY SPINE TO PREVIEW</span>
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
                        <a href={bookHref()} class="hover:text-accent transition-colors">
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
