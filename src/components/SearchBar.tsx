import type { JSX } from "solid-js"

type Props = {
  readonly onSearchInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>
  readonly query: () => string
  readonly setQuery: (value: string) => void
  readonly placeholderText: string
}

export default function SearchBar(props: Props) {
  return (
    <div class="relative">
      <svg
        class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 stroke-ink-muted"
        aria-hidden="true"
      >
        <use href="/ui.svg#search" />
      </svg>

      <input
        name="search"
        type="search"
        value={props.query()}
        onInput={props.onSearchInput}
        autocomplete="off"
        spellcheck={false}
        placeholder={props.placeholderText}
        aria-label={props.placeholderText}
        class="w-full rounded-lg border border-border bg-surface-elevated py-2.5 pl-10 pr-10 text-sm text-ink placeholder:text-ink-muted focus:border-accent"
      />

      {props.query().length > 0 && (
        <button
          type="button"
          onClick={() => props.setQuery("")}
          aria-label="Clear search"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex size-7 items-center justify-center rounded-md text-ink-muted hover:text-ink transition-colors"
        >
          <svg class="size-4 stroke-current" aria-hidden="true">
            <use href="/ui.svg#x" />
          </svg>
        </button>
      )}
    </div>
  )
}
