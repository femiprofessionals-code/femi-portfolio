'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE } from '@/components/tokens'

const FILTERS = ['All', 'AI and Technology', 'Regulatory', 'Finance', 'Operations']

const ITEMS = [
  {
    id: 1, company: 'Goldman Sachs', subtitle: 'Claude AI Workflow Deployment',
    tags: ['AI and Technology', 'Operations'],
    period: '2023', stat: '60%', statLabel: 'Faster review cycles',
    desc: 'Designed and deployed a Claude-based AI workflow tool to 60 team members across Global Banking and Markets. Restructured document review pipelines, cutting cycle times by 60 percent and eliminating a full category of manual processing.',
    wide: false,
  },
  {
    id: 2, company: 'Goldman Sachs', subtitle: '$580M Entity Migration',
    tags: ['Finance', 'Operations'],
    period: '2024', stat: '$580M', statLabel: 'Assets migrated',
    desc: 'Led a $580M entity migration across 31 trading desks. Coordinated across legal, risk, technology, and operations. Zero disruption to active positions. Delivered on schedule across a compressed timeline.',
    wide: false,
  },
  {
    id: 3, company: 'Goldman Sachs', subtitle: 'CFTC Regulatory Governance Framework',
    tags: ['Regulatory', 'Operations'],
    period: '2024', stat: '30 Days', statLabel: 'End-to-end delivery',
    desc: 'Built a CFTC regulatory governance framework across 10 departments in under 30 days. Set precedent for compliance velocity inside Global Banking and Markets. Became the reference standard for subsequent regulatory programs.',
    wide: true,
  },
  {
    id: 4, company: 'The Carlyle Group', subtitle: 'Salesforce CRM, EMEA Funds',
    tags: ['AI and Technology', 'Operations'],
    period: '2022', stat: 'Global', statLabel: 'Standard adopted',
    desc: 'Built Salesforce CRM from scratch for all Carlyle EMEA private equity funds. Architected data models, automated investor workflows, and trained the team. Architecture subsequently adopted as the global standard across all fund families.',
    wide: false,
  },
  {
    id: 5, company: 'The Carlyle Group', subtitle: 'Investor Onboarding Redesign',
    tags: ['Operations', 'Finance'],
    period: '2022', stat: '27', statLabel: 'Annual transactions',
    desc: 'Redesigned investor onboarding across approximately 27 annual transactions. Eliminated redundant touchpoints. Built structured data-capture flows. Reduced time-to-close. Adopted as global standard across Carlyle fund families.',
    wide: false,
  },
  {
    id: 6, company: 'T. Rowe Price', subtitle: 'Central Operations Foundation',
    tags: ['Finance', 'Operations'],
    period: '2019-2021', stat: '6+', statLabel: 'Years foundation',
    desc: 'Trade settlement, position reconciliation, and operational coordination across global investment platforms. Built the analytical and operational rigor that underpins every program since.',
    wide: true,
  },
]

function Card({ item, show }: { item: typeof ITEMS[0]; show: boolean }) {
  const [hov, setHov] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inV = useInView(ref, { once: true, margin: '-30px' })
  if (!show) return null
  const initials = item.company.split(' ').map((w: string) => w[0]).join('')
  return (
    <motion.div ref={ref} layout
      initial={{ opacity: 0, y: 14 }} animate={inV ? { opacity: 1, y: 0 } : {}} exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ gridColumn: item.wide ? 'span 2' : 'span 1', background: C.bg, cursor: 'default' }}>
      <div style={{ aspectRatio: item.wide ? '21/8' : '4/3', background: C.bgSoft, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: F.serif, fontWeight: 300, fontSize: item.wide ? '12rem' : '7rem', color: 'rgba(217,119,87,0.08)', letterSpacing: '-0.07em', userSelect: 'none', transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)', display: 'block' }}>
          {initials}
        </span>
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
          <p style={{ fontFamily: F.serif, fontSize: item.wide ? '3.25rem' : '2.5rem', fontWeight: 300, color: C.accent, lineHeight: 1, letterSpacing: '-0.04em' }}>{item.stat}</p>
          <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(217,119,87,0.6)', marginTop: 4 }}>{item.statLabel}</p>
        </div>
        <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: F.sans, fontSize: 10, letterSpacing: '0.08em', color: C.muted, border: LINE, padding: '3px 10px', background: 'rgba(250,248,245,0.6)' }}>{item.period}</span>
      </div>
      <div style={{ padding: '1.25rem 1.5rem 2rem' }}>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
          {item.tags.map((t: string) => <span key={t} style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase', color: C.muted, border: LINE, padding: '2px 9px' }}>{t}</span>)}
        </div>
        <p style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.04em', color: C.accent, marginBottom: 6 }}>{item.subtitle}</p>
        <h3 style={{ fontFamily: F.serif, fontSize: '1.4rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.text, marginBottom: 8 }}>{item.company}</h3>
        <p style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.65, color: C.dim }}>{item.desc}</p>
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
      <section style={{ minHeight: '52vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 2.5rem 4rem', paddingTop: 58, borderBottom: LINE, position: 'relative', overflow: 'hidden', background: C.bg }}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted, marginBottom: '1.25rem' }}>
          Career work, 2019 to Present
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(3rem,7vw,6.5rem)', fontWeight: 300, lineHeight: 1.03, letterSpacing: '-0.033em', color: C.text, marginBottom: '1rem' }}>
          Programs that shipped.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.7 }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(1.1rem,2vw,1.5rem)', fontWeight: 300, fontStyle: 'italic', color: C.muted, maxWidth: '42ch' }}>
          Six programs across Goldman Sachs, The Carlyle Group, and T. Rowe Price.
        </motion.p>
      </section>
      <div style={{ borderBottom: LINE, padding: '1.25rem 2.5rem', display: 'flex', gap: '2.5rem', alignItems: 'center', overflowX: 'auto', background: C.bg }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setActive(f)} style={{ fontFamily: F.sans, fontSize: 11.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: active === f ? C.accent : C.muted, background: 'none', border: 'none', cursor: 'pointer', borderBottom: `1px solid ${active === f ? C.accent : 'transparent'}`, paddingBottom: 2, transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
            {f}
          </button>
        ))}
      </div>
      <section style={{ padding: '2.5rem 2.5rem 6rem', background: C.bg }}>
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: C.line }}>
          <AnimatePresence>{ITEMS.map(item => <Card key={item.id} item={item} show={show(item)} />)}</AnimatePresence>
        </motion.div>
      </section>
      <Footer />
    </>
  )
}
