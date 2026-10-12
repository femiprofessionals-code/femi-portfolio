/**
 * The gallery wall (v3 room). Frames, mats, prints, picture lights and shadows are part of the
 * photograph (see public/room/v3); the site only places links, captions and the wall title on top.
 * Coordinates are pixels of the 1672 × 823 room photograph.
 */
export const ROOM = { w: 1672, h: 823 }

/** Centre of the hang (over the bench) and the wall's extent. */
export const WALL = { x0: 192, x1: 1180, cx: 694 }

/** Wall title block (painted on the plaster above the frames). */
export const TITLE = { cx: 694, y: 104, w: 760 }

/** Phones see this slice of the room. */
export const MOBILE_CROP = { x0: 246, x1: 1146 }

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
  { id: 'trowe', rect: [306, 280, 216, 216], href: '/experience#t-rowe-price', company: 'T. Rowe Price', role: 'Central Operations Associate', years: '2019 – 2021' },
  { id: 'carlyle', rect: [586, 280, 216, 216], href: '/experience#the-carlyle-group', company: 'The Carlyle Group', role: 'Fund Coordinator, EMEA Private Equity', years: '2021 – 2023' },
  { id: 'gs', rect: [866, 280, 216, 216], href: '/experience#goldman-sachs', company: 'Goldman Sachs', role: 'Senior Associate, Global Banking & Markets', years: '2023 – Present' },
]
