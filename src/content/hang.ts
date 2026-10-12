/**
 * The gallery wall. Frames, mats, prints, picture lights and shadows are part of the
 * photograph (see public/room/v4); the site only places links, captions and the wall title on top.
 * Coordinates are pixels of the 1536 × 1024 room photograph.
 */
export const ROOM = { w: 1536, h: 1024 }

/** Centre of the hang (over the bench) and the wall's extent. */
export const WALL = { x0: 380, x1: 1178, cx: 777 }

/** Wall title block (painted on the plaster above the frames). */
export const TITLE = { cx: 777, y: 70, w: 720 }

/** Phones see this slice of the room. */
export const MOBILE_CROP = { x0: 360, x1: 1200 }

/**
 * Each framed board (moulding, mat, print and picture light) is a separate transparent layer cut from
 * the photograph, laid over the room so it never moves with the background video.
 * box = [x, y, w, h] of the cut-out in photograph px.
 */
export const BOARDS: { id: HungFrame['id']; box: [number, number, number, number] }[] = [
  { id: 'trowe', box: [436, 214, 218, 260] },
  { id: 'carlyle', box: [666, 214, 218, 260] },
  { id: 'gs', box: [898, 214, 220.67, 260] },
]

export type HungFrame = {
  id: 'trowe' | 'carlyle' | 'gs'
  rect: [number, number, number, number]
  href: string
  company: string
  role: string
  years: string
}

/** Hung left → right in career order. */
export const HUNG: HungFrame[] = [
  { id: 'trowe', rect: [442, 263, 206, 208], href: '/experience#t-rowe-price', company: 'T. Rowe Price', role: 'Central Operations Associate', years: '2019 – 2021' },
  { id: 'carlyle', rect: [672, 263, 206, 208], href: '/experience#the-carlyle-group', company: 'The Carlyle Group', role: 'Fund Coordinator, EMEA Private Equity', years: '2021 – 2023' },
  { id: 'gs', rect: [904, 263, 209, 208], href: '/experience#goldman-sachs', company: 'Goldman Sachs', role: 'Senior Associate, Global Banking & Markets', years: '2023 – Present' },
]
