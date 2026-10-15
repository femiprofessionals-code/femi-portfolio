// v7 — light palette with terracotta accent
export const F = {
  serif: 'var(--font-cormorant)' as const,
  sans:  'var(--font-dm-sans)'  as const,
}

export const C = {
  bg:        '#FAF8F5',
  bgSoft:    '#F4F0EA',
  text:      '#111111',
  accent:    '#D97757',
  accentHov: '#C5613F',
  muted:     'rgba(17,17,17,0.50)',
  dim:       'rgba(17,17,17,0.65)',
  line:      'rgba(17,17,17,0.10)',
  lineSoft:  'rgba(17,17,17,0.06)',
  accentDim: 'rgba(217,119,87,0.18)',
  // Hero (dark, with video bg)
  navy:      '#080F1C',
  cream:     '#F0EDE8',
  heroLine:  'rgba(240,237,232,0.10)',
  heroDim:   'rgba(240,237,232,0.55)',
  // legacy aliases (so VideoHero & Globe still compile without rewrites)
  gold:      '#D97757',
  dim40:     'rgba(240,237,232,0.40)',
  dim55:     'rgba(240,237,232,0.55)',
  dim65:     'rgba(240,237,232,0.65)',
}

export const LINE      = `1px solid ${C.line}`
export const LINE_SOFT = `1px solid ${C.lineSoft}`
export const HERO_LINE = `1px solid ${C.heroLine}`

export const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y:  0 },
  viewport:    { once: true, margin: '-40px' },
  transition:  { delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})
