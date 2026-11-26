import type { ParkArtworkSpec } from "../../types/parks.ts"

/**
 * Deserts, Badlands, Dunes & Karst Caverns collection of 10 bespoke WPA-screenprint
 * National Park poster artworks.
 *
 * Artboard: viewBox="0 0 180 240" (3:4 portrait), clipped inner print area
 * x=[14..166], y=[14..226], horizontal center x=90.
 * Edge-touching fills bleed cleanly to x=[11..169], y=[11..229].
 */
export const DESERTS_KARST_PARK_ARTWORKS: readonly ParkArtworkSpec[] = [
  // =========================================================================
  // 1. BADL — Badlands National Park (SD)
  // =========================================================================
  {
    code: "BADL",
    subject: "Banded Oligocene badland buttes, fluted spires & mixed-grass prairie at dawn",
    accentLight: "#C87A3B",
    accentDark: "#EEA668",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Dawn prairie sun & sunlit high stratocumulus ribbons
      { kind: "circle", cx: 128, cy: 52, r: 30, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 128, cy: 52, r: 19, fill: "accent-soft", opacity: 0.44 },
      { kind: "circle", cx: 128, cy: 52, r: 11, fill: "accent", opacity: 0.94 },
      { kind: "path", d: "M18 32 Q46 25 82 32 Q60 36 18 32 Z", fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M24 34 Q54 32 76 34", stroke: "accent-soft", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.68 },
      { kind: "path", d: "M104 28 Q134 22 164 28 Q144 32 104 28 Z", fill: "paper", opacity: 0.52 },
      { kind: "path", d: "M34 56 Q62 51 94 56 Q72 59 34 56 Z", fill: "accent-soft", opacity: 0.42 },

      // Plane 2: Far serrated Oligocene tableland stretching continuously across the horizon
      {
        kind: "path",
        d: "M11 94 L26 84 L38 84 L48 92 L62 78 L72 78 L82 90 L98 82 L112 88 L126 76 L138 78 L152 88 L169 82 L169 130 L11 130 Z",
        fill: "far",
      },
      { kind: "path", d: "M11 96 L46 96 M60 88 L108 88 M124 86 L169 86", stroke: "paper", strokeWidth: 1.3, opacity: 0.48 },

      // Plane 3: Hero Banded Yellow Mounds & Big Badlands Overlook eroded spires
      {
        kind: "path",
        d: "M11 116 L24 98 L34 108 L48 86 L56 84 L66 104 L76 94 L88 76 L95 76 L106 100 L118 88 L126 86 L138 106 L150 92 L160 98 L169 90 L169 170 L11 170 Z",
        fill: "mid",
      },
      // Sunlit eastern dawn flanks of the fluted badland spires
      {
        kind: "path",
        d: "M56 84 L66 104 L74 128 L52 128 Z",
        fill: "accent",
        opacity: 0.52,
      },
      {
        kind: "path",
        d: "M95 76 L106 100 L114 134 L91 134 Z",
        fill: "accent",
        opacity: 0.58,
      },
      {
        kind: "path",
        d: "M126 86 L138 106 L146 138 L122 138 Z",
        fill: "accent",
        opacity: 0.52,
      },
      // Shadowed western fluted facets giving dramatic sculptural relief
      {
        kind: "path",
        d: "M48 86 L52 84 L52 146 L34 146 L42 114 Z",
        fill: "ink",
        opacity: 0.64,
      },
      {
        kind: "path",
        d: "M88 76 L92 76 L91 152 L72 152 L78 114 Z",
        fill: "ink",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M118 88 L123 86 L122 150 L106 150 L112 118 Z",
        fill: "ink",
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M150 92 L154 94 L152 150 L138 150 Z",
        fill: "ink",
        opacity: 0.58,
      },
      // Iconic horizontal Oligocene sedimentary strata stripes (cream ash, yellow mound, terracotta)
      {
        kind: "path",
        d: "M11 108 L40 108 M44 102 L65 102 M80 96 L104 96 M114 102 L136 102 M146 104 L169 104",
        stroke: "paper",
        strokeWidth: 2.3,
        strokeLinecap: "round",
        opacity: 0.84,
      },
      {
        kind: "path",
        d: "M11 118 L169 118",
        stroke: "accent-soft",
        strokeWidth: 3.4,
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M11 129 L169 129",
        stroke: "accent",
        strokeWidth: 3.1,
        opacity: 0.74,
      },
      {
        kind: "path",
        d: "M11 140 L169 140",
        stroke: "paper",
        strokeWidth: 2.4,
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M11 150 L169 150",
        stroke: "accent-soft",
        strokeWidth: 2.4,
        opacity: 0.62,
      },
      // Sharp vertical fluted erosion rills carved down the clay buttes
      {
        kind: "path",
        d: "M24 100 L20 148 M54 88 L50 152 M92 78 L88 154 M99 88 L104 152 M125 90 L121 154 M152 96 L148 154",
        stroke: "deep",
        strokeWidth: 1.1,
        strokeLinecap: "round",
        opacity: 0.52,
      },

      // Plane 4: Midground eroded badland apron & low clay pinnacles
      {
        kind: "path",
        d: "M11 156 L30 144 L44 156 L62 150 L78 164 L96 154 L116 164 L136 146 L152 158 L169 148 L169 204 L11 204 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M11 168 Q56 162 94 170 Q132 162 169 168",
        stroke: "accent",
        strokeWidth: 2.6,
        opacity: 0.7,
      },
      {
        kind: "path",
        d: "M11 180 Q58 175 96 182 Q134 175 169 180",
        stroke: "paper",
        strokeWidth: 1.8,
        opacity: 0.45,
      },

      // Plane 5: Foreground mixed-grass prairie overlook bluff & wind-swept grass rim
      {
        kind: "path",
        d: "M11 188 Q46 184 82 194 Q124 186 169 192 L169 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M11 188 Q46 184 82 194 Q124 186 169 192",
        stroke: "accent-soft",
        strokeWidth: 1.9,
        opacity: 0.76,
      },
      {
        kind: "path",
        d: "M11 208 Q54 202 96 212 Q136 204 169 210",
        stroke: "ink",
        strokeWidth: 1.8,
        opacity: 0.55,
      },
      // Crisp prairie grass tufts along the overlook edge
      {
        kind: "path",
        d: "M22 194 L18 178 M25 194 L25 176 M28 195 L32 180 M44 196 L42 183 M48 196 L52 184",
        stroke: "deep",
        strokeWidth: 1.6,
        strokeLinecap: "round",
      },
      {
        kind: "path",
        d: "M128 196 L124 182 M132 196 L133 179 M136 196 L140 183 M152 194 L150 177 M156 194 L160 179",
        stroke: "deep",
        strokeWidth: 1.6,
        strokeLinecap: "round",
      },
      {
        kind: "path",
        d: "M25 178 L27 188 M133 180 L135 190 M151 178 L153 188",
        stroke: "accent",
        strokeWidth: 0.9,
        strokeLinecap: "round",
        opacity: 0.7,
      },
    ],
  },

  // =========================================================================
  // 2. CAVE — Carlsbad Caverns National Park (NM)
  // =========================================================================
  {
    code: "CAVE",
    subject: "Natural Entrance dusk bat flight spiraling above glowing limestone speleothems",
    accentLight: "#C76D34",
    accentDark: "#F0A06B",
    skyMood: "dusk",
    nodes: [
      // Plane 1: Warm Chihuahuan twilight sky, crescent moon, early stars & distant Guadalupe hills
      { kind: "ellipse", cx: 90, cy: 84, rx: 66, ry: 34, fill: "accent-soft", opacity: 0.34 },
      { kind: "ellipse", cx: 90, cy: 88, rx: 42, ry: 22, fill: "accent", opacity: 0.38 },
      { kind: "path", d: "M30 24 A6.5 6.5 0 1 0 39 33 A5.2 5.2 0 1 1 30 24 Z", fill: "paper", opacity: 0.92 },
      { kind: "circle", cx: 56, cy: 26, r: 1.1, fill: "paper", opacity: 0.82 },
      { kind: "circle", cx: 122, cy: 24, r: 1.2, fill: "paper", opacity: 0.85 },
      { kind: "circle", cx: 152, cy: 40, r: 1.1, fill: "paper", opacity: 0.78 },
      { kind: "circle", cx: 24, cy: 52, r: 1, fill: "paper", opacity: 0.74 },
      { kind: "path", d: "M11 86 Q44 74 82 82 Q126 70 169 84 L169 114 L11 114 Z", fill: "far", opacity: 0.78 },

      // Plane 2: Natural Entrance rugged limestone ridge & dark cavern arch framing
      {
        kind: "path",
        d: "M11 94 L34 86 L62 94 L92 88 L124 94 L152 86 L169 92 L169 229 L11 229 Z",
        fill: "ink",
      },
      // Sunlit twilight rim along the limestone ridge crest
      {
        kind: "path",
        d: "M11 94 L34 86 L62 94 L92 88 L124 94 L152 86 L169 92",
        stroke: "accent-soft",
        strokeWidth: 1.7,
        opacity: 0.72,
      },
      // Deep shadowed recessed cavern opening (irregular natural limestone arch)
      {
        kind: "path",
        d: "M28 229 L26 164 Q26 124 56 112 Q90 102 126 114 Q154 126 154 166 L152 229 Z",
        fill: "deep",
      },

      // Plane 3: Glowing subterranean chamber (Giant Dome / Hall of Giants) inside the arch
      { kind: "ellipse", cx: 90, cy: 174, rx: 52, ry: 42, fill: "accent", opacity: 0.34 },
      { kind: "ellipse", cx: 90, cy: 180, rx: 34, ry: 26, fill: "accent-soft", opacity: 0.44 },
      { kind: "ellipse", cx: 90, cy: 188, rx: 18, ry: 12, fill: "paper", opacity: 0.32 },
      // Hanging limestone stalactites along the rugged cavern arch ceiling
      {
        kind: "path",
        d: "M42 118 L46 144 L51 114 M58 111 L62 138 L66 109 M74 107 L78 148 L82 106 M92 106 L96 134 L100 107 M108 109 L112 146 L116 111 M124 114 L128 140 L132 118",
        fill: "ink",
      },
      // Warm subterranean glow edges on key stalactites
      {
        kind: "path",
        d: "M46 144 L50 116 M78 148 L81 108 M112 146 L110 111",
        stroke: "accent-soft",
        strokeWidth: 1.1,
        strokeLinecap: "round",
        opacity: 0.75,
      },
      // Monumental rising Giant Dome & stalagmite columns on the cavern floor
      {
        kind: "path",
        d: "M34 229 L38 176 Q43 162 49 176 L54 229 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M58 229 L63 158 Q69 144 75 158 L80 229 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M69 148 L75 158 L79 220 L70 220 Z",
        fill: "accent",
        opacity: 0.56,
      },
      {
        kind: "path",
        d: "M104 229 L109 162 Q115 150 121 162 L126 229 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M109 162 L115 150 L114 220 L106 220 Z",
        fill: "accent",
        opacity: 0.52,
      },
      {
        kind: "path",
        d: "M128 229 L132 182 Q137 170 142 182 L146 229 Z",
        fill: "mid",
      },
      // Subterranean stepped amphitheater trail descending into the warm glow
      {
        kind: "path",
        d: "M74 229 Q88 212 90 194 Q92 212 106 229 Z",
        fill: "accent-soft",
        opacity: 0.42,
      },
      {
        kind: "path",
        d: "M30 206 Q90 198 150 206",
        stroke: "deep",
        strokeWidth: 2,
        opacity: 0.72,
      },

      // Plane 4: Iconic dusk bat flight — sweeping spiral ribbon of Mexican free-tailed bats
      // Subtle swirling flight stream ribbon rising from the cave mouth into the dusk sky
      {
        kind: "path",
        d: "M90 148 C118 134 134 106 108 86 C82 68 42 74 44 54 C46 36 96 34 146 22",
        stroke: "deep",
        strokeWidth: 9,
        strokeLinecap: "round",
        opacity: 0.14,
      },
      // Individual crisp M-winged bat silhouettes swirling upward along the spiral
      {
        kind: "path",
        d: "M84 138 Q88 134 90 137 Q92 134 96 138 M98 128 Q103 123 106 127 Q109 123 114 128 M112 115 Q117 110 120 114 Q123 110 128 115",
        stroke: "deep",
        strokeWidth: 1.7,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      {
        kind: "path",
        d: "M116 98 Q122 92 126 97 Q130 92 136 98 M102 88 Q108 82 112 87 Q116 82 122 88 M82 78 Q88 72 93 77 Q98 72 104 78",
        stroke: "deep",
        strokeWidth: 1.9,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      {
        kind: "path",
        d: "M60 74 Q66 68 71 73 Q76 68 82 74 M40 66 Q47 59 52 65 Q57 59 64 66 M34 52 Q41 45 46 51 Q51 45 58 52",
        stroke: "deep",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      {
        kind: "path",
        d: "M56 42 Q63 35 69 41 Q75 35 82 42 M82 36 Q90 29 96 35 Q102 29 110 36 M112 31 Q119 25 125 30 Q131 25 138 31 M136 24 Q142 19 147 23 Q152 19 158 24",
        stroke: "deep",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      // Smaller companion bats filling out the spiral density
      {
        kind: "path",
        d: "M90 122 Q94 119 96 121 Q98 119 102 122 M122 84 Q126 81 128 83 Q130 81 134 84 M68 60 Q72 57 75 59 Q78 57 82 60 M96 46 Q100 43 103 45 Q106 43 110 46",
        stroke: "deep",
        strokeWidth: 1.3,
        strokeLinecap: "round",
      },

      // Plane 5: Foreground rugged limestone cavern rim & Chihuahuan desert agave framing
      { kind: "path", d: "M11 102 L38 114 L26 154 L32 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 102 L142 114 L154 154 L148 229 L169 229 Z", fill: "deep" },
      { kind: "path", d: "M11 212 Q46 216 68 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 212 Q134 216 112 229 L169 229 Z", fill: "deep" },
      // Desert agave rosettes perched on upper rocky cave rim
      {
        kind: "path",
        d: "M24 96 L18 82 M24 96 L24 80 M24 96 L31 84 M156 94 L149 82 M156 94 L156 79 M156 94 L163 83",
        stroke: "deep",
        strokeWidth: 1.8,
        strokeLinecap: "round",
      },
    ],
  },

  // =========================================================================
  // 3. DEVA — Death Valley National Park (CA/NV)
  // =========================================================================
  {
    code: "DEVA",
    subject: "Badwater Basin hexagonal salt polygons beneath Zabriskie mudstones & Panamint Range",
    accentLight: "#CF8838",
    accentDark: "#F2B66A",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Crisp Mojave dawn sky, radiant sun & high desert cirrus wisps
      { kind: "circle", cx: 124, cy: 46, r: 28, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 124, cy: 46, r: 17, fill: "accent-soft", opacity: 0.44 },
      { kind: "circle", cx: 124, cy: 46, r: 10.5, fill: "accent", opacity: 0.94 },
      { kind: "path", d: "M20 30 Q48 25 80 30 Q58 34 20 30 Z", fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M108 26 Q136 22 164 27 Q144 30 108 26 Z", fill: "paper", opacity: 0.5 },

      // Plane 2: Towering Panamint Range wall & 11,049-ft Telescope Peak
      {
        kind: "path",
        d: "M11 86 L28 74 L48 80 L64 62 L76 52 L88 64 L106 72 L128 66 L148 78 L169 72 L169 118 L11 118 Z",
        fill: "far",
      },
      // Sunlit eastern slopes & thin winter snow streaks on Telescope Peak
      {
        kind: "path",
        d: "M76 52 L88 64 L104 92 L78 92 Z",
        fill: "paper",
        opacity: 0.38,
      },
      {
        kind: "path",
        d: "M76 52 L69 64 L75 62 L81 68 L85 62 Z",
        fill: "paper",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M128 66 L142 88 L124 88 Z",
        fill: "paper",
        opacity: 0.3,
      },

      // Plane 3: Golden fluted Zabriskie Point mudstone badlands & Manly Beacon
      {
        kind: "path",
        d: "M11 112 Q30 98 46 106 Q62 96 78 108 Q96 102 108 106 L118 86 L124 86 L134 108 Q150 96 169 104 L169 152 L11 152 Z",
        fill: "mid",
      },
      // Sunlit golden mudstone wave folds sweeping down toward the basin
      {
        kind: "path",
        d: "M11 124 Q34 112 56 126 Q78 114 98 128 Q116 110 132 126 Q150 114 169 124 L169 152 L11 152 Z",
        fill: "accent",
        opacity: 0.62,
      },
      // Shadowed incised mudstone troughs & Manly Beacon shadow face
      {
        kind: "path",
        d: "M118 86 L112 106 L104 134 L120 134 L121 96 Z",
        fill: "ink",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M46 106 L34 138 L52 138 Z M78 108 L64 140 L84 140 Z M148 104 L136 138 L156 138 Z",
        fill: "ink",
        opacity: 0.56,
      },
      // Crisp sunlit Zabriskie ridge crests
      {
        kind: "path",
        d: "M11 124 Q34 112 56 126 Q78 114 98 128 Q116 110 132 126 Q150 114 169 124",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        opacity: 0.85,
      },
      {
        kind: "path",
        d: "M24 138 Q48 128 72 142 Q96 132 124 144 Q146 134 169 140",
        stroke: "ink",
        strokeWidth: 1.5,
        opacity: 0.62,
      },

      // Plane 4: Alluvial fan skirt & vast Badwater Basin (-282 ft) salt flat
      {
        kind: "path",
        d: "M11 142 Q52 148 90 146 Q132 148 169 142 L169 158 L11 158 Z",
        fill: "ink",
        opacity: 0.75,
      },
      { kind: "rect", x: 11, y: 152, width: 158, height: 77, fill: "paper", opacity: 0.92 },
      // Warm dawn mineral sheen & shallow Badwater brine shimmer near horizon
      { kind: "rect", x: 11, y: 152, width: 158, height: 22, fill: "accent-soft", opacity: 0.42 },
      { kind: "rect", x: 11, y: 174, width: 158, height: 55, fill: "far", opacity: 0.28 },
      { kind: "line", x1: 24, y1: 157, x2: 156, y2: 157, stroke: "paper", strokeWidth: 1.4, opacity: 0.82 },

      // Plane 5: Hero Foreground — Crisp perspective polygonal salt-crust ridges (Badwater Basin)
      // Far row of tight foreshortened salt polygons (y=161..172)
      {
        kind: "path",
        d: "M11 164 L32 162 L46 167 L70 164 L90 168 L112 164 L134 167 L154 162 L169 165",
        stroke: "ink",
        strokeWidth: 1.2,
        strokeLinejoin: "round",
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M11 172 L26 171 L46 167 M46 167 L58 174 L86 173 L90 168 M90 168 L104 174 L130 173 L134 167 M134 167 L152 174 L169 172",
        stroke: "ink",
        strokeWidth: 1.4,
        strokeLinejoin: "round",
        opacity: 0.72,
      },
      // Mid-row perspective hexagonal salt-crust tiles (y=172..192)
      {
        kind: "path",
        d: "M11 186 L22 184 L26 171 M22 184 L48 189 L58 174 M48 189 L66 196 L94 195 L104 174 M86 173 L94 195 M94 195 L126 190 L130 173 M126 190 L156 186 L152 174 M156 186 L169 189",
        stroke: "ink",
        strokeWidth: 1.8,
        strokeLinejoin: "round",
        opacity: 0.8,
      },
      // Sunlit raised salt-ridge highlights on mid polygons
      {
        kind: "path",
        d: "M11 184.5 L22 182.5 L48 187.5 L66 194.5 L94 193.5 L126 188.5 L156 184.5 L169 187.5",
        stroke: "paper",
        strokeWidth: 1.1,
        strokeLinejoin: "round",
        opacity: 0.9,
      },
      // Large foreground hexagonal salt-crust ridges expanding toward the viewer (y=189..229)
      {
        kind: "path",
        d: "M11 206 L34 210 L48 189 M34 210 L20 229 M34 210 L62 222 L66 196 M62 222 L54 229 M62 222 L106 221 L94 195 M106 221 L114 229 M106 221 L142 211 L126 190 M142 211 L158 229 M142 211 L169 207",
        stroke: "deep",
        strokeWidth: 2.5,
        strokeLinejoin: "round",
        opacity: 0.88,
      },
      // Crisp warm sunlit rim along the raised foreground salt polygon crests
      {
        kind: "path",
        d: "M11 204.2 L34 208.2 L48 187.5 M34 208.2 L62 220.2 L66 194.5 M62 220.2 L106 219.2 L94 193.5 M106 219.2 L142 209.2 L126 188.5 M142 209.2 L169 205.2",
        stroke: "accent",
        strokeWidth: 1.3,
        strokeLinejoin: "round",
        opacity: 0.78,
      },
      // Shadowed polygonal tile interiors for subtle screenprint depth
      { kind: "polygon", points: "48,191 64,197 60,219 36,209", fill: "accent-soft", opacity: 0.28 },
      { kind: "polygon", points: "96,197 125,192 140,209 107,219", fill: "accent-soft", opacity: 0.24 },
      { kind: "polygon", points: "67,198 93,197 104,219 64,220", fill: "paper", opacity: 0.45 },
      // Subtle foreground crust shadow anchoring bottom corners
      { kind: "path", d: "M11 224 L32 229 L11 229 Z", fill: "deep", opacity: 0.55 },
      { kind: "path", d: "M169 224 L148 229 L169 229 Z", fill: "deep", opacity: 0.55 },
    ],
  },

  // =========================================================================
  // 4. GRSA — Great Sand Dunes National Park (CO)
  // =========================================================================
  {
    code: "GRSA",
    subject: "S-curved Star Dune, snow-streaked Sangre de Cristo peaks & Medano Creek",
    accentLight: "#C98944",
    accentDark: "#EEB776",
    skyMood: "dawn",
    nodes: [
      // Plane 1: San Luis Valley dawn sky, crisp alpine sun & lenticular clouds
      { kind: "circle", cx: 46, cy: 40, r: 24, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 46, cy: 40, r: 11, fill: "accent", opacity: 0.92 },
      { kind: "path", d: "M82 26 Q116 20 154 27 Q132 31 82 26 Z", fill: "paper", opacity: 0.74 },
      { kind: "path", d: "M112 40 Q138 35 164 40 Q144 43 112 40 Z", fill: "paper", opacity: 0.56 },

      // Plane 2: Jagged snow-streaked 14,000-ft Sangre de Cristo Mountains
      {
        kind: "path",
        d: "M11 94 L28 66 L44 78 L62 50 L78 72 L96 44 L112 68 L128 48 L146 72 L158 58 L169 74 L169 124 L11 124 Z",
        fill: "far",
      },
      // Deep alpine shadowed east faces of the Sangre de Cristo fourteeners
      {
        kind: "path",
        d: "M62 50 L78 72 L86 106 L58 106 Z M96 44 L112 68 L118 106 L94 106 Z M128 48 L146 72 L152 106 L126 106 Z",
        fill: "ink",
        opacity: 0.68,
      },
      // Crisp snowfields & alpine couloirs streaking down the sunlit mountain flanks
      {
        kind: "path",
        d: "M62 50 L48 76 L56 72 L60 80 L66 64 Z",
        fill: "paper",
        opacity: 0.9,
      },
      {
        kind: "path",
        d: "M96 44 L81 74 L90 68 L94 82 L101 62 Z",
        fill: "paper",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M128 48 L115 72 L123 68 L127 78 L133 62 Z",
        fill: "paper",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M28 66 L18 84 L26 80 L31 86 L34 74 Z M158 58 L148 76 L156 74 L161 78 Z",
        fill: "paper",
        opacity: 0.78,
      },
      // Alpenglow tint catching the western sunrise facets
      {
        kind: "path",
        d: "M62 50 L44 78 L58 76 Z M96 44 L78 72 L92 70 Z",
        fill: "accent-soft",
        opacity: 0.42,
      },

      // Plane 3: Monumental sweeping dune field & towering S-curved Star Dune
      // Distant dune swell banking directly against the mountain base
      {
        kind: "path",
        d: "M11 112 Q44 96 78 108 Q118 94 169 108 L169 152 L11 152 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M11 112 Q44 96 78 108 L70 132 L11 132 Z",
        fill: "accent-soft",
        opacity: 0.54,
      },
      // Hero Star Dune sunlit golden-ochre body sweeping continuously across the canvas
      {
        kind: "path",
        d: "M11 136 Q46 120 76 112 Q92 104 106 90 Q126 108 169 122 L169 196 L11 196 Z",
        fill: "accent",
      },
      // Bright sunrise catchlight on the windward western flank of Star Dune
      {
        kind: "path",
        d: "M11 136 Q46 120 76 112 Q92 104 106 90 C94 114 78 128 96 150 C108 164 88 176 74 190 L11 190 Z",
        fill: "accent-soft",
        opacity: 0.62,
      },
      // Razor-sharp S-curved shadowed slip face of Star Dune (iconic WPA light/shadow split)
      {
        kind: "path",
        d: "M106 90 C94 114 78 128 96 150 C108 164 88 176 74 192 L169 192 L169 122 Q126 108 106 90 Z",
        fill: "ink",
      },
      // Deeper slip-face core shadow directly beneath the S-ridge crest
      {
        kind: "path",
        d: "M106 90 C94 114 78 128 96 150 C108 164 88 176 74 192 L116 192 C126 172 132 152 118 134 C112 124 112 108 106 90 Z",
        fill: "deep",
        opacity: 0.72,
      },
      // Crisp sunlit highlight edge tracing Star Dune's S-ridge
      {
        kind: "path",
        d: "M106 90 C94 114 78 128 96 150 C108 164 88 176 74 192",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.85,
      },
      // Interlocking left foreground sweeping dune ridge
      {
        kind: "path",
        d: "M11 128 Q36 138 64 166 Q76 178 90 192 L11 192 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M11 128 C28 144 44 158 40 192 L11 192 Z",
        fill: "accent-soft",
        opacity: 0.56,
      },
      {
        kind: "path",
        d: "M11 128 C28 144 44 158 40 192 L90 192 Q76 178 64 166 Q36 138 11 128 Z",
        fill: "deep",
        opacity: 0.88,
      },
      // Subtle wind-carved sand ripples across sunlit flank
      {
        kind: "path",
        d: "M54 132 Q70 128 84 134 M48 144 Q64 140 80 146 M18 158 Q28 155 36 160",
        stroke: "paper",
        strokeWidth: 1.1,
        strokeLinecap: "round",
        opacity: 0.52,
      },

      // Plane 4: Shallow braided Medano Creek curving across the lower sand flat
      { kind: "rect", x: 11, y: 186, width: 158, height: 43, fill: "accent-soft", opacity: 0.84 },
      // Cool sky-reflecting shallow Medano Creek braided channels
      {
        kind: "path",
        d: "M11 194 Q54 188 98 196 Q136 202 169 192 L169 216 Q128 224 84 214 Q42 206 11 214 Z",
        fill: "far",
        opacity: 0.86,
      },
      {
        kind: "path",
        d: "M11 204 Q56 198 104 206 Q140 212 169 204 L169 212 Q132 218 92 210 Q48 204 11 210 Z",
        fill: "mid",
        opacity: 0.62,
      },
      // Exposed wet golden sandbar islands inside Medano Creek
      { kind: "ellipse", cx: 56, cy: 204, rx: 22, ry: 3.2, fill: "accent-soft", opacity: 0.9 },
      { kind: "ellipse", cx: 126, cy: 208, rx: 24, ry: 3.4, fill: "accent-soft", opacity: 0.88 },
      // Crisp surge-flow water ripple highlights
      {
        kind: "path",
        d: "M22 197 Q46 194 70 198 M92 201 Q118 198 146 202 M34 211 Q62 208 88 212 M104 216 Q134 213 158 216",
        stroke: "paper",
        strokeWidth: 1.3,
        strokeLinecap: "round",
        opacity: 0.88,
      },

      // Plane 5: Foreground wet sandbank framing bottom edge
      { kind: "path", d: "M11 216 Q48 220 74 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 216 Q134 220 108 229 L169 229 Z", fill: "deep" },
      { kind: "line", x1: 11, y1: 228, x2: 169, y2: 228, stroke: "deep", strokeWidth: 3 },
    ],
  },

  // =========================================================================
  // 5. INDU — Indiana Dunes National Park (IN)
  // =========================================================================
  {
    code: "INDU",
    subject: "Lake Michigan sunset horizon framed by wind-swept marram-grass coastal dunes",
    accentLight: "#D17A3A",
    accentDark: "#F2A96E",
    skyMood: "dusk",
    nodes: [
      // Plane 1: Radiant Lake Michigan sunset disc & layered horizontal dusk clouds
      { kind: "circle", cx: 90, cy: 102, r: 52, fill: "accent-soft", opacity: 0.28 },
      { kind: "circle", cx: 90, cy: 102, r: 34, fill: "accent-soft", opacity: 0.42 },
      { kind: "circle", cx: 90, cy: 102, r: 17, fill: "accent", opacity: 0.96 },
      { kind: "circle", cx: 90, cy: 102, r: 10, fill: "paper", opacity: 0.52 },
      // Sweeping Lake Michigan dusk cloud bands
      { kind: "path", d: "M14 34 Q46 29 76 35 Q52 38 14 34 Z", fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M104 40 Q136 34 166 40 Q140 43 104 40 Z", fill: "paper", opacity: 0.54 },
      { kind: "path", d: "M22 60 Q58 54 92 60 Q64 63 22 60 Z", fill: "accent-soft", opacity: 0.62 },
      { kind: "path", d: "M96 68 Q130 62 164 68 Q138 71 96 68 Z", fill: "accent-soft", opacity: 0.58 },
      { kind: "path", d: "M14 84 Q48 80 74 84 M106 84 Q136 80 166 84", stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.48 },

      // Plane 2: Wide horizontal Lake Michigan water expanse & shimmering sunset reflection bars
      { kind: "rect", x: 11, y: 104, width: 158, height: 68, fill: "mid" },
      { kind: "rect", x: 11, y: 104, width: 158, height: 18, fill: "far", opacity: 0.52 },
      { kind: "rect", x: 11, y: 138, width: 158, height: 34, fill: "ink", opacity: 0.45 },
      // Crisp bright sunset horizon line
      { kind: "line", x1: 11, y1: 104, x2: 169, y2: 104, stroke: "accent-soft", strokeWidth: 1.8, opacity: 0.88 },
      // Tapering column of glowing sunset reflections rippling down the water
      { kind: "line", x1: 66, y1: 108, x2: 114, y2: 108, stroke: "paper", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.92 },
      { kind: "line", x1: 72, y1: 114, x2: 108, y2: 114, stroke: "accent-soft", strokeWidth: 2.4, strokeLinecap: "round", opacity: 0.9 },
      { kind: "line", x1: 76, y1: 120, x2: 104, y2: 120, stroke: "accent", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.92 },
      { kind: "line", x1: 79, y1: 127, x2: 101, y2: 127, stroke: "paper", strokeWidth: 2, strokeLinecap: "round", opacity: 0.84 },
      { kind: "line", x1: 81, y1: 134, x2: 99, y2: 134, stroke: "accent-soft", strokeWidth: 1.9, strokeLinecap: "round", opacity: 0.82 },
      { kind: "line", x1: 83, y1: 141, x2: 97, y2: 141, stroke: "accent", strokeWidth: 1.7, strokeLinecap: "round", opacity: 0.8 },
      { kind: "line", x1: 85, y1: 148, x2: 95, y2: 148, stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.72 },
      // Subtle wide lake swell lines
      {
        kind: "path",
        d: "M16 122 L54 122 M126 124 L164 124 M20 138 L64 138 M118 140 L162 140",
        stroke: "paper",
        strokeWidth: 1,
        strokeLinecap: "round",
        opacity: 0.36,
      },

      // Plane 3: Curving lakeshore beach spit & midground coastal sand dunes
      {
        kind: "path",
        d: "M11 144 Q48 142 82 156 Q106 164 169 148 L169 188 L11 188 Z",
        fill: "accent-soft",
        opacity: 0.78,
      },
      // White surf foam hugging the curving shore
      {
        kind: "path",
        d: "M11 144 Q48 142 82 156 Q106 164 169 148",
        stroke: "paper",
        strokeWidth: 1.8,
        opacity: 0.82,
      },
      // Midground curving coastal dune banks rising cleanly left and right
      {
        kind: "path",
        d: "M11 146 Q42 144 74 168 Q94 182 114 196 L11 196 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M169 142 Q136 146 106 170 Q90 182 72 198 L169 198 Z",
        fill: "ink",
      },
      // Warm dusk light kissing the curving sand dune shoulders
      {
        kind: "path",
        d: "M11 146 Q42 144 74 168 L58 176 Q34 156 11 158 Z",
        fill: "accent",
        opacity: 0.56,
      },
      {
        kind: "path",
        d: "M169 142 Q136 146 106 170 L118 176 Q142 156 169 156 Z",
        fill: "accent",
        opacity: 0.44,
      },

      // Plane 4: Foreground sweeping dune ridge anchoring the full width
      {
        kind: "path",
        d: "M11 174 Q48 176 84 196 Q126 176 169 180 L169 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M11 174 Q48 176 84 196 Q126 176 169 180",
        stroke: "accent-soft",
        strokeWidth: 1.7,
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M24 206 Q72 198 118 212 Q144 208 169 202",
        stroke: "ink",
        strokeWidth: 2,
        opacity: 0.58,
      },

      // Plane 5: Delicate arching marram beach grass blades swaying in the lake breeze
      // Left dune marram grass cluster
      {
        kind: "path",
        d: "M22 186 Q16 154 28 134 M26 188 Q26 158 40 138 M32 190 Q38 164 52 148 M38 192 Q48 170 60 158 M16 184 Q12 162 20 144",
        stroke: "deep",
        strokeWidth: 1.7,
        strokeLinecap: "round",
      },
      // Right dune marram grass cluster
      {
        kind: "path",
        d: "M156 188 Q162 156 148 134 M150 190 Q148 160 136 140 M144 192 Q136 166 124 150 M136 194 Q126 174 116 162 M162 186 Q166 164 156 146",
        stroke: "deep",
        strokeWidth: 1.7,
        strokeLinecap: "round",
      },
      // Warm backlit marram grass tips & seed plumes catching sunset light
      {
        kind: "path",
        d: "M26 142 Q28 137 29 133 M38 144 Q41 139 42 136 M148 142 Q147 137 146 133 M137 146 Q135 141 134 138",
        stroke: "accent-soft",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.85,
      },
      // Lower foreground sweeping grass wisps
      {
        kind: "path",
        d: "M52 208 Q62 190 74 182 M124 210 Q114 192 104 184",
        stroke: "deep",
        strokeWidth: 1.5,
        strokeLinecap: "round",
      },
    ],
  },

  // =========================================================================
  // 6. JOTR — Joshua Tree National Park (CA)
  // =========================================================================
  {
    code: "JOTR",
    subject: "Iconic Mojave Joshua tree silhouette, monzogranite boulder piles & twilight sky",
    accentLight: "#D47A38",
    accentDark: "#F3AA6E",
    skyMood: "dusk",
    nodes: [
      // Plane 1: Radiant Mojave desert twilight sky, glowing low sun, crescent moon & stars
      { kind: "circle", cx: 116, cy: 90, r: 48, fill: "accent-soft", opacity: 0.3 },
      { kind: "circle", cx: 116, cy: 90, r: 30, fill: "accent-soft", opacity: 0.44 },
      { kind: "circle", cx: 116, cy: 90, r: 16, fill: "accent", opacity: 0.96 },
      { kind: "path", d: "M30 28 A6.5 6.5 0 1 0 39 37 A5.2 5.2 0 1 1 30 28 Z", fill: "paper", opacity: 0.92 },
      { kind: "circle", cx: 58, cy: 26, r: 1.2, fill: "paper", opacity: 0.84 },
      { kind: "circle", cx: 146, cy: 28, r: 1.3, fill: "paper", opacity: 0.86 },
      { kind: "circle", cx: 158, cy: 48, r: 1, fill: "paper", opacity: 0.76 },
      { kind: "path", d: "M16 58 Q48 52 78 58 Q54 61 16 58 Z", fill: "accent-soft", opacity: 0.5 },
      { kind: "path", d: "M122 50 Q146 46 166 51 Q146 54 122 50 Z", fill: "paper", opacity: 0.46 },

      // Plane 2: Distant Little San Bernardino / Pinto Mountain twilight horizon
      {
        kind: "path",
        d: "M11 124 L32 114 L52 120 L74 112 L98 118 L124 110 L146 118 L169 112 L169 154 L11 154 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M11 124 L32 114 L52 120 L74 112 L98 118 L124 110 L146 118 L169 112",
        stroke: "accent-soft",
        strokeWidth: 1.2,
        opacity: 0.55,
      },

      // Plane 3: Mojave desert plain & sculptural stacked monzogranite boulder piles (Wonderland / Skull Rock)
      { kind: "rect", x: 11, y: 146, width: 158, height: 83, fill: "mid" },
      // Left stacked rounded monzogranite boulder pile
      {
        kind: "path",
        d: "M11 158 Q16 142 32 144 Q46 146 48 164 L48 182 L11 182 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M28 176 Q34 156 50 158 Q64 160 66 178 L66 192 L28 192 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M34 146 Q44 146 47 160 M50 158 Q61 160 65 174",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      // Right stacked rounded monzogranite boulder dome (Skull Rock / Jumbo Rocks silhouette)
      {
        kind: "path",
        d: "M108 184 Q106 154 126 146 Q142 140 156 152 Q166 142 169 144 L169 192 L108 192 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M122 148 Q132 130 148 134 Q162 138 162 154 Q146 156 122 148 Z",
        fill: "ink",
      },
      // Sunlit twilight glow hugging the top-left curves of the granite boulders
      {
        kind: "path",
        d: "M110 164 Q112 150 126 146 M124 146 Q132 132 146 134",
        stroke: "accent",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.76,
      },
      // Subtle weathered granite depressions on Skull Rock boulder
      { kind: "ellipse", cx: 132, cy: 162, rx: 4.2, ry: 3.2, fill: "deep", opacity: 0.65 },
      { kind: "ellipse", cx: 146, cy: 161, rx: 3.6, ry: 2.8, fill: "deep", opacity: 0.65 },

      // Mid-desert floor ridge
      {
        kind: "path",
        d: "M11 178 Q56 172 96 180 Q134 174 169 182 L169 216 L11 216 Z",
        fill: "ink",
      },
      // Distant companion juvenile Joshua tree silhouette on the right boulder slope
      {
        kind: "path",
        d: "M148 198 L148 166 M148 180 L140 174 L139 166 M148 176 L156 170 L157 162",
        stroke: "deep",
        strokeWidth: 2.6,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      { kind: "circle", cx: 139, cy: 164, r: 3.8, fill: "deep" },
      { kind: "circle", cx: 148, cy: 163, r: 4.2, fill: "deep" },
      { kind: "circle", cx: 157, cy: 160, r: 3.8, fill: "deep" },

      // Plane 4: HERO — Bold, twisted multi-branched Mojave Joshua Tree commanding the composition
      // Thick tapered organic main trunk rooted on the foreground ridge
      {
        kind: "path",
        d: "M70 218 L73 166 Q74 144 76 124 L84 124 Q84 146 86 168 L90 218 Z",
        fill: "deep",
      },
      // Iconic twisted, elbowed multi-forking Joshua tree branches
      {
        kind: "path",
        d: "M77 148 L56 136 L44 114 L42 92 M78 134 L62 110 L58 78 M80 128 L82 96 L80 62 M82 136 L104 118 L114 96 L118 76 M83 152 L106 144 L122 132 L126 118 M75 162 L52 156 L38 144",
        stroke: "deep",
        strokeWidth: 6.2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      // Secondary upper inner fork feeding the central-right crown
      {
        kind: "path",
        d: "M104 118 L98 92",
        stroke: "deep",
        strokeWidth: 4.4,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      // Subtle warm dusk rim-light edge on sunward right side of hero trunk & main right arm
      {
        kind: "path",
        d: "M84 134 L86 196 M84 136 L105 119 L115 97",
        stroke: "accent",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      // Spiky rosette yucca leaf clusters (crisp starburst crowns at every branch tip!)
      {
        kind: "polygon",
        points: "42,78 45,86 53,82 48,90 55,95 46,96 47,104 41,98 34,103 36,95 28,92 36,88 33,80 40,85",
        fill: "deep",
      },
      {
        kind: "polygon",
        points: "58,64 61,72 69,68 64,76 71,81 62,82 63,90 57,84 50,89 52,81 44,78 52,74 49,66 56,71",
        fill: "deep",
      },
      {
        kind: "polygon",
        points: "80,47 84,56 93,52 87,60 95,66 85,67 86,76 79,69 72,75 74,66 65,63 74,58 70,50 78,55",
        fill: "deep",
      },
      {
        kind: "polygon",
        points: "98,79 101,86 108,83 103,90 109,94 101,95 102,102 97,96 91,100 93,93 86,91 93,87 90,81 96,85",
        fill: "deep",
      },
      {
        kind: "polygon",
        points: "118,62 121,70 129,66 124,74 131,79 122,80 123,88 117,82 110,87 112,79 104,76 112,72 109,64 116,69",
        fill: "deep",
      },
      {
        kind: "polygon",
        points: "126,105 129,112 136,109 131,116 137,120 129,121 130,128 125,122 119,126 121,119 114,117 121,113 118,107 124,111",
        fill: "deep",
      },
      {
        kind: "polygon",
        points: "38,131 41,138 48,135 43,142 49,146 41,147 42,154 37,148 31,152 33,145 26,143 33,139 30,133 36,137",
        fill: "deep",
      },
      // Tiny warm sunset edge highlights kissing the eastern leaf spikes
      {
        kind: "path",
        d: "M84 56 L92 53 M121 70 L128 67 M129 112 L135 110",
        stroke: "accent-soft",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.78,
      },

      // Plane 5: Foreground Mojave desert slope & silhouetted desert scrub framing bottom
      {
        kind: "path",
        d: "M11 200 Q46 196 86 206 Q128 198 169 204 L169 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M11 200 Q46 196 86 206 Q128 198 169 204",
        stroke: "accent-soft",
        strokeWidth: 1.5,
        opacity: 0.62,
      },
      // Small silhouetted Mohave yucca & desert rocks along foreground ridge
      {
        kind: "path",
        d: "M24 206 L18 192 M24 206 L24 190 M24 206 L31 193 M154 206 L149 194 M154 206 L156 192 M154 206 L162 195",
        stroke: "deep",
        strokeWidth: 1.8,
        strokeLinecap: "round",
      },
    ],
  },

  // =========================================================================
  // 7. KOVA — Kobuk Valley National Park (AK)
  // (Unvisited: engineered with crisp light/mid/dark tonal hierarchy for grayscale)
  // =========================================================================
  {
    code: "KOVA",
    subject: "Great Kobuk Arctic sand dunes, boreal spruce forest & braided Kobuk River",
    accentLight: "#B38A4C",
    accentDark: "#DFBA7E",
    skyMood: "noon",
    nodes: [
      // Plane 1: Crisp pale subarctic sky, low Arctic sun & clean cloud strata
      { kind: "circle", cx: 42, cy: 36, r: 20, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 42, cy: 36, r: 10.5, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M76 26 Q112 20 152 27 Q128 31 76 26 Z", fill: "paper", opacity: 0.78 },
      { kind: "path", d: "M114 40 Q138 36 164 40 Q144 43 114 40 Z", fill: "paper", opacity: 0.62 },

      // Plane 2: Jagged Brooks Range — Baird Mountains with crisp sunlit/shadow contrast
      {
        kind: "path",
        d: "M11 90 L26 68 L40 78 L58 54 L74 72 L92 48 L108 68 L126 52 L144 74 L158 62 L169 78 L169 108 L11 108 Z",
        fill: "ink",
      },
      // Bright sunlit western snow facets for high tonal contrast in grayscale
      {
        kind: "path",
        d: "M58 54 L42 78 L54 76 L58 84 L62 66 Z M92 48 L76 74 L88 70 L92 82 L96 64 Z M126 52 L112 72 L122 69 L126 78 L130 64 Z",
        fill: "paper",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M26 68 L14 86 L24 84 L28 76 Z M158 62 L146 78 L156 76 L160 72 Z",
        fill: "far",
        opacity: 0.78,
      },

      // Plane 3: Hero Great Kobuk Arctic Sand Dunes sweeping continuously left-to-right
      // Bright sunlit golden-pale windward dune expanse
      {
        kind: "path",
        d: "M11 104 Q44 88 78 100 Q114 86 146 98 Q158 102 169 96 L169 156 L11 156 Z",
        fill: "paper",
        opacity: 0.92,
      },
      // Warm golden ochre tint over the dune field
      {
        kind: "path",
        d: "M11 104 Q44 88 78 100 Q114 86 146 98 Q158 102 169 96 L169 156 L11 156 Z",
        fill: "accent-soft",
        opacity: 0.54,
      },
      // Dramatic high-contrast shadowed leeward slip faces (read sharply in monochrome!)
      {
        kind: "path",
        d: "M44 94 C54 108 66 122 60 144 L96 144 Q88 122 78 100 Q60 94 44 94 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M118 90 C128 106 142 122 134 146 L169 146 L169 96 Q158 102 146 98 Q132 92 118 90 Z",
        fill: "ink",
        opacity: 0.72,
      },
      // Sweeping foreground dune wave crest interlocking from the left
      {
        kind: "path",
        d: "M11 118 Q36 108 64 128 Q94 114 128 134 Q148 128 169 138 L169 158 L11 158 Z",
        fill: "accent",
        opacity: 0.76,
      },
      {
        kind: "path",
        d: "M38 114 C48 126 56 138 52 152 L84 152 Q74 136 64 128 Q50 118 38 114 Z",
        fill: "ink",
        opacity: 0.65,
      },
      // Crisp bright dune crest lines separating sunlit sand from shadow faces
      {
        kind: "path",
        d: "M11 118 Q36 108 64 128 M78 122 Q98 114 128 134",
        stroke: "paper",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        opacity: 0.92,
      },

      // Plane 4: Pitch-dark boreal black spruce taiga treeline separating dunes from river
      {
        kind: "path",
        d: "M11 154 L16 138 L21 152 L26 132 L31 150 L37 136 L42 152 L48 134 L53 150 L59 140 L64 154 L71 136 L77 152 L83 142 L89 156 L96 138 L102 152 L108 134 L114 150 L120 138 L126 154 L132 134 L138 150 L144 132 L150 150 L156 136 L162 152 L169 140 L169 170 L11 170 Z",
        fill: "deep",
      },
      // Crisp shoreline edge beneath the spruce wall
      {
        kind: "path",
        d: "M11 168 Q56 164 96 170 Q136 164 169 168",
        stroke: "paper",
        strokeWidth: 1.4,
        opacity: 0.65,
      },

      // Plane 5: Wide gleaming braided Kobuk River & dark tundra gravel bars
      { kind: "rect", x: 11, y: 168, width: 158, height: 61, fill: "paper", opacity: 0.94 },
      { kind: "rect", x: 11, y: 168, width: 158, height: 61, fill: "far", opacity: 0.38 },
      // Braided glacial silt & gravel bar islands weaving across the wide Kobuk River
      {
        kind: "path",
        d: "M11 178 Q42 174 74 182 Q52 188 11 186 Z",
        fill: "ink",
        opacity: 0.84,
      },
      {
        kind: "path",
        d: "M82 176 Q116 172 150 180 Q124 186 82 182 Z",
        fill: "mid",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M34 196 Q74 188 114 198 Q84 206 34 202 Z",
        fill: "ink",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M118 192 Q144 186 169 194 L169 204 Q142 204 118 198 Z",
        fill: "deep",
        opacity: 0.84,
      },
      {
        kind: "path",
        d: "M11 206 Q46 202 82 214 Q52 222 11 218 Z",
        fill: "mid",
        opacity: 0.86,
      },
      {
        kind: "path",
        d: "M88 212 Q126 206 169 216 L169 224 Q124 224 88 218 Z",
        fill: "ink",
        opacity: 0.86,
      },
      // Crisp gleaming Arctic river flow ribbons weaving around the gravel bars
      {
        kind: "path",
        d: "M16 174 Q64 172 108 174 Q142 176 164 174",
        stroke: "paper",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M18 190 Q64 184 112 190 Q144 194 166 188",
        stroke: "paper",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M22 204 Q72 208 122 204 Q148 202 164 208",
        stroke: "paper",
        strokeWidth: 1.7,
        strokeLinecap: "round",
        opacity: 0.92,
      },
      // Foreground dark spruce-and-tundra riverbanks anchoring the bottom corners
      { kind: "path", d: "M11 214 Q36 218 58 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 216 Q142 218 122 229 L169 229 Z", fill: "deep" },
      // Tiny foreground boreal spruce spires framing extreme lower corners
      { kind: "polygon", points: "22,198 16,222 28,222", fill: "deep" },
      { kind: "polygon", points: "158,200 152,222 164,222", fill: "deep" },
    ],
  },

  // =========================================================================
  // 8. MACA — Mammoth Cave National Park (KY)
  // =========================================================================
  {
    code: "MACA",
    subject: "Vaulted horizontal-bedded limestone chamber, Frozen Niagara flowstone & lantern glow",
    accentLight: "#C9883C",
    accentDark: "#F0B86E",
    skyMood: "night",
    nodes: [
      // Plane 1: Deep subterranean chamber darkness & warm lantern light radiating across the hall
      { kind: "rect", x: 11, y: 11, width: 158, height: 218, fill: "deep" },
      // Warm radial subterranean lantern radiance illuminating Frozen Niagara & the stone vault
      { kind: "ellipse", cx: 102, cy: 132, rx: 64, ry: 74, fill: "accent", opacity: 0.28 },
      { kind: "ellipse", cx: 104, cy: 138, rx: 44, ry: 52, fill: "accent-soft", opacity: 0.32 },
      // Subtle angled golden lantern beam fanning up from the trail lantern onto Frozen Niagara
      { kind: "polygon", points: "74,162 152,64 166,184 74,174", fill: "accent-soft", opacity: 0.22 },

      // Plane 2: Monumental flat-bedded Mississippian limestone ceiling (architectural stepped strata)
      { kind: "rect", x: 11, y: 11, width: 158, height: 24, fill: "ink" },
      { kind: "path", d: "M11 35 L169 35 L169 52 L144 52 L144 45 L46 45 L46 54 L11 54 Z", fill: "deep" },
      { kind: "path", d: "M11 54 L42 54 L42 74 L11 74 Z", fill: "ink", opacity: 0.88 },
      { kind: "path", d: "M142 52 L169 52 L169 72 L142 72 Z", fill: "ink", opacity: 0.82 },
      // Horizontal limestone bedding-plane strata highlights catching warm upward lantern light
      { kind: "line", x1: 11, y1: 35, x2: 169, y2: 35, stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.56 },
      { kind: "line", x1: 46, y1: 45, x2: 144, y2: 45, stroke: "accent", strokeWidth: 1.8, opacity: 0.72 },
      { kind: "line", x1: 54, y1: 52, x2: 136, y2: 52, stroke: "paper", strokeWidth: 1.1, opacity: 0.42 },
      // Angular stepped left-wall limestone ledges & gallery recess
      {
        kind: "path",
        d: "M11 74 L48 74 L48 106 L38 106 L38 148 L52 148 L52 184 L11 184 Z",
        fill: "ink",
      },
      { kind: "line", x1: 38, y1: 106, x2: 48, y2: 106, stroke: "accent-soft", strokeWidth: 1.3, opacity: 0.6 },
      { kind: "line", x1: 38, y1: 148, x2: 52, y2: 148, stroke: "accent", strokeWidth: 1.4, opacity: 0.65 },

      // Plane 3: Hero Frozen Niagara — monumental pleated travertine flowstone draperies
      // Main travertine wall silhouette cascading vertically down the center-right chamber
      {
        kind: "path",
        d: "M84 48 L158 48 L162 186 L76 186 Q82 148 80 116 Q84 82 84 48 Z",
        fill: "mid",
      },
      // Overlapping vertical organ-pipe flowstone curtains (warm amber travertine)
      {
        kind: "path",
        d: "M88 52 C85 84 88 122 83 176 L98 176 C100 124 98 86 101 52 Z",
        fill: "accent",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M104 48 C102 88 106 128 102 182 L120 182 C122 128 119 88 122 48 Z",
        fill: "accent",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M124 52 C122 90 126 130 123 184 L140 184 C142 130 138 90 141 52 Z",
        fill: "accent",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M144 58 C142 94 146 134 143 182 L156 182 L156 58 Z",
        fill: "ink",
        opacity: 0.76,
      },
      // Deep vertical shadow flutes separating the travertine drapery folds
      {
        kind: "path",
        d: "M99 54 L97 178 M121 50 L119 182 M141 54 L139 182",
        stroke: "deep",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.84,
      },
      // Glistening wet calcite highlight ribs down the flowstone cascade
      {
        kind: "path",
        d: "M92 60 L90 164 M110 56 L108 172 M115 62 L114 166 M130 62 L129 170",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.76,
      },
      // Scalloped horizontal travertine rimstone ledges across Frozen Niagara
      {
        kind: "path",
        d: "M82 96 Q94 102 106 96 Q118 102 130 96 Q142 102 154 96",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.82,
      },
      {
        kind: "path",
        d: "M80 138 Q94 144 108 138 Q122 144 136 138 Q148 144 158 138",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.78,
      },
      // Left chamber stalagmite column & ceiling stalactite cluster
      {
        kind: "path",
        d: "M54 186 L58 118 Q62 108 66 118 L70 186 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M63 112 L66 118 L69 182 L63 182 Z",
        fill: "accent",
        opacity: 0.56,
      },
      {
        kind: "path",
        d: "M54 45 L58 78 L62 45 M68 45 L71 68 L74 45",
        fill: "ink",
      },

      // Plane 4: Cavern floor, perspective stone tour trail, handrail & glowing lantern beacon
      { kind: "path", d: "M11 180 L169 180 L169 229 L11 229 Z", fill: "ink" },
      // Perspective flagstone cave trail winding toward the lantern
      {
        kind: "path",
        d: "M68 180 L84 180 L108 229 L38 229 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M72 180 L82 180 L98 229 L52 229 Z",
        fill: "accent-soft",
        opacity: 0.42,
      },
      // Stepped stone trail risers
      { kind: "line", x1: 64, y1: 192, x2: 89, y2: 192, stroke: "deep", strokeWidth: 1.2, opacity: 0.62 },
      { kind: "line", x1: 56, y1: 205, x2: 96, y2: 205, stroke: "deep", strokeWidth: 1.3, opacity: 0.65 },
      { kind: "line", x1: 48, y1: 219, x2: 103, y2: 219, stroke: "deep", strokeWidth: 1.5, opacity: 0.68 },
      // Perspective iron cave handrail & posts guiding the viewer into the cathedral
      { kind: "line", x1: 86, y1: 170, x2: 118, y2: 229, stroke: "deep", strokeWidth: 2.2, strokeLinecap: "round" },
      { kind: "line", x1: 86, y1: 170, x2: 118, y2: 229, stroke: "accent-soft", strokeWidth: 0.9, opacity: 0.78 },
      {
        kind: "path",
        d: "M92 182 L92 196 M101 198 L101 215 M111 214 L111 229",
        stroke: "deep",
        strokeWidth: 1.8,
        strokeLinecap: "round",
      },
      // Warm glowing trail lantern beacon casting light up across Frozen Niagara
      { kind: "circle", cx: 76, cy: 166, r: 10, fill: "accent", opacity: 0.48 },
      { kind: "circle", cx: 76, cy: 166, r: 4.5, fill: "accent-soft", opacity: 0.92 },
      { kind: "circle", cx: 76, cy: 166, r: 2.1, fill: "paper", opacity: 0.98 },

      // Plane 5: Dark angular foreground limestone breakdown & left portal pillar
      { kind: "path", d: "M11 11 L28 11 L24 140 L36 184 L44 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 178 L138 192 L124 229 L169 229 Z", fill: "deep" },
    ],
  },

  // =========================================================================
  // 9. PINN — Pinnacles National Park (CA)
  // =========================================================================
  {
    code: "PINN",
    subject: "High Peaks volcanic breccia spires, chaparral hills & soaring California Condor",
    accentLight: "#C76B38",
    accentDark: "#ED9D6C",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Warm California Coast Range dawn sky, rising sun & delicate clouds
      { kind: "circle", cx: 44, cy: 62, r: 28, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 44, cy: 62, r: 17, fill: "accent-soft", opacity: 0.46 },
      { kind: "circle", cx: 44, cy: 62, r: 11, fill: "accent", opacity: 0.94 },
      { kind: "path", d: "M18 30 Q44 25 74 30 Q52 34 18 30 Z", fill: "paper", opacity: 0.6 },
      { kind: "path", d: "M114 66 Q140 61 166 66 Q146 69 114 66 Z", fill: "paper", opacity: 0.48 },

      // Plane 2: Hero Wildlife — Single unmistakable soaring California Condor above the High Peaks
      // Broad rectangular soaring wings with splayed primary wingtip feathers & wedge tail
      {
        kind: "path",
        d: "M116 38 L104 34 L90 36 L82 33 L88 38 L83 41 L91 41 L88 44 L96 42 L112 43 L113 48 L120 48 L121 43 L138 42 L146 44 L143 41 L151 41 L146 38 L152 33 L144 36 L130 34 L118 38 L117 34 Z",
        fill: "deep",
      },
      // Characteristic pale white underwing triangular patches of the California Condor
      {
        kind: "path",
        d: "M96 38 L110 37 L108 40 L98 40 Z M124 37 L138 38 L136 40 L126 40 Z",
        fill: "paper",
        opacity: 0.85,
      },

      // Plane 3: Rolling distant Gabilan Range foothills
      {
        kind: "path",
        d: "M11 114 Q42 98 76 110 Q116 96 169 112 L169 156 L11 156 Z",
        fill: "far",
      },
      {
        kind: "path",
        d: "M11 132 Q48 118 88 130 Q128 118 169 130 L169 168 L11 168 Z",
        fill: "mid",
        opacity: 0.82,
      },

      // Plane 4: Hero High Peaks — jagged rusted volcanic breccia crags & spires
      // Continuous dramatic volcanic monolith cluster surging out of the Coast Range hills
      {
        kind: "path",
        d: "M11 156 L26 124 L34 134 L46 98 L54 78 L60 80 L68 116 L76 92 L84 62 L90 62 L98 102 L106 72 L112 74 L120 112 L130 86 L136 88 L146 126 L156 108 L169 134 L169 186 L11 186 Z",
        fill: "ink",
      },
      // Blazing sunrise-lit rusted volcanic terracotta faces (western sunrise catchlight)
      {
        kind: "path",
        d: "M54 78 L46 98 L40 148 L56 148 L57 88 Z",
        fill: "accent",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M84 62 L76 92 L70 154 L86 154 L87 72 Z",
        fill: "accent",
        opacity: 0.86,
      },
      {
        kind: "path",
        d: "M106 72 L98 102 L94 156 L108 156 L109 80 Z",
        fill: "accent",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M130 86 L122 114 L118 156 L132 156 L133 94 Z",
        fill: "accent",
        opacity: 0.72,
      },
      // Crisp sunlit breccia spire rim highlights
      {
        kind: "path",
        d: "M54 78 L46 98 L42 136 M84 62 L76 92 L72 140 M106 72 L98 102 M130 86 L122 116",
        stroke: "accent-soft",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.86,
      },
      // Deep shadowed eastern volcanic cliffs & vertical breccia fractures
      {
        kind: "path",
        d: "M87 64 L90 62 L98 102 L94 158 L86 158 Z M109 74 L112 74 L120 112 L116 158 L108 158 Z",
        fill: "deep",
        opacity: 0.74,
      },
      {
        kind: "path",
        d: "M56 84 L58 144 M87 70 L88 150 M109 78 L110 148 M133 92 L134 150",
        stroke: "deep",
        strokeWidth: 1.1,
        opacity: 0.62,
      },
      // Secondary foreground volcanic crag buttress at lower left
      {
        kind: "path",
        d: "M11 142 L28 128 L42 156 L54 176 L11 176 Z",
        fill: "ink",
      },

      // Plane 5: Foreground chaparral hills, High Peaks trail & gnarled California blue oaks
      {
        kind: "path",
        d: "M11 164 Q48 158 84 174 Q124 160 169 168 L169 229 L11 229 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M11 178 Q54 170 92 186 Q132 174 169 182 L169 229 L11 229 Z",
        fill: "deep",
      },
      // Sunlit High Peaks winding trail ribbon climbing toward the spires
      {
        kind: "path",
        d: "M72 229 C76 212 96 206 90 192 C86 182 96 176 92 166",
        stroke: "accent-soft",
        strokeWidth: 3.4,
        strokeLinecap: "round",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M72 229 C76 212 96 206 90 192 C86 182 96 176 92 166",
        stroke: "paper",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      // Gnarled California blue oak & chaparral silhouettes framing left & right slopes
      {
        kind: "path",
        d: "M30 212 L32 188 M32 196 L22 190 M32 194 L42 188",
        stroke: "deep",
        strokeWidth: 2.6,
        strokeLinecap: "round",
      },
      { kind: "ellipse", cx: 26, cy: 186, rx: 12, ry: 7.5, fill: "deep" },
      { kind: "ellipse", cx: 38, cy: 188, rx: 11, ry: 6.5, fill: "deep" },
      { kind: "ellipse", cx: 32, cy: 179, rx: 10, ry: 6, fill: "deep" },
      // Right chaparral oak & manzanita clusters
      {
        kind: "path",
        d: "M148 214 L146 190 M146 198 L136 192 M146 196 L156 192",
        stroke: "deep",
        strokeWidth: 2.6,
        strokeLinecap: "round",
      },
      { kind: "ellipse", cx: 142, cy: 188, rx: 11, ry: 6.8, fill: "deep" },
      { kind: "ellipse", cx: 154, cy: 190, rx: 12, ry: 7, fill: "deep" },
      { kind: "ellipse", cx: 148, cy: 181, rx: 10, ry: 5.8, fill: "deep" },
      // Warm dawn rim light on oak crowns & hillside crest
      {
        kind: "path",
        d: "M18 182 Q30 172 42 182 M136 184 Q148 174 158 184",
        stroke: "accent",
        strokeWidth: 1.3,
        strokeLinecap: "round",
        opacity: 0.65,
      },
    ],
  },

  // =========================================================================
  // 10. THRO — Theodore Roosevelt National Park (ND)
  // =========================================================================
  {
    code: "THRO",
    subject: "Painted Canyon flat-topped plateaus, scoria domes & meandering Little Missouri River",
    accentLight: "#C2773C",
    accentDark: "#E9A970",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Expansive Northern Plains sunrise sky & horizontal dawn clouds
      { kind: "circle", cx: 90, cy: 66, r: 34, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 90, cy: 66, r: 21, fill: "accent-soft", opacity: 0.44 },
      { kind: "circle", cx: 90, cy: 66, r: 12.5, fill: "accent", opacity: 0.94 },
      { kind: "path", d: "M16 30 Q48 24 84 30 Q58 34 16 30 Z", fill: "paper", opacity: 0.64 },
      { kind: "path", d: "M104 36 Q136 30 166 36 Q142 39 104 36 Z", fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M24 48 Q56 44 82 48 M104 50 Q134 46 162 50", stroke: "accent-soft", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.62 },

      // Plane 2: Broad flat-topped North Dakota prairie plateau horizon (distinct from jagged SD spires!)
      {
        kind: "path",
        d: "M11 82 L58 82 L68 90 L114 90 L124 82 L169 82 L169 118 L11 118 Z",
        fill: "far",
      },
      { kind: "line", x1: 11, y1: 82, x2: 58, y2: 82, stroke: "paper", strokeWidth: 1.6, opacity: 0.66 },
      { kind: "line", x1: 124, y1: 82, x2: 169, y2: 82, stroke: "paper", strokeWidth: 1.6, opacity: 0.66 },

      // Plane 3: Hero Painted Canyon — rounded terraced clay & red-scoria domes opening into the valley
      // Left broad flat-topped butte & rounded clay domes
      {
        kind: "path",
        d: "M11 96 L44 96 Q54 96 60 110 Q72 110 80 126 Q86 138 92 152 L11 152 Z",
        fill: "mid",
      },
      // Right sculpted Painted Canyon clay domes & plateau bench
      {
        kind: "path",
        d: "M169 94 L136 94 Q124 94 118 110 Q106 112 98 128 Q94 140 90 152 L169 152 Z",
        fill: "mid",
      },
      // Warm baked-clay terracotta scoria cap bands curving smoothly around the rounded domes
      {
        kind: "path",
        d: "M11 106 L54 106 M124 104 L169 104",
        stroke: "accent",
        strokeWidth: 4,
        opacity: 0.84,
      },
      {
        kind: "path",
        d: "M11 117 Q42 116 68 119 M110 118 Q138 114 169 116",
        stroke: "paper",
        strokeWidth: 2.6,
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M11 128 Q46 126 78 131 M102 130 Q136 125 169 128",
        stroke: "accent-soft",
        strokeWidth: 3.2,
        opacity: 0.76,
      },
      {
        kind: "path",
        d: "M11 139 Q50 137 84 142 M98 140 Q134 136 169 139",
        stroke: "accent",
        strokeWidth: 2.8,
        opacity: 0.74,
      },
      // Rounded lower Painted Canyon clay shoulders flanking the river valley
      {
        kind: "path",
        d: "M11 132 Q32 126 48 140 Q62 146 74 162 L11 162 Z",
        fill: "ink",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M169 130 Q146 124 130 140 Q116 146 106 162 L169 162 Z",
        fill: "ink",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M14 144 Q36 140 56 148 M124 146 Q146 140 166 144",
        stroke: "accent-soft",
        strokeWidth: 2,
        opacity: 0.62,
      },

      // Plane 4: Calm S-meandering Little Missouri River & cottonwood bottomlands
      { kind: "rect", x: 11, y: 150, width: 158, height: 79, fill: "ink" },
      // Sunlit grassy bottomland flats inside the river bends
      {
        kind: "path",
        d: "M11 154 Q46 152 78 160 Q120 152 169 156 L169 204 L11 204 Z",
        fill: "mid",
        opacity: 0.72,
      },
      // Wide calm S-curving Little Missouri River channel reflecting the dawn sky
      {
        kind: "path",
        d: "M88 150 C84 158 58 162 60 174 C62 186 124 186 122 202 C120 216 74 218 68 229 L98 229 C104 218 144 214 142 198 C140 180 78 182 78 172 C78 162 94 158 96 150 Z",
        fill: "far",
      },
      // Warm sunrise reflection ribbon gliding down the center of the Little Missouri River
      {
        kind: "path",
        d: "M92 150 C86 159 68 163 69 173 C70 184 132 183 132 200 C132 214 90 218 83 229",
        stroke: "accent-soft",
        strokeWidth: 7.5,
        strokeLinecap: "round",
        opacity: 0.74,
      },
      {
        kind: "path",
        d: "M92 150 C86 159 68 163 69 173 C70 184 132 183 132 200 C132 214 90 218 83 229",
        stroke: "paper",
        strokeWidth: 2.6,
        strokeLinecap: "round",
        opacity: 0.9,
      },
      // Crisp horizontal calm-water shimmer bars inside the river bends
      {
        kind: "path",
        d: "M64 173 L78 173 M116 196 L138 196 M108 206 L132 206 M74 222 L96 222",
        stroke: "paper",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.78,
      },
      // Rounded plains cottonwood tree groves hugging the Little Missouri oxbows
      { kind: "ellipse", cx: 46, cy: 170, rx: 11, ry: 6.5, fill: "deep" },
      { kind: "ellipse", cx: 34, cy: 174, rx: 9, ry: 5.5, fill: "deep" },
      { kind: "ellipse", cx: 112, cy: 170, rx: 10, ry: 6, fill: "deep" },
      { kind: "ellipse", cx: 126, cy: 173, rx: 11, ry: 6.2, fill: "deep" },
      { kind: "ellipse", cx: 152, cy: 186, rx: 11, ry: 6.5, fill: "deep" },
      { kind: "ellipse", cx: 56, cy: 196, rx: 12, ry: 6.8, fill: "deep" },
      { kind: "ellipse", cx: 74, cy: 200, rx: 10, ry: 5.8, fill: "deep" },

      // Plane 5: Foreground sage-and-prairie Painted Canyon Overlook bluffs
      {
        kind: "path",
        d: "M11 194 Q38 196 58 214 L66 229 L11 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M169 196 Q142 200 124 216 L112 229 L169 229 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M11 194 Q38 196 58 214 M169 196 Q142 200 124 216",
        stroke: "accent-soft",
        strokeWidth: 1.7,
        opacity: 0.72,
      },
      // Crisp foreground prairie sage & grass tufts along the overlook edge
      {
        kind: "path",
        d: "M22 202 L19 188 M26 204 L27 189 M30 206 L34 193 M146 206 L143 193 M152 204 L154 190 M158 202 L162 190",
        stroke: "deep",
        strokeWidth: 1.6,
        strokeLinecap: "round",
      },
    ],
  },
]
