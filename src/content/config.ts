import { defineCollection, z } from "astro:content"

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
})

const books = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(["reading", "favorite", "finished", "queued"]),
    rating: z.number().int().min(1).max(5).optional(),
    dateRead: z.coerce.date().optional(),
    yearRead: z.number().int().min(1900).max(2100).optional(),
    pages: z.number().int().positive().optional(),
    isbn: z.string().optional(),
    coverUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    spineTheme: z
      .enum([
        "burgundy",
        "forest",
        "navy",
        "ochre",
        "terracotta",
        "slate",
        "charcoal",
        "plum",
      ])
      .default("charcoal"),
    quote: z.string().optional(),
    summary: z.string(),
    draft: z.boolean().optional(),
  }),
})

const travel = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    city: z.string(),
    country: z.string(),
    region: z.enum([
      "North America",
      "Europe",
      "Asia",
      "South America",
      "Africa",
      "Oceania",
    ]),
    stampCode: z.string().min(2).max(5),
    date: z.coerce.date(),
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    summary: z.string(),
    highlights: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
})

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    status: z.enum(["active", "shipped", "research", "archived"]).default("shipped"),
    role: z.string().optional(),
    tags: z.array(z.string()),
    repoUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
  }),
})

const now = defineCollection({
  type: "content",
  schema: z.object({
    updatedAt: z.coerce.date(),
    location: z.string(),
    currentlyReading: z.string().optional(),
    currentlyBuilding: z.string(),
    nextTrip: z.string().optional(),
    listeningOrThinking: z.string(),
  }),
})

const photos = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    imageUrl: z.string(),
    thumbnailUrl: z.string().optional(),
    alt: z.string(),
    caption: z.string().optional(),
    date: z.coerce.date(),
    location: z.string().optional(),
    album: z.string().optional(),
    camera: z.string().optional(),
    aspectRatio: z.enum(["landscape", "portrait", "square", "wide"]).optional(),
    featured: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional(),
  }),
})

export const collections = { work, blog, books, travel, projects, now, photos }
