import Image from 'next/image'
import Link from 'next/link'
import Arrow from '@/components/Arrow'
import Wordmark from '@/components/Wordmark'
import GalleryRoom from '@/components/room/GalleryRoom'
import { Apex, Bars, Crescent, Disc, Monolith, Ring, Rings } from '@/components/Icons'
import { BRIEF_IMAGES } from '@/content/images'
import {
  CAREER_ARC, CLOSING, FEATURED, INSTITUTIONS, METRICS, PERSON, PILLARS, ROLES, THESES,
} from '@/content/site'
import library from '../../public/images/rooms/philosophy-library.webp'
import lounge from '../../public/images/rooms/contact-lounge.webp'

const PILLAR_ICON = { ring: Ring, apex: Apex, rings: Rings, bars: Bars }

const PHILOSOPHY_TILES = [
  { art: Crescent, value: '31', label: 'business units aligned' },
  { art: Monolith, value: '120 days', label: 'from a 12-month plan' },
  { art: Disc, value: '33%', label: 'faster investor onboarding' },
]

export default function HomeView({ room = 'rendered' }: { room?: 'rendered' | 'ai' }) {
  return (
    <>
      {/* 01 — The gallery: a room that follows the light in New York */}
      <GalleryRoom variant={room} />

      {/* 02 — Positioning & proof */}
      <section className="plaques" aria-labelledby="proof-title">
        <h2 id="proof-title" className="sr-only">Positioning and institutional scale</h2>
        <ul className="pillars pillars--flush" aria-label="Positioning">
          {PILLARS.map((p, i) => {
            const Icon = PILLAR_ICON[p.icon]
            return (
              <li key={p.title} className="pillar reveal" data-delay={String(i)}>
                <span className={`pillar__icon pillar__icon--${p.tone}`}><Icon size={40} /></span>
                <span>
                  <span className="pillar__title">{p.title}</span>
                  <span className="pillar__body">{p.body}</span>
                </span>
              </li>
            )
          })}
        </ul>
        <dl className="wrap plaques__legend">
          {METRICS.map(m => (
            <div key={m.value} className="reveal"><dt>{m.value}</dt><dd>{m.label}</dd></div>
          ))}
        </dl>
      </section>

      {/* 03 — Selected work: editorial */}
      <section className="room paper" aria-labelledby="work-title">
        <div className="wrap">
          <div className="split-head">
            <div>
              <p className="eyebrow reveal">Selected work</p>
              <h2 id="work-title" className="h1 reveal" data-delay="1">Programs led across markets, products and private capital.</h2>
            </div>
            <Link href="/work" className="btn reveal" data-delay="2">All six briefs <Arrow /></Link>
          </div>
          <div className="cards">
            {FEATURED.map((b, i) => {
              const img = BRIEF_IMAGES[b.slug]
              return (
                <Link key={b.slug} href={`/work/${b.slug}`} className="card reveal" data-delay={String(i)}>
                  <div className="card__img">
                    <Image src={img.src} alt="" placeholder="blur" sizes="(max-width: 860px) 100vw, 33vw" style={{ objectPosition: img.position }} />
                  </div>
                  <div className="card__label">
                    <span>{b.domain}</span>
                    <Arrow />
                  </div>
                  <h3 className="card__title">{b.title}</h3>
                  <p className="card__body">{b.summary}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 04 — Career thesis: warm white */}
      <section className="room room--warm" aria-labelledby="career-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow reveal">Career arc</p>
            <h2 id="career-title" className="h2 reveal" data-delay="1">{CAREER_ARC}</h2>
          </div>
          <div className="career">
            {ROLES.map(r => (
              <article key={r.company} className="career__row reveal">
                <div className="career__mark">
                  <Wordmark inst={INSTITUTIONS.find(i => i.key === r.institution)!} />
                  <span className="meta">{r.dates}</span>
                </div>
                <div className="career__body">
                  <h3 className="career__title">{r.title}</h3>
                  <p className="body">{r.summary}</p>
                  <p className="career__outcome">{r.outcome}</p>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: '3rem' }} className="reveal">
            <Link href="/experience" className="text-link">Full experience <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* Point of view */}
      <section className="room paper" aria-labelledby="thesis-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow reveal">Point of view</p>
            <h2 id="thesis-title" className="h2 reveal" data-delay="1">Three convictions from the work.</h2>
          </div>
          <div className="pov">
            {THESES.map((t, i) => (
              <article key={t.theme} className="reveal" data-delay={String(i + 1)}>
                <h3 className="eyebrow">{t.theme}</h3>
                <p>{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Operating philosophy: walnut library */}
      <section className="dark-room dark" aria-labelledby="pov-title">
        <Image src={library} alt="" placeholder="blur" sizes="100vw" className="dark-room__img" />
        <div className="wrap dark-room__inner">
          <p className="eyebrow reveal">Operating philosophy</p>
          <h2 id="pov-title" className="dark-room__title reveal" data-delay="1">Clarity Before Motion</h2>
          <p className="dark-room__body reveal" data-delay="2">
            The fastest teams are not always moving first; they are aligned on the right problem first.
          </p>
          <ul className="tiles" aria-label="Proof of operating model">
            {PHILOSOPHY_TILES.map((t, i) => (
              <li key={t.label} className="tile reveal" data-delay={String(i + 1)}>
                <t.art />
                <span className="tile__value">{t.value}</span>
                <span className="tile__label">{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Contact: dark hospitality */}
      <section className="dark-room dark-room--contact dark" aria-labelledby="contact-title">
        <Image src={lounge} alt="" placeholder="blur" sizes="100vw" className="dark-room__img" />
        <div className="wrap dark-room__inner">
          <p className="eyebrow reveal">Contact</p>
          <h2 id="contact-title" className="dark-room__title reveal" data-delay="1">Leading What&rsquo;s Next</h2>
          <p className="dark-room__body reveal" data-delay="2">{CLOSING}</p>
          <div className="reveal" data-delay="3" style={{ display: 'grid', gap: '1.75rem', justifyItems: 'start' }}>
            <Link href="/contact" className="btn btn--wide">Get in touch <Arrow /></Link>
            <div className="contact-links">
              <a className="text-link" href={`mailto:${PERSON.email}`}>Email</a>
              <a className="text-link" href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <Link className="text-link" href="/resume">Résumé</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
