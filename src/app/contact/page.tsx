import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Arrow from '@/components/Arrow'
import { PERSON } from '@/content/site'
import lounge from '../../../public/images/rooms/contact-lounge.webp'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'For roles, collaboration or a thoughtful conversation. New York, NY.',
  alternates: { canonical: '/contact' },
}

const big = { fontFamily: 'var(--display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textDecoration: 'none', color: 'var(--cream)' } as const

export default function ContactPage() {
  return (
    <section className="dark-room dark-room--contact dark" style={{ minHeight: '100vh', paddingTop: 'calc(var(--nav-h) + 4rem)' }} aria-labelledby="contact-title">
      <Image src={lounge} alt="" priority placeholder="blur" sizes="100vw" className="dark-room__img" />
      <div className="wrap dark-room__inner">
        <p className="eyebrow reveal">Contact</p>
        <h1 id="contact-title" className="dark-room__title reveal" data-delay="1" style={{ maxWidth: '11em' }}>
          For roles, collaboration or a thoughtful conversation.
        </h1>
        <dl className="reveal" data-delay="2" style={{ display: 'grid', gap: '1.4rem', borderTop: '1px solid var(--rule-dark)', paddingTop: '2rem', minWidth: 'min(100%, 30rem)' }}>
          <div><dt className="eyebrow">Email</dt><dd><a href={`mailto:${PERSON.email}`} style={big}>{PERSON.email}</a></dd></div>
          <div><dt className="eyebrow">LinkedIn</dt><dd><a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" style={big}>linkedin.com/in/femi-falade</a></dd></div>
          <div><dt className="eyebrow">Based in</dt><dd style={big}>{PERSON.location}</dd></div>
        </dl>
        <div className="reveal" data-delay="3">
          <Link href="/resume" className="btn btn--wide">Résumé <Arrow /></Link>
        </div>
      </div>
    </section>
  )
}
