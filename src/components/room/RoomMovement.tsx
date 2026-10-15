import motion from '@/content/room-motion.json'
import { ROOM_BASE, ROOM_MODES, SCENE, pct, rectStyle } from '@/content/scene'

/**
 * Programmatic movement inside the room (CSS transforms and opacity only — not video, not AI-generated).
 * Every layer is placed in the master's coordinate system and clipped by masks cut from the room itself
 * (docs/qa/stage7), so clouds pass behind the skyline, tree and mullions, and nothing structural moves.
 * Paused off-screen / in hidden tabs (RoomMovementControl) and removed entirely for reduced motion.
 */
const M = `${ROOM_BASE}/motion`

/** Deterministic pseudo-random numbers so server and client markup match. */
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const DUST = Array.from({ length: 12 }, (_, i) => ({
  x: 480 + rand(i, 1) * 520, y: 170 + rand(i, 2) * 380, size: 2 + rand(i, 3) * 2.5,
  dur: 22 + rand(i, 4) * 18, delay: -rand(i, 5) * 40, dx: 20 + rand(i, 6) * 40, dy: -(30 + rand(i, 7) * 50),
}))

const TWINKLES = (motion.twinkles as [number, number][]).map(([x, y], i) => ({
  x, y, off: rand(i, 8) < 0.4, dur: 5 + rand(i, 9) * 16, delay: -rand(i, 10) * 20,
}))

const LAMPS = [576, 748, 920]

export default function RoomMovement() {
  const [cx, cy, cw, ch] = motion.boxes.canopy
  return (
    <div className="m5" aria-hidden="true">
      {/* Clouds — two depths, drifting behind both window walls */}
      <div className="m5__sky" style={{ maskImage: `url(${M}/mask-sky.png)`, WebkitMaskImage: `url(${M}/mask-sky.png)` }}>
        {ROOM_MODES.map(m => (
          <div key={m} className="m5__clouds" data-mode={m}>
            {(['far', 'near'] as const).map(depth => (
              <div key={depth} className={`m5__strip m5__strip--${depth}`}>
                {[0, 1].map(k => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={k} data-light={m} data-src={`${M}/clouds-${depth}-${m}.webp`} alt="" suppressHydrationWarning />
                ))}
              </div>
            ))}
          </div>
        ))}
        <div className="m5__plane" data-mode="night"><i className="m5__beacon" /><i className="m5__strobe" /></div>
      </div>

      {/* A passing cloud softens the sunlight on the wall, rug and floor */}
      {(['morning', 'golden'] as const).map(m => (
        <div key={m} className="m5__sun" data-mode={m} style={{ maskImage: `url(${M}/mask-sun-${m}.png)`, WebkitMaskImage: `url(${M}/mask-sun-${m}.png)` }} />
      ))}

      {/* Dust in the beams (day) */}
      <div className="m5__dust" data-mode="day">
        {DUST.map((d, i) => (
          <i key={i} style={{ left: pct(d.x, SCENE.w), top: pct(d.y, SCENE.h), width: `${d.size / 15.36}cqw`, height: `${d.size / 15.36}cqw`,
            animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s`, ['--dx' as string]: `${d.dx / 15.36}cqw`, ['--dy' as string]: `${d.dy / 15.36}cqw` }} />
        ))}
      </div>

      {/* City windows going on and off (night) */}
      <div className="m5__city" data-mode="night">
        {TWINKLES.map((t, i) => (
          <i key={i} className={t.off ? 'off' : 'on'} style={{ left: pct(t.x, SCENE.w), top: pct(t.y, SCENE.h), animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s` }} />
        ))}
      </div>

      {/* Picture lights (night) */}
      <div className="m5__lamps" data-mode="night">
        {LAMPS.map((x, i) => <i key={x} style={{ left: pct(x - 110, SCENE.w), animationDelay: `${-i * 3.1}s` }} />)}
      </div>

      {/* The olive canopy, cut from the room along its own mask, moving gently in the room's air */}
      <div className="m5__canopy" style={rectStyle([cx, cy, cw, ch] as [number, number, number, number])}>
        {ROOM_MODES.map(m => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={m} data-light={m} data-src={`${M}/canopy-${m}.webp`} alt="" suppressHydrationWarning />
        ))}
      </div>
    </div>
  )
}
