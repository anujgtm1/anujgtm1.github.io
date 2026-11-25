import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE } from "@consts"
import { prepareRssItems } from "@lib/rss"
import type { RssFeedEntry } from "@types"

type Context = {
  site: URL
}

export async function GET(context: Context) {
  const [posts, trips, projects] = await Promise.all([
    getCollection("blog"),
    getCollection("travel"),
    getCollection("projects"),
  ])

  const entries: readonly RssFeedEntry[] = [
    ...posts.map((post) => ({
      collection: "blog" as const,
      slug: post.slug,
      title: post.data.title,
      summary: post.data.summary,
      date: post.data.date,
      draft: post.data.draft,
    })),
    ...trips.map((trip) => ({
      collection: "travel" as const,
      slug: trip.slug,
      title: `${trip.data.city}, ${trip.data.country} — ${trip.data.title}`,
      summary: trip.data.summary,
      date: trip.data.date,
      draft: trip.data.draft,
    })),
    ...projects.map((project) => ({
      collection: "projects" as const,
      slug: project.slug,
      title: project.data.title,
      summary: project.data.summary,
      date: project.data.date,
      draft: project.data.draft,
    })),
  ]

  const items = prepareRssItems(entries)

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: [...items],
  })
}
