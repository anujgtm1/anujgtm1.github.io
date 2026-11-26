import type { Site, Page, Links, Socials } from "@types"

export const SITE: Site = {
  TITLE: "Anuj Gautam",
  DESCRIPTION:
    "Editorial field journal, essays, interactive bookshelf, travel atlas, and engineering notes by Anuj Gautam.",
  AUTHOR: "Anuj Gautam",
}

export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Short notes on books, software, and places worth remembering.",
}

export const PHOTOS: Page = {
  TITLE: "Photos",
  DESCRIPTION:
    "Contact plates and quiet frames from travels, the workshop bench, and everyday walks.",
}

export const BOOKS: Page = {
  TITLE: "Bookshelf",
  DESCRIPTION:
    "A living shelf of books on my desk, favorites, and quick marginalia — funny, interesting, or occasionally grim.",
}

export const TRAVEL: Page = {
  TITLE: "Travel Atlas",
  DESCRIPTION: "Passport stamps, coordinates, and field notes from places that stayed with me.",
}

export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Selected engineering dossiers, research systems, and personal tools.",
}

export const ABOUT: Page = {
  TITLE: "About",
  DESCRIPTION:
    "Background, engineering chapters, what is currently on my desk, and how to get in touch.",
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
  { TEXT: "Photos", HREF: "/photos" },
  { TEXT: "Books", HREF: "/books" },
  { TEXT: "Travel", HREF: "/travel" },
  { TEXT: "Projects", HREF: "/projects" },
  { TEXT: "About", HREF: "/about" },
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
