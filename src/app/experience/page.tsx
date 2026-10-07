import type { Metadata } from 'next'
import Link from 'next/link'
import Arrow from '@/components/Arrow'
import Wordmark from '@/components/Wordmark'
import { EDUCATION, INSTITUTIONS, ROLES } from '@/content/site'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Goldman Sachs, The Carlyle Group and T. Rowe Price — from institutional operations to private equity fund management to markets product and enterprise transformation.',
  alternates: { canonical: '/experience' },
}

export default function ExperiencePage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap page-head__grid">
          <p className="eyebrow reveal">Experience</p>
          <h1 className="display reveal" data-delay="1">Built across institutions where precision is the minimum standard.</h1>
          <p className="lede body reveal" data-delay="2">
            My career has moved from institutional operations to private equity fund management to markets product and
            enterprise transformation. The throughline is ownership of complex work with commercial, regulatory and
            technical consequences.
          </p>
        </div>
      </header>

      <section className="room" style={{ paddingTop: 0 }} aria-label="Roles">
        <div className="wrap">
          <div className="career">
            {ROLES.map(r => (
              <article key={r.company} className="career__row reveal">
                <div className="career__mark">
                  <Wordmark inst={INSTITUTIONS.find(i => i.key === r.institution)!} />
                  <span className="meta">{r.dates}</span>
                  <span className="meta">{r.location}</span>
                </div>
                <div className="career__body">
                  <h2 className="career__title">{r.title}</h2>
                  <p className="body">{r.summary}</p>
                  <p className="career__outcome">{r.outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="room room--plaster" aria-labelledby="edu-title">
        <div className="wrap split">
          <h2 id="edu-title" className="h2 reveal">Education &amp; credentials</h2>
          <div className="reveal" data-delay="1">
            <ul style={{ listStyle: 'none' }}>
              {EDUCATION.map(e => (
                <li key={e} className="serif" style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)', padding: '1.25rem 0', borderBottom: '1px solid var(--rule)' }}>{e}</li>
              ))}
            </ul>
            <div className="btn-row" style={{ marginTop: '3rem' }}>
              <Link href="/resume" className="btn btn--solid">Résumé <Arrow /></Link>
              <Link href="/work" className="btn">Selected work <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
