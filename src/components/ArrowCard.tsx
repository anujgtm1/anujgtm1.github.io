import { For } from "solid-js"
import type { CollectionEntry } from "astro:content"
import { formatDate } from "@lib/utils"

type Props = {
  readonly entry: CollectionEntry<"blog"> | CollectionEntry<"projects">
  readonly pill?: boolean
}

export default function ArrowCard(props: Props) {
  return (
    <a
      href={`/${props.entry.collection}/${props.entry.slug}/`}
      class="editorial-card group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-elevated p-5 hover:border-accent"
    >
      <div class="min-w-0 flex-1 space-y-2">
        <div class="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted">
          {props.pill && (
            <span class="rounded bg-atlas-soft px-2 py-0.5 text-atlas font-medium">
              {props.entry.collection === "blog" ? "Essay" : "Project"}
            </span>
          )}
          <time datetime={props.entry.data.date.toISOString()}>
            {formatDate(props.entry.data.date)}
          </time>
        </div>

        <h2 class="font-serif text-xl sm:text-2xl font-medium text-ink group-hover:text-accent transition-colors">
          {props.entry.data.title}
        </h2>

        <p class="text-sm text-ink-muted leading-relaxed">
          {props.entry.data.summary}
        </p>

        <ul class="flex flex-wrap gap-1.5 pt-1">
          <For each={props.entry.data.tags}>
            {(tag) => (
              <li class="rounded border border-border bg-surface px-2 py-0.5 text-[11px] font-mono text-ink-muted">
                {tag}
              </li>
            )}
          </For>
        </ul>
      </div>

      <span
        aria-hidden="true"
        class="shrink-0 font-mono text-lg text-ink-muted group-hover:text-accent transition-colors"
      >
        →
      </span>
    </a>
  )
}
