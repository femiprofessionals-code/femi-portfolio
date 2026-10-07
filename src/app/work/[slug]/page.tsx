import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Arrow from '@/components/Arrow'
import Artifact from '@/components/Artifact'
import { BRIEFS, PERSON } from '@/content/site'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return BRIEFS.map(b => ({ slug: b.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const b = BRIEFS.find(x => x.slug === params.slug)
  if (!b) return {}
  return {
    title: b.title,
    description: `${b.thesis} ${b.summary}`,
    alternates: { canonical: `/work/${b.slug}` },
  }
}

export default function BriefPage({ params }: Props) {
  const i = BRIEFS.findIndex(b => b.slug === params.slug)
  if (i < 0) notFound()
  const b = BRIEFS[i]
  const prev = BRIEFS[(i - 1 + BRIEFS.length) % BRIEFS.length]
  const next = BRIEFS[(i + 1) % BRIEFS.length]

  const sections: { label: string; body: React.ReactNode }[] = [
    { label: 'Context', body: <p>{b.context}</p> },
    { label: 'Mandate', body: <p>{b.mandate}</p> },
    { label: 'What I led', body: <ul>{b.led.map(l => <li key={l}>{l}</li>)}</ul> },
    { label: 'Scale', body: <p>{b.scale}</p> },
  ]
  if (b.scope) sections.push({ label: 'Product scope', body: <p>{b.scope}</p> })

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: PERSON.url },
      { '@type': 'ListItem', position: 2, name: 'Selected Work', item: `${PERSON.url}/work` },
      { '@type': 'ListItem', position: 3, name: b.title, item: `${PERSON.url}/work/${b.slug}` },
    ],
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <header className="page-head">
        <div className="wrap brief-hero">
          <div className="page-head__grid">
            <nav aria-label="Breadcrumb" className="meta reveal">
              <Link href="/work">Selected work</Link> / {b.n}
            </nav>
            <p className="eyebrow reveal">{b.eyebrow}</p>
            <h1 className="h1 reveal" data-delay="1">{b.title}</h1>
            <p className="lede italic reveal" data-delay="2">{b.thesis}</p>
          </div>
          <div className="reveal" data-delay="2"><Artifact brief={b} /></div>
        </div>
      </header>

      <div className="wrap">
        <div className="brief-facts reveal">
          {b.metrics.map(m => (
            <div key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="room" aria-label="Brief">
        <div className="wrap">
          {sections.map((s, k) => (
            <div key={s.label} className="brief-section reveal">
              <h2 className="brief-section__label">
                <span className="n">{String(k + 1).padStart(2, '0')}</span>
                <span className="eyebrow">{s.label}</span>
              </h2>
              <div className="body">{s.body}</div>
            </div>
          ))}

          {b.outcome && (
            <div className="brief-section reveal">
              <h2 className="brief-section__label">
                <span className="n">{String(sections.length + 1).padStart(2, '0')}</span>
                <span className="eyebrow">Outcome</span>
              </h2>
              <div className="panel panel--dark dark">
                <p className="serif" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)', lineHeight: 1.3 }}>{b.outcome}</p>
              </div>
            </div>
          )}

          <div className="brief-section reveal">
            <h2 className="brief-section__label">
              <span className="n">{String(sections.length + (b.outcome ? 2 : 1)).padStart(2, '0')}</span>
              <span className="eyebrow">Leadership signal</span>
            </h2>
            <div className="panel panel--light">
              <p className="serif" style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)', lineHeight: 1.35 }}>{b.signal}</p>
            </div>
          </div>
        </div>
      </section>

      <nav className="wrap" aria-label="More briefs" style={{ paddingBottom: 'var(--section)' }}>
        <div className="pager">
          <Link href={`/work/${prev.slug}`}>
            <span className="eyebrow">Previous brief</span>
            <span className="serif">{prev.title}</span>
          </Link>
          <Link href={`/work/${next.slug}`}>
            <span className="eyebrow">Next brief</span>
            <span className="serif">{next.title}</span>
          </Link>
        </div>
        <div style={{ marginTop: '2.5rem' }}>
          <Link href="/work" className="text-link">All selected work <Arrow /></Link>
        </div>
      </nav>
    </article>
  )
}
