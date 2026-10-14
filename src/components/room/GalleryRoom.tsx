import Link from 'next/link'
import Arrow from '@/components/Arrow'
import { FRAMES, IDENTITY, ROOM_BASE, ROOM_MODES, SCENE, ZONES, rectStyle } from '@/content/scene'
import { PERSON } from '@/content/site'
import { LOAD_ACTIVE_LIGHT } from '@/lib/roomLights'
import RoomLights from './RoomLights'

const WIDTHS = [1536, 2048, 3072]
const ROOM_DESCRIPTION = 'A quiet gallery room high above New York: three framed paintings on a limestone wall above a leather bench, an olive tree and a sofa by floor-to-ceiling windows.'
/** Rendered scene width per layout (see .room5 in globals.css): crop ≈ 252vw, wall = contain-fit, else full width. */
const SIZES = '(max-width: 599px) 252vw, (min-width: 860px) and (min-height: 646px) min(100vw, calc((100svh - 72px) * 1.5)), 100vw'

/**
 * Homepage room: one scene at the image's intrinsic 3:2 ratio. Layouts, chosen in CSS:
 * wall  — the whole room fits the screen and carries the identity and the company captions;
 * full  — the whole room, with identity and company links underneath (tablets, short screens);
 * crop  — phones see the pictures and bench up close (the scene is positioned inside a window), text underneath.
 */
export default function GalleryRoom() {
  const [cx, cy, cw, ch] = ZONES.mobileCrop
  const crop = { ['--crop-x' as string]: cx, ['--crop-y' as string]: cy, ['--crop-w' as string]: cw, ['--crop-h' as string]: ch }
  return (
    <section className="room5" data-room>
      <div className="room5__stage" style={crop}>
        <div className="room5__scene">
          {/* One image per light, same geometry (docs/asset-lock.md). Sources are attached by LOAD_ACTIVE_LIGHT / RoomLights. */}
          {ROOM_MODES.map(m => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={m} className="room5__layer" data-light={m} alt="" suppressHydrationWarning width={SCENE.w} height={SCENE.h} decoding="async"
              data-src={`${ROOM_BASE}/${m}-2048.webp`} data-srcset={WIDTHS.map(w => `${ROOM_BASE}/${m}-${w}.webp ${w}w`).join(', ')} data-sizes={SIZES} />
          ))}
          <p className="sr-only">{ROOM_DESCRIPTION}</p>
          {FRAMES.map(f => (
            <div key={f.id} className="room5__art" style={{ ...rectStyle(f.mat), ['--art' as string]: `url(/art/lit/morning-${f.id}.webp)` }} aria-hidden="true">
              {/* Each painting lit by that light's own lamp and daylight (public/art/lit, docs/decision-log.md DL-31) */}
              {ROOM_MODES.map(m => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={m} data-light={m} suppressHydrationWarning data-src={`/art/lit/${m}-${f.id}.webp`} alt="" width={480} height={480} decoding="async" />
              ))}
            </div>
          ))}
          <div className="room5__identity" style={rectStyle(ZONES.identity)}>
            <p className="room5__eyebrow">{IDENTITY.positioning}</p>
            <h1 className="room5__name">{PERSON.name}</h1>
            <p className="room5__intro">{IDENTITY.intro}</p>
          </div>
          <nav className="room5__hang" aria-label="Career">
            {FRAMES.map(f => (
              <Link key={f.id} href={f.href} className="room5__frame" style={rectStyle(f.hitbox)}>
                <span className="room5__company">{f.company}</span>
                <span className="room5__dates" aria-hidden="true">{f.years}</span>
                <span className="sr-only">, {f.role}, {f.dates}</span>
              </Link>
            ))}
          </nav>
          {/* Tablet/phone layouts: the paintings stay clickable. Keyboard and screen-reader users use the labelled list below. */}
          <div className="room5__touch" aria-hidden="true">
            {FRAMES.map(f => (
              <Link key={f.id} href={f.href} tabIndex={-1} className="room5__tap" style={rectStyle(f.hitbox)} />
            ))}
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: LOAD_ACTIVE_LIGHT }} />
      </div>

      <div className="room5__below wrap">
        <p className="eyebrow">{IDENTITY.positioning}</p>
        <h1 className="room5__bname">{PERSON.name}</h1>
        <p className="room5__bintro">{IDENTITY.intro}</p>
        <nav aria-label="Career">
          <ul className="room5__list">
            {FRAMES.map(f => (
              <li key={f.id}>
                <Link href={f.href}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${f.art}-thumb.webp`} alt="" width={56} height={56} loading="lazy" />
                  <span className="room5__lc">{f.company}</span>
                  <span className="room5__ld">{f.dates}</span>
                  <span className="sr-only">, {f.role}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <RoomLights />
    </section>
  )
}
