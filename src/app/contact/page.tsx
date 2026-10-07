import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Arrow from '@/components/Arrow'
import { PERSON } from '@/content/site'
import lounge from '../../../public/images/rooms/lounge-dark.webp'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'For roles, collaboration or a thoughtful conversation. New York, NY.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <section className="room room--black room-image dark closing" style={{ minHeight: '100vh', paddingTop: 'calc(var(--nav-h) + 4rem)' }} aria-labelledby="contact-title">
      <Image src={lounge} alt="" className="room-image__bg" sizes="100vw" priority placeholder="blur" />
      <div className="wrap">
        <div style={{ maxWidth: '50rem', display: 'grid', gap: '2.5rem' }}>
          <p className="eyebrow reveal">Contact</p>
          <h1 className="display reveal" data-delay="1">For roles, collaboration or a thoughtful conversation.</h1>
          <dl className="reveal" data-delay="2" style={{ display: 'grid', gap: '1.5rem', borderTop: '1px solid var(--rule-dark)', paddingTop: '2rem' }}>
            <div>
              <dt className="eyebrow">Email</dt>
              <dd><a className="serif" href={`mailto:${PERSON.email}`} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textDecoration: 'none' }}>{PERSON.email}</a></dd>
            </div>
            <div>
              <dt className="eyebrow">LinkedIn</dt>
              <dd><a className="serif" href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', textDecoration: 'none' }}>linkedin.com/in/femi-falade</a></dd>
            </div>
            <div>
              <dt className="eyebrow">Based in</dt>
              <dd className="serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>{PERSON.location}</dd>
            </div>
          </dl>
          <div className="reveal" data-delay="3">
            <Link href="/resume" className="text-link">Résumé <Arrow /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}
