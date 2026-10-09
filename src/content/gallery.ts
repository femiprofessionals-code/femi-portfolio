/**
 * The Gallery — every frame on the wall is a door to a real page.
 * Rects are the OUTER edge of each drawn frame (moulding included), in pixels of the room photograph (1672 × 823).
 */
export const SCENE = { w: 1672, h: 823 }

/** Wall area the camera dollies toward (the frame cluster). */
export const FOCUS = { x: 515, y: 40, w: 1000, h: 570 }

/** Wall space left of the frames for the masthead. */
export const MASTHEAD = { x: 228, y: 120, w: 290 }

export type FrameKind = 'company' | 'brief' | 'portrait' | 'page'
export type Frame = {
  id: string
  kind: FrameKind
  rect: [number, number, number, number]
  tone: 'light' | 'dark' | 'green'
  href: string
  /** Museum label shown on hover/focus. */
  title: string
  caption: string
  /** Large figure for brief frames. */
  value?: string
  label?: string
  company?: 'gs' | 'carlyle' | 'trowe'
  icon?: 'resume' | 'contact' | 'work'
  /** Under a picture light — stays bright at night. */
  lit?: boolean
}

export const FRAMES: Frame[] = [
  { id: 'about', kind: 'portrait', rect: [694, 90, 210, 300], tone: 'light', href: '/about', title: 'About', caption: 'Leadership story and operating principles', lit: true },
  { id: 'gs', kind: 'company', rect: [928, 70, 240, 230], tone: 'dark', company: 'gs', href: '/experience#goldman-sachs', title: 'Goldman Sachs', caption: 'Senior Associate, Global Banking & Markets Transformation · 2023 – Present', lit: true },
  { id: 'carlyle', kind: 'company', rect: [1346, 110, 150, 190], tone: 'dark', company: 'carlyle', href: '/experience#the-carlyle-group', title: 'The Carlyle Group', caption: 'Fund Coordinator, EMEA Private Equity Fund Management · 2021 – 2023', lit: true },
  { id: 'trowe', kind: 'company', rect: [1346, 324, 150, 160], tone: 'dark', company: 'trowe', href: '/experience#t-rowe-price', title: 'T. Rowe Price', caption: 'Central Operations Associate · 2019 – 2021' },
  { id: 'b03', kind: 'brief', rect: [928, 324, 240, 170], tone: 'light', href: '/work/enterprise-inter-affiliate-clearing', value: '$580M', label: 'Funding-cost savings', title: 'Brief 03 · Enterprise Inter-Affiliate Clearing', caption: '~$580M annualized funding-cost savings enabled', lit: true },
  { id: 'b05', kind: 'brief', rect: [1192, 294, 130, 160], tone: 'light', href: '/work/emea-private-equity-investor-experience', value: '33%', label: 'Faster onboarding', title: 'Brief 05 · EMEA Private Equity Investor Experience', caption: '342 investors a year · cycle time cut 33%' },
  { id: 'b06', kind: 'brief', rect: [1192, 100, 130, 170], tone: 'light', href: '/work/nav-facility', value: '€1.25B', label: 'NAV facility', title: 'Brief 06 · €1.25B NAV Facility', caption: '20+ portfolio assets · five jurisdictions', lit: true },
  { id: 'b02', kind: 'brief', rect: [540, 244, 130, 140], tone: 'dark', href: '/work/ice-clear-credit', value: '120', label: 'Days, from 12 months', title: 'Brief 02 · ICE Clear Credit Onboarding', caption: 'A 12-month implementation delivered in 120 days' },
  { id: 'b01', kind: 'brief', rect: [540, 408, 130, 150], tone: 'light', href: '/work/pre-trade-initial-margin', value: '120+', label: 'Stakeholders', title: 'Brief 01 · Pre-Trade Initial Margin Calculator', caption: 'Front-office product, requirements to rollout' },
  { id: 'b04', kind: 'brief', rect: [540, 110, 130, 110], tone: 'light', href: '/work/kaizen-integration', value: '$1.8M', label: 'Integration', title: 'Brief 04 · Kaizen Post-Investment Integration', caption: 'Diligence to Day 1 across three global regions' },
  { id: 'work', kind: 'page', rect: [1192, 478, 130, 112], tone: 'light', href: '/work', icon: 'work', label: 'Selected work', title: 'Selected Work', caption: 'All six executive briefs' },
  { id: 'resume', kind: 'page', rect: [694, 414, 100, 118], tone: 'light', href: '/resume', icon: 'resume', label: 'Résumé', title: 'Résumé', caption: 'View or download' },
  { id: 'contact', kind: 'page', rect: [818, 414, 86, 86], tone: 'dark', href: '/contact', icon: 'contact', label: 'Contact', title: 'Contact', caption: 'Email · LinkedIn · New York' },
]

/** Picture-light positions (for the animated night glow). */
export const PICTURE_LIGHTS: [number, number, number][] = [
  [799, 78, 120], [1048, 58, 150], [1257, 88, 95], [1421, 98, 110],
]
