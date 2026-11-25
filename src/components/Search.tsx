import { For, Show, createMemo, createSignal } from "solid-js"
import Fuse from "fuse.js"
import type { SearchItem } from "@types"
import { SEARCH_KIND_META, filterSearchItemsByKind } from "@lib/search"
import SearchBar from "@components/SearchBar"

type Props = {
  readonly items: readonly SearchItem[]
}

type KindFilter = SearchItem["kind"] | "all"

const KIND_FILTERS: readonly { readonly value: KindFilter; readonly label: string }[] = [
  { value: "all", label: "All" },
  { value: "blog", label: SEARCH_KIND_META.blog.plural },
  { value: "project", label: SEARCH_KIND_META.project.plural },
  { value: "book", label: SEARCH_KIND_META.book.plural },
  { value: "travel", label: SEARCH_KIND_META.travel.plural },
]

export default function Search(props: Props) {
  const [query, setQuery] = createSignal("")
  const [kindFilter, setKindFilter] = createSignal<KindFilter>("all")

  const scopedItems = createMemo(() => filterSearchItemsByKind(props.items, kindFilter()))

  const fuse = createMemo(
    () =>
      new Fuse([...scopedItems()], {
        keys: ["title", "subtitle", "summary", "tags"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.35,
      }),
  )

  const results = createMemo<readonly SearchItem[]>(() => {
    const q = query().trim()
    if (q.length < 2) {
      return scopedItems()
    }
    return fuse()
      .search(q)
      .map((match) => match.item)
  })

  const counts = createMemo(() => {
    const map: Record<KindFilter, number> = {
      all: props.items.length,
      blog: 0,
      project: 0,
      book: 0,
      travel: 0,
    }
    for (const item of props.items) {
      map[item.kind] += 1
    }
    return map
  })

  return (
    <div class="space-y-6">
      <div class="space-y-4 rounded-xl border border-border bg-surface/75 p-5">
        <SearchBar
          onSearchInput={(e) => setQuery(e.currentTarget.value)}
          query={query}
          setQuery={setQuery}
          placeholderText="Search essays, projects, books, and passport stamps..."
        />

        <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Filter results by category">
          <For each={KIND_FILTERS}>
            {(option) => {
              const active = () => kindFilter() === option.value
              return (
                <button
                  type="button"
                  aria-pressed={active()}
                  onClick={() => setKindFilter(option.value)}
                  class={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                    active()
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
      </div>

      <div class="text-xs font-mono uppercase tracking-wider text-ink-muted">
        <Show
          when={query().trim().length >= 2}
          fallback={<span>Browsing {results().length} entries across the journal</span>}
        >
          <span>
            Found {results().length} {results().length === 1 ? "result" : "results"} for “{query().trim()}”
          </span>
        </Show>
      </div>

      <Show
        when={results().length > 0}
        fallback={
          <div class="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-12 text-center">
            <p class="font-serif text-xl text-ink">No matching entries found.</p>
            <p class="mt-1 text-sm text-ink-muted">
              Try searching for a book author, city, technology, or switching categories.
            </p>
          </div>
        }
      >
        <ul class="space-y-3">
          <For each={results()}>
            {(item) => (
              <li>
                <a
                  href={item.href}
                  class="editorial-card group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-elevated p-5 hover:border-accent"
                >
                  <div class="min-w-0 flex-1 space-y-1.5">
                    <div class="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted">
                      <span
                        class={
                          item.kind === "book"
                            ? "rounded bg-accent-soft px-2 py-0.5 text-accent font-medium"
                            : item.kind === "travel"
                              ? "rounded bg-atlas-soft px-2 py-0.5 text-atlas font-medium"
                              : "rounded border border-border bg-surface px-2 py-0.5 text-ink font-medium"
                        }
                      >
                        {SEARCH_KIND_META[item.kind].label}
                      </span>
                      <span>{item.subtitle}</span>
                      <Show when={item.date}>
                        <span>· {item.date}</span>
                      </Show>
                    </div>

                    <h2 class="font-serif text-xl font-medium text-ink group-hover:text-accent transition-colors">
                      {item.title}
                    </h2>

                    <p class="text-sm text-ink-muted leading-relaxed">{item.summary}</p>
                  </div>

                  <span
                    aria-hidden="true"
                    class="shrink-0 font-mono text-lg text-ink-muted group-hover:text-accent transition-colors"
                  >
                    →
                  </span>
                </a>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  )
}
