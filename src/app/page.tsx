import Image from 'next/image'
import Link from 'next/link'
import Arrow from '@/components/Arrow'
import Artifact from '@/components/Artifact'
import Wordmark from '@/components/Wordmark'
import {
  CAREER_ARC, CLOSING, FEATURED, HERO, INSTITUTIONS, METRICS, PERSON, ROLES, THESES,
} from '@/content/site'
import portrait from '../../public/images/femi-portrait.webp'
import library from '../../public/images/rooms/library-dark.webp'
import lounge from '../../public/images/rooms/lounge-dark.webp'

export default function Home() {
  return (
    <>
      {/* 01 — Arrival */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="eyebrow reveal">{HERO.eyebrow}</p>
            <h1 id="hero-title" className="display reveal" data-delay="1">{HERO.headline}</h1>
            <p className="body reveal" data-delay="2">{HERO.body}</p>
            <div className="btn-row reveal" data-delay="3">
              <Link href="/work" className="btn btn--solid">View selected work <Arrow /></Link>
              <Link href="/resume" className="btn">Download résumé <Arrow /></Link>
            </div>
          </div>
          <figure className="hero__figure reveal" data-delay="2">
            <div className="frame">
              <div className="frame__inner" style={{ aspectRatio: '4 / 5' }}>
                <Image
                  src={portrait}
                  alt="Portrait of Femi Falade"
                  priority
                  sizes="(max-width: 860px) 90vw, 40vw"
                  style={{ objectPosition: '50% 18%' }}
                  placeholder="blur"
                />
              </div>
            </div>
            <figcaption className="plaque">{PERSON.name} · {PERSON.location}</figcaption>
          </figure>
        </div>
      </section>

      {/* 02 — Gallery: institutions + institutional scale */}
      <section className="room room--plaster" aria-labelledby="gallery-title">
        <div className="wrap">
          <h2 id="gallery-title" className="sr-only">Institutions and institutional scale</h2>
          <div className="rail reveal">
            {INSTITUTIONS.map(inst => (
              <div key={inst.key} className="rail__item">
                <Wordmark inst={inst} />
                <span className="eyebrow">{inst.division}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(4rem, 8vw, 7rem)' }}>
            <div className="section-head">
              <p className="eyebrow reveal">Institutional scale</p>
            </div>
            <dl className="metrics">
              {METRICS.map((m, i) => (
                <div key={m.value} className={`metric reveal${i === 0 ? ' metric--impact' : ''}`} data-delay={String(i)}>
                  <dt className="metric__label">{m.label}</dt>
                  <dd className="metric__value" style={{ order: -1 }}>{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 03 — Selected work */}
      <section className="room" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow reveal">Selected work</p>
            <h2 id="work-title" className="h1 reveal" data-delay="1">Programs led across markets, products and private capital.</h2>
          </div>
          <div className="features">
            {FEATURED.map(b => (
              <Link key={b.slug} href={`/work/${b.slug}`} className="feature reveal">
                <div className="feature__art"><Artifact brief={b} thesis /></div>
                <div className="feature__copy">
                  <p className="eyebrow">{b.n} — {b.domain}</p>
                  <h3 className="h2">{b.title}</h3>
                  <p className="lede">{b.summary}</p>
                  <div className="feature__metrics">
                    {b.metrics.slice(0, 2).map(m => (
                      <div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>
                    ))}
                  </div>
                  <span className="text-link" style={{ marginTop: '0.5rem' }}>Read brief <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 'clamp(4rem, 8vw, 6rem)' }} className="reveal">
            <Link href="/work" className="btn">All six briefs <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* 04 — Career arc */}
      <section className="room room--parchment" aria-labelledby="career-title">
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

      {/* 05 — Point of view (dark hospitality) */}
      <section className="room room--walnut room-image dark" aria-labelledby="pov-title">
        <Image src={library} alt="" className="room-image__bg" sizes="100vw" placeholder="blur" />
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow reveal">Point of view</p>
            <h2 id="pov-title" className="h1 reveal" data-delay="1">How I think about the work.</h2>
          </div>
          <div className="theses">
            {THESES.map((t, i) => (
              <article key={t.theme} className="thesis reveal" data-delay={String(i + 1)}>
                <h3 className="eyebrow">{t.theme}</h3>
                <p className="serif">{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Contact */}
      <section className="room room--black room-image dark closing" aria-labelledby="contact-title">
        <Image src={lounge} alt="" className="room-image__bg" sizes="100vw" placeholder="blur" />
        <div className="wrap">
          <div style={{ maxWidth: '46rem', display: 'grid', gap: '2.5rem' }}>
            <p className="eyebrow reveal">Contact</p>
            <h2 id="contact-title" className="h1 reveal" data-delay="1">{CLOSING}</h2>
            <div className="contact-links reveal" data-delay="2">
              <a className="text-link" href={`mailto:${PERSON.email}`}>Email <Arrow /></a>
              <a className="text-link" href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a>
              <Link className="text-link" href="/resume">Résumé <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
