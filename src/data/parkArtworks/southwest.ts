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
    subject: "Island in the Sky vast stepped flat-topped plateau terraces & sweeping Green River gooseneck",
    accentLight: "#C96A2C",
    accentDark: "#EF9E60",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Wide open desert sky (y=11..62), low sun & flat desert cloud strata
      { kind: "circle", cx: 128, cy: 42, r: 28, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 128, cy: 42, r: 17, fill: "accent-soft", opacity: 0.52 },
      { kind: "circle", cx: 128, cy: 42, r: 9.5, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M18 26 L78 26 Q66 30 34 30 Z", fill: "paper", opacity: 0.58 },
      { kind: "path", d: "M58 38 L108 38 Q94 41 68 41 Z", fill: "paper", opacity: 0.44 },
      { kind: "path", d: "M138 24 L166 24 Q158 27 142 27 Z", fill: "paper", opacity: 0.48 },

      // Plane 2: Vast flat-topped horizontal tableland horizon across the entire width
      {
        kind: "path",
        d: "M11 62 L52 62 L56 66 L112 66 L116 61 L169 61 L169 94 L11 94 Z",
        fill: "far",
      },
      { kind: "line", x1: 11, y1: 62, x2: 52, y2: 62, stroke: "paper", strokeWidth: 1.5, opacity: 0.72 },
      { kind: "line", x1: 116, y1: 61, x2: 169, y2: 61, stroke: "paper", strokeWidth: 1.5, opacity: 0.72 },
      { kind: "line", x1: 56, y1: 66, x2: 112, y2: 66, stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.58 },

      // Plane 3: Level 1 — Upper Island in the Sky flat plateau benches & vertical cliff drop-offs
      {
        kind: "path",
        d: "M11 76 L62 76 L66 88 L120 88 L124 75 L169 75 L169 114 L11 114 Z",
        fill: "mid",
      },
      { kind: "line", x1: 11, y1: 76, x2: 62, y2: 76, stroke: "accent-soft", strokeWidth: 2, opacity: 0.78 },
      { kind: "line", x1: 124, y1: 75, x2: 169, y2: 75, stroke: "accent-soft", strokeWidth: 2, opacity: 0.78 },
      { kind: "line", x1: 66, y1: 88, x2: 120, y2: 88, stroke: "paper", strokeWidth: 1.4, opacity: 0.56 },

      // Level 2 — Iconic stepped White Rim flat geological bench stepping down on left & right
      {
        kind: "path",
        d: "M11 98 L46 98 L50 112 L78 112 L82 120 L114 120 L118 106 L142 106 L146 96 L169 96 L169 144 L11 144 Z",
        fill: "ink",
      },
      // Sunlit pale White Rim sandstone cap horizontal terrace lines
      { kind: "line", x1: 11, y1: 98, x2: 46, y2: 98, stroke: "paper", strokeWidth: 2.2, opacity: 0.84 },
      { kind: "line", x1: 50, y1: 112, x2: 78, y2: 112, stroke: "paper", strokeWidth: 1.8, opacity: 0.76 },
      { kind: "line", x1: 118, y1: 106, x2: 142, y2: 106, stroke: "paper", strokeWidth: 1.8, opacity: 0.76 },
      { kind: "line", x1: 146, y1: 96, x2: 169, y2: 96, stroke: "paper", strokeWidth: 2.2, opacity: 0.84 },
      // Warm sunlit cliff-wall wash on right-facing sandstone escarpments
      {
        kind: "path",
        d: "M118 106 L142 106 L146 96 L169 96 L169 124 L114 124 Z",
        fill: "accent",
        opacity: 0.44,
      },

      // Level 3 — Lower flat canyon floor shelf & sheer inner gorge rim
      {
        kind: "path",
        d: "M11 124 L68 124 L74 134 L126 134 L132 124 L169 124 L169 229 L11 229 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M11 136 L169 136 L169 229 L11 229 Z",
        fill: "deep",
        opacity: 0.62,
      },
      { kind: "line", x1: 11, y1: 124, x2: 68, y2: 124, stroke: "accent-soft", strokeWidth: 1.6, opacity: 0.74 },
      { kind: "line", x1: 132, y1: 124, x2: 169, y2: 124, stroke: "accent-soft", strokeWidth: 1.6, opacity: 0.74 },

      // Plane 4: Dramatic sweeping gooseneck / horseshoe river (Green/Colorado River) cutting deep through the flat floor
      // Deep shadowed inner gorge cut hugging the sweeping horseshoe bend
      {
        kind: "path",
        d: "M98 118 C116 122 126 128 116 136 C102 146 42 140 36 160 C30 182 140 166 146 190 C150 206 106 212 74 229",
        stroke: "deep",
        strokeWidth: 22,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      // Sunlit terraced inner canyon wall lip catching golden rim light around the gooseneck
      {
        kind: "path",
        d: "M98 118 C116 122 126 128 116 136 C102 146 42 140 36 160 C30 182 140 166 146 190 C150 206 106 212 74 229",
        stroke: "accent",
        strokeWidth: 14.5,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        opacity: 0.56,
      },
      // Luminous sweeping river water channel
      {
        kind: "path",
        d: "M98 118 C116 122 126 128 116 136 C102 146 42 140 36 160 C30 182 140 166 146 190 C150 206 106 212 74 229",
        stroke: "accent-soft",
        strokeWidth: 10,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M98 118 C116 122 126 128 116 136 C102 146 42 140 36 160 C30 182 140 166 146 190 C150 206 106 212 74 229",
        stroke: "paper",
        strokeWidth: 4.4,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        opacity: 0.94,
      },
      // Sculpted flat-topped gooseneck peninsula headland enclosed inside the river bend
      {
        kind: "path",
        d: "M58 156 L112 152 L124 162 L72 167 Z",
        fill: "mid",
      },
      { kind: "line", x1: 60, y1: 156, x2: 112, y2: 152, stroke: "paper", strokeWidth: 1.6, opacity: 0.8 },
      // Subtle sunlit flat horizontal terrace rim above the foreground bend
      {
        kind: "path",
        d: "M14 186 L68 186 L76 196 L14 198 Z",
        fill: "ink",
      },
      { kind: "line", x1: 14, y1: 186, x2: 68, y2: 186, stroke: "accent-soft", strokeWidth: 1.5, opacity: 0.72 },

      // Plane 5: Grounded dark flat overlook rim framing the bottom corners
      {
        kind: "path",
        d: "M11 206 L58 206 L64 218 L54 229 L11 229 Z",
        fill: "deep",
      },
      { kind: "line", x1: 11, y1: 206, x2: 58, y2: 206, stroke: "accent", strokeWidth: 1.8, opacity: 0.76 },
      {
        kind: "path",
        d: "M128 214 L169 208 L169 229 L114 229 Z",
        fill: "deep",
      },
      { kind: "line", x1: 128, y1: 214, x2: 169, y2: 208, stroke: "accent", strokeWidth: 1.8, opacity: 0.72 },
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
    subject: "Angels Landing lookout down soaring Navajo sandstone Zion Canyon walls & winding Virgin River",
    accentLight: "#D16938",
    accentDark: "#F29D70",
    skyMood: "dusk",
    nodes: [
      // Plane 1: Golden-hour dusk sky with low sun centered in the distant Zion Canyon V-gap
      { kind: "circle", cx: 90, cy: 76, r: 42, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 90, cy: 76, r: 25, fill: "accent-soft", opacity: 0.52 },
      { kind: "circle", cx: 90, cy: 76, r: 12.5, fill: "paper", opacity: 0.92 },
      { kind: "path", d: "M24 26 Q54 21 82 26 Q58 29 24 26 Z", fill: "paper", opacity: 0.52 },
      { kind: "path", d: "M104 30 Q132 26 160 30 Q138 33 104 30 Z", fill: "paper", opacity: 0.46 },

      // Plane 2: Distant receding Zion Canyon buttresses framing the sunlit V-gap
      {
        kind: "path",
        d: "M48 80 L76 86 L84 134 L46 134 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M132 76 L104 86 L96 134 L134 134 Z",
        fill: "far",
      },
      // Pale cream Navajo sandstone upper rims on distant canyon walls
      { kind: "polygon", points: "48,80 76,86 78,96 48,92", fill: "paper", opacity: 0.72 },
      { kind: "polygon", points: "132,76 104,86 102,96 132,90", fill: "paper", opacity: 0.76 },

      // Narrow deep Zion Canyon valley floor descending beneath the soaring walls
      {
        kind: "path",
        d: "M74 124 L106 124 L154 229 L46 229 Z",
        fill: "deep",
        opacity: 0.9,
      },
      {
        kind: "path",
        d: "M82 126 L100 126 L136 229 L62 229 Z",
        fill: "mid",
        opacity: 0.46,
      },

      // Plane 3: Soaring sheer alternating left & right Zion Canyon walls
      // Mid-far right soaring Navajo wall (Great White Throne / East Rim)
      {
        kind: "path",
        d: "M169 36 L132 46 L116 74 L106 112 L100 156 L169 162 Z",
        fill: "mid",
      },
      // Pale cream Navajo sandstone upper cliff cap transitioning into vermilion below
      {
        kind: "path",
        d: "M169 36 L132 46 L116 74 L112 90 L169 82 Z",
        fill: "paper",
        opacity: 0.88,
      },
      // Warm terracotta sunlit lower wall face
      {
        kind: "path",
        d: "M112 90 L169 82 L169 156 L100 156 L106 112 Z",
        fill: "accent",
        opacity: 0.56,
      },
      { kind: "line", x1: 132, y1: 46, x2: 122, y2: 134, stroke: "paper", strokeWidth: 1.2, opacity: 0.56 },
      { kind: "line", x1: 148, y1: 44, x2: 142, y2: 138, stroke: "ink", strokeWidth: 1.1, opacity: 0.38 },

      // Mid-left soaring sheer wall (West Rim / Cathedral buttress)
      {
        kind: "path",
        d: "M11 28 L44 38 L64 68 L74 108 L82 164 L11 174 Z",
        fill: "ink",
      },
      // Pale cream Navajo sandstone upper cliffs on the left canyon wall
      {
        kind: "path",
        d: "M11 28 L44 38 L64 68 L68 84 L11 76 Z",
        fill: "paper",
        opacity: 0.84,
      },
      // Deep vermilion/terracotta shadow wash on lower left wall
      {
        kind: "path",
        d: "M11 76 L68 84 L74 108 L82 164 L11 174 Z",
        fill: "deep",
        opacity: 0.34,
      },
      { kind: "line", x1: 44, y1: 38, x2: 56, y2: 148, stroke: "deep", strokeWidth: 1.3, opacity: 0.5 },
      { kind: "line", x1: 28, y1: 36, x2: 36, y2: 148, stroke: "mid", strokeWidth: 1.1, opacity: 0.44 },
      { kind: "line", x1: 12, y1: 82, x2: 68, y2: 88, stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.62 },

      // Closer right interlocking canyon wall promontory sweeping inward
      {
        kind: "path",
        d: "M169 78 L138 92 L124 124 L118 164 L132 206 L169 216 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M138 92 L124 124 L118 164 L132 164 L144 96 Z",
        fill: "accent",
        opacity: 0.62,
      },
      { kind: "line", x1: 138, y1: 92, x2: 169, y2: 78, stroke: "paper", strokeWidth: 1.5, opacity: 0.72 },
      { kind: "line", x1: 124, y1: 124, x2: 168, y2: 114, stroke: "accent-soft", strokeWidth: 1.3, opacity: 0.56 },

      // Plane 4: Bright sinuous Virgin River winding gracefully down the narrow canyon floor (y=124..229)
      {
        kind: "path",
        d: "M90 124 C95 136 112 142 106 154 C100 166 78 174 84 188 C90 202 124 208 116 229",
        stroke: "accent-soft",
        strokeWidth: 8.6,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M90 124 C95 136 112 142 106 154 C100 166 78 174 84 188 C90 202 124 208 116 229",
        stroke: "paper",
        strokeWidth: 3.8,
        strokeLinecap: "round",
        opacity: 0.96,
      },
      {
        kind: "path",
        d: "M99 150 Q105 149 110 151 M83 180 Q91 178 99 180 M102 214 Q112 212 122 214",
        stroke: "paper",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.78,
      },

      // Plane 5: Bold dark foreground ANGELS LANDING rock fin / knife-edge lookout spur (lower-left)
      {
        kind: "path",
        d: "M11 144 L44 152 L74 166 L82 174 L68 188 L76 208 L92 229 L11 229 Z",
        fill: "deep",
      },
      // Sunlit narrow sandstone crest spine of Angels Landing fin
      {
        kind: "path",
        d: "M11 144 L44 152 L74 166 L82 174 L60 172 L36 160 L11 154 Z",
        fill: "accent",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M11 144 L44 152 L74 166 L82 174",
        stroke: "paper",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.86,
      },
      // Sculpted Navajo sandstone cross-bedding ledges along the lookout fin
      { kind: "path", d: "M14 176 L58 184 L68 188", stroke: "ink", strokeWidth: 1.5, opacity: 0.65 },
      { kind: "path", d: "M14 198 L62 206 L74 210", stroke: "accent-soft", strokeWidth: 1.3, opacity: 0.52 },
      // Subtle dark right-corner canyon rim anchor
      { kind: "path", d: "M144 202 L169 190 L169 229 L136 229 Z", fill: "deep" },
    ],
  },

  // =========================================================================
  // 6. MEVE — Mesa Verde National Park (CO)
  // =========================================================================
  {
    code: "MEVE",
    subject: "Cliff Palace Ancestral Puebloan stone towers & stepped masonry beneath flat-topped mesa cliff",
    accentLight: "#C47D3B",
    accentDark: "#EAB173",
    skyMood: "noon",
    nodes: [
      // Plane 1: Open high-mesa sky (y=11..46) with small sun & crisp desert cloud
      { kind: "circle", cx: 142, cy: 26, r: 14, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 142, cy: 26, r: 7.5, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M22 25 L66 25 Q54 29 30 29 Z", fill: "paper", opacity: 0.58 },

      // Plane 2: Flat-topped horizontal sandstone mesa cliff slab (y=44..82) with subtle juniper brush
      // Subtle stylized pinyon-juniper brush along the straight flat mesa top rim
      {
        kind: "path",
        d: "M16 46 L20 39 L24 46 L29 40 L33 46 M46 46 L50 38 L54 46 M112 46 L116 39 L120 46 M152 46 L156 40 L160 46",
        fill: "ink",
        opacity: 0.78,
      },
      // Main flat-topped sandstone mesa caprock slab & angular stepped cliff overhang
      {
        kind: "path",
        d: "M11 46 L169 46 L169 184 L148 184 L148 92 L134 84 L46 84 L32 92 L32 184 L11 184 Z",
        fill: "ink",
      },
      // Sunlit flat plateau cap strata across the top of the mesa
      { kind: "rect", x: 11, y: 46, width: 158, height: 12, fill: "mid" },
      { kind: "line", x1: 11, y1: 46, x2: 169, y2: 46, stroke: "paper", strokeWidth: 2, opacity: 0.84 },
      { kind: "line", x1: 11, y1: 58, x2: 169, y2: 58, stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.68 },
      { kind: "line", x1: 11, y1: 70, x2: 169, y2: 70, stroke: "deep", strokeWidth: 1.5, opacity: 0.56 },
      // Deep shadowed angular rock overhang directly beneath the flat mesa brow
      {
        kind: "path",
        d: "M26 76 L154 76 L148 92 L134 84 L46 84 L32 92 Z",
        fill: "deep",
      },
      // Recessed shadowed sandstone cliff alcove backdrop (y=84..166)
      {
        kind: "path",
        d: "M32 92 L46 84 L134 84 L148 92 L148 166 L32 166 Z",
        fill: "deep",
        opacity: 0.88,
      },
      { kind: "rect", x: 34, y: 112, width: 112, height: 54, fill: "ink", opacity: 0.52 },

      // Plane 3: Hero Landmark — Crisp blocky stepped stone Pueblo structures inside the cliff recess
      // Left 2-story stepped rectangular Pueblo roomblock
      { kind: "rect", x: 34, y: 120, width: 26, height: 46, fill: "paper", opacity: 0.94 },
      { kind: "rect", x: 52, y: 120, width: 8, height: 46, fill: "accent-soft", opacity: 0.82 },
      { kind: "rect", x: 34, y: 138, width: 12, height: 28, fill: "accent-soft", opacity: 0.52 },

      // Tall vertical 3-story Square Watchtower
      { kind: "rect", x: 62, y: 94, width: 28, height: 72, fill: "paper", opacity: 0.98 },
      { kind: "rect", x: 80, y: 94, width: 10, height: 72, fill: "accent-soft", opacity: 0.84 },
      // Subtle protruding timber viga beam ends along watchtower roof courses
      { kind: "line", x1: 64, y1: 98, x2: 88, y2: 98, stroke: "deep", strokeWidth: 1.6, strokeDasharray: "2 3" },
      { kind: "line", x1: 64, y1: 120, x2: 88, y2: 120, stroke: "deep", strokeWidth: 1.4, strokeDasharray: "2 3" },

      // Iconic tapering Round Stone Tower with horizontal stone courses
      {
        kind: "path",
        d: "M94 166 L96 98 L112 98 L114 166 Z",
        fill: "paper",
        opacity: 0.98,
      },
      {
        kind: "path",
        d: "M104 98 L112 98 L114 166 L105 166 Z",
        fill: "accent",
        opacity: 0.58,
      },
      { kind: "line", x1: 96, y1: 112, x2: 112, y2: 112, stroke: "ink", strokeWidth: 1.1, opacity: 0.5 },
      { kind: "line", x1: 95, y1: 128, x2: 113, y2: 128, stroke: "ink", strokeWidth: 1.1, opacity: 0.5 },
      { kind: "line", x1: 95, y1: 146, x2: 113, y2: 146, stroke: "ink", strokeWidth: 1.1, opacity: 0.5 },

      // Right stepped multi-level stone roomblocks
      { kind: "rect", x: 116, y: 112, width: 30, height: 54, fill: "accent-soft", opacity: 0.94 },
      { kind: "rect", x: 116, y: 112, width: 16, height: 22, fill: "paper", opacity: 0.94 },
      { kind: "rect", x: 132, y: 128, width: 14, height: 38, fill: "accent", opacity: 0.54 },

      // Crisp parapet rooflines & horizontal masonry course seams
      { kind: "line", x1: 34, y1: 120, x2: 60, y2: 120, stroke: "deep", strokeWidth: 1.8 },
      { kind: "line", x1: 62, y1: 94, x2: 90, y2: 94, stroke: "deep", strokeWidth: 1.8 },
      { kind: "line", x1: 96, y1: 98, x2: 112, y2: 98, stroke: "deep", strokeWidth: 1.8 },
      { kind: "line", x1: 116, y1: 112, x2: 146, y2: 112, stroke: "deep", strokeWidth: 1.8 },
      { kind: "line", x1: 62, y1: 142, x2: 90, y2: 142, stroke: "ink", strokeWidth: 1, opacity: 0.48 },
      { kind: "line", x1: 34, y1: 144, x2: 60, y2: 144, stroke: "ink", strokeWidth: 1, opacity: 0.45 },

      // Dark rectangular & signature Ancestral Puebloan T-shaped doorways and windows
      { kind: "path", d: "M71 146 L79 146 L79 151 L77 151 L77 160 L73 160 L73 151 L71 151 Z", fill: "deep" },
      { kind: "path", d: "M42 148 L49 148 L49 152 L47 152 L47 160 L44 160 L44 152 L42 152 Z", fill: "deep" },
      { kind: "rect", x: 68, y: 104, width: 4.5, height: 6.5, fill: "deep" },
      { kind: "rect", x: 78, y: 104, width: 4.5, height: 6.5, fill: "deep" },
      { kind: "rect", x: 72, y: 126, width: 5, height: 7, fill: "deep" },
      { kind: "rect", x: 44, y: 128, width: 4.5, height: 6, fill: "deep" },
      { kind: "rect", x: 101.5, y: 104, width: 4.2, height: 6, fill: "deep" },
      { kind: "rect", x: 101.5, y: 132, width: 4.2, height: 6.5, fill: "deep" },
      { kind: "rect", x: 122, y: 120, width: 4.5, height: 6, fill: "deep" },
      { kind: "rect", x: 136, y: 138, width: 4.5, height: 7, fill: "deep" },

      // Plane 4: Clean horizontal stepped stone terrace retaining wall (y=166..184, NO oval rings!)
      { kind: "rect", x: 24, y: 166, width: 132, height: 8, fill: "accent-soft", opacity: 0.92 },
      { kind: "rect", x: 18, y: 174, width: 144, height: 10, fill: "mid" },
      { kind: "line", x1: 24, y1: 166, x2: 156, y2: 166, stroke: "paper", strokeWidth: 1.6, opacity: 0.85 },
      { kind: "line", x1: 18, y1: 174, x2: 162, y2: 174, stroke: "deep", strokeWidth: 1.5 },
      // Vertical dressed-stone block seams along the retaining wall
      {
        kind: "path",
        d: "M44 166 L44 174 M68 166 L68 174 M92 166 L92 174 M116 166 L116 174 M138 166 L138 174 M56 174 L56 184 M82 174 L82 184 M108 174 L108 184 M132 174 L132 184",
        stroke: "deep",
        strokeWidth: 1.1,
        opacity: 0.56,
      },

      // Plane 5: Angled sandstone canyon cliff slopes plunging beneath Cliff Palace (y=182..229)
      {
        kind: "path",
        d: "M11 182 L169 182 L169 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M11 184 L58 192 L44 214 L11 224 Z",
        fill: "ink",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M169 184 L122 194 L138 216 L169 226 Z",
        fill: "ink",
        opacity: 0.72,
      },
      { kind: "path", d: "M14 196 L64 202 L90 206 L116 202 L166 196", stroke: "accent", strokeWidth: 1.4, opacity: 0.52 },
      { kind: "path", d: "M24 214 L90 220 L156 214", stroke: "mid", strokeWidth: 1.2, opacity: 0.42 },
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
    subject: "Sweeping S-bend of the Rio Grande curving past Santa Elena Canyon cliffs & jagged Chisos Mountains",
    accentLight: "#C97734",
    accentDark: "#EEA767",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Wide Chihuahuan desert dawn sky, low glowing sun & thin desert clouds
      { kind: "circle", cx: 92, cy: 38, r: 28, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 92, cy: 38, r: 17, fill: "accent-soft", opacity: 0.52 },
      { kind: "circle", cx: 92, cy: 38, r: 9.5, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M18 26 Q42 22 64 26 Q46 29 18 26 Z", fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M120 30 Q144 26 164 30 Q146 33 120 30 Z", fill: "paper", opacity: 0.5 },

      // Plane 2: Distant jagged Chisos Mountains across the horizon behind the canyon portal
      {
        kind: "path",
        d: "M11 102 L34 86 L50 92 L66 74 L80 86 L94 68 L108 82 L124 72 L142 86 L169 78 L169 128 L11 128 Z",
        fill: "far",
      },
      { kind: "polygon", points: "94,68 108,82 99,90 92,82", fill: "accent-soft", opacity: 0.52 },
      { kind: "polygon", points: "66,74 76,84 68,89 62,84", fill: "paper", opacity: 0.45 },
      { kind: "polygon", points: "124,72 135,84 127,89 120,83", fill: "accent-soft", opacity: 0.46 },

      // Plane 3: Canyon valley bed + sweeping S-curve / horseshoe bend of the RIO GRANDE
      {
        kind: "path",
        d: "M11 114 L169 114 L169 229 L11 229 Z",
        fill: "ink",
      },
      // Wide liquid river channel sweeping left around the cliff promontory, then bending boldly right across foreground
      {
        kind: "path",
        d: "M82 112 L98 112 C98 128 84 138 62 148 C34 162 34 176 74 186 C118 196 154 206 164 229 L88 229 C86 212 52 204 28 190 C8 176 16 152 46 138 C68 128 80 124 82 112 Z",
        fill: "accent-soft",
        opacity: 0.92,
      },
      // Luminous inner river current ribbon following the smooth S-bend
      {
        kind: "path",
        d: "M90 114 C88 130 70 138 48 150 C26 162 28 178 68 188 C108 198 134 208 130 229",
        stroke: "paper",
        strokeWidth: 8.5,
        strokeLinecap: "round",
        opacity: 0.86,
      },
      // Subtle deeper current shadow hugging the outer curve of the bend
      {
        kind: "path",
        d: "M86 116 C80 130 58 140 38 152 C20 164 24 180 62 192 C98 202 116 212 112 229",
        stroke: "far",
        strokeWidth: 2.6,
        strokeLinecap: "round",
        opacity: 0.58,
      },
      // Gentle natural horizontal water glints nestled inside the S-curve
      { kind: "path", d: "M42 158 Q56 156 68 158", stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.9 },
      { kind: "path", d: "M48 172 Q66 169 84 172", stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.84 },
      { kind: "path", d: "M84 196 Q104 193 122 196", stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.86 },
      { kind: "path", d: "M102 214 Q122 211 140 214", stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.82 },

      // Plane 4: Sheer Santa Elena Canyon limestone walls & jutting promontory framing the river bend
      // Left sheer limestone cliff wall (Sierra Ponce — shaded cool side)
      {
        kind: "path",
        d: "M11 58 L66 60 L72 96 L76 126 L42 142 L11 154 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M52 60 L66 60 L72 96 L76 126 L56 134 Z",
        fill: "deep",
        opacity: 0.54,
      },
      { kind: "line", x1: 11, y1: 58, x2: 66, y2: 60, stroke: "paper", strokeWidth: 1.8, opacity: 0.74 },
      { kind: "line", x1: 12, y1: 86, x2: 68, y2: 88, stroke: "mid", strokeWidth: 1.3, opacity: 0.52 },
      { kind: "line", x1: 12, y1: 114, x2: 72, y2: 116, stroke: "mid", strokeWidth: 1.2, opacity: 0.46 },

      // Right sheer limestone wall & bold cliff promontory jutting into the Rio Grande bend
      {
        kind: "path",
        d: "M169 54 L116 56 L110 92 L104 126 L84 146 L98 164 L169 178 Z",
        fill: "mid",
      },
      // Sunlit warm dawn limestone facet along the promontory prow
      {
        kind: "path",
        d: "M116 56 L132 56 L124 134 L106 160 L98 164 L84 146 L104 126 L110 92 Z",
        fill: "accent",
        opacity: 0.62,
      },
      { kind: "line", x1: 116, y1: 56, x2: 169, y2: 54, stroke: "paper", strokeWidth: 1.8, opacity: 0.8 },
      { kind: "line", x1: 116, y1: 56, x2: 104, y2: 126, stroke: "paper", strokeWidth: 1.5, opacity: 0.76 },
      { kind: "line", x1: 112, y1: 88, x2: 168, y2: 86, stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.64 },
      { kind: "line", x1: 106, y1: 118, x2: 168, y2: 116, stroke: "accent-soft", strokeWidth: 1.3, opacity: 0.58 },

      // Plane 5: Foreground riverbank promontories & smooth river boulders framing the bend
      // Bold jutting lower-left bank forcing the Rio Grande's sweeping foreground bend
      {
        kind: "path",
        d: "M11 176 Q46 184 74 200 Q92 212 96 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M11 176 Q46 184 74 200 Q92 212 96 229",
        stroke: "accent",
        strokeWidth: 1.8,
        opacity: 0.68,
      },
      // Right foreground bank corner & river boulders
      {
        kind: "path",
        d: "M169 162 L132 174 Q148 188 158 204 L169 208 Z",
        fill: "deep",
      },
      { kind: "ellipse", cx: 42, cy: 206, rx: 11, ry: 5.5, fill: "ink" },
      { kind: "ellipse", cx: 26, cy: 218, rx: 9, ry: 4.8, fill: "mid", opacity: 0.72 },
      { kind: "ellipse", cx: 64, cy: 218, rx: 8.5, ry: 4.5, fill: "ink", opacity: 0.88 },
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
    subject: "Endless cascading layers of bone-white gypsum dunes receding toward a glowing horizon sun",
    accentLight: "#4E82A4",
    accentDark: "#8EC3E4",
    skyMood: "noon",
    nodes: [
      // Plane 1: Expansive clear desert sky (y=11..84) with glowing low sun & concentric halos on the horizon
      { kind: "rect", x: 11, y: 11, width: 158, height: 82, fill: "accent", opacity: 0.78 },
      { kind: "rect", x: 11, y: 11, width: 158, height: 34, fill: "deep", opacity: 0.16 },
      { kind: "rect", x: 11, y: 52, width: 158, height: 38, fill: "accent-soft", opacity: 0.42 },
      // Glowing low desert sun & soft concentric halos resting right above the farthest dune horizon
      { kind: "circle", cx: 90, cy: 76, r: 42, fill: "paper", opacity: 0.16 },
      { kind: "circle", cx: 90, cy: 76, r: 28, fill: "accent-soft", opacity: 0.44 },
      { kind: "circle", cx: 90, cy: 76, r: 18, fill: "paper", opacity: 0.56 },
      { kind: "circle", cx: 90, cy: 76, r: 11, fill: "paper", opacity: 0.98 },

      // Dune Layer 1 (Farthest horizon gypsum swell directly beneath the sun, y=78..100)
      {
        kind: "path",
        d: "M11 84 Q48 77 90 83 Q132 89 169 80 L169 108 L11 108 Z",
        fill: "paper",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M74 82 Q124 89 169 80 L169 102 L106 102 Z",
        fill: "accent-soft",
        opacity: 0.48,
      },

      // Dune Layer 2 (Distant undulating white wave cresting left-of-center, y=88..118)
      {
        kind: "path",
        d: "M11 94 Q54 84 102 96 Q140 105 169 94 L169 124 L11 124 Z",
        fill: "paper",
        opacity: 0.96,
      },
      {
        kind: "path",
        d: "M11 94 Q54 84 102 96 C84 102 68 110 56 120 L11 120 Z",
        fill: "far",
        opacity: 0.48,
      },
      { kind: "path", d: "M11 94 Q54 84 102 96", stroke: "paper", strokeWidth: 1.4, strokeLinecap: "round" },

      // Dune Layer 3 (Sweeping mid-far S-curve gypsum ridge cresting right, y=104..138)
      {
        kind: "path",
        d: "M11 114 Q52 122 104 104 Q142 93 169 106 L169 144 L11 144 Z",
        fill: "paper",
        opacity: 0.97,
      },
      {
        kind: "path",
        d: "M104 104 Q142 93 169 106 L169 140 L114 140 C114 124 110 112 104 104 Z",
        fill: "accent",
        opacity: 0.24,
      },
      { kind: "path", d: "M104 104 Q142 93 169 106", stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round" },

      // Dune Layer 4 (Mid undulating dune ridge rolling across the heart of the basin, y=122..160)
      {
        kind: "path",
        d: "M11 130 Q58 112 106 130 Q144 144 169 126 L169 166 L11 166 Z",
        fill: "paper",
        opacity: 0.98,
      },
      {
        kind: "path",
        d: "M11 130 Q58 112 106 130 C86 138 72 150 62 164 L11 164 Z",
        fill: "accent-soft",
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M11 130 Q58 112 106 130 C92 136 80 146 72 160 L11 154 Z",
        fill: "far",
        opacity: 0.42,
      },
      { kind: "path", d: "M11 130 Q58 112 106 130", stroke: "paper", strokeWidth: 1.7, strokeLinecap: "round" },

      // Dune Layer 5 (Broad luminous barchan crest sweeping diagonally right-to-left, y=144..188)
      {
        kind: "path",
        d: "M11 158 Q60 172 114 144 Q146 130 169 144 L169 194 L11 194 Z",
        fill: "paper",
        opacity: 0.99,
      },
      {
        kind: "path",
        d: "M114 144 Q146 130 169 144 L169 190 L98 190 C106 172 110 156 114 144 Z",
        fill: "accent",
        opacity: 0.28,
      },
      {
        kind: "path",
        d: "M114 144 Q146 130 169 144 L169 186 L118 186 C120 170 118 156 114 144 Z",
        fill: "mid",
        opacity: 0.34,
      },
      { kind: "path", d: "M114 144 Q146 130 169 144", stroke: "paper", strokeWidth: 1.8, strokeLinecap: "round" },

      // Dune Layer 6 (Near sculptural gypsum dune with crisp S-ridge & cool leeward shadow, y=168..214)
      {
        kind: "path",
        d: "M11 180 Q54 156 102 180 Q140 198 169 178 L169 229 L11 229 Z",
        fill: "paper",
        opacity: 0.99,
      },
      {
        kind: "path",
        d: "M11 180 Q54 156 102 180 C82 192 66 208 54 229 L11 229 Z",
        fill: "accent",
        opacity: 0.3,
      },
      {
        kind: "path",
        d: "M11 180 Q54 156 102 180 C88 190 76 204 68 222 L11 214 Z",
        fill: "mid",
        opacity: 0.36,
      },
      { kind: "path", d: "M11 180 Q54 156 102 180", stroke: "paper", strokeWidth: 2, strokeLinecap: "round" },

      // Dune Layer 7 (Foreground sweeping bone-white wave & fine wind-sculpted gypsum ripples, y=194..229)
      {
        kind: "path",
        d: "M11 212 Q64 222 118 196 Q146 184 169 194 L169 229 L11 229 Z",
        fill: "paper",
      },
      {
        kind: "path",
        d: "M118 196 Q146 184 169 194 L169 229 L104 229 C110 216 114 205 118 196 Z",
        fill: "accent",
        opacity: 0.32,
      },
      {
        kind: "path",
        d: "M118 196 Q146 184 169 194 L169 229 L124 229 C124 216 122 206 118 196 Z",
        fill: "mid",
        opacity: 0.38,
      },
      { kind: "path", d: "M118 196 Q146 184 169 194", stroke: "paper", strokeWidth: 2, strokeLinecap: "round" },
      // Delicate wind-ripple contours across the sunlit foreground gypsum slopes
      { kind: "path", d: "M114 176 Q138 172 162 176", stroke: "far", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.56 },
      { kind: "path", d: "M20 218 Q56 213 92 218", stroke: "mid", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.42 },
      { kind: "path", d: "M34 225 Q68 221 98 225", stroke: "accent", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.34 },
    ],
  },
] as const
