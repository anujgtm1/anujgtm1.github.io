import { For } from "solid-js"
import type { NationalPark, ParkArtworkInk, ParkArtworkNode } from "@types"
import { getParkArtwork } from "@data/parkArtworks"

type Props = {
  readonly park: NationalPark
  readonly class?: string
  readonly decorative?: boolean
  readonly idPrefix?: string
  readonly variant?: "plate" | "stamp" | "inset"
}

const STAMP_TOP_BOTTOM_PERFS: readonly number[] = [
  18.3, 32.7, 47, 61.3, 75.7, 90, 104.3, 118.7, 133, 147.3, 161.7,
]

const STAMP_LEFT_RIGHT_PERFS: readonly number[] = [
  18.5, 33, 47.5, 62, 76.5, 91, 105.5, 120, 134.5, 149, 163.5, 178, 192.5, 207, 221.5,
]

const STAMP_CORNERS: readonly { readonly cx: number; readonly cy: number }[] = [
  { cx: 4, cy: 4 },
  { cx: 176, cy: 4 },
  { cx: 4, cy: 236 },
  { cx: 176, cy: 236 },
]

const INK_VAR_MAP: Readonly<Record<ParkArtworkInk, string>> = {
  "sky-top": "var(--emblem-sky-top)",
  "sky-bottom": "var(--emblem-sky-bottom)",
  far: "var(--emblem-far)",
  mid: "var(--emblem-mid)",
  ink: "var(--emblem-ink)",
  deep: "var(--emblem-deep)",
  accent: "var(--emblem-accent)",
  "accent-soft": "var(--emblem-accent-soft)",
  tertiary: "var(--emblem-tertiary)",
  "tertiary-soft": "var(--emblem-tertiary-soft)",
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

export default function ParkEmblem(props: Props) {
  const artwork = () => getParkArtwork(props.park.code)
  const prefix = () => props.idPrefix ?? "emblem"
  const clipId = () => `${prefix()}-clip-${props.park.code}`
  const skyGradId = () => `${prefix()}-sky-${props.park.code}`
  const stampMaskId = () => `${prefix()}-stamp-${props.park.code}`
  const variant = () => props.variant ?? "plate"
  const isStamp = () => variant() === "stamp"
  const isInset = () => variant() === "inset"

  const skyClass = () => `park-emblem--sky-${artwork().skyMood}`

  const pigmentStyle = () => {
    const spec = artwork()
    return {
      "--park-light": props.park.pigmentLight,
      "--park-dark": props.park.pigmentDark,
      "--park-accent-light": spec.accentLight,
      "--park-accent-dark": spec.accentDark,
      ...(spec.tertiaryLight ? { "--park-tertiary-light": spec.tertiaryLight } : {}),
      ...(spec.tertiaryDark ? { "--park-tertiary-dark": spec.tertiaryDark } : {}),
    }
  }

  return (
    <svg
      viewBox={isInset() ? "14 14 152 212" : "0 0 180 240"}
      class={`park-emblem block h-full w-full ${skyClass()} ${
        isStamp() ? "park-emblem--stamp" : ""
      } ${props.park.visited ? "" : "park-emblem--unvisited"} ${props.class ?? ""}`}
      role={props.decorative ? undefined : "img"}
      aria-hidden={props.decorative ? "true" : undefined}
      aria-label={props.decorative ? undefined : `${props.park.name} National Park poster`}
      style={pigmentStyle()}
    >
      <defs>
        <clipPath id={clipId()}>
          <rect x="14" y="14" width="152" height="212" rx={isInset() ? 2 : isStamp() ? 4 : 6} />
        </clipPath>
        <linearGradient id={skyGradId()} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--emblem-sky-top)" />
          <stop offset="100%" stop-color="var(--emblem-sky-bottom)" />
        </linearGradient>
        {isStamp() && (
          <mask id={stampMaskId()}>
            <rect x="4" y="4" width="172" height="232" fill="white" />
            <For each={STAMP_CORNERS}>
              {(pt) => <circle cx={pt.cx} cy={pt.cy} r="4.6" fill="black" />}
            </For>
            <For each={STAMP_TOP_BOTTOM_PERFS}>
              {(x) => (
                <>
                  <circle cx={x} cy="4" r="4.2" fill="black" />
                  <circle cx={x} cy="236" r="4.2" fill="black" />
                </>
              )}
            </For>
            <For each={STAMP_LEFT_RIGHT_PERFS}>
              {(y) => (
                <>
                  <circle cx="4" cy={y} r="4.2" fill="black" />
                  <circle cx="176" cy={y} r="4.2" fill="black" />
                </>
              )}
            </For>
          </mask>
        )}
      </defs>

      <g mask={isStamp() ? `url(#${stampMaskId()})` : undefined}>
        {!isInset() && (
          <>
            {/* Outer archival WPA poster mat frame or perforated postage-stamp paper */}
            <rect
              x="4"
              y="4"
              width="172"
              height="232"
              rx={isStamp() ? 0 : 10}
              fill="var(--emblem-frame)"
              stroke={isStamp() ? "none" : "var(--emblem-border)"}
              stroke-width={isStamp() ? undefined : "1.5"}
              stroke-dasharray={isStamp() || props.park.visited ? undefined : "5 3"}
            />

            {/* Subtle outer letterpress groove */}
            <rect
              x="9.5"
              y="9.5"
              width="161"
              height="221"
              rx={isStamp() ? 3 : 8}
              fill="none"
              stroke="var(--emblem-border)"
              stroke-width="0.65"
              opacity="0.38"
            />
          </>
        )}

        {/* Clipped inner artwork plate */}
        <g clip-path={`url(#${clipId()})`}>
          <rect x="14" y="14" width="152" height="212" fill={`url(#${skyGradId()})`} />
          <For each={artwork().nodes}>{(node) => <ArtworkNode node={node} />}</For>
        </g>

        {/* Inner hairline mat impression */}
        <rect
          x={isInset() ? "14.5" : "14"}
          y={isInset() ? "14.5" : "14"}
          width={isInset() ? "151" : "152"}
          height={isInset() ? "211" : "212"}
          rx={isInset() ? 2 : isStamp() ? 4 : 6}
          fill="none"
          stroke="var(--emblem-border)"
          stroke-width="1"
          stroke-dasharray={(isStamp() || isInset()) && !props.park.visited ? "4 3" : undefined}
          opacity="0.78"
        />
      </g>
    </svg>
  )
}
