import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import Link from 'next/link'
import Arrow from '@/components/Arrow'
import { FRAMES, MASTHEAD, PICTURE_LIGHTS, SCENE, WALLSET_AI, type Frame } from '@/content/gallery'
import { HERO, PERSON } from '@/content/site'
import portrait from '../../../public/images/femi-portrait.webp'
import RoomMotion from './RoomMotion'
import { CarlylePlate, TRowePlate } from '@/components/BrandMarks'

/** Optional looping clips: drop /public/room/{morning,golden,night}.mp4 in and they play over the stills. */
const CLIPS = (['morning', 'golden', 'night'] as const).filter(s => fs.existsSync(path.join(process.cwd(), 'public', 'room', `${s}.mp4`)))

const pct = (v: number, of: number) => `${(v / of) * 100}%`
/** The wall in the photograph is bare — every frame is drawn here: gilt moulding, mat and picture. */
const MOULD = 9 // moulding width, scene px
const outerStyle = ([x, y, w, h]: Frame['rect']) => ({
  left: pct(x, SCENE.w), top: pct(y, SCENE.h), width: pct(w, SCENE.w), height: pct(h, SCENE.h),
})
const innerInset = ([, , w, h]: Frame['rect']) => {
  const ix = pct(MOULD, w), iy = pct(MOULD, h)
  return { left: ix, right: ix, top: iy, bottom: iy }
}

/** Official marks live in /public/logos/{gs,carlyle,trowe}.svg — a typeset name stands in until a file exists. */
function logoSrc(key: string) {
  for (const ext of ['svg', 'png', 'webp']) {
    if (fs.existsSync(path.join(process.cwd(), 'public', 'logos', `${key}.${ext}`))) return `/logos/${key}.${ext}`
  }
  return null
}

const WORDMARK: Record<string, string> = { gs: 'Goldman Sachs', carlyle: 'The Carlyle Group', trowe: 'T. Rowe Price' }

function PageIcon({ icon }: { icon: Frame['icon'] }) {
  const p = { viewBox: '0 0 48 48', fill: 'none', 'aria-hidden': true as const, className: 'gf__icon' }
  if (icon === 'resume') return <svg {...p}><path d="M14 8h14l8 8v24H14z" stroke="currentColor" strokeWidth="1.6" /><path d="M28 8v8h8M19 24h12M19 29h12M19 34h8" stroke="currentColor" strokeWidth="1.6" /></svg>
  if (icon === 'contact') return <svg {...p}><rect x="8" y="13" width="32" height="22" stroke="currentColor" strokeWidth="1.6" /><path d="m8 14 16 12 16-12" stroke="currentColor" strokeWidth="1.6" /></svg>
  return <svg {...p}>{[0, 1, 2].flatMap(c => [0, 1].map(r => <rect key={`${c}${r}`} x={9 + c * 11} y={14 + r * 11} width="8" height="8" stroke="currentColor" strokeWidth="1.6" />))}</svg>
}

function FrameBody({ f }: { f: Frame }) {
  if (f.kind === 'portrait') {
    return <span className="gf__photo"><Image src={portrait} alt="" fill sizes="20vw" className="gf__portrait" /></span>
  }
  if (f.kind === 'company') {
    const src = logoSrc(f.company!)
    const plate = src
      // eslint-disable-next-line @next/next/no-img-element
      ? <img src={src} alt="" className={`plate plate--${f.company}`} />
      : f.company === 'carlyle' ? <CarlylePlate /> : f.company === 'trowe' ? <TRowePlate /> : <span className="gf__wordmark">{WORDMARK[f.company!]}</span>
    return (
      <>
        <span className={`gf__plate gf__plate--${f.company}`}>{plate}</span>
        <span className="gf__sub">{f.caption.split(' · ')[1]}</span>
      </>
    )
  }
  if (f.kind === 'brief') {
    return (
      <>
        <span className="gf__value">{f.value}</span>
        <span className="gf__label">{f.label}</span>
      </>
    )
  }
  return (
    <>
      <PageIcon icon={f.icon} />
      <span className="gf__label">{f.label}</span>
    </>
  )
}

export default function GalleryRoom({ variant = 'rendered' }: { variant?: 'rendered' | 'ai' }) {
  const ai = variant === 'ai'
  const base = ai ? '/room/ai' : '/room'
  const clips = ai ? (['morning', 'golden', 'night'] as const) : CLIPS
  const wallset = ai
    ? { transform: `translate(calc(${WALLSET_AI.x} * 100cqw / ${SCENE.w}), calc(${WALLSET_AI.y} * 100cqw / ${SCENE.w})) scale(${WALLSET_AI.scale})` }
    : undefined
  return (
    <section className={`gallery-room${ai ? ' gallery-room--ai' : ''}`} aria-labelledby="room-title" data-room data-variant={variant}>
      <div className="gallery-room__stage" data-stage-viewport>
        <div className="scene" data-scene>
          <div className="scene__cam" data-cam>
            {(['morning', 'golden', 'night'] as const).map(s => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s} src={`${base}/${s}.webp`} alt="" className="scene__img" data-light={s} width={ai ? 1920 : 2508} height={ai ? 946 : 1235} decoding="async" fetchPriority={s === 'night' ? 'low' : 'high'} />
            ))}
            {/* Generated motion clips (Higgsfield), loaded only for the active light — see RoomMotion */}
            {clips.map(s => (
              <video key={s} className="scene__img scene__video" data-light={s} data-src={`${base}/${s}.mp4`} data-track={ai ? `${base}/${s}.json` : undefined} muted loop playsInline preload="none" aria-hidden="true" />
            ))}

            {/* Light & air */}
            <div className="fx fx--clouds" aria-hidden="true"><div /></div>
            <div className="fx fx--beams" aria-hidden="true"><i /><i /><i /></div>
            <div className="fx fx--glows" aria-hidden="true">
              {PICTURE_LIGHTS.map(([x, y, w]) => (
                <i key={x} style={{ left: pct(x - w, SCENE.w), top: pct(y - 6, SCENE.h), width: pct(w * 2, SCENE.w), height: pct(w * 2.6, SCENE.h) }} />
              ))}
            </div>
            <canvas className="fx fx--particles" data-particles aria-hidden="true" />
            <div className="fx fx--plane" aria-hidden="true"><i /></div>

            {/* Everything hung on the wall moves as one: tracked to the camera in the AI variant */}
            <div className="wallset" data-wallset style={wallset}>
            {/* Masthead on the wall */}
            <div className="masthead" style={{ left: pct(MASTHEAD.x, SCENE.w), top: pct(MASTHEAD.y, SCENE.h), width: pct(MASTHEAD.w, SCENE.w) }} data-masthead>
              <p className="masthead__eyebrow">{PERSON.positioning.map(p => <span key={p}>{p}</span>)}</p>
              <h1 id="room-title" className="masthead__name">{PERSON.name}</h1>
              <p className="masthead__line">{HERO.headline}</p>
              <div className="masthead__actions">
                <Link href="/work" className="masthead__cta masthead__cta--solid">Selected work <Arrow /></Link>
                <Link href="/resume" className="masthead__cta">Résumé <Arrow /></Link>
              </div>
            </div>

            {/* Brass picture lights */}
            <div className="lamps" aria-hidden="true">
              {PICTURE_LIGHTS.map(([x, y, w]) => (
                <i key={x} style={{ left: pct(x - w * 0.36, SCENE.w), top: pct(y - 6, SCENE.h), width: pct(w * 0.72, SCENE.w) }} />
              ))}
            </div>

            {/* The collection — each frame opens a page */}
            <nav className="frames" aria-label="The gallery">
              {FRAMES.map(f => (
                <Link
                  key={f.id}
                  href={f.href}
                  className={`gf gf--${f.kind} gf--${f.tone}${f.lit ? ' gf--lit' : ''}${f.rect[0] > 1240 ? ' gf--edge' : ''}`}
                  style={outerStyle(f.rect)}
                  aria-label={`${f.title} — ${f.caption}`}
                >
                  <span className="gf__moulding" aria-hidden="true" />
                  <span className="gf__inner" style={innerInset(f.rect)}><FrameBody f={f} /></span>
                  <span className="gf__card" aria-hidden="true">
                    <span className="gf__card-title">{f.title}</span>
                    <span className="gf__card-caption">{f.caption}</span>
                    <span className="gf__card-go">Open <Arrow /></span>
                  </span>
                </Link>
              ))}
            </nav>
            </div>
          </div>
        </div>
      </div>
      <RoomMotion />
    </section>
  )
}
