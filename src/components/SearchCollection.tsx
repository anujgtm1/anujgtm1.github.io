import type { CollectionEntry } from "astro:content"
import { For, Show, createMemo, createSignal } from "solid-js"
import Fuse from "fuse.js"
import ArrowCard from "@components/ArrowCard"
import SearchBar from "@components/SearchBar"

type CollectionItem = CollectionEntry<"blog"> | CollectionEntry<"projects">

type Props = {
  readonly entry_name: string
  readonly tags: readonly string[]
  readonly data: readonly CollectionItem[]
}

export default function SearchCollection(props: Props) {
  const [query, setQuery] = createSignal("")
  const [selectedTags, setSelectedTags] = createSignal<readonly string[]>([])
  const [descending, setDescending] = createSignal(true)

  const fuse = createMemo(
    () =>
      new Fuse([...props.data], {
        keys: ["slug", "data.title", "data.summary", "data.tags"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.35,
      }),
  )

  const filteredItems = createMemo(() => {
    const q = query().trim()
    const base = q.length >= 2 ? fuse().search(q).map((result) => result.item) : [...props.data]

    const activeTags = selectedTags()
    const matching =
      activeTags.length === 0
        ? base
        : base.filter((entry) =>
            activeTags.every((tag) =>
              entry.data.tags.some((entryTag) => entryTag.toLowerCase() === tag.toLowerCase()),
            ),
          )

    return descending() ? matching : [...matching].reverse()
  })

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    )
  }

  return (
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Filter Sidebar */}
      <aside class="lg:col-span-4 space-y-5 rounded-xl border border-border bg-surface/70 p-5">
        <div class="space-y-2">
          <p class="editorial-kicker">Search {props.entry_name}</p>
          <SearchBar
            onSearchInput={(e) => setQuery(e.currentTarget.value)}
            query={query}
            setQuery={setQuery}
            placeholderText={`Filter ${props.entry_name}...`}
          />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <p class="editorial-kicker">Topics</p>
            <Show when={selectedTags().length > 0}>
              <button
                type="button"
                onClick={() => setSelectedTags([])}
                class="text-xs font-mono text-accent hover:underline underline-offset-4"
              >
                Clear
              </button>
            </Show>
          </div>

          <div class="flex flex-wrap gap-2">
            <For each={props.tags}>
              {(tag) => {
                const active = () => selectedTags().includes(tag)
                return (
                  <button
                    type="button"
                    aria-pressed={active()}
                    onClick={() => toggleTag(tag)}
                    class={`rounded-full border px-3 py-1 text-xs font-mono transition-colors ${
                      active()
                        ? "border-accent bg-accent text-bg font-semibold"
                        : "border-border bg-surface-elevated text-ink-muted hover:border-accent hover:text-ink"
                    }`}
                  >
                    {tag}
                  </button>
                )
              }}
            </For>
          </div>
        </div>
      </aside>

      {/* Results List */}
      <div class="lg:col-span-8 space-y-4">
        <div class="flex items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider text-ink-muted">
          <span>
            Showing {filteredItems().length} of {props.data.length} {props.entry_name}
          </span>
          <button
            type="button"
            onClick={() => setDescending((prev) => !prev)}
            class="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-3 py-1.5 text-ink-muted hover:border-accent hover:text-ink transition-colors"
          >
            <span>{descending() ? "Newest first" : "Oldest first"}</span>
          </button>
        </div>

        <Show
          when={filteredItems().length > 0}
          fallback={
            <div class="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-12 text-center">
              <p class="font-serif text-xl text-ink">No matching {props.entry_name}.</p>
              <p class="mt-1 text-sm text-ink-muted">
                Try clearing a topic filter or using a shorter search term.
              </p>
            </div>
          }
        >
          <ul class="space-y-4">
            <For each={filteredItems()}>
              {(entry) => (
                <li>
                  <ArrowCard entry={entry} />
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    </div>
  )
}
