import type { ParkArtworkSpec } from "../../types/parks.ts"

/**
 * Phase 1 pilot collection of 8 bespoke WPA-screenprint National Park poster artworks.
 *
 * Artboard: viewBox="0 0 180 240" (3:4 portrait), clipped inner print area
 * x=[14..166], y=[14..226], horizontal center x=90.
 *
 * Every artwork is composed across 5 depth planes (sky/celestial, far horizon,
 * unmistakable hero landmark, midground water/strata/detail, and foreground
 * silhouette framing) using the 6-ink dual-theme CSS palette with zero <text>.
 */
export const PILOT_PARK_ARTWORKS: readonly ParkArtworkSpec[] = [
  // =========================================================================
  // 1. GRCA — Grand Canyon National Park (AZ)
  // =========================================================================
  {
    code: "GRCA",
    subject: "Vishnu Temple, stepped sandstone strata & Inner Gorge Colorado River at dawn",
    accentLight: "#C97528",
    accentDark: "#F0AE64",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Dawn sun, soft radial rays, and high desert clouds
      { kind: "circle", cx: 90, cy: 76, r: 34, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 90, cy: 76, r: 22, fill: "accent-soft", opacity: 0.45 },
      { kind: "line", x1: 90, y1: 42, x2: 90, y2: 18, stroke: "accent-soft", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.45 },
      { kind: "line", x1: 68, y1: 48, x2: 52, y2: 24, stroke: "accent-soft", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.4 },
      { kind: "line", x1: 112, y1: 48, x2: 128, y2: 24, stroke: "accent-soft", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.4 },
      { kind: "line", x1: 52, y1: 62, x2: 26, y2: 44, stroke: "accent-soft", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.32 },
      { kind: "line", x1: 128, y1: 62, x2: 154, y2: 44, stroke: "accent-soft", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.32 },
      { kind: "circle", cx: 90, cy: 76, r: 15, fill: "accent", opacity: 0.94 },
      { kind: "path", d: "M20 34 Q42 29 66 34 Q52 37 20 34 Z", fill: "paper", opacity: 0.55 },
      { kind: "path", d: "M114 40 Q138 35 162 40 Q146 43 114 40 Z", fill: "paper", opacity: 0.5 },

      // Plane 2: Distant flat-topped North Rim plateau
      { kind: "path", d: "M12 86 L60 86 L68 92 L114 92 L122 86 L168 86 L168 128 L12 128 Z", fill: "far" },
      { kind: "line", x1: 12, y1: 91, x2: 58, y2: 91, stroke: "paper", strokeWidth: 1.1, opacity: 0.35 },
      { kind: "line", x1: 124, y1: 91, x2: 168, y2: 91, stroke: "paper", strokeWidth: 1.1, opacity: 0.35 },

      // Plane 3: Hero stepped Vishnu Temple & Zoroaster Temple sandstone buttes
      {
        kind: "path",
        d: "M12 104 L46 104 L52 114 L60 116 L66 132 L12 138 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M168 98 L142 98 L136 108 L128 110 L122 124 L112 128 L108 144 L168 144 Z",
        fill: "mid",
      },
      // Hero Vishnu Temple central ziggurat
      {
        kind: "path",
        d: "M42 156 L54 134 L62 132 L68 116 L76 114 L82 96 L87 78 L93 78 L98 96 L106 112 L114 116 L120 132 L130 136 L142 156 Z",
        fill: "ink",
      },
      // Sunlit eastern dawn facet on Vishnu Temple
      {
        kind: "path",
        d: "M90 78 L93 78 L98 96 L106 112 L114 116 L120 132 L130 136 L138 152 L92 152 L94 116 Z",
        fill: "accent",
        opacity: 0.56,
      },
      // Distinct Coconino, Supai, and Redwall horizontal strata bands
      { kind: "path", d: "M80 96 L100 96", stroke: "paper", strokeWidth: 2, strokeLinecap: "round", opacity: 0.72 },
      { kind: "path", d: "M69 114 L113 114", stroke: "accent-soft", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.78 },
      { kind: "path", d: "M56 133 L126 133", stroke: "paper", strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.55 },
      { kind: "path", d: "M126 110 L166 110", stroke: "accent-soft", strokeWidth: 1.8, opacity: 0.65 },
      { kind: "path", d: "M14 115 L52 115", stroke: "accent-soft", strokeWidth: 1.8, opacity: 0.6 },

      // Mid-canyon terraced amphitheater benches
      {
        kind: "path",
        d: "M12 130 L48 134 L58 148 L72 154 L76 174 L12 178 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M168 128 L134 134 L122 148 L108 154 L104 174 L168 178 Z",
        fill: "ink",
      },

      // Plane 4: Deep shadowed Inner Gorge & S-curving Colorado River
      {
        kind: "path",
        d: "M12 152 L62 158 L78 176 L72 228 L12 228 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M168 150 L118 158 L102 176 L108 228 L168 228 Z",
        fill: "deep",
      },
      { kind: "rect", x: 64, y: 156, width: 52, height: 72, fill: "deep", opacity: 0.92 },
      // Sunlit Inner Gorge shoulder edges
      { kind: "path", d: "M14 152 L62 158 L78 176", stroke: "accent", strokeWidth: 1.4, opacity: 0.58 },
      { kind: "path", d: "M166 150 L118 158 L102 176", stroke: "accent", strokeWidth: 1.4, opacity: 0.58 },
      // S-curving Colorado River ribbon
      {
        kind: "path",
        d: "M90 156 C86 166 76 172 80 183 C84 194 104 196 100 208 C96 218 82 222 79 228",
        stroke: "accent-soft",
        strokeWidth: 7.2,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M90 156 C86 166 76 172 80 183 C84 194 104 196 100 208 C96 218 82 222 79 228",
        stroke: "paper",
        strokeWidth: 3.1,
        strokeLinecap: "round",
        opacity: 0.92,
      },

      // Plane 5: Foreground South Rim promontory & ponderosa pine framing
      { kind: "path", d: "M12 192 L50 198 L62 228 L12 228 Z", fill: "deep" },
      { kind: "path", d: "M168 196 L132 200 L118 228 L168 228 Z", fill: "deep" },
      // Left rim ponderosa pine silhouette
      {
        kind: "path",
        d: "M30 206 L30 154 M30 160 L18 164 M30 158 L42 162 M30 172 L16 175 M30 170 L45 174 M30 184 L19 187 M30 182 L41 186",
        stroke: "deep",
        strokeWidth: 2.6,
        strokeLinecap: "round",
      },
      { kind: "ellipse", cx: 30, cy: 155, rx: 11, ry: 4.5, fill: "deep" },
      { kind: "ellipse", cx: 24, cy: 165, rx: 10, ry: 4, fill: "deep" },
      { kind: "ellipse", cx: 38, cy: 166, rx: 9, ry: 3.8, fill: "deep" },
      { kind: "ellipse", cx: 29, cy: 176, rx: 14, ry: 4.5, fill: "deep" },
      // Right rim stunted pinyon-juniper
      { kind: "path", d: "M149 208 L151 176", stroke: "deep", strokeWidth: 2.4, strokeLinecap: "round" },
      { kind: "ellipse", cx: 150, cy: 177, rx: 11, ry: 5, fill: "deep" },
      { kind: "ellipse", cx: 142, cy: 186, rx: 9, ry: 4.2, fill: "deep" },
      { kind: "ellipse", cx: 157, cy: 187, rx: 8.5, ry: 4, fill: "deep" },
    ],
  },

  // =========================================================================
  // 2. BLCA — Black Canyon of the Gunnison National Park (CO)
  // =========================================================================
  {
    code: "BLCA",
    subject: "Steep horizontal-rimmed Black Canyon gorge, Painted Wall pegmatite dikes & Gunnison River",
    accentLight: "#B85C6E",
    accentDark: "#E899A8",
    skyMood: "noon",
    nodes: [
      // Plane 1: Open high-altitude Colorado sky, crisp noon sun & delicate clouds (y=11..68)
      { kind: "circle", cx: 116, cy: 36, r: 19, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 116, cy: 36, r: 10, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M20 28 Q42 23 68 28 Q50 32 20 28 Z", fill: "paper", opacity: 0.68 },
      { kind: "path", d: "M128 48 Q146 44 164 48 Q148 51 128 48 Z", fill: "paper", opacity: 0.56 },
      // Distant plateau horizon visible through the central canyon V-notch
      { kind: "path", d: "M58 70 L76 64 L106 65 L124 70 L124 106 L58 106 Z", fill: "far", opacity: 0.45 },

      // Plane 2: Layer 1 — Horizontal high-plateau canyon rims & far receding sunlit gorge spurs
      {
        kind: "path",
        d: "M11 68 L64 68 L74 74 L84 120 L91 162 L52 166 L11 102 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M169 66 L116 66 L106 74 L96 120 L89 162 L134 166 L169 100 Z",
        fill: "far",
      },
      // Crisp sunlit horizontal mesa rim ledges separating sky from plunging canyon walls
      { kind: "line", x1: 11, y1: 68, x2: 64, y2: 68, stroke: "paper", strokeWidth: 2.2, opacity: 0.88 },
      { kind: "line", x1: 116, y1: 66, x2: 169, y2: 66, stroke: "paper", strokeWidth: 2.2, opacity: 0.88 },

      // Plane 3: Layer 2 — Mid interlocking canyon walls & towering Painted Wall cliff face
      // Left mid interlocking gneiss spur
      {
        kind: "path",
        d: "M11 76 L54 76 L66 86 L76 122 L84 168 L74 192 L11 192 Z",
        fill: "ink",
      },
      { kind: "path", d: "M11 76 L54 76 L62 82 L11 82 Z", fill: "far", opacity: 0.68 },
      { kind: "line", x1: 56, y1: 84, x2: 72, y2: 158, stroke: "deep", strokeWidth: 1.2, opacity: 0.48 },
      { kind: "path", d: "M26 106 Q44 114 58 126 Q66 132 74 140", stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.52 },

      // Right mid Painted Wall sheer cliff monolith (2,250 ft Precambrian gneiss)
      {
        kind: "path",
        d: "M169 74 L128 74 L116 82 L106 118 L97 166 L104 192 L169 192 Z",
        fill: "mid",
      },
      // Sunlit upper plateau shoulder bevel on Painted Wall
      { kind: "path", d: "M128 74 L169 74 L169 81 L122 81 L116 82 Z", fill: "paper", opacity: 0.46 },
      // Shadowed inner gorge facet of Painted Wall
      {
        kind: "path",
        d: "M116 82 L106 118 L97 166 L114 168 L124 124 L135 86 Z",
        fill: "ink",
        opacity: 0.84,
      },
      // Natural angled geological pegmatite veins crisscrossing the Painted Wall face
      {
        kind: "path",
        d: "M124 90 Q138 98 148 112 T166 134",
        stroke: "paper",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.84,
      },
      {
        kind: "path",
        d: "M113 114 Q128 119 140 128 Q151 135 166 142",
        stroke: "accent-soft",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        opacity: 0.86,
      },
      {
        kind: "path",
        d: "M107 138 Q121 143 134 153 Q145 159 160 164",
        stroke: "paper",
        strokeWidth: 1.3,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M138 84 L152 94 L164 106",
        stroke: "accent-soft",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.74,
      },

      // Plane 4: Deep shadowed V-gorge throat & winding whitewater Gunnison River (y=158..229)
      { kind: "path", d: "M66 158 L114 158 L128 229 L52 229 Z", fill: "deep" },
      // Winding river channel emerging from the narrow black gorge shadow
      {
        kind: "path",
        d: "M88 158 C86 168 95 175 87 186 C78 198 102 208 96 229 L76 229 C82 210 68 198 77 186 C83 176 81 167 86 158 Z",
        fill: "far",
        opacity: 0.82,
      },
      {
        kind: "path",
        d: "M88 160 C86 170 93 176 85 187 C77 198 96 208 87 229",
        stroke: "paper",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        opacity: 0.96,
      },
      {
        kind: "path",
        d: "M81 193 Q87 190 93 193 M79 208 Q88 205 97 209 M77 220 Q87 216 97 220",
        stroke: "paper",
        strokeWidth: 1.4,
        strokeLinecap: "round",
        opacity: 0.86,
      },

      // Plane 5: Layer 3 — Steep dark foreground opposing canyon walls framing the gorge
      {
        kind: "path",
        d: "M11 96 L34 100 L48 128 L62 172 L70 212 L62 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M11 124 L34 134 L44 170 L11 164 Z",
        fill: "ink",
        opacity: 0.36,
      },
      { kind: "path", d: "M11 96 L34 100 L48 128", stroke: "mid", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.72 },
      {
        kind: "path",
        d: "M169 100 L146 104 L132 134 L118 176 L110 212 L116 229 L169 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M169 128 L144 138 L134 172 L169 166 Z",
        fill: "ink",
        opacity: 0.38,
      },
      { kind: "path", d: "M169 100 L146 104 L132 134", stroke: "accent-soft", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.68 },
    ],
  },

  // =========================================================================
  // 3. NERI — New River Gorge National Park (WV)
  // =========================================================================
  {
    code: "NERI",
    subject: "1,700-foot single-span New River Gorge steel arch bridge & whitewater canyon",
    accentLight: "#BF5226",
    accentDark: "#EE8C5E",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Dawn sun & Appalachian morning valley mist
      { kind: "circle", cx: 90, cy: 56, r: 26, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 90, cy: 56, r: 14, fill: "accent", opacity: 0.9 },
      { kind: "path", d: "M18 36 Q42 32 66 36 Q48 39 18 36 Z", fill: "paper", opacity: 0.55 },
      { kind: "path", d: "M118 30 Q142 26 164 31 Q146 34 118 30 Z", fill: "paper", opacity: 0.5 },

      // Plane 2: Layered mist-veiled Appalachian gorge ridges
      { kind: "path", d: "M12 72 Q48 56 84 68 Q124 54 168 70 L168 124 L12 124 Z", fill: "far" },
      { kind: "path", d: "M24 98 Q90 88 156 98 Q90 108 24 98 Z", fill: "paper", opacity: 0.48 },
      { kind: "path", d: "M12 88 Q42 82 68 106 L82 146 L12 146 Z", fill: "mid" },
      { kind: "path", d: "M168 86 Q138 82 112 106 L98 146 L168 146 Z", fill: "mid" },
      { kind: "path", d: "M36 124 Q90 116 144 124 Q90 132 36 124 Z", fill: "accent-soft", opacity: 0.38 },

      // Plane 3: Hero New River Gorge Steel Arch Bridge
      // Roadway top deck & lower truss chord spanning canyon wall to canyon wall
      { kind: "rect", x: 12, y: 78, width: 156, height: 4.5, fill: "deep" },
      { kind: "line", x1: 12, y1: 78.5, x2: 168, y2: 78.5, stroke: "accent", strokeWidth: 1.4, opacity: 0.9 },
      { kind: "line", x1: 12, y1: 84.5, x2: 168, y2: 84.5, stroke: "deep", strokeWidth: 1.3 },
      // Main parabolic steel arch — upper & lower curved truss ribs
      { kind: "path", d: "M22 140 Q90 28 158 140", stroke: "deep", strokeWidth: 3.6, strokeLinecap: "round" },
      { kind: "path", d: "M25 147 Q90 38 155 147", stroke: "deep", strokeWidth: 2.2, strokeLinecap: "round" },
      // Sunlit weathering-steel rust highlight along arch spine
      { kind: "path", d: "M24 140 Q90 30 156 140", stroke: "accent", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.88 },
      // Vertical spandrel columns (following parabolic arch curve y(x) = 84 + 56 * ((x-90)/68)^2)
      { kind: "line", x1: 34, y1: 82, x2: 34, y2: 123, stroke: "deep", strokeWidth: 1.5 },
      { kind: "line", x1: 46, y1: 82, x2: 46, y2: 108, stroke: "deep", strokeWidth: 1.5 },
      { kind: "line", x1: 58, y1: 82, x2: 58, y2: 97, stroke: "deep", strokeWidth: 1.4 },
      { kind: "line", x1: 70, y1: 82, x2: 70, y2: 89, stroke: "deep", strokeWidth: 1.3 },
      { kind: "line", x1: 110, y1: 82, x2: 110, y2: 89, stroke: "deep", strokeWidth: 1.3 },
      { kind: "line", x1: 122, y1: 82, x2: 122, y2: 97, stroke: "deep", strokeWidth: 1.4 },
      { kind: "line", x1: 134, y1: 82, x2: 134, y2: 108, stroke: "deep", strokeWidth: 1.5 },
      { kind: "line", x1: 146, y1: 82, x2: 146, y2: 123, stroke: "deep", strokeWidth: 1.5 },
      // Outer abutment piers + subtle X-bracing
      { kind: "line", x1: 22, y1: 82, x2: 22, y2: 142, stroke: "deep", strokeWidth: 2.2 },
      { kind: "line", x1: 158, y1: 82, x2: 158, y2: 142, stroke: "deep", strokeWidth: 2.2 },
      { kind: "path", d: "M34 84 L46 106 M46 84 L34 118 M134 84 L146 118 M146 84 L134 106", stroke: "deep", strokeWidth: 0.85, opacity: 0.72 },

      // Plane 4: Forested gorge walls & winding whitewater New River
      {
        kind: "path",
        d: "M12 128 Q30 132 46 144 Q62 154 78 164 L74 228 L12 228 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M168 126 Q150 132 134 144 Q118 154 102 164 L106 228 L168 228 Z",
        fill: "ink",
      },
      // Autumn Appalachian canopy accents along the steep gorge slopes
      { kind: "path", d: "M18 142 Q32 134 44 144 Q56 140 66 154 L18 156 Z", fill: "accent", opacity: 0.34 },
      { kind: "path", d: "M162 140 Q148 134 136 144 Q124 140 114 154 L162 156 Z", fill: "accent", opacity: 0.34 },
      // Winding New River channel
      {
        kind: "path",
        d: "M82 146 L98 146 C106 164 114 176 116 196 C118 212 108 220 114 228 L64 228 C68 214 78 202 74 184 C72 168 78 156 82 146 Z",
        fill: "mid",
      },
      // Crisp whitewater rapids ribbons & riverside boulders
      {
        kind: "path",
        d: "M90 150 C86 162 96 172 88 184 C80 196 102 206 88 226",
        stroke: "paper",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M78 176 Q90 172 100 176 M74 198 Q88 193 104 198 M72 214 Q90 210 106 215",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      { kind: "ellipse", cx: 74, cy: 190, rx: 6, ry: 3.6, fill: "deep" },
      { kind: "ellipse", cx: 106, cy: 204, rx: 7, ry: 4, fill: "deep" },

      // Plane 5: Foreground wooded gorge bluffs framing bottom corners
      {
        kind: "path",
        d: "M12 166 L22 174 L28 164 L36 180 L44 172 L52 190 L64 202 L72 228 L12 228 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M168 168 L158 176 L150 166 L142 182 L134 176 L126 194 L114 206 L108 228 L168 228 Z",
        fill: "deep",
      },
    ],
  },

  // =========================================================================
  // 4. MORA — Mount Rainier National Park (WA)
  // =========================================================================
  {
    code: "MORA",
    subject: "Three-crowned glaciated Mount Rainier, alpenglow & Reflection Lakes",
    accentLight: "#C25E48",
    accentDark: "#EC9B86",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Dawn radiance & iconic Rainier lenticular cap cloud
      { kind: "circle", cx: 136, cy: 42, r: 22, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 136, cy: 42, r: 11, fill: "accent", opacity: 0.85 },
      { kind: "path", d: "M46 38 Q90 24 134 38 Q114 43 90 42 Q66 43 46 38 Z", fill: "paper", opacity: 0.74 },
      { kind: "path", d: "M58 39 Q90 32 122 39 Q90 42 58 39 Z", fill: "accent-soft", opacity: 0.55 },

      // Plane 2: Far Cascade ridges flanking the massif
      { kind: "path", d: "M12 110 L38 92 L62 104 L120 100 L146 88 L168 106 L168 144 L12 144 Z", fill: "far" },

      // Plane 3: Hero broad three-crowned Mount Rainier massif
      // Broad volcanic dome: Liberty Cap (68,62), Columbia Crest (90,50), Point Success (114,61)
      {
        kind: "path",
        d: "M12 134 L46 92 L62 66 L68 62 L78 58 L86 50 L94 50 L104 57 L114 61 L122 68 L138 92 L168 132 L168 144 L12 144 Z",
        fill: "ink",
      },
      // Main sculpted snow & glacier icefield blanket
      {
        kind: "path",
        d: "M62 66 L68 62 L78 58 L86 50 L94 50 L104 57 L114 61 L122 68 L136 92 L124 94 L116 84 L108 100 L96 88 L88 104 L76 90 L66 102 L58 88 L48 92 Z",
        fill: "paper",
        opacity: 0.94,
      },
      // Alpenglow dawn light warming Columbia Crest & eastern glacier flank
      {
        kind: "path",
        d: "M90 50 L94 50 L104 57 L114 61 L122 68 L136 92 L122 93 L112 80 L102 90 L94 74 Z",
        fill: "accent-soft",
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M94 50 L104 57 L114 61 L120 67 L112 72 L100 66 Z",
        fill: "accent",
        opacity: 0.42,
      },
      // Exposed dark volcanic cleavers (Gibraltar Rock / Little Tahoma / Success Cleaver)
      { kind: "polygon", points: "75,68 83,86 72,88", fill: "ink", opacity: 0.85 },
      { kind: "polygon", points: "97,68 106,86 93,86", fill: "ink", opacity: 0.78 },
      { kind: "polygon", points: "120,76 130,90 116,88", fill: "deep", opacity: 0.62 },

      // Far lakeshore subalpine treeline band
      {
        kind: "path",
        d: "M12 134 L22 124 L28 134 L36 122 L44 134 L54 126 L62 136 L74 130 L84 138 L98 132 L108 138 L120 128 L128 136 L138 124 L146 134 L156 122 L168 134 L168 146 L12 146 Z",
        fill: "deep",
      },

      // Plane 4: Glassy Reflection Lakes & inverted snow massif reflection
      { kind: "rect", x: 12, y: 145, width: 156, height: 83, fill: "mid" },
      { kind: "rect", x: 12, y: 145, width: 156, height: 34, fill: "far", opacity: 0.42 },
      // Inverted mountain body reflection
      {
        kind: "path",
        d: "M24 146 L156 146 L134 176 L114 198 L94 208 L86 208 L68 197 L48 176 Z",
        fill: "ink",
        opacity: 0.56,
      },
      // Inverted snowy glacier crown reflection
      {
        kind: "path",
        d: "M54 172 L126 172 L114 198 L94 208 L86 208 L68 197 Z",
        fill: "paper",
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M90 172 L126 172 L114 198 L94 208 L90 208 Z",
        fill: "accent-soft",
        opacity: 0.44,
      },
      // Horizontal glassy lake water ripples breaking the reflection
      { kind: "line", x1: 38, y1: 156, x2: 142, y2: 156, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.55 },
      { kind: "line", x1: 48, y1: 168, x2: 132, y2: 168, stroke: "mid", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.72 },
      { kind: "line", x1: 58, y1: 180, x2: 122, y2: 180, stroke: "paper", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.62 },
      { kind: "line", x1: 68, y1: 192, x2: 112, y2: 192, stroke: "mid", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.68 },
      { kind: "line", x1: 74, y1: 204, x2: 106, y2: 204, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.58 },

      // Plane 5: Foreground subalpine fir spires framing left & right banks + shoreline sedges
      // Left tall Cascade fir spires
      { kind: "polygon", points: "22,94 12,138 18,138 11,176 34,176 26,138 32,138", fill: "deep" },
      { kind: "polygon", points: "40,118 30,154 35,154 28,196 52,196 45,154 50,154", fill: "deep" },
      // Right tall Cascade fir spires
      { kind: "polygon", points: "156,96 146,140 152,140 144,180 168,180 162,140 167,140", fill: "deep" },
      { kind: "polygon", points: "138,120 128,156 133,156 126,196 150,196 143,156 148,156", fill: "deep" },
      // Foreground lakeshore bank & wildflower sedges
      { kind: "path", d: "M12 204 Q42 214 68 228 L12 228 Z", fill: "deep" },
      { kind: "path", d: "M168 206 Q138 214 114 228 L168 228 Z", fill: "deep" },
      { kind: "path", d: "M24 214 L20 198 M32 216 L33 200 M44 220 L48 206 M148 216 L144 200 M156 214 L160 198", stroke: "deep", strokeWidth: 1.8, strokeLinecap: "round" },
      { kind: "circle", cx: 33, cy: 200, r: 2, fill: "accent", opacity: 0.85 },
      { kind: "circle", cx: 48, cy: 206, r: 1.8, fill: "accent", opacity: 0.82 },
      { kind: "circle", cx: 144, cy: 200, r: 2, fill: "accent", opacity: 0.85 },
    ],
  },

  // =========================================================================
  // 5. HAVO — Hawaiʻi Volcanoes National Park (HI)
  // =========================================================================
  {
    code: "HAVO",
    subject: "Halemaʻumaʻu shield caldera, nocturnal lava plume & glowing basalt fissures",
    accentLight: "#E0551F",
    accentDark: "#FF8947",
    skyMood: "night",
    nodes: [
      // Plane 1: Star-speckled nocturnal tropical sky & crescent moon
      { kind: "circle", cx: 30, cy: 30, r: 1.3, fill: "paper", opacity: 0.9 },
      { kind: "circle", cx: 52, cy: 24, r: 1.1, fill: "paper", opacity: 0.78 },
      { kind: "circle", cx: 74, cy: 36, r: 1.4, fill: "paper", opacity: 0.85 },
      { kind: "circle", cx: 122, cy: 28, r: 1.5, fill: "paper", opacity: 0.92 },
      { kind: "circle", cx: 148, cy: 38, r: 1.2, fill: "paper", opacity: 0.84 },
      { kind: "circle", cx: 138, cy: 62, r: 1.1, fill: "paper", opacity: 0.75 },
      { kind: "circle", cx: 36, cy: 64, r: 1.2, fill: "paper", opacity: 0.8 },
      { kind: "circle", cx: 154, cy: 76, r: 1, fill: "paper", opacity: 0.72 },
      { kind: "path", d: "M34 40 A7 7 0 1 0 43 49 A5.6 5.6 0 1 1 34 40 Z", fill: "paper", opacity: 0.92 },

      // Glowing volcanic sky halo & rising buoyant steam/ash plume
      { kind: "ellipse", cx: 90, cy: 112, rx: 56, ry: 34, fill: "accent", opacity: 0.24 },
      { kind: "ellipse", cx: 90, cy: 114, rx: 34, ry: 22, fill: "accent-soft", opacity: 0.3 },
      {
        kind: "path",
        d: "M76 116 C70 98 62 84 68 68 C72 56 84 52 92 44 C104 34 124 38 130 52 C136 66 122 80 112 92 C106 100 106 108 104 116 Z",
        fill: "far",
        opacity: 0.72,
      },
      // Incandescent orange under-lit core of the rising plume
      {
        kind: "path",
        d: "M80 116 C78 100 76 86 84 74 C90 64 102 64 104 76 C106 88 100 102 99 116 Z",
        fill: "accent",
        opacity: 0.54,
      },

      // Plane 2: Broad, flat-profile Hawaiian shield volcano silhouette (NOT a pointy cone)
      {
        kind: "path",
        d: "M12 114 Q42 104 66 102 L114 102 Q138 104 168 114 L168 146 L12 146 Z",
        fill: "mid",
      },

      // Plane 3: Hero Halemaʻumaʻu pit caldera, glowing lava lake & lava fountain
      {
        kind: "path",
        d: "M12 120 L54 116 L62 128 L118 128 L126 116 L168 120 L168 158 L12 158 Z",
        fill: "ink",
      },
      // Inner recessed caldera rim shadow
      {
        kind: "path",
        d: "M54 116 L62 128 L118 128 L126 116 L122 134 L58 134 Z",
        fill: "deep",
      },
      // Glowing molten lava lake surface inside Halemaʻumaʻu
      { kind: "ellipse", cx: 90, cy: 132, rx: 28, ry: 6, fill: "accent", opacity: 0.96 },
      { kind: "ellipse", cx: 90, cy: 132, rx: 16, ry: 3.2, fill: "accent-soft", opacity: 0.95 },
      { kind: "ellipse", cx: 90, cy: 132, rx: 7, ry: 1.6, fill: "paper", opacity: 0.9 },
      // Arching molten lava fountain jets & glowing spatter
      {
        kind: "path",
        d: "M90 132 Q86 106 78 118 M90 132 Q90 98 90 112 M90 132 Q95 104 104 118",
        stroke: "accent-soft",
        strokeWidth: 2.2,
        strokeLinecap: "round",
      },
      { kind: "circle", cx: 82, cy: 106, r: 1.5, fill: "paper", opacity: 0.9 },
      { kind: "circle", cx: 96, cy: 102, r: 1.4, fill: "accent-soft", opacity: 0.92 },
      { kind: "circle", cx: 104, cy: 110, r: 1.2, fill: "accent", opacity: 0.9 },

      // Plane 4: Terraced dark basalt floor & branching glowing lava fissures
      { kind: "path", d: "M12 140 L168 140 L168 228 L12 228 Z", fill: "deep" },
      // Subtle stepped pāhoehoe basalt terrace rims
      { kind: "path", d: "M12 156 Q56 150 90 154 Q124 150 168 156", stroke: "ink", strokeWidth: 2.4, opacity: 0.72 },
      { kind: "path", d: "M12 178 Q58 172 90 176 Q128 172 168 180", stroke: "ink", strokeWidth: 2.2, opacity: 0.64 },
      // Glowing branching lava fissures cutting across the dark basalt plain
      {
        kind: "path",
        d: "M90 138 C86 154 74 162 82 178 C90 194 70 208 66 228",
        stroke: "accent",
        strokeWidth: 4.6,
        strokeLinecap: "round",
      },
      {
        kind: "path",
        d: "M90 138 C86 154 74 162 82 178 C90 194 70 208 66 228",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        strokeLinecap: "round",
      },
      {
        kind: "path",
        d: "M84 164 C100 172 114 182 110 198 C108 210 118 218 122 228",
        stroke: "accent",
        strokeWidth: 3.6,
        strokeLinecap: "round",
      },
      {
        kind: "path",
        d: "M84 164 C100 172 114 182 110 198 C108 210 118 218 122 228",
        stroke: "paper",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.85,
      },
      {
        kind: "path",
        d: "M78 184 C62 192 50 198 42 210",
        stroke: "accent",
        strokeWidth: 2.4,
        strokeLinecap: "round",
        opacity: 0.9,
      },

      // Plane 5: Silhouetted hāpuʻu fern fronds & ʻōhiʻa lehua framing lower corners
      // Left arching fern fronds
      {
        kind: "path",
        d: "M12 224 Q28 192 54 184 M14 226 Q34 206 58 204 M16 206 L28 196 M22 200 L34 190 M28 194 L42 186 M26 214 L40 206 M36 212 L48 205",
        stroke: "deep",
        strokeWidth: 3,
        strokeLinecap: "round",
      },
      // Right arching fern fronds & ʻōhiʻa branch
      {
        kind: "path",
        d: "M168 224 Q150 190 124 184 M166 226 Q146 204 122 204 M162 204 L148 194 M154 198 L140 188 M146 192 L134 186 M152 214 L138 206",
        stroke: "deep",
        strokeWidth: 3,
        strokeLinecap: "round",
      },
      { kind: "path", d: "M12 214 Q36 218 52 228 L12 228 Z", fill: "deep" },
      { kind: "path", d: "M168 214 Q144 218 128 228 L168 228 Z", fill: "deep" },
      // Tiny glowing ʻōhiʻa lehua blossom accents
      { kind: "circle", cx: 48, cy: 186, r: 2.4, fill: "accent", opacity: 0.9 },
      { kind: "circle", cx: 132, cy: 187, r: 2.2, fill: "accent", opacity: 0.9 },
    ],
  },

  // =========================================================================
  // 6. CONG — Congaree National Park (SC)
  // =========================================================================
  {
    code: "CONG",
    subject: "Flooded bald-cypress swamp, wide buttressed trunks, mirror reflections & raised wooden boardwalk",
    accentLight: "#B38530",
    accentDark: "#E2B862",
    skyMood: "mist",
    nodes: [
      // Plane 1: Clean sunlit misty forest sky (y=11..78) & gentle morning canopy glow
      { kind: "circle", cx: 88, cy: 48, r: 30, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 88, cy: 48, r: 18, fill: "accent-soft", opacity: 0.46 },
      { kind: "circle", cx: 88, cy: 48, r: 9, fill: "paper", opacity: 0.88 },

      // Distant misty bottomland cypress treeline across the far floodplain horizon
      {
        kind: "path",
        d: "M11 106 Q26 94 42 104 Q58 92 74 102 Q90 96 106 104 Q124 92 142 102 Q156 95 169 104 L169 136 L11 136 Z",
        fill: "far",
        opacity: 0.72,
      },
      // Soft floodplain morning mist hovering along the distant waterline
      { kind: "ellipse", cx: 90, cy: 132, rx: 78, ry: 8, fill: "paper", opacity: 0.46 },

      // Plane 2: Glassy dark mirror swamp water (y=134..229)
      { kind: "rect", x: 11, y: 134, width: 158, height: 95, fill: "mid" },
      { kind: "rect", x: 11, y: 162, width: 158, height: 67, fill: "ink", opacity: 0.42 },
      { kind: "rect", x: 11, y: 194, width: 158, height: 35, fill: "deep", opacity: 0.34 },
      // Warm sunlit reflection channel down the calm central water
      { kind: "ellipse", cx: 88, cy: 144, rx: 28, ry: 4.5, fill: "accent-soft", opacity: 0.44 },
      { kind: "ellipse", cx: 86, cy: 154, rx: 22, ry: 3.2, fill: "paper", opacity: 0.38 },
      { kind: "line", x1: 11, y1: 134, x2: 169, y2: 134, stroke: "paper", strokeWidth: 1.2, opacity: 0.56 },

      // Plane 3: 4 unmistakable broad-flared buttressed bald cypress trees & crisp vertical mirror reflections
      // Tree 1 (Mid-distance left cypress, x=24, waterline y=144) + mirror reflection
      {
        kind: "path",
        d: "M21 60 L27 60 L28 118 Q31 134 35 144 L11 144 Q18 134 20 118 Z",
        fill: "ink",
      },
      { kind: "ellipse", cx: 24, cy: 56, rx: 17, ry: 7.5, fill: "ink" },
      { kind: "ellipse", cx: 18, cy: 65, rx: 13, ry: 5.5, fill: "ink" },
      {
        kind: "path",
        d: "M11 145 L34 145 Q30 156 28 170 L27 202 L21 202 L20 170 Q18 156 11 145 Z",
        fill: "deep",
        opacity: 0.3,
      },

      // Tree 3 (Mid-distance right-center cypress, x=114, waterline y=142) + mirror reflection
      {
        kind: "path",
        d: "M110 54 L118 54 L119 116 Q122 132 127 142 L101 142 Q106 132 109 116 Z",
        fill: "ink",
      },
      { kind: "ellipse", cx: 114, cy: 50, rx: 20, ry: 8, fill: "ink" },
      { kind: "ellipse", cx: 123, cy: 59, rx: 15, ry: 6, fill: "ink" },
      {
        kind: "path",
        d: "M102 143 L126 143 Q121 154 119 168 L118 196 L110 196 L109 168 Q107 154 102 143 Z",
        fill: "deep",
        opacity: 0.28,
      },

      // Tree 2 (Hero foreground left bald cypress, x=48, waterline y=158) + layered feathery crown + reflection
      {
        kind: "path",
        d: "M43 40 L53 40 L54 122 C56 138 61 150 67 158 L29 158 C35 150 40 138 42 122 Z",
        fill: "deep",
      },
      // Sunlit right trunk & fluted buttress rim highlight
      {
        kind: "path",
        d: "M53 46 L54 122 C56 137 60 148 65 157",
        stroke: "accent-soft",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.62,
      },
      // Layered horizontal feathery bald-cypress canopy boughs
      { kind: "ellipse", cx: 48, cy: 32, rx: 25, ry: 8.5, fill: "deep" },
      { kind: "ellipse", cx: 36, cy: 42, rx: 20, ry: 7, fill: "deep" },
      { kind: "ellipse", cx: 61, cy: 44, rx: 17, ry: 6.5, fill: "deep" },
      { kind: "ellipse", cx: 48, cy: 52, rx: 19, ry: 6, fill: "ink", opacity: 0.82 },
      // Vertical mirror water reflection of hero left cypress
      {
        kind: "path",
        d: "M30 159 L66 159 C60 168 56 179 54 194 L53 229 L43 229 L42 194 C40 179 36 168 30 159 Z",
        fill: "deep",
        opacity: 0.34,
      },

      // Tree 4 (Hero foreground right bald cypress, x=147, waterline y=164) + layered feathery crown + reflection
      {
        kind: "path",
        d: "M141 34 L153 34 L154 124 C157 142 162 154 169 164 L126 164 C133 154 138 142 140 124 Z",
        fill: "deep",
      },
      // Sunlit left trunk & fluted buttress rim highlight catching morning light
      {
        kind: "path",
        d: "M141 42 L140 124 C138 140 134 152 128 163",
        stroke: "accent",
        strokeWidth: 1.7,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      // Layered horizontal feathery bald-cypress canopy boughs
      { kind: "ellipse", cx: 147, cy: 26, rx: 26, ry: 9, fill: "deep" },
      { kind: "ellipse", cx: 134, cy: 38, rx: 21, ry: 7.5, fill: "deep" },
      { kind: "ellipse", cx: 158, cy: 42, rx: 16, ry: 6.5, fill: "deep" },
      { kind: "ellipse", cx: 144, cy: 49, rx: 19, ry: 6, fill: "ink", opacity: 0.84 },
      // Vertical mirror water reflection of hero right cypress
      {
        kind: "path",
        d: "M127 165 L169 165 C162 175 157 187 154 202 L153 229 L141 229 L140 202 C138 187 133 175 127 165 Z",
        fill: "deep",
        opacity: 0.36,
      },

      // Crisp horizontal mirror water ripples breaking the trunk reflections
      { kind: "line", x1: 11, y1: 158, x2: 68, y2: 158, stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.62 },
      { kind: "line", x1: 122, y1: 164, x2: 169, y2: 164, stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.62 },
      { kind: "line", x1: 16, y1: 184, x2: 56, y2: 184, stroke: "accent-soft", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.45 },
      { kind: "line", x1: 122, y1: 190, x2: 164, y2: 190, stroke: "accent-soft", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.45 },
      { kind: "line", x1: 118, y1: 212, x2: 162, y2: 212, stroke: "paper", strokeWidth: 1, strokeLinecap: "round", opacity: 0.38 },

      // Plane 4: Distinct small rounded cone-like cypress knees poking cleanly out of the water
      {
        kind: "path",
        d: "M17 174 L20 160 Q22 157 24 160 L27 174 Z M31 178 L34 166 Q36 163 38 166 L41 178 Z",
        fill: "deep",
      },
      { kind: "line", x1: 15, y1: 174, x2: 43, y2: 174, stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.65 },
      {
        kind: "path",
        d: "M117 178 L120 165 Q122 162 124 165 L127 178 Z M131 186 L134 171 Q137 167 140 171 L143 186 Z M148 182 L150 171 Q152 168 154 171 L156 182 Z",
        fill: "deep",
      },
      { kind: "line", x1: 115, y1: 178, x2: 130, y2: 178, stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.65 },
      { kind: "line", x1: 129, y1: 186, x2: 158, y2: 186, stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.65 },

      // Plane 5: Raised wooden boardwalk running forward in clean perspective toward bottom-left/bottom-center
      // Dark water shadow & vertical support pilings standing in the swamp water beneath the raised deck
      { kind: "polygon", points: "83,142 93,142 114,229 44,229", fill: "deep", opacity: 0.44 },
      {
        kind: "path",
        d: "M76 156 L76 168 M67 178 L67 194 M56 204 L56 223 M97 156 L97 168 M102 178 L102 194 M108 204 L108 223",
        stroke: "deep",
        strokeWidth: 2.8,
        strokeLinecap: "round",
      },
      // Tiny white waterline ripples where the boardwalk pilings meet the glassy swamp water
      {
        kind: "path",
        d: "M72 168 L80 168 M62 194 L72 194 M51 223 L61 223 M93 168 L101 168 M97 194 L107 194 M103 223 L113 223",
        stroke: "paper",
        strokeWidth: 1.1,
        strokeLinecap: "round",
        opacity: 0.62,
      },
      // Raised warm wooden boardwalk plank deck surface + outer timber stringer beams
      { kind: "polygon", points: "83,138 93,138 114,229 46,229", fill: "accent-soft" },
      { kind: "polygon", points: "83,138 93,138 114,229 46,229", fill: "accent", opacity: 0.56 },
      { kind: "line", x1: 83, y1: 138, x2: 46, y2: 229, stroke: "deep", strokeWidth: 2.2 },
      { kind: "line", x1: 93, y1: 138, x2: 114, y2: 229, stroke: "deep", strokeWidth: 2.2 },
      // Crisp perspective-spaced wooden deck plank seams
      {
        kind: "path",
        d: "M81 144 L95 144 M78 152 L97 152 M74 162 L99 162 M69 174 L102 174 M63 188 L105 188 M56 204 L109 204 M49 221 L113 221",
        stroke: "deep",
        strokeWidth: 1.25,
        opacity: 0.62,
      },
      // Vertical wooden handrail posts rising cleanly along both sides of the boardwalk
      {
        kind: "path",
        d: "M83 131 L83 138 M76 144 L76 156 M67 160 L67 178 M56 179 L56 204 M46 197 L46 229 M93 131 L93 138 M97 144 L97 156 M102 160 L102 178 M108 179 L108 204 M114 197 L114 229",
        stroke: "deep",
        strokeWidth: 2.1,
        strokeLinecap: "round",
      },
      // Parallel upper & middle wooden handrails with warm sunlit top edge
      { kind: "line", x1: 83, y1: 131, x2: 46, y2: 197, stroke: "deep", strokeWidth: 2.8, strokeLinecap: "round" },
      { kind: "line", x1: 83, y1: 130.5, x2: 46, y2: 196.5, stroke: "accent-soft", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.88 },
      { kind: "line", x1: 83, y1: 134.5, x2: 46, y2: 213, stroke: "deep", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.88 },
      { kind: "line", x1: 93, y1: 131, x2: 114, y2: 197, stroke: "deep", strokeWidth: 2.8, strokeLinecap: "round" },
      { kind: "line", x1: 93, y1: 130.5, x2: 114, y2: 196.5, stroke: "accent-soft", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.88 },
      { kind: "line", x1: 93, y1: 134.5, x2: 114, y2: 213, stroke: "deep", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.88 },
    ],
  },

  // =========================================================================
  // 7. WICA — Wind Cave National Park (SD)
  // =========================================================================
  {
    code: "WICA",
    subject: "Black Hills prairie bison above a geological cutaway into glowing honeycomb boxwork",
    accentLight: "#BD7E34",
    accentDark: "#E8AF67",
    skyMood: "noon",
    nodes: [
      // Plane 1: Upper sunlit Black Hills prairie sky & soft cumulus clouds
      { kind: "circle", cx: 142, cy: 32, r: 16, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 142, cy: 32, r: 9.5, fill: "accent", opacity: 0.88 },
      { kind: "path", d: "M22 40 Q32 30 46 34 Q56 26 68 34 Q78 32 84 40 Z", fill: "paper", opacity: 0.82 },
      { kind: "path", d: "M108 46 Q118 39 130 42 Q139 37 150 46 Z", fill: "paper", opacity: 0.7 },

      // Plane 2: Rolling Black Hills horizon & sunlit prairie ridge swell
      { kind: "path", d: "M11 76 Q44 65 86 73 Q128 63 169 75 L169 106 L11 106 Z", fill: "far" },
      { kind: "path", d: "M11 88 Q54 77 96 83 Q134 79 169 89 L169 112 L11 112 Z", fill: "mid" },
      // Sunlit prairie crest edge
      { kind: "path", d: "M11 88 Q54 77 96 83 Q134 79 169 89", stroke: "accent-soft", strokeWidth: 2, opacity: 0.74 },
      // Small Black Hills ponderosa pine tufts on far left slope
      { kind: "polygon", points: "26,69 21,83 31,83", fill: "ink", opacity: 0.85 },
      { kind: "polygon", points: "36,73 31,85 41,85", fill: "ink", opacity: 0.78 },

      // Plane 3 (Upper Hero): Anatomically accurate American Bison silhouette (NPS arrowhead proportions)
      // Massive elevated shoulder hump, low-slung shaggy head & beard, tucked lean flank, angled-hock hind legs
      {
        kind: "path",
        d: "M55.5 66.5 C55.5 62.5 58 58.5 63.5 57.5 C67.5 54 71.5 48.5 76.5 48.5 C81.5 48.5 85 53 90 56 C96 56.5 102 56.5 106.5 60 C108.5 63 108.5 68 106.5 72.5 L107.2 74.5 L105.5 83 L103.2 83 L104 75.5 C102.5 73.5 101.5 72 100.5 71 L98.5 75 L97 83 L94.8 83 L95.8 75.5 C95 73.5 94 71.5 92.5 69.5 C87 70 83 72.5 79.5 75.5 L77.8 76.5 L77 83 L74.8 83 L75.2 76.5 L71.5 76.5 L70.2 83 L67.8 83 L68.2 76.5 C65.5 76.5 63.5 75 62 76.5 C60 75 59 73 58 72 C56 71.5 55.2 69 55.5 66.5 Z",
        fill: "deep",
      },
      // Crisp upturned curved bison horn silhouetted cleanly against the bright prairie sky
      {
        kind: "path",
        d: "M63.5 58.2 C60.5 57.8 58.8 55.8 58.8 52.8 C59.9 54.4 61.3 55.6 64 56.2 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M61.6 57.2 C59.8 56.4 58.9 54.8 58.9 53",
        stroke: "paper",
        strokeWidth: 0.9,
        strokeLinecap: "round",
        opacity: 0.82,
      },
      // Short curved bison tail with terminal tuft
      {
        kind: "path",
        d: "M106.2 60.5 Q110.5 63 111.2 67.8",
        stroke: "deep",
        strokeWidth: 1.5,
        strokeLinecap: "round",
      },
      { kind: "ellipse", cx: 111.4, cy: 69.2, rx: 1.3, ry: 2.2, fill: "deep" },
      // Sunlit crest rim along the elevated shoulder hump & subtle woolly cape demarcation
      {
        kind: "path",
        d: "M69 52.5 C72.5 49.2 75 48.6 77.5 48.8 C81.5 49.2 85.2 53.2 89.5 55.8",
        stroke: "accent-soft",
        strokeWidth: 1.3,
        strokeLinecap: "round",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M82.5 54 C84 60 83 66 80 71.5",
        stroke: "ink",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.62,
      },

      // Plane 4 (Lower 60%): Curving cutaway earth strata opening into Wind Cave's vaulted limestone cavern
      { kind: "path", d: "M11 96 Q60 90 112 96 Q142 98 169 94 L169 229 L11 229 Z", fill: "ink" },
      // Sedimentary limestone cutaway strata ribbons above the vault
      { kind: "path", d: "M11 103 Q64 97 118 103 Q144 105 169 101", stroke: "accent-soft", strokeWidth: 2.2, opacity: 0.58 },
      { kind: "path", d: "M11 110 Q66 105 120 111 Q146 113 169 109", stroke: "mid", strokeWidth: 2.4, opacity: 0.65 },
      // Vaulted dark subterranean limestone cavern interior
      {
        kind: "path",
        d: "M20 229 C18 176 26 138 50 122 C72 108 108 108 130 122 C154 138 162 176 160 229 Z",
        fill: "deep",
      },
      // Soft golden subterranean glow inside the vaulted cavern
      { kind: "ellipse", cx: 90, cy: 170, rx: 50, ry: 38, fill: "accent", opacity: 0.22 },
      { kind: "ellipse", cx: 90, cy: 168, rx: 32, ry: 24, fill: "accent-soft", opacity: 0.26 },

      // Plane 5 (Lower Hero): Iconic geometric honeycomb boxwork calcite fins crisscrossing the cavern
      // Intersecting diagonal & angular calcite blade lattice across ceiling and walls
      {
        kind: "path",
        d: "M34 150 L62 126 L90 144 L118 124 L146 148 M28 176 L58 156 L90 174 L122 154 L152 176 M34 202 L66 184 L90 198 L114 184 L146 202",
        stroke: "accent",
        strokeWidth: 2.4,
        strokeLinecap: "round",
        strokeLinejoin: "miter",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M52 122 L58 156 L44 194 M76 114 L74 166 L66 208 M104 114 L106 166 L114 208 M128 122 L122 154 L136 194",
        stroke: "accent",
        strokeWidth: 2.1,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      // Crisp luminous calcite crystal edges highlighting the honeycomb boxwork fins
      {
        kind: "path",
        d: "M62 126 L90 144 L118 124 M58 156 L90 174 L122 154 M74 136 L74 166 L90 174 L106 166 L106 136",
        stroke: "accent-soft",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M74 146 L90 156 L106 146 M66 184 L90 198 L114 184",
        stroke: "paper",
        strokeWidth: 1.1,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      // Cavern floor limestone ledges framing the base of the cutaway
      { kind: "path", d: "M11 208 Q46 200 72 214 L90 218 L108 214 Q134 200 169 208 L169 229 L11 229 Z", fill: "ink" },
      { kind: "path", d: "M11 216 Q52 212 90 220 Q128 212 169 216 L169 229 L11 229 Z", fill: "deep", opacity: 0.85 },
    ],
  },

  // =========================================================================
  // 8. VOYA — Voyageurs National Park (MN)
  // =========================================================================
  {
    code: "VOYA",
    subject: "Aurora Borealis curtains, mid-lake Canadian Shield pine island & lone northwoods canoe",
    accentLight: "#2A9D82",
    accentDark: "#69E2C4",
    skyMood: "night",
    nodes: [
      // Plane 1: Starry boreal night sky & sinuous luminous Aurora Borealis curtains
      { kind: "circle", cx: 26, cy: 26, r: 1.3, fill: "paper", opacity: 0.9 },
      { kind: "circle", cx: 48, cy: 34, r: 1.1, fill: "paper", opacity: 0.78 },
      { kind: "circle", cx: 74, cy: 22, r: 1.4, fill: "paper", opacity: 0.92 },
      { kind: "circle", cx: 108, cy: 26, r: 1.2, fill: "paper", opacity: 0.84 },
      { kind: "circle", cx: 136, cy: 22, r: 1.5, fill: "paper", opacity: 0.94 },
      { kind: "circle", cx: 154, cy: 36, r: 1.1, fill: "paper", opacity: 0.8 },
      { kind: "circle", cx: 34, cy: 62, r: 1, fill: "paper", opacity: 0.72 },
      { kind: "circle", cx: 148, cy: 70, r: 1.1, fill: "paper", opacity: 0.76 },

      // Broad translucent aurora sky veil
      {
        kind: "path",
        d: "M11 76 C34 46 64 36 92 50 C118 62 142 44 169 26 L169 62 C142 80 116 94 88 82 C60 70 34 84 11 104 Z",
        fill: "accent",
        opacity: 0.34,
      },
      // Sinuous folded vertical Aurora Borealis curtain ribbon
      {
        kind: "path",
        d: "M11 90 C38 62 66 54 94 68 C120 80 144 62 169 42 L169 54 C144 74 118 90 92 78 C64 64 38 74 11 102 Z",
        fill: "accent",
        opacity: 0.76,
      },
      // Luminous bright lower aurora edge
      {
        kind: "path",
        d: "M11 98 C38 70 66 62 94 76 C120 88 144 70 169 50",
        stroke: "accent-soft",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        opacity: 0.94,
      },
      // Vertical shimmering curtain rays rising upward from the ribbon
      { kind: "line", x1: 38, y1: 76, x2: 38, y2: 44, stroke: "accent-soft", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.44 },
      { kind: "line", x1: 58, y1: 66, x2: 58, y2: 32, stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.36 },
      { kind: "line", x1: 82, y1: 70, x2: 82, y2: 38, stroke: "accent-soft", strokeWidth: 2.4, strokeLinecap: "round", opacity: 0.48 },
      { kind: "line", x1: 112, y1: 78, x2: 112, y2: 42, stroke: "paper", strokeWidth: 1.7, strokeLinecap: "round", opacity: 0.38 },
      { kind: "line", x1: 138, y1: 66, x2: 138, y2: 30, stroke: "accent-soft", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.45 },

      // Plane 2: Distant low boreal treeline far across the lake horizon (y=114..126)
      {
        kind: "path",
        d: "M11 122 L24 117 L38 120 L58 115 L84 120 L114 115 L140 119 L156 115 L169 119 L169 128 L11 128 Z",
        fill: "far",
        opacity: 0.72,
      },

      // Plane 3: Calm dark northwoods lake spanning full width behind & around BOTH sides of the island
      { kind: "rect", x: 11, y: 125, width: 158, height: 104, fill: "mid" },
      { kind: "rect", x: 11, y: 125, width: 158, height: 22, fill: "deep", opacity: 0.38 },
      // Shimmering emerald aurora reflections visible on the open lake to the left, right, and foreground
      { kind: "ellipse", cx: 30, cy: 140, rx: 16, ry: 2.4, fill: "accent", opacity: 0.48 },
      { kind: "ellipse", cx: 148, cy: 138, rx: 18, ry: 2.5, fill: "accent", opacity: 0.5 },
      { kind: "ellipse", cx: 28, cy: 156, rx: 15, ry: 2.2, fill: "accent-soft", opacity: 0.38 },
      { kind: "ellipse", cx: 146, cy: 158, rx: 19, ry: 2.6, fill: "accent-soft", opacity: 0.4 },
      { kind: "ellipse", cx: 90, cy: 176, rx: 46, ry: 4.2, fill: "accent", opacity: 0.42 },
      { kind: "ellipse", cx: 88, cy: 214, rx: 50, ry: 4, fill: "accent", opacity: 0.34 },
      { kind: "line", x1: 16, y1: 148, x2: 44, y2: 148, stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.5 },
      { kind: "line", x1: 132, y1: 148, x2: 164, y2: 148, stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.5 },

      // Plane 4 (Hero): Prominent Canadian Shield rocky granite island surrounded by open water (x=52..126, y=108..154)
      // Soft mirrored reflection of the island dome & pines on the calm lake below
      {
        kind: "path",
        d: "M54 154 L124 154 C118 164 112 167 104 172 L96 184 L89 175 L82 188 L74 176 L67 182 C61 169 57 163 54 154 Z",
        fill: "deep",
        opacity: 0.34,
      },
      { kind: "line", x1: 58, y1: 164, x2: 118, y2: 164, stroke: "accent-soft", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.5 },
      { kind: "line", x1: 68, y1: 174, x2: 108, y2: 174, stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.48 },

      // Smooth glaciated Canadian Shield granite dome shoreline (open water on BOTH left x<52 and right x>126)
      {
        kind: "path",
        d: "M52 152 C59 142 72 138 90 138 C106 138 118 143 126 152 Q89 156 52 152 Z",
        fill: "far",
      },
      // Shaded lower granite rock face meeting the lake
      {
        kind: "path",
        d: "M52 152 C66 147 110 147 126 152 Q89 156 52 152 Z",
        fill: "ink",
        opacity: 0.78,
      },
      // Aurora-lit upper granite whaleback highlight & bright waterline shimmer
      {
        kind: "path",
        d: "M58 147 C68 140 80 138 94 139 C106 140 115 143 121 147",
        stroke: "accent-soft",
        strokeWidth: 1.4,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      { kind: "line", x1: 48, y1: 153.5, x2: 130, y2: 153.5, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.64 },

      // Crisp cluster of tall pointed white-pine & black-spruce silhouettes crowning the island
      // Tall iconic windswept white pine at island crest
      {
        kind: "path",
        d: "M82 142 L82 108 M82 112 L73 115 M82 113 L92 111 M82 120 L71 122 M82 120 L94 123 M82 128 L73 130 M82 128 L91 130",
        stroke: "deep",
        strokeWidth: 2.3,
        strokeLinecap: "round",
      },
      // Pointed boreal spruce & pine silhouettes flanking the white pine across the granite dome
      { kind: "polygon", points: "68,116 61,144 75,144", fill: "deep" },
      { kind: "polygon", points: "96,112 88,144 104,144", fill: "deep" },
      { kind: "polygon", points: "108,122 101,146 115,146", fill: "deep" },
      { kind: "polygon", points: "60,127 55,147 65,147", fill: "deep" },
      { kind: "polygon", points: "117,130 112,148 122,148", fill: "deep" },

      // Plane 5: Foreground lone northwoods canoe, paddler & V-wake ripples
      // Canoe hull with upturned voyageur bow & stern
      {
        kind: "path",
        d: "M56 196 C60 205 70 209 90 209 C110 209 120 205 124 196 C116 201 106 202 90 202 C74 202 64 201 56 196 Z",
        fill: "deep",
      },
      { kind: "path", d: "M60 199 Q90 204 120 199", stroke: "accent-soft", strokeWidth: 1.1, opacity: 0.72 },
      // Silhouetted paddler & angled paddle dipping into the water
      { kind: "circle", cx: 83, cy: 184, r: 3.4, fill: "deep" },
      { kind: "path", d: "M77 202 L79 189 L88 190 L89 202 Z", fill: "deep" },
      { kind: "line", x1: 79, y1: 191, x2: 96, y2: 211, stroke: "deep", strokeWidth: 2, strokeLinecap: "round" },
      // Crisp V-wake ripples & paddle dip ring
      {
        kind: "path",
        d: "M122 206 C136 209 152 213 169 220 M118 210 C132 215 146 221 160 229",
        stroke: "accent-soft",
        strokeWidth: 1.4,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M42 210 Q78 214 116 210",
        stroke: "paper",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.68,
      },
      { kind: "ellipse", cx: 96, cy: 212, rx: 6, ry: 2, stroke: "paper", strokeWidth: 1, opacity: 0.65 },
    ],
  },
] as const
