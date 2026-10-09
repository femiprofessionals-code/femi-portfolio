import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Arrow from '@/components/Arrow'
import { PRINCIPLES } from '@/content/site'
import portrait from '../../../public/images/femi-portrait.webp'
import residence from '../../../public/images/rooms/residence-light.webp'

export const metadata: Metadata = {
  title: 'About',
  description:
    'A New York-based financial-services and product leader working across private markets, financial markets and strategic transformation.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap page-head__grid">
          <p className="eyebrow reveal">About</p>
          <h1 className="h1 reveal" data-delay="1">
            I am most useful where the problem is consequential, cross-functional and difficult to make simple.
          </h1>
        </div>
      </header>

      <section className="room" style={{ paddingTop: 0 }} aria-label="Story">
        <div className="wrap split">
          <figure className="reveal">
            <div className="frame">
              <div className="frame__inner" style={{ aspectRatio: '4 / 5' }}>
                <Image src={portrait} alt="Femi Falade" sizes="(max-width: 860px) 90vw, 36vw" placeholder="blur" style={{ objectPosition: '50% 18%' }} />
              </div>
            </div>
          </figure>
          <div className="body lede reveal" data-delay="1" style={{ display: 'grid', gap: '1.4em' }}>
            <p>
              I am a New York-based financial-services and product leader working across private markets, financial
              markets and strategic transformation. My career has been shaped inside institutions where the quality bar is
              high, the stakeholder map is complex and the consequences of execution are real.
            </p>
            <p>
              I began at T. Rowe Price, where I learned the operating discipline behind institutional investing. At The
              Carlyle Group, I moved into EMEA Private Equity Fund Management and worked across fund implementation,
              investor experience, fundraising infrastructure and fund finance. At Goldman Sachs, that foundation expanded
              into front-office product development, market infrastructure, enterprise transformation, client migrations,
              regulatory execution and applied AI.
            </p>
            <p>
              What connects the work is less a function than a way of operating: understand the economics, make
              complexity legible, align the right people around a clear decision, and build the system so it can endure
              beyond the individual who created it.
            </p>
          </div>
        </div>
      </section>

      <section className="room room--walnut dark" aria-labelledby="principles-title">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow reveal">Operating principles</p>
            <h2 id="principles-title" className="h1 reveal" data-delay="1">How I lead complex work.</h2>
          </div>
          <div className="principles">
            {PRINCIPLES.map(p => (
              <div key={p.title} className="reveal">
                <h3 className="h3">{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="room room--plaster" aria-label="Outside work">
        <div className="wrap split" style={{ alignItems: 'center' }}>
          <div className="frame reveal">
            <div className="frame__inner" style={{ aspectRatio: '1 / 1' }}>
              <Image src={residence} alt="" sizes="(max-width: 860px) 90vw, 36vw" placeholder="blur" />
            </div>
          </div>
          <div style={{ display: 'grid', gap: '2rem' }} className="reveal" data-delay="1">
            <p className="h3 italic">
              Outside of work: New York, architecture and interiors, and travel — more than thirty countries and
              counting.
            </p>
            <div className="btn-row">
              <Link href="/experience" className="btn">Experience <Arrow /></Link>
              <Link href="/contact" className="btn btn--solid">Contact <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
