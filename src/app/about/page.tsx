'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE } from '@/components/tokens'

const TIMELINE = [
  { year: '2023', co: 'Goldman Sachs', role: 'Senior Associate — Global Banking & Markets Transformation', body: 'Leading enterprise-scale transformation inside Global Banking & Markets. CFTC regulatory frameworks in 30 days. A $580M entity migration across 31 trading desks. A Claude-based AI tool deployed to 60 team members that cut review cycles by 60%. This is where the scale and ambition match.' },
  { year: '2021', co: 'The Carlyle Group', role: 'Associate — EMEA Fund Operations', body: 'Moved from public markets into private equity. Built Salesforce CRM for all EMEA funds from scratch. Redesigned investor onboarding that became the global standard. Executed approximately 27 annual transactions. Twenty-seven transactions a year teaches you to operate without margin for error.' },
  { year: '2019', co: 'T. Rowe Price', role: 'Analyst — Asset Management Operations', body: 'First institutional role inside a $1T+ AUM environment. Built the analytical rigour, process discipline, and institutional habits that underpin every role since. Public markets as the foundation; everything else built on top.' },
  { year: '2019', co: 'Morgan State University', role: 'B.S. Finance', body: 'Where the instinct for systems and structure was first formalised. Capital markets, financial theory, and quantitative analysis. The intellectual foundation for institutional finance.' },
]

const VALUES = [
  { title: 'Precision over polish.', body: 'A framework that works beats a presentation that dazzles. Outcomes over optics — always.' },
  { title: 'Speed with rigour.', body: 'The 30-day CFTC framework was fast because the thinking was done upfront, not because corners were cut.' },
  { title: 'Build to hand off.', body: 'The best programs do not require the person who built them. I design for institutional durability.' },
  { title: 'AI as infrastructure.', body: 'Not a demo, not a pilot. AI tools that go into production, get used daily, and free teams to do harder work.' },
]

function TItem({ t, i }: { t: typeof TIMELINE[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inV = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.09, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: '2rem', padding: '2.5rem 0', borderTop: LINE }}>
      <p style={{ fontFamily: F.serif, fontSize: '1.4rem', fontWeight: 300, color: C.gold, letterSpacing: '-0.02em' }}>{t.year}</p>
      <div>
        <p style={{ fontFamily: F.serif, fontSize: '1.35rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.cream, marginBottom: 4 }}>{t.co}</p>
        <p style={{ fontFamily: F.sans, fontSize: 11.5, fontWeight: 300, letterSpacing: '0.04em', color: C.dim40, marginBottom: 12 }}>{t.role}</p>
        <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: C.dim55 }}>{t.body}</p>
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* Manifesto hero */}
      <section style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2.5rem', paddingTop: 58, borderBottom: LINE, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-1rem', top: '50%', transform: 'translateY(-50%)', fontFamily: F.serif, fontSize: 'clamp(12rem,22vw,20rem)', fontWeight: 300, color: 'rgba(240,237,232,0.018)', letterSpacing: '-0.08em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>FF</div>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.dim40, marginBottom: '1.75rem' }}>
          About Femi Falade
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(2.2rem,5.5vw,5.2rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.025em', color: C.cream, maxWidth: '28ch', marginBottom: '2.5rem' }}>
          A catalyst for transformation inside institutions that move markets — and a builder of platforms that will define the next ones.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.8 }}
          style={{ fontFamily: F.sans, fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: C.dim55, maxWidth: '58ch' }}>
          Five years across Goldman Sachs, The Carlyle Group, and T. Rowe Price. Three AI-native platforms in development. One conviction: the best operational infrastructure is invisible — until the moment it is the only thing standing between you and a crisis.
        </motion.p>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: LINE, padding: '3rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
          {[['5+','Years in institutional finance'],['$580M','Migration managed'],['60%','Cycle time reduced'],['27','Annual transactions'],['3','AI platforms building']].map(([v, l], i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }}>
              <p style={{ fontFamily: F.serif, fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 300, color: C.cream, letterSpacing: '-0.03em', marginBottom: 6 }}>{v}</p>
              <p style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.dim40, lineHeight: 1.4 }}>{l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bio */}
      <section style={{ padding: '6rem 2.5rem', display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: '6rem', borderBottom: LINE, alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ position: 'sticky', top: 80 }}>
          <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.28)', marginBottom: '1.5rem' }}>The story</p>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.8rem,3vw,2.75rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.025em', color: C.cream, maxWidth: '18ch' }}>
            Operational discipline, built inside the hardest rooms.
          </h2>
        </motion.div>
        <div>
          {[
            'I started at T. Rowe Price — one of the largest active asset managers in the world — learning what rigorous financial operations actually look like at scale. That foundation never left.',
            'At The Carlyle Group, I moved into private equity fund operations, eventually building the EMEA Salesforce CRM from scratch and redesigning the investor onboarding workflow that became the global standard. Twenty-seven transactions a year teaches you to operate without margin for error.',
            'Goldman Sachs is where the scale changed entirely. CFTC regulatory frameworks across ten departments in thirty days. A $580M entity migration across thirty-one trading desks. And the work I am most proud of — deploying a Claude-based AI workflow tool to sixty team members in Global Banking & Markets, cutting review-cycle times by sixty percent.',
            'That deployment proved the thesis I had been building toward: AI is not a feature, it is infrastructure. Not a demo you show a committee. A tool that goes into production on Monday and makes the whole team faster by Thursday.',
            'In parallel, I am building three AI-native platforms under a single holding company — a hiring pre-screening platform, a renter-to-apartment matching product, and a freelance task marketplace. Each attacks a market where current solutions are a decade behind the problem.',
          ].map((para, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.65 }}
              style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: C.dim65, marginBottom: '1.5rem' }}>
              {para}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '6rem 2.5rem', borderBottom: LINE }}>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.28)', marginBottom: '3rem' }}>
          Operating principles
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, background: 'rgba(240,237,232,0.04)' }}>
          {VALUES.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.65 }}
              style={{ padding: '2.5rem 2rem', background: C.navy }}>
              <h3 style={{ fontFamily: F.serif, fontSize: '1.5rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.gold, marginBottom: 12 }}>{v.title}</h3>
              <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: C.dim55 }}>{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '6rem 2.5rem', borderBottom: LINE }}>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.28)', marginBottom: '3rem' }}>
          Career timeline
        </motion.p>
        {TIMELINE.map((t, i) => <TItem key={i} t={t} i={i} />)}
      </section>

      <section style={{ padding: '6rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.025em', color: C.cream, maxWidth: '22ch' }}>
          Seen enough? Let us talk about what I can do for you.
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/work" style={{ fontFamily: F.sans, fontSize: 13, border: LINE, color: C.cream, padding: '12px 24px', borderRadius: 100, textDecoration: 'none' }}>View work</Link>
          <Link href="/contact" style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, background: C.gold, color: C.navy, padding: '12px 24px', borderRadius: 100, textDecoration: 'none' }}>Start a conversation</Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
