'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE, fadeUp } from '@/components/tokens'

const PROJECTS = [
  { n: '01', title: 'AI Hiring Platform',      desc: 'Pre-screening infrastructure that eliminates resume noise. Built for hiring teams that move fast and cannot afford bad hires.' },
  { n: '02', title: 'Renter Matching',          desc: 'Apartment matching platform built on genuine fit signals. Lifestyle, commute, budget, and preference. Not keyword filters.' },
  { n: '03', title: 'Freelance Infrastructure', desc: 'End-to-end operations platform for independent professionals. Contracts, invoicing, client management. One system.' },
]

export default function SpecialProjectsPage() {
  return (
    <>
      <Nav />
      <section style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 2.5rem 4rem', paddingTop: 58, borderBottom: LINE, background: C.bg }}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted, marginBottom: '1.25rem' }}>
          Special Projects
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 300, lineHeight: 1.03, letterSpacing: '-0.033em', color: C.text, marginBottom: '1rem' }}>
          Three platforms. In development.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontStyle: 'italic', fontWeight: 300, color: C.muted, maxWidth: '44ch' }}>
          Each addresses a market where current solutions are a decade behind the problem.
        </motion.p>
      </section>

      <section style={{ padding: '5rem 2.5rem', background: C.bg }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={p.n} {...fadeUp(i * 0.08)}
              style={{ border: '1px solid rgba(217,119,87,0.18)', padding: '2.5rem 2rem' }}>
              <span style={{ fontFamily: F.sans, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accent, border: '1px solid rgba(217,119,87,0.3)', padding: '3px 10px', display: 'inline-block', marginBottom: 20 }}>In Development</span>
              <p style={{ fontFamily: F.serif, fontSize: '3rem', fontWeight: 300, color: 'rgba(217,119,87,0.12)', lineHeight: 1, marginBottom: 12 }}>{p.n}</p>
              <h3 style={{ fontFamily: F.serif, fontSize: '1.5rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.text, marginBottom: 12 }}>{p.title}</h3>
              <p style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.65, color: C.dim }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.2)} style={{ borderTop: LINE, paddingTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{ fontFamily: F.serif, fontSize: '1.5rem', fontWeight: 300, letterSpacing: '-0.02em', color: C.text, marginBottom: 8 }}>
              Detailed case studies available on request.
            </p>
            <p style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 300, color: C.muted }}>
              Architecture, build decisions, and detailed metrics. Gated for privacy during development.
            </p>
          </div>
          <Link href="/special-projects/case-studies" style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, background: C.accent, color: C.bg, padding: '12px 28px', borderRadius: 100, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Request access
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
