import type { ParkJournalEntry } from "../types/parks.ts"

/**
 * Personal park memories, quotes, photos, and highlights keyed by 4-letter NPS park code
 * (e.g. "YOSE", "ZION", "ACAD", "GLAC").
 *
 * Add entries whenever you want to attach photos, quotes, or "what we liked" notes to a park:
 *
 *   YOSE: {
 *     visitedDate: "Oct 2024",
 *     quote: "Standing at Glacier Point at dusk while Half Dome turned rose.",
 *     liked: ["Mist Trail up to Vernal Fall", "Sunrise from Tunnel View"],
 *     notes: "Short personal memory from the trip.",
 *     photos: [{ src: "/images/parks/yosemite-1.jpg", alt: "Half Dome at sunset", caption: "Glacier Point" }],
 *   },
 */
export const PARK_JOURNAL: Readonly<Partial<Record<string, ParkJournalEntry>>> = {}
