'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE } from '@/components/tokens'

const CATS = [
  {
    id: 'regulatory', label: 'Regulatory',
    headline: 'Compliance delivered at velocity.',
    desc: 'Built on the experience of delivering a CFTC governance framework across 10 departments in 30 days at Goldman Sachs. Regulatory strategy, gap analysis, and framework design — without the usual 6-month timeline.',
    proof: 'CFTC framework · 10 departments · 30 days · Goldman Sachs',
    items: ['Regulatory gap analysis', 'Governance framework design', 'CFTC / SEC compliance architecture', 'Risk & controls documentation', 'Cross-department coordination', 'Regulatory reporting design', 'Audit trail infrastructure', 'Policy and procedure build'],
  },
  {
    id: 'transformation', label: 'Transformation',
    headline: 'Enterprise programs that actually ship.',
    desc: 'Led a $580M entity migration across 31 trading desks at Goldman Sachs and redesigned Carlyle investor onboarding adopted globally. Complex, multi-stakeholder programs delivered on time without disrupting live operations.',
    proof: '$580M migration · 31 trading desks · Goldman Sachs',
    items: ['Program architecture and governance', 'Entity migration management', 'Cross-functional stakeholder coordination', 'Investor relations redesign', 'Operating model transformation', 'Change management and adoption', 'Post-launch optimisation', 'Institutional documentation'],
  },
  {
    id: 'ai', label: 'AI & Tooling',
    headline: 'AI as infrastructure, not decoration.',
    desc: 'Deployed a Claude-based AI workflow tool to 60 team members at Goldman Sachs, cutting review-cycle times by 60%. Also built Salesforce CRM from scratch for all Carlyle EMEA funds. Technology that goes live, gets used daily, and creates measurable outcomes.',
    proof: '60% review reduction · 60 users · Claude deployment · GBM',
    items: ['AI workflow tool design and deployment', 'CRM architecture and build', 'Process automation design', 'Tool evaluation and selection', 'User training and change management', 'Systems integration', 'Data architecture', 'Performance monitoring setup'],
  },
  {
    id: 'advisory', label: 'Advisory',
    headline: 'Strategic clarity before execution.',
    desc: 'Drawing on five years across Goldman Sachs, The Carlyle Group, and T. Rowe Price, across asset management, private equity, and investment banking. Advisory engagements focused on strategy, operating model design, and organisational structure.',
    proof: 'Goldman Sachs · Carlyle Group · T. Rowe Price · 5 years',
    items: ['Operating model design', 'Organisational structure review', 'Business case development', 'Stakeholder alignment facilitation', 'Executive reporting frameworks', 'Investment operations advisory', 'Program diagnostic and audit', 'Strategic roadmap development'],
  },
]

export default function ServicesPage() {
  const [active, setActive] = useState('regulatory')
  const cat = CATS.find(c => c.id === active)!

  return (
    <>
      <Nav />
      <section style={{ minHeight: '55vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 2.5rem 5rem', paddingTop: 58, borderBottom: LINE, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 60% at 90% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)' }} />
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.dim40, marginBottom: '1.5rem' }}>
          What I do
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(3rem,7vw,6.5rem)', fontWeight: 300, lineHeight: 1.03, letterSpacing: '-0.033em', color: C.cream, maxWidth: '16ch', marginBottom: '1.5rem' }}>
          I have the skills to shape what is next.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontWeight: 300, fontStyle: 'italic', color: C.dim40, maxWidth: '42ch' }}>
          Regulatory, transformation, AI tooling, and strategic advisory — built on real institutional experience.
        </motion.p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr' }}>
        {/* Left nav */}
        <div style={{ borderRight: LINE, padding: '3rem 2rem', position: 'sticky', top: 58, alignSelf: 'start' }}>
          <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.28)', marginBottom: '1.5rem' }}>Disciplines</p>
          {CATS.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '1rem 0', borderBottom: LINE }}>
              <span style={{ fontFamily: F.serif, fontSize: '1.45rem', fontWeight: 400, letterSpacing: '-0.02em', color: active === c.id ? C.gold : 'rgba(240,237,232,0.55)', transition: 'color 0.2s' }}>{c.label}</span>
              <span style={{ color: active === c.id ? C.gold : 'rgba(240,237,232,0.2)', transition: 'color 0.2s' }}>→</span>
            </button>
          ))}
        </div>

        {/* Right detail */}
        <div style={{ padding: '3rem 3rem 6rem' }}>
          <motion.div key={active} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.gold, marginBottom: '1.25rem' }}>{cat.label}</p>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.025em', color: C.cream, marginBottom: '1.5rem', maxWidth: '22ch' }}>{cat.headline}</h2>
            <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: C.dim55, maxWidth: '54ch', marginBottom: '1.5rem' }}>{cat.desc}</p>
            <p style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.06em', color: C.dim40, marginBottom: '2.5rem', fontStyle: 'italic' }}>{cat.proof}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {cat.items.map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.35 }}
                  style={{ padding: '0.9rem 0', borderBottom: LINE, borderRight: i % 2 === 0 ? LINE : 'none', paddingRight: i % 2 === 0 ? '2rem' : 0, paddingLeft: i % 2 === 1 ? '2rem' : 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold, flexShrink: 0 }} />
                  <span style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 300, color: 'rgba(240,237,232,0.72)' }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <section style={{ borderTop: LINE, padding: '5rem 2.5rem' }}>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.28)', marginBottom: '2.5rem' }}>
          Institutions I have delivered inside
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'rgba(240,237,232,0.04)' }}>
          {[
            { name: 'Goldman Sachs', role: 'Global Banking & Markets Transformation', stat: '2023 – Present', note: 'CFTC · AI · $580M migration' },
            { name: 'The Carlyle Group', role: 'EMEA Fund Operations', stat: '2021 – 2023', note: 'CRM · Investor onboarding · 27 transactions' },
            { name: 'T. Rowe Price', role: 'Asset Management Operations', stat: '2019 – 2021', note: '$1T+ AUM environment' },
          ].map((o, i) => (
            <motion.div key={o.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{ padding: '2.5rem 2rem', background: C.navy }}>
              <p style={{ fontFamily: F.serif, fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-0.025em', color: C.cream, marginBottom: 6 }}>{o.name}</p>
              <p style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 300, color: C.dim55, marginBottom: 4 }}>{o.role}</p>
              <p style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.05em', color: C.gold, marginBottom: 8 }}>{o.stat}</p>
              <p style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 300, color: C.dim40, fontStyle: 'italic' }}>{o.note}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: LINE, padding: '5rem 2.5rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4.5vw,4rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.025em', color: C.cream, marginBottom: '1.25rem' }}>
            Ready to bring this expertise to your team?
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, color: C.dim55, maxWidth: '44ch', margin: '0 auto 2.5rem' }}>
            A 30-day sprint or a multi-year transformation — let us scope the right engagement.
          </p>
          <Link href="/contact" style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, background: C.gold, color: C.navy, padding: '13px 32px', borderRadius: 100, textDecoration: 'none' }}>
            Start a conversation
          </Link>
        </motion.div>
      </section>
      <Footer />
    </>
  )
}
