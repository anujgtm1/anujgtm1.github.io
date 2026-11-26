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
    subject: "Sheer Painted Wall V-chasm, pale pegmatite dragon veins & Gunnison River",
    accentLight: "#B85C6E",
    accentDark: "#E899A8",
    skyMood: "noon",
    nodes: [
      // Plane 1: Tight high-noon zenith sun & piercing canyon sunbeam
      { kind: "circle", cx: 92, cy: 31, r: 17, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 92, cy: 31, r: 9.5, fill: "paper", opacity: 0.94 },
      { kind: "polygon", points: "83,34 101,34 114,226 68,226", fill: "accent-soft", opacity: 0.22 },
      { kind: "polygon", points: "88,36 96,36 102,226 80,226", fill: "paper", opacity: 0.24 },

      // Plane 2: Distant receding inner chasm walls inside the narrow V-throat
      { kind: "path", d: "M64 62 L84 96 L88 186 L64 190 Z", fill: "far", opacity: 0.85 },
      { kind: "path", d: "M120 58 L98 94 L94 186 L120 190 Z", fill: "mid", opacity: 0.8 },

      // Plane 3: Hero towering near-vertical V-chasm walls (Painted Wall)
      // Left sheer Precambrian gneiss monolith
      {
        kind: "path",
        d: "M12 12 L52 12 L62 42 L68 78 L75 118 L79 162 L83 204 L74 228 L12 228 Z",
        fill: "deep",
      },
      // Left inner craggy facet catching noon bounce light
      {
        kind: "path",
        d: "M46 12 L52 12 L62 42 L68 78 L75 118 L79 162 L83 204 L72 202 L66 154 L58 106 L52 60 Z",
        fill: "ink",
        opacity: 0.72,
      },
      // Right sheer Painted Wall face
      {
        kind: "path",
        d: "M168 12 L134 12 L124 46 L116 86 L109 130 L103 176 L99 206 L108 228 L168 228 Z",
        fill: "deep",
      },
      // Right angular sculpted rock rib
      {
        kind: "path",
        d: "M142 12 L134 12 L124 46 L116 86 L109 130 L103 176 L114 180 L122 132 L130 88 L138 48 Z",
        fill: "ink",
        opacity: 0.78,
      },

      // Iconic pale jagged pegmatite "dragon veins" crisscrossing both sheer gneiss faces
      // Right Painted Wall primary dragon vein
      {
        kind: "path",
        d: "M166 56 L146 68 L152 80 L126 98 L134 112 L110 132 L119 144 L104 166",
        stroke: "accent-soft",
        strokeWidth: 3.4,
        strokeLinecap: "round",
        strokeLinejoin: "miter",
        opacity: 0.92,
      },
      {
        kind: "path",
        d: "M166 56 L146 68 L152 80 L126 98 L134 112 L110 132 L119 144 L104 166",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        strokeLinejoin: "miter",
        opacity: 0.92,
      },
      // Right secondary intersecting pegmatite dike
      {
        kind: "path",
        d: "M118 82 L140 94 L132 106 L160 124 L148 140 L166 156",
        stroke: "accent",
        strokeWidth: 2.2,
        strokeLinecap: "round",
        opacity: 0.85,
      },
      {
        kind: "path",
        d: "M164 116 L138 136 L144 150 L116 174 L124 188 L106 204",
        stroke: "accent-soft",
        strokeWidth: 2,
        strokeLinecap: "round",
        opacity: 0.78,
      },
      // Left gneiss cliff jagged pegmatite veins
      {
        kind: "path",
        d: "M16 74 L38 88 L32 102 L58 120 L50 136 L74 156",
        stroke: "accent-soft",
        strokeWidth: 3,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M16 74 L38 88 L32 102 L58 120 L50 136 L74 156",
        stroke: "paper",
        strokeWidth: 1.3,
        strokeLinecap: "round",
        opacity: 0.88,
      },
      {
        kind: "path",
        d: "M64 88 L42 104 L48 118 L22 138 L30 152 L14 166",
        stroke: "accent",
        strokeWidth: 2,
        strokeLinecap: "round",
        opacity: 0.82,
      },
      {
        kind: "path",
        d: "M20 176 L46 166 L54 180 L76 174",
        stroke: "accent-soft",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        opacity: 0.72,
      },

      // Vertical shadow cleft lines emphasizing sheer 2,250-foot depth
      { kind: "line", x1: 60, y1: 38, x2: 72, y2: 184, stroke: "deep", strokeWidth: 1.6, opacity: 0.65 },
      { kind: "line", x1: 126, y1: 42, x2: 112, y2: 188, stroke: "deep", strokeWidth: 1.6, opacity: 0.65 },

      // Plane 4: Tiny churning whitewater Gunnison River rapids at the chasm bottom
      { kind: "path", d: "M76 184 L104 184 L112 228 L68 228 Z", fill: "mid" },
      {
        kind: "path",
        d: "M90 184 C86 192 96 198 88 206 C80 214 96 220 90 228",
        stroke: "paper",
        strokeWidth: 3.4,
        strokeLinecap: "round",
        opacity: 0.94,
      },
      {
        kind: "path",
        d: "M84 196 Q90 193 96 196 M81 212 Q90 208 99 212 M78 222 Q90 218 102 222",
        stroke: "paper",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        opacity: 0.82,
      },
      { kind: "ellipse", cx: 81, cy: 205, rx: 4.5, ry: 2.8, fill: "deep" },
      { kind: "ellipse", cx: 100, cy: 216, rx: 5, ry: 3, fill: "deep" },

      // Plane 5: Gnarled cliffside juniper clinging to the upper-left canyon rim
      {
        kind: "path",
        d: "M46 34 C54 32 60 28 66 23 M54 31 C60 35 66 36 72 34",
        stroke: "deep",
        strokeWidth: 2.6,
        strokeLinecap: "round",
      },
      { kind: "ellipse", cx: 67, cy: 22, rx: 8.5, ry: 3.6, fill: "deep" },
      { kind: "ellipse", cx: 73, cy: 33, rx: 7, ry: 3, fill: "deep" },
      { kind: "ellipse", cx: 56, cy: 26, rx: 7.5, ry: 3.2, fill: "deep" },
      // Foreground bottom rim crags
      { kind: "polygon", points: "12,202 62,216 74,228 12,228", fill: "deep" },
      { kind: "polygon", points: "168,200 120,214 106,228 168,228", fill: "deep" },
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
    subject: "Cathedral old-growth bald cypress, golden swamp sunbeams & boardwalk",
    accentLight: "#B38530",
    accentDark: "#E2B862",
    skyMood: "mist",
    nodes: [
      // Plane 1: Upper canopy glow & diagonal golden sunbeams cutting through swamp mist
      { kind: "circle", cx: 124, cy: 28, r: 18, fill: "accent-soft", opacity: 0.46 },
      { kind: "polygon", points: "110,14 142,14 78,166 44,166", fill: "accent-soft", opacity: 0.25 },
      { kind: "polygon", points: "148,14 166,14 114,166 90,166", fill: "paper", opacity: 0.2 },
      { kind: "polygon", points: "88,14 104,14 38,164 20,164", fill: "accent-soft", opacity: 0.16 },

      // Plane 2: Distant old-growth cypress colonnade & floodplain mist veil
      { kind: "rect", x: 54, y: 22, width: 6, height: 134, fill: "far", opacity: 0.65 },
      { kind: "rect", x: 84, y: 26, width: 5, height: 130, fill: "far", opacity: 0.55 },
      { kind: "rect", x: 106, y: 24, width: 6, height: 132, fill: "far", opacity: 0.62 },
      { kind: "rect", x: 124, y: 28, width: 5, height: 128, fill: "far", opacity: 0.55 },
      // Soft swamp mist hovering over water line
      { kind: "ellipse", cx: 90, cy: 148, rx: 72, ry: 12, fill: "paper", opacity: 0.42 },

      // Plane 3: Hero cathedral bald cypress trunks with flared buttresses & Spanish moss
      // Mid-left secondary cypress
      {
        kind: "path",
        d: "M64 14 L74 14 L75 130 Q79 148 84 160 L56 160 Q61 146 63 130 Z",
        fill: "ink",
      },
      // Left cathedral giant cypress with wide flared fluted buttress
      {
        kind: "path",
        d: "M24 14 L44 14 L46 126 Q52 154 62 178 L14 178 Q22 154 23 126 Z",
        fill: "deep",
      },
      { kind: "line", x1: 43, y1: 14, x2: 46, y2: 142, stroke: "accent", strokeWidth: 1.5, opacity: 0.62 },
      // Right cathedral giant cypress with wide flared buttress
      {
        kind: "path",
        d: "M134 14 L154 14 L156 128 Q162 154 168 180 L118 180 Q128 154 132 128 Z",
        fill: "deep",
      },
      { kind: "line", x1: 134, y1: 14, x2: 131, y2: 144, stroke: "accent", strokeWidth: 1.6, opacity: 0.7 },
      // High overarching cypress boughs
      {
        kind: "path",
        d: "M12 14 L168 14 L168 38 Q144 48 124 34 Q102 46 82 32 Q58 46 38 34 Q24 44 12 36 Z",
        fill: "ink",
        opacity: 0.85,
      },
      // Draped Spanish moss garlands hanging from the upper canopy
      {
        kind: "path",
        d: "M46 34 C44 48 48 56 45 70 C50 60 53 48 51 35 Z",
        fill: "mid",
        opacity: 0.82,
      },
      {
        kind: "path",
        d: "M78 32 C76 46 80 54 78 66 C82 56 85 44 83 32 Z",
        fill: "mid",
        opacity: 0.78,
      },
      {
        kind: "path",
        d: "M114 34 C112 50 116 62 113 78 C118 66 121 50 119 34 Z",
        fill: "mid",
        opacity: 0.84,
      },
      {
        kind: "path",
        d: "M128 36 C126 48 129 56 127 64 C131 56 133 46 132 36 Z",
        fill: "ink",
        opacity: 0.76,
      },

      // Plane 4: Dark mirror floodplain water, trunk reflections & knobby cypress knees
      { kind: "rect", x: 12, y: 156, width: 156, height: 72, fill: "mid", opacity: 0.82 },
      { kind: "rect", x: 12, y: 186, width: 156, height: 42, fill: "ink", opacity: 0.42 },
      // Crisp vertical trunk reflections & golden sun shimmer on the water
      { kind: "rect", x: 24, y: 178, width: 22, height: 48, fill: "deep", opacity: 0.34 },
      { kind: "rect", x: 132, y: 180, width: 22, height: 46, fill: "deep", opacity: 0.34 },
      { kind: "polygon", points: "56,162 84,162 72,226 38,226", fill: "accent-soft", opacity: 0.24 },
      // Subtle mirror water ripples
      { kind: "line", x1: 18, y1: 170, x2: 72, y2: 170, stroke: "paper", strokeWidth: 1.1, opacity: 0.42 },
      { kind: "line", x1: 112, y1: 174, x2: 162, y2: 174, stroke: "paper", strokeWidth: 1.1, opacity: 0.42 },
      { kind: "line", x1: 24, y1: 196, x2: 68, y2: 196, stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.48 },
      // Knobby bald cypress knees rising out of the mirror floodplain
      {
        kind: "path",
        d: "M22 204 L25 186 Q28 182 31 186 L34 204 Z M38 208 L41 192 Q44 188 47 192 L50 208 Z M54 196 L56 184 Q58 181 60 184 L62 196 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M124 198 L126 185 Q128 182 130 185 L132 198 Z M138 206 L141 190 Q144 186 147 190 L150 206 Z M153 202 L156 188 Q158 185 160 188 L163 202 Z",
        fill: "deep",
      },
      { kind: "line", x1: 20, y1: 204, x2: 52, y2: 204, stroke: "paper", strokeWidth: 1, opacity: 0.55 },
      { kind: "line", x1: 122, y1: 206, x2: 164, y2: 206, stroke: "paper", strokeWidth: 1, opacity: 0.55 },

      // Plane 5: Perspective wooden boardwalk receding into the cypress cathedral
      { kind: "polygon", points: "89,156 101,156 122,228 68,228", fill: "accent", opacity: 0.85 },
      // Perspective boardwalk plank lines
      { kind: "line", x1: 86, y1: 168, x2: 104, y2: 168, stroke: "deep", strokeWidth: 1, opacity: 0.55 },
      { kind: "line", x1: 82, y1: 182, x2: 108, y2: 182, stroke: "deep", strokeWidth: 1.1, opacity: 0.58 },
      { kind: "line", x1: 77, y1: 198, x2: 113, y2: 198, stroke: "deep", strokeWidth: 1.2, opacity: 0.62 },
      { kind: "line", x1: 72, y1: 215, x2: 118, y2: 215, stroke: "deep", strokeWidth: 1.4, opacity: 0.65 },
      // Boardwalk handrails & stanchions
      { kind: "line", x1: 89, y1: 146, x2: 64, y2: 228, stroke: "deep", strokeWidth: 2.2, strokeLinecap: "round" },
      { kind: "line", x1: 101, y1: 146, x2: 126, y2: 228, stroke: "deep", strokeWidth: 2.2, strokeLinecap: "round" },
      { kind: "line", x1: 89, y1: 146, x2: 64, y2: 228, stroke: "accent-soft", strokeWidth: 0.9, opacity: 0.7 },
      { kind: "line", x1: 101, y1: 146, x2: 126, y2: 228, stroke: "accent-soft", strokeWidth: 0.9, opacity: 0.7 },
      {
        kind: "path",
        d: "M84 162 L84 174 M78 182 L78 198 M71 204 L71 224 M106 162 L106 174 M112 182 L112 198 M119 204 L119 224",
        stroke: "deep",
        strokeWidth: 1.8,
        strokeLinecap: "round",
      },
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
      // Plane 1: Upper 40% sunlit Black Hills prairie sky & soft cumulus clouds
      { kind: "circle", cx: 142, cy: 32, r: 16, fill: "accent-soft", opacity: 0.36 },
      { kind: "circle", cx: 142, cy: 32, r: 9.5, fill: "accent", opacity: 0.88 },
      { kind: "path", d: "M22 44 Q32 34 46 38 Q56 30 68 38 Q78 36 84 44 Z", fill: "paper", opacity: 0.82 },
      { kind: "path", d: "M102 52 Q112 44 124 47 Q134 42 146 52 Z", fill: "paper", opacity: 0.7 },

      // Plane 2: Rolling Black Hills horizon & prairie grass swell
      { kind: "path", d: "M12 74 Q48 60 88 68 Q128 58 168 74 L168 106 L12 106 Z", fill: "far" },
      { kind: "path", d: "M12 88 Q54 76 96 82 Q134 78 168 88 L168 112 L12 112 Z", fill: "mid" },
      // Sunlit prairie crest edge
      { kind: "path", d: "M12 88 Q54 76 96 82 Q134 78 168 88", stroke: "accent-soft", strokeWidth: 2, opacity: 0.72 },
      // Small Black Hills ponderosa pine tufts on far left slope
      { kind: "polygon", points: "26,68 21,82 31,82", fill: "ink", opacity: 0.85 },
      { kind: "polygon", points: "36,72 31,84 41,84", fill: "ink", opacity: 0.78 },

      // Plane 3 (Upper Hero): Strong iconic American bison standing on the prairie ridge
      {
        kind: "path",
        d: "M64 84 L64 73 C62 67 66 59 74 58 C82 57 88 61 95 62 C102 63 107 67 108 73 L107 84 L103 84 L102 76 L95 75 L94 84 L90 84 L90 76 L79 77 L78 85 L74 85 L73 76 L68 77 L68 84 Z",
        fill: "deep",
      },
      // Shaggy bison head, beard & short curved horn
      {
        kind: "path",
        d: "M65 64 C59 64 56 68 57 74 C58 78 62 79 65 76 Z",
        fill: "deep",
      },
      {
        kind: "path",
        d: "M61 64 Q58 60 62 59",
        stroke: "paper",
        strokeWidth: 1.5,
        strokeLinecap: "round",
        opacity: 0.85,
      },
      { kind: "path", d: "M68 61 Q77 57 88 61", stroke: "accent-soft", strokeWidth: 1.3, strokeLinecap: "round", opacity: 0.75 },

      // Plane 4 (Lower 60%): Curving cutaway earth strata opening into Wind Cave's vaulted limestone cavern
      { kind: "path", d: "M12 96 Q60 90 112 96 Q142 98 168 94 L168 228 L12 228 Z", fill: "ink" },
      // Sedimentary limestone cutaway strata ribbons above the vault
      { kind: "path", d: "M12 103 Q64 97 118 103 Q144 105 168 101", stroke: "accent-soft", strokeWidth: 2.2, opacity: 0.58 },
      { kind: "path", d: "M12 110 Q66 105 120 111 Q146 113 168 109", stroke: "mid", strokeWidth: 2.4, opacity: 0.65 },
      // Vaulted dark subterranean limestone cavern interior
      {
        kind: "path",
        d: "M20 228 C18 176 26 138 50 122 C72 108 108 108 130 122 C154 138 162 176 160 228 Z",
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
      { kind: "path", d: "M12 208 Q46 200 72 214 L90 218 L108 214 Q134 200 168 208 L168 228 L12 228 Z", fill: "ink" },
      { kind: "path", d: "M12 216 Q52 212 90 220 Q128 212 168 216 L168 228 L12 228 Z", fill: "deep", opacity: 0.85 },
    ],
  },

  // =========================================================================
  // 8. VOYA — Voyageurs National Park (MN)
  // =========================================================================
  {
    code: "VOYA",
    subject: "Aurora Borealis curtains, granite white-pine islands & lone northwoods canoe",
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
      { kind: "circle", cx: 146, cy: 74, r: 1.1, fill: "paper", opacity: 0.76 },

      // Broad translucent aurora sky veil
      {
        kind: "path",
        d: "M14 78 C36 48 64 38 92 52 C118 64 140 46 166 28 L166 64 C140 82 116 98 88 86 C60 74 36 86 14 108 Z",
        fill: "accent",
        opacity: 0.34,
      },
      // Sinuous folded vertical Aurora Borealis curtain ribbon
      {
        kind: "path",
        d: "M16 92 C40 64 66 56 94 70 C120 82 144 64 166 44 L166 56 C144 76 118 92 92 80 C64 66 40 76 16 104 Z",
        fill: "accent",
        opacity: 0.76,
      },
      // Luminous bright lower aurora edge
      {
        kind: "path",
        d: "M16 100 C40 72 66 64 94 78 C120 90 144 72 166 52",
        stroke: "accent-soft",
        strokeWidth: 2.8,
        strokeLinecap: "round",
        opacity: 0.94,
      },
      // Vertical shimmering curtain rays rising upward from the ribbon
      { kind: "line", x1: 38, y1: 78, x2: 38, y2: 46, stroke: "accent-soft", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.44 },
      { kind: "line", x1: 58, y1: 68, x2: 58, y2: 34, stroke: "paper", strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.36 },
      { kind: "line", x1: 82, y1: 72, x2: 82, y2: 40, stroke: "accent-soft", strokeWidth: 2.4, strokeLinecap: "round", opacity: 0.48 },
      { kind: "line", x1: 112, y1: 80, x2: 112, y2: 44, stroke: "paper", strokeWidth: 1.7, strokeLinecap: "round", opacity: 0.38 },
      { kind: "line", x1: 138, y1: 68, x2: 138, y2: 32, stroke: "accent-soft", strokeWidth: 2.2, strokeLinecap: "round", opacity: 0.45 },

      // Plane 2: Far boreal shoreline across the lake
      {
        kind: "path",
        d: "M12 128 L26 122 L42 126 L64 120 L86 126 L112 120 L138 125 L168 120 L168 140 L12 140 Z",
        fill: "far",
      },

      // Plane 3: Hero glacially smoothed Canadian Shield granite islands & jagged white pines
      // Left whaleback granite island
      { kind: "path", d: "M12 140 C24 124 58 122 82 140 Z", fill: "ink" },
      { kind: "path", d: "M18 134 C34 126 56 126 74 134", stroke: "accent-soft", strokeWidth: 1.2, opacity: 0.48 },
      // Left windswept white pine silhouettes
      {
        kind: "path",
        d: "M34 132 L34 94 M34 98 L24 101 M34 100 L44 98 M34 108 L22 110 M34 108 L46 111 M34 118 L25 120 M34 118 L43 120",
        stroke: "deep",
        strokeWidth: 2.5,
        strokeLinecap: "round",
      },
      {
        kind: "path",
        d: "M54 132 L54 104 M54 108 L46 110 M54 108 L63 111 M54 117 L45 119 M54 117 L64 119",
        stroke: "deep",
        strokeWidth: 2.2,
        strokeLinecap: "round",
      },
      { kind: "polygon", points: "22,108 14,134 30,134", fill: "deep" },
      { kind: "polygon", points: "67,114 60,136 74,136", fill: "deep" },

      // Right granite island & spruce/pine spires
      { kind: "path", d: "M114 140 C130 124 152 122 168 132 L168 140 Z", fill: "ink" },
      { kind: "polygon", points: "136,100 127,134 145,134", fill: "deep" },
      { kind: "polygon", points: "152,92 142,134 162,134", fill: "deep" },
      { kind: "polygon", points: "124,114 117,138 131,138", fill: "deep" },

      // Plane 4: Dark northwoods lake water & shimmering aurora reflections
      { kind: "rect", x: 12, y: 139, width: 156, height: 89, fill: "mid" },
      { kind: "rect", x: 12, y: 139, width: 156, height: 22, fill: "deep", opacity: 0.36 },
      // Shimmering emerald aurora reflections across the center water channel
      { kind: "ellipse", cx: 92, cy: 152, rx: 32, ry: 3.5, fill: "accent", opacity: 0.56 },
      { kind: "ellipse", cx: 88, cy: 162, rx: 40, ry: 4.2, fill: "accent", opacity: 0.52 },
      { kind: "ellipse", cx: 94, cy: 173, rx: 44, ry: 4.5, fill: "accent-soft", opacity: 0.44 },
      { kind: "ellipse", cx: 86, cy: 184, rx: 36, ry: 3.6, fill: "accent", opacity: 0.42 },
      { kind: "ellipse", cx: 92, cy: 212, rx: 48, ry: 4, fill: "accent", opacity: 0.34 },
      { kind: "line", x1: 68, y1: 152, x2: 114, y2: 152, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.58 },
      { kind: "line", x1: 60, y1: 173, x2: 124, y2: 173, stroke: "paper", strokeWidth: 1.2, strokeLinecap: "round", opacity: 0.52 },

      // Plane 5: Foreground lone northwoods canoe, paddler & V-wake ripples
      // Canoe hull with upturned voyageur bow & stern
      {
        kind: "path",
        d: "M56 189 C60 198 70 202 90 202 C110 202 120 198 124 189 C116 194 106 195 90 195 C74 195 64 194 56 189 Z",
        fill: "deep",
      },
      { kind: "path", d: "M60 192 Q90 197 120 192", stroke: "accent-soft", strokeWidth: 1.1, opacity: 0.72 },
      // Silhouetted paddler & angled paddle dipping into the water
      { kind: "circle", cx: 83, cy: 177, r: 3.4, fill: "deep" },
      { kind: "path", d: "M77 195 L79 182 L88 183 L89 195 Z", fill: "deep" },
      { kind: "line", x1: 79, y1: 184, x2: 96, y2: 204, stroke: "deep", strokeWidth: 2, strokeLinecap: "round" },
      // Crisp V-wake ripples & paddle dip ring
      {
        kind: "path",
        d: "M122 199 C136 202 150 206 164 212 M118 203 C132 208 144 214 156 222",
        stroke: "accent-soft",
        strokeWidth: 1.4,
        strokeLinecap: "round",
        opacity: 0.72,
      },
      {
        kind: "path",
        d: "M42 203 Q78 207 116 203",
        stroke: "paper",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        opacity: 0.68,
      },
      { kind: "ellipse", cx: 96, cy: 205, rx: 6, ry: 2, stroke: "paper", strokeWidth: 1, opacity: 0.65 },
    ],
  },
] as const
