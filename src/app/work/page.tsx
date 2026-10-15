import type { Metadata } from 'next'
import Link from 'next/link'
import Arrow from '@/components/Arrow'
import { BRIEFS, institutionName } from '@/content/site'

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Executive accomplishment briefs across product strategy, market infrastructure, strategic transformation, M&A integration, private equity and fund finance.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <div className="paper">
      <header className="page-head">
        <div className="wrap page-head__grid">
          <p className="eyebrow reveal">Selected work</p>
          <h1 className="display reveal" data-delay="1">Selected work across markets, products and private capital.</h1>
          <p className="lede body reveal" data-delay="2">
            A curated set of programs I have led or materially driven across Goldman Sachs and The Carlyle Group. Each brief
            focuses on the mandate, institutional complexity, leadership required and measurable outcome.
          </p>
        </div>
      </header>


      <section className="room" style={{ paddingTop: 0 }} aria-label="Accomplishment briefs">
        {/* same column as the page heading above */}
        <div className="wrap" style={{ maxWidth: '64rem' }}>
          <hr className="rule" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }} />
          <div className="work-list">
            {BRIEFS.map(b => {
              return (
                <article key={b.slug} className="work-item reveal">
                  <div className="work-item__copy">
                    <p className="eyebrow">{b.n} — {b.domain}</p>
                    <h2 className="h2"><Link href={`/work/${b.slug}`} style={{ textDecoration: 'none' }}>{b.title}</Link></h2>
                    <p className="lede">{b.thesis}</p>
                    <div className="mini-metrics">
                      {b.metrics.map(m => (
                        <div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <span className="meta">{institutionName(b.institution)}</span>
                      <Link href={`/work/${b.slug}`} className="text-link">Read brief <Arrow /><span className="sr-only">: {b.title}</span></Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
