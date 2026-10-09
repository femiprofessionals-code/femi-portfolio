import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Arrow from '@/components/Arrow'
import { Columns, Compass, Globe, Layers } from '@/components/Icons'
import { BRIEF_IMAGES } from '@/content/images'
import { BRIEFS, PERSON, institutionName } from '@/content/site'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return BRIEFS.map(b => ({ slug: b.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const b = BRIEFS.find(x => x.slug === params.slug)
  if (!b) return {}
  return { title: b.title, description: `${b.thesis} ${b.summary}`, alternates: { canonical: `/work/${b.slug}` } }
}

export default function BriefPage({ params }: Props) {
  const i = BRIEFS.findIndex(b => b.slug === params.slug)
  if (i < 0) notFound()
  const b = BRIEFS[i]
  const img = BRIEF_IMAGES[b.slug]
  const subline = b.eyebrow.split(' / ').slice(0, 2).concat('Scale').join('  /  ')
  const others = [1, 2, 3, 4].map(k => BRIEFS[(i + k) % BRIEFS.length])

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
    <article className="paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <header className="brief">
        <div className="wrap brief-hero">
          <div className="brief-hero__copy">
            <p className="eyebrow reveal">
              <Link href="/work" style={{ textDecoration: 'none' }}>Brief {b.n}</Link>
              <span aria-hidden="true">&nbsp;&nbsp;·&nbsp;&nbsp;</span>{b.pillar}
            </p>
            <h1 className="brief-hero__title reveal" data-delay="1">{b.title}</h1>
            <p className="spaced reveal" data-delay="1" style={{ whiteSpace: 'pre-wrap' }}>{subline}</p>
            <p className="brief-hero__thesis reveal" data-delay="2">{b.thesis}</p>
            <dl className="facts reveal" data-delay="3">
              <div className="fact"><Columns /><dt>Institution</dt><dd>{institutionName(b.institution)}</dd></div>
              <div className="fact"><Compass /><dt>Focus</dt><dd>{b.pillar}</dd></div>
              <div className="fact"><Layers /><dt>Scope</dt><dd>{b.domain}</dd></div>
              <div className="fact"><Globe /><dt>Reach</dt><dd>{b.reach}</dd></div>
            </dl>
          </div>
          <div className="brief-hero__photo reveal" data-delay="1">
            <Image src={img.src} alt="" priority placeholder="blur" sizes="(max-width: 960px) 100vw, 58vw" style={{ objectPosition: img.position }} />
          </div>
        </div>

        <div className="wrap">
          <div className="impact reveal">
            <span className="eyebrow" style={{ color: 'var(--ink)' }}>Impact</span>
            {b.metrics.slice(0, 3).map(m => (
              <div key={m.label}>
                <span className="impact__value">{m.value}</span>
                <span className="impact__label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

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
                <p className="serif" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem, 2.8vw, 2.5rem)', lineHeight: 1.25 }}>{b.outcome}</p>
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

      <nav aria-label="More briefs" className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <hr className="rule" style={{ marginBottom: '1.5rem' }} />
        <p className="eyebrow" style={{ color: 'var(--ink)', marginBottom: '1.5rem' }}>Selected work</p>
        <div className="more-work">
          {others.map(o => {
            const oi = BRIEF_IMAGES[o.slug]
            return (
              <Link key={o.slug} href={`/work/${o.slug}`} className="card">
                <div className="card__img">
                  <Image src={oi.src} alt="" placeholder="blur" sizes="(max-width: 560px) 100vw, 25vw" style={{ objectPosition: oi.position }} />
                </div>
                <div className="card__label"><span>{o.domain}</span><Arrow /></div>
                <span className="card__title">{o.title}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </article>
  )
}
