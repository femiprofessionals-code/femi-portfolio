import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import Arrow from '@/components/Arrow'
import { HUNG, MOBILE_CROP, ROOM, TITLE } from '@/content/hang'
import { HERO, PERSON } from '@/content/site'
import RoomMotion from './RoomMotion'

const STAGES = ['morning', 'golden', 'night'] as const
const BASE = '/room/v3'
const u = (v: number, of: number) => `${(v / of) * 100}%`
const hasClip = (s: string) => fs.existsSync(path.join(process.cwd(), 'public', 'room', 'v3', `${s}.mp4`))

/**
 * The homepage room. One photograph per light of day (plus a gentle motion loop for each);
 * the framed prints are part of the photograph, and this component lays the real links,
 * captions and painted wall title over them.
 */
export default function GalleryRoom() {
  return (
    <section className="room3" aria-labelledby="room-title" data-room>
      <div className="room3__viewport">
        <div className="room3__scene" data-scene style={{ ['--crop-x0' as string]: MOBILE_CROP.x0, ['--crop-x1' as string]: MOBILE_CROP.x1 }}>
          {STAGES.map(s => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s} src={`${BASE}/${s}.webp`} alt="" className="room3__layer" data-light={s} width={2508} height={1234} decoding="async" fetchPriority={s === 'night' ? 'low' : 'high'} />
          ))}
          {STAGES.filter(hasClip).map(s => (
            <video key={s} className="room3__layer room3__video" data-light={s} data-src={`${BASE}/${s}.mp4`} muted loop playsInline preload="none" aria-hidden="true" />
          ))}

          {/* Painted on the wall */}
          <div className="walltitle" style={{ left: u(TITLE.cx - TITLE.w / 2, ROOM.w), top: u(TITLE.y, ROOM.h), width: u(TITLE.w, ROOM.w) }}>
            <p className="walltitle__eyebrow">{PERSON.positioning.join('  ·  ')}</p>
            <h1 id="room-title" className="walltitle__name">{PERSON.name}</h1>
            <p className="walltitle__line">{HERO.headline}</p>
          </div>

          {/* The prints on the wall are links to the career story */}
          <nav className="hang" aria-label="Career">
            {HUNG.map(f => {
              const [x, y, w, h] = f.rect
              return (
                <div key={f.id}>
                  <Link href={f.href} className="hang__frame" style={{ left: u(x, ROOM.w), top: u(y, ROOM.h), width: u(w, ROOM.w), height: u(h, ROOM.h) }}>
                    <span className="sr-only">{f.company}, {f.role}, {f.years}</span>
                    <span className="hang__glint" aria-hidden="true" />
                  </Link>
                  <p className="hang__caption" aria-hidden="true" style={{ left: u(x - 20, ROOM.w), top: u(y + h + 16, ROOM.h), width: u(w + 40, ROOM.w) }}>
                    <span className="hang__company">{f.company}</span>
                    <span className="hang__years">{f.years}</span>
                  </p>
                </div>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Phones: the wall reads too small to carry text, so it continues here */}
      <div className="room3__mobile">
        <p className="eyebrow">{PERSON.positioning.join(' · ')}</p>
        <p className="room3__mname">{PERSON.name}</p>
        <p className="room3__mline">{HERO.headline}</p>
        <ul className="room3__list">
          {HUNG.map(f => (
            <li key={f.id}>
              <Link href={f.href}>
                <span className="room3__lc">{f.company}</span>
                <span className="room3__lr">{f.role}</span>
                <span className="room3__ly">{f.years} <Arrow /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <RoomMotion />
    </section>
  )
}
