import { For, Show } from "solid-js"
import type { NationalPark, ParkArtworkInk, ParkArtworkNode, ParkEmblemKind } from "@types"
import { getParkArtwork } from "@data/parkArtworks"

type Props = {
  readonly park: NationalPark
  readonly class?: string
  readonly decorative?: boolean
  readonly idPrefix?: string
}

const INK_VAR_MAP: Readonly<Record<ParkArtworkInk, string>> = {
  "sky-top": "var(--emblem-sky-top)",
  "sky-bottom": "var(--emblem-sky-bottom)",
  far: "var(--emblem-far)",
  mid: "var(--emblem-mid)",
  ink: "var(--emblem-ink)",
  deep: "var(--emblem-deep)",
  accent: "var(--emblem-accent)",
  "accent-soft": "var(--emblem-accent-soft)",
  paper: "var(--emblem-paper)",
  none: "none",
}

function resolveInk(ink: ParkArtworkInk | undefined): string | undefined {
  return ink ? INK_VAR_MAP[ink] : undefined
}

function ArtworkNode(props: { readonly node: ParkArtworkNode }) {
  const n = props.node
  const fill = resolveInk(n.fill) ?? "none"
  const stroke = resolveInk(n.stroke)

  switch (n.kind) {
    case "path":
      return (
        <path
          d={n.d}
          fill={fill}
          stroke={stroke}
          stroke-width={n.strokeWidth}
          stroke-linecap={n.strokeLinecap}
          stroke-linejoin={n.strokeLinejoin}
          stroke-dasharray={n.strokeDasharray}
          opacity={n.opacity}
        />
      )
    case "circle":
      return (
        <circle
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill={fill}
          stroke={stroke}
          stroke-width={n.strokeWidth}
          stroke-dasharray={n.strokeDasharray}
          opacity={n.opacity}
        />
      )
    case "ellipse":
      return (
        <ellipse
          cx={n.cx}
          cy={n.cy}
          rx={n.rx}
          ry={n.ry}
          fill={fill}
          stroke={stroke}
          stroke-width={n.strokeWidth}
          stroke-dasharray={n.strokeDasharray}
          opacity={n.opacity}
        />
      )
    case "rect":
      return (
        <rect
          x={n.x}
          y={n.y}
          width={n.width}
          height={n.height}
          rx={n.rx}
          fill={fill}
          stroke={stroke}
          stroke-width={n.strokeWidth}
          stroke-dasharray={n.strokeDasharray}
          opacity={n.opacity}
        />
      )
    case "line":
      return (
        <line
          x1={n.x1}
          y1={n.y1}
          x2={n.x2}
          y2={n.y2}
          fill={fill}
          stroke={stroke}
          stroke-width={n.strokeWidth}
          stroke-linecap={n.strokeLinecap}
          stroke-dasharray={n.strokeDasharray}
          opacity={n.opacity}
        />
      )
    case "polygon":
      return (
        <polygon
          points={n.points}
          fill={fill}
          stroke={stroke}
          stroke-width={n.strokeWidth}
          stroke-linejoin={n.strokeLinejoin}
          stroke-dasharray={n.strokeDasharray}
          opacity={n.opacity}
        />
      )
    default: {
      const exhaustive: never = n
      return exhaustive
    }
  }
}

function EmblemArtwork(props: { readonly kind: ParkEmblemKind }) {
  switch (props.kind) {
    case "arch":
      return (
        <>
          {/* Sun + La Sal mountain silhouette + Delicate Arch */}
          <circle cx="84" cy="34" r="10" fill="var(--emblem-sun)" opacity="0.9" />
          <path d="M12 88 L36 62 L58 76 L82 54 L108 88 Z" fill="var(--emblem-mid)" opacity="0.5" />
          <path
            d="M26 98 L33 48 C36 28 84 26 88 50 L95 98 L77 98 L73 58 C71 42 49 42 47 58 L43 98 Z"
            fill="var(--emblem-ink)"
          />
          <path d="M12 96 Q60 90 108 96 L108 108 L12 108 Z" fill="var(--emblem-ink)" opacity="0.85" />
        </>
      )
    case "gateway-arch":
      return (
        <>
          <circle cx="60" cy="40" r="14" fill="var(--emblem-sun)" opacity="0.85" />
          <path
            d="M28 92 C36 24 84 24 92 92 L85 92 C78 36 42 36 35 92 Z"
            fill="var(--emblem-ink)"
          />
          <path d="M14 92 Q60 88 106 92" stroke="var(--emblem-ink)" stroke-width="2" fill="none" />
          <path d="M18 99 Q42 96 66 99 T104 99" stroke="var(--emblem-mid)" stroke-width="2" fill="none" opacity="0.7" />
        </>
      )
    case "half-dome":
      return (
        <>
          <circle cx="32" cy="34" r="9" fill="var(--emblem-sun)" opacity="0.88" />
          {/* Yosemite Valley & sheer Half Dome face */}
          <path d="M12 94 L30 56 L50 76 L58 32 C76 30 92 44 102 68 L108 94 Z" fill="var(--emblem-ink)" />
          <path d="M58 32 L54 78 L72 86 L68 38 Z" fill="var(--emblem-paper)" opacity="0.22" />
          {/* Waterfall ribbon */}
          <path d="M35 62 L35 90" stroke="var(--emblem-paper)" stroke-width="2.6" stroke-linecap="round" opacity="0.85" />
          {/* Pine foreground */}
          <path d="M18 102 L24 82 L30 102 M78 102 L85 78 L92 102 M92 102 L98 86 L104 102" fill="var(--emblem-mid)" />
        </>
      )
    case "geyser":
      return (
        <>
          <circle cx="88" cy="32" r="9" fill="var(--emblem-sun)" opacity="0.85" />
          <path d="M12 86 Q40 72 60 78 T108 82 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.55" />
          {/* Old Faithful steam column */}
          <path
            d="M54 84 C50 62 44 46 50 30 C54 20 66 20 70 30 C76 46 70 62 66 84 Z"
            fill="var(--emblem-paper)"
            opacity="0.92"
          />
          <path
            d="M57 86 C56 64 55 48 60 28 C65 48 64 64 63 86 Z"
            fill="var(--emblem-ink)"
            opacity="0.35"
          />
          {/* Sinter cone & terraced pool */}
          <path d="M34 94 Q60 80 86 94 L108 104 L12 104 Z" fill="var(--emblem-ink)" />
          <ellipse cx="60" cy="98" rx="22" ry="3.5" fill="var(--emblem-sun)" opacity="0.7" />
        </>
      )
    case "canyon":
      return (
        <>
          <circle cx="60" cy="30" r="11" fill="var(--emblem-sun)" opacity="0.88" />
          {/* Stepped strata canyon walls */}
          <path d="M12 48 L42 52 L48 70 L38 74 L46 92 L12 92 Z" fill="var(--emblem-mid)" opacity="0.72" />
          <path d="M108 48 L78 52 L72 70 L82 74 L74 92 L108 92 Z" fill="var(--emblem-mid)" opacity="0.72" />
          <path d="M12 64 L36 68 L44 104 L12 104 Z" fill="var(--emblem-ink)" />
          <path d="M108 64 L84 68 L76 104 L108 104 Z" fill="var(--emblem-ink)" />
          {/* Winding river at canyon floor */}
          <path d="M58 66 Q52 78 62 86 T56 104" stroke="var(--emblem-paper)" stroke-width="3.2" fill="none" opacity="0.9" />
        </>
      )
    case "hoodoos":
      return (
        <>
          <circle cx="84" cy="30" r="10" fill="var(--emblem-sun)" opacity="0.88" />
          <path d="M12 72 Q60 58 108 72 L108 104 L12 104 Z" fill="var(--emblem-mid)" opacity="0.45" />
          {/* Clustered crimson spires / hoodoos */}
          <path
            d="M22 102 L24 62 L21 56 L29 50 L35 56 L32 62 L35 102
               M44 102 L47 46 L43 40 L52 34 L59 40 L55 46 L58 102
               M67 102 L70 54 L67 49 L75 44 L81 49 L78 54 L80 102
               M88 102 L90 66 L87 62 L94 58 L99 62 L96 66 L98 102 Z"
            fill="var(--emblem-ink)"
          />
          <rect x="12" y="96" width="96" height="12" fill="var(--emblem-ink)" />
        </>
      )
    case "cathedral-peaks":
      return (
        <>
          <circle cx="86" cy="30" r="9" fill="var(--emblem-sun)" opacity="0.85" />
          {/* Jagged alpine triad */}
          <path d="M12 86 L34 46 L48 64 L64 26 L80 62 L92 48 L108 86 Z" fill="var(--emblem-ink)" />
          {/* Snow facets */}
          <path d="M64 26 L56 46 L63 42 L68 50 L72 44 Z" fill="var(--emblem-paper)" opacity="0.85" />
          <path d="M34 46 L29 58 L35 55 L39 60 Z" fill="var(--emblem-paper)" opacity="0.72" />
          {/* Glacial lake reflection */}
          <rect x="12" y="86" width="96" height="20" fill="var(--emblem-mid)" opacity="0.55" />
          <path d="M28 92 L92 92 M38 97 L82 97" stroke="var(--emblem-paper)" stroke-width="1.8" stroke-linecap="round" opacity="0.75" />
        </>
      )
    case "volcano-cone":
      return (
        <>
          <circle cx="32" cy="32" r="9" fill="var(--emblem-sun)" opacity="0.85" />
          {/* Subtle caldera plume */}
          <path d="M58 34 Q54 24 62 20 Q72 18 76 26" stroke="var(--emblem-paper)" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.75" />
          {/* Stratovolcano profile */}
          <path d="M12 92 L48 38 L72 38 L108 92 Z" fill="var(--emblem-ink)" />
          <path d="M48 38 L60 44 L72 38 L79 50 L66 47 L60 54 L53 47 L41 50 Z" fill="var(--emblem-paper)" opacity="0.82" />
          {/* Subalpine ridge */}
          <path d="M12 88 Q42 78 60 86 T108 84 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.7" />
        </>
      )
    case "caldera-lake":
      return (
        <>
          <circle cx="60" cy="28" r="9" fill="var(--emblem-sun)" opacity="0.85" />
          {/* Outer caldera rim */}
          <path d="M12 68 L28 46 L48 54 L76 46 L94 52 L108 68 L108 82 L12 82 Z" fill="var(--emblem-ink)" />
          {/* Deep sapphire lake */}
          <ellipse cx="60" cy="84" rx="44" ry="14" fill="var(--emblem-mid)" />
          <ellipse cx="60" cy="84" rx="34" ry="9" fill="var(--emblem-paper)" opacity="0.16" />
          {/* Wizard Island cinder cone */}
          <path d="M46 84 L57 68 L63 68 L74 84 Z" fill="var(--emblem-ink)" />
        </>
      )
    case "giant-trees":
      return (
        <>
          <circle cx="60" cy="34" r="14" fill="var(--emblem-sun)" opacity="0.82" />
          {/* Towering fluted redwood / sequoia trunks */}
          <path d="M26 104 L30 22 L40 22 L44 104 Z" fill="var(--emblem-ink)" />
          <path d="M52 104 L55 18 L67 18 L70 104 Z" fill="var(--emblem-ink)" />
          <path d="M78 104 L82 28 L91 28 L95 104 Z" fill="var(--emblem-mid)" />
          {/* Canopy boughs */}
          <path d="M16 42 L35 28 L52 42 M42 36 L61 20 L80 36 M68 48 L86 34 L104 48" stroke="var(--emblem-ink)" stroke-width="3" fill="none" stroke-linecap="round" />
          <path d="M59 32 L59 96" stroke="var(--emblem-paper)" stroke-width="1.5" opacity="0.35" />
        </>
      )
    case "saguaro":
      return (
        <>
          <circle cx="60" cy="36" r="15" fill="var(--emblem-sun)" opacity="0.88" />
          <path d="M12 88 L36 70 L62 82 L88 68 L108 88 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.52" />
          {/* Iconic Sonoran Saguaro */}
          <path
            d="M55 98 L55 34 C55 29 65 29 65 34 L65 98 Z"
            fill="var(--emblem-ink)"
          />
          <path
            d="M55 64 L42 64 C37 64 36 60 36 55 L36 44 C36 40 43 40 43 44 L43 56 L55 56 Z"
            fill="var(--emblem-ink)"
          />
          <path
            d="M65 56 L78 56 C83 56 84 52 84 47 L84 38 C84 34 77 34 77 38 L77 48 L65 48 Z"
            fill="var(--emblem-ink)"
          />
        </>
      )
    case "joshua-tree":
      return (
        <>
          <circle cx="82" cy="32" r="11" fill="var(--emblem-sun)" opacity="0.88" />
          <path d="M12 90 Q46 78 76 86 T108 86 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.5" />
          {/* Sculptural Mojave Joshua Tree */}
          <path
            d="M57 96 L57 54 L42 42 L38 30 M57 58 L74 46 L80 34 M57 68 L44 60 L34 62 M61 96 L61 48 L60 30"
            stroke="var(--emblem-ink)"
            stroke-width="4.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
          <circle cx="38" cy="29" r="5" fill="var(--emblem-ink)" />
          <circle cx="60" cy="28" r="5.5" fill="var(--emblem-ink)" />
          <circle cx="80" cy="33" r="5" fill="var(--emblem-ink)" />
          <circle cx="33" cy="62" r="4.5" fill="var(--emblem-ink)" />
        </>
      )
    case "dunes":
      return (
        <>
          <circle cx="78" cy="30" r="11" fill="var(--emblem-sun)" opacity="0.88" />
          <path d="M12 68 L38 50 L62 62 L88 48 L108 66 L108 82 L12 82 Z" fill="var(--emblem-mid)" opacity="0.4" />
          {/* Sweeping wind-carved dunes */}
          <path d="M12 84 Q42 54 72 78 T108 72 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.72" />
          <path d="M12 96 Q54 66 94 90 L108 84 L108 106 L12 106 Z" fill="var(--emblem-ink)" />
          <path d="M44 68 Q62 76 74 88" stroke="var(--emblem-paper)" stroke-width="1.6" fill="none" opacity="0.45" />
        </>
      )
    case "lighthouse-coast":
      return (
        <>
          <circle cx="36" cy="32" r="9" fill="var(--emblem-sun)" opacity="0.86" />
          {/* Granite headland + coastal beacon */}
          <path d="M12 86 L46 66 L82 72 L108 86 Z" fill="var(--emblem-mid)" opacity="0.55" />
          <path d="M62 72 L66 36 L74 36 L78 72 Z" fill="var(--emblem-ink)" />
          <rect x="64" y="31" width="12" height="5" rx="1" fill="var(--emblem-sun)" />
          <path d="M70 25 L64 31 L76 31 Z" fill="var(--emblem-ink)" />
          {/* Ocean wave bands */}
          <path d="M12 86 Q32 80 52 86 T92 86 T108 86 L108 106 L12 106 Z" fill="var(--emblem-ink)" />
          <path d="M22 95 Q42 91 62 95 T98 95" stroke="var(--emblem-paper)" stroke-width="2" fill="none" opacity="0.75" />
        </>
      )
    case "reef-island":
      return (
        <>
          <circle cx="60" cy="32" r="11" fill="var(--emblem-sun)" opacity="0.88" />
          {/* Volcanic tropical cay */}
          <path d="M24 74 Q46 46 66 56 Q82 48 96 74 Z" fill="var(--emblem-ink)" />
          {/* Palm silhouette */}
          <path d="M44 72 Q40 56 46 44" stroke="var(--emblem-ink)" stroke-width="2.6" fill="none" />
          <path d="M46 44 Q34 40 28 48 M46 44 Q56 38 62 46 M46 44 Q48 34 38 34" stroke="var(--emblem-ink)" stroke-width="2.2" fill="none" stroke-linecap="round" />
          {/* Coral reef water */}
          <path d="M12 74 L108 74 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.78" />
          <path d="M22 84 Q42 79 62 84 T98 84 M28 94 Q48 89 68 94 T94 94" stroke="var(--emblem-paper)" stroke-width="2" fill="none" opacity="0.8" />
        </>
      )
    case "fort-island":
      return (
        <>
          <circle cx="60" cy="30" r="10" fill="var(--emblem-sun)" opacity="0.88" />
          {/* Hexagonal brick Fort Jefferson */}
          <path d="M26 76 L32 54 L88 54 L94 76 Z" fill="var(--emblem-ink)" />
          <rect x="38" y="60" width="6" height="8" rx="3" fill="var(--emblem-paper)" opacity="0.7" />
          <rect x="57" y="60" width="6" height="8" rx="3" fill="var(--emblem-paper)" opacity="0.7" />
          <rect x="76" y="60" width="6" height="8" rx="3" fill="var(--emblem-paper)" opacity="0.7" />
          <path d="M58 54 L58 38 L62 38 L62 54 Z" fill="var(--emblem-ink)" />
          {/* Surrounding Gulf sea */}
          <path d="M12 76 L108 76 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.78" />
          <path d="M20 87 Q40 82 60 87 T100 87 M26 96 Q46 92 66 96 T94 96" stroke="var(--emblem-paper)" stroke-width="2" fill="none" opacity="0.8" />
        </>
      )
    case "marsh-heron":
      return (
        <>
          <circle cx="76" cy="32" r="12" fill="var(--emblem-sun)" opacity="0.85" />
          {/* Sawgrass reeds */}
          <path d="M22 92 L18 62 M28 92 L29 56 M88 92 L92 58 M96 92 L102 66" stroke="var(--emblem-mid)" stroke-width="2.4" stroke-linecap="round" />
          {/* Great blue heron silhouette */}
          <path
            d="M52 92 L52 72 M58 92 L60 72 M46 66 C48 56 64 56 68 64 C64 72 50 74 46 66 Z"
            fill="var(--emblem-ink)"
            stroke="var(--emblem-ink)"
            stroke-width="2.2"
          />
          <path d="M62 60 C66 48 64 42 58 38 L70 37" stroke="var(--emblem-ink)" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          {/* Still marsh water */}
          <path d="M12 90 L108 90 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.6" />
        </>
      )
    case "misty-ridges":
      return (
        <>
          <circle cx="80" cy="30" r="10" fill="var(--emblem-sun)" opacity="0.82" />
          {/* Layered Blue Ridge / Olympic misty mountain waves */}
          <path d="M12 66 Q38 44 64 58 T108 52 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.35" />
          <path d="M12 76 Q44 54 74 68 T108 64 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.62" />
          <path d="M12 88 Q36 68 66 80 T108 76 L108 106 L12 106 Z" fill="var(--emblem-ink)" />
          <path d="M24 72 Q52 68 82 72" stroke="var(--emblem-paper)" stroke-width="2" fill="none" opacity="0.55" />
        </>
      )
    case "cavern":
      return (
        <>
          {/* Outer cave vault */}
          <path d="M12 14 L108 14 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.3" />
          <path d="M12 14 L108 14 L108 106 L94 106 C92 52 80 34 60 34 C40 34 28 52 26 106 L12 106 Z" fill="var(--emblem-ink)" />
          {/* Stalactites & stalagmites */}
          <path d="M40 36 L44 58 L48 36 M56 34 L60 64 L64 34 M72 36 L76 54 L80 36" fill="var(--emblem-ink)" />
          <path d="M36 104 L42 74 L48 104 M58 104 L64 78 L70 104 M76 104 L82 82 L88 104" fill="var(--emblem-ink)" />
          <circle cx="60" cy="68" r="7" fill="var(--emblem-sun)" opacity="0.75" />
        </>
      )
    case "cliff-dwelling":
      return (
        <>
          {/* Deep sandstone alcove */}
          <path d="M12 14 L108 14 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.38" />
          <path d="M12 14 L108 14 L108 58 Q60 28 12 58 Z" fill="var(--emblem-ink)" />
          {/* Ancestral Puebloan towers & kiva */}
          <rect x="26" y="64" width="18" height="28" fill="var(--emblem-ink)" />
          <rect x="48" y="54" width="22" height="38" fill="var(--emblem-ink)" />
          <rect x="74" y="66" width="18" height="26" fill="var(--emblem-ink)" />
          {/* Tiny T-shaped doors & windows */}
          <rect x="33" y="72" width="4" height="6" fill="var(--emblem-sun)" />
          <rect x="57" y="62" width="4" height="7" fill="var(--emblem-sun)" />
          <rect x="57" y="76" width="4" height="7" fill="var(--emblem-sun)" />
          <rect x="81" y="74" width="4" height="6" fill="var(--emblem-sun)" />
          <path d="M12 92 L108 92 L108 106 L12 106 Z" fill="var(--emblem-ink)" />
        </>
      )
    case "monolith-fold":
      return (
        <>
          <circle cx="34" cy="30" r="10" fill="var(--emblem-sun)" opacity="0.88" />
          {/* Dramatic Zion / Capitol Reef / El Capitan prow */}
          <path d="M12 94 L22 52 L54 34 L78 58 L98 46 L108 94 Z" fill="var(--emblem-ink)" />
          <path d="M54 34 L50 94 L66 94 L68 50 Z" fill="var(--emblem-paper)" opacity="0.2" />
          <path d="M12 92 Q60 84 108 92 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.7" />
        </>
      )
    case "hot-springs":
      return (
        <>
          <circle cx="60" cy="30" r="10" fill="var(--emblem-sun)" opacity="0.84" />
          {/* Rising mineral steam ribbons */}
          <path d="M44 64 Q40 52 46 44 M60 62 Q56 48 62 38 M76 64 Q72 52 78 44" stroke="var(--emblem-ink)" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.75" />
          {/* Stepped thermal travertine basins */}
          <path d="M22 70 Q60 62 98 70 L94 82 Q60 76 26 82 Z" fill="var(--emblem-mid)" opacity="0.75" />
          <path d="M14 84 Q60 76 106 84 L106 106 L14 106 Z" fill="var(--emblem-ink)" />
          <path d="M30 92 Q60 88 90 92" stroke="var(--emblem-paper)" stroke-width="2" fill="none" opacity="0.7" />
        </>
      )
    case "glacier-fjord":
      return (
        <>
          <circle cx="84" cy="30" r="9" fill="var(--emblem-sun)" opacity="0.84" />
          {/* Alaskan alpine massif */}
          <path d="M12 78 L34 42 L50 56 L68 24 L88 54 L108 78 Z" fill="var(--emblem-ink)" />
          <path d="M68 24 L59 44 L67 40 L74 48 L77 38 Z" fill="var(--emblem-paper)" opacity="0.85" />
          {/* Sweeping glacier tongue into fjord */}
          <path d="M36 78 Q58 64 78 78 L92 92 L24 92 Z" fill="var(--emblem-paper)" opacity="0.78" />
          <path d="M12 88 L108 88 L108 106 L12 106 Z" fill="var(--emblem-mid)" opacity="0.75" />
          <path d="M22 97 Q46 93 70 97 T102 97" stroke="var(--emblem-paper)" stroke-width="1.8" fill="none" opacity="0.75" />
        </>
      )
  }
}

export default function ParkEmblem(props: Props) {
  const artwork = () => getParkArtwork(props.park.code)
  const prefix = () => props.idPrefix ?? "emblem"
  const clipId = () => `${prefix()}-clip-${props.park.code}`
  const skyGradId = () => `${prefix()}-sky-${props.park.code}`
  const legacyClipId = () => `${prefix()}-legacy-${props.park.code}`

  const skyClass = () => {
    const spec = artwork()
    return spec ? `park-emblem--sky-${spec.skyMood}` : ""
  }

  const pigmentStyle = () => {
    const spec = artwork()
    return {
      "--park-light": props.park.pigmentLight,
      "--park-dark": props.park.pigmentDark,
      ...(spec
        ? {
            "--park-accent-light": spec.accentLight,
            "--park-accent-dark": spec.accentDark,
          }
        : {}),
    }
  }

  return (
    <svg
      viewBox="0 0 180 240"
      class={`park-emblem block h-full w-full ${skyClass()} ${
        props.park.visited ? "" : "park-emblem--unvisited"
      } ${props.class ?? ""}`}
      role={props.decorative ? undefined : "img"}
      aria-hidden={props.decorative ? "true" : undefined}
      aria-label={props.decorative ? undefined : `${props.park.name} National Park poster`}
      style={pigmentStyle()}
    >
      <defs>
        <clipPath id={clipId()}>
          <rect x="14" y="14" width="152" height="212" rx="6" />
        </clipPath>
        <clipPath id={legacyClipId()}>
          <rect x="12" y="12" width="96" height="96" rx="8" />
        </clipPath>
        <linearGradient id={skyGradId()} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--emblem-sky-top)" />
          <stop offset="100%" stop-color="var(--emblem-sky-bottom)" />
        </linearGradient>
      </defs>

      {/* Outer archival WPA poster mat frame */}
      <rect
        x="4"
        y="4"
        width="172"
        height="232"
        rx="10"
        fill="var(--emblem-frame)"
        stroke="var(--emblem-border)"
        stroke-width="1.5"
        stroke-dasharray={props.park.visited ? undefined : "5 3"}
      />

      {/* Subtle outer letterpress groove */}
      <rect
        x="9.5"
        y="9.5"
        width="161"
        height="221"
        rx="8"
        fill="none"
        stroke="var(--emblem-border)"
        stroke-width="0.65"
        opacity="0.38"
      />

      {/* Clipped inner artwork plate */}
      <g clip-path={`url(#${clipId()})`}>
        <rect x="14" y="14" width="152" height="212" fill={`url(#${skyGradId()})`} />

        <Show
          when={artwork()}
          fallback={
            <>
              {/* Harmonious top atmosphere & bottom ground extension for unmigrated emblems */}
              <rect x="14" y="178" width="152" height="48" fill="var(--emblem-mid)" opacity="0.28" />
              <line
                x1="38"
                y1="202"
                x2="142"
                y2="202"
                stroke="var(--emblem-border)"
                stroke-width="0.85"
                opacity="0.55"
              />
              <polygon
                points="90,198.5 93.5,202 90,205.5 86.5,202"
                fill="var(--emblem-ink)"
                opacity="0.45"
              />
              <g transform="translate(14 44) scale(1.2667)">
                <g clip-path={`url(#${legacyClipId()})`}>
                  <rect x="12" y="12" width="96" height="96" fill={`url(#${skyGradId()})`} />
                  <EmblemArtwork kind={props.park.emblem} />
                </g>
                <rect
                  x="12"
                  y="12"
                  width="96"
                  height="96"
                  rx="8"
                  fill="none"
                  stroke="var(--emblem-border)"
                  stroke-width="0.9"
                  opacity="0.6"
                />
              </g>
            </>
          }
        >
          {(spec) => (
            <For each={spec().nodes}>{(node) => <ArtworkNode node={node} />}</For>
          )}
        </Show>
      </g>

      {/* Inner hairline mat impression */}
      <rect
        x="14"
        y="14"
        width="152"
        height="212"
        rx="6"
        fill="none"
        stroke="var(--emblem-border)"
        stroke-width="1"
        opacity="0.78"
      />
    </svg>
  )
}
