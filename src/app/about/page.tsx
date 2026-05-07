'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE } from '@/components/tokens'

const TIMELINE = [
  { year: 'Nov 2023 — Present',  co: 'Goldman Sachs',          role: 'Senior Associate, Global Banking and Markets Transformation', body: 'Leading enterprise-scale transformation inside Global Banking and Markets. CFTC regulatory frameworks delivered in 30 days. A $580M entity migration across 31 trading desks. A Claude-based AI workflow tool deployed to 60 team members. Review cycles cut by 60 percent.' },
  { year: 'Jun 2021 — Nov 2023', co: 'The Carlyle Group',      role: 'Associate, EMEA Fund Operations',                              body: 'Built Salesforce CRM for all EMEA private equity funds from scratch. Redesigned investor onboarding adopted as the global standard. Operated across approximately 27 annual transactions.' },
  { year: 'Oct 2019 — Jun 2021', co: 'T. Rowe Price',          role: 'Analyst, Central Operations',                                  body: 'Foundation in institutional operations. Trade settlement, position reconciliation, and operational coordination across global investment platforms. The discipline that underpins every role since.' },
  { year: 'Aug 2016 — May 2020', co: 'Morgan State University', role: 'B.S. Finance',                                                 body: 'Capital markets, financial theory, and quantitative analysis. The foundation for institutional finance.' },
]

const VALUES = [
  { title: 'Precision over polish.', body: 'A framework that works beats a presentation that dazzles. Outcomes over optics.' },
  { title: 'Speed with rigor.',       body: 'The 30-day CFTC framework was fast because the thinking was done upfront. Not because corners were cut.' },
  { title: 'Build to hand off.',      body: 'The best programs do not require the person who built them. Designed for institutional durability.' },
  { title: 'AI as infrastructure.',   body: 'Not a demo. Not a pilot. AI tools that go into production and get used daily.' },
]

function TItem({ t, i }: { t: typeof TIMELINE[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inV = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.09, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: '2.5rem', padding: '2.75rem 0', borderTop: LINE }}
      className="timeline-row">
      <p style={{ fontFamily: F.serif, fontSize: '1.35rem', fontWeight: 400, color: C.accent, letterSpacing: '-0.005em', lineHeight: 1.35 }}>{t.year}</p>
      <div>
        <p style={{ fontFamily: F.serif, fontSize: '1.85rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.text, marginBottom: 8 }}>{t.co}</p>
        <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 400, letterSpacing: '0.04em', color: C.muted, marginBottom: 16 }}>{t.role}</p>
        <p style={{ fontFamily: F.sans, fontSize: 17, fontWeight: 300, lineHeight: 1.75, color: C.dim }}>{t.body}</p>
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section style={{
        minHeight: '88vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(5rem, 8vw, 6rem) clamp(1.25rem, 4vw, 2.5rem) clamp(3rem, 6vw, 5rem)',
        borderBottom: LINE, position: 'relative', overflow: 'hidden', background: C.bg,
      }}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted, marginBottom: '1.75rem' }}>
          About Femi Falade
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(2.4rem, 5.5vw, 5.4rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.025em', color: C.text, maxWidth: '28ch', marginBottom: '2rem' }}>
          I build operational systems. I ship programs that scale. I do this inside institutions that move markets.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.8 }}
          style={{ fontFamily: F.sans, fontSize: 'clamp(16px, 2.2vw, 19px)', fontWeight: 300, lineHeight: 1.8, color: C.dim, maxWidth: '62ch' }}>
          Six years across Goldman Sachs, The Carlyle Group, and T. Rowe Price. Three AI-native platforms in development. Goldman-caliber operational discipline applied to transformation programs that actually ship.
        </motion.p>
      </section>

      {/* STATS */}
      <section style={{ borderBottom: LINE, padding: 'clamp(2.5rem, 4vw, 3.5rem) clamp(1.25rem, 4vw, 2.5rem)', background: C.bg }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
          {[['6+', 'Years in institutional finance'], ['$580M', 'Migration managed'], ['60%', 'Cycle time reduced'], ['27', 'Annual transactions'], ['3', 'AI platforms building']].map(([v, l], i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }}>
              <p style={{ fontFamily: F.serif, fontSize: 'clamp(1.7rem, 3vw, 2.7rem)', fontWeight: 300, color: C.text, letterSpacing: '-0.03em', marginBottom: 8 }}>{v}</p>
              <p style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, lineHeight: 1.4 }}>{l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BIO with HEADSHOT — bulletproof container with fixed dimensions */}
      <section className="bio-section" style={{
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.25rem, 4vw, 2.5rem)',
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: 'clamp(2rem, 4vw, 5rem)',
        borderBottom: LINE, alignItems: 'start', background: C.bg,
        maxWidth: 1280, margin: '0 auto',
      }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="bio-sticky" style={{ position: 'sticky', top: 90 }}>

          {/*
            HEADSHOT — locked to fixed pixel dimensions per breakpoint.
            This is the most reliable method that works on every browser.
            320×400px desktop, scales to 280×350 on small mobile via CSS.
          */}
          <div className="headshot-frame" style={{
            width: 320,
            height: 400,
            maxWidth: '100%',
            background: 'rgba(217,119,87,0.06)',
            border: '1px solid rgba(217,119,87,0.18)',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '2rem',
          }}>
            <img
              src="/images/femi-headshot.jpg"
              alt="Femi Falade"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 25%',
                display: 'block',
                zIndex: 2,
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: F.serif,
                fontSize: '5rem',
                fontWeight: 300,
                color: 'rgba(217,119,87,0.25)',
                letterSpacing: '-0.04em',
              }}>FF</span>
            </div>
          </div>

          <p style={{ fontFamily: F.sans, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: '1rem' }}>The story</p>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.65rem, 2.5vw, 2.4rem)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.025em', color: C.text, maxWidth: '18ch' }}>
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
              style={{ fontFamily: F.sans, fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 300, lineHeight: 1.85, color: C.dim, marginBottom: '1.5rem' }}>
              {para}
            </motion.p>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1.25rem, 4vw, 2.5rem)', borderBottom: LINE, background: C.bg }}>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: '3rem' }}>
          Operating principles
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, background: C.line }}>
          {VALUES.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.65 }}
              style={{ padding: 'clamp(1.75rem, 3vw, 2.75rem) clamp(1.5rem, 3vw, 2.25rem)', background: C.bg }}>
              <h3 style={{ fontFamily: F.serif, fontSize: 'clamp(1.4rem, 2vw, 1.75rem)', fontWeight: 400, letterSpacing: '-0.02em', color: C.accent, marginBottom: 14 }}>{v.title}</h3>
              <p style={{ fontFamily: F.sans, fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: C.dim }}>{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1.25rem, 4vw, 2.5rem)', borderBottom: LINE, background: C.bg, maxWidth: 1280, margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: '3rem' }}>
          Career timeline
        </motion.p>
        {TIMELINE.map((t, i) => <TItem key={i} t={t} i={i} />)}
      </section>

      <section style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1.25rem, 4vw, 2.5rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', background: C.bg }}>
        <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem, 4vw, 3.75rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.025em', color: C.text, maxWidth: '22ch' }}>
          Seen enough? Let us talk about what I can do for you.
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/work" style={{ fontFamily: F.sans, fontSize: 15, border: LINE, color: C.text, padding: '14px 28px', borderRadius: 100, textDecoration: 'none' }}>View work</Link>
          <Link href="/contact" style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 500, background: C.accent, color: C.bg, padding: '14px 28px', borderRadius: 100, textDecoration: 'none' }}>Start a conversation</Link>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        /* Headshot responsive sizing */
        @media (max-width: 1024px) {
          .headshot-frame {
            width: 280px !important;
            height: 350px !important;
          }
        }

        @media (max-width: 768px) {
          .bio-section {
            grid-template-columns: 1fr !important;
          }
          .bio-sticky {
            position: static !important;
            text-align: center;
          }
          .headshot-frame {
            width: 280px !important;
            height: 350px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .timeline-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
        }

        @media (max-width: 420px) {
          .headshot-frame {
            width: 240px !important;
            height: 300px !important;
          }
        }
      `}</style>
    </>
  )
}