import { Show, createSignal } from "solid-js"
import type { BookItem } from "@types"
import { BOOK_STATUS_META, SPINE_PALETTES, resolveBookCoverUrl } from "@lib/bookshelf"

type Props = {
  readonly book: BookItem
  readonly compact?: boolean
}

export default function BookCoverPlate(props: Props) {
  const palette = () => SPINE_PALETTES[props.book.spineTheme]
  const coverUrl = () => resolveBookCoverUrl(props.book)
  const [failedSrc, setFailedSrc] = createSignal<string | null>(null)
  const activeCoverUrl = () => {
    const url = coverUrl()
    return url && failedSrc() !== url ? url : null
  }

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
            {props.book.yearRead
              ? String(props.book.yearRead)
              : BOOK_STATUS_META[props.book.status].shortLabel}
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
      <Show when={activeCoverUrl()}>
        {(src) => (
          <img
            src={src()}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setFailedSrc(src())}
            class="block absolute inset-0 h-full w-full object-cover"
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
