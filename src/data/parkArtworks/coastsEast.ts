import type { ParkArtworkSpec } from "../../types/parks.ts"

/**
 * Coasts, Islands, Waterways & Eastern Parks collection: 12 bespoke WPA-screenprint
 * National Park poster artworks.
 *
 * Artboard: viewBox="0 0 180 240" (3:4 portrait), clipped inner print area
 * x=[14..166], y=[14..226], horizontal center x=90. Edge-touching fills bleed
 * cleanly to x=[11..169], y=[11..229] so layers sweep continuously edge-to-edge.
 */
export const COASTS_EAST_PARK_ARTWORKS: readonly ParkArtworkSpec[] = [
  // =========================================================================
  // 1. ACAD — Acadia National Park (ME)
  // =========================================================================
  {
    code: "ACAD",
    subject: "Bass Harbor Head Light atop diagonal pink-granite Maine ledges, spruces & Atlantic swells",
    accentLight: "#C76342",
    accentDark: "#EE9878",
    skyMood: "dawn",
    nodes: [
      // Plane 1: First-light Atlantic dawn sky, rising sun & glowing lighthouse beacon beams
      { kind: "circle", cx: 44, cy: 96, r: 28, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 44, cy: 96, r: 16, fill: "accent", opacity: 0.88 },
      { kind: "circle", cx: 44, cy: 96, r: 9, fill: "paper", opacity: 0.82 },
      { kind: "path", d: "M16 32 Q42 26 70 33 Q52 37 16 32 Z", fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M96 28 Q128 22 162 29 Q138 33 96 28 Z", fill: "paper", opacity: 0.56 },
      // Glowing lighthouse beacon rays fanning from lantern room (114,60)
      { kind: "polygon", points: "110,60 11,36 11,64", fill: "accent-soft", opacity: 0.34 },
      { kind: "polygon", points: "110,60 11,44 11,56", fill: "paper", opacity: 0.32 },
      { kind: "polygon", points: "118,60 169,46 169,66", fill: "accent-soft", opacity: 0.28 },

      // Plane 2: Distant Schoodic headland & dawn-lit North Atlantic horizon
      { kind: "path", d: "M11 108 Q36 100 66 106 L82 114 L11 114 Z", fill: "far", opacity: 0.72 },
      { kind: "rect", x: 11, y: 114, width: 158, height: 42, fill: "far" },
      { kind: "ellipse", cx: 44, cy: 122, rx: 22, ry: 2.8, fill: "accent-soft", opacity: 0.68 },
      { kind: "line", x1: 28, y1: 130, x2: 64, y2: 130, stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.72 },

      // Plane 3: Hero Bass Harbor Head Light perched atop diagonal pink-granite Maine ledges
      // Dark Maine spruce grove behind keeper's house & upper granite crest
      { kind: "polygon", points: "148,54 139,94 157,94", fill: "deep" },
      { kind: "polygon", points: "160,48 150,94 169,94", fill: "deep" },
      { kind: "polygon", points: "136,68 128,98 144,98", fill: "ink" },
      // Keeper's cottage attached right of the tower
      { kind: "rect", x: 120, y: 84, width: 24, height: 18, fill: "paper" },
      { kind: "polygon", points: "118,85 132,76 146,85", fill: "accent" },
      { kind: "rect", x: 126, y: 89, width: 4, height: 6, fill: "deep", opacity: 0.85 },
      { kind: "rect", x: 135, y: 89, width: 4, height: 6, fill: "deep", opacity: 0.85 },
      // Iconic white cylindrical Bass Harbor Head Light tower
      { kind: "path", d: "M107 104 L109 68 L119 68 L121 104 Z", fill: "paper" },
      { kind: "path", d: "M115 104 L115 68 L119 68 L121 104 Z", fill: "far", opacity: 0.52 },
      // Gallery deck, iconic red lantern room, glowing Fresnel lens & cupola
      { kind: "rect", x: 105, y: 66, width: 18, height: 3, rx: 1, fill: "deep" },
      { kind: "rect", x: 109, y: 56, width: 10, height: 10, fill: "accent" },
      { kind: "circle", cx: 114, cy: 60, r: 3.4, fill: "paper", opacity: 0.96 },
      { kind: "polygon", points: "114,47 108,56 120,56", fill: "deep" },

      // Rugged sloping coastal pink-granite cliff headland sweeping diagonally right-to-left
      {
        kind: "path",
        d: "M169 92 L134 96 L104 102 L82 118 L66 138 L46 164 L32 184 L169 184 Z",
        fill: "ink",
      },
      // Sunlit faceted pink-granite cliff ledges catching dawn light
      {
        kind: "path",
        d: "M104 102 L136 98 L169 96 L169 124 L132 126 L100 136 L74 152 L66 138 L82 118 Z",
        fill: "accent",
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M108 106 L142 104 L130 114 L96 122 Z",
        fill: "accent-soft",
        opacity: 0.56,
      },
      {
        kind: "path",
        d: "M76 134 L120 120 L164 114 M62 154 L108 138 L156 134",
        stroke: "deep",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        opacity: 0.68,
      },

      // Plane 4: Rolling North Atlantic swells & crashing whitewater surf against the headland
      { kind: "rect", x: 11, y: 152, width: 158, height: 77, fill: "mid" },
      {
        kind: "path",
        d: "M11 164 Q36 154 62 166 Q94 174 128 164 Q150 158 169 166 L169 229 L11 229 Z",
        fill: "ink",
      },
      // Exploding whitewater surf spray where swells strike the sloping pink-granite ledges
      {
        kind: "path",
        d: "M42 164 Q52 146 66 156 Q78 142 94 158 Q106 150 120 162 Q86 172 42 164 Z",
        fill: "paper",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M14 180 Q44 172 78 182 T146 180 Q158 178 168 182",
        stroke: "paper",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.84,
      },
      {
        kind: "path",
        d: "M22 198 Q56 190 92 200 T160 198",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.72,
      },

      // Plane 5: Foreground dark granite headland ledges framing lower corners
      { kind: "path", d: "M11 196 L38 202 L58 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 186 L136 194 L112 212 L100 229 L169 229 Z", fill: "deep" },
      { kind: "path", d: "M169 186 L136 194 L112 212", stroke: "accent", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.72 },
    ],
  },

  // =========================================================================
  // 2. BISC — Biscayne National Park (FL)
  // =========================================================================
  {
    code: "BISC",
    subject: "Boca Chita Lighthouse, mangrove key & sailboat above a split-waterline underwater coral reef",
    accentLight: "#2B9A94",
    accentDark: "#6CD6D0",
    skyMood: "noon",
    nodes: [
      // Plane 1: Bright subtropical Florida sky, noon sun, cumulus clouds & gulls
      { kind: "circle", cx: 44, cy: 36, r: 19, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 44, cy: 36, r: 10, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M64 40 Q76 30 90 35 Q100 26 114 34 Q124 32 132 40 Z", fill: "paper", opacity: 0.82 },
      { kind: "path", d: "M14 58 Q26 52 38 56 Q48 52 58 58 Z", fill: "paper", opacity: 0.65 },
      { kind: "path", d: "M76 52 Q80 48 84 52 Q88 48 92 52", stroke: "ink", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.75 },

      // Plane 2: Open turquoise Biscayne Bay, distant Stiltsville & sailboat silhouette
      { kind: "rect", x: 11, y: 98, width: 158, height: 24, fill: "far" },
      // Distant Stiltsville stilt house on far left horizon
      { kind: "rect", x: 16, y: 93, width: 11, height: 5, fill: "ink", opacity: 0.72 },
      { kind: "line", x1: 18, y1: 98, x2: 18, y2: 102, stroke: "ink", strokeWidth: 1.1, opacity: 0.72 },
      { kind: "line", x1: 25, y1: 98, x2: 25, y2: 102, stroke: "ink", strokeWidth: 1.1, opacity: 0.72 },
      // Crisp white-sailed sloop skimming Biscayne Bay
      { kind: "polygon", points: "48,66 48,98 62,98", fill: "paper", opacity: 0.96 },
      { kind: "polygon", points: "46,72 46,98 37,98", fill: "accent-soft", opacity: 0.88 },
      { kind: "path", d: "M35 99 L64 99 L59 104 L40 104 Z", fill: "deep" },

      // Plane 3 (Upper Hero): Boca Chita Key emerald mangroves & slender coral-rock lighthouse
      {
        kind: "path",
        d: "M78 112 Q88 94 104 98 Q116 92 132 96 Q148 90 169 98 L169 120 L78 120 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M84 114 Q96 102 112 106 Q132 100 150 106 Q160 102 169 108 L169 120 L84 120 Z",
        fill: "deep",
        opacity: 0.72,
      },
      // Slender ornamental coral-rock Boca Chita Lighthouse
      { kind: "path", d: "M122 104 L125 56 L133 56 L136 104 Z", fill: "paper" },
      { kind: "path", d: "M129 104 L130 56 L133 56 L136 104 Z", fill: "far", opacity: 0.56 },
      { kind: "path", d: "M124 72 L134 72 M123 84 L135 84 M123 94 L135 94", stroke: "mid", strokeWidth: 0.9, opacity: 0.55 },
      { kind: "rect", x: 122, y: 53, width: 14, height: 3, rx: 1, fill: "deep" },
      { kind: "rect", x: 125, y: 46, width: 8, height: 7, fill: "accent" },
      { kind: "polygon", points: "129,39 124,46 134,46", fill: "deep" },
      // Swaying mangrove-key palm beside the lighthouse
      { kind: "path", d: "M148 102 Q151 86 158 76", stroke: "deep", strokeWidth: 2.2, strokeLinecap: "round" },
      {
        kind: "path",
        d: "M158 76 Q148 73 142 79 M158 76 Q165 72 169 77 M158 76 Q156 67 148 68",
        stroke: "deep",
        strokeWidth: 1.8,
        strokeLinecap: "round",
      },

      // Plane 4: Glass-clear waterline split & luminous underwater caustic sunbeams
      { kind: "path", d: "M11 118 Q44 114 78 120 T146 118 Q158 117 169 120 L169 229 L11 229 Z", fill: "accent" },
      { kind: "path", d: "M11 144 Q52 138 96 146 T169 144 L169 229 L11 229 Z", fill: "mid", opacity: 0.72 },
      { kind: "path", d: "M11 182 Q58 176 104 184 T169 180 L169 229 L11 229 Z", fill: "ink", opacity: 0.56 },
      // Crisp bright waterline surface meniscus gleam
      { kind: "path", d: "M11 118 Q44 114 78 120 T146 118 Q158 117 169 120", stroke: "paper", strokeWidth: 2.6, strokeLinecap: "round", opacity: 0.96 },
      // Underwater caustic sunbeams slanting from the sunlit bay surface
      { kind: "polygon", points: "36,119 60,119 96,216 62,216", fill: "paper", opacity: 0.22 },
      { kind: "polygon", points: "74,120 92,120 124,214 102,214", fill: "accent-soft", opacity: 0.28 },

      // Plane 5 (Lower Hero): Underwater coral-reef garden, sea fans, brain coral & reef fish
      // Sandy reef bed & dark reef outcrops
      { kind: "path", d: "M11 200 Q48 188 88 202 Q128 190 169 200 L169 229 L11 229 Z", fill: "deep" },
      // Left sculptural branching staghorn coral
      {
        kind: "path",
        d: "M34 212 L34 176 M34 196 L20 182 M34 188 L48 174 M24 186 L20 172 M44 178 L52 164 M34 176 L28 160",
        stroke: "paper",
        strokeWidth: 3.2,
        strokeLinecap: "round",
        opacity: 0.92,
      },
      // Center-right delicate radiating coral sea fan
      {
        kind: "path",
        d: "M126 206 C112 184 114 162 128 152 C144 156 150 180 132 206 Z",
        fill: "accent-soft",
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M128 206 L128 156 M128 194 L118 170 M128 194 L140 168 M128 180 L116 164 M128 180 L142 162",
        stroke: "paper",
        strokeWidth: 1.4,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      // Rounded grooved brain coral dome on the reef floor
      { kind: "ellipse", cx: 84, cy: 204, rx: 18, ry: 12, fill: "ink" },
      { kind: "path", d: "M72 204 Q84 194 96 204 M75 208 Q84 201 93 208", stroke: "accent-soft", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.85 },
      // Streamlined tropical reef fish darting through the sunbeams
      {
        kind: "path",
        d: "M74 150 Q80 145 86 150 Q80 155 74 150 L70 147 L70 153 Z M94 162 Q99 158 104 162 Q99 166 94 162 L91 159 L91 165 Z M62 168 Q67 164 72 168 Q67 172 62 168 L59 166 L59 170 Z",
        fill: "deep",
        opacity: 0.86,
      },
      { kind: "circle", cx: 88, cy: 144, r: 1.5, fill: "paper", opacity: 0.82 },
      { kind: "circle", cx: 92, cy: 136, r: 1.2, fill: "paper", opacity: 0.72 },
    ],
  },

  // =========================================================================
  // 3. CHIS — Channel Islands National Park (CA) [unvisited — high tonal contrast]
  // =========================================================================
  {
    code: "CHIS",
    subject: "Anacapa Island's freestanding volcanic Arch Rock, steep sea cliffs & foaming Pacific swells",
    accentLight: "#3F879B",
    accentDark: "#82C4D8",
    skyMood: "noon",
    nodes: [
      // Plane 1: Bright breezy coastal sky, radiant sun & soaring seabirds
      { kind: "circle", cx: 112, cy: 42, r: 22, fill: "accent-soft", opacity: 0.4 },
      { kind: "circle", cx: 112, cy: 42, r: 11, fill: "paper", opacity: 0.98 },
      { kind: "path", d: "M16 32 Q38 24 66 32 Q48 36 16 32 Z", fill: "paper", opacity: 0.78 },
      { kind: "path", d: "M128 54 Q146 48 166 54 Q150 58 128 54 Z", fill: "paper", opacity: 0.66 },
      // Soaring California brown pelicans / coastal gulls
      { kind: "path", d: "M64 46 Q70 40 76 46 Q82 40 88 46", stroke: "deep", strokeWidth: 1.6, strokeLinecap: "round" },
      { kind: "path", d: "M130 34 Q135 29 140 34 Q145 29 150 34", stroke: "deep", strokeWidth: 1.4, strokeLinecap: "round" },
      { kind: "path", d: "M82 62 Q86 58 90 62 Q94 58 98 62", stroke: "ink", strokeWidth: 1.2, strokeLinecap: "round" },

      // Plane 2: Distant Santa Cruz Island ridge & Pacific horizon sea
      { kind: "path", d: "M11 114 L34 102 L58 108 L82 104 L98 118 L11 118 Z", fill: "far", opacity: 0.72 },
      { kind: "rect", x: 11, y: 118, width: 158, height: 42, fill: "far" },
      // Luminous sunlit water gleam right behind Arch Rock's open tunnel
      { kind: "rect", x: 86, y: 118, width: 42, height: 42, fill: "paper", opacity: 0.72 },

      // Plane 3: Steep Anacapa Island cliff promontory & freestanding Hero Arch Rock
      // Left steep basalt promontory of East Anacapa Island
      {
        kind: "path",
        d: "M11 72 L46 76 L58 94 L66 158 L11 158 Z",
        fill: "ink",
      },
      // Sunlit grassy mesa cap & vertical basalt cliff striations on Anacapa
      { kind: "path", d: "M11 72 L46 76 L52 84 L11 82 Z", fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M34 86 L40 148 M48 92 L54 152", stroke: "deep", strokeWidth: 1.5, opacity: 0.65 },

      // Hero freestanding dark basalt Arch Rock sea-arch (bold open semicircular tunnel!)
      {
        kind: "path",
        d: "M64 162 L74 114 L84 82 L102 74 L124 76 L142 96 L154 162 L126 162 L124 128 C122 108 94 108 92 128 L88 162 Z",
        fill: "deep",
      },
      // Crisp sunlit upper basalt facet & inner rim bevel for unmistakable grayscale separation
      {
        kind: "path",
        d: "M102 74 L124 76 L142 96 L152 152 L138 152 L128 102 L114 88 L98 84 Z",
        fill: "mid",
        opacity: 0.76,
      },
      { kind: "path", d: "M102 74 L124 76 L142 96", stroke: "paper", strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.88 },
      // Golden/bright sunlight beam streaming right through the open Arch Rock tunnel
      { kind: "polygon", points: "114,114 124,126 112,188 80,188 94,122", fill: "paper", opacity: 0.42 },
      // Companion sea-stack rock spur at far right
      { kind: "path", d: "M154 120 L164 108 L169 114 L169 162 L148 162 Z", fill: "ink" },

      // Plane 4: Foaming Pacific swells surging through Arch Rock & rolling edge-to-edge
      { kind: "rect", x: 11, y: 156, width: 158, height: 73, fill: "mid" },
      {
        kind: "path",
        d: "M11 174 Q42 164 76 176 T144 174 Q158 172 169 176 L169 229 L11 229 Z",
        fill: "ink",
      },
      // Bright churning surf foam crashing around Arch Rock's pillars & through the arch
      {
        kind: "path",
        d: "M58 162 Q74 150 92 160 Q108 152 124 160 Q140 150 158 162 Q128 170 58 162 Z",
        fill: "paper",
        opacity: 0.94,
      },
      { kind: "ellipse", cx: 104, cy: 174, rx: 22, ry: 3.2, fill: "paper", opacity: 0.84 },
      {
        kind: "path",
        d: "M14 186 Q48 178 86 188 T166 186",
        stroke: "paper",
        strokeWidth: 2.3,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M24 202 Q62 194 102 204 T164 202",
        stroke: "paper",
        strokeWidth: 1.7,
        strokeLinecap: "round",
        opacity: 0.72,
      },

      // Plane 5: Foreground dark tidal basalt rocks framing bottom-left & bottom-right
      { kind: "path", d: "M11 194 L34 202 L50 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 192 L146 200 L128 229 L169 229 Z", fill: "deep" },
      { kind: "path", d: "M11 194 L34 202 L48 224", stroke: "paper", strokeWidth: 1.4, opacity: 0.65 },
      { kind: "path", d: "M169 192 L146 200 L132 224", stroke: "paper", strokeWidth: 1.4, opacity: 0.65 },
    ],
  },

  // =========================================================================
  // 4. CUVA — Cuyahoga Valley National Park (OH)
  // =========================================================================
  {
    code: "CUVA",
    subject: "Brandywine Falls' 65-foot stepped Berea sandstone bridal-veil cascade & autumn woodland gorge",
    accentLight: "#C77438",
    accentDark: "#EDA46C",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Golden Appalachian dawn sky peeking over the wooded gorge crest
      { kind: "circle", cx: 90, cy: 32, r: 22, fill: "accent-soft", opacity: 0.42 },
      { kind: "circle", cx: 90, cy: 32, r: 11, fill: "paper", opacity: 0.92 },
      { kind: "path", d: "M22 26 Q46 20 70 27 Q48 30 22 26 Z", fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M112 24 Q138 19 162 26 Q140 29 112 24 Z", fill: "paper", opacity: 0.54 },

      // Plane 2: Rounded Appalachian deciduous forest canopies crowning the gorge rim
      {
        kind: "path",
        d: "M11 58 Q26 40 44 50 Q62 36 82 52 Q98 38 118 50 Q138 36 156 48 Q164 44 169 52 L169 84 L11 84 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M11 66 Q24 50 40 60 Q54 48 70 64 L70 86 L11 86 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M169 64 Q152 48 136 58 Q122 48 108 64 L108 86 L169 86 Z",
        fill: "mid",
      },
      // Warm autumn maple & oak foliage puffs framing the crest
      { kind: "ellipse", cx: 36, cy: 62, rx: 16, ry: 9, fill: "accent", opacity: 0.52 },
      { kind: "ellipse", cx: 142, cy: 60, rx: 18, ry: 9, fill: "accent", opacity: 0.52 },
      { kind: "ellipse", cx: 60, cy: 68, rx: 12, ry: 7, fill: "accent-soft", opacity: 0.48 },

      // Plane 3: Hero broad stepped Berea sandstone & Bedford shale cliff amphitheater
      // Tier 1 — Upper Berea sandstone caprock shelf
      { kind: "path", d: "M11 76 L72 76 L72 84 L108 84 L108 76 L169 76 L169 102 L11 102 Z", fill: "ink" },
      { kind: "line", x1: 11, y1: 77, x2: 72, y2: 77, stroke: "accent-soft", strokeWidth: 2.2, opacity: 0.82 },
      { kind: "line", x1: 108, y1: 77, x2: 169, y2: 77, stroke: "accent-soft", strokeWidth: 2.2, opacity: 0.82 },
      // Tier 2, 3 & 4 — Broad recessed horizontal dark shale & sandstone amphitheater steps
      { kind: "rect", x: 11, y: 100, width: 158, height: 26, fill: "deep" },
      { kind: "rect", x: 11, y: 124, width: 158, height: 28, fill: "ink" },
      { kind: "rect", x: 11, y: 150, width: 158, height: 32, fill: "deep" },
      // Crisp horizontal Berea sandstone bedding ledges jutting left & right
      { kind: "line", x1: 11, y1: 101, x2: 169, y2: 101, stroke: "accent", strokeWidth: 2.6, opacity: 0.78 },
      { kind: "line", x1: 11, y1: 125, x2: 169, y2: 125, stroke: "accent-soft", strokeWidth: 2.4, opacity: 0.72 },
      { kind: "line", x1: 11, y1: 151, x2: 169, y2: 151, stroke: "accent", strokeWidth: 2.4, opacity: 0.72 },

      // Hero Brandywine Falls stepped bridal-veil foaming white cascade fanning across every tier
      {
        kind: "path",
        d: "M72 78 L108 78 L114 101 L122 103 L128 125 L136 127 L144 151 L150 178 L30 178 L36 151 L44 127 L52 125 L58 103 L66 101 Z",
        fill: "accent-soft",
        opacity: 0.56,
      },
      {
        kind: "path",
        d: "M75 78 L105 78 L110 101 L117 104 L122 125 L130 128 L136 151 L142 178 L38 178 L44 151 L50 128 L58 125 L63 104 L70 101 Z",
        fill: "paper",
        opacity: 0.92,
      },
      // Dark stepped shale rock ribs peeking cleanly through the vertical bridal-veil ribbons
      { kind: "rect", x: 78, y: 104, width: 4, height: 19, fill: "ink", opacity: 0.58 },
      { kind: "rect", x: 97, y: 104, width: 4, height: 19, fill: "ink", opacity: 0.54 },
      { kind: "rect", x: 64, y: 129, width: 5, height: 20, fill: "deep", opacity: 0.56 },
      { kind: "rect", x: 87, y: 129, width: 5, height: 20, fill: "deep", opacity: 0.52 },
      { kind: "rect", x: 112, y: 129, width: 5, height: 20, fill: "deep", opacity: 0.56 },
      // Crisp bright foaming ledge-lip highlights where water breaks over each step
      { kind: "line", x1: 62, y1: 102, x2: 118, y2: 102, stroke: "paper", strokeWidth: 2.2, strokeLinecap: "round" },
      { kind: "line", x1: 50, y1: 126, x2: 130, y2: 126, stroke: "paper", strokeWidth: 2.4, strokeLinecap: "round" },
      { kind: "line", x1: 40, y1: 152, x2: 140, y2: 152, stroke: "paper", strokeWidth: 2.6, strokeLinecap: "round" },

      // Plane 4: Misty plunge pool, foam rings & rocky Brandywine Creek
      { kind: "rect", x: 11, y: 176, width: 158, height: 53, fill: "mid" },
      { kind: "ellipse", cx: 90, cy: 177, rx: 56, ry: 9, fill: "paper", opacity: 0.78 },
      { kind: "ellipse", cx: 90, cy: 184, rx: 46, ry: 6, stroke: "paper", strokeWidth: 1.8, opacity: 0.86 },
      { kind: "ellipse", cx: 90, cy: 195, rx: 58, ry: 7.5, stroke: "accent-soft", strokeWidth: 1.5, opacity: 0.72 },
      { kind: "path", d: "M48 212 Q90 206 132 212", stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.74 },

      // Plane 5: Foreground warm layered sandstone gorge ledges framing bottom corners
      { kind: "path", d: "M11 168 L34 172 L46 196 L64 214 L60 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 168 L146 172 L134 196 L116 214 L120 229 L169 229 Z", fill: "deep" },
      { kind: "path", d: "M11 172 L34 175 M11 196 L44 198 M169 172 L146 175 M169 196 L136 198", stroke: "accent", strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.78 },
    ],
  },

  // =========================================================================
  // 5. DRTO — Dry Tortugas National Park (FL)
  // =========================================================================
  {
    code: "DRTO",
    subject: "Hexagonal brick Fort Jefferson, arched casemate gunports, harbor turret & turquoise Gulf shallows",
    accentLight: "#C2603C",
    accentDark: "#EB9674",
    skyMood: "noon",
    nodes: [
      // Plane 1: Radiant Gulf noon sky, sun, trade-wind cumulus & frigatebirds
      { kind: "circle", cx: 138, cy: 36, r: 19, fill: "accent-soft", opacity: 0.38 },
      { kind: "circle", cx: 138, cy: 36, r: 10, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M18 42 Q32 30 48 36 Q60 28 74 36 Q84 34 92 42 Z", fill: "paper", opacity: 0.84 },
      { kind: "path", d: "M108 58 Q122 50 138 55 Q150 51 164 58 Z", fill: "paper", opacity: 0.68 },
      { kind: "path", d: "M58 58 Q63 53 68 58 Q73 53 78 58", stroke: "ink", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.78 },

      // Plane 2: Distant Gulf horizon & shallow sandbar waters behind Garden Key
      { kind: "rect", x: 11, y: 110, width: 158, height: 42, fill: "far" },
      { kind: "line", x1: 11, y1: 112, x2: 169, y2: 112, stroke: "mid", strokeWidth: 2, opacity: 0.72 },

      // Plane 3: Hero massive hexagonal brick Fort Jefferson & Garden Key Harbor Light
      // Interior parade-ground palm crowns peeking above the brick ramparts
      { kind: "path", d: "M48 92 Q58 78 72 86 Q82 78 94 90 L94 96 L48 96 Z", fill: "deep", opacity: 0.84 },
      // Slender white iron Garden Key Harbor Light turret rising from the bastion
      { kind: "rect", x: 116, y: 58, width: 7, height: 34, fill: "paper" },
      { kind: "rect", x: 114, y: 56, width: 11, height: 2.5, fill: "deep" },
      { kind: "rect", x: 116.5, y: 50, width: 6, height: 6, fill: "accent" },
      { kind: "polygon", points: "119.5,44 115.5,50 123.5,50", fill: "deep" },

      // Left sunlit hexagonal brick curtain wall & bastion corner (x=22..96)
      { kind: "polygon", points: "22,94 96,86 96,150 22,146", fill: "accent" },
      // Right shadowed hexagonal brick curtain wall (x=96..160)
      { kind: "polygon", points: "96,86 160,96 160,146 96,150", fill: "ink" },
      // Brick parapet cap & crisp corner quoin highlight
      { kind: "path", d: "M22 94 L96 86 L160 96", stroke: "paper", strokeWidth: 2, opacity: 0.84 },
      { kind: "line", x1: 96, y1: 86, x2: 96, y2: 150, stroke: "deep", strokeWidth: 1.6, opacity: 0.72 },
      // Horizontal brick tier stringcourse dividing the two casemate tiers
      { kind: "path", d: "M22 119 L96 116 L160 120", stroke: "deep", strokeWidth: 1.4, opacity: 0.65 },

      // Upper & lower neat rows of arched casemate gunports on sunlit left wall
      {
        kind: "path",
        d: "M31 111 L31 105 A3 3 0 0 1 37 105 L37 111 Z M45 110 L45 104 A3 3 0 0 1 51 104 L51 110 Z M59 108 L59 102 A3 3 0 0 1 65 102 L65 108 Z M73 107 L73 101 A3 3 0 0 1 79 101 L79 107 Z M85 106 L85 100 A2.75 2.75 0 0 1 90.5 100 L90.5 106 Z M31 137 L31 130 A3 3 0 0 1 37 130 L37 137 Z M45 136 L45 129 A3 3 0 0 1 51 129 L51 136 Z M59 135 L59 128 A3 3 0 0 1 65 128 L65 135 Z M73 134 L73 127 A3 3 0 0 1 79 127 L79 134 Z M85 133 L85 126 A2.75 2.75 0 0 1 90.5 126 L90.5 133 Z",
        fill: "deep",
      },

      // Arched casemate gunports on shadowed right wall (catching sunlit arch glints)
      {
        kind: "path",
        d: "M104 107 L104 101 A2.75 2.75 0 0 1 109.5 101 L109.5 107 Z M117 109 L117 103 A2.75 2.75 0 0 1 122.5 103 L122.5 109 Z M130 110 L130 104 A2.75 2.75 0 0 1 135.5 104 L135.5 110 Z M143 112 L143 106 A2.75 2.75 0 0 1 148.5 106 L148.5 112 Z",
        fill: "accent-soft",
        opacity: 0.74,
      },
      {
        kind: "path",
        d: "M104 134 L104 127 A2.75 2.75 0 0 1 109.5 127 L109.5 134 Z M117 135 L117 128 A2.75 2.75 0 0 1 122.5 128 L122.5 135 Z M130 137 L130 130 A2.75 2.75 0 0 1 135.5 130 L135.5 137 Z M143 138 L143 131 A2.75 2.75 0 0 1 148.5 131 L148.5 138 Z",
        fill: "paper",
        opacity: 0.66,
      },

      // Plane 4: Moat counterscarp wall, pure white coral-sand beach spit & layered Gulf shallows
      { kind: "path", d: "M16 146 L96 151 L166 146 L166 156 L96 160 L16 155 Z", fill: "far" },
      { kind: "rect", x: 11, y: 154, width: 158, height: 75, fill: "mid" },
      // Sweeping luminous white coral-sand beach spit curving from left edge
      { kind: "path", d: "M11 152 Q52 152 96 164 Q64 176 11 178 Z", fill: "paper", opacity: 0.94 },
      // Banded turquoise Gulf coral shallows & rhythmic wave lines
      { kind: "path", d: "M11 180 Q68 172 122 182 Q148 186 169 180 L169 202 Q116 208 66 200 Q34 196 11 202 Z", fill: "far", opacity: 0.54 },
      { kind: "path", d: "M18 186 Q56 180 96 186 T164 186", stroke: "paper", strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.84 },
      { kind: "path", d: "M28 202 Q68 196 110 202 T160 202", stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.72 },
      { kind: "path", d: "M14 216 Q60 210 108 216 T166 216", stroke: "accent-soft", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.65 },

      // Plane 5: Foreground dark coral-head reef rim anchoring lower corners
      { kind: "path", d: "M11 206 Q36 210 54 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 212 Q146 214 132 229 L169 229 Z", fill: "deep" },
    ],
  },

  // =========================================================================
  // 6. EVER — Everglades National Park (FL)
  // =========================================================================
  {
    code: "EVER",
    subject: "Golden sunrise over the sawgrass River of Grass, cypress domes & poised Great Blue Heron",
    accentLight: "#C9853A",
    accentDark: "#EEB46E",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Expansive low subtropical sunrise & golden dawn cloud ribbons
      { kind: "circle", cx: 90, cy: 96, r: 44, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 90, cy: 96, r: 28, fill: "accent-soft", opacity: 0.44 },
      { kind: "circle", cx: 90, cy: 96, r: 17, fill: "accent", opacity: 0.94 },
      { kind: "circle", cx: 90, cy: 96, r: 10, fill: "paper", opacity: 0.78 },
      { kind: "path", d: "M14 34 Q52 28 96 34 Q64 38 14 34 Z", fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M94 50 Q130 44 166 50 Q136 54 94 50 Z", fill: "accent-soft", opacity: 0.58 },
      { kind: "path", d: "M22 64 Q56 60 88 64 Q60 67 22 64 Z", fill: "accent-soft", opacity: 0.48 },

      // Plane 2: Razor-flat Everglades horizon, cypress-dome hammocks & endless sawgrass prairie
      { kind: "rect", x: 11, y: 98, width: 158, height: 42, fill: "far" },
      // Signature domed cypress-head hammock islands resting on the flat horizon
      { kind: "path", d: "M11 100 Q24 84 42 88 Q54 90 62 100 Z", fill: "mid" },
      { kind: "path", d: "M118 100 Q132 82 148 88 Q158 92 169 100 Z", fill: "mid" },
      { kind: "path", d: "M14 102 Q26 90 42 94 Q50 96 56 102 Z", fill: "ink", opacity: 0.62 },
      // Endless golden-green sawgrass prairie flats
      { kind: "path", d: "M11 106 L169 106 L169 144 L11 144 Z", fill: "mid" },
      { kind: "path", d: "M11 112 L169 112 M11 122 L169 122 M11 132 L169 132", stroke: "accent-soft", strokeWidth: 1.6, opacity: 0.54 },

      // Plane 3: Still reflective slough water, sunrise reflection & floating lily pads
      { kind: "path", d: "M11 138 Q62 132 118 138 Q146 140 169 136 L169 229 L11 229 Z", fill: "ink" },
      // Shimmering vertical golden sunrise path on mirror slough water
      { kind: "ellipse", cx: 90, cy: 148, rx: 28, ry: 3.2, fill: "accent", opacity: 0.82 },
      { kind: "ellipse", cx: 90, cy: 158, rx: 34, ry: 3.6, fill: "accent-soft", opacity: 0.78 },
      { kind: "ellipse", cx: 90, cy: 170, rx: 26, ry: 3, fill: "accent", opacity: 0.68 },
      { kind: "line", x1: 72, y1: 148, x2: 108, y2: 148, stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.86 },
      { kind: "line", x1: 66, y1: 162, x2: 114, y2: 162, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.72 },
      // Floating water lily pads & crisp white lily blossom
      { kind: "ellipse", cx: 56, cy: 204, rx: 12, ry: 3.8, fill: "deep" },
      { kind: "ellipse", cx: 128, cy: 196, rx: 14, ry: 4.2, fill: "deep" },
      { kind: "ellipse", cx: 112, cy: 212, rx: 10, ry: 3.2, fill: "deep" },
      { kind: "path", d: "M122 195 L125 189 L128 194 L131 189 L134 195 Z", fill: "paper", opacity: 0.94 },

      // Plane 4: Hero poised Great Blue Heron standing in the reflective slough
      // Long slender wading legs & subtle water rings
      { kind: "line", x1: 80, y1: 154, x2: 78, y2: 196, stroke: "deep", strokeWidth: 2.3, strokeLinecap: "round" },
      { kind: "path", d: "M89 154 L94 174 L88 196", stroke: "deep", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" },
      { kind: "ellipse", cx: 78, cy: 197, rx: 9, ry: 2.4, stroke: "paper", strokeWidth: 1.2, opacity: 0.78 },
      { kind: "ellipse", cx: 88, cy: 197, rx: 10, ry: 2.6, stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.74 },
      // Streamlined plumed heron body & folded slate wing
      {
        kind: "path",
        d: "M64 148 C68 130 88 124 102 132 C108 136 108 148 98 154 C84 160 70 156 64 148 Z",
        fill: "deep",
      },
      // Sunlit wing shoulder highlight & trailing tail feathers
      { kind: "path", d: "M72 138 C82 130 94 130 100 136 C92 142 78 144 72 138 Z", fill: "far", opacity: 0.52 },
      { kind: "path", d: "M65 147 L52 158 L68 154 Z", fill: "deep" },
      // Graceful S-curved neck, crested head & sharp hunting bill
      {
        kind: "path",
        d: "M96 134 C106 120 108 106 100 96 C94 88 98 78 106 76",
        stroke: "deep",
        strokeWidth: 4.4,
        strokeLinecap: "round",
      },
      { kind: "ellipse", cx: 108, cy: 76, rx: 5.5, ry: 3.4, fill: "deep" },
      { kind: "path", d: "M104 75 L93 72 L103 77 Z", fill: "deep" },
      { kind: "polygon", points: "112,74 128,77 112,79", fill: "accent" },

      // Plane 5: Tall curving sawgrass reeds & cattails framing both sides
      {
        kind: "path",
        d: "M11 229 L20 144 M18 229 L32 156 M26 229 L44 176 M34 229 L22 178 M169 229 L158 140 M162 229 L148 154 M154 229 L138 176 M146 229 L160 172",
        stroke: "deep",
        strokeWidth: 2.8,
        strokeLinecap: "round",
      },
      { kind: "path", d: "M11 212 Q36 216 50 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 212 Q144 216 130 229 L169 229 Z", fill: "deep" },
    ],
  },

  // =========================================================================
  // 7. HOSP — Hot Springs National Park (AR)
  // =========================================================================
  {
    code: "HOSP",
    subject: "Historic Spanish-Renaissance Bathhouse Row domes, Hot Springs Mountain & steaming thermal cascade",
    accentLight: "#B87C46",
    accentDark: "#E4AF7A",
    skyMood: "mist",
    nodes: [
      // Plane 1: Soft misty Ouachita morning sky & diffused sun
      { kind: "circle", cx: 90, cy: 32, r: 22, fill: "accent-soft", opacity: 0.42 },
      { kind: "circle", cx: 90, cy: 32, r: 10, fill: "paper", opacity: 0.92 },
      { kind: "path", d: "M16 42 Q52 34 90 42 Q128 34 164 42 Q128 48 90 46 Q52 48 16 42 Z", fill: "paper", opacity: 0.5 },

      // Plane 2: Wooded Hot Springs Mountain & subtle summit observation tower
      {
        kind: "path",
        d: "M11 86 Q44 58 84 64 Q120 52 169 78 L169 124 L11 124 Z",
        fill: "far",
      },
      // Tiny Hot Springs Mountain Tower silhouette on the high eastern crest
      { kind: "rect", x: 125, y: 40, width: 3.5, height: 22, fill: "ink", opacity: 0.72 },
      { kind: "rect", x: 122.5, y: 40, width: 8.5, height: 3.5, rx: 1, fill: "ink", opacity: 0.78 },
      // Closer lush wooded hillside directly cradling Bathhouse Row
      {
        kind: "path",
        d: "M11 98 Q32 76 58 84 Q88 70 118 82 Q146 72 169 92 L169 136 L11 136 Z",
        fill: "mid",
      },

      // Plane 3: Hero Spanish-Renaissance Bathhouse Row (Fordyce / Maurice domes & arched colonnade)
      // Main ivory stucco Bathhouse Row pavilion & side wings
      { kind: "rect", x: 26, y: 100, width: 128, height: 42, fill: "paper" },
      { kind: "rect", x: 26, y: 100, width: 28, height: 42, fill: "far", opacity: 0.42 },
      { kind: "rect", x: 126, y: 100, width: 28, height: 42, fill: "far", opacity: 0.42 },
      // Terracotta Spanish-tile roofs & central arched pediment gable
      { kind: "polygon", points: "22,102 34,90 146,90 158,102", fill: "accent" },
      { kind: "path", d: "M74 102 L74 88 Q90 76 106 88 L106 102 Z", fill: "paper" },
      { kind: "path", d: "M72 89 Q90 74 108 89", stroke: "accent", strokeWidth: 3.2, strokeLinecap: "round" },
      // Iconic twin Spanish-Renaissance terracotta domes & finials
      { kind: "path", d: "M58 92 C58 76 74 76 74 92 Z", fill: "accent" },
      { kind: "path", d: "M106 92 C106 76 122 76 122 92 Z", fill: "accent" },
      { kind: "path", d: "M63 91 C63 81 69 81 69 91 M111 91 C111 81 117 81 117 91", stroke: "paper", strokeWidth: 1.1, opacity: 0.72 },
      { kind: "line", x1: 66, y1: 79, x2: 66, y2: 72, stroke: "deep", strokeWidth: 1.5, strokeLinecap: "round" },
      { kind: "line", x1: 114, y1: 79, x2: 114, y2: 72, stroke: "deep", strokeWidth: 1.5, strokeLinecap: "round" },
      // Graceful arched Spanish-Renaissance colonnade loggia windows
      { kind: "rect", x: 35, y: 112, width: 12, height: 22, rx: 6, fill: "deep" },
      { kind: "rect", x: 56, y: 112, width: 12, height: 22, rx: 6, fill: "deep" },
      { kind: "rect", x: 82, y: 108, width: 16, height: 28, rx: 8, fill: "deep" },
      { kind: "rect", x: 112, y: 112, width: 12, height: 22, rx: 6, fill: "deep" },
      { kind: "rect", x: 133, y: 112, width: 12, height: 22, rx: 6, fill: "deep" },
      // Warm amber interior glass glow inside central arched portal
      { kind: "rect", x: 85, y: 112, width: 10, height: 14, rx: 5, fill: "accent-soft", opacity: 0.74 },
      // Promenade magnolia canopies flanking Bathhouse Row
      { kind: "path", d: "M11 102 Q24 94 32 110 Q36 128 24 142 L11 142 Z", fill: "ink" },
      { kind: "path", d: "M169 102 Q156 94 148 110 Q144 128 156 142 L169 142 Z", fill: "ink" },

      // Plane 4: Terraced stone tufa thermal cascade & steaming mineral fountain basins
      { kind: "rect", x: 11, y: 140, width: 158, height: 89, fill: "ink" },
      { kind: "line", x1: 11, y1: 142, x2: 169, y2: 142, stroke: "accent-soft", strokeWidth: 2.2, opacity: 0.85 },
      // Upper stepped travertine/tufa thermal basin
      { kind: "path", d: "M24 156 Q90 148 156 156 L148 176 Q90 170 32 176 Z", fill: "mid" },
      { kind: "ellipse", cx: 90, cy: 158, rx: 54, ry: 5.5, fill: "accent-soft", opacity: 0.84 },
      { kind: "ellipse", cx: 90, cy: 158, rx: 38, ry: 3, fill: "paper", opacity: 0.82 },
      // Lower foreground stone tufa basin & spilling thermal water veil
      { kind: "path", d: "M11 182 Q90 172 169 182 L169 229 L11 229 Z", fill: "deep" },
      { kind: "ellipse", cx: 90, cy: 186, rx: 66, ry: 7.5, fill: "mid", opacity: 0.88 },
      { kind: "ellipse", cx: 90, cy: 186, rx: 48, ry: 4.5, fill: "accent-soft", opacity: 0.78 },
      {
        kind: "path",
        d: "M74 162 L72 184 M84 162 L84 186 M96 162 L96 186 M106 162 L108 184",
        stroke: "paper",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.84,
      },
      { kind: "path", d: "M28 206 Q90 198 152 206", stroke: "accent", strokeWidth: 2, strokeLinecap: "round", opacity: 0.74 },

      // Plane 5: Luminous rising geothermal mineral steam ribbons curling softly upward
      {
        kind: "path",
        d: "M54 186 C46 168 62 156 54 138 C48 124 60 116 56 106",
        stroke: "paper",
        strokeWidth: 3.4,
        strokeLinecap: "round",
        opacity: 0.56,
      },
      {
        kind: "path",
        d: "M90 184 C80 166 100 152 88 134 C80 120 96 110 90 98",
        stroke: "paper",
        strokeWidth: 4.2,
        strokeLinecap: "round",
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M126 186 C134 168 118 156 126 138 C132 124 120 116 124 106",
        stroke: "accent-soft",
        strokeWidth: 3.2,
        strokeLinecap: "round",
        opacity: 0.58,
      },
    ],
  },

  // =========================================================================
  // 8. ISRO — Isle Royale National Park (MI)
  // =========================================================================
  {
    code: "ISRO",
    subject: "Lake Superior boreal basalt cove, Rock Harbor Lighthouse & wading bull moose at dawn",
    accentLight: "#3D8580",
    accentDark: "#7EC4BE",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Cool northern Lake Superior dawn sky, sun & calm horizon clouds
      { kind: "circle", cx: 128, cy: 52, r: 24, fill: "accent-soft", opacity: 0.38 },
      { kind: "circle", cx: 128, cy: 52, r: 12, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M16 36 Q48 30 82 36 Q56 40 16 36 Z", fill: "paper", opacity: 0.64 },
      { kind: "path", d: "M88 64 Q124 58 164 64 Q134 68 88 64 Z", fill: "accent-soft", opacity: 0.54 },

      // Plane 2: Long glacially striated Lake Superior archipelago islands & Rock Harbor Lighthouse
      {
        kind: "path",
        d: "M11 100 L38 94 L76 98 L112 94 L169 98 L169 114 L11 114 Z",
        fill: "far",
      },
      // Closer forested basalt point supporting Rock Harbor Lighthouse on the right
      {
        kind: "path",
        d: "M84 114 Q112 100 144 102 L169 108 L169 120 L84 120 Z",
        fill: "ink",
      },
      // Crisp white Rock Harbor Lighthouse & tiny keeper's house on the rocky point
      { kind: "path", d: "M128 104 L130 74 L136 74 L138 104 Z", fill: "paper" },
      { kind: "rect", x: 138, y: 94, width: 12, height: 10, fill: "paper", opacity: 0.92 },
      { kind: "polygon", points: "137,94 144,89 151,94", fill: "accent" },
      { kind: "rect", x: 129, y: 72, width: 8, height: 2.5, fill: "deep" },
      { kind: "rect", x: 130.5, y: 67, width: 5, height: 5, fill: "accent" },
      { kind: "polygon", points: "133,62 129.5,67 136.5,67", fill: "deep" },
      // Spruce spires dotting the far lighthouse point
      { kind: "polygon", points: "112,86 106,108 118,108", fill: "deep" },
      { kind: "polygon", points: "156,82 149,108 163,108", fill: "deep" },
      // Soft northern cove dawn mist ribbon
      { kind: "ellipse", cx: 88, cy: 116, rx: 72, ry: 6, fill: "paper", opacity: 0.44 },

      // Plane 3: Glassy Lake Superior cove water & dawn reflections
      { kind: "rect", x: 11, y: 116, width: 158, height: 113, fill: "mid" },
      { kind: "rect", x: 11, y: 116, width: 158, height: 34, fill: "far", opacity: 0.46 },
      // Sun & lighthouse dawn shimmer across the cove
      { kind: "ellipse", cx: 132, cy: 128, rx: 22, ry: 2.6, fill: "paper", opacity: 0.72 },
      { kind: "ellipse", cx: 130, cy: 140, rx: 28, ry: 3, fill: "accent-soft", opacity: 0.64 },
      { kind: "line", x1: 108, y1: 152, x2: 152, y2: 152, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.62 },
      // Left boreal basalt headland with jagged spruce silhouettes
      { kind: "path", d: "M11 124 Q36 118 58 134 L11 138 Z", fill: "ink" },
      { kind: "polygon", points: "22,94 13,128 31,128", fill: "deep" },
      { kind: "polygon", points: "36,102 28,132 44,132", fill: "deep" },
      { kind: "polygon", points: "48,112 42,134 54,134", fill: "deep" },

      // Plane 4: Hero antlered bull moose wading in the misty foreground cove
      // Soft dark reflection on the glassy cove water beneath the moose
      { kind: "ellipse", cx: 86, cy: 204, rx: 30, ry: 7, fill: "ink", opacity: 0.42 },
      // Bull moose body: unmistakable humped shoulder, deep chest, trailing bell & sturdy legs
      {
        kind: "path",
        d: "M54 176 C54 162 64 156 76 154 C84 146 96 144 104 152 L114 156 C120 158 124 164 122 170 C118 174 112 172 108 172 L106 178 L102 176 L102 200 L97 200 L96 178 L88 179 L87 198 L82 198 L82 179 L68 180 L67 200 L62 200 L62 182 L58 198 L54 198 Z",
        fill: "deep",
      },
      // Sunlit dawn rim-light along the bull moose's high shoulder hump & back
      { kind: "path", d: "M62 158 Q80 148 98 148", stroke: "accent-soft", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.72 },
      // Broad sculpted palmate bull moose antlers silhouetted against the bright cove
      {
        kind: "path",
        d: "M108 154 C104 142 94 134 86 134 C90 139 92 142 96 144 L91 142 L95 148 L104 155 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M111 154 C112 140 122 132 132 134 C128 139 125 142 121 144 L128 143 L123 149 L114 156 Z",
        fill: "deep",
      },
      // Crisp wading water ripples encircling the moose's legs
      { kind: "ellipse", cx: 64, cy: 200, rx: 10, ry: 2.4, stroke: "paper", strokeWidth: 1.2, opacity: 0.78 },
      { kind: "ellipse", cx: 98, cy: 200, rx: 12, ry: 2.6, stroke: "paper", strokeWidth: 1.3, opacity: 0.82 },
      { kind: "line", x1: 38, y1: 210, x2: 140, y2: 210, stroke: "accent-soft", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.65 },

      // Plane 5: Foreground glacially striated Lake Superior basalt shoreline ledges
      { kind: "path", d: "M11 200 Q34 206 52 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 204 Q142 208 122 229 L169 229 Z", fill: "deep" },
      { kind: "path", d: "M11 202 Q32 208 46 222", stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.65 },
    ],
  },

  // =========================================================================
  // 9. JEFF — Gateway Arch National Park (MO)
  // =========================================================================
  {
    code: "JEFF",
    subject: "Eero Saarinen's 630-foot weighted-catenary stainless Gateway Arch & Mississippi River reflection",
    accentLight: "#C77442",
    accentDark: "#EEAA78",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Radiant Mississippi River dawn sky & rising sun framed beneath the Arch
      { kind: "circle", cx: 90, cy: 112, r: 44, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 90, cy: 112, r: 28, fill: "accent-soft", opacity: 0.44 },
      { kind: "circle", cx: 90, cy: 112, r: 16, fill: "accent", opacity: 0.92 },
      { kind: "circle", cx: 90, cy: 112, r: 9, fill: "paper", opacity: 0.8 },
      { kind: "path", d: "M16 32 Q42 26 68 32 Q48 36 16 32 Z", fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M114 38 Q140 32 166 38 Q144 42 114 38 Z", fill: "paper", opacity: 0.58 },
      { kind: "path", d: "M18 58 Q46 53 74 58 Q50 61 18 58 Z", fill: "accent-soft", opacity: 0.46 },
      { kind: "path", d: "M112 64 Q138 59 164 64 Q142 67 112 64 Z", fill: "accent-soft", opacity: 0.46 },

      // Plane 2: Distant Illinois floodplain treeline & subtle historic St. Louis civic skyline
      {
        kind: "path",
        d: "M11 146 Q46 140 90 144 Q134 140 169 146 L169 160 L11 160 Z",
        fill: "far",
      },
      // Subtle Old Courthouse copper dome silhouette centered low on the riverfront park
      { kind: "path", d: "M82 148 C82 138 98 138 98 148 Z", fill: "mid", opacity: 0.72 },
      { kind: "line", x1: 90, y1: 134, x2: 90, y2: 140, stroke: "mid", strokeWidth: 1.4, opacity: 0.72 },
      // Riverfront green levee parkland terrace
      { kind: "path", d: "M11 150 Q52 146 90 149 Q128 146 169 150 L169 162 L11 162 Z", fill: "ink" },

      // Plane 3: Hero Eero Saarinen's 630-foot weighted-catenary stainless-steel Gateway Arch
      // Full tapered weighted-catenary arch mass (outer profile wider at legs, razor-sleek at crown)
      {
        kind: "path",
        d: "M34 158 C44 68 64 24 90 24 C116 24 136 68 146 158 L131 158 C124 78 109 34 90 34 C71 34 56 78 49 158 Z",
        fill: "paper",
      },
      // Shadowed west-facing stainless facet (left outer bevel + right inner triangular face)
      {
        kind: "path",
        d: "M34 158 C44 68 64 24 90 24 L90 29 C67 29 50 72 42 158 Z",
        fill: "mid",
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M90 29 C113 29 130 72 138 158 L131 158 C124 78 109 34 90 34 Z",
        fill: "ink",
        opacity: 0.74,
      },
      // Warm dawn-lit sunlit inner steel facet catching golden sunrise glow
      {
        kind: "path",
        d: "M42 158 C50 72 67 29 90 29 L90 34 C71 34 56 78 49 158 Z",
        fill: "accent-soft",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M90 24 C116 24 136 68 146 158 L138 158 C130 72 113 29 90 29 Z",
        fill: "paper",
        opacity: 0.94,
      },
      // Razor-crisp triangular stainless-steel central spine ridge
      {
        kind: "path",
        d: "M42 158 C50 72 67 29 90 29 C113 29 130 72 138 158",
        stroke: "deep",
        strokeWidth: 1.1,
        opacity: 0.56,
      },
      // Outer sunlit steel rim gleam
      {
        kind: "path",
        d: "M34 158 C44 68 64 24 90 24 C116 24 136 68 146 158",
        stroke: "paper",
        strokeWidth: 1.2,
        opacity: 0.82,
      },

      // Plane 4: Wide sweeping Mississippi River & luminous inverted Arch reflection
      { kind: "rect", x: 11, y: 158, width: 158, height: 71, fill: "mid" },
      { kind: "rect", x: 11, y: 158, width: 158, height: 22, fill: "ink", opacity: 0.34 },
      // Inverted catenary Gateway Arch reflection shimmering across the river
      {
        kind: "path",
        d: "M38 160 C48 202 68 218 90 218 C112 218 132 202 142 160 L132 160 C124 196 108 210 90 210 C72 210 56 196 48 160 Z",
        fill: "paper",
        opacity: 0.54,
      },
      // Shimmering sunrise reflection bars & horizontal Mississippi current ripples
      { kind: "ellipse", cx: 90, cy: 170, rx: 24, ry: 2.8, fill: "accent", opacity: 0.72 },
      { kind: "ellipse", cx: 90, cy: 182, rx: 30, ry: 3.2, fill: "accent-soft", opacity: 0.66 },
      { kind: "line", x1: 24, y1: 168, x2: 156, y2: 168, stroke: "mid", strokeWidth: 1.6, opacity: 0.65 },
      { kind: "line", x1: 30, y1: 180, x2: 150, y2: 180, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.64 },
      { kind: "line", x1: 36, y1: 194, x2: 144, y2: 194, stroke: "mid", strokeWidth: 1.6, opacity: 0.62 },
      { kind: "line", x1: 48, y1: 204, x2: 132, y2: 204, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.58 },

      // Plane 5: Historic St. Louis riverfront stone balustrade & levee trees framing edges
      { kind: "path", d: "M11 208 Q90 202 169 208 L169 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M11 208 Q90 202 169 208", stroke: "accent-soft", strokeWidth: 2, opacity: 0.84 },
      // Rhythmic balustrade coping pillars along the riverfront overlook
      {
        kind: "path",
        d: "M26 212 L26 226 M48 210 L48 226 M70 209 L70 226 M90 208 L90 226 M110 209 L110 226 M132 210 L132 226 M154 212 L154 226",
        stroke: "ink",
        strokeWidth: 3.2,
        opacity: 0.78,
      },
      // Subtle park tree silhouettes framing far left & right riverfront edges
      { kind: "path", d: "M11 134 Q24 128 30 144 Q26 156 11 158 Z", fill: "deep" },
      { kind: "path", d: "M169 134 Q156 128 150 144 Q154 156 169 158 Z", fill: "deep" },
    ],
  },

  // =========================================================================
  // 10. NPSA — National Park of American Samoa (AS) [unvisited — high tonal contrast]
  // =========================================================================
  {
    code: "NPSA",
    subject: "Sheer volcanic Pola Island sea-spire, rainforest Tutuila peaks & turquoise coral lagoon",
    accentLight: "#2A9486",
    accentDark: "#6BD4C6",
    skyMood: "noon",
    nodes: [
      // Plane 1: Bright South Pacific sky, noon sun, towering trade-wind clouds & tropicbirds
      { kind: "circle", cx: 44, cy: 36, r: 20, fill: "accent-soft", opacity: 0.38 },
      { kind: "circle", cx: 44, cy: 36, r: 10, fill: "paper", opacity: 0.98 },
      { kind: "path", d: "M64 46 Q78 32 94 38 Q106 26 122 36 Q134 32 142 46 Z", fill: "paper", opacity: 0.84 },
      { kind: "path", d: "M14 58 Q28 50 44 56 Q54 52 62 58 Z", fill: "paper", opacity: 0.72 },
      { kind: "path", d: "M76 62 Q81 57 86 62 Q91 57 96 62", stroke: "deep", strokeWidth: 1.3, strokeLinecap: "round" },

      // Plane 2: Steep fluted volcanic rainforest peaks of Tutuila
      {
        kind: "path",
        d: "M11 60 L34 74 L52 66 L76 92 L98 112 L114 140 L11 140 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M11 76 L28 84 L48 76 L68 104 L96 138 L11 138 Z",
        fill: "ink",
      },
      // Sunlit tropical ridge flutes & mist ribbon for rich grayscale separation
      { kind: "path", d: "M48 76 L56 106 L74 134", stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.68 },
      { kind: "path", d: "M28 84 L38 112 L48 134", stroke: "mid", strokeWidth: 2, strokeLinecap: "round", opacity: 0.72 },
      { kind: "path", d: "M18 114 Q52 106 86 116 Q56 122 18 114 Z", fill: "paper", opacity: 0.46 },

      // Plane 3: Hero Pola Island (Cockscomb) sheer volcanic sea-cliff spire rising from the surf
      {
        kind: "path",
        d: "M102 146 L112 72 L118 46 L124 54 L130 38 L138 56 L146 78 L154 146 Z",
        fill: "deep",
      },
      // Dramatic sunlit left volcanic cliff facet & vertical basalt flutings on Pola Island
      {
        kind: "path",
        d: "M118 46 L124 54 L130 38 L128 144 L104 144 L112 72 Z",
        fill: "mid",
        opacity: 0.68,
      },
      { kind: "path", d: "M118 46 L112 72 L106 140", stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.86 },
      { kind: "line", x1: 130, y1: 42, x2: 134, y2: 142, stroke: "deep", strokeWidth: 1.8, opacity: 0.78 },
      // Smaller jagged basalt sea-stack beside Pola Island
      { kind: "path", d: "M154 146 L160 104 L169 112 L169 146 Z", fill: "ink" },

      // Plane 4: Foaming South Pacific reef breakers, turquoise lagoon & curving white-sand bay
      { kind: "rect", x: 11, y: 138, width: 158, height: 91, fill: "mid" },
      // Bright explosive white surf collar crashing against Pola Island & outer reef
      {
        kind: "path",
        d: "M82 144 Q106 134 128 142 Q148 134 169 144 Q142 152 82 144 Z",
        fill: "paper",
        opacity: 0.96,
      },
      // Radiant lighter coral-reef lagoon band
      {
        kind: "path",
        d: "M11 154 Q66 148 118 160 Q146 166 169 162 L169 194 Q120 202 72 190 Q38 182 11 190 Z",
        fill: "far",
        opacity: 0.68,
      },
      // Sweeping pure white-sand South Pacific bay curve
      {
        kind: "path",
        d: "M11 164 Q56 168 96 188 Q116 198 134 218 L11 229 Z",
        fill: "paper",
        opacity: 0.96,
      },
      // Crisp lagoon wave ribbons sweeping along the sandy crescent
      { kind: "path", d: "M64 164 Q106 160 162 172", stroke: "paper", strokeWidth: 2, strokeLinecap: "round", opacity: 0.88 },
      { kind: "path", d: "M94 180 Q130 178 166 188", stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.76 },

      // Plane 5: Foreground curving volcanic beach headland & silhouetted swaying coconut palms
      { kind: "path", d: "M11 182 Q48 188 76 212 L88 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 202 Q146 206 132 229 L169 229 Z", fill: "deep" },
      // Tall gracefully arching foreground coconut palm on left bay headland
      { kind: "path", d: "M28 214 Q26 164 52 126", stroke: "deep", strokeWidth: 4.2, strokeLinecap: "round" },
      {
        kind: "path",
        d: "M52 126 Q34 114 16 124 M52 126 Q36 126 22 140 M52 126 Q48 106 34 104 M52 126 Q66 110 80 118 M52 126 Q70 124 82 138 M52 126 Q60 134 64 150",
        stroke: "deep",
        strokeWidth: 2.6,
        strokeLinecap: "round",
      },
      // Secondary companion palm curving lower along the sand
      { kind: "path", d: "M48 220 Q56 188 74 166", stroke: "deep", strokeWidth: 3.2, strokeLinecap: "round" },
      {
        kind: "path",
        d: "M74 166 Q60 158 48 166 M74 166 Q72 152 60 150 M74 166 Q88 156 98 164 M74 166 Q88 168 94 180",
        stroke: "deep",
        strokeWidth: 2.2,
        strokeLinecap: "round",
      },
    ],
  },

  // =========================================================================
  // 11. SHEN — Shenandoah National Park (VA)
  // =========================================================================
  {
    code: "SHEN",
    subject: "Skyline Drive stone overlook curving along rolling golden-autumn Blue Ridge sunset crests",
    accentLight: "#C96A3A",
    accentDark: "#EF9E70",
    skyMood: "dusk",
    nodes: [
      // Plane 1: Clear golden-autumn Blue Ridge sunset sky & twilight clouds
      { kind: "circle", cx: 56, cy: 74, r: 34, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 56, cy: 74, r: 21, fill: "accent-soft", opacity: 0.46 },
      { kind: "circle", cx: 56, cy: 74, r: 12, fill: "accent", opacity: 0.94 },
      { kind: "circle", cx: 56, cy: 74, r: 6.5, fill: "paper", opacity: 0.84 },
      { kind: "path", d: "M18 32 Q56 26 98 33 Q64 37 18 32 Z", fill: "accent-soft", opacity: 0.52 },
      { kind: "path", d: "M96 46 Q132 40 166 46 Q138 50 96 46 Z", fill: "paper", opacity: 0.5 },
      { kind: "path", d: "M108 62 Q138 58 164 62 Q142 65 108 62 Z", fill: "accent-soft", opacity: 0.44 },

      // Plane 2: Four sweeping, crisp sunset-lit Blue Ridge mountain swells (distinct from misty GRSM)
      {
        kind: "path",
        d: "M11 88 Q44 74 82 84 Q124 72 169 86 L169 126 L11 126 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M11 102 Q52 84 96 98 Q134 86 169 100 L169 140 L11 140 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M11 102 Q52 84 96 98 Q134 86 169 100",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        opacity: 0.76,
      },
      {
        kind: "path",
        d: "M11 120 Q46 102 88 118 Q130 104 169 118 L169 158 L11 158 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M11 120 Q46 102 88 118 Q130 104 169 118",
        stroke: "accent",
        strokeWidth: 1.8,
        opacity: 0.82,
      },

      // Plane 3: Autumn hardwood ridge & sweeping S-curving ribbon of Skyline Drive
      {
        kind: "path",
        d: "M11 148 Q58 130 112 136 Q144 128 169 136 L169 229 L11 229 Z",
        fill: "ink",
      },
      // Vibrant golden-amber autumn oak & maple canopy swells along the mountain slope
      { kind: "ellipse", cx: 48, cy: 144, rx: 20, ry: 9, fill: "accent", opacity: 0.56 },
      { kind: "ellipse", cx: 132, cy: 138, rx: 22, ry: 9, fill: "accent", opacity: 0.58 },
      { kind: "ellipse", cx: 92, cy: 146, rx: 18, ry: 8, fill: "accent-soft", opacity: 0.44 },
      // Sweeping winding asphalt ribbon of Skyline Drive hugging the Blue Ridge crest
      {
        kind: "path",
        d: "M169 144 C136 146 98 152 84 164 C72 174 106 184 136 196 C152 202 162 212 169 229 L116 229 C104 206 54 188 58 168 C62 150 118 140 169 138 Z",
        fill: "far",
        opacity: 0.86,
      },
      // Crisp dashed golden-white center highway stripe along Skyline Drive
      {
        kind: "path",
        d: "M166 141 C124 143 74 152 70 168 C68 182 122 198 144 229",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeDasharray: "6 5",
        opacity: 0.9,
      },

      // Plane 4: Hero foreground CCC dry-laid stone overlook parapet wall
      {
        kind: "path",
        d: "M11 168 Q56 172 94 192 Q120 206 138 229 L11 229 Z",
        fill: "deep",
      },
      // Sunlit flat stone coping slabs along the curving overlook parapet
      {
        kind: "path",
        d: "M11 168 Q56 172 94 192 Q120 206 138 229",
        stroke: "accent-soft",
        strokeWidth: 3.4,
        strokeLinecap: "round",
        opacity: 0.92,
      },
      // Hand-laid Virginia greenstone masonry coursing lines on the stone parapet face
      {
        kind: "path",
        d: "M11 180 Q52 184 88 202 Q108 212 122 229",
        stroke: "mid",
        strokeWidth: 1.4,
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M11 194 Q46 198 80 214 Q94 220 104 229",
        stroke: "mid",
        strokeWidth: 1.4,
        opacity: 0.68,
      },
      {
        kind: "path",
        d: "M32 170 L30 194 M56 176 L52 204 M78 186 L72 214 M98 198 L90 222",
        stroke: "accent",
        strokeWidth: 1.2,
        opacity: 0.56,
      },

      // Plane 5: Silhouetted autumn oak tree framing the left overlook & hemlock bluff at right
      { kind: "path", d: "M24 176 L26 118 M26 136 L42 126 M26 146 L14 138", stroke: "deep", strokeWidth: 3.2, strokeLinecap: "round" },
      { kind: "ellipse", cx: 24, cy: 118, rx: 14, ry: 8, fill: "deep" },
      { kind: "ellipse", cx: 38, cy: 126, rx: 11, ry: 6.5, fill: "deep" },
      { kind: "ellipse", cx: 34, cy: 120, rx: 8, ry: 4.5, fill: "accent", opacity: 0.74 },
      { kind: "path", d: "M169 178 L152 186 L144 208 L156 229 L169 229 Z", fill: "deep" },
    ],
  },

  // =========================================================================
  // 12. VIIS — Virgin Islands National Park (VI)
  // =========================================================================
  {
    code: "VIIS",
    subject: "Elevated St. John overlook above Trunk Bay's white-sand crescent, Trunk Cay coral islet & reef",
    accentLight: "#21969B",
    accentDark: "#66D4D9",
    skyMood: "noon",
    nodes: [
      // Plane 1: Clear radiant Caribbean noon sky, sun & drifting trade-wind clouds
      { kind: "circle", cx: 134, cy: 32, r: 19, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 134, cy: 32, r: 10, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M18 34 Q32 24 48 30 Q60 22 76 30 Q86 28 94 34 Z", fill: "paper", opacity: 0.84 },
      { kind: "path", d: "M108 52 Q124 44 142 50 Q154 46 166 52 Z", fill: "paper", opacity: 0.72 },
      { kind: "path", d: "M78 48 Q83 43 88 48 Q93 43 98 48", stroke: "ink", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.72 },

      // Plane 2: Distant British Virgin Islands & deep open Caribbean horizon
      { kind: "path", d: "M11 78 Q32 66 54 74 Q78 66 102 74 Q124 68 144 78 L11 78 Z", fill: "far", opacity: 0.76 },
      { kind: "rect", x: 11, y: 78, width: 158, height: 34, fill: "mid" },

      // Plane 3: Hero elevated vista of Trunk Bay turquoise reef shallows, Trunk Cay & white-sand crescent
      // Radiant layered turquoise Caribbean coral-reef shallows filling the bay
      { kind: "rect", x: 11, y: 102, width: 158, height: 86, fill: "accent" },
      // Luminous sunlit shallow reef sandbars glowing around Trunk Cay & crescent beach
      {
        kind: "path",
        d: "M11 132 Q58 118 104 128 Q142 134 169 118 L169 168 Q112 184 54 176 Q26 172 11 164 Z",
        fill: "accent-soft",
        opacity: 0.74,
      },
      // Crisp whitewater snorkeling-reef collar encircling Trunk Cay
      { kind: "ellipse", cx: 74, cy: 118, rx: 28, ry: 9.5, fill: "paper", opacity: 0.72 },
      { kind: "ellipse", cx: 74, cy: 118, rx: 23, ry: 7.2, fill: "accent-soft", opacity: 0.84 },
      // Iconic rocky emerald Trunk Cay snorkeling islet in the middle of the bay
      {
        kind: "path",
        d: "M54 118 Q62 102 74 100 Q86 102 94 118 Q74 122 54 118 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M58 114 Q68 104 78 106 Q86 108 90 115 Z",
        fill: "ink",
        opacity: 0.76,
      },

      // Lush emerald eastern St. John headland curving into the right side of Trunk Bay
      {
        kind: "path",
        d: "M169 80 Q144 86 124 102 Q116 114 128 124 Q146 132 169 128 Z",
        fill: "ink",
      },
      { kind: "path", d: "M169 92 Q148 96 132 110 Q144 122 169 122 Z", fill: "deep", opacity: 0.56 },

      // Unmistakable pure white-sand sweeping crescent beach of Trunk Bay
      {
        kind: "path",
        d: "M11 144 Q46 166 94 166 Q136 164 169 130 L169 156 Q132 188 86 188 Q42 186 11 168 Z",
        fill: "paper",
        opacity: 0.98,
      },
      // Delicate white Caribbean shoreline surf ribbons caressing the crescent sand
      {
        kind: "path",
        d: "M14 140 Q48 160 94 160 Q134 158 166 126",
        stroke: "paper",
        strokeWidth: 2,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M24 134 Q58 150 96 150 Q128 148 154 126",
        stroke: "paper",
        strokeWidth: 1.3,
        strokeLinecap: "round",
        opacity: 0.68,
      },

      // Plane 4: Emerald St. John tropical hillside slopes rising behind the crescent beach
      {
        kind: "path",
        d: "M11 162 Q48 180 90 182 Q134 182 169 148 L169 229 L11 229 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M11 182 Q58 198 108 194 Q142 190 169 172 L169 229 L11 229 Z",
        fill: "deep",
        opacity: 0.72,
      },
      // Sunlit tropical hillside foliage contour swells
      { kind: "ellipse", cx: 56, cy: 192, rx: 22, ry: 9, fill: "mid", opacity: 0.48 },
      { kind: "ellipse", cx: 126, cy: 190, rx: 24, ry: 9, fill: "mid", opacity: 0.46 },

      // Plane 5: Foreground St. John overlook tropical palms framing left & right edges
      // Left curving coconut palm silhouetted against Trunk Bay
      { kind: "path", d: "M24 226 Q22 178 44 140", stroke: "deep", strokeWidth: 3.8, strokeLinecap: "round" },
      {
        kind: "path",
        d: "M44 140 Q28 130 14 138 M44 140 Q32 142 18 154 M44 140 Q42 122 28 120 M44 140 Q58 126 70 134 M44 140 Q60 140 68 152",
        stroke: "deep",
        strokeWidth: 2.4,
        strokeLinecap: "round",
      },
      // Right curving coconut palm framing the eastern overlook
      { kind: "path", d: "M156 226 Q156 184 136 150", stroke: "deep", strokeWidth: 3.8, strokeLinecap: "round" },
      {
        kind: "path",
        d: "M136 150 Q152 140 166 148 M136 150 Q148 152 162 164 M136 150 Q138 132 152 130 M136 150 Q122 136 110 144 M136 150 Q120 150 112 162",
        stroke: "deep",
        strokeWidth: 2.4,
        strokeLinecap: "round",
      },
      { kind: "path", d: "M11 206 Q44 214 66 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 204 Q138 214 118 229 L169 229 Z", fill: "deep" },
    ],
  },
] as const
