export const F = {
  serif: 'var(--font-cormorant)' as const,
  sans:  'var(--font-dm-sans)'  as const,
}

export const C = {
  navy:    '#080F1C',
  navyMid: '#0D1728',
  cream:   '#F0EDE8',
  gold:    '#C9A84C',
  dim40:   'rgba(240,237,232,0.40)',
  dim55:   'rgba(240,237,232,0.55)',
  dim65:   'rgba(240,237,232,0.65)',
  line:    'rgba(240,237,232,0.08)',
  goldDim: 'rgba(201,168,76,0.18)',
}

export const LINE = `1px solid ${C.line}`

export const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y:  0 },
  viewport:    { once: true, margin: '-40px' },
  transition:  { delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
})
