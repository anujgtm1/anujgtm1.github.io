import type { ParkArtworkSpec, ParkCode } from "../../types/parks.ts"
import { ALASKA_VOLCANIC_PARK_ARTWORKS } from "./alaskaVolcanic.ts"
import { ALPINE_FORESTS_PARK_ARTWORKS } from "./alpineForests.ts"
import { COASTS_EAST_PARK_ARTWORKS } from "./coastsEast.ts"
import { DESERTS_KARST_PARK_ARTWORKS } from "./desertsKarst.ts"
import { PILOT_PARK_ARTWORKS } from "./pilot.ts"
import { SOUTHWEST_PARK_ARTWORKS } from "./southwest.ts"

export const ALL_PARK_ARTWORKS: readonly ParkArtworkSpec[] = [
  ...PILOT_PARK_ARTWORKS,
  ...SOUTHWEST_PARK_ARTWORKS,
  ...DESERTS_KARST_PARK_ARTWORKS,
  ...ALPINE_FORESTS_PARK_ARTWORKS,
  ...ALASKA_VOLCANIC_PARK_ARTWORKS,
  ...COASTS_EAST_PARK_ARTWORKS,
]

const artworkByCode: ReadonlyMap<ParkCode, ParkArtworkSpec> = new Map(
  ALL_PARK_ARTWORKS.map((artwork) => [artwork.code, artwork]),
)

function requireArtwork(code: ParkCode): ParkArtworkSpec {
  const spec = artworkByCode.get(code)
  if (!spec) {
    throw new Error(`Missing bespoke WPA artwork for park "${code}"`)
  }
  return spec
}

export const PARK_ARTWORKS = {
  ACAD: requireArtwork("ACAD"),
  ARCH: requireArtwork("ARCH"),
  BADL: requireArtwork("BADL"),
  BIBE: requireArtwork("BIBE"),
  BISC: requireArtwork("BISC"),
  BLCA: requireArtwork("BLCA"),
  BRCA: requireArtwork("BRCA"),
  CANY: requireArtwork("CANY"),
  CARE: requireArtwork("CARE"),
  CAVE: requireArtwork("CAVE"),
  CHIS: requireArtwork("CHIS"),
  CONG: requireArtwork("CONG"),
  CRLA: requireArtwork("CRLA"),
  CUVA: requireArtwork("CUVA"),
  DENA: requireArtwork("DENA"),
  DEVA: requireArtwork("DEVA"),
  DRTO: requireArtwork("DRTO"),
  EVER: requireArtwork("EVER"),
  GAAR: requireArtwork("GAAR"),
  GLAC: requireArtwork("GLAC"),
  GLBA: requireArtwork("GLBA"),
  GRBA: requireArtwork("GRBA"),
  GRCA: requireArtwork("GRCA"),
  GRSA: requireArtwork("GRSA"),
  GRSM: requireArtwork("GRSM"),
  GRTE: requireArtwork("GRTE"),
  GUMO: requireArtwork("GUMO"),
  HALE: requireArtwork("HALE"),
  HAVO: requireArtwork("HAVO"),
  HOSP: requireArtwork("HOSP"),
  INDU: requireArtwork("INDU"),
  ISRO: requireArtwork("ISRO"),
  JEFF: requireArtwork("JEFF"),
  JOTR: requireArtwork("JOTR"),
  KATM: requireArtwork("KATM"),
  KEFJ: requireArtwork("KEFJ"),
  KICA: requireArtwork("KICA"),
  KOVA: requireArtwork("KOVA"),
  LACL: requireArtwork("LACL"),
  LAVO: requireArtwork("LAVO"),
  MACA: requireArtwork("MACA"),
  MEVE: requireArtwork("MEVE"),
  MORA: requireArtwork("MORA"),
  NERI: requireArtwork("NERI"),
  NOCA: requireArtwork("NOCA"),
  NPSA: requireArtwork("NPSA"),
  OLYM: requireArtwork("OLYM"),
  PEFO: requireArtwork("PEFO"),
  PINN: requireArtwork("PINN"),
  REDW: requireArtwork("REDW"),
  ROMO: requireArtwork("ROMO"),
  SAGU: requireArtwork("SAGU"),
  SEQU: requireArtwork("SEQU"),
  SHEN: requireArtwork("SHEN"),
  THRO: requireArtwork("THRO"),
  VIIS: requireArtwork("VIIS"),
  VOYA: requireArtwork("VOYA"),
  WHSA: requireArtwork("WHSA"),
  WICA: requireArtwork("WICA"),
  WRST: requireArtwork("WRST"),
  YELL: requireArtwork("YELL"),
  YOSE: requireArtwork("YOSE"),
  ZION: requireArtwork("ZION"),
} as const satisfies Readonly<Record<ParkCode, ParkArtworkSpec>>

export function getParkArtwork(code: ParkCode): ParkArtworkSpec {
  return PARK_ARTWORKS[code]
}

export {
  ALASKA_VOLCANIC_PARK_ARTWORKS,
  ALPINE_FORESTS_PARK_ARTWORKS,
  COASTS_EAST_PARK_ARTWORKS,
  DESERTS_KARST_PARK_ARTWORKS,
  PILOT_PARK_ARTWORKS,
  SOUTHWEST_PARK_ARTWORKS,
}
