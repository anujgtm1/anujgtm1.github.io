import type { RssFeedEntry, RssFeedItem } from "../types/domain.ts"
import { assertNever } from "./assertNever.ts"

export function buildRssItemUrl(entry: RssFeedEntry): string {
  switch (entry.collection) {
    case "blog":
      return `/blog/${entry.slug}/`
    case "travel":
      return `/travel/${entry.slug}/`
    case "projects":
      return `/projects/${entry.slug}/`
    default:
      return assertNever(entry, "Unhandled RSS collection")
  }
}

export function prepareRssItems(entries: readonly RssFeedEntry[]): readonly RssFeedItem[] {
  return entries
    .filter((entry) => entry.draft !== true)
    .slice()
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((entry) => ({
      title: entry.title,
      description: entry.summary,
      pubDate: entry.date,
      link: buildRssItemUrl(entry),
    }))
}
