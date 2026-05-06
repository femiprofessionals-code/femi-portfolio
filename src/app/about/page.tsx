'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE } from '@/components/tokens'

const TIMELINE = [
  { year: 'Nov 2023',  co: 'Goldman Sachs',          role: 'Senior Associate, Global Banking and Markets Transformation', body: 'Leading enterprise-scale transformation inside Global Banking and Markets. CFTC regulatory frameworks delivered in 30 days. A $580M entity migration across 31 trading desks. A Claude-based AI workflow tool deployed to 60 team members. Review cycles cut by 60 percent.' },
  { year: 'Jun 2021',  co: 'The Carlyle Group',      role: 'Associate, EMEA Fund Operations',                              body: 'Built Salesforce CRM for all EMEA private equity funds from scratch. Redesigned investor onboarding adopted as the global standard. Operated across approximately 27 annual transactions.' },
  { year: 'Oct 2019',  co: 'T. Rowe Price',          role: 'Analyst, Central Operations',                                  body: 'Foundation in institutional operations. Trade settlement, position reconciliation, and operational coordination across global investment platforms. The discipline that underpins every role since.' },
  { year: '2015–2019', co: 'Morgan State University', role: 'B.S. Finance',                                                 body: 'Capital markets, financial theory, and quantitative analysis. The foundation for institutional finance.' },
]

const VALUES = [
  { title: 'Precision over polish.',     body: 'A framework that works beats a presentation that dazzles. Outcomes over optics.' },
  { title: 'Speed with rigor.',          body: 'The 30-day CFTC framework was fast because the thinking was done upfront. Not because corners were cut.' },
  { title: 'Build to hand off.',         body: 'The best programs do not require the person who built them. Designed for institutional durability.' },
  { title: 'AI as infrastructure.',      body: 'Not a demo. Not a pilot. AI tools that go into production and get used daily.' },
]

function TItem({ t, i }: { t: typeof TIMELINE[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inV = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.09, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '2rem', padding: '2.5rem 0', borderTop: LINE }}>
      <p style={{ fontFamily: F.serif, fontSize: '1.3rem', fontWeight: 300, color: C.accent, letterSpacing: '-0.01em' }}>{t.year}</p>
      <div>
        <p style={{ fontFamily: F.serif, fontSize: '1.35rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.text, marginBottom: 4 }}>{t.co}</p>
        <p style={{ fontFamily: F.sans, fontSize: 11.5, fontWeight: 300, letterSpacing: '0.04em', color: C.muted, marginBottom: 12 }}>{t.role}</p>
        <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: C.dim }}>{t.body}</p>
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2.5rem', paddingTop: 58, borderBottom: LINE, position: 'relative', overflow: 'hidden', background: C.bg }}>
        <div style={{ position: 'absolute', right: '-1rem', top: '50%', transform: 'translateY(-50%)', fontFamily: F.serif, fontSize: 'clamp(12rem,22vw,20rem)', fontWeight: 300, color: 'rgba(217,119,87,0.05)', letterSpacing: '-0.08em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>FF</div>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted, marginBottom: '1.75rem' }}>
          About Femi Falade
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(2.4rem,5.5vw,5.2rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.025em', color: C.text, maxWidth: '28ch', marginBottom: '2rem' }}>
          I build operational systems. I ship programs that scale. I do this inside institutions that move markets.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.8 }}
          style={{ fontFamily: F.sans, fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: C.dim, maxWidth: '60ch' }}>
          Six years across Goldman Sachs, The Carlyle Group, and T. Rowe Price. Three AI-native platforms in development. Goldman-caliber operational discipline applied to transformation programs that actually ship.
        </motion.p>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: LINE, padding: '3rem 2.5rem', background: C.bg }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
          {[['6+','Years in institutional finance'],['$580M','Migration managed'],['60%','Cycle time reduced'],['27','Annual transactions'],['3','AI platforms building']].map(([v, l], i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }}>
              <p style={{ fontFamily: F.serif, fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 300, color: C.text, letterSpacing: '-0.03em', marginBottom: 6 }}>{v}</p>
              <p style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, lineHeight: 1.4 }}>{l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bio with headshot */}
      <section style={{ padding: '6rem 2.5rem', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', borderBottom: LINE, alignItems: 'start', background: C.bg }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ position: 'sticky', top: 80 }}>
          {/* Headshot placeholder — drop a real photo at /public/images/femi-headshot.jpg */}
          <div style={{
            width: '100%', aspectRatio: '3/4',
            background: 'rgba(217,119,87,0.06)',
            border: '1px solid rgba(217,119,87,0.15)',
            marginBottom: '2rem', overflow: 'hidden', position: 'relative',
          }}>
            <img
              src="/images/femi-headshot.jpg"
              alt="Femi Falade"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', position: 'relative', zIndex: 2 }}
            />
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: F.serif, fontSize: '5rem', fontWeight: 300, color: 'rgba(217,119,87,0.25)', letterSpacing: '-0.04em' }}>FF</span>
            </div>
          </div>

          <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: '1rem' }}>The story</p>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.5rem,2.5vw,2.25rem)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.025em', color: C.text, maxWidth: '18ch' }}>
            Operational discipline, built inside the hardest rooms.
          </h2>
        </motion.div>

        <div>
          {[
            'I started at T. Rowe Price. One of the largest active asset managers in the world. I learned what rigorous financial operations actually look like at scale. That foundation never left.',
            'At The Carlyle Group, I moved into private equity fund operations. I built the EMEA Salesforce CRM from scratch. I redesigned the investor onboarding workflow. It became the global standard. Twenty-seven transactions a year teaches you to operate without margin for error.',
            'Goldman Sachs is where the scale changed entirely. CFTC regulatory frameworks across ten departments in thirty days. A $580M entity migration across thirty-one trading desks. And the work I am most proud of. Deploying a Claude-based AI workflow tool to sixty team members in Global Banking and Markets. Cutting review-cycle times by sixty percent.',
            'That deployment proved the thesis I had been building toward. AI is not a feature. It is infrastructure. Not a demo for a committee. A tool that goes into production on Monday and makes the team faster by Thursday.',
            'In parallel, I am building three AI-native platforms under a single holding company. A hiring pre-screening platform. A renter-to-apartment matching product. A freelance task marketplace. Each attacks a market where current solutions are a decade behind the problem.',
          ].map((para, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.65 }}
              style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: C.dim, marginBottom: '1.5rem' }}>
              {para}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '6rem 2.5rem', borderBottom: LINE, background: C.bg }}>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: '3rem' }}>
          Operating principles
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, background: C.line }}>
          {VALUES.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.65 }}
              style={{ padding: '2.5rem 2rem', background: C.bg }}>
              <h3 style={{ fontFamily: F.serif, fontSize: '1.5rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.accent, marginBottom: 12 }}>{v.title}</h3>
              <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: C.dim }}>{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '6rem 2.5rem', borderBottom: LINE, background: C.bg }}>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: '3rem' }}>
          Career timeline
        </motion.p>
        {TIMELINE.map((t, i) => <TItem key={i} t={t} i={i} />)}
      </section>

      <section style={{ padding: '6rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', background: C.bg }}>
        <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.025em', color: C.text, maxWidth: '22ch' }}>
          Seen enough? Let us talk about what I can do for you.
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/work" style={{ fontFamily: F.sans, fontSize: 13, border: LINE, color: C.text, padding: '12px 24px', borderRadius: 100, textDecoration: 'none' }}>View work</Link>
          <Link href="/contact" style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, background: C.accent, color: C.bg, padding: '12px 24px', borderRadius: 100, textDecoration: 'none' }}>Start a conversation</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
