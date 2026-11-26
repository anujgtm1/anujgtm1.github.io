import { For, Show, createMemo, createSignal } from "solid-js"
import type { BookItem } from "@types"
import {
  BOOK_STATUS_META,
  SPINE_PALETTES,
  computeSpineMetrics,
  getAuthorInitials,
  partitionBookcaseLayers,
} from "@lib/bookshelf"

type Props = {
  readonly books: readonly BookItem[]
  readonly selectedSlug?: string | null
  readonly onSelectBook: (book: BookItem) => void
  readonly layout?: "top" | "side"
}

export default function BookcaseLayers(props: Props) {
  const [collapsed, setCollapsed] = createSignal(false)
  const [expanded, setExpanded] = createSignal(false)

  const layout = () => props.layout ?? "top"

  const partition = createMemo(() =>
    partitionBookcaseLayers(props.books, {
      booksPerShelf: layout() === "side" ? 5 : 8,
      maxVisibleLayers: expanded() ? Number.POSITIVE_INFINITY : 3,
    }),
  )

  return (
    <Show when={props.books.length > 0}>
      <section
        aria-labelledby="bookcase-layers-heading"
        class={
          layout() === "side"
            ? "rounded-xl border border-border bg-surface/60 p-4 space-y-4"
            : "rounded-xl border border-border bg-surface/60 p-4 sm:p-6 space-y-5"
        }
      >
        <div class="flex flex-wrap items-baseline justify-between gap-3">
          <div class="space-y-0.5">
            <p class="editorial-kicker">Archival Bookcase</p>
            <h2
              id="bookcase-layers-heading"
              class="font-serif text-xl sm:text-2xl font-medium text-ink"
            >
              Standing Spines
              <span class="ml-2 font-mono text-xs font-normal uppercase tracking-wider text-ink-muted">
                {partition().totalLayers} {partition().totalLayers === 1 ? "tier" : "tiers"} ·{" "}
                {props.books.length} {props.books.length === 1 ? "volume" : "volumes"}
              </span>
            </h2>
          </div>

          <button
            type="button"
            aria-expanded={!collapsed()}
            aria-controls="bookcase-tiers"
            onClick={() => setCollapsed((prev) => !prev)}
            class="inline-flex items-center rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-ink-muted hover:border-accent hover:text-ink transition-colors"
          >
            {collapsed() ? "Show shelf" : "Hide shelf"}
          </button>
        </div>

        <Show when={!collapsed()}>
          <div id="bookcase-tiers" class={layout() === "side" ? "space-y-6" : "space-y-8"}>
            <For each={partition().layers}>
              {(layer) => (
                <div class="space-y-0">
                  <div
                    class={
                      layout() === "side"
                        ? "flex items-end justify-start gap-2 overflow-x-auto px-2 pt-5 pb-0"
                        : "flex items-end justify-start sm:justify-center gap-2.5 sm:gap-3.5 overflow-x-auto px-3 sm:px-4 pt-6 pb-0"
                    }
                  >
                    <For each={layer.books}>
                      {(book) => {
                        const palette = SPINE_PALETTES[book.spineTheme]
                        const metrics = computeSpineMetrics(book.pages, book.title)
                        const isSelected = () => props.selectedSlug === book.slug
                        const widthPx = () =>
                          layout() === "side"
                            ? Math.max(40, Math.round(metrics.widthPx * 0.88))
                            : metrics.widthPx
                        const heightPx = () =>
                          layout() === "side"
                            ? Math.max(176, Math.round(metrics.heightPx * 0.84))
                            : metrics.heightPx

                        return (
                          <button
                            type="button"
                            id={`shelf-book-${book.slug}`}
                            aria-pressed={isSelected()}
                            onClick={() => props.onSelectBook(book)}
                            aria-label={`${book.title} by ${book.author} (${BOOK_STATUS_META[book.status].label}) — open quick notes`}
                            class={`book-spine-btn relative shrink-0 flex flex-col items-center justify-between rounded-t-md border px-2 py-3 text-center select-none cursor-pointer ${
                              isSelected()
                                ? "ring-2 ring-accent ring-offset-2 ring-offset-bg"
                                : ""
                            }`}
                            style={{
                              "background-color": palette.bg,
                              color: palette.text,
                              "border-color": palette.border,
                              "min-inline-size": `${widthPx()}px`,
                              "min-block-size": `${heightPx()}px`,
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
                                  "clip-path":
                                    "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)",
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
                                "max-block-size": `${heightPx() - 64}px`,
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

                  {/* Tactile archival shelf plank */}
                  <div
                    aria-hidden="true"
                    class="h-3.5 w-full rounded-sm border-t border-b-4 border-border shadow-sm"
                    style={{
                      background:
                        "linear-gradient(180deg, var(--surface-elevated) 0%, var(--surface) 62%, var(--border) 100%)",
                    }}
                  />

                  <div class="pt-1.5 flex items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-widest text-ink-muted px-1">
                    <span>{layer.label}</span>
                    <span>
                      {layout() === "side"
                        ? `${layer.books.length} ${layer.books.length === 1 ? "book" : "books"}`
                        : "Click any spine for quick notes"}
                    </span>
                  </div>
                </div>
              )}
            </For>
          </div>

          <Show when={partition().hiddenBookCount > 0 || (expanded() && partition().totalLayers > 3)}>
            <div class="flex justify-center pt-1">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                class="inline-flex items-center rounded-md border border-border bg-surface-elevated px-4 py-2 text-xs font-mono uppercase tracking-wider text-ink hover:border-accent hover:text-accent transition-colors"
              >
                {expanded()
                  ? "Show fewer shelves"
                  : `Show all ${partition().totalLayers} shelves (+${partition().hiddenBookCount} more)`}
              </button>
            </div>
          </Show>
        </Show>
      </section>
    </Show>
  )
}
