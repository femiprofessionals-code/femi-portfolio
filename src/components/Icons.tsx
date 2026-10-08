/* Thin-line bronze icon set drawn to match the render language. Decorative: aria-hidden. */
type P = { size?: number }
const base = (size: number) => ({ width: size, height: size, viewBox: '0 0 48 48', fill: 'none', 'aria-hidden': true as const })

export const Ring = ({ size = 48 }: P) => (
  <svg {...base(size)}><circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1.4" /><circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="0.6" opacity=".6" /></svg>
)
export const Apex = ({ size = 48 }: P) => (
  <svg {...base(size)}><path d="M12 36 24 12l12 24" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="miter" /><path d="M18 36h12" stroke="currentColor" strokeWidth="1.2" /></svg>
)
export const Rings = ({ size = 48 }: P) => (
  <svg {...base(size)}><circle cx="19" cy="24" r="10" stroke="currentColor" strokeWidth="1.4" /><circle cx="29" cy="24" r="10" stroke="currentColor" strokeWidth="1.4" /></svg>
)
export const Bars = ({ size = 48 }: P) => (
  <svg {...base(size)}><path d="M17 34V24M24 34V16M31 34V12" stroke="currentColor" strokeWidth="1.6" /></svg>
)
export const Columns = ({ size = 22 }: P) => (
  <svg {...base(size)}><path d="M8 18 24 9l16 9M10 20h28M13 22v14M20 22v14M28 22v14M35 22v14M8 39h32" stroke="currentColor" strokeWidth="1.6" /></svg>
)
export const Compass = ({ size = 22 }: P) => (
  <svg {...base(size)}><circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1.6" /><path d="m29 19-3 7-7 3 3-7 7-3Z" stroke="currentColor" strokeWidth="1.4" /></svg>
)
export const Layers = ({ size = 22 }: P) => (
  <svg {...base(size)}><path d="m24 10 15 8-15 8-15-8 15-8Z" stroke="currentColor" strokeWidth="1.6" /><path d="m9 25 15 8 15-8M9 31l15 8 15-8" stroke="currentColor" strokeWidth="1.6" /></svg>
)
export const Globe = ({ size = 22 }: P) => (
  <svg {...base(size)}><circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1.6" /><path d="M9 24h30M24 9c5 4 6 10 6 15s-1 11-6 15c-5-4-6-10-6-15s1-11 6-15Z" stroke="currentColor" strokeWidth="1.4" /></svg>
)

/* Larger bronze "objects" for the dark philosophy tiles. */
export const Crescent = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
    <defs><linearGradient id="br1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E2BE8E" /><stop offset=".55" stopColor="#9C7347" /><stop offset="1" stopColor="#3A2618" /></linearGradient></defs>
    <circle cx="48" cy="48" r="34" stroke="url(#br1)" strokeWidth="3" />
    <path d="M62 18a34 34 0 1 1-40 52 30 30 0 1 0 40-52Z" fill="url(#br1)" opacity=".85" />
    <circle cx="40" cy="48" r="24" stroke="#1a120d" strokeWidth="2" />
  </svg>
)
export const Monolith = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
    <defs><linearGradient id="br2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D9B585" /><stop offset="1" stopColor="#5A3E27" /></linearGradient></defs>
    <rect x="14" y="44" width="12" height="38" fill="url(#br2)" opacity=".75" />
    <rect x="30" y="30" width="12" height="52" fill="url(#br2)" opacity=".85" />
    <rect x="46" y="38" width="12" height="44" fill="url(#br2)" opacity=".7" />
    <rect x="62" y="14" width="12" height="68" fill="url(#br2)" />
  </svg>
)
export const Disc = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
    <defs><radialGradient id="br3" cx=".38" cy=".34" r=".75"><stop offset="0" stopColor="#E7C595" /><stop offset=".5" stopColor="#9A7046" /><stop offset="1" stopColor="#3A2617" /></radialGradient></defs>
    <circle cx="48" cy="48" r="38" fill="url(#br3)" />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i * Math.PI) / 6
      return <path key={i} d={`M48 48 L${48 + 36 * Math.cos(a)} ${48 + 36 * Math.sin(a)}`} stroke="#3A2617" strokeWidth=".6" opacity=".45" />
    })}
  </svg>
)
