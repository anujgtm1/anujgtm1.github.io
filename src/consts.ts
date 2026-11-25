import type { Site, Page, Links, Socials } from "@types"

export const SITE: Site = {
  TITLE: "Anuj Gautam",
  DESCRIPTION:
    "Editorial field journal, essays, interactive bookshelf, travel atlas, and engineering notes by Anuj Gautam.",
  AUTHOR: "Anuj Gautam",
}

export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Essays and field notes on software systems, philosophy, books, and craft.",
}

export const BOOKS: Page = {
  TITLE: "Bookshelf",
  DESCRIPTION: "A living shelf of favorite books, marginalia, and what is currently open on my desk.",
}

export const TRAVEL: Page = {
  TITLE: "Travel Atlas",
  DESCRIPTION: "Passport stamps, coordinates, and field notes from places that stayed with me.",
}

export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Selected engineering dossiers, research systems, and personal tools.",
}

export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "Engineering, research, and academic chapters along the way.",
}

export const NOW: Page = {
  TITLE: "Now",
  DESCRIPTION: "What I am building, reading, and thinking about right now.",
}

export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search essays, projects, books, and travel logs across the journal.",
}

export const LINKS: Links = [
  { TEXT: "Blog", HREF: "/blog" },
  { TEXT: "Books", HREF: "/books" },
  { TEXT: "Travel", HREF: "/travel" },
  { TEXT: "Projects", HREF: "/projects" },
  { TEXT: "Work", HREF: "/work" },
  { TEXT: "Now", HREF: "/now" },
]

export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "mail@anujgtm.com",
    HREF: "mailto:mail@anujgtm.com",
  },
  {
    NAME: "GitHub",
    ICON: "github",
    TEXT: "github.com/anujgtm1",
    HREF: "https://github.com/anujgtm1",
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "linkedin.com/in/anujgtm",
    HREF: "https://www.linkedin.com/in/anujgtm/",
  },
]
