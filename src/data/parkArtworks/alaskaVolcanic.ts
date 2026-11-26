import type { ParkArtworkSpec } from "../../types/parks.ts"

/**
 * Alaska & Volcanic / Geothermal collection of 11 bespoke WPA-screenprint
 * National Park poster artworks (DENA, GAAR, GLBA, KEFJ, WRST, KATM, LACL,
 * CRLA, LAVO, HALE, YELL).
 *
 * Artboard: viewBox="0 0 180 240" (3:4 portrait), clipped inner print area
 * x=[14..166], y=[14..226], horizontal center x=90. Edge-touching layers bleed
 * cleanly to x=[11..169], y=[11..229] for continuous edge-to-edge sweeps.
 *
 * Every artwork is composed across 5 depth planes with high light/mid/dark
 * tonal contrast so silhouettes and landmarks remain razor-sharp in both full
 * color and archival monochrome grayscale. Zero <text> elements.
 */
export const ALASKA_VOLCANIC_PARK_ARTWORKS: readonly ParkArtworkSpec[] = [
  // =========================================================================
  // 1. DENA — Denali National Park (AK)
  // =========================================================================
  {
    code: "DENA",
    subject: "Denali double-summit South & North Peak massif towering above Wonder Lake tundra",
    accentLight: "#C77858",
    accentDark: "#EEA688",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Subarctic dawn sun, crisp radial glow & high cirrus bands
      { kind: "circle", cx: 142, cy: 38, r: 22, fill: "accent-soft", opacity: 0.42 },
      { kind: "circle", cx: 142, cy: 38, r: 12, fill: "accent", opacity: 0.88 },
      { kind: "circle", cx: 142, cy: 38, r: 6.5, fill: "paper", opacity: 0.78 },
      { kind: "path", d: "M18 28 Q42 23 68 28 Q48 31 18 28 Z", fill: "paper", opacity: 0.65 },
      { kind: "path", d: "M118 22 Q140 18 164 23 Q144 26 118 22 Z", fill: "paper", opacity: 0.52 },

      // Plane 2: Low distant Alaska Range foothills dwarfed by Denali
      { kind: "path", d: "M11 114 L28 102 L44 108 L138 104 L154 96 L169 108 L169 144 L11 144 Z", fill: "far" },
      { kind: "path", d: "M154 96 L162 104 L151 106 L146 102 Z", fill: "paper", opacity: 0.7 },

      // Plane 3: Hero — Colossal 20,310-ft double-summit Denali massif
      // Unmistakable twin crown: North Peak (70,42) + saddle (82,53) + supreme South Peak (101,28)
      {
        kind: "path",
        d: "M11 134 L30 98 L48 76 L62 52 L70 42 L76 47 L82 53 L92 38 L101 28 L110 39 L122 58 L138 76 L154 100 L169 124 L169 146 L11 146 Z",
        fill: "ink",
      },
      // Monumental sunlit snow-and-glacier armor blanketing the upper massif
      {
        kind: "path",
        d: "M48 76 L62 52 L70 42 L76 47 L82 53 L92 38 L101 28 L110 39 L122 58 L138 76 L148 94 L132 96 L120 82 L110 98 L98 84 L88 100 L76 86 L64 98 L54 88 L40 94 Z",
        fill: "paper",
        opacity: 0.96,
      },
      // Warm dawn alpenglow sweeping South Peak's eastern ridge & Harper Glacier
      {
        kind: "path",
        d: "M101 28 L110 39 L122 58 L138 76 L146 92 L128 90 L118 74 L108 82 L100 54 Z",
        fill: "accent-soft",
        opacity: 0.62,
      },
      {
        kind: "path",
        d: "M101 28 L110 39 L120 56 L112 62 L102 48 Z",
        fill: "accent",
        opacity: 0.44,
      },
      // Steep dark granite buttresses & Wickersham Wall shadow ribs for razor monochrome relief
      { kind: "polygon", points: "70,42 66,68 54,84 62,56", fill: "deep", opacity: 0.72 },
      { kind: "polygon", points: "82,53 78,84 90,82 88,60", fill: "deep", opacity: 0.78 },
      { kind: "polygon", points: "98,42 93,78 104,76 102,52", fill: "ink", opacity: 0.68 },
      { kind: "polygon", points: "118,64 114,94 126,90 124,72", fill: "deep", opacity: 0.64 },
      { kind: "path", d: "M34 94 L52 84 L66 96 L84 86 L98 98 L118 86 L138 96 L154 102", stroke: "deep", strokeWidth: 1.4, opacity: 0.55 },

      // Plane 4: Rolling subarctic tundra hills & glassy Wonder Lake reflection
      { kind: "path", d: "M11 132 Q46 118 88 128 Q132 118 169 130 L169 156 L11 156 Z", fill: "mid" },
      { kind: "path", d: "M11 138 Q52 128 96 136 Q136 128 169 138 L169 154 L11 154 Z", fill: "accent", opacity: 0.36 },
      // Far Wonder Lake black-spruce treeline band
      {
        kind: "path",
        d: "M11 148 L18 139 L24 148 L32 140 L39 149 L48 142 L56 150 L72 144 L86 150 L102 145 L118 149 L128 141 L136 149 L145 140 L153 148 L161 139 L169 148 L169 154 L11 154 Z",
        fill: "deep",
      },
      // Calm Wonder Lake basin
      { kind: "rect", x: 11, y: 152, width: 158, height: 77, fill: "ink" },
      { kind: "rect", x: 11, y: 152, width: 158, height: 28, fill: "mid", opacity: 0.45 },
      // Inverted dark massif reflection
      {
        kind: "path",
        d: "M28 153 L152 153 L134 180 L114 202 L101 214 L92 204 L82 194 L70 204 L58 190 L42 174 Z",
        fill: "deep",
        opacity: 0.58,
      },
      // Inverted luminous white double-summit reflection
      {
        kind: "path",
        d: "M52 176 L130 176 L114 202 L101 214 L92 204 L82 194 L70 204 L60 192 Z",
        fill: "paper",
        opacity: 0.74,
      },
      {
        kind: "path",
        d: "M96 176 L130 176 L114 202 L101 214 Z",
        fill: "accent-soft",
        opacity: 0.46,
      },
      // Crisp horizontal glassy lake water ripples breaking the reflection
      { kind: "line", x1: 36, y1: 162, x2: 146, y2: 162, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.62 },
      { kind: "line", x1: 46, y1: 174, x2: 136, y2: 174, stroke: "deep", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.58 },
      { kind: "line", x1: 54, y1: 186, x2: 128, y2: 186, stroke: "paper", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.66 },
      { kind: "line", x1: 64, y1: 198, x2: 118, y2: 198, stroke: "deep", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.55 },
      { kind: "line", x1: 72, y1: 209, x2: 110, y2: 209, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.58 },

      // Plane 5: Foreground subarctic shore & slender Alaskan black spruce spires
      { kind: "path", d: "M11 196 Q44 208 74 224 L112 224 Q142 208 169 196 L169 229 L11 229 Z", fill: "deep" },
      // Slender needle-thin taiga black spruce on left bank
      { kind: "polygon", points: "22,126 17,154 20,154 15,184 19,184 13,214 31,214 25,184 29,184 24,154 27,154", fill: "deep" },
      { kind: "polygon", points: "37,152 33,174 36,174 31,210 43,210 38,174 41,174", fill: "deep" },
      // Slender taiga black spruce on right bank
      { kind: "polygon", points: "157,132 152,160 155,160 150,188 154,188 148,214 166,214 160,188 164,188 159,160 162,160", fill: "deep" },
      { kind: "polygon", points: "143,156 139,178 142,178 137,212 149,212 144,178 147,178", fill: "deep" },
    ],
  },

  // =========================================================================
  // 2. GAAR — Gates of the Arctic National Park (AK)
  // =========================================================================
  {
    code: "GAAR",
    subject: "Arrigetch Peaks granite spires and twin Brooks Range Gates framing the North Fork Koyukuk River",
    accentLight: "#5B9A94",
    accentDark: "#96D6D0",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Low Arctic midnight sun & sweeping aurora/polar light band
      { kind: "path", d: "M14 34 Q54 18 92 28 T166 24", stroke: "accent-soft", strokeWidth: 5.5, strokeLinecap: "round", opacity: 0.42 },
      { kind: "path", d: "M18 35 Q56 20 94 29 T164 25", stroke: "paper", strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.74 },
      { kind: "path", d: "M24 44 Q64 32 104 40 T160 36", stroke: "accent", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.34 },
      { kind: "circle", cx: 90, cy: 62, r: 22, fill: "accent-soft", opacity: 0.38 },
      { kind: "circle", cx: 90, cy: 62, r: 11.5, fill: "paper", opacity: 0.95 },

      // Plane 2: Distant razor-sharp Arrigetch Peaks granite spires inside the portal
      {
        kind: "path",
        d: "M60 132 L68 86 L74 96 L80 62 L85 82 L90 50 L95 78 L101 64 L107 94 L114 82 L120 132 Z",
        fill: "far",
      },
      // Crisp sunlit snow/granite faces on the Arrigetch needles
      { kind: "polygon", points: "90,50 93,76 89,84 85,78", fill: "paper", opacity: 0.86 },
      { kind: "polygon", points: "80,62 83,84 77,90", fill: "paper", opacity: 0.78 },
      { kind: "polygon", points: "101,64 104,88 97,86", fill: "paper", opacity: 0.76 },
      { kind: "polygon", points: "90,50 95,78 92,98 89,84", fill: "mid", opacity: 0.75 },

      // Plane 3: Hero — Twin "Gates": Frigid Crags (left) & Boreal Mountain (right)
      // Left Gatepost: Frigid Crags massive steep prow
      {
        kind: "path",
        d: "M11 64 L26 56 L42 46 L52 54 L64 86 L76 126 L84 146 L11 154 Z",
        fill: "ink",
      },
      // Sunlit eastern granite cliffs & snow couloirs on Frigid Crags
      {
        kind: "path",
        d: "M42 46 L52 54 L64 86 L74 122 L62 126 L54 96 L46 82 L40 62 Z",
        fill: "paper",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M11 64 L26 56 L42 46 L38 74 L48 106 L58 144 L11 148 Z",
        fill: "deep",
        opacity: 0.72,
      },
      { kind: "path", d: "M48 56 L58 92 L68 122", stroke: "accent", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.64 },

      // Right Gatepost: Boreal Mountain sweeping steep escarpment
      {
        kind: "path",
        d: "M169 62 L152 54 L138 44 L128 54 L116 86 L104 126 L96 146 L169 154 Z",
        fill: "ink",
      },
      // Sunlit western snow-etched face of Boreal Mountain
      {
        kind: "path",
        d: "M138 44 L128 54 L116 86 L106 122 L118 126 L126 96 L134 80 L140 62 Z",
        fill: "paper",
        opacity: 0.84,
      },
      {
        kind: "path",
        d: "M169 62 L152 54 L138 44 L142 74 L132 108 L122 144 L169 148 Z",
        fill: "deep",
        opacity: 0.76,
      },
      { kind: "path", d: "M132 56 L122 92 L112 122", stroke: "accent-soft", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.68 },

      // Plane 4: Broad glacial valley floor & braided North Fork Koyukuk River
      { kind: "path", d: "M11 140 L78 136 L102 136 L169 140 L169 229 L11 229 Z", fill: "mid" },
      // Exposed dark cobble gravel bars separating the braided Arctic channels
      { kind: "path", d: "M66 154 Q88 150 106 158 Q88 164 66 154 Z", fill: "ink", opacity: 0.72 },
      { kind: "path", d: "M52 178 Q78 172 100 184 Q74 192 52 178 Z", fill: "ink", opacity: 0.78 },
      { kind: "path", d: "M92 194 Q114 188 132 200 Q108 208 92 194 Z", fill: "ink", opacity: 0.76 },
      { kind: "path", d: "M56 212 Q84 206 108 218 Q82 224 56 212 Z", fill: "deep", opacity: 0.68 },
      // Primary luminous braided river channels winding out of the Gates
      {
        kind: "path",
        d: "M90 136 C86 146 72 152 68 164 C64 176 96 184 94 198 C92 210 72 218 68 229",
        stroke: "paper",
        strokeWidth: 4.4,
        strokeLinecap: "round",
        opacity: 0.95,
      },
      {
        kind: "path",
        d: "M92 136 C96 148 112 156 108 170 C104 182 126 194 120 210 C116 218 110 224 108 229",
        stroke: "paper",
        strokeWidth: 3.4,
        strokeLinecap: "round",
        opacity: 0.9,
      },
      {
        kind: "path",
        d: "M82 156 C96 164 102 174 88 186 C76 196 58 206 48 222",
        stroke: "accent-soft",
        strokeWidth: 2.6,
        strokeLinecap: "round",
        opacity: 0.85,
      },
      {
        kind: "path",
        d: "M90 136 C86 146 72 152 68 164 C64 176 96 184 94 198 C92 210 72 218 68 229",
        stroke: "accent",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.55,
      },

      // Plane 5: Foreground Arctic tundra bluffs & dwarf spruce framing
      { kind: "path", d: "M11 164 Q34 172 48 192 Q56 208 62 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 162 Q146 172 132 194 Q124 210 120 229 L169 229 Z", fill: "deep" },
      { kind: "path", d: "M11 164 Q34 172 48 192", stroke: "accent-soft", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.62 },
      { kind: "path", d: "M169 162 Q146 172 132 194", stroke: "accent-soft", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.62 },
      // Sparse Arctic boreal spruce tufts perched on the foreground bluffs
      { kind: "polygon", points: "22,148 17,172 27,172", fill: "deep" },
      { kind: "polygon", points: "32,158 28,178 36,178", fill: "deep" },
      { kind: "polygon", points: "156,146 151,170 161,170", fill: "deep" },
      { kind: "polygon", points: "145,156 141,176 149,176", fill: "deep" },
    ],
  },

  // =========================================================================
  // 3. GLBA — Glacier Bay National Park (AK)
  // =========================================================================
  {
    code: "GLBA",
    subject: "Margerie Glacier towering tidewater ice wall calving into Glacier Bay with floating icebergs",
    accentLight: "#468DA8",
    accentDark: "#8ACAE2",
    skyMood: "noon",
    nodes: [
      // Plane 1: Crisp high-latitude noon sky, sun & coastal cirrus
      { kind: "circle", cx: 138, cy: 32, r: 17, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 138, cy: 32, r: 9.5, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M20 28 Q46 22 76 28 Q54 31 20 28 Z", fill: "paper", opacity: 0.72 },
      { kind: "path", d: "M96 38 Q116 34 136 38 Q118 41 96 38 Z", fill: "paper", opacity: 0.56 },

      // Plane 2: Towering snow-covered Fairweather Range peaks behind the glacier
      {
        kind: "path",
        d: "M11 92 L30 62 L46 74 L64 42 L82 68 L98 54 L118 44 L138 70 L156 58 L169 78 L169 118 L11 118 Z",
        fill: "mid",
      },
      // Crisp white alpine snow faces on Fairweather Range
      { kind: "polygon", points: "64,42 54,68 63,64 70,74 75,60", fill: "paper", opacity: 0.92 },
      { kind: "polygon", points: "118,44 108,68 118,64 126,74 130,62", fill: "paper", opacity: 0.9 },
      { kind: "polygon", points: "30,62 23,80 32,76 38,82", fill: "paper", opacity: 0.82 },
      { kind: "polygon", points: "64,42 82,68 74,84 68,66", fill: "ink", opacity: 0.58 },
      { kind: "polygon", points: "118,44 138,70 128,86 122,64", fill: "ink", opacity: 0.56 },

      // Plane 3: Flanking dark fjord rock headlands & Hero Margerie Glacier tidewater ice wall
      // Descending upper glacier highway feeding the terminus
      {
        kind: "path",
        d: "M24 104 Q56 84 94 86 Q128 84 156 102 L156 116 L24 116 Z",
        fill: "far",
      },
      { kind: "path", d: "M34 98 Q78 88 144 96", stroke: "paper", strokeWidth: 2, opacity: 0.85 },
      // Dark rocky fjord walls pinching the glacier left & right
      { kind: "path", d: "M11 74 L28 84 L38 116 L32 156 L11 156 Z", fill: "deep" },
      { kind: "path", d: "M169 72 L152 86 L142 118 L148 156 L169 156 Z", fill: "deep" },
      // Hero towering jagged sheer tidewater ice face (blazing paper-white against dark walls & dark water!)
      {
        kind: "path",
        d: "M26 150 L28 112 L36 104 L42 112 L52 98 L60 108 L70 96 L78 106 L88 94 L98 106 L108 98 L118 108 L128 96 L136 108 L146 102 L154 114 L154 150 Z",
        fill: "paper",
      },
      // Vertical striated glacial blue-ice facets & deep serac crevasses
      { kind: "polygon", points: "36,104 42,112 42,150 35,150", fill: "accent", opacity: 0.62 },
      { kind: "polygon", points: "52,98 60,108 60,150 51,150", fill: "mid", opacity: 0.72 },
      { kind: "polygon", points: "70,96 78,106 78,150 69,150", fill: "accent", opacity: 0.76 },
      { kind: "polygon", points: "88,94 98,106 98,150 87,150", fill: "ink", opacity: 0.48 },
      { kind: "polygon", points: "108,98 118,108 118,150 107,150", fill: "accent", opacity: 0.68 },
      { kind: "polygon", points: "128,96 136,108 136,150 127,150", fill: "mid", opacity: 0.74 },
      // Razor-sharp vertical crevasse fractures
      {
        kind: "path",
        d: "M42 112 L42 148 M60 108 L60 148 M78 106 L78 148 M98 106 L98 148 M118 108 L118 148 M136 108 L136 148",
        stroke: "deep",
        strokeWidth: 1.2,
        opacity: 0.68,
      },
      // Active calving icefall splash plume erupting at the right-center waterline
      {
        kind: "path",
        d: "M102 150 Q106 132 114 142 Q120 126 126 142 Q132 134 136 150 Z",
        fill: "paper",
        opacity: 0.96,
      },

      // Plane 4: Deep dark Glacier Bay fjord water & sculptural floating icebergs
      { kind: "rect", x: 11, y: 150, width: 158, height: 79, fill: "deep" },
      { kind: "rect", x: 11, y: 164, width: 158, height: 65, fill: "ink", opacity: 0.72 },
      // Subtle inverted white glacier wall shimmer on the dark water
      { kind: "rect", x: 28, y: 151, width: 124, height: 14, fill: "paper", opacity: 0.22 },
      { kind: "line", x1: 24, y1: 154, x2: 156, y2: 154, stroke: "paper", strokeWidth: 1.4, opacity: 0.78 },

      // Left foreground faceted floating iceberg
      { kind: "polygon", points: "30,186 42,168 54,174 62,164 74,186", fill: "paper" },
      { kind: "polygon", points: "42,168 54,174 52,186 38,186", fill: "accent-soft", opacity: 0.85 },
      { kind: "polygon", points: "62,164 74,186 60,186", fill: "accent", opacity: 0.75 },
      { kind: "path", d: "M30 186 L74 186 L68 193 L36 193 Z", fill: "accent", opacity: 0.45 },

      // Right foreground monumental sculpted tabular/spire iceberg
      { kind: "polygon", points: "96,204 110,180 124,186 136,174 150,192 156,204", fill: "paper" },
      { kind: "polygon", points: "110,180 124,186 122,204 106,204", fill: "mid", opacity: 0.56 },
      { kind: "polygon", points: "136,174 150,192 156,204 132,204", fill: "accent", opacity: 0.72 },
      { kind: "path", d: "M96 204 L156 204 L148 212 L104 212 Z", fill: "paper", opacity: 0.34 },

      // Drifting brash ice floes & crisp dark-water ripple lines
      { kind: "polygon", points: "78,198 86,193 92,198", fill: "paper", opacity: 0.92 },
      { kind: "polygon", points: "44,208 54,202 64,208", fill: "paper", opacity: 0.9 },
      { kind: "line", x1: 24, y1: 186, x2: 80, y2: 186, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.82 },
      { kind: "line", x1: 90, y1: 204, x2: 162, y2: 204, stroke: "paper", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.84 },
      { kind: "line", x1: 32, y1: 218, x2: 138, y2: 218, stroke: "accent-soft", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.52 },
    ],
  },

  // =========================================================================
  // 4. KEFJ — Kenai Fjords National Park (AK)
  // =========================================================================
  {
    code: "KEFJ",
    subject: "Harding Icefield glacier tongue spilling past coastal fjord spires & breaching humpback whale fluke",
    accentLight: "#3B829E",
    accentDark: "#7EC2DC",
    skyMood: "mist",
    nodes: [
      // Plane 1: Misty Gulf of Alaska coastal sky & veiled pale sun
      { kind: "circle", cx: 48, cy: 32, r: 19, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 48, cy: 32, r: 10, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M16 44 Q58 38 106 45 Q64 49 16 44 Z", fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M98 30 Q130 24 164 31 Q134 35 98 30 Z", fill: "paper", opacity: 0.62 },

      // Plane 2: High gleaming Harding Icefield plateau & descending valley glacier
      {
        kind: "path",
        d: "M42 74 Q70 54 96 58 Q120 54 142 74 L138 144 L44 144 Z",
        fill: "paper",
      },
      // Sweeping crevasse & glacial flow striations down the descending ice tongue
      {
        kind: "path",
        d: "M64 68 C72 86 78 108 74 140 L108 140 C106 110 112 88 122 68 Q94 60 64 68 Z",
        fill: "accent-soft",
        opacity: 0.58,
      },
      { kind: "path", d: "M72 78 Q92 72 114 78", stroke: "accent", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.68 },
      { kind: "path", d: "M68 96 Q90 89 112 96", stroke: "mid", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.65 },
      { kind: "path", d: "M64 114 Q90 107 114 114", stroke: "accent", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.72 },
      { kind: "path", d: "M60 130 Q90 124 118 130", stroke: "ink", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.54 },

      // Plane 3: Dramatic dark coastal fjord spires, cliffs & drifting sea mist
      // Left soaring dark slate fjord headland
      {
        kind: "path",
        d: "M11 46 L26 42 L44 64 L54 94 L62 142 L11 146 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M11 58 L28 54 L40 84 L50 142 L11 146 Z",
        fill: "deep",
      },
      { kind: "path", d: "M26 42 L44 64 L54 94", stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.72 },
      // Right soaring coastal fjord cliff & needle sea stack
      {
        kind: "path",
        d: "M169 48 L152 44 L134 68 L122 98 L116 142 L169 146 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M169 62 L152 60 L138 92 L128 142 L169 146 Z",
        fill: "deep",
      },
      { kind: "path", d: "M152 44 L134 68 L122 98", stroke: "paper", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.68 },
      // Signature coastal spire sea stack rising near the right shore
      { kind: "polygon", points: "136,144 144,102 150,118 156,144", fill: "deep" },
      // Drifting marine fog ribbons hugging the fjord walls
      { kind: "path", d: "M14 108 Q44 102 74 110 Q46 116 14 108 Z", fill: "paper", opacity: 0.56 },
      { kind: "path", d: "M110 118 Q138 112 166 118 Q140 124 110 118 Z", fill: "paper", opacity: 0.52 },

      // Plane 4: Deep Pacific fjord water & HERO Breaching Humpback Whale Tail Fluke
      { kind: "rect", x: 11, y: 140, width: 158, height: 89, fill: "mid" },
      { kind: "rect", x: 11, y: 140, width: 158, height: 22, fill: "ink", opacity: 0.68 },
      { kind: "rect", x: 11, y: 186, width: 158, height: 43, fill: "ink", opacity: 0.58 },
      // Glacier waterline glare
      { kind: "line", x1: 56, y1: 142, x2: 122, y2: 142, stroke: "paper", strokeWidth: 1.8, opacity: 0.88 },

      // Concentric water ripples radiating around the diving humpback whale
      { kind: "ellipse", cx: 90, cy: 198, rx: 56, ry: 12, stroke: "paper", strokeWidth: 1.6, opacity: 0.82 },
      { kind: "ellipse", cx: 90, cy: 198, rx: 38, ry: 7.5, stroke: "accent-soft", strokeWidth: 1.6, opacity: 0.88 },
      { kind: "ellipse", cx: 90, cy: 198, rx: 22, ry: 4.2, fill: "paper", opacity: 0.68 },

      // HERO SILHOUETTE: Iconic Humpback Whale Fluke rising boldly above the fjord!
      // Sweeping dark fluke rising from tail stock with flared tips & crisp top central V-notch
      {
        kind: "path",
        d: "M82 198 C82 184 74 176 58 172 C48 168 42 160 38 150 C52 152 68 155 82 162 L90 170 L98 162 C112 155 128 152 142 150 C138 160 132 168 122 172 C106 176 98 184 98 198 Z",
        fill: "deep",
      },
      // Crisp bright white mottled humpback underside & scalloped trailing edge for razor monochrome pop!
      {
        kind: "path",
        d: "M46 154 C58 156 70 159 80 165 C70 170 58 168 46 154 Z",
        fill: "paper",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M134 154 C122 156 110 159 100 165 C110 170 122 168 134 154 Z",
        fill: "paper",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M38 150 C52 152 68 155 82 162 L90 170 L98 162 C112 155 128 152 142 150",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.92,
      },
      // Cascading white seawater droplets streaming off the lifted fluke tips
      {
        kind: "path",
        d: "M42 156 L42 174 M52 168 L52 182 M138 156 L138 174 M128 168 L128 182",
        stroke: "paper",
        strokeWidth: 1.3,
        strokeLinecap: "round",
        strokeDasharray: "2.5 3.5",
        opacity: 0.84,
      },

      // Plane 5: Foreground dark ocean swell framing the bottom corners
      { kind: "path", d: "M11 212 Q52 204 90 214 Q128 222 169 210 L169 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M18 214 Q52 208 86 215", stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.56 },
    ],
  },

  // =========================================================================
  // 5. WRST — Wrangell–St. Elias National Park (AK)
  // =========================================================================
  {
    code: "WRST",
    subject: "Mount Blackburn, striped medial-moraine Root Glacier & stepped red Kennecott Copper Mill",
    accentLight: "#C2593E",
    accentDark: "#EC8E75",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Crisp Alaskan dawn sky & sun glow
      { kind: "circle", cx: 144, cy: 34, r: 20, fill: "accent-soft", opacity: 0.4 },
      { kind: "circle", cx: 144, cy: 34, r: 10.5, fill: "accent", opacity: 0.88 },
      { kind: "path", d: "M18 26 Q48 21 80 26 Q56 30 18 26 Z", fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M104 22 Q128 18 156 23 Q132 26 104 22 Z", fill: "paper", opacity: 0.5 },

      // Plane 2: Wall-to-wall glaciated Wrangell–St. Elias super-peaks (Mount Blackburn 16,390 ft)
      {
        kind: "path",
        d: "M11 94 L32 50 L50 66 L76 32 L102 62 L124 44 L144 68 L160 56 L169 72 L169 124 L11 124 Z",
        fill: "ink",
      },
      // Blazing white glacial snowfields blanketing Mount Blackburn & flanking peaks
      {
        kind: "path",
        d: "M76 32 L58 68 L68 64 L74 78 L84 66 L94 78 L100 60 Z",
        fill: "paper",
        opacity: 0.96,
      },
      { kind: "polygon", points: "32,50 20,78 32,74 40,84 48,66", fill: "paper", opacity: 0.9 },
      { kind: "polygon", points: "124,44 110,72 122,68 130,80 140,66", fill: "paper", opacity: 0.92 },
      // Warm dawn alpenglow grazing the eastern faces
      { kind: "polygon", points: "76,32 100,60 90,72 79,50", fill: "accent-soft", opacity: 0.58 },
      { kind: "polygon", points: "124,44 140,66 130,74 125,56", fill: "accent-soft", opacity: 0.56 },
      // Dark steep shadowed arête ribs for razor-sharp monochrome structure
      { kind: "polygon", points: "76,32 68,64 56,88 74,78", fill: "deep", opacity: 0.62 },
      { kind: "polygon", points: "124,44 116,72 104,90 122,68", fill: "deep", opacity: 0.58 },

      // Plane 3: Sweeping converging Root / Kennicott Glacier highway with striped medial moraines
      {
        kind: "path",
        d: "M11 102 Q58 92 106 106 Q138 114 169 108 L169 164 L11 174 Z",
        fill: "paper",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M11 112 Q60 104 104 120 Q136 130 169 124 L169 164 L11 174 Z",
        fill: "far",
        opacity: 0.65,
      },
      // Iconic sweeping dark rocky medial-moraine bands striping the glacier
      {
        kind: "path",
        d: "M11 110 C48 108 78 122 104 144 C122 158 142 164 169 162",
        stroke: "deep",
        strokeWidth: 4.2,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M11 122 C44 122 72 136 96 158 C110 170 126 176 146 178",
        stroke: "ink",
        strokeWidth: 3.4,
        strokeLinecap: "round",
        opacity: 0.86,
      },
      {
        kind: "path",
        d: "M11 136 C38 138 64 150 86 172",
        stroke: "deep",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        opacity: 0.82,
      },
      {
        kind: "path",
        d: "M24 102 C60 102 92 114 124 134",
        stroke: "mid",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.72,
      },

      // Plane 4: Dark moraine hillside & Hero Stepped Historic Red Kennecott Copper Mill
      {
        kind: "path",
        d: "M64 229 L98 164 L132 134 L169 118 L169 229 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M78 229 L110 178 L142 154 L169 144 L169 229 Z",
        fill: "deep",
      },
      // Aerial tramway cable ascending above the mill
      { kind: "line", x1: 138, y1: 132, x2: 169, y2: 96, stroke: "deep", strokeWidth: 1.2, opacity: 0.72 },

      // HERO ARCHITECTURAL ICON: Iconic 14-story stepped Kennecott Mill silhouette
      // Main stepped timber mass cascading down the moraine slope (accent barn-red + deep outline!)
      {
        kind: "path",
        d: "M104 206 L104 176 L116 168 L116 154 L130 146 L130 132 L144 122 L158 132 L158 206 Z",
        fill: "accent",
        stroke: "deep",
        strokeWidth: 1.5,
        strokeLinejoin: "round",
      },
      // Crisp stepped gable roof snow/tin highlights
      {
        kind: "path",
        d: "M102 177 L116 168 L116 154 L130 146 L130 132 L144 122 L159 132",
        stroke: "paper",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      // Side structural shadow plane on the mill for strong 3D monochrome contrast
      { kind: "rect", x: 146, y: 130, width: 12, height: 76, fill: "deep", opacity: 0.45 },
      { kind: "line", x1: 116, y1: 168, x2: 116, y2: 204, stroke: "deep", strokeWidth: 1.2, opacity: 0.72 },
      { kind: "line", x1: 130, y1: 146, x2: 130, y2: 204, stroke: "deep", strokeWidth: 1.2, opacity: 0.72 },
      // Iconic white-framed rows of Kennecott Mill windows (razor-crisp in monochrome & color!)
      { kind: "rect", x: 135, y: 136, width: 8, height: 5, fill: "paper" },
      { kind: "rect", x: 135, y: 146, width: 8, height: 5, fill: "paper" },
      { kind: "rect", x: 120, y: 158, width: 8, height: 5, fill: "paper" },
      { kind: "rect", x: 135, y: 158, width: 8, height: 5, fill: "paper" },
      { kind: "rect", x: 120, y: 170, width: 8, height: 5, fill: "paper" },
      { kind: "rect", x: 135, y: 170, width: 8, height: 5, fill: "paper" },
      { kind: "rect", x: 108, y: 182, width: 7, height: 5, fill: "paper" },
      { kind: "rect", x: 120, y: 182, width: 8, height: 5, fill: "paper" },
      { kind: "rect", x: 135, y: 182, width: 8, height: 5, fill: "paper" },

      // Plane 5: Foreground glacial moraine bank & Alaskan spruce spires framing left & base
      { kind: "path", d: "M11 164 Q44 176 74 198 L169 204 L169 229 L11 229 Z", fill: "deep" },
      { kind: "polygon", points: "24,136 16,174 21,174 14,206 34,206 27,174 32,174", fill: "deep" },
      { kind: "polygon", points: "42,152 35,184 40,184 34,212 50,212 44,184 49,184", fill: "deep" },
      { kind: "polygon", points: "60,170 54,198 66,198", fill: "deep" },
    ],
  },

  // =========================================================================
  // 6. KATM — Katmai National Park (AK)
  // =========================================================================
  {
    code: "KATM",
    subject: "Brooks Falls brown bear, leaping sockeye salmon & Valley of Ten Thousand Smokes volcanoes",
    accentLight: "#B56442",
    accentDark: "#E49978",
    skyMood: "noon",
    nodes: [
      // Plane 1: Crisp Katmai sky, sun & distant rising volcanic fumarole plume
      { kind: "circle", cx: 38, cy: 32, r: 17, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 38, cy: 32, r: 9.5, fill: "paper", opacity: 0.96 },
      {
        kind: "path",
        d: "M122 66 C118 52 126 42 138 36 C150 30 160 36 156 46 C150 54 136 58 132 68 Z",
        fill: "paper",
        opacity: 0.72,
      },
      { kind: "path", d: "M58 26 Q82 21 108 26 Q86 30 58 26 Z", fill: "paper", opacity: 0.6 },

      // Plane 2: Distant volcanic Valley of Ten Thousand Smokes peaks
      {
        kind: "path",
        d: "M11 86 L34 66 L58 76 L88 58 L112 72 L128 60 L148 76 L169 68 L169 108 L11 108 Z",
        fill: "far",
      },
      { kind: "polygon", points: "88,58 78,76 88,72 96,78", fill: "paper", opacity: 0.86 },
      { kind: "polygon", points: "128,60 120,76 130,73 136,78", fill: "paper", opacity: 0.84 },

      // Plane 3: Continuous dense Katmai boreal spruce forest ridge
      {
        kind: "path",
        d: "M11 102 L18 88 L25 100 L33 84 L41 98 L49 86 L57 100 L66 86 L74 98 L84 88 L92 100 L102 86 L110 98 L119 84 L128 98 L137 86 L146 100 L155 86 L163 98 L169 90 L169 126 L11 126 Z",
        fill: "mid",
      },
      {
        kind: "path",
        d: "M11 114 L20 100 L29 112 L39 98 L48 112 L59 102 L68 114 L80 102 L90 114 L102 100 L112 112 L123 98 L134 114 L144 100 L154 112 L164 100 L169 110 L169 136 L11 136 Z",
        fill: "ink",
      },

      // Plane 4: Stepped Brooks Falls whitewater ledge, Hero Brown Bear & Leaping Sockeye Salmon
      // Upper smooth Brooks River lip approaching the falls
      { kind: "rect", x: 11, y: 124, width: 158, height: 18, fill: "mid" },
      { kind: "line", x1: 11, y1: 128, x2: 169, y2: 128, stroke: "paper", strokeWidth: 1.3, opacity: 0.62 },

      // Stepped horizontal rock ledge & plunging foaming whitewater curtain of Brooks Falls
      { kind: "rect", x: 11, y: 140, width: 158, height: 42, fill: "paper" },
      // Dark rock shelf peeking under the falls on the left where the bear stands
      { kind: "path", d: "M11 136 L98 136 L94 150 L72 154 L46 150 L11 152 Z", fill: "ink" },
      { kind: "path", d: "M11 142 L94 142 L90 156 L11 158 Z", fill: "deep", opacity: 0.72 },
      // Vertical cascading waterfall ribbons & grooves
      {
        kind: "path",
        d: "M24 154 L24 180 M44 152 L44 180 M64 154 L64 180 M84 152 L84 180 M104 140 L104 180 M118 140 L118 180 M132 140 L132 180 M146 140 L146 180 M160 140 L160 180",
        stroke: "far",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.75,
      },
      {
        kind: "path",
        d: "M96 140 L96 180 M111 140 L111 180 M125 140 L125 180 M139 140 L139 180 M153 140 L153 180",
        stroke: "mid",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.6,
      },
      // Churning whitewater boil at the base of Brooks Falls
      { kind: "rect", x: 11, y: 180, width: 158, height: 49, fill: "ink" },
      { kind: "ellipse", cx: 34, cy: 181, rx: 24, ry: 7, fill: "paper", opacity: 0.94 },
      { kind: "ellipse", cx: 78, cy: 182, rx: 28, ry: 8, fill: "paper", opacity: 0.96 },
      { kind: "ellipse", cx: 126, cy: 181, rx: 32, ry: 8.5, fill: "paper", opacity: 0.96 },
      { kind: "ellipse", cx: 160, cy: 182, rx: 18, ry: 6.5, fill: "paper", opacity: 0.92 },

      // HERO SILHOUETTE 1: Bold Katmai Brown Bear standing squarely atop Brooks Falls!
      // Subtle bright paper rim halo behind the bear's hump so it pops razor-sharp against the forest in grayscale
      {
        kind: "path",
        d: "M34 114 C40 104 54 102 64 98 C74 96 84 102 92 104",
        stroke: "paper",
        strokeWidth: 2.4,
        strokeLinecap: "round",
        opacity: 0.85,
      },
      // Massive anatomical grizzly body, pronounced shoulder hump, planted legs & open jaws
      {
        kind: "path",
        d: "M32 142 L34 124 C32 114 40 106 50 104 C58 102 64 97 72 98 C80 99 84 105 90 104 C93 102 96 104 95 108 L104 112 L102 117 L94 118 L103 122 L100 126 L88 125 L86 144 L78 144 L77 131 L64 132 L63 144 L55 144 L54 130 L43 131 L42 144 Z",
        fill: "deep",
      },
      // Warm sunlit coastal brown-bear fur rim highlight
      {
        kind: "path",
        d: "M38 115 C45 107 58 104 68 101 C76 100 84 105 90 107",
        stroke: "accent",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.85,
      },

      // HERO SILHOUETTE 2: Leaping Sockeye Salmon arcing mid-air out of the waterfall spray!
      // Curved splash arc trailing the leap
      {
        kind: "path",
        d: "M142 174 C146 154 140 138 126 128",
        stroke: "paper",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        strokeDasharray: "3 4",
        opacity: 0.9,
      },
      // Sleek curved sockeye salmon body + forked tail fin
      {
        kind: "path",
        d: "M108 122 C114 113 126 114 136 124 L144 122 L140 128 L146 135 L136 132 C128 125 118 123 108 122 Z",
        fill: "accent",
        stroke: "deep",
        strokeWidth: 1.5,
        strokeLinejoin: "round",
      },
      // Crisp bright silver-white salmon belly flash for unmistakable monochrome legibility
      {
        kind: "path",
        d: "M112 121 C119 118 127 120 134 126",
        stroke: "paper",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.94,
      },
      // Airborne spray droplets around the leaping salmon
      { kind: "circle", cx: 120, cy: 112, r: 1.4, fill: "paper", opacity: 0.92 },
      { kind: "circle", cx: 134, cy: 116, r: 1.3, fill: "paper", opacity: 0.9 },
      { kind: "circle", cx: 146, cy: 144, r: 1.5, fill: "paper", opacity: 0.88 },

      // Plane 5: Swirling lower Brooks River eddies & foreground boulders
      { kind: "path", d: "M38 198 Q68 192 98 199 T152 196", stroke: "paper", strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.72 },
      { kind: "path", d: "M52 212 Q88 206 124 214", stroke: "accent-soft", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.65 },
      { kind: "path", d: "M11 196 Q34 198 48 214 L56 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 200 Q146 202 132 216 L124 229 L169 229 Z", fill: "deep" },
      { kind: "ellipse", cx: 34, cy: 214, rx: 14, ry: 7, fill: "ink", opacity: 0.62 },
    ],
  },

  // =========================================================================
  // 7. LACL — Lake Clark National Park (AK)
  // =========================================================================
  {
    code: "LACL",
    subject: "Steaming Mount Redoubt volcano mirrored down elongated turquoise Lake Clark with gravel delta spits",
    accentLight: "#4B8E9C",
    accentDark: "#8ACBD9",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Crisp Cook Inlet dawn glow & buoyant volcanic steam plume
      { kind: "circle", cx: 42, cy: 36, r: 20, fill: "accent-soft", opacity: 0.38 },
      { kind: "circle", cx: 42, cy: 36, r: 10.5, fill: "paper", opacity: 0.94 },
      { kind: "path", d: "M124 28 Q144 24 164 29 Q146 32 124 28 Z", fill: "paper", opacity: 0.54 },
      // Graceful rising steam plume curling from Mount Redoubt's summit vent
      {
        kind: "path",
        d: "M87 46 C84 36 90 26 102 22 C116 18 134 22 142 30 C130 34 114 33 104 38 C98 41 96 44 94 46 Z",
        fill: "paper",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M89 46 C90 38 98 32 110 30 C120 28 128 30 134 32",
        stroke: "accent-soft",
        strokeWidth: 2,
        strokeLinecap: "round",
        opacity: 0.65,
      },

      // Plane 2: Hero — Graceful snow-clad steaming Mount Redoubt / Iliamna stratovolcano
      {
        kind: "path",
        d: "M26 128 L54 84 L74 56 L84 44 L96 44 L106 56 L126 84 L154 128 Z",
        fill: "ink",
      },
      // Blazing white glacial ice mantle draped across the volcanic cone
      {
        kind: "path",
        d: "M74 56 L84 44 L96 44 L106 56 L124 84 L112 88 L104 76 L96 92 L88 78 L80 92 L72 78 L62 88 L56 84 Z",
        fill: "paper",
        opacity: 0.96,
      },
      // Dawn light & sharp volcanic rib shadows
      { kind: "polygon", points: "84,44 74,56 60,84 74,78 86,58", fill: "accent-soft", opacity: 0.56 },
      { kind: "polygon", points: "96,44 106,56 120,84 108,82 96,60", fill: "deep", opacity: 0.45 },
      { kind: "polygon", points: "88,54 84,78 93,76", fill: "deep", opacity: 0.62 },

      // Plane 3: Steep forested Chigmit Mountain shores pinching Lake Clark
      { kind: "path", d: "M11 76 L34 84 L58 106 L74 128 L11 132 Z", fill: "mid" },
      { kind: "path", d: "M169 78 L146 86 L122 106 L106 128 L169 132 Z", fill: "mid" },
      { kind: "path", d: "M11 94 L38 104 L62 126 L70 140 L11 142 Z", fill: "ink" },
      { kind: "path", d: "M169 96 L142 104 L118 126 L110 140 L169 142 Z", fill: "ink" },
      { kind: "path", d: "M11 94 L38 104 L62 126", stroke: "paper", strokeWidth: 1.3, opacity: 0.58 },
      { kind: "path", d: "M169 96 L142 104 L118 126", stroke: "paper", strokeWidth: 1.3, opacity: 0.52 },

      // Plane 4: Elongated turquoise Lake Clark corridor, volcano mirror & gravel delta spits
      { kind: "rect", x: 11, y: 128, width: 158, height: 101, fill: "accent" },
      // Deep shore reflection bands flanking the bright turquoise central corridor
      { kind: "path", d: "M11 128 L70 128 L44 229 L11 229 Z", fill: "ink", opacity: 0.72 },
      { kind: "path", d: "M169 128 L110 128 L136 229 L169 229 Z", fill: "ink", opacity: 0.72 },
      // Smooth inverted volcano cone reflection down the center of Lake Clark
      { kind: "polygon", points: "64,132 116,132 104,174 96,198 84,198 76,174", fill: "ink", opacity: 0.48 },
      { kind: "polygon", points: "74,158 106,158 96,198 84,198", fill: "paper", opacity: 0.78 },
      // Crisp horizontal glacial-lake ripples
      { kind: "line", x1: 58, y1: 142, x2: 122, y2: 142, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.68 },
      { kind: "line", x1: 52, y1: 156, x2: 128, y2: 156, stroke: "deep", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.42 },
      { kind: "line", x1: 62, y1: 172, x2: 118, y2: 172, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.72 },
      { kind: "line", x1: 68, y1: 188, x2: 112, y2: 188, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.68 },
      { kind: "line", x1: 56, y1: 208, x2: 124, y2: 208, stroke: "accent-soft", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.62 },

      // Signature glacial-river gravel delta spits jutting cleanly into Lake Clark
      { kind: "path", d: "M11 154 L46 164 L64 170 L42 174 L11 172 Z", fill: "deep" },
      { kind: "path", d: "M24 162 L64 170 L44 173 Z", fill: "far", opacity: 0.85 },
      { kind: "path", d: "M169 174 L132 184 L114 190 L138 194 L169 192 Z", fill: "deep" },
      { kind: "path", d: "M154 182 L114 190 L136 193 Z", fill: "far", opacity: 0.85 },

      // Plane 5: Foreground dark Chigmit shore & Alaskan spruce silhouettes
      { kind: "path", d: "M11 196 Q38 206 58 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 198 Q142 206 122 229 L169 229 Z", fill: "deep" },
      { kind: "polygon", points: "22,158 15,190 20,190 13,218 31,218 24,190 29,190", fill: "deep" },
      { kind: "polygon", points: "157,160 150,192 155,192 148,218 166,218 159,192 164,192", fill: "deep" },
    ],
  },

  // =========================================================================
  // 8. CRLA — Crater Lake National Park (OR)
  // =========================================================================
  {
    code: "CRLA",
    subject: "Deep sapphire Mount Mazama caldera lake, snow-streaked caldera rim & Wizard Island cinder cone",
    accentLight: "#2C6EA8",
    accentDark: "#6FAEE6",
    skyMood: "noon",
    nodes: [
      // Plane 1: High-altitude Cascade noon sky, bright sun & crisp clouds
      { kind: "circle", cx: 136, cy: 32, r: 17, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 136, cy: 32, r: 9.5, fill: "paper", opacity: 0.96 },
      { kind: "path", d: "M18 28 Q44 22 72 28 Q50 32 18 28 Z", fill: "paper", opacity: 0.72 },
      { kind: "path", d: "M88 38 Q106 34 122 38 Q106 41 88 38 Z", fill: "paper", opacity: 0.56 },

      // Plane 2: Encircling Mount Mazama caldera rim wall (including flat-topped Llao Rock)
      {
        kind: "path",
        d: "M11 72 L30 62 L48 68 L62 60 L88 60 L104 68 L124 62 L144 68 L169 60 L169 124 L11 124 Z",
        fill: "ink",
      },
      // Steep plunging inner caldera cliff facets curving around the lake bowl
      {
        kind: "path",
        d: "M11 72 L30 62 L48 68 L62 60 L88 60 L96 76 L112 96 L92 108 L58 108 L26 116 L11 122 Z",
        fill: "mid",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M124 62 L144 68 L169 60 L169 124 L138 112 L118 98 Z",
        fill: "deep",
        opacity: 0.55,
      },
      // Crisp vertical snow couloirs & avalanche chutes streaking the caldera wall
      { kind: "polygon", points: "30,66 26,98 35,96", fill: "paper", opacity: 0.82 },
      { kind: "polygon", points: "54,70 50,104 60,102", fill: "paper", opacity: 0.78 },
      { kind: "polygon", points: "74,64 70,96 80,96", fill: "paper", opacity: 0.74 },
      { kind: "polygon", points: "110,70 106,100 116,100", fill: "paper", opacity: 0.78 },
      { kind: "polygon", points: "136,68 132,102 142,102", fill: "paper", opacity: 0.82 },
      { kind: "polygon", points: "156,66 152,100 162,102", fill: "paper", opacity: 0.76 },
      // Sunlit upper caldera rim edge
      {
        kind: "path",
        d: "M11 72 L30 62 L48 68 L62 60 L88 60 L104 68 L124 62 L144 68 L169 60",
        stroke: "paper",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        opacity: 0.86,
      },

      // Plane 3: Hero — Deep Sapphire Oval Caldera Basin (1,949 ft deep!)
      {
        kind: "path",
        d: "M11 118 Q48 102 90 102 Q132 102 169 118 L169 224 L11 224 Z",
        fill: "accent",
      },
      // Deep royal-blue central caldera abyss ring
      { kind: "ellipse", cx: 90, cy: 162, rx: 68, ry: 44, fill: "ink", opacity: 0.52 },
      { kind: "ellipse", cx: 92, cy: 168, rx: 50, ry: 30, fill: "accent", opacity: 0.72 },
      { kind: "ellipse", cx: 92, cy: 170, rx: 32, ry: 17, fill: "accent-soft", opacity: 0.28 },
      // Soft inverted caldera rim reflections along the far shoreline
      {
        kind: "path",
        d: "M18 116 Q54 106 90 106 Q126 106 162 116 L154 128 Q90 120 26 128 Z",
        fill: "deep",
        opacity: 0.36,
      },

      // HERO LANDMARK — Symmetrical Wizard Island volcanic cinder cone + tiny summit crater!
      // Dark lava-flow apron & main truncated cone body
      {
        kind: "path",
        d: "M42 156 L54 148 L68 122 L76 120 L84 122 L98 148 L112 156 Q77 162 42 156 Z",
        fill: "deep",
      },
      // Sunlit eastern cone slope for sculptural 3D relief
      {
        kind: "path",
        d: "M76 120 L84 122 L98 148 L110 155 L78 157 L78 126 Z",
        fill: "ink",
        opacity: 0.78,
      },
      // Distinct tiny recessed summit crater rim on Wizard Island!
      { kind: "ellipse", cx: 76, cy: 121.5, rx: 7.5, ry: 2.2, fill: "accent-soft", stroke: "paper", strokeWidth: 1.1 },
      { kind: "ellipse", cx: 76, cy: 121.8, rx: 4, ry: 1.1, fill: "deep" },
      // Subtle inverted Wizard Island reflection in the glassy blue water
      {
        kind: "path",
        d: "M48 158 L106 158 L90 176 L76 184 L62 176 Z",
        fill: "deep",
        opacity: 0.4,
      },

      // Secondary iconic landmark: Jagged Phantom Ship volcanic spire on right side of lake
      { kind: "polygon", points: "136,158 140,144 144,150 148,140 152,158", fill: "deep" },
      { kind: "line", x1: 132, y1: 158, x2: 156, y2: 158, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.8 },

      // Crisp glassy sapphire lake wind-lane highlights
      { kind: "line", x1: 36, y1: 158, x2: 118, y2: 158, stroke: "paper", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.82 },
      { kind: "line", x1: 52, y1: 174, x2: 136, y2: 174, stroke: "paper", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.68 },
      { kind: "line", x1: 42, y1: 190, x2: 142, y2: 190, stroke: "accent-soft", strokeWidth: 1.5, strokeLinecap: "round", opacity: 0.64 },
      { kind: "line", x1: 60, y1: 204, x2: 124, y2: 204, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.54 },

      // Plane 5: Elevated foreground rim overlook & mountain hemlock silhouettes
      { kind: "path", d: "M11 190 Q42 204 72 222 L108 222 Q138 204 169 190 L169 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M11 190 Q42 204 72 222", stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.58 },
      { kind: "path", d: "M169 190 Q138 204 108 222", stroke: "accent-soft", strokeWidth: 1.4, opacity: 0.58 },
      // Subalpine mountain hemlock framing the rim overlook
      { kind: "polygon", points: "22,138 14,174 19,174 12,208 32,208 25,174 30,174", fill: "deep" },
      { kind: "polygon", points: "158,142 150,176 155,176 148,208 168,208 161,176 166,176", fill: "deep" },
    ],
  },

  // =========================================================================
  // 9. LAVO — Lassen Volcanic National Park (CA)
  // =========================================================================
  {
    code: "LAVO",
    subject: "Lassen Peak volcanic plug dome behind steaming Bumpass Hell hydrothermal turquoise pools",
    accentLight: "#C96A36",
    accentDark: "#EE9D6C",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Dawn sun & glowing Cascade clouds
      { kind: "circle", cx: 38, cy: 36, r: 20, fill: "accent-soft", opacity: 0.4 },
      { kind: "circle", cx: 38, cy: 36, r: 10.5, fill: "accent", opacity: 0.9 },
      { kind: "path", d: "M96 28 Q126 22 158 28 Q132 32 96 28 Z", fill: "paper", opacity: 0.64 },
      { kind: "path", d: "M64 42 Q84 37 104 42 Q84 45 64 42 Z", fill: "paper", opacity: 0.48 },

      // Plane 2: Flanking distant Cascade ridges (Brokeoff & Chaos Crags shoulders)
      { kind: "path", d: "M11 106 L34 86 L58 98 L128 96 L150 84 L169 102 L169 138 L11 138 Z", fill: "far" },

      // Plane 3: Hero — Broad rugged plug-dome volcano of Lassen Peak (distinct rounded blocky crown & sweeping talus aprons!)
      {
        kind: "path",
        d: "M14 134 L42 96 L56 66 L68 50 L82 46 L98 46 L112 52 L124 68 L138 96 L166 134 Z",
        fill: "ink",
      },
      // Sunlit western craggy dacite face catching warm dawn light
      {
        kind: "path",
        d: "M56 66 L68 50 L82 46 L90 46 L86 84 L74 114 L38 118 L42 96 Z",
        fill: "accent",
        opacity: 0.44,
      },
      // Deep shadowed eastern crag wall & blocky dome fissures
      {
        kind: "path",
        d: "M96 46 L112 52 L124 68 L138 96 L158 128 L108 126 L102 82 Z",
        fill: "deep",
        opacity: 0.52,
      },
      // Lingering white alpine snowfields tucked into the plug-dome couloirs
      { kind: "polygon", points: "68,50 82,46 86,66 72,72 62,64", fill: "paper", opacity: 0.92 },
      { kind: "polygon", points: "92,48 106,54 110,74 96,70", fill: "paper", opacity: 0.86 },
      { kind: "polygon", points: "56,74 68,80 60,96 48,92", fill: "paper", opacity: 0.78 },
      // Sweeping radial volcanic talus apron striations flanking Lassen Peak
      {
        kind: "path",
        d: "M42 96 L24 128 M56 96 L44 128 M124 96 L138 128 M138 96 L156 128",
        stroke: "paper",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.46,
      },

      // Plane 4: Subalpine conifer treeline & Hero Steaming Bumpass Hell Hydrothermal Basin
      {
        kind: "path",
        d: "M11 134 L19 120 L27 132 L36 118 L44 132 L54 122 L64 134 L76 124 L86 134 L98 124 L108 134 L118 120 L127 132 L136 118 L146 132 L155 120 L164 132 L169 124 L169 144 L11 144 Z",
        fill: "deep",
      },
      // Bleached sulfur-clay hydrothermal basin floor of Bumpass Hell
      { kind: "path", d: "M11 142 Q90 136 169 142 L169 229 L11 229 Z", fill: "far" },
      { kind: "path", d: "M11 156 Q56 148 96 154 Q134 148 169 156 L169 229 L11 229 Z", fill: "mid", opacity: 0.56 },
      // Warm iron-oxide & sulfur mineral crust banks around the pools
      { kind: "ellipse", cx: 90, cy: 184, rx: 64, ry: 22, fill: "accent-soft", opacity: 0.72 },
      { kind: "ellipse", cx: 90, cy: 184, rx: 52, ry: 16.5, fill: "paper", opacity: 0.92 },
      // Main boiling mineral turquoise/indigo thermal pool
      { kind: "ellipse", cx: 90, cy: 184, rx: 43, ry: 12.5, fill: "ink" },
      { kind: "ellipse", cx: 90, cy: 184, rx: 28, ry: 7.5, fill: "deep", opacity: 0.78 },
      { kind: "ellipse", cx: 88, cy: 184, rx: 14, ry: 3.4, fill: "accent-soft", opacity: 0.56 },
      // Secondary steaming foreground fumarole pool & mudpot
      { kind: "ellipse", cx: 48, cy: 204, rx: 16, ry: 5.2, fill: "paper", opacity: 0.9 },
      { kind: "ellipse", cx: 48, cy: 204, rx: 11, ry: 3.4, fill: "ink" },
      { kind: "ellipse", cx: 136, cy: 202, rx: 14, ry: 4.6, fill: "accent", opacity: 0.75 },
      { kind: "ellipse", cx: 136, cy: 202, rx: 8.5, ry: 2.6, fill: "deep" },

      // Unmistakable rising white hydrothermal steam & vapor ribbons drifting up across the dark pines!
      {
        kind: "path",
        d: "M74 182 C68 166 78 152 72 136 C68 124 76 112 82 104",
        stroke: "paper",
        strokeWidth: 5.4,
        strokeLinecap: "round",
        opacity: 0.84,
      },
      {
        kind: "path",
        d: "M94 182 C100 164 88 148 96 130 C102 116 112 104 106 92",
        stroke: "paper",
        strokeWidth: 6.4,
        strokeLinecap: "round",
        opacity: 0.9,
      },
      {
        kind: "path",
        d: "M114 180 C120 166 112 152 122 138 C128 128 134 120 132 110",
        stroke: "paper",
        strokeWidth: 4.4,
        strokeLinecap: "round",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M48 202 C44 188 52 178 48 166",
        stroke: "paper",
        strokeWidth: 3.8,
        strokeLinecap: "round",
        opacity: 0.82,
      },
      {
        kind: "path",
        d: "M94 182 C100 164 88 148 96 130 C102 116 112 104 106 92",
        stroke: "accent-soft",
        strokeWidth: 2,
        strokeLinecap: "round",
        opacity: 0.62,
      },

      // Plane 5: Foreground dark volcanic boulder rim framing bottom corners
      { kind: "path", d: "M11 200 Q34 210 56 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 198 Q144 208 124 229 L169 229 Z", fill: "deep" },
      { kind: "line", x1: 60, y1: 218, x2: 120, y2: 218, stroke: "deep", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.48 },
    ],
  },

  // =========================================================================
  // 10. HALE — Haleakalā National Park (HI)
  // =========================================================================
  {
    code: "HALE",
    subject: "Haleakalā sunrise bursting above billowing cloud sea, Mars-like cinder cones & Maui silversword",
    accentLight: "#D16A3E",
    accentDark: "#F29D76",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Radiant "House of the Sun" sunrise bursting above the cloud sea!
      { kind: "circle", cx: 90, cy: 68, r: 42, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 90, cy: 68, r: 26, fill: "accent-soft", opacity: 0.54 },
      // Dramatic radiating sunrise beams fanning across the summit sky
      { kind: "line", x1: 90, y1: 42, x2: 90, y2: 16, stroke: "paper", strokeWidth: 1.8, strokeLinecap: "round", opacity: 0.72 },
      { kind: "line", x1: 72, y1: 46, x2: 52, y2: 18, stroke: "accent-soft", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.68 },
      { kind: "line", x1: 108, y1: 46, x2: 128, y2: 18, stroke: "accent-soft", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.68 },
      { kind: "line", x1: 58, y1: 56, x2: 24, y2: 32, stroke: "paper", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.62 },
      { kind: "line", x1: 122, y1: 56, x2: 156, y2: 32, stroke: "paper", strokeWidth: 1.4, strokeLinecap: "round", opacity: 0.62 },
      { kind: "line", x1: 50, y1: 68, x2: 16, y2: 56, stroke: "accent-soft", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.52 },
      { kind: "line", x1: 130, y1: 68, x2: 164, y2: 56, stroke: "accent-soft", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.52 },
      { kind: "circle", cx: 90, cy: 68, r: 15.5, fill: "accent", opacity: 0.94 },
      { kind: "circle", cx: 90, cy: 68, r: 9.5, fill: "paper", opacity: 0.96 },

      // Plane 2: Far dark Haleakalā crater rim & continuous billowing white sea of clouds
      { kind: "path", d: "M11 72 L46 68 L64 80 L116 80 L136 66 L169 72 L169 108 L11 108 Z", fill: "ink" },
      // Billowing continuous cloud-inversion sea spilling across the 10,000-ft horizon
      {
        kind: "path",
        d: "M11 94 Q24 80 40 88 Q54 74 72 86 Q90 74 108 86 Q126 74 142 88 Q156 80 169 92 L169 124 L11 124 Z",
        fill: "paper",
      },
      // Warm sunrise rim-light kissing the cloud tops & soft cloud belly shadows
      {
        kind: "path",
        d: "M11 94 Q24 80 40 88 Q54 74 72 86 Q90 74 108 86 Q126 74 142 88 Q156 80 169 92",
        stroke: "accent-soft",
        strokeWidth: 2,
        strokeLinecap: "round",
        opacity: 0.8,
      },
      {
        kind: "path",
        d: "M11 108 Q34 98 58 106 Q86 96 116 106 Q142 98 169 108 L169 126 L11 126 Z",
        fill: "far",
        opacity: 0.64,
      },

      // Plane 3: Hero — Vast Mars-like Haleakalā Crater basin & eroded volcanic cinder cones
      { kind: "path", d: "M11 118 Q54 110 90 116 Q128 110 169 118 L169 194 L11 194 Z", fill: "mid" },
      // Far background cinder cone inside the crater floor
      { kind: "path", d: "M72 136 L86 114 L98 114 L112 136 Z", fill: "ink", opacity: 0.78 },
      { kind: "ellipse", cx: 92, cy: 114.5, rx: 6, ry: 1.6, fill: "deep", opacity: 0.7 },

      // Left-center hero eroded cinder cone (Puʻu o Maui)
      { kind: "path", d: "M16 164 L44 120 L64 120 L92 164 Z", fill: "ink" },
      { kind: "path", d: "M54 120 L64 120 L92 164 L58 164 Z", fill: "accent", opacity: 0.74 },
      { kind: "path", d: "M16 164 L44 120 L54 120 L50 164 Z", fill: "deep", opacity: 0.76 },
      { kind: "ellipse", cx: 54, cy: 120.5, rx: 10, ry: 2.6, fill: "deep", stroke: "paper", strokeWidth: 1.1 },
      { kind: "path", d: "M58 124 L68 158 M64 124 L80 158 M44 124 L32 158", stroke: "paper", strokeWidth: 1.1, opacity: 0.54 },

      // Right hero rusted cinder cone (Ka Luʻu o ka ʻŌʻō)
      { kind: "path", d: "M96 168 L120 128 L138 128 L164 168 Z", fill: "ink" },
      { kind: "path", d: "M96 168 L120 128 L129 128 L122 168 Z", fill: "accent", opacity: 0.68 },
      { kind: "path", d: "M129 128 L138 128 L164 168 L126 168 Z", fill: "deep", opacity: 0.78 },
      { kind: "ellipse", cx: 129, cy: 128.5, rx: 9, ry: 2.4, fill: "deep", stroke: "paper", strokeWidth: 1.1 },
      // Sweeping red volcanic ash ridges across the crater floor
      { kind: "path", d: "M11 162 Q54 154 94 164 Q132 156 169 166 L169 196 L11 196 Z", fill: "ink", opacity: 0.82 },
      { kind: "path", d: "M11 162 Q54 154 94 164 Q132 156 169 166", stroke: "accent-soft", strokeWidth: 1.6, opacity: 0.68 },

      // Plane 4 & 5: Foreground dark basalt summit ridge & Hero Sculptural Maui Silversword (ʻĀhinahina)
      { kind: "path", d: "M11 178 Q50 184 86 196 Q128 176 169 180 L169 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M11 194 Q48 198 78 214", stroke: "ink", strokeWidth: 2, opacity: 0.65 },

      // HERO FOREGROUND BOTANICAL ICON: Spiky silvery-white Haleakalā Silversword rosette!
      // Glowing dark-contrasted core + radiating dagger-like silvery blades (pops brilliantly in monochrome & color!)
      { kind: "circle", cx: 126, cy: 196, r: 19, fill: "accent", opacity: 0.28 },
      // Radiating pointed silversword blades (outer starburst ring)
      {
        kind: "path",
        d: "M126 196 L126 171 M126 196 L136 173 M126 196 L145 179 M126 196 L151 188 M126 196 L152 198 M126 196 L147 207 M126 196 L139 213 M126 196 L126 215 M126 196 L113 213 M126 196 L105 207 M126 196 L100 198 M126 196 L101 188 M126 196 L107 179 M126 196 L116 173",
        stroke: "paper",
        strokeWidth: 2.3,
        strokeLinecap: "round",
      },
      // Inner shorter angled silversword blades for dense sculptural rosette depth
      {
        kind: "path",
        d: "M126 196 L131 178 M126 196 L142 184 M126 196 L144 196 M126 196 L138 206 M126 196 L114 206 M126 196 L108 196 M126 196 L110 184 M126 196 L121 178",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.94,
      },
      { kind: "circle", cx: 126, cy: 196, r: 5.5, fill: "paper" },
      { kind: "circle", cx: 126, cy: 196, r: 2.4, fill: "deep", opacity: 0.72 },
      // Smaller companion silversword bud on left ridge slope
      {
        kind: "path",
        d: "M38 206 L38 195 M38 206 L46 198 M38 206 L48 206 M38 206 L30 198 M38 206 L28 206 M38 206 L43 212 M38 206 L33 212",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.85,
      },
    ],
  },

  // =========================================================================
  // 11. YELL — Yellowstone National Park (WY / MT / ID)
  // =========================================================================
  {
    code: "YELL",
    subject: "Old Faithful soaring white steam geyser & Grand Prismatic concentric thermal terrace rings",
    accentLight: "#D98A2B",
    accentDark: "#F5B85E",
    skyMood: "dawn",
    nodes: [
      // Plane 1: Golden Yellowstone dawn sky & open morning clouds
      { kind: "circle", cx: 140, cy: 38, r: 22, fill: "accent-soft", opacity: 0.42 },
      { kind: "circle", cx: 140, cy: 38, r: 11.5, fill: "accent", opacity: 0.9 },
      { kind: "circle", cx: 140, cy: 38, r: 6, fill: "paper", opacity: 0.8 },
      { kind: "path", d: "M18 32 Q42 26 66 32 Q46 36 18 32 Z", fill: "paper", opacity: 0.62 },
      { kind: "path", d: "M118 54 Q140 49 164 54 Q144 58 118 54 Z", fill: "paper", opacity: 0.48 },

      // Plane 2: Distant Yellowstone caldera rim plateaus & continuous lodgepole pine ridge
      { kind: "path", d: "M11 104 Q48 86 90 96 Q132 84 169 102 L169 138 L11 138 Z", fill: "far" },
      {
        kind: "path",
        d: "M11 122 L18 108 L25 120 L33 106 L41 118 L49 108 L57 120 L66 110 L74 122 L106 122 L114 110 L122 120 L131 106 L139 118 L148 106 L156 118 L164 108 L169 116 L169 144 L11 144 Z",
        fill: "ink",
      },
      {
        kind: "path",
        d: "M11 132 L22 118 L32 132 L44 120 L54 134 L66 124 L76 138 L104 138 L116 124 L126 134 L138 118 L148 132 L159 118 L169 130 L169 148 L11 148 Z",
        fill: "deep",
      },

      // Plane 3: Hero Upper — Monumental Soaring Old Faithful Geyser Column
      // Outer sunlit feathery steam halo widening high into the golden morning sky
      {
        kind: "path",
        d: "M82 140 C78 112 72 86 70 60 C68 40 76 24 90 20 C106 16 118 28 116 48 C114 66 106 86 102 114 L98 140 Z",
        fill: "accent-soft",
        opacity: 0.56,
      },
      // Blazing tall white feathery geyser water & steam column drifting gently right
      {
        kind: "path",
        d: "M84 142 C82 114 78 88 76 62 C75 44 82 26 92 22 C103 20 112 32 108 48 C114 54 112 66 104 72 C108 82 104 94 98 102 C100 116 98 128 96 142 Z",
        fill: "paper",
        opacity: 0.98,
      },
      // High detached wind-blown geyser steam tufts
      { kind: "ellipse", cx: 112, cy: 36, rx: 10, ry: 6, fill: "paper", opacity: 0.78 },
      { kind: "ellipse", cx: 122, cy: 44, rx: 8, ry: 4.5, fill: "paper", opacity: 0.58 },
      // Pressurized central vertical water-jet core & shadow flute
      {
        kind: "path",
        d: "M87 142 C87 110 86 78 90 36 C94 78 93 110 93 142 Z",
        fill: "mid",
        opacity: 0.34,
      },
      { kind: "line", x1: 90, y1: 140, x2: 90, y2: 46, stroke: "paper", strokeWidth: 2, strokeLinecap: "round", opacity: 0.95 },
      // Low sloped siliceous sinter geyser cone mound at the eruption base
      { kind: "path", d: "M64 146 Q90 132 116 146 Z", fill: "far" },
      { kind: "path", d: "M72 146 Q90 137 108 146", stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.88 },

      // Plane 4: Hero Foreground — Grand Prismatic Spring Concentric Mineral Terrace Rings!
      { kind: "path", d: "M11 144 Q90 138 169 144 L169 229 L11 229 Z", fill: "mid" },
      // Organic golden-ochre mineral runoff channels fanning out from Grand Prismatic
      {
        kind: "path",
        d: "M42 204 C36 212 28 218 22 229 M64 210 C60 218 54 222 50 229 M116 210 C122 218 128 222 134 229 M138 204 C146 212 152 218 158 229",
        stroke: "accent",
        strokeWidth: 4.2,
        strokeLinecap: "round",
        opacity: 0.82,
      },
      {
        kind: "path",
        d: "M52 208 C48 216 42 222 38 229 M128 208 C134 216 140 222 146 229",
        stroke: "accent-soft",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.84,
      },
      // Concentric glowing thermal rings (burnt-amber outer -> gold -> pale mineral rim -> deep sapphire vent)
      { kind: "ellipse", cx: 90, cy: 186, rx: 70, ry: 27, fill: "accent", opacity: 0.92 },
      { kind: "ellipse", cx: 90, cy: 186, rx: 56, ry: 20.5, fill: "accent-soft", opacity: 0.96 },
      { kind: "ellipse", cx: 90, cy: 186, rx: 42, ry: 14.5, fill: "paper", opacity: 0.95 },
      { kind: "ellipse", cx: 90, cy: 186, rx: 28, ry: 9.2, fill: "ink" },
      { kind: "ellipse", cx: 90, cy: 186, rx: 16, ry: 5, fill: "deep" },
      // Crisp mineral terrace contour lines emphasizing the concentric rings in both color & monochrome
      { kind: "ellipse", cx: 90, cy: 186, rx: 63, ry: 23.5, stroke: "deep", strokeWidth: 1, opacity: 0.36 },
      { kind: "ellipse", cx: 90, cy: 186, rx: 49, ry: 17.5, stroke: "accent", strokeWidth: 1.2, opacity: 0.56 },
      // Delicate thermal steam ribbons curling upward off Grand Prismatic
      { kind: "path", d: "M64 176 C60 166 66 158 62 150", stroke: "paper", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.78 },
      { kind: "path", d: "M116 176 C120 166 114 158 118 150", stroke: "paper", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.78 },

      // Plane 5: Foreground dark sinter terrace corners & lodgepole pine tips framing the base
      { kind: "path", d: "M11 206 Q26 214 38 229 L11 229 Z", fill: "deep" },
      { kind: "path", d: "M169 206 Q154 214 142 229 L169 229 Z", fill: "deep" },
      { kind: "polygon", points: "19,182 13,210 25,210", fill: "deep" },
      { kind: "polygon", points: "161,182 155,210 167,210", fill: "deep" },
    ],
  },
] as const
