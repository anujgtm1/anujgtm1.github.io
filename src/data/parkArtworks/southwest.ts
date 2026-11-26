import type { ParkArtworkSpec } from "../../types/parks.ts"

/**
 * Batch 2 bespoke WPA-screenprint National Park poster artworks:
 * 11 Southwest Canyons & Arid Icons.
 *
 * Artboard: viewBox="0 0 180 240" (3:4 portrait), clipped inner print area
 * x=[14..166], y=[14..226], horizontal center x=90. Edge-touching fills
 * bleed cleanly to x=[11..169], y=[11..229] with zero <text> nodes.
 */
export const SOUTHWEST_PARK_ARTWORKS: readonly ParkArtworkSpec[] = [
  // =========================================================================
  // 1. ARCH — Arches National Park (UT)
  // =========================================================================
  {
    code: "ARCH",
    subject: "Delicate Arch atop Entrada slickrock bowl with distant snow-dusted La Sal Mountains",
    accentLight: "#D46E2E",
    accentDark: "#F49E62",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Warm glowing desert sky, low sun & serene desert clouds
      { kind: "circle", cx: 120, cy: 64, r: 34, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 120, cy: 64, r: 22, fill: "accent-soft", opacity: 0.46 },
      { kind: "circle", cx: 120, cy: 64, r: 13.5, fill: "accent", opacity: 0.9 },
      { kind: "path", d: "M18 32 Q42 27 68 32 Q48 35 18 32 Z", fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M116 36 Q140 31 164 36 Q146 39 116 36 Z", fill: "paper", opacity: 0.48 },

      // Plane 2: Distant snow-dusted La Sal Mountains low on the desert horizon
      {
        kind: "path",
        d: "M11 148 L28 134 L42 139 L58 128 L76 140 L108 142 L126 126 L142 135 L156 124 L169 135 L169 168 L11 168 Z",
        fill: "far",
      },
      { kind: "polygon", points: "58,128 52,135 58,133 64,136", fill: "paper", opacity: 0.86 },
      { kind: "polygon", points: "126,126 119,134 126,131 132,135", fill: "paper", opacity: 0.88 },
      { kind: "polygon", points: "156,124 149,133 156,130 162,134", fill: "paper", opacity: 0.86 },
      { kind: "polygon", points: "28,134 23,140 28,138 33,140", fill: "paper", opacity: 0.72 },

      // Plane 3: Distant red-rock valley bench behind the slickrock rim
      {
        kind: "path",
        d: "M11 154 Q52 148 96 158 Q136 164 169 154 L169 182 L11 182 Z",
        fill: "mid",
      },

      // Plane 4: Hero Landmark — Sculpted free-standing Delicate Arch
      // Authentic asymmetric profile: thinner stepped left leg, graceful span, broader right buttress
      {
        kind: "path",
        d: "M44 174 L48 144 L45 133 L49 102 C51 74 69 56 93 56 C117 56 132 72 137 100 L142 130 L138 145 L145 178 L110 179 L108 144 L106 112 C105 90 98 80 88 80 C76 80 68 90 66 112 L63 144 L61 174 Z",
        fill: "ink",
      },
      // Sunlit dawn face warming the right buttress & upper crown
      {
        kind: "path",
        d: "M93 56 C117 56 132 72 137 100 L142 130 L138 145 L145 178 L124 178 L123 136 C122 104 115 76 93 66 Z",
        fill: "accent",
        opacity: 0.62,
      },
      // Deep shaded inner-right soffit & stepped base undercut for 3D sculptural depth
      {
        kind: "path",
        d: "M88 80 C98 80 105 90 106 112 L108 144 L110 179 L118 179 L115 138 C114 106 108 78 93 74 C86 74 82 77 88 80 Z",
        fill: "deep",
        opacity: 0.44,
      },
      // Sunlit inner-left rim catching grazing morning light
      {
        kind: "path",
        d: "M61 172 L63 144 L66 112 C68 90 76 80 88 80",
        stroke: "accent-soft",
        strokeWidth: 2,
        strokeLinecap: "round",
        opacity: 0.86,
      },
      // Crisp sunlit outer crest highlight
      {
        kind: "path",
        d: "M90 57 C114 57 129 72 135 98",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.68,
      },
      // Horizontal Entrada sandstone bedding planes etched across both legs
      { kind: "line", x1: 47, y1: 122, x2: 63, y2: 122, stroke: "paper", strokeWidth: 1.1, opacity: 0.36 },
      { kind: "line", x1: 47, y1: 148, x2: 61, y2: 148, stroke: "deep", strokeWidth: 1.2, opacity: 0.34 },
      { kind: "line", x1: 110, y1: 118, x2: 138, y2: 118, stroke: "paper", strokeWidth: 1.2, opacity: 0.4 },
      { kind: "line", x1: 112, y1: 144, x2: 138, y2: 144, stroke: "accent-soft", strokeWidth: 1.3, opacity: 0.45 },

      // Plane 5: Sweeping sloping Entrada sandstone slickrock bowl foreground
      {
        kind: "path",
        d: "M11 170 Q58 161 102 173 Q142 183 169 173 L169 210 L11 210 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M11 170 Q58 161 102 173 Q142 183 169 173",
        stroke: "accent-soft",
        strokeWidth: 2.2,
        opacity: 0.74,
      },
      {
        kind: "path",
        d: "M11 188 Q64 179 118 198 Q148 208 169 201 L169 229 L11 229 Z",
        fill: "deep",
      },
      // Sweeping petrified-dune cross-bedding contours on the slickrock bowl
      {
        kind: "path",
        d: "M14 196 Q68 188 122 208 Q148 216 166 212",
        stroke: "accent",
        strokeWidth: 1.4,
        opacity: 0.44,
      },
      {
        kind: "path",
        d: "M14 210 Q66 204 116 222",
        stroke: "mid",
        strokeWidth: 1.2,
        opacity: 0.36,
      },
    ],
  },

  // =========================================================================
  // 2. BRCA — Bryce Canyon National Park (UT)
  // =========================================================================
  {
    code: "BRCA",
    subject: "Bryce Amphitheater tiered crimson hoodoo spires & flat-capped Thor's Hammer",
    accentLight: "#D96A32",
    accentDark: "#F59C68",
    skyMood: "dawn",
    nodes: [
      // Plane 1: High-plateau dawn sky, warm sun & crisp thin clouds
      { kind: "circle", cx: 134, cy: 38, r: 24, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 134, cy: 38, r: 12, fill: "accent", opacity: 0.9 },
      { kind: "path", d: "M18 30 Q44 25 72 30 Q52 34 18 30 Z", fill: "paper", opacity: 0.6 },
      { kind: "path", d: "M76 44 Q98 40 116 44 Q96 47 76 44 Z", fill: "paper", opacity: 0.45 },

      // Plane 2: Distant Paunsaugunt Plateau rim & subalpine pine silhouette edge
      {
        kind: "path",
        d: "M11 66 L58 64 L98 67 L138 62 L169 65 L169 104 L11 104 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M11 66 L18 60 L25 65 L33 59 L40 64 L49 58 L57 64 L128 63 L137 57 L146 62 L155 57 L169 64 L169 72 L11 72 Z",
        fill: "mid",
        opacity: 0.68,
      },

      // Plane 3: Curved amphitheater walls & back-row hoodoo spires
      {
        kind: "path",
        d: "M11 76 Q44 82 68 106 L64 174 L11 174 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M169 74 Q136 82 112 108 L116 174 L169 174 Z",
        fill: "mid",
      },
      // Sunlit amphitheater basin haze behind the foreground hoodoos
      {
        kind: "path",
        d: "M50 112 Q90 100 130 112 L144 182 L36 182 Z",
        fill: "accent-soft",
        opacity: 0.36,
      },
      // Distant mid-amphitheater hoodoo needles
      {
        kind: "path",
        d: "M46 168 L48 118 L45 112 L52 108 L57 112 L54 118 L57 168 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M64 166 L66 122 L63 116 L69 112 L74 116 L71 122 L73 166 Z",
        fill: "accent",
        opacity: 0.68,
      },
      {
        kind: "path",
        d: "M108 166 L110 116 L107 110 L114 106 L119 110 L116 116 L119 166 Z",
        fill: "accent",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M126 168 L128 122 L125 116 L132 112 L137 116 L134 122 L136 168 Z",
        fill: "mid",
      },

      // Plane 4: Foreground-midground sculpted hoodoo fins & HERO Thor's Hammer
      // Left tall fluted hoodoo spire cluster
      {
        kind: "path",
        d: "M14 202 L18 112 L15 104 L26 96 L36 104 L32 112 L35 142 L41 128 L38 122 L47 117 L53 122 L50 130 L54 202 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M26 96 L36 104 L32 112 L35 142 L38 198 L27 198 Z",
        fill: "accent",
        opacity: 0.52,
      },
      { kind: "line", x1: 18, y1: 112, x2: 34, y2: 112, stroke: "paper", strokeWidth: 1.6, opacity: 0.75 },
      { kind: "line", x1: 17, y1: 136, x2: 34, y2: 136, stroke: "accent-soft", strokeWidth: 1.8, opacity: 0.7 },
      { kind: "line", x1: 16, y1: 162, x2: 52, y2: 162, stroke: "paper", strokeWidth: 1.5, opacity: 0.58 },

      // HERO — Iconic Thor's Hammer (wide flat-topped caprock balanced atop delicate pinched neck)
      {
        kind: "path",
        d: "M72 204 L76 158 L81 130 L79 118 L68 115 L67 96 L72 86 L102 86 L107 95 L106 114 L94 118 L92 130 L98 158 L103 204 Z",
        fill: "ink",
      },
      // Sunlit eastern dawn face on Thor's Hammer
      {
        kind: "path",
        d: "M87 86 L102 86 L107 95 L106 114 L94 118 L92 130 L98 158 L103 204 L88 204 L87 130 Z",
        fill: "accent",
        opacity: 0.66,
      },
      // Deep shadow undercut directly beneath the hammerhead caprock overhang
      {
        kind: "path",
        d: "M70 114 L104 114 L94 120 L79 120 Z",
        fill: "deep",
        opacity: 0.78,
      },
      // Pale cream Claron limestone horizontal bands across Thor's Hammer
      { kind: "line", x1: 69, y1: 96, x2: 105, y2: 96, stroke: "paper", strokeWidth: 2, opacity: 0.84 },
      { kind: "line", x1: 69, y1: 107, x2: 104, y2: 107, stroke: "accent-soft", strokeWidth: 1.8, opacity: 0.8 },
      { kind: "line", x1: 80, y1: 132, x2: 93, y2: 132, stroke: "paper", strokeWidth: 1.6, opacity: 0.72 },
      { kind: "line", x1: 76, y1: 156, x2: 98, y2: 156, stroke: "accent-soft", strokeWidth: 1.8, opacity: 0.72 },
      { kind: "line", x1: 74, y1: 178, x2: 100, y2: 178, stroke: "paper", strokeWidth: 1.5, opacity: 0.56 },

      // Right slender grooved hoodoo twin spires
      {
        kind: "path",
        d: "M122 204 L126 114 L123 106 L133 98 L141 106 L137 114 L140 150 L146 124 L143 116 L154 108 L163 116 L159 125 L164 204 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M133 98 L141 106 L137 114 L140 150 L142 202 L132 202 Z",
        fill: "accent",
        opacity: 0.58,
      },
      { kind: "line", x1: 125, y1: 114, x2: 139, y2: 114, stroke: "paper", strokeWidth: 1.6, opacity: 0.74 },
      { kind: "line", x1: 124, y1: 142, x2: 160, y2: 142, stroke: "accent-soft", strokeWidth: 1.7, opacity: 0.68 },
      { kind: "line", x1: 123, y1: 168, x2: 162, y2: 168, stroke: "paper", strokeWidth: 1.4, opacity: 0.55 },

      // Plane 5: Grounded dark crimson foreground amphitheater rim
      {
        kind: "path",
        d: "M11 190 Q48 182 88 196 Q128 184 169 192 L169 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M11 190 Q48 182 88 196 Q128 184 169 192",
        stroke: "accent",
        strokeWidth: 1.6,
        opacity: 0.58,
      },
    ],
  },

  // =========================================================================
  // 3. CANY — Canyonlands National Park (UT)
  // =========================================================================
  {
    code: "CANY",
    subject: "Mesa Arch glowing underside framing Washer Woman Arch, Monster Tower & Island in the Sky",
    accentLight: "#C96A2C",
    accentDark: "#EF9E60",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Dawn sunrise sky visible above & through the Mesa Arch window
      { kind: "circle", cx: 96, cy: 102, r: 34, fill: "accent-soft", opacity: 0.4 },
      { kind: "circle", cx: 96, cy: 102, r: 21, fill: "accent-soft", opacity: 0.56 },
      { kind: "circle", cx: 96, cy: 102, r: 11.5, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M34 80 Q62 75 88 80 Q66 83 34 80 Z", fill: "paper", opacity: 0.52 },
      { kind: "path", d: "M108 84 Q130 80 150 84 Q132 87 108 84 Z", fill: "paper", opacity: 0.46 },

      // Plane 2: Distant flat-topped Island in the Sky mesas & canyon abyss
      {
        kind: "path",
        d: "M18 118 L52 118 L58 124 L118 124 L124 116 L162 116 L162 154 L18 154 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M18 134 L66 136 L74 146 L112 146 L122 136 L162 134 L162 184 L18 184 Z",
        fill: "mid",
      },
      // Sunlit canyon floor shelf far below
      {
        kind: "path",
        d: "M22 162 Q90 154 158 164 L158 202 L22 202 Z",
        fill: "accent-soft",
        opacity: 0.36,
      },
      { kind: "path", d: "M24 152 Q64 148 92 156 Q124 150 156 154", stroke: "paper", strokeWidth: 1.2, opacity: 0.45 },

      // Plane 3: Iconic Washer Woman Arch & Monster Tower spires inside the canyon window
      // Monster Tower (tall slender needle spire left-of-center)
      {
        kind: "path",
        d: "M64 184 L68 138 L71 116 L75 116 L78 138 L83 184 Z",
        fill: "ink",
      },
      { kind: "line", x1: 75, y1: 117, x2: 80, y2: 178, stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.72 },
      // Washer Woman Arch (sculpted sandstone fin with sky-eye window)
      {
        kind: "path",
        d: "M90 184 L94 142 L99 124 L107 122 L114 134 L118 154 L124 184 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M107 122 L114 134 L118 154 L124 184 L108 184 L106 140 Z",
        fill: "accent",
        opacity: 0.56,
      },
      { kind: "ellipse", cx: 104, cy: 146, rx: 3.4, ry: 5, fill: "paper", opacity: 0.88 },
      // Lower canyon floor mesa rim terrace
      {
        kind: "path",
        d: "M18 176 Q58 168 94 178 Q128 170 162 176 L162 204 L18 204 Z",
        fill: "ink",
        opacity: 0.84,
      },
      { kind: "path", d: "M28 186 Q90 179 152 186", stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.48 },

      // Plane 4 & 5: Dramatic foreground silhouette of MESA ARCH with glowing sunlit underside
      // Massive sweeping stone arch span (leaving narrow open sky above y=11..34 so arch silhouette reads immediately)
      {
        kind: "path",
        d: "M11 46 Q50 32 90 31 Q130 32 169 48 L169 229 L142 229 L146 184 C150 144 152 104 144 86 C132 62 112 52 90 52 C68 52 48 62 36 86 C28 104 30 144 34 184 L38 229 L11 229 Z",
        fill: "deep",
      },
      // Sunlit weathered top rim of Mesa Arch catching dawn sky
      {
        kind: "path",
        d: "M11 46 Q50 32 90 31 Q130 32 169 48 L169 54 Q130 39 90 38 Q50 39 11 52 Z",
        fill: "ink",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M14 46 Q52 33 90 32 Q128 33 166 48",
        stroke: "accent-soft",
        strokeWidth: 1.4,
        opacity: 0.56,
      },
      // Iconic fiery-orange bounced-sunlight glowing underside of Mesa Arch
      {
        kind: "path",
        d: "M33 96 C44 64 66 50 90 50 C114 50 136 64 147 96",
        stroke: "accent",
        strokeWidth: 6.4,
        strokeLinecap: "round",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M40 84 C52 60 70 51 90 51 C110 51 128 60 140 84",
        stroke: "accent-soft",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M58 62 C68 55 78 52 90 52 C102 52 112 55 122 62",
        stroke: "paper",
        strokeWidth: 1.3,
        strokeLinecap: "round",
        opacity: 0.8,
      },
      // Grounded foreground sandstone ledge floor beneath the arch window
      {
        kind: "path",
        d: "M11 194 Q56 188 94 198 Q134 190 169 194 L169 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M24 194 Q60 189 94 198 Q130 191 156 194",
        stroke: "accent",
        strokeWidth: 1.8,
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M16 212 Q64 206 116 216 Q144 212 164 214",
        stroke: "ink",
        strokeWidth: 1.4,
        opacity: 0.5,
      },
    ],
  },

  // =========================================================================
  // 4. CARE — Capitol Reef National Park (UT)
  // =========================================================================
  {
    code: "CARE",
    subject: "The Castle Wingate fortress, pale Navajo Capitol Dome & tilted Waterpocket Fold",
    accentLight: "#C97A3C",
    accentDark: "#EDAA6E",
    skyMood: "noon",
    nodes: [
      // Plane 1: Crisp high-desert noon sky & wind-scoured clouds
      { kind: "circle", cx: 38, cy: 34, r: 17, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 38, cy: 34, r: 9.5, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M72 30 Q98 24 128 30 Q106 34 72 30 Z", fill: "paper", opacity: 0.65 },
      { kind: "path", d: "M128 46 Q146 42 164 46 Q148 49 128 46 Z", fill: "paper", opacity: 0.52 },

      // Plane 2: Far mesa & iconic pale-cream Navajo Sandstone Capitol Dome
      {
        kind: "path",
        d: "M11 102 L48 100 L64 114 L11 124 Z",
        fill: "far",
      },
      // Pale rounded Capitol Dome rising behind right flank of The Castle
      {
        kind: "path",
        d: "M104 126 Q116 74 138 72 Q158 74 169 112 L169 144 L104 144 Z",
        fill: "paper",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M138 72 Q158 74 169 112 L169 138 L142 138 Q144 100 138 72 Z",
        fill: "far",
        opacity: 0.54,
      },
      { kind: "path", d: "M114 96 Q138 88 162 96", stroke: "mid", strokeWidth: 1.1, opacity: 0.42 },

      // Plane 3: Hero Landmark — THE CASTLE (crenellated red Wingate sandstone monolith)
      {
        kind: "path",
        d: "M14 154 L24 114 L34 108 L40 76 L50 74 L54 60 L66 58 L70 70 L82 68 L86 52 L100 54 L104 72 L114 78 L120 112 L134 150 Z",
        fill: "ink",
      },
      // Pale Navajo sandstone cap crests crowning The Castle's twin turrets
      { kind: "polygon", points: "54,60 66,58 68,66 53,67", fill: "paper", opacity: 0.9 },
      { kind: "polygon", points: "86,52 100,54 102,63 85,63", fill: "paper", opacity: 0.92 },
      // Warm sunlit western face of The Castle
      {
        kind: "path",
        d: "M40 76 L50 74 L54 67 L66 66 L66 138 L24 142 L34 108 Z",
        fill: "accent",
        opacity: 0.54,
      },
      // Vertical Wingate sandstone cliff flutes & horizontal Chinle talus ledges
      { kind: "line", x1: 58, y1: 68, x2: 58, y2: 120, stroke: "deep", strokeWidth: 1.3, opacity: 0.54 },
      { kind: "line", x1: 76, y1: 70, x2: 76, y2: 122, stroke: "deep", strokeWidth: 1.4, opacity: 0.58 },
      { kind: "line", x1: 94, y1: 64, x2: 94, y2: 120, stroke: "deep", strokeWidth: 1.3, opacity: 0.54 },
      { kind: "line", x1: 108, y1: 76, x2: 108, y2: 120, stroke: "deep", strokeWidth: 1.2, opacity: 0.48 },
      { kind: "path", d: "M34 108 L118 108", stroke: "accent-soft", strokeWidth: 1.8, opacity: 0.72 },
      { kind: "path", d: "M24 128 L124 126", stroke: "paper", strokeWidth: 1.4, opacity: 0.48 },

      // Plane 4: Sweeping diagonally tilted WATERPOCKET FOLD monocline sedimentary ridges
      {
        kind: "path",
        d: "M11 168 L169 118 L169 136 L11 184 Z",
        fill: "mid",
      },
      { kind: "line", x1: 11, y1: 168, x2: 169, y2: 118, stroke: "paper", strokeWidth: 2, opacity: 0.8 },
      {
        kind: "path",
        d: "M11 182 L169 134 L169 154 L11 198 Z",
        fill: "accent",
        opacity: 0.64,
      },
      { kind: "line", x1: 11, y1: 182, x2: 169, y2: 134, stroke: "accent-soft", strokeWidth: 1.6, opacity: 0.82 },
      {
        kind: "path",
        d: "M11 194 L169 152 L169 182 L11 216 Z",
        fill: "ink",
      },
      { kind: "line", x1: 11, y1: 194, x2: 169, y2: 152, stroke: "deep", strokeWidth: 1.4, opacity: 0.55 },

      // Plane 5: Quiet Fremont River valley floor & gleaming river ribbon
      {
        kind: "path",
        d: "M11 198 Q62 192 114 202 Q146 196 169 194 L169 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M11 217 Q58 206 106 215 T169 208",
        stroke: "accent-soft",
        strokeWidth: 6.4,
        strokeLinecap: "round",
        opacity: 0.56,
      },
      {
        kind: "path",
        d: "M11 217 Q58 206 106 215 T169 208",
        stroke: "paper",
        strokeWidth: 2.6,
        strokeLinecap: "round",
        opacity: 0.9,
      },
    ],
  },

  // =========================================================================
  // 5. ZION — Zion National Park (UT)
  // =========================================================================
  {
    code: "ZION",
    subject: "The Watchman vermilion-and-cream monolith & gleaming Virgin River at golden hour",
    accentLight: "#D16938",
    accentDark: "#F29D70",
    skyMood: "dusk",
    nodes: [
      // Plane 1: Glowing golden-hour dusk sky behind The Watchman
      { kind: "circle", cx: 90, cy: 84, r: 46, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 90, cy: 84, r: 28, fill: "accent-soft", opacity: 0.5 },
      { kind: "circle", cx: 90, cy: 84, r: 15, fill: "accent", opacity: 0.82 },
      { kind: "path", d: "M18 32 Q48 26 78 32 Q54 36 18 32 Z", fill: "paper", opacity: 0.58 },
      { kind: "path", d: "M108 38 Q136 33 164 38 Q142 42 108 38 Z", fill: "paper", opacity: 0.5 },

      // Plane 2: Flanking soaring Navajo sandstone Zion Canyon walls
      {
        kind: "path",
        d: "M11 72 L38 76 L48 94 L58 110 L66 160 L11 160 Z",
        fill: "far",
      },
      { kind: "path", d: "M11 72 L38 76 L42 86 L11 84 Z", fill: "paper", opacity: 0.56 },
      {
        kind: "path",
        d: "M169 68 L142 74 L132 94 L122 112 L114 160 L169 160 Z",
        fill: "mid",
      },
      { kind: "path", d: "M169 68 L142 74 L138 84 L169 80 Z", fill: "accent-soft", opacity: 0.58 },

      // Plane 3: Hero Landmark — THE WATCHMAN steep triangular-crowned monolith
      {
        kind: "path",
        d: "M34 166 L52 128 L60 110 L70 86 L78 68 L87 48 L94 48 L103 68 L112 86 L122 112 L130 128 L148 166 Z",
        fill: "ink",
      },
      // Cream-white Navajo sandstone upper crown
      {
        kind: "path",
        d: "M78 68 L87 48 L94 48 L103 68 L96 74 L90 68 L84 74 Z",
        fill: "paper",
        opacity: 0.9,
      },
      // Glowing golden-hour vermilion eastern facet on The Watchman
      {
        kind: "path",
        d: "M90 48 L94 48 L103 68 L112 86 L122 112 L130 128 L144 164 L90 164 L92 106 Z",
        fill: "accent",
        opacity: 0.58,
      },
      // Shaded western face & dramatic vertical sandstone buttress ribs
      {
        kind: "path",
        d: "M87 48 L78 68 L70 86 L60 110 L86 158 L88 94 Z",
        fill: "deep",
        opacity: 0.34,
      },
      { kind: "line", x1: 78, y1: 72, x2: 72, y2: 148, stroke: "deep", strokeWidth: 1.3, opacity: 0.48 },
      { kind: "line", x1: 103, y1: 72, x2: 112, y2: 150, stroke: "accent-soft", strokeWidth: 1.3, opacity: 0.62 },
      // Stepped Kayenta-Wingate horizontal canyon ledges
      { kind: "line", x1: 68, y1: 92, x2: 114, y2: 92, stroke: "accent-soft", strokeWidth: 1.6, opacity: 0.68 },
      { kind: "line", x1: 54, y1: 124, x2: 128, y2: 124, stroke: "paper", strokeWidth: 1.5, opacity: 0.52 },

      // Plane 4: Canyon floor slopes & gleaming S-curving VIRGIN RIVER
      { kind: "path", d: "M11 152 L58 160 L74 184 L11 196 Z", fill: "deep" },
      { kind: "path", d: "M169 150 L124 160 L106 184 L169 196 Z", fill: "deep" },
      {
        kind: "path",
        d: "M84 160 L96 160 C106 172 122 178 118 192 C114 206 90 212 96 229 L52 229 C58 210 88 202 88 190 C88 178 78 170 84 160 Z",
        fill: "mid",
      },
      // Golden dusk light shimmering down the curving river surface
      {
        kind: "path",
        d: "M90 162 C98 174 112 180 106 192 C100 204 76 212 74 229",
        stroke: "accent-soft",
        strokeWidth: 7.4,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M90 162 C98 174 112 180 106 192 C100 204 76 212 74 229",
        stroke: "paper",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M88 186 Q100 183 110 186 M74 204 Q88 200 102 204 M64 218 Q78 214 92 218",
        stroke: "paper",
        strokeWidth: 1.3,
        strokeLinecap: "round",
        opacity: 0.68,
      },

      // Plane 5: Foreground riparian riverbanks & smooth Virgin River cobbles
      { kind: "path", d: "M11 186 Q44 190 62 206 L52 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 184 Q138 192 120 208 L128 229 L169 229 Z", fill: "deep" },
      { kind: "ellipse", cx: 48, cy: 208, rx: 10, ry: 5.5, fill: "ink" },
      { kind: "ellipse", cx: 34, cy: 218, rx: 8, ry: 4.5, fill: "mid", opacity: 0.72 },
      { kind: "ellipse", cx: 132, cy: 208, rx: 11, ry: 5.8, fill: "ink" },
      { kind: "ellipse", cx: 146, cy: 218, rx: 8.5, ry: 4.5, fill: "mid", opacity: 0.72 },
      { kind: "path", d: "M42 205 Q48 202 54 205 M126 205 Q132 202 138 205", stroke: "accent-soft", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.65 },
    ],
  },

  // =========================================================================
  // 6. MEVE — Mesa Verde National Park (CO)
  // =========================================================================
  {
    code: "MEVE",
    subject: "Cliff Palace Ancestral Puebloan masonry, Round Tower & sunken kivas beneath sandstone alcove",
    accentLight: "#C47D3B",
    accentDark: "#EAB173",
    skyMood: "noon",
    nodes: [
      // Plane 1: Crisp mesa-top sky sliver & recessed warm sandstone alcove interior
      { kind: "circle", cx: 142, cy: 20, r: 9, fill: "accent-soft", opacity: 0.45 },
      {
        kind: "path",
        d: "M22 178 C20 112 38 56 90 54 C142 56 160 112 158 178 Z",
        fill: "mid",
      },
      // Warm sunlit limestone glow filling the sheltered alcove recess
      { kind: "ellipse", cx: 90, cy: 134, rx: 56, ry: 36, fill: "accent-soft", opacity: 0.44 },

      // Plane 2: Monumental arched sandstone mesa canyon overhang framing the alcove
      {
        kind: "path",
        d: "M11 26 L169 26 L169 188 L148 188 C154 122 140 62 90 60 C40 62 26 122 32 188 L11 188 Z",
        fill: "deep",
      },
      // Sunlit flat plateau rim across top of the mesa cliff
      { kind: "rect", x: 11, y: 26, width: 158, height: 7, fill: "mid" },
      { kind: "line", x1: 11, y1: 26, x2: 169, y2: 26, stroke: "paper", strokeWidth: 1.8, opacity: 0.78 },
      // Sandstone strata ledges etched across the overhanging brow
      { kind: "line", x1: 14, y1: 42, x2: 166, y2: 42, stroke: "ink", strokeWidth: 1.4, opacity: 0.55 },
      { kind: "path", d: "M34 94 C44 68 64 58 90 58 C116 58 136 68 146 94", stroke: "accent-soft", strokeWidth: 1.6, opacity: 0.62 },

      // Plane 3: Hero Landmark — CLIFF PALACE multi-story masonry & Round Tower
      // Left 2-story square roomblock
      { kind: "rect", x: 38, y: 120, width: 24, height: 46, fill: "paper", opacity: 0.92 },
      { kind: "rect", x: 54, y: 120, width: 8, height: 46, fill: "accent-soft", opacity: 0.82 },
      // Center 3-story Square Tower masonry block
      { kind: "rect", x: 64, y: 98, width: 28, height: 68, fill: "paper", opacity: 0.96 },
      { kind: "rect", x: 82, y: 98, width: 10, height: 68, fill: "accent-soft", opacity: 0.85 },
      // Iconic cylindrical tapering ROUND STONE TOWER
      {
        kind: "path",
        d: "M96 166 L98 92 Q105 89 112 92 L114 166 Z",
        fill: "paper",
        opacity: 0.96,
      },
      {
        kind: "path",
        d: "M105 90 Q109 90 112 92 L114 166 L106 166 Z",
        fill: "accent",
        opacity: 0.56,
      },
      // Right stepped roomblock
      { kind: "rect", x: 116, y: 114, width: 26, height: 52, fill: "accent-soft", opacity: 0.92 },
      { kind: "rect", x: 116, y: 114, width: 12, height: 14, fill: "paper", opacity: 0.9 },

      // Masonry stone courses & timber viga roof parapets
      { kind: "line", x1: 38, y1: 120, x2: 62, y2: 120, stroke: "deep", strokeWidth: 1.6 },
      { kind: "line", x1: 64, y1: 98, x2: 92, y2: 98, stroke: "deep", strokeWidth: 1.8 },
      { kind: "line", x1: 116, y1: 114, x2: 142, y2: 114, stroke: "deep", strokeWidth: 1.6 },
      { kind: "line", x1: 64, y1: 124, x2: 92, y2: 124, stroke: "ink", strokeWidth: 1, opacity: 0.45 },
      { kind: "line", x1: 97, y1: 118, x2: 113, y2: 118, stroke: "ink", strokeWidth: 1, opacity: 0.45 },
      { kind: "line", x1: 96, y1: 142, x2: 114, y2: 142, stroke: "ink", strokeWidth: 1, opacity: 0.45 },

      // Crisp dark Ancestral Puebloan T-shaped doorways & square windows
      { kind: "path", d: "M73 136 L81 136 L81 141 L79 141 L79 150 L75 150 L75 141 L73 141 Z", fill: "deep" },
      { kind: "path", d: "M46 142 L53 142 L53 146 L51 146 L51 154 L48 154 L48 146 L46 146 Z", fill: "deep" },
      { kind: "rect", x: 70, y: 106, width: 4.5, height: 6, fill: "deep" },
      { kind: "rect", x: 80, y: 106, width: 4.5, height: 6, fill: "deep" },
      { kind: "rect", x: 47, y: 128, width: 4.5, height: 5.5, fill: "deep" },
      { kind: "rect", x: 102.5, y: 102, width: 4.2, height: 6, fill: "deep" },
      { kind: "rect", x: 102.5, y: 124, width: 4.2, height: 6, fill: "deep" },
      { kind: "rect", x: 122, y: 124, width: 4.5, height: 6, fill: "deep" },
      { kind: "rect", x: 132, y: 138, width: 4.5, height: 6.5, fill: "deep" },

      // Plane 4: Stone plaza terrace & two circular sunken KIVA rings
      { kind: "path", d: "M22 164 L158 164 L164 194 L16 194 Z", fill: "ink" },
      { kind: "path", d: "M26 164 L154 164 L156 174 L24 174 Z", fill: "accent-soft", opacity: 0.72 },
      // Left sunken kiva
      { kind: "ellipse", cx: 64, cy: 179, rx: 16, ry: 7.2, fill: "deep", stroke: "paper", strokeWidth: 1.6 },
      { kind: "ellipse", cx: 64, cy: 180, rx: 9.5, ry: 3.8, fill: "none", stroke: "accent-soft", strokeWidth: 1, opacity: 0.78 },
      // Right sunken kiva
      { kind: "ellipse", cx: 116, cy: 179, rx: 16, ry: 7.2, fill: "deep", stroke: "paper", strokeWidth: 1.6 },
      { kind: "ellipse", cx: 116, cy: 180, rx: 9.5, ry: 3.8, fill: "none", stroke: "accent-soft", strokeWidth: 1, opacity: 0.78 },

      // Plane 5: Shadowed sandstone canyon cliff plunging below Cliff Palace
      {
        kind: "path",
        d: "M11 186 L46 195 L90 199 L134 195 L169 186 L169 229 L11 229 Z",
        fill: "deep",
      },
      { kind: "path", d: "M14 206 Q90 214 166 206", stroke: "ink", strokeWidth: 1.5, opacity: 0.56 },
      { kind: "path", d: "M22 218 Q90 224 158 218", stroke: "mid", strokeWidth: 1.1, opacity: 0.42 },
    ],
  },

  // =========================================================================
  // 7. PEFO — Petrified Forest National Park (AZ)
  // =========================================================================
  {
    code: "PEFO",
    subject: "Painted Desert candy-striped Blue Mesa hills & crystalline sliced Triassic petrified log",
    accentLight: "#C25D48",
    accentDark: "#EC9482",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Warm Painted Desert sunrise sky & thin cirrus ribbons
      { kind: "circle", cx: 122, cy: 60, r: 28, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 122, cy: 60, r: 17, fill: "accent-soft", opacity: 0.48 },
      { kind: "circle", cx: 122, cy: 60, r: 10.5, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M18 30 Q48 25 78 30 Q54 33 18 30 Z", fill: "paper", opacity: 0.58 },
      { kind: "path", d: "M108 32 Q136 28 164 32 Q142 35 108 32 Z", fill: "paper", opacity: 0.46 },

      // Plane 2: Far Chinle flat-topped mesa horizon
      {
        kind: "path",
        d: "M11 96 L46 84 L82 90 L118 82 L152 88 L169 84 L169 124 L11 124 Z",
        fill: "far",
      },

      // Plane 3: Layered candy-striped clay badland hills of Blue Mesa / Painted Desert
      {
        kind: "path",
        d: "M11 116 L34 96 L56 112 L84 94 L112 114 L138 98 L169 114 L169 158 L11 158 Z",
        fill: "mid",
      },
      // Alternating horizontal bentonite clay strata bands
      { kind: "path", d: "M11 112 Q44 106 86 110 T169 108", stroke: "paper", strokeWidth: 3.2, opacity: 0.78 },
      { kind: "path", d: "M11 122 Q52 116 94 121 T169 119", stroke: "accent", strokeWidth: 3.8, opacity: 0.74 },
      { kind: "path", d: "M11 132 Q46 127 96 132 T169 130", stroke: "paper", strokeWidth: 2.8, opacity: 0.66 },
      { kind: "path", d: "M11 143 Q58 138 104 143 T169 140", stroke: "ink", strokeWidth: 3.4, opacity: 0.76 },
      { kind: "path", d: "M11 153 Q66 148 118 154 L169 151", stroke: "accent-soft", strokeWidth: 2.4, opacity: 0.7 },

      // Plane 4: Eroded Painted Desert badland floor & cast log shadow
      {
        kind: "path",
        d: "M11 154 Q64 148 118 154 L169 152 L169 229 L11 229 Z",
        fill: "mid",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M11 184 Q90 176 169 186 L169 229 L11 229 Z",
        fill: "deep",
      },
      // Deep ground shadow beneath the fossilized trunk
      { kind: "polygon", points: "22,192 126,220 148,214 40,184", fill: "deep", opacity: 0.76 },

      // Plane 5: Hero Landmark — Sliced Triassic petrified wood log with crystalline growth rings
      // Main stone-bark trunk resting diagonally across the desert floor
      {
        kind: "path",
        d: "M24 164 L126 170 L124 216 L22 194 L25 182 L20 174 Z",
        fill: "ink",
      },
      // Sunlit upper fossilized bark ridge
      {
        kind: "path",
        d: "M24 164 L126 170 L126 180 L23 173 Z",
        fill: "accent",
        opacity: 0.54,
      },
      // Longitudinal petrified stone-bark ridges & clean transverse quartz fracture
      { kind: "line", x1: 34, y1: 175, x2: 108, y2: 182, stroke: "deep", strokeWidth: 1.5, opacity: 0.72 },
      { kind: "line", x1: 28, y1: 185, x2: 108, y2: 196, stroke: "deep", strokeWidth: 1.6, opacity: 0.72 },
      { kind: "line", x1: 36, y1: 193, x2: 106, y2: 206, stroke: "deep", strokeWidth: 1.4, opacity: 0.65 },
      { kind: "line", x1: 68, y1: 167, x2: 64, y2: 203, stroke: "deep", strokeWidth: 2.4 },
      { kind: "line", x1: 70, y1: 168, x2: 66, y2: 203, stroke: "paper", strokeWidth: 1, opacity: 0.58 },

      // Gleaming concentric crystalline cross-section facing the viewer
      { kind: "ellipse", cx: 126, cy: 193, rx: 18, ry: 23, fill: "deep" },
      { kind: "ellipse", cx: 126, cy: 193, rx: 14.5, ry: 19.2, fill: "paper", opacity: 0.96 },
      { kind: "ellipse", cx: 126, cy: 193, rx: 11, ry: 14.8, fill: "accent-soft", stroke: "accent", strokeWidth: 1.8 },
      { kind: "ellipse", cx: 126, cy: 193, rx: 7.4, ry: 10.2, fill: "accent", stroke: "paper", strokeWidth: 1.2, opacity: 0.88 },
      { kind: "ellipse", cx: 126, cy: 193, rx: 3.6, ry: 5.2, fill: "ink", stroke: "paper", strokeWidth: 1.1 },
      {
        kind: "path",
        d: "M126 175 L126 184 M137 193 L131 193 M116 198 L122 195",
        stroke: "paper",
        strokeWidth: 1.1,
        strokeLinecap: "round",
        opacity: 0.78,
      },

      // Small fractured petrified wood chunk resting in bottom-left foreground
      { kind: "polygon", points: "18,206 46,212 44,222 16,216", fill: "ink" },
      { kind: "ellipse", cx: 45, cy: 217, rx: 4, ry: 5.2, fill: "paper", stroke: "accent", strokeWidth: 1 },
    ],
  },

  // =========================================================================
  // 8. SAGU — Saguaro National Park (AZ)
  // =========================================================================
  {
    code: "SAGU",
    subject: "Majestic pleated Sonoran Saguaro giant against Rincon Mountains sunset",
    accentLight: "#D97536",
    accentDark: "#F4A46B",
    skyMood: "dusk",
    nodes: [
      // Plane 1: Banded evening Sonoran desert sky & glowing low sunset disc
      { kind: "rect", x: 11, y: 68, width: 158, height: 34, fill: "accent-soft", opacity: 0.24 },
      { kind: "rect", x: 11, y: 96, width: 158, height: 34, fill: "accent", opacity: 0.22 },
      { kind: "circle", cx: 92, cy: 104, r: 36, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 92, cy: 104, r: 24, fill: "accent-soft", opacity: 0.54 },
      { kind: "circle", cx: 92, cy: 104, r: 16.5, fill: "accent", opacity: 0.94 },
      { kind: "circle", cx: 92, cy: 104, r: 8.5, fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M18 34 Q50 28 84 34 Q58 37 18 34 Z", fill: "paper", opacity: 0.52 },
      { kind: "path", d: "M104 52 Q134 47 164 52 Q140 55 104 52 Z", fill: "accent-soft", opacity: 0.55 },

      // Plane 2: Jagged silhouette of the Rincon / Tucson Mountains
      {
        kind: "path",
        d: "M11 132 L28 112 L42 120 L58 104 L74 118 L92 124 L112 108 L128 116 L146 100 L162 114 L169 110 L169 158 L11 158 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M28 112 L42 120 L58 104 L74 118 M112 108 L128 116 L146 100 L162 114",
        stroke: "accent-soft",
        strokeWidth: 1.2,
        opacity: 0.55,
      },

      // Plane 3: Sloping Sonoran bajada foothills & two distant saguaros
      {
        kind: "path",
        d: "M11 148 Q56 138 98 152 Q138 144 169 150 L169 204 L11 204 Z",
        fill: "mid",
      },
      // Left distant saguaro on the bajada slope
      {
        kind: "path",
        d: "M34 168 L34 128 M34 150 L27 150 Q25 150 25 147 L25 138 M34 144 L40 144 Q42 144 42 141 L42 135",
        stroke: "ink",
        strokeWidth: 3.4,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      // Right distant saguaro on the far bajada slope
      {
        kind: "path",
        d: "M148 172 L148 134 M148 154 L142 154 Q140 154 140 151 L140 143 M148 148 L154 148 Q156 148 156 145 L156 140",
        stroke: "ink",
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },

      // Plane 4: Foreground sloping Sonoran desert ridge
      {
        kind: "path",
        d: "M11 186 Q56 175 102 188 Q142 178 169 188 L169 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M11 186 Q56 175 102 188 Q142 178 169 188",
        stroke: "accent",
        strokeWidth: 1.6,
        opacity: 0.48,
      },

      // Plane 5: Hero Landmark — Majestic tall pleated Saguaro giant
      // Main thick columnar trunk with rounded crown
      {
        kind: "path",
        d: "M81 226 L81 52 C81 40 99 40 99 52 L99 226 Z",
        fill: "deep",
      },
      // Left asymmetrical upward-curving arm (emerging mid-lower)
      {
        kind: "path",
        d: "M82 144 L64 144 C54 144 50 137 50 126 L50 84 C50 75 63 75 63 84 L63 128 C63 130 65 131 67 131 L82 131 Z",
        fill: "deep",
      },
      // Right asymmetrical taller upward-curving arm
      {
        kind: "path",
        d: "M98 124 L116 124 C126 124 130 117 130 106 L130 70 C130 61 117 61 117 70 L117 108 C117 110 115 111 113 111 L98 111 Z",
        fill: "deep",
      },
      // Secondary lower-right old-growth arm bud
      {
        kind: "path",
        d: "M98 164 L110 164 C116 164 119 159 119 152 L119 142 C119 136 110 136 110 142 L110 154 L98 154 Z",
        fill: "deep",
      },
      // Warm twilight sage-olive rim highlights along sun-facing cactus flanks
      {
        kind: "path",
        d: "M92 43 C97 45 99 48 99 52 L99 218 L93 218 L93 48 Z",
        fill: "ink",
        opacity: 0.64,
      },
      {
        kind: "path",
        d: "M58 77 C61 78 63 81 63 84 L63 128 L59 128 L59 80 Z",
        fill: "ink",
        opacity: 0.56,
      },
      {
        kind: "path",
        d: "M121 63 C118 64 117 67 117 70 L117 108 L121 108 L121 66 Z",
        fill: "ink",
        opacity: 0.56,
      },
      // Crisp vertical Saguaro pleat / rib lines for sculptural detail
      { kind: "line", x1: 86, y1: 50, x2: 86, y2: 214, stroke: "accent-soft", strokeWidth: 1, opacity: 0.42 },
      { kind: "line", x1: 90, y1: 46, x2: 90, y2: 216, stroke: "ink", strokeWidth: 1.2, opacity: 0.64 },
      { kind: "line", x1: 94.5, y1: 50, x2: 94.5, y2: 214, stroke: "accent-soft", strokeWidth: 1.1, opacity: 0.52 },
      { kind: "line", x1: 56.5, y1: 84, x2: 56.5, y2: 132, stroke: "accent-soft", strokeWidth: 1, opacity: 0.44 },
      { kind: "line", x1: 123.5, y1: 70, x2: 123.5, y2: 114, stroke: "accent-soft", strokeWidth: 1, opacity: 0.44 },
    ],
  },

  // =========================================================================
  // 9. BIBE — Big Bend National Park (TX)
  // =========================================================================
  {
    code: "BIBE",
    subject: "Sheer twin 1,500-foot limestone walls of Santa Elena Canyon & calm Rio Grande",
    accentLight: "#C97734",
    accentDark: "#EEA767",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Vast Chihuahuan dawn sky & high glowing sun above the canyon gate
      { kind: "circle", cx: 90, cy: 38, r: 22, fill: "accent-soft", opacity: 0.38 },
      { kind: "circle", cx: 90, cy: 38, r: 11, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M18 28 Q42 24 64 28 Q46 31 18 28 Z", fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M118 30 Q142 26 164 30 Q146 33 118 30 Z", fill: "paper", opacity: 0.52 },

      // Plane 2: Distant Chisos peak framed right through the narrow canyon portal
      {
        kind: "path",
        d: "M56 146 L76 112 L90 100 L106 114 L124 146 Z",
        fill: "far",
        opacity: 0.84,
      },
      { kind: "polygon", points: "90,100 106,114 96,124 90,114", fill: "accent-soft", opacity: 0.48 },

      // Plane 3: Hero Landmark — Twin sheer vertical 1,500-ft limestone walls of Santa Elena Canyon
      // Left sheer monolith (Sierra Ponce — shaded cool side)
      {
        kind: "path",
        d: "M11 54 L62 56 L66 94 L70 134 L73 168 L11 176 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M50 56 L62 56 L66 94 L70 134 L73 168 L54 168 Z",
        fill: "deep",
        opacity: 0.58,
      },
      { kind: "line", x1: 11, y1: 54, x2: 62, y2: 56, stroke: "paper", strokeWidth: 1.8, opacity: 0.7 },
      { kind: "line", x1: 12, y1: 86, x2: 64, y2: 88, stroke: "mid", strokeWidth: 1.3, opacity: 0.5 },
      { kind: "line", x1: 12, y1: 118, x2: 68, y2: 120, stroke: "mid", strokeWidth: 1.3, opacity: 0.45 },
      { kind: "line", x1: 12, y1: 146, x2: 71, y2: 148, stroke: "deep", strokeWidth: 1.2, opacity: 0.5 },

      // Right sheer monolith (Mesa de Anguila — sunlit warm limestone side)
      {
        kind: "path",
        d: "M169 52 L118 54 L114 92 L110 132 L107 168 L169 176 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M118 54 L134 54 L130 168 L107 168 L110 132 L114 92 Z",
        fill: "accent",
        opacity: 0.58,
      },
      { kind: "line", x1: 118, y1: 54, x2: 169, y2: 52, stroke: "paper", strokeWidth: 1.8, opacity: 0.78 },
      { kind: "line", x1: 118, y1: 54, x2: 107, y2: 166, stroke: "paper", strokeWidth: 1.5, opacity: 0.74 },
      { kind: "line", x1: 115, y1: 86, x2: 168, y2: 84, stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.62 },
      { kind: "line", x1: 112, y1: 118, x2: 168, y2: 116, stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.56 },
      { kind: "line", x1: 109, y1: 146, x2: 168, y2: 144, stroke: "ink", strokeWidth: 1.2, opacity: 0.48 },

      // Plane 4: Calm silver-lit RIO GRANDE flowing straight through the stone gates
      {
        kind: "path",
        d: "M74 144 L106 144 L115 176 L146 229 L34 229 L65 176 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M82 144 L98 144 L106 184 L124 229 L56 229 L74 184 Z",
        fill: "paper",
        opacity: 0.68,
      },
      // Calm perspective water shimmer ripples
      { kind: "line", x1: 80, y1: 158, x2: 100, y2: 158, stroke: "paper", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.82 },
      { kind: "line", x1: 74, y1: 174, x2: 106, y2: 174, stroke: "accent-soft", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.76 },
      { kind: "line", x1: 68, y1: 192, x2: 112, y2: 192, stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.8 },
      { kind: "line", x1: 60, y1: 210, x2: 120, y2: 210, stroke: "accent-soft", strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.72 },

      // Plane 5: Boulder-strewn desert riverbanks framing bottom corners
      { kind: "path", d: "M11 166 L66 174 L58 196 L42 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 166 L114 174 L122 196 L138 229 L169 229 Z", fill: "deep" },
      { kind: "ellipse", cx: 48, cy: 198, rx: 10, ry: 5.5, fill: "ink" },
      { kind: "ellipse", cx: 34, cy: 212, rx: 9, ry: 5, fill: "mid", opacity: 0.76 },
      { kind: "ellipse", cx: 132, cy: 198, rx: 10.5, ry: 5.5, fill: "ink" },
      { kind: "ellipse", cx: 146, cy: 212, rx: 9, ry: 5, fill: "mid", opacity: 0.76 },
    ],
  },

  // =========================================================================
  // 10. GUMO — Guadalupe Mountains National Park (TX)
  // =========================================================================
  {
    code: "GUMO",
    subject: "El Capitan's sheer sunlit Permian limestone prow, Guadalupe Peak & alluvial desert bajadas",
    accentLight: "#C78342",
    accentDark: "#ECB378",
    skyMood: "noon",
    nodes: [
      // Plane 1: High West Texas desert sky, noon sun & crisp wind-swept clouds
      { kind: "circle", cx: 40, cy: 36, r: 18, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 40, cy: 36, r: 9.5, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M68 28 Q98 22 132 28 Q106 32 68 28 Z", fill: "paper", opacity: 0.72 },
      { kind: "path", d: "M96 46 Q128 41 162 46 Q136 50 96 46 Z", fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M18 62 Q42 58 66 62 Q44 65 18 62 Z", fill: "paper", opacity: 0.5 },

      // Plane 2: Taller Guadalupe Peak shoulder behind El Capitan & far desert horizon
      {
        kind: "path",
        d: "M11 138 L52 134 L66 144 L11 156 Z",
        fill: "far",
        opacity: 0.76,
      },
      {
        kind: "path",
        d: "M92 132 L112 88 L128 66 L144 72 L169 98 L169 162 L92 162 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M112 88 L128 66 L133 96 L108 122 Z",
        fill: "paper",
        opacity: 0.44,
      },

      // Plane 3: Hero Landmark — EL CAPITAN'S SHEER PERMIAN LIMESTONE PROW
      // Main sculpted mountain massif & wide talus apron
      {
        kind: "path",
        d: "M11 168 L54 142 L72 124 L76 74 L82 64 L114 76 L134 118 L169 156 L169 182 L11 182 Z",
        fill: "ink",
      },
      // Blazing sunlit pale Permian limestone vertical prow face (left plane)
      {
        kind: "path",
        d: "M76 74 L82 64 L88 126 L72 124 Z",
        fill: "paper",
        opacity: 0.94,
      },
      // Warm sunlit talus skirt fanning down to the left
      {
        kind: "path",
        d: "M11 168 L54 142 L72 124 L88 126 L78 164 L11 174 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M54 142 L72 124 L84 126 L68 152 L28 164 Z",
        fill: "accent-soft",
        opacity: 0.45,
      },
      // Deep shadowed eastern flank creating the razor-sharp 3D ship's prow edge
      {
        kind: "path",
        d: "M82 64 L114 76 L134 118 L118 156 L88 126 Z",
        fill: "deep",
        opacity: 0.8,
      },
      // Crisp vertical limestone prow ridge & Permian reef cliff fissures
      { kind: "line", x1: 82, y1: 64, x2: 88, y2: 126, stroke: "paper", strokeWidth: 1.5, opacity: 0.88 },
      { kind: "line", x1: 79, y1: 76, x2: 78, y2: 120, stroke: "mid", strokeWidth: 1.1, opacity: 0.56 },
      { kind: "line", x1: 84, y1: 82, x2: 85, y2: 118, stroke: "mid", strokeWidth: 1, opacity: 0.48 },
      { kind: "line", x1: 74, y1: 96, x2: 86, y2: 96, stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.65 },
      { kind: "line", x1: 82, y1: 64, x2: 114, y2: 76, stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.7 },

      // Plane 4: Wide sweeping alluvial desert bajadas descending into the salt basin
      {
        kind: "path",
        d: "M11 166 Q66 156 116 168 Q146 162 169 166 L169 204 L11 204 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M11 166 Q66 156 116 168 Q146 162 169 166",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        opacity: 0.68,
      },
      {
        kind: "path",
        d: "M11 180 Q62 172 114 184 Q146 178 169 182",
        stroke: "accent",
        strokeWidth: 1.5,
        opacity: 0.54,
      },

      // Plane 5: Grounded foreground Chihuahuan desert ridge & low limestone ledges
      {
        kind: "path",
        d: "M11 190 Q74 180 128 195 Q152 189 169 193 L169 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M14 206 Q72 198 128 212 Q150 208 166 210",
        stroke: "accent",
        strokeWidth: 1.4,
        opacity: 0.44,
      },
      {
        kind: "path",
        d: "M18 218 Q68 212 114 224",
        stroke: "ink",
        strokeWidth: 1.3,
        opacity: 0.5,
      },
    ],
  },

  // =========================================================================
  // 11. WHSA — White Sands National Park (NM)
  // =========================================================================
  {
    code: "WHSA",
    subject: "Luminous bone-white gypsum barchan dunes, crisp S-ridge shadows & sawtooth Organ Mountains",
    accentLight: "#4A7D9B",
    accentDark: "#8CC0DF",
    skyMood: "noon",
    nodes: [
      // Plane 1: Deep clear New Mexico desert-blue sky, high sun & wispy cloud
      { kind: "rect", x: 11, y: 11, width: 158, height: 106, fill: "accent", opacity: 0.88 },
      { kind: "rect", x: 11, y: 11, width: 158, height: 42, fill: "deep", opacity: 0.22 },
      { kind: "rect", x: 11, y: 74, width: 158, height: 34, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 42, cy: 36, r: 17, fill: "paper", opacity: 0.24 },
      { kind: "circle", cx: 42, cy: 36, r: 9.5, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M96 34 Q124 29 156 34 Q132 37 96 34 Z", fill: "paper", opacity: 0.54 },

      // Plane 2: Dramatic sawtooth spires of the Organ Mountains on the far horizon
      {
        kind: "path",
        d: "M11 104 L26 96 L36 88 L44 94 L54 82 L61 90 L70 76 L76 86 L84 70 L90 82 L98 73 L105 85 L114 78 L124 90 L138 84 L152 94 L169 90 L169 118 L11 118 Z",
        fill: "ink",
        opacity: 0.86,
      },
      {
        kind: "path",
        d: "M11 104 L26 96 L36 88 L44 94 L54 82 L61 90 L70 76 L76 86 L84 70 L90 82 L98 73 L105 85 L114 78 L124 90 L138 84 L152 94 L169 90 L169 118 L11 118 Z",
        fill: "accent",
        opacity: 0.26,
      },
      // Sunlit western spire edges on the Organ Mountains
      { kind: "polygon", points: "84,70 78,86 84,82 87,88", fill: "paper", opacity: 0.48 },
      { kind: "polygon", points: "70,76 65,88 70,85 73,89", fill: "paper", opacity: 0.44 },
      { kind: "polygon", points: "98,73 93,85 98,82 101,87", fill: "paper", opacity: 0.42 },

      // Plane 3: Far sweeping bone-white gypsum dune swell + delicate distant soaptree yucca
      {
        kind: "path",
        d: "M11 116 Q52 102 96 112 Q138 122 169 108 L169 156 L11 156 Z",
        fill: "paper",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M54 107 Q94 114 134 119 L169 138 L92 140 Z",
        fill: "accent",
        opacity: 0.28,
      },
      // Single delicate sculptural soaptree yucca perched on the distant right ridge crest
      {
        kind: "path",
        d: "M138 117 L138 106 M138 109 L131 106 M138 109 L133 102 M138 109 L138 100 M138 109 L143 102 M138 109 L145 106 M138 110 L132 112 M138 110 L144 112",
        stroke: "deep",
        strokeWidth: 1.2,
        strokeLinecap: "round",
      },

      // Plane 4: Mid monumental gypsum barchan dune wave & sharp S-ridge slip-face shadow
      {
        kind: "path",
        d: "M11 142 Q48 122 94 138 Q136 152 169 132 L169 198 L11 198 Z",
        fill: "paper",
        opacity: 0.98,
      },
      // Cool blue-tinted slip-face shadow sweeping along the curved S-ridge
      {
        kind: "path",
        d: "M11 142 Q48 122 94 138 C76 150 64 166 56 186 L11 186 Z",
        fill: "accent",
        opacity: 0.34,
      },
      {
        kind: "path",
        d: "M11 142 Q48 122 94 138 C82 146 72 158 66 174 L11 170 Z",
        fill: "mid",
        opacity: 0.38,
      },
      {
        kind: "path",
        d: "M11 142 Q48 122 94 138",
        stroke: "paper",
        strokeWidth: 2,
        strokeLinecap: "round",
      },

      // Plane 5: Foreground luminous bone-white gypsum wave, sculptural shadow & fine wind ripples
      {
        kind: "path",
        d: "M11 180 Q58 194 108 168 Q142 152 169 164 L169 229 L11 229 Z",
        fill: "paper",
        opacity: 0.99,
      },
      // Dramatic curved foreground slip-face shadow carving the dune S-crest
      {
        kind: "path",
        d: "M108 168 Q142 152 169 164 L169 229 L82 229 C96 206 102 184 108 168 Z",
        fill: "accent",
        opacity: 0.38,
      },
      {
        kind: "path",
        d: "M108 168 Q138 156 169 164 L169 229 L106 229 C112 206 110 186 108 168 Z",
        fill: "ink",
        opacity: 0.34,
      },
      // Razor-bright crest edge catching noon sun
      {
        kind: "path",
        d: "M108 168 Q142 152 169 164",
        stroke: "paper",
        strokeWidth: 2,
        strokeLinecap: "round",
      },
      // Fine sculpted wind ripples across the bright foreground gypsum slope
      { kind: "path", d: "M18 196 Q46 191 74 196", stroke: "mid", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.44 },
      { kind: "path", d: "M14 206 Q48 200 82 206", stroke: "accent", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.32 },
      { kind: "path", d: "M20 216 Q52 210 84 216", stroke: "mid", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.42 },
      { kind: "path", d: "M28 224 Q56 220 80 224", stroke: "accent", strokeWidth: 1, strokeLinecap: "round", opacity: 0.28 },
    ],
  },
] as const
