'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE } from '@/components/tokens'

const FILTERS = ['All', 'AI & Technology', 'Regulatory', 'Finance', 'Operations']

const ITEMS = [
  {
    id: 1, company: 'Goldman Sachs', subtitle: 'Claude AI Workflow Deployment',
    tags: ['AI & Technology', 'Operations'],
    period: '2023', stat: '60%', statLabel: 'Faster review cycles',
    desc: 'Designed and deployed a Claude-based AI workflow tool to 60 team members across Global Banking & Markets. Restructured document review pipelines, cutting cycle times by 60% and eliminating a full category of manual processing.',
    bg: '#0A1E35', wide: false,
  },
  {
    id: 2, company: 'Goldman Sachs', subtitle: '$580M Entity Migration',
    tags: ['Finance', 'Operations'],
    period: '2024', stat: '$580M', statLabel: 'Assets migrated',
    desc: 'Led a $580M entity migration across 31 trading desks, coordinating across legal, risk, technology, and operations. Zero disruption to active positions. Delivered on schedule across a compressed timeline.',
    bg: '#0D2540', wide: false,
  },
  {
    id: 3, company: 'Goldman Sachs', subtitle: 'CFTC Regulatory Governance Framework',
    tags: ['Regulatory', 'Operations'],
    period: '2024', stat: '30 Days', statLabel: 'End-to-end delivery',
    desc: 'Built a CFTC regulatory governance framework across 10 departments in under 30 days — setting precedent for compliance velocity inside Global Banking & Markets. Became the reference standard for subsequent regulatory programs.',
    bg: '#0E1A30', wide: true,
  },
  {
    id: 4, company: 'The Carlyle Group', subtitle: 'Salesforce CRM — EMEA Funds',
    tags: ['AI & Technology', 'Operations'],
    period: '2022', stat: 'Global', statLabel: 'Standard adopted',
    desc: 'Built Salesforce CRM from scratch for all Carlyle EMEA private equity funds. Architected data models, automated investor workflows, and trained the team. Architecture subsequently adopted as the global standard across all fund families.',
    bg: '#0C1A0A', wide: false,
  },
  {
    id: 5, company: 'The Carlyle Group', subtitle: 'Investor Onboarding Redesign',
    tags: ['Operations', 'Finance'],
    period: '2022', stat: '27', statLabel: 'Annual transactions',
    desc: 'Redesigned investor onboarding across approximately 27 annual transactions. Eliminated redundant touchpoints, built structured data-capture flows, and reduced time-to-close. Adopted as global standard across Carlyle fund families.',
    bg: '#0F1E0D', wide: false,
  },
  {
    id: 6, company: 'T. Rowe Price', subtitle: 'Asset Management Operations',
    tags: ['Finance', 'Operations'],
    period: '2019-2021', stat: '$1T+', statLabel: 'AUM environment',
    desc: 'Built analytical and operational rigour inside one of the largest active asset managers in the world. The precision standards and institutional habits formed here underpin every program since.',
    bg: '#1C1008', wide: true,
  },
]

function Card({ item, show }: { item: typeof ITEMS[0]; show: boolean }) {
  const [hov, setHov] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inV = useInView(ref, { once: true, margin: '-30px' })
  if (!show) return null
  return (
    <motion.div ref={ref} layout
      initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ gridColumn: item.wide ? 'span 2' : 'span 1', background: C.navy, cursor: 'default' }}>
      <div style={{ aspectRatio: item.wide ? '21/8' : '4/3', background: item.bg, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: F.serif, fontWeight: 300, fontSize: item.wide ? '12rem' : '7rem', color: 'rgba(240,237,232,0.03)', letterSpacing: '-0.07em', userSelect: 'none', transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)', display: 'block' }}>
          {item.company.split(' ').map(w => w[0]).join('')}
        </span>
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
          <p style={{ fontFamily: F.serif, fontSize: item.wide ? '3.25rem' : '2.5rem', fontWeight: 300, color: C.gold, lineHeight: 1, letterSpacing: '-0.04em' }}>{item.stat}</p>
          <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginTop: 4 }}>{item.statLabel}</p>
        </div>
        <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: F.sans, fontSize: 10, letterSpacing: '0.08em', color: C.dim40, border: LINE, padding: '3px 10px' }}>{item.period}</span>
      </div>
      <div style={{ padding: '1.25rem 1.5rem 2rem' }}>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
          {item.tags.map(t => <span key={t} style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase', color: C.dim40, border: LINE, padding: '2px 9px' }}>{t}</span>)}
        </div>
        <p style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.04em', color: C.gold, marginBottom: 6 }}>{item.subtitle}</p>
        <h3 style={{ fontFamily: F.serif, fontSize: '1.4rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.cream, marginBottom: 8 }}>{item.company}</h3>
        <p style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.65, color: C.dim55 }}>{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function WorkPage() {
  const [active, setActive] = useState('All')
  const show = (item: typeof ITEMS[0]) => active === 'All' || item.tags.includes(active)
  return (
    <>
      <Nav />
      <section style={{ minHeight: '52vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 2.5rem 4rem', paddingTop: 58, borderBottom: LINE, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 75% at 75% 20%, rgba(201,168,76,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.dim40, marginBottom: '1.25rem' }}>
          Career work · 2019 – Present
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(3rem,7vw,6.5rem)', fontWeight: 300, lineHeight: 1.03, letterSpacing: '-0.033em', color: C.cream, marginBottom: '1rem' }}>
          Programs that shipped.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.7 }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(1.1rem,2vw,1.5rem)', fontWeight: 300, fontStyle: 'italic', color: C.dim40, maxWidth: '42ch' }}>
          Six programs across Goldman Sachs, The Carlyle Group, and T. Rowe Price.
        </motion.p>
      </section>
      <div style={{ borderBottom: LINE, padding: '1.25rem 2.5rem', display: 'flex', gap: '2.5rem', alignItems: 'center', overflowX: 'auto' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setActive(f)} style={{ fontFamily: F.sans, fontSize: 11.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: active === f ? C.gold : C.dim40, background: 'none', border: 'none', cursor: 'pointer', borderBottom: `1px solid ${active === f ? C.gold : 'transparent'}`, paddingBottom: 2, transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
            {f}
          </button>
        ))}
      </div>
      <section style={{ padding: '2.5rem 2.5rem 6rem' }}>
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'rgba(240,237,232,0.04)' }}>
          <AnimatePresence>{ITEMS.map(item => <Card key={item.id} item={item} show={show(item)} />)}</AnimatePresence>
        </motion.div>
      </section>
      <Footer />
    </>
  )
}
