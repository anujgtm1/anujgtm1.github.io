import type { ParkArtworkSpec } from "../../types/parks.ts"

/**
 * Alpine & Forest collection of 11 bespoke WPA-screenprint National Park poster artworks:
 * YOSE, GRTE, GLAC, ROMO, NOCA, KICA, GRBA, SEQU, REDW, OLYM, GRSM.
 *
 * Artboard: viewBox="0 0 180 240" (3:4 portrait), clipped inner print area
 * x=[14..166], y=[14..226], horizontal center x=90. Edge-touching layers bleed
 * cleanly to x=[11..169], y=[11..229] for seamless continuous sweeps.
 */
export const ALPINE_FORESTS_PARK_ARTWORKS: readonly ParkArtworkSpec[] = [
  // =========================================================================
  // 1. YOSE — Yosemite National Park (CA)
  // =========================================================================
  {
    code: "YOSE",
    subject: "Half Dome sheer granite face in dawn alpenglow, Yosemite Falls & Merced River",
    accentLight: "#C77548",
    accentDark: "#EEA379",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Warm Sierra dawn sun, radiance halos & high alpine cirrus clouds
      { kind: "circle", cx: 44, cy: 44, r: 28, fill: "accent-soft", opacity: 0.32 },
      { kind: "circle", cx: 44, cy: 44, r: 17, fill: "accent-soft", opacity: 0.44 },
      { kind: "circle", cx: 44, cy: 44, r: 10.5, fill: "accent", opacity: 0.9 },
      { kind: "path", d: "M74 26 Q104 20 136 27 Q114 31 74 26 Z", fill: "paper", opacity: 0.64 },
      { kind: "path", d: "M122 38 Q144 34 166 39 Q148 42 122 38 Z", fill: "paper", opacity: 0.48 },

      // Plane 2: Far Tenaya Canyon & Clouds Rest granite ridge horizon
      {
        kind: "path",
        d: "M11 114 L46 92 L76 102 L106 96 L142 88 L169 102 L169 156 L11 156 Z",
        fill: "far",
      },

      // Plane 3: Hero Landmark — Unmistakable Half Dome (sheer vertical NW face + curved granite dome back)
      // Main monumental granite silhouette of Half Dome
      {
        kind: "path",
        d: "M78 150 L85 112 L88 46 C89 41 96 40 104 42 C122 47 136 62 146 86 L158 118 L169 152 L78 152 Z",
        fill: "ink",
      },
      // Iconic sheer vertical northwest granite face catching warm golden dawn alpenglow
      {
        kind: "path",
        d: "M88 46 C93 43 99 44 103 48 L99 124 L84 128 L86 88 Z",
        fill: "accent",
        opacity: 0.86,
      },
      // Luminous sunlit rim along the razor vertical crest & curved granite crown
      {
        kind: "path",
        d: "M88 46 C91 41 101 41 112 45 C124 50 134 62 142 78 L134 80 C125 63 114 52 101 49 L95 118 L86 118 Z",
        fill: "accent-soft",
        opacity: 0.66,
      },
      // Deep shadowed curved southeast dome back & shoulder facet
      {
        kind: "path",
        d: "M116 54 C130 62 141 78 150 104 L162 142 L114 146 L110 88 Z",
        fill: "deep",
        opacity: 0.56,
      },
      // Crisp glacier-sheared vertical exfoliation lines on Half Dome's sheer wall
      { kind: "line", x1: 91, y1: 52, x2: 88, y2: 118, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.72 },
      { kind: "line", x1: 98, y1: 56, x2: 96, y2: 122, stroke: "ink", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.52 },
      { kind: "path", d: "M104 52 C118 58 128 70 136 88", stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.44 },

      // Flanking Yosemite Valley granite cliffs — El Capitan / Bridalveil cliff on left & Glacier Point wall on right
      {
        kind: "path",
        d: "M11 66 L36 68 L54 84 L62 88 L70 148 L11 156 Z",
        fill: "mid",
      },
      // Sunlit sheer El Capitan prow facet
      {
        kind: "path",
        d: "M36 68 L54 84 L58 148 L36 148 Z",
        fill: "accent-soft",
        opacity: 0.48,
      },
      // Shadowed west cliff alcove beside the waterfall
      {
        kind: "path",
        d: "M11 76 L34 82 L38 148 L11 154 Z",
        fill: "ink",
        opacity: 0.82,
      },
      // Right foreground valley wall shoulder
      {
        kind: "path",
        d: "M169 102 L144 108 L132 132 L124 156 L169 156 Z",
        fill: "mid",
      },

      // Plunging silver ribbon of Bridalveil / Yosemite Falls & glowing mist plume
      {
        kind: "line",
        x1: 51,
        y1: 86,
        x2: 52,
        y2: 142,
        stroke: "paper",
        strokeWidth: 3.4,
        strokeLinecap: "round",
        opacity: 0.96,
      },
      {
        kind: "line",
        x1: 51,
        y1: 86,
        x2: 51.5,
        y2: 138,
        stroke: "accent-soft",
        strokeWidth: 1.4,
        strokeLinecap: "round",
        opacity: 0.55,
      },
      { kind: "ellipse", cx: 52, cy: 143, rx: 10, ry: 4.5, fill: "paper", opacity: 0.62 },
      { kind: "ellipse", cx: 52, cy: 145, rx: 16, ry: 5.5, fill: "accent-soft", opacity: 0.28 },

      // Plane 4: Yosemite Valley meadow floor & winding calm Merced River
      { kind: "path", d: "M11 148 Q64 144 114 148 Q144 150 169 146 L169 229 L11 229 Z", fill: "ink" },
      // Sunlit Cook's Meadow grass apron along the riverbank
      { kind: "path", d: "M11 154 Q52 150 86 156 Q132 152 169 156 L169 182 L11 182 Z", fill: "mid", opacity: 0.72 },
      // Winding Merced River channel widening gracefully toward the foreground
      {
        kind: "path",
        d: "M82 150 C76 162 66 168 74 180 C84 194 116 198 112 214 C110 220 104 225 100 229 L52 229 C60 218 76 212 72 198 C66 184 52 178 58 166 C63 158 72 154 76 150 Z",
        fill: "far",
      },
      // Warm dawn alpenglow reflection from Half Dome shimmering on the Merced River
      {
        kind: "path",
        d: "M78 156 C72 166 64 172 72 183 C80 194 102 200 94 214 C88 221 76 225 70 229",
        stroke: "accent-soft",
        strokeWidth: 7,
        strokeLinecap: "round",
        opacity: 0.56,
      },
      { kind: "line", x1: 64, y1: 170, x2: 86, y2: 170, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.78 },
      { kind: "line", x1: 72, y1: 192, x2: 102, y2: 192, stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.82 },
      { kind: "line", x1: 68, y1: 212, x2: 104, y2: 212, stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.86 },

      // Plane 5: Foreground Sierra ponderosa pine & incense-cedar silhouettes framing the valley
      { kind: "path", d: "M11 178 Q38 188 54 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 176 Q138 188 116 229 L169 229 Z", fill: "deep" },
      { kind: "polygon", points: "22,126 11,172 17,172 11,206 34,206 27,172 33,172", fill: "deep" },
      { kind: "polygon", points: "40,148 30,186 35,186 28,218 52,218 45,186 50,186", fill: "deep" },
      { kind: "polygon", points: "156,124 144,170 150,170 142,208 169,208 162,170 168,170", fill: "deep" },
      { kind: "polygon", points: "136,146 125,184 131,184 123,218 148,218 141,184 146,184", fill: "deep" },
      { kind: "polygon", points: "118,166 110,196 126,196", fill: "deep", opacity: 0.92 },
    ],
  },

  // =========================================================================
  // 2. GRTE — Grand Teton National Park (WY)
  // =========================================================================
  {
    code: "GRTE",
    subject: "Cathedral Group jagged granite spires in alpenglow mirrored in Schwabacher Landing",
    accentLight: "#C97542",
    accentDark: "#F0A674",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Crisp Wyoming alpenglow dawn sky & high mountain clouds
      { kind: "circle", cx: 146, cy: 40, r: 24, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 146, cy: 40, r: 12, fill: "accent", opacity: 0.82 },
      { kind: "path", d: "M18 28 Q48 22 82 28 Q56 32 18 28 Z", fill: "paper", opacity: 0.58 },
      { kind: "path", d: "M108 30 Q134 25 162 31 Q138 34 108 30 Z", fill: "accent-soft", opacity: 0.48 },

      // Plane 2: Distant northern & southern Teton flank peaks rising straight with zero foothills
      {
        kind: "path",
        d: "M11 116 L24 88 L38 100 L54 70 L70 96 L84 40 L98 76 L114 54 L126 82 L138 66 L154 98 L169 112 L169 140 L11 140 Z",
        fill: "ink",
      },

      // Plane 3: Hero Cathedral Group — sculpted alpenglow eastern faces & deep shadowed western walls
      // Grand Teton sunlit eastern dawn face (central monumental spire at 84, 40)
      {
        kind: "path",
        d: "M84 40 L94 64 L100 84 L106 118 L86 124 L82 90 L86 68 Z",
        fill: "accent",
        opacity: 0.72,
      },
      // Mount Owen sunlit eastern dawn face (sharp spire at 114, 54)
      {
        kind: "path",
        d: "M114 54 L124 78 L130 116 L112 122 L110 86 Z",
        fill: "accent",
        opacity: 0.66,
      },
      // Teewinot Mountain sunlit eastern face (serrated pinnacle at 138, 66)
      {
        kind: "path",
        d: "M138 66 L152 94 L164 128 L136 130 L134 94 Z",
        fill: "accent-soft",
        opacity: 0.58,
      },
      // Middle Teton sunlit face (54, 70)
      {
        kind: "path",
        d: "M54 70 L66 94 L72 126 L54 128 L52 96 Z",
        fill: "accent-soft",
        opacity: 0.52,
      },
      // Shadowed western granite buttresses giving razor-sharp three-dimensional relief
      { kind: "polygon", points: "84,40 74,56 68,88 76,124 86,124 82,88", fill: "deep", opacity: 0.72 },
      { kind: "polygon", points: "114,54 103,78 100,122 112,122 110,84", fill: "deep", opacity: 0.66 },
      { kind: "polygon", points: "54,70 40,98 34,132 54,132 52,96", fill: "deep", opacity: 0.58 },

      // Crisp white alpine snow couloirs & Teton Glacier tucked between the jagged granite horns
      {
        kind: "path",
        d: "M84 40 L79 54 L83 56 L77 74 L84 72 L89 88 L95 72 L91 58 Z",
        fill: "paper",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M98 76 L91 96 L97 116 L108 110 L104 92 L110 74 Z",
        fill: "paper",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M64 90 L57 108 L68 118 L73 102 Z",
        fill: "paper",
        opacity: 0.84,
      },
      {
        kind: "path",
        d: "M126 82 L120 102 L131 114 L136 96 Z",
        fill: "paper",
        opacity: 0.82,
      },
      {
        kind: "path",
        d: "M114 54 L110 66 L115 70 L118 62 Z",
        fill: "paper",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M138 66 L134 79 L140 84 L144 76 Z",
        fill: "paper",
        opacity: 0.84,
      },

      // Flat Jackson Hole cottonwood & lodgepole pine bench along the water's edge (zero foothills!)
      {
        kind: "path",
        d: "M11 134 L20 128 L28 134 L38 129 L50 135 L64 130 L76 135 L92 131 L108 135 L122 129 L136 134 L148 128 L158 133 L169 128 L169 144 L11 144 Z",
        fill: "deep",
      },

      // Plane 4: Still glassy Schwabacher Landing / Snake River water & mirror Cathedral Group reflection
      { kind: "rect", x: 11, y: 143, width: 158, height: 86, fill: "mid" },
      { kind: "rect", x: 11, y: 143, width: 158, height: 32, fill: "far", opacity: 0.45 },
      // Inverted Cathedral Group granite silhouette mirrored cleanly in the calm channel
      {
        kind: "path",
        d: "M11 144 L169 144 L154 166 L138 192 L126 178 L114 202 L98 184 L84 214 L70 176 L54 192 L38 168 L24 176 L11 160 Z",
        fill: "ink",
        opacity: 0.62,
      },
      // Inverted warm alpenglow reflection on Grand Teton, Owen & Teewinot
      {
        kind: "path",
        d: "M84 146 L104 146 L100 178 L84 214 Z M110 146 L128 146 L122 182 L114 202 Z M134 146 L152 146 L144 176 L138 192 Z",
        fill: "accent-soft",
        opacity: 0.46,
      },
      // Inverted snow couloir gleams mirrored in water
      {
        kind: "path",
        d: "M79 182 L84 212 L90 184 Z M94 160 L106 160 L102 180 Z M120 164 L132 164 L126 182 Z",
        fill: "paper",
        opacity: 0.56,
      },
      // Crisp horizontal glassy water ripples slicing gently across the reflection
      { kind: "line", x1: 24, y1: 154, x2: 156, y2: 154, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.55 },
      { kind: "line", x1: 36, y1: 168, x2: 144, y2: 168, stroke: "mid", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.68 },
      { kind: "line", x1: 44, y1: 182, x2: 136, y2: 182, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.6 },
      { kind: "line", x1: 58, y1: 196, x2: 122, y2: 196, stroke: "mid", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.64 },
      { kind: "line", x1: 68, y1: 209, x2: 108, y2: 209, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.56 },

      // Plane 5: Low Schwabacher Landing willow banks & autumn-tipped riverbank sedges
      { kind: "path", d: "M11 196 Q36 198 54 214 Q62 222 68 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 194 Q144 198 128 214 Q120 222 114 229 L169 229 Z", fill: "deep" },
      { kind: "path", d: "M16 198 Q32 186 44 202 Q52 196 58 212 L16 214 Z", fill: "ink", opacity: 0.85 },
      { kind: "path", d: "M164 196 Q148 184 136 200 Q128 196 122 212 L164 214 Z", fill: "ink", opacity: 0.85 },
      {
        kind: "path",
        d: "M22 214 L18 194 M30 216 L31 195 M42 220 L46 202 M138 220 L134 202 M149 216 L148 195 M158 214 L162 194",
        stroke: "accent",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.78,
      },
      { kind: "ellipse", cx: 38, cy: 222, rx: 10, ry: 4, fill: "ink", opacity: 0.7 },
      { kind: "ellipse", cx: 146, cy: 222, rx: 9, ry: 3.8, fill: "ink", opacity: 0.7 },
    ],
  },

  // =========================================================================
  // 3. GLAC — Glacier National Park (MT)
  // =========================================================================
  {
    code: "GLAC",
    subject: "Wild Goose Island in Saint Mary Lake beneath Going-to-the-Sun & Fusillade glacial horns",
    accentLight: "#4B869C",
    accentDark: "#8CC4D9",
    skyMood: "noon",
    nodes: [
      // Plane 1: Crisp Montana noon sky, alpine sun & fair-weather cumulus clouds
      { kind: "circle", cx: 132, cy: 32, r: 19, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 132, cy: 32, r: 9.5, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M22 36 Q34 26 48 31 Q60 22 74 32 Q84 31 90 38 Z", fill: "paper", opacity: 0.78 },
      { kind: "path", d: "M112 46 Q128 40 144 45 Q156 42 166 47 Z", fill: "paper", opacity: 0.56 },

      // Plane 2: Distant Fusillade & Citadel glacial horn centered inside the U-shaped valley trough
      {
        kind: "path",
        d: "M54 114 L74 72 L86 80 L94 46 L104 72 L114 66 L130 116 L54 116 Z",
        fill: "far",
      },
      // Sunlit hanging cirque snowfield on Fusillade horn
      {
        kind: "path",
        d: "M94 46 L86 68 L93 64 L98 76 L104 68 L100 54 Z",
        fill: "paper",
        opacity: 0.92,
      },
      { kind: "path", d: "M74 72 L68 88 L76 84 L81 94 L86 82 Z", fill: "paper", opacity: 0.76 },

      // Plane 3: Glacially carved U-shaped valley walls — Little Chief (left) & Going-to-the-Sun Mtn (right)
      {
        kind: "path",
        d: "M11 60 L26 52 L42 64 L54 58 L72 96 L88 134 L11 136 Z",
        fill: "ink",
      },
      // Hanging glacier bowl & sunlit snow apron on left massif
      {
        kind: "path",
        d: "M26 52 L42 64 L54 58 L64 84 L48 80 L38 92 L24 78 L16 84 Z",
        fill: "paper",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M42 64 L54 58 L66 88 L52 94 L40 80 Z",
        fill: "accent-soft",
        opacity: 0.44,
      },
      // Right soaring pyramidal Going-to-the-Sun / Goat Mountain horn
      {
        kind: "path",
        d: "M169 56 L154 64 L138 48 L124 74 L112 96 L98 134 L169 136 Z",
        fill: "ink",
      },
      // Sunlit western snow cirque & glacial ice tongue on right horn
      {
        kind: "path",
        d: "M138 48 L124 74 L134 78 L122 96 L142 88 L152 98 L158 76 L146 66 Z",
        fill: "paper",
        opacity: 0.9,
      },
      // Shadowed eastern arête on right peak + subtle Belt limestone cliff strata lines
      { kind: "polygon", points: "138,48 154,64 169,56 169,122 146,118 142,84", fill: "deep", opacity: 0.46 },
      { kind: "line", x1: 14, y1: 100, x2: 64, y2: 100, stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.48 },
      { kind: "line", x1: 112, y1: 104, x2: 166, y2: 104, stroke: "paper", strokeWidth: 1.1, opacity: 0.44 },

      // Far wooded Saint Mary shoreline band
      {
        kind: "path",
        d: "M11 128 Q42 122 76 132 L106 132 Q138 122 169 128 L169 138 L11 138 Z",
        fill: "deep",
      },

      // Plane 4: Deep luminous glacial Saint Mary Lake & horn reflections
      { kind: "rect", x: 11, y: 136, width: 158, height: 93, fill: "accent" },
      { kind: "rect", x: 11, y: 136, width: 158, height: 34, fill: "mid", opacity: 0.62 },
      { kind: "rect", x: 11, y: 194, width: 158, height: 35, fill: "ink", opacity: 0.36 },
      // Shimmering inverted reflection of Fusillade & flanking U-valley walls
      {
        kind: "path",
        d: "M14 138 L88 138 L66 176 L34 190 L14 176 Z M102 138 L166 138 L166 184 L138 194 L116 172 Z",
        fill: "ink",
        opacity: 0.46,
      },
      { kind: "polygon", points: "78,138 110,138 94,174", fill: "paper", opacity: 0.34 },
      // Crisp glacial lake ripples & light sheen
      { kind: "line", x1: 24, y1: 148, x2: 156, y2: 148, stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.56 },
      { kind: "line", x1: 104, y1: 164, x2: 158, y2: 164, stroke: "accent-soft", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.64 },
      { kind: "line", x1: 18, y1: 196, x2: 146, y2: 196, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.48 },
      { kind: "line", x1: 42, y1: 214, x2: 136, y2: 214, stroke: "accent-soft", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.52 },

      // Hero Focal Point: Iconic Wild Goose Island — tiny pine-topped rocky islet anchored in Saint Mary Lake
      // Subtle inverted island reflection right beneath the waterline
      {
        kind: "path",
        d: "M58 179 L100 179 L90 192 L82 199 L74 193 L64 188 Z",
        fill: "deep",
        opacity: 0.34,
      },
      // Craggy rocky islet base of Wild Goose Island
      {
        kind: "path",
        d: "M55 178 C60 172 68 170 79 170 C90 170 98 173 103 178 Z",
        fill: "ink",
      },
      { kind: "path", d: "M59 175 Q79 171 99 175", stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.64 },
      // Tiny iconic cluster of subalpine spruce spires perched atop Wild Goose Island
      { kind: "polygon", points: "71,154 65,172 77,172", fill: "deep" },
      { kind: "polygon", points: "81,148 74,172 88,172", fill: "deep" },
      { kind: "polygon", points: "90,157 84,173 96,173", fill: "deep" },
      { kind: "polygon", points: "63,163 58,175 68,175", fill: "deep" },
      // Crisp bright waterline lapping around the island shore
      { kind: "line", x1: 50, y1: 179, x2: 108, y2: 179, stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.86 },

      // Plane 5: Foreground rocky lakeshore corners & framing conifers
      { kind: "path", d: "M11 200 Q34 206 48 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 198 Q144 206 130 229 L169 229 Z", fill: "deep" },
      { kind: "polygon", points: "22,166 11,208 33,208", fill: "deep" },
      { kind: "polygon", points: "158,162 146,208 169,208", fill: "deep" },
    ],
  },

  // =========================================================================
  // 4. ROMO — Rocky Mountain National Park (CO)
  // =========================================================================
  {
    code: "ROMO",
    subject: "Longs Peak flat-topped Diamond east face & alpine tundra over Dream Lake",
    accentLight: "#C77A44",
    accentDark: "#EEA976",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Colorado Front Range dawn sky, sunrise glow & summit banner cloud
      { kind: "circle", cx: 142, cy: 36, r: 22, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 142, cy: 36, r: 11, fill: "accent", opacity: 0.86 },
      { kind: "path", d: "M96 42 Q122 36 154 41 Q136 45 104 45 Z", fill: "paper", opacity: 0.68 },
      { kind: "path", d: "M18 32 Q42 27 66 32 Q46 35 18 32 Z", fill: "paper", opacity: 0.52 },

      // Plane 2: Flanking Continental Divide shoulders — Mount Meeker (left) & Lady Washington (right)
      {
        kind: "path",
        d: "M11 94 L32 72 L48 78 L66 96 L116 94 L140 76 L156 84 L169 96 L169 138 L11 138 Z",
        fill: "far",
      },

      // Plane 3: Hero Landmark — Unmistakable Square Flat-Topped Longs Peak & Sheer "Diamond" East Face
      // Massive blocky granite summit silhouette with flat plateau top (74,44 -> 106,44)
      {
        kind: "path",
        d: "M24 136 L48 106 L64 88 L70 50 L74 44 L106 44 L110 50 L118 84 L138 106 L162 136 Z",
        fill: "ink",
      },
      // Sunlit eastern shoulder bevels (Chasm View & Broadway ledge)
      {
        kind: "path",
        d: "M106 44 L110 50 L118 84 L138 106 L156 134 L112 134 L108 90 Z",
        fill: "mid",
      },
      // The iconic sheer vertical "Diamond" granite wall glowing in golden dawn light
      {
        kind: "polygon",
        points: "76,48 104,48 109,88 92,102 74,86",
        fill: "accent",
        opacity: 0.88,
      },
      // Luminous dawn catch-light along the upper sheer Diamond wall & flat summit rim
      {
        kind: "polygon",
        points: "76,48 104,48 106,66 91,74 75,64",
        fill: "accent-soft",
        opacity: 0.68,
      },
      { kind: "line", x1: 74, y1: 44.5, x2: 106, y2: 44.5, stroke: "paper", strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.9 },
      // Deep shadowed western dihedral & Pagoda shoulder facet
      {
        kind: "path",
        d: "M70 50 L76 48 L74 86 L62 126 L36 134 L64 88 Z",
        fill: "deep",
        opacity: 0.62,
      },
      // Crisp vertical granite fracture lines across the Diamond east face
      { kind: "line", x1: 86, y1: 50, x2: 85, y2: 94, stroke: "ink", strokeWidth: 1.1, opacity: 0.56 },
      { kind: "line", x1: 97, y1: 50, x2: 98, y2: 96, stroke: "paper", strokeWidth: 1.1, opacity: 0.58 },
      // Mills Glacier / Chasm Cirque snowfield banking diagonally beneath the Diamond
      {
        kind: "path",
        d: "M64 106 L92 102 L114 96 L124 126 L98 120 L78 130 L58 122 Z",
        fill: "paper",
        opacity: 0.9,
      },
      { kind: "path", d: "M30 82 L44 92 L36 98 L22 92 Z", fill: "paper", opacity: 0.72 },

      // Plane 4: Sweeping alpine tundra bench & glassy subalpine Dream Lake
      {
        kind: "path",
        d: "M11 128 Q48 120 90 128 Q132 120 169 128 L169 156 L11 156 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M11 136 Q52 130 90 138 Q128 130 169 136 L169 154 L11 154 Z",
        fill: "ink",
        opacity: 0.78,
      },
      // Glassy subalpine Dream Lake basin
      { kind: "rect", x: 11, y: 152, width: 158, height: 77, fill: "mid" },
      { kind: "rect", x: 11, y: 152, width: 158, height: 24, fill: "far", opacity: 0.44 },
      // Inverted reflection of Longs Peak's square crown & glowing Diamond face
      {
        kind: "path",
        d: "M54 154 L126 154 L110 198 L104 206 L76 206 L70 198 Z",
        fill: "ink",
        opacity: 0.54,
      },
      {
        kind: "polygon",
        points: "76,170 104,170 102,202 78,202",
        fill: "accent-soft",
        opacity: 0.52,
      },
      { kind: "path", d: "M68 158 L112 158 L104 170 L76 170 Z", fill: "paper", opacity: 0.56 },
      // Tranquil horizontal lake ripples
      { kind: "line", x1: 38, y1: 164, x2: 142, y2: 164, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.6 },
      { kind: "line", x1: 50, y1: 178, x2: 130, y2: 178, stroke: "mid", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.68 },
      { kind: "line", x1: 58, y1: 192, x2: 122, y2: 192, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.62 },
      { kind: "line", x1: 68, y1: 206, x2: 112, y2: 206, stroke: "mid", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.64 },

      // Plane 5: Engelmann spruce spires & glaciated granite shoreline boulders framing Dream Lake
      { kind: "polygon", points: "22,110 13,152 18,152 11,192 33,192 26,152 31,152", fill: "deep" },
      { kind: "polygon", points: "38,128 30,164 35,164 28,202 48,202 42,164 46,164", fill: "deep" },
      { kind: "polygon", points: "52,144 45,176 59,176", fill: "deep" },
      { kind: "polygon", points: "158,112 149,154 154,154 147,194 169,194 162,154 167,154", fill: "deep" },
      { kind: "polygon", points: "142,130 134,166 138,166 132,202 152,202 146,166 150,166", fill: "deep" },
      { kind: "polygon", points: "128,146 121,176 135,176", fill: "deep" },
      // Foreground granite boulder shore
      { kind: "path", d: "M11 200 Q36 206 58 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 202 Q144 206 122 229 L169 229 Z", fill: "deep" },
      { kind: "ellipse", cx: 52, cy: 222, rx: 14, ry: 7.5, fill: "ink" },
      { kind: "path", d: "M42 218 Q52 214 62 218", stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.58 },
      { kind: "ellipse", cx: 132, cy: 223, rx: 12, ry: 6.5, fill: "ink" },
    ],
  },

  // =========================================================================
  // 5. NOCA — North Cascades National Park (WA)
  // =========================================================================
  {
    code: "NOCA",
    subject: "Jade-turquoise Diablo Lake winding beneath glacier-draped Colonial & Pyramid Peaks",
    accentLight: "#298C86",
    accentDark: "#69CFC9",
    skyMood: "noon",
    nodes: [
      // Plane 1: Crisp American Alps noon sky & sunlit clouds
      { kind: "circle", cx: 40, cy: 32, r: 18, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 40, cy: 32, r: 9.5, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M64 26 Q84 20 106 26 Q88 30 64 26 Z", fill: "paper", opacity: 0.7 },
      { kind: "path", d: "M128 32 Q148 27 166 33 Q148 36 128 32 Z", fill: "paper", opacity: 0.56 },

      // Plane 2: Distant jagged Cascade needle crest behind the central glacial saddle
      {
        kind: "path",
        d: "M11 104 L28 78 L46 92 L76 62 L90 78 L102 66 L124 88 L150 74 L169 94 L169 138 L11 138 Z",
        fill: "far",
      },

      // Plane 3: Hero Glacier-Draped Sawtooth Massif — Pyramid Peak (left) & Colonial Peak (right)
      {
        kind: "path",
        d: "M11 86 L34 62 L52 46 L68 74 L84 86 L102 64 L118 44 L134 68 L148 62 L169 92 L169 144 L11 144 Z",
        fill: "ink",
      },
      // Sculpted deep shadowed eastern alpine facets
      { kind: "polygon", points: "52,46 68,74 78,128 52,128 48,84", fill: "deep", opacity: 0.58 },
      { kind: "polygon", points: "118,44 134,68 148,128 118,128 114,84", fill: "deep", opacity: 0.56 },
      // Steep cascading white glacial ice tongues (Colonial Glacier & Pyramid snowfields)
      {
        kind: "path",
        d: "M52 46 L40 70 L48 76 L34 104 L52 98 L62 114 L64 86 L56 72 Z",
        fill: "paper",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M118 44 L104 68 L112 76 L96 106 L112 102 L120 120 L132 104 L124 84 L132 68 Z",
        fill: "paper",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M148 62 L138 82 L148 86 L156 104 L166 94 L158 76 Z",
        fill: "paper",
        opacity: 0.84,
      },
      // Glacial ice crevasse shading inside the hanging glaciers
      { kind: "path", d: "M44 82 Q52 86 58 96 M106 84 Q116 88 124 100", stroke: "accent-soft", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.72 },

      // Steep forested Cascade lower mountain flanks dropping into the fjord-like lake
      {
        kind: "path",
        d: "M11 106 Q36 112 62 128 L76 142 L11 142 Z",
        fill: "deep",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M169 104 Q142 114 114 132 L100 144 L169 144 Z",
        fill: "deep",
        opacity: 0.88,
      },

      // Plane 4: Hero Landmark — Unmistakable Luminous Glacial-Flour Jade-Turquoise Diablo Lake
      { kind: "rect", x: 11, y: 134, width: 158, height: 95, fill: "accent" },
      // Luminous turquoise glacial-flour center water glow
      {
        kind: "path",
        d: "M64 136 L112 136 C128 156 112 174 88 190 C68 202 82 216 118 229 L42 229 C54 210 46 196 66 180 C86 164 60 152 64 136 Z",
        fill: "accent-soft",
        opacity: 0.62,
      },
      // Crisp jade-white surface currents & shoreline highlights tracing the winding lake channel
      {
        kind: "path",
        d: "M84 140 C98 152 104 164 82 178 C62 190 66 206 94 224",
        stroke: "paper",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.74,
      },
      { kind: "line", x1: 68, y1: 148, x2: 114, y2: 148, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.62 },
      { kind: "line", x1: 38, y1: 176, x2: 102, y2: 176, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.64 },
      { kind: "line", x1: 64, y1: 204, x2: 138, y2: 204, stroke: "paper", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.68 },

      // Interlocking dark evergreen-forested peninsulas & Buster Brown islet framing the winding jade channel
      // Upper-left forested headland peninsula
      {
        kind: "path",
        d: "M11 138 L66 144 C76 148 76 158 62 162 L11 168 Z",
        fill: "ink",
      },
      { kind: "path", d: "M16 146 L24 134 L31 146 L39 136 L47 148 L56 140 L64 150 L16 154 Z", fill: "deep" },
      // Mid-right interlocking forested peninsula
      {
        kind: "path",
        d: "M169 152 L112 162 C98 166 96 178 112 184 L169 190 Z",
        fill: "ink",
      },
      { kind: "path", d: "M108 168 L116 154 L124 166 L133 150 L142 166 L152 148 L164 166 L108 176 Z", fill: "deep" },
      // Tiny iconic wooded islet anchored mid-channel
      { kind: "ellipse", cx: 52, cy: 192, rx: 14, ry: 4.5, fill: "ink" },
      { kind: "polygon", points: "47,178 42,191 52,191", fill: "deep" },
      { kind: "polygon", points: "55,180 50,192 60,192", fill: "deep" },
      { kind: "line", x1: 36, y1: 196, x2: 68, y2: 196, stroke: "paper", strokeWidth: 1.1, strokeLinecap: "round", opacity: 0.72 },

      // Plane 5: Foreground overlook Douglas fir & hemlock silhouettes framing the bottom corners
      { kind: "path", d: "M11 200 Q44 210 68 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 204 Q142 212 122 229 L169 229 Z", fill: "deep" },
      { kind: "polygon", points: "22,162 11,206 33,206", fill: "deep" },
      { kind: "polygon", points: "38,182 28,218 48,218", fill: "deep" },
      { kind: "polygon", points: "156,166 144,210 169,210", fill: "deep" },
      { kind: "polygon", points: "138,186 128,220 148,220", fill: "deep" },
    ],
  },

  // =========================================================================
  // 6. KICA — Kings Canyon National Park (CA)
  // =========================================================================
  {
    code: "KICA",
    subject: "Glaciated North Dome & Grand Sentinel granite monoliths framing Zumwalt Meadow",
    accentLight: "#548296",
    accentDark: "#96C2D6",
    skyMood: "noon",
    nodes: [
      // Plane 1: Crisp High Sierra noon sky, radiant sun & high alpine wisps
      { kind: "circle", cx: 90, cy: 34, r: 20, fill: "accent-soft", opacity: 0.34 },
      { kind: "circle", cx: 90, cy: 34, r: 10, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M22 26 Q42 21 62 26 Q46 29 22 26 Z", fill: "paper", opacity: 0.64 },
      { kind: "path", d: "M118 28 Q138 23 160 28 Q142 31 118 28 Z", fill: "paper", opacity: 0.6 },

      // Plane 2: Distant High Sierra granite crest visible down the deep U-shaped valley opening
      {
        kind: "path",
        d: "M48 134 L66 84 L80 94 L92 70 L106 90 L118 78 L134 134 Z",
        fill: "far",
      },
      { kind: "path", d: "M92 70 L84 88 L91 84 L96 92 L102 84 Z", fill: "paper", opacity: 0.88 },
      { kind: "path", d: "M66 84 L60 98 L68 95 L73 102 Z", fill: "paper", opacity: 0.74 },

      // Plane 3: Hero Monumental Glaciated Granite Monolith Walls — North Dome (left) & Grand Sentinel (right)
      // Left soaring pale granite monolith: North Dome
      {
        kind: "path",
        d: "M11 46 C26 42 42 46 52 56 L62 84 L70 124 L78 154 L11 156 Z",
        fill: "mid",
      },
      // Sunlit glacially polished granite crown & sheer inner face of North Dome
      {
        kind: "path",
        d: "M34 45 C42 46 48 50 52 56 L62 84 L70 124 L78 154 L52 154 L46 98 Z",
        fill: "paper",
        opacity: 0.44,
      },
      // Shadowed sheer granite joint planes on left wall
      {
        kind: "path",
        d: "M11 66 L36 74 L48 122 L54 154 L11 156 Z",
        fill: "ink",
        opacity: 0.78,
      },
      { kind: "line", x1: 48, y1: 56, x2: 64, y2: 138, stroke: "ink", strokeWidth: 1.2, opacity: 0.56 },
      { kind: "line", x1: 38, y1: 60, x2: 50, y2: 134, stroke: "paper", strokeWidth: 1.1, opacity: 0.52 },

      // Right soaring sheer granite monolith: Grand Sentinel
      {
        kind: "path",
        d: "M169 44 L142 46 L128 58 L118 88 L110 124 L102 154 L169 156 Z",
        fill: "ink",
      },
      // Sunlit west-facing granite prow of Grand Sentinel catching bright High Sierra light
      {
        kind: "path",
        d: "M142 46 L128 58 L118 88 L110 124 L102 154 L124 154 L132 102 L144 62 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M142 46 L128 58 L120 84 L132 82 L144 58 Z",
        fill: "paper",
        opacity: 0.52,
      },
      { kind: "line", x1: 130, y1: 62, x2: 114, y2: 140, stroke: "paper", strokeWidth: 1.2, opacity: 0.62 },
      { kind: "line", x1: 146, y1: 66, x2: 136, y2: 142, stroke: "deep", strokeWidth: 1.3, opacity: 0.52 },

      // Talus & pine-clad glacial valley base aprons beneath the towering walls
      { kind: "path", d: "M11 134 L56 142 L78 154 L11 158 Z", fill: "deep", opacity: 0.78 },
      { kind: "path", d: "M169 132 L124 142 L102 154 L169 158 Z", fill: "deep", opacity: 0.78 },

      // Plane 4: Sunlit Zumwalt Meadow & Rushing South Fork Kings River cutting down valley center
      { kind: "path", d: "M11 150 Q56 146 90 150 Q124 146 169 150 L169 229 L11 229 Z", fill: "mid" },
      // Sunlit emerald-gold meadow grass terraces sweeping cleanly across the valley floor
      { kind: "path", d: "M11 156 Q44 152 76 160 L72 198 L11 196 Z", fill: "far", opacity: 0.72 },
      { kind: "path", d: "M169 156 Q136 152 104 160 L108 198 L169 196 Z", fill: "far", opacity: 0.72 },
      { kind: "line", x1: 16, y1: 170, x2: 64, y2: 170, stroke: "paper", strokeWidth: 1.1, opacity: 0.52 },
      { kind: "line", x1: 116, y1: 172, x2: 164, y2: 172, stroke: "paper", strokeWidth: 1.1, opacity: 0.52 },

      // Rushing South Fork Kings River sweeping dynamically from the canyon throat to bottom foreground
      {
        kind: "path",
        d: "M84 150 L96 150 C102 166 112 178 110 194 C108 208 118 218 124 229 L62 229 C68 214 78 204 74 188 C70 174 80 162 84 150 Z",
        fill: "accent",
      },
      // Sparkling whitewater riffles & rushing current ribbons
      {
        kind: "path",
        d: "M90 152 C88 164 98 174 90 188 C82 200 100 212 92 229",
        stroke: "paper",
        strokeWidth: 3.2,
        strokeLinecap: "round",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M78 176 Q90 172 104 176 M74 196 Q90 191 106 196 M68 216 Q90 211 114 216",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.76,
      },

      // Plane 5: Foreground Jeffrey pines & granite talus boulders framing Zumwalt Meadow
      { kind: "path", d: "M11 188 Q38 196 58 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 190 Q142 198 122 229 L169 229 Z", fill: "deep" },
      { kind: "polygon", points: "22,138 11,182 17,182 11,214 33,214 26,182 32,182", fill: "deep" },
      { kind: "polygon", points: "40,160 31,196 49,196", fill: "deep" },
      { kind: "polygon", points: "158,140 147,184 153,184 146,214 169,214 162,184 168,184", fill: "deep" },
      { kind: "polygon", points: "140,162 131,196 149,196", fill: "deep" },
      // Rounded Sierra granite boulders tucked along the meadow riverbanks
      { kind: "ellipse", cx: 68, cy: 204, rx: 7, ry: 4, fill: "ink" },
      { kind: "ellipse", cx: 112, cy: 210, rx: 8.5, ry: 4.5, fill: "ink" },
      { kind: "path", d: "M106 207 Q112 204 118 207", stroke: "paper", strokeWidth: 1, opacity: 0.55 },
    ],
  },

  // =========================================================================
  // 7. GRBA — Great Basin National Park (NV)
  // =========================================================================
  {
    code: "GRBA",
    subject: "Ancient 5,000-year-old gnarled Bristlecone Pine beneath Wheeler Peak & Milky Way",
    accentLight: "#8FA862",
    accentDark: "#C8E096",
    skyMood: "night",
    nodes: [
      // Plane 1: Certified Dark-Sky Milky Way diagonal star band, crescent moon & desert stars
      {
        kind: "path",
        d: "M11 94 C44 68 88 44 134 11 L169 11 L169 34 C122 68 78 96 34 124 L11 124 Z",
        fill: "accent-soft",
        opacity: 0.14,
      },
      {
        kind: "path",
        d: "M16 106 C54 78 96 52 148 11 L166 11 L166 20 C114 58 72 86 28 118 Z",
        fill: "paper",
        opacity: 0.18,
      },
      {
        kind: "path",
        d: "M34 100 C68 76 104 52 154 14",
        stroke: "accent-soft",
        strokeWidth: 7,
        strokeLinecap: "round",
        opacity: 0.16,
      },
      // Crisp luminous crescent moon upper-left
      { kind: "path", d: "M34 26 A8 8 0 1 0 44 37 A6.4 6.4 0 1 1 34 26 Z", fill: "paper", opacity: 0.96 },
      // Pinpoint Great Basin dark-sky starfield
      { kind: "circle", cx: 24, cy: 52, r: 1.2, fill: "paper", opacity: 0.85 },
      { kind: "circle", cx: 56, cy: 24, r: 1.4, fill: "paper", opacity: 0.92 },
      { kind: "circle", cx: 74, cy: 42, r: 1.1, fill: "accent-soft", opacity: 0.86 },
      { kind: "circle", cx: 94, cy: 26, r: 1.6, fill: "paper", opacity: 0.96 },
      { kind: "circle", cx: 112, cy: 44, r: 1.3, fill: "paper", opacity: 0.9 },
      { kind: "circle", cx: 132, cy: 26, r: 1.5, fill: "paper", opacity: 0.95 },
      { kind: "circle", cx: 150, cy: 22, r: 1.1, fill: "accent-soft", opacity: 0.88 },
      { kind: "circle", cx: 154, cy: 48, r: 1.3, fill: "paper", opacity: 0.88 },
      { kind: "circle", cx: 138, cy: 62, r: 1.1, fill: "paper", opacity: 0.82 },
      { kind: "circle", cx: 82, cy: 66, r: 1, fill: "accent-soft", opacity: 0.8 },
      { kind: "circle", cx: 46, cy: 70, r: 1.2, fill: "paper", opacity: 0.84 },
      { kind: "circle", cx: 120, cy: 32, r: 1, fill: "accent-soft", opacity: 0.82 },

      // Plane 2: Snowy Wheeler Peak glacial cirque & Snake Range crest
      {
        kind: "path",
        d: "M11 124 L32 110 L58 122 L84 114 L106 94 L120 76 L136 96 L152 88 L169 104 L169 162 L11 162 Z",
        fill: "far",
      },
      // Moonlit snowy cirque & Wheeler Peak Rock Glacier snowfield
      {
        kind: "path",
        d: "M120 76 L108 98 L116 102 L102 124 L122 118 L134 128 L138 104 L130 92 Z",
        fill: "paper",
        opacity: 0.82,
      },
      {
        kind: "path",
        d: "M152 88 L144 106 L154 110 L164 102 Z",
        fill: "paper",
        opacity: 0.64,
      },
      // Shadowed eastern ridge of Wheeler Peak
      {
        kind: "path",
        d: "M120 76 L136 96 L146 146 L124 146 L128 104 Z",
        fill: "mid",
        opacity: 0.82,
      },

      // Plane 3: Dark alpine moraine ridge & quartzite talus crest
      {
        kind: "path",
        d: "M11 146 Q48 136 86 150 Q128 162 169 152 L169 229 L11 229 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M11 166 Q44 156 80 172 Q120 188 169 180 L169 229 L11 229 Z",
        fill: "deep",
      },
      // Moonlit ridge rim highlights across the rocky moraine
      { kind: "path", d: "M14 166 Q46 157 82 173 Q116 186 164 180", stroke: "accent-soft", strokeWidth: 1.3, opacity: 0.48 },

      // Plane 4 & 5: Hero Landmark — 5,000-Year-Old Twisted Ancient Bristlecone Pine
      // Massive wind-sculpted gnarled trunk & twisting roots gripping the high rocky moraine
      {
        kind: "path",
        d: "M34 214 Q46 196 54 182 C58 164 46 148 54 130 C60 116 74 104 68 82 C74 96 76 112 72 128 C82 118 96 110 108 98 C98 116 84 128 74 144 C70 158 76 174 86 190 Q98 204 112 216 L90 214 Q74 198 66 192 Q56 202 48 218 Z",
        fill: "deep",
      },
      // Iconic bleached silver-cream deadwood spiral grain carved by millennia of wind
      {
        kind: "path",
        d: "M58 184 C61 164 52 148 59 130 C64 118 72 104 68 84",
        stroke: "paper",
        strokeWidth: 3.4,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M64 176 C68 158 72 142 84 128 C92 118 100 108 108 98",
        stroke: "paper",
        strokeWidth: 2.4,
        strokeLinecap: "round",
        opacity: 0.82,
      },
      // Flame-like sinuous deadwood antler snags reaching up into the starry Milky Way
      {
        kind: "path",
        d: "M56 146 C42 136 32 120 38 96 M56 134 C46 122 46 106 54 90 M76 136 C92 134 108 128 122 116",
        stroke: "paper",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.86,
      },
      {
        kind: "path",
        d: "M56 146 C44 136 34 122 39 99 M68 118 C78 106 84 94 86 78",
        stroke: "accent-soft",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      // Living bottle-brush bristlecone pine needle clusters clinging to sheltered leeward boughs
      { kind: "ellipse", cx: 112, cy: 114, rx: 14, ry: 5.5, fill: "accent", opacity: 0.92 },
      { kind: "ellipse", cx: 124, cy: 120, rx: 11, ry: 4.5, fill: "accent", opacity: 0.86 },
      { kind: "ellipse", cx: 98, cy: 122, rx: 10, ry: 4.2, fill: "deep", opacity: 0.75 },
      { kind: "ellipse", cx: 42, cy: 118, rx: 10, ry: 4.2, fill: "accent", opacity: 0.88 },
      { kind: "ellipse", cx: 34, cy: 124, rx: 8.5, ry: 3.8, fill: "accent-soft", opacity: 0.65 },
      // Exposed twisted foreground roots & quartzite boulders anchoring the base
      { kind: "path", d: "M54 190 Q42 198 30 214 M70 192 Q86 200 104 214", stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.68 },
      { kind: "ellipse", cx: 28, cy: 214, rx: 12, ry: 6, fill: "ink", opacity: 0.78 },
      { kind: "ellipse", cx: 144, cy: 210, rx: 15, ry: 7, fill: "ink", opacity: 0.72 },
      { kind: "path", d: "M134 206 Q144 202 154 206", stroke: "accent-soft", strokeWidth: 1.1, opacity: 0.48 },
    ],
  },

  // =========================================================================
  // 8. SEQU — Sequoia National Park (CA)
  // =========================================================================
  {
    code: "SEQU",
    subject: "Colossal low-angle General Sherman Giant Sequoia trunk & Sierra dawn sunbeams",
    accentLight: "#C26136",
    accentDark: "#EC946B",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Golden Sierra dawn sun & warm radiating light shafts filtering past the giant crown
      { kind: "circle", cx: 142, cy: 48, r: 22, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 142, cy: 48, r: 11.5, fill: "accent", opacity: 0.86 },
      { kind: "polygon", points: "126,11 162,11 64,218 22,218", fill: "accent-soft", opacity: 0.18 },
      { kind: "polygon", points: "148,26 169,36 126,216 98,216", fill: "paper", opacity: 0.16 },

      // Plane 2: Distant snow-dusted High Sierra ridge peeking between Giant Forest trunks
      {
        kind: "path",
        d: "M11 146 L28 124 L48 136 L68 126 L116 128 L138 118 L156 130 L169 124 L169 184 L11 184 Z",
        fill: "far",
      },
      { kind: "path", d: "M28 124 L20 138 L30 135 L38 140 Z", fill: "paper", opacity: 0.76 },
      { kind: "path", d: "M138 118 L128 134 L139 131 L148 136 Z", fill: "paper", opacity: 0.82 },

      // Companion Giant Forest sequoia trunks standing further back for immense vertical scale
      { kind: "path", d: "M20 11 L32 11 L35 178 Q38 194 42 204 L12 204 Q17 192 19 176 Z", fill: "mid" },
      { kind: "line", x1: 31, y1: 11, x2: 34, y2: 186, stroke: "accent-soft", strokeWidth: 1.5, opacity: 0.62 },
      { kind: "path", d: "M144 11 L156 11 L160 176 Q163 192 168 204 L136 204 Q141 190 143 174 Z", fill: "mid" },
      { kind: "line", x1: 144, y1: 11, x2: 142, y2: 186, stroke: "accent", strokeWidth: 1.5, opacity: 0.68 },
      // Midground Sierra white fir spires emphasizing the giant's massive girth
      { kind: "polygon", points: "46,144 38,188 54,188", fill: "ink", opacity: 0.86 },
      { kind: "polygon", points: "132,148 124,190 140,190", fill: "ink", opacity: 0.84 },

      // Plane 3: Hero Monument — Colossal Low-Angle General Sherman Giant Sequoia Trunk
      // Vast fluted buttress flaring wide across foreground and soaring straight past the top edge
      {
        kind: "path",
        d: "M64 11 L114 11 L120 146 C122 178 130 202 144 229 L36 229 C50 202 58 178 60 146 Z",
        fill: "ink",
      },
      // Warm dawn-lit cinnamon-red eastern flank of the colossal trunk
      {
        kind: "path",
        d: "M90 11 L114 11 L120 146 C122 178 130 202 144 229 L92 229 L91 144 Z",
        fill: "accent",
        opacity: 0.84,
      },
      // Bright sunlit cinnamon edge highlight catching morning sunbeams
      {
        kind: "path",
        d: "M108 11 L114 11 L120 146 C122 176 129 200 140 226 L128 226 C118 198 113 174 112 146 Z",
        fill: "accent-soft",
        opacity: 0.66,
      },
      // Deep shadowed western flank giving cylindrical sculptural mass
      {
        kind: "path",
        d: "M64 11 L78 11 L76 146 C74 178 68 202 58 229 L36 229 C50 202 58 178 60 146 Z",
        fill: "deep",
        opacity: 0.72,
      },
      // Deeply furrowed vertical fibrous bark ridges converging subtly upward in low-angle perspective
      { kind: "path", d: "M70 11 L66 150 C64 180 58 204 48 228", stroke: "deep", strokeWidth: 2.2, opacity: 0.78 },
      { kind: "path", d: "M82 11 L80 150 C79 180 76 204 70 228", stroke: "deep", strokeWidth: 2, opacity: 0.72 },
      { kind: "path", d: "M94 11 L96 150 C97 180 100 204 106 228", stroke: "deep", strokeWidth: 1.9, opacity: 0.64 },
      { kind: "path", d: "M106 11 L110 150 C112 180 117 204 126 228", stroke: "ink", strokeWidth: 1.8, opacity: 0.68 },
      // Sunlit cinnamon bark ridge highlights beside the furrows
      { kind: "path", d: "M86 16 L85 152 C85 182 83 206 80 226", stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.62 },
      { kind: "path", d: "M100 16 L103 152 C105 182 109 206 116 226", stroke: "paper", strokeWidth: 1.3, opacity: 0.56 },
      // Iconic fire-scarred triangular basal cavern tucked naturally at the lower-left buttress
      { kind: "path", d: "M64 229 C64 206 68 190 73 182 C78 192 80 208 80 229 Z", fill: "deep" },

      // Massive high gnarled sequoia boughs & overarching evergreen crown framing upper corners
      {
        kind: "path",
        d: "M64 46 C44 40 28 38 11 46 M65 28 C46 20 30 18 11 24 M114 42 C134 34 150 32 169 40 M113 24 C132 16 148 16 169 22",
        stroke: "deep",
        strokeWidth: 4.5,
        strokeLinecap: "round",
      },
      {
        kind: "path",
        d: "M11 11 L66 11 L62 34 Q42 46 26 36 Q16 42 11 36 Z",
        fill: "deep",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M169 11 L112 11 L116 32 Q136 44 154 34 Q162 40 169 36 Z",
        fill: "deep",
        opacity: 0.88,
      },

      // Plane 4 & 5: Giant Forest needle-duff floor, sunlit clearing pools & tiny scale understory
      { kind: "path", d: "M11 196 Q38 192 54 206 L44 229 L11 229 Z", fill: "ink" },
      { kind: "path", d: "M169 196 Q142 192 126 206 L136 229 L169 229 Z", fill: "ink" },
      { kind: "path", d: "M11 214 Q44 210 66 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 214 Q136 210 114 229 L169 229 Z", fill: "deep" },
      { kind: "ellipse", cx: 28, cy: 206, rx: 14, ry: 3.2, fill: "accent-soft", opacity: 0.42 },
      { kind: "ellipse", cx: 150, cy: 206, rx: 15, ry: 3.4, fill: "accent-soft", opacity: 0.48 },
    ],
  },

  // =========================================================================
  // 9. REDW — Redwood National and State Parks (CA)
  // =========================================================================
  {
    code: "REDW",
    subject: "Cathedral Coastal Redwood grove in diagonal morning fog sunbeams & sword ferns",
    accentLight: "#6E9958",
    accentDark: "#A8D490",
    skyMood: "mist",
    nodes: [
      // Plane 1: Luminous coastal fog glow & iconic diagonal morning sunbeams streaming through the grove
      { kind: "circle", cx: 42, cy: 24, r: 22, fill: "paper", opacity: 0.62 },
      { kind: "polygon", points: "24,11 54,11 146,216 106,216", fill: "paper", opacity: 0.28 },
      { kind: "polygon", points: "62,11 88,11 169,184 148,202", fill: "accent-soft", opacity: 0.26 },
      { kind: "polygon", points: "11,28 24,11 94,218 64,218", fill: "accent-soft", opacity: 0.2 },

      // Plane 2: Receding background cathedral of slender vertical Coast Redwoods veiled in fog
      { kind: "rect", x: 35, y: 11, width: 5, height: 194, fill: "far", opacity: 0.68 },
      { kind: "rect", x: 64, y: 11, width: 6, height: 196, fill: "far", opacity: 0.72 },
      { kind: "rect", x: 82, y: 11, width: 4.5, height: 194, fill: "far", opacity: 0.56 },
      { kind: "rect", x: 108, y: 11, width: 5.5, height: 196, fill: "far", opacity: 0.66 },
      { kind: "rect", x: 132, y: 11, width: 5, height: 194, fill: "far", opacity: 0.62 },
      // Soft coastal marine fog veils drifting horizontally through the lower cathedral grove
      { kind: "ellipse", cx: 90, cy: 146, rx: 78, ry: 18, fill: "paper", opacity: 0.42 },
      { kind: "ellipse", cx: 96, cy: 174, rx: 72, ry: 14, fill: "paper", opacity: 0.36 },

      // Plane 3: Hero Midground & Foreground Cluster of Impossibly Tall, Slender Vertical Coast Redwoods
      // Midground tall slender pair
      { kind: "path", d: "M46 11 L54 11 L55 198 Q56 206 59 212 L42 212 Q45 204 45.5 196 Z", fill: "mid" },
      { kind: "line", x1: 54, y1: 11, x2: 55, y2: 202, stroke: "paper", strokeWidth: 1.2, opacity: 0.64 },
      { kind: "path", d: "M94 11 L104 11 L106 202 Q108 212 111 218 L90 218 Q92 210 93 200 Z", fill: "ink" },
      { kind: "line", x1: 94.5, y1: 11, x2: 93.5, y2: 204, stroke: "accent-soft", strokeWidth: 1.5, opacity: 0.74 },
      { kind: "path", d: "M116 11 L123 11 L124 198 Q126 208 128 214 L113 214 Q115 206 115.5 198 Z", fill: "ink", opacity: 0.9 },
      { kind: "line", x1: 116.5, y1: 11, x2: 116, y2: 200, stroke: "paper", strokeWidth: 1.1, opacity: 0.52 },
      // Foreground framing slender cathedral pillars (left & right)
      { kind: "path", d: "M13 11 L27 11 L29 204 Q32 218 36 229 L11 229 L11 11 Z", fill: "deep" },
      { kind: "line", x1: 26.5, y1: 11, x2: 28.5, y2: 206, stroke: "accent-soft", strokeWidth: 1.6, opacity: 0.7 },
      { kind: "path", d: "M70 11 L79 11 L80 208 Q82 218 85 226 L66 226 Q68 216 69 206 Z", fill: "deep" },
      { kind: "line", x1: 78.5, y1: 11, x2: 79.5, y2: 210, stroke: "accent", strokeWidth: 1.3, opacity: 0.68 },
      { kind: "path", d: "M148 11 L169 11 L169 229 L140 229 Q145 216 146.5 202 Z", fill: "deep" },
      { kind: "line", x1: 148.5, y1: 11, x2: 147, y2: 204, stroke: "accent-soft", strokeWidth: 1.6, opacity: 0.72 },

      // Feathery high redwood canopy boughs draping softly across top edge with sunbeam gaps
      {
        kind: "path",
        d: "M11 11 L169 11 L169 34 Q146 44 128 30 Q112 40 94 28 Q78 36 62 24 Q42 18 28 32 L11 28 Z",
        fill: "ink",
        opacity: 0.74,
      },
      // Re-emphasize luminous foreground sunbeam shaft slicing across the mid trunks
      { kind: "polygon", points: "40,11 58,11 138,214 114,214", fill: "paper", opacity: 0.16 },

      // Plane 4 & 5: Shaded Fern Canyon forest floor & lush arching Western sword-fern fronds
      { kind: "path", d: "M11 200 Q54 194 94 202 Q134 196 169 200 L169 229 L11 229 Z", fill: "ink" },
      // Sunlit emerald fern patches where diagonal fog sunbeams strike the floor
      { kind: "ellipse", cx: 114, cy: 214, rx: 30, ry: 7, fill: "accent-soft", opacity: 0.44 },
      { kind: "ellipse", cx: 88, cy: 222, rx: 22, ry: 5, fill: "accent", opacity: 0.48 },
      // Lush feathery arching sword-fern fronds across left, center, and right foreground
      {
        kind: "path",
        d: "M12 228 Q28 190 56 184 M16 228 Q36 202 64 202 M20 206 L32 195 M28 199 L42 190 M38 194 L50 186 M30 214 L44 205 M42 212 L56 204",
        stroke: "deep",
        strokeWidth: 2.6,
        strokeLinecap: "round",
      },
      {
        kind: "path",
        d: "M168 228 Q150 188 122 184 M164 228 Q144 200 116 200 M158 204 L144 194 M150 197 L136 188 M140 192 L128 185 M148 214 L134 205 M136 212 L122 203",
        stroke: "deep",
        strokeWidth: 2.6,
        strokeLinecap: "round",
      },
      // Sunlit central sword-fern spray glowing in the morning light shaft
      {
        kind: "path",
        d: "M98 228 Q94 200 76 192 M100 228 Q106 196 126 190 M100 228 Q100 198 102 184 M92 210 L82 200 M106 208 L118 198 M100 202 L94 192 M102 202 L108 192",
        stroke: "accent",
        strokeWidth: 2.3,
        strokeLinecap: "round",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M100 226 Q106 202 122 194 M100 224 Q94 204 82 196",
        stroke: "accent-soft",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.8,
      },
      { kind: "path", d: "M11 218 Q48 214 90 222 Q132 214 169 218 L169 229 L11 229 Z", fill: "deep" },
    ],
  },

  // =========================================================================
  // 10. OLYM — Olympic National Park (WA)
  // =========================================================================
  {
    code: "OLYM",
    subject: "Rialto Beach sea stacks & natural sea arch beneath mist-veiled glaciated Mount Olympus",
    accentLight: "#4B8C78",
    accentDark: "#88C9B5",
    skyMood: "mist",
    nodes: [
      // Plane 1: Misty Pacific marine-layer sky & soft glowing coastal sun
      { kind: "circle", cx: 48, cy: 38, r: 22, fill: "paper", opacity: 0.58 },
      { kind: "circle", cx: 48, cy: 38, r: 10.5, fill: "paper", opacity: 0.92 },
      { kind: "path", d: "M18 26 Q42 22 68 26 Q48 29 18 26 Z", fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M108 28 Q136 22 166 28 Q140 32 108 28 Z", fill: "paper", opacity: 0.56 },

      // Plane 2: Glaciated white dome of Mount Olympus emerging through coastal marine fog
      {
        kind: "path",
        d: "M54 114 L84 68 L98 56 L110 62 L120 46 L134 58 L148 54 L169 86 L169 120 L54 120 Z",
        fill: "far",
      },
      // Gleaming Blue Glacier snow & ice crown atop Mount Olympus
      {
        kind: "path",
        d: "M84 68 L98 56 L110 62 L120 46 L134 58 L148 54 L158 74 L142 78 L130 70 L118 82 L106 72 L94 82 Z",
        fill: "paper",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M120 46 L134 58 L144 74 L126 74 L118 62 Z",
        fill: "accent-soft",
        opacity: 0.42,
      },
      // Drifting horizontal coastal Pacific fog veil separating Mount Olympus from the sea
      { kind: "ellipse", cx: 112, cy: 104, rx: 72, ry: 12, fill: "paper", opacity: 0.66 },
      { kind: "ellipse", cx: 74, cy: 114, rx: 64, ry: 9, fill: "paper", opacity: 0.54 },

      // Plane 3: Misty Sitka spruce coastal headland jutting out on the left horizon
      {
        kind: "path",
        d: "M11 98 Q36 96 62 112 Q80 122 96 134 L11 136 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M11 100 L18 88 L25 100 L33 90 L41 104 L50 96 L59 112 L68 108 L78 122 L11 128 Z",
        fill: "ink",
        opacity: 0.84,
      },

      // Plane 4: Deep Pacific swells, towering Rialto / Ruby Beach sea stacks & Hole-in-the-Wall sea arch
      { kind: "rect", x: 11, y: 132, width: 158, height: 74, fill: "accent" },
      { kind: "rect", x: 11, y: 132, width: 158, height: 26, fill: "mid", opacity: 0.58 },
      // Distant offshore craggy sea-stack needle
      { kind: "path", d: "M82 146 L86 120 L91 124 L95 146 Z", fill: "ink", opacity: 0.86 },

      // Hero Left Sea Stack (Abbey Island / Haystack stack) with windswept Sitka spruce crest
      {
        kind: "path",
        d: "M38 176 L45 124 L54 108 L64 114 L70 134 L76 176 Z",
        fill: "deep",
      },
      { kind: "polygon", points: "53,98 48,111 58,111", fill: "deep" },
      { kind: "polygon", points: "61,103 57,114 65,114", fill: "deep" },
      { kind: "line", x1: 52, y1: 114, x2: 47, y2: 168, stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.45 },

      // Hero Right Landmark: Iconic Hole-in-the-Wall Natural Sea Arch
      {
        kind: "path",
        d: "M102 180 L110 132 L124 114 L144 118 L158 134 L166 180 L144 180 L142 152 C140 140 124 140 122 152 L120 180 Z",
        fill: "deep",
      },
      // Luminous misty sky & sea glimpse shining cleanly through the sea arch portal
      {
        kind: "path",
        d: "M122 174 L123 152 C125 142 139 142 141 152 L142 174 Z",
        fill: "paper",
        opacity: 0.72,
      },
      { kind: "rect", x: 122.5, y: 160, width: 19, height: 14, fill: "accent-soft", opacity: 0.76 },
      { kind: "line", x1: 122, y1: 118, x2: 112, y2: 170, stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.44 },

      // Curling Pacific Ocean swells & bright breaking seafoam ribbons around the stacks
      {
        kind: "path",
        d: "M11 154 Q34 150 58 154 T106 154 T169 152",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.74,
      },
      {
        kind: "path",
        d: "M11 174 Q42 169 78 176 Q114 182 169 175",
        stroke: "paper",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M24 184 Q66 179 112 186 Q142 190 166 186",
        stroke: "paper",
        strokeWidth: 2.6,
        strokeLinecap: "round",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M16 192 Q68 188 122 194 Q146 196 168 193",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.78,
      },

      // Plane 5: Wet tidal pebble beach & sun-bleached Pacific driftwood logs
      { kind: "path", d: "M11 192 Q64 198 118 194 Q146 192 169 196 L169 229 L11 229 Z", fill: "ink" },
      { kind: "path", d: "M11 206 Q74 214 169 208 L169 229 L11 229 Z", fill: "deep" },
      // Tidal reflection sheen on wet coastal pebbles
      { kind: "ellipse", cx: 88, cy: 204, rx: 38, ry: 3.2, fill: "paper", opacity: 0.36 },
      // Sun-bleached Pacific driftwood logs resting along the foreground shore
      {
        kind: "path",
        d: "M14 212 L72 220 L70 225 L14 219 Z",
        fill: "paper",
        opacity: 0.82,
      },
      {
        kind: "path",
        d: "M14 217 L70 224",
        stroke: "deep",
        strokeWidth: 1.4,
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M168 214 L118 221 L120 225 L168 220 Z",
        fill: "paper",
        opacity: 0.76,
      },
      { kind: "path", d: "M66 218 L78 212 M122 220 L110 214", stroke: "paper", strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.78 },
    ],
  },

  // =========================================================================
  // 11. GRSM — Great Smoky Mountains National Park (NC/TN)
  // =========================================================================
  {
    code: "GRSM",
    subject: "Six cascading layers of blue-hazed Appalachian ridges & rising valley mist",
    accentLight: "#4B7E78",
    accentDark: "#8AC0BA",
    skyMood: "mist",
    nodes: [
      // Plane 1: Luminous Appalachian morning sunrise sky & stratified dawn clouds
      { kind: "circle", cx: 92, cy: 46, r: 30, fill: "accent-soft", opacity: 0.28 },
      { kind: "circle", cx: 92, cy: 46, r: 19, fill: "paper", opacity: 0.56 },
      { kind: "circle", cx: 92, cy: 46, r: 10.5, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M18 28 Q48 22 78 28 Q52 32 18 28 Z", fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M112 32 Q138 26 164 32 Q140 36 112 32 Z", fill: "paper", opacity: 0.58 },

      // Plane 2: Ridge 1 — Farthest Blue Ridge / Clingmans Dome horizon sweeping continuously left-to-right
      {
        kind: "path",
        d: "M11 84 Q42 66 74 78 Q104 86 138 70 Q154 66 169 76 L169 124 L11 124 Z",
        fill: "far",
        opacity: 0.46,
      },
      // Valley Smoke / Mist Band 1
      { kind: "ellipse", cx: 90, cy: 96, rx: 84, ry: 12, fill: "paper", opacity: 0.56 },

      // Ridge 2 — Soft rounded Appalachian dome cresting left-of-center
      {
        kind: "path",
        d: "M11 98 Q48 84 82 96 Q116 108 148 92 Q158 88 169 94 L169 144 L11 144 Z",
        fill: "far",
        opacity: 0.78,
      },
      // Valley Smoke / Mist Band 2
      { kind: "ellipse", cx: 94, cy: 114, rx: 84, ry: 11, fill: "paper", opacity: 0.54 },
      { kind: "path", d: "M18 112 Q68 106 118 114 Q146 116 166 110", stroke: "accent-soft", strokeWidth: 2.2, opacity: 0.46 },

      // Plane 3: Ridge 3 — Blue-hazed mid-far Appalachian ridge cresting right-of-center
      {
        kind: "path",
        d: "M11 118 Q40 108 72 118 Q104 128 134 106 Q152 100 169 112 L169 162 L11 162 Z",
        fill: "accent",
        opacity: 0.62,
      },
      // Valley Smoke / Mist Band 3 — luminous drifting Smoky Mountains white valley mist
      { kind: "ellipse", cx: 84, cy: 132, rx: 84, ry: 12, fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M14 134 Q54 126 96 134 Q134 140 166 130", stroke: "paper", strokeWidth: 2.6, strokeLinecap: "round", opacity: 0.68 },

      // Ridge 4 — Broad wooded mid-valley ridge sweeping gracefully across the vista
      {
        kind: "path",
        d: "M11 134 Q46 120 80 134 Q114 148 148 132 Q160 128 169 134 L169 184 L11 184 Z",
        fill: "mid",
      },
      // Subtle sunlit mist rim grazing the crest of Ridge 4
      { kind: "path", d: "M11 134 Q46 120 80 134 Q114 148 148 132 Q160 128 169 134", stroke: "accent-soft", strokeWidth: 1.5, opacity: 0.64 },
      // Valley Smoke / Mist Band 4 — rising Appalachian cove mist curling between ridges
      { kind: "ellipse", cx: 98, cy: 152, rx: 82, ry: 12, fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M24 152 Q66 144 108 152 Q138 156 164 148", stroke: "paper", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.62 },

      // Plane 4: Ridge 5 — Deep spruce-green wooded ridge rising softly toward the right
      {
        kind: "path",
        d: "M11 158 Q38 148 70 158 Q104 168 138 148 Q154 142 169 152 L169 204 L11 204 Z",
        fill: "ink",
        opacity: 0.88,
      },
      // Valley Smoke / Mist Band 5 — low pocket of luminous valley fog before the near bluff
      { kind: "ellipse", cx: 80, cy: 174, rx: 76, ry: 10, fill: "paper", opacity: 0.48 },
      { kind: "path", d: "M18 174 Q64 168 112 176 Q142 180 164 172", stroke: "accent-soft", strokeWidth: 2, strokeLinecap: "round", opacity: 0.52 },

      // Ridge 6 — Near wooded Appalachian ridge with subtle forested crest texture
      {
        kind: "path",
        d: "M11 172 Q44 162 84 178 Q122 190 154 174 L169 170 L169 229 L11 229 Z",
        fill: "ink",
      },
      { kind: "path", d: "M11 172 Q44 162 84 178 Q122 190 154 174 L169 170", stroke: "accent-soft", strokeWidth: 1.3, opacity: 0.52 },
      // Soft final mist wisp hugging the lower valley hollow
      { kind: "ellipse", cx: 102, cy: 194, rx: 56, ry: 7.5, fill: "paper", opacity: 0.28 },

      // Plane 5: Foreground dark Fraser fir & Eastern hemlock overlook ridge framing the endless misty vista
      {
        kind: "path",
        d: "M11 190 Q46 196 86 212 Q128 202 169 192 L169 229 L11 229 Z",
        fill: "deep",
      },
      // Left overlook Fraser fir spires
      { kind: "polygon", points: "22,150 11,196 33,196", fill: "deep" },
      { kind: "polygon", points: "38,166 28,204 48,204", fill: "deep" },
      { kind: "polygon", points: "53,182 45,212 61,212", fill: "deep" },
      // Right overlook Fraser fir & red spruce spires
      { kind: "polygon", points: "158,152 146,198 169,198", fill: "deep" },
      { kind: "polygon", points: "141,168 131,206 151,206", fill: "deep" },
      { kind: "polygon", points: "126,184 118,214 134,214", fill: "deep" },
    ],
  },
] as const
