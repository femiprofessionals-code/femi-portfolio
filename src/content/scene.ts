/**
 * The homepage room (v5). Every coordinate is a pixel of the 1536 × 1024 master image, matching
 * public/room/v5/scene.json (docs/asset-lock.md). Overlays are positioned as percentages of the
 * rendered scene box, which always keeps the image's intrinsic 3:2 ratio.
 */
export const SCENE = { w: 1536, h: 1024 }
export const ROOM_MODES = ['morning', 'golden', 'night'] as const
export type RoomMode = (typeof ROOM_MODES)[number]
export const ROOM_BASE = '/room/v5'

type Rect = [x: number, y: number, w: number, h: number]

/** Wall text block (above the picture lights) and the slice phones see (frames + bench). */
export const ZONES: { identity: Rect; mobileCrop: Rect } = {
  identity: [448, 124, 600, 186],   // centred on the three paintings (x 502-994 → 748)
  mobileCrop: [440, 270, 610, 450],
}

/** Identity on the wall. Positioning is Femi's selected emphasis; the line is a synthesis of femifalade.com. */
export const IDENTITY = {
  positioning: 'Strategic Transformation',
  intro: 'Transformation, financial operations, and AI-enabled workflows across institutional finance.',
}

export type Frame = {
  id: 'trowe' | 'carlyle' | 'gs'
  company: string
  /** Title and dates exactly as on femifalade.com (About timeline) — attributed draft data, see docs/discrepancies.md. */
  role: string
  dates: string
  /** Year range as on the femifalade.com homepage ("2019 to 2021"), short enough for the wall caption. */
  years: string
  href: string
  /** Femi's supplied painting for this frame (artwork, not the official mark). */
  art: string
  mat: Rect
  /** Frame plus its caption; one link per company. */
  hitbox: Rect
  /** Where its picture light falls when the painting is hovered (lamp at y 318-344, frame 343-494). */
  glow: Rect
  /** The whole frame: a live object (public/room/v5/frames) over the frameless wall, so it can turn on hover. */
  outer: Rect
}

/** Hung left → right in career order. */
export const FRAMES: Frame[] = [
  { id: 'trowe', company: 'T. Rowe Price', role: 'Analyst, Central Operations', dates: 'Oct 2019 – Jun 2021', years: '2019 – 2021', href: '/experience#t-rowe-price', art: '/art/trowe-painting', mat: [526, 368, 99, 102], hitbox: [498, 339, 156, 247], glow: [456, 330, 240, 200], outer: [502, 343, 148, 151] },
  { id: 'carlyle', company: 'The Carlyle Group', role: 'Associate, EMEA Fund Operations', dates: 'Jun 2021 – Nov 2023', years: '2021 – 2023', href: '/experience#the-carlyle-group', art: '/art/carlyle-painting', mat: [698, 368, 100, 102], hitbox: [670, 339, 156, 247], glow: [628, 330, 240, 200], outer: [674, 343, 148, 151] },
  { id: 'gs', company: 'Goldman Sachs', role: 'Senior Associate, Global Banking and Markets Transformation', dates: 'Nov 2023 – Present', years: '2023 – Present', href: '/experience#goldman-sachs', art: '/art/gs-painting', mat: [870, 368, 100, 102], hitbox: [841, 339, 157, 247], glow: [799, 330, 240, 200], outer: [845, 343, 149, 151] },
]

/** The olive tree's canopy and trunk, down to the planter rim (RoomTree, docs/asset-lock/scripts/tree.py). */
export const TREE_BOX: Rect = [0, 180, 460, 424]

export const pct = (v: number, of: number) => `${(v / of) * 100}%`
export const rectStyle = ([x, y, w, h]: Rect) => ({ left: pct(x, SCENE.w), top: pct(y, SCENE.h), width: pct(w, SCENE.w), height: pct(h, SCENE.h) })
