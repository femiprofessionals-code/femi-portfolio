'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import VideoHero from '@/components/VideoHero'
import { F, C, LINE, fadeUp } from '@/components/tokens'

const TICKER = [
  { name: 'Goldman Sachs',    cat: 'Global Banking and Markets' },
  { name: '$580M Migration',  cat: 'Entity Restructuring'       },
  { name: 'CFTC Framework',   cat: 'Regulatory Governance'      },
  { name: '60% Reduction',    cat: 'Review Cycle Efficiency'    },
  { name: 'Carlyle Group',    cat: 'Private Equity EMEA'        },
  { name: 'Claude AI Deploy', cat: 'AI-Native Tooling'          },
  { name: 'T. Rowe Price',    cat: 'Central Operations'         },
  { name: '31 Trading Desks', cat: 'Operational Scope'          },
  { name: 'Salesforce CRM',   cat: 'Systems Architecture'       },
  { name: '27 Transactions',  cat: 'Annual Deal Execution'      },
]
const TICKER_ALL = [...TICKER, ...TICKER]

const METRICS = [
  { val: '6+',      label: 'Years in institutional finance', sub: 'Goldman, Carlyle, T. Rowe' },
  { val: '$580M',   label: 'Entity migration managed',       sub: 'Goldman Sachs, 2024'        },
  { val: '60%',     label: 'Review cycle reduction',         sub: 'AI deployment, GBM'         },
  { val: '30 days', label: 'CFTC framework delivered',       sub: '10 departments'             },
]

const WORK = [
  { company: 'Goldman Sachs',     period: '2023 to Present', tags: ['Regulatory', 'AI Tooling', 'Transformation'], desc: 'CFTC framework across 10 departments in 30 days. $580M entity migration across 31 trading desks. Claude-based AI tool cutting review cycles by 60%.', wide: true  },
  { company: 'The Carlyle Group', period: '2021 to 2023',    tags: ['CRM Architecture', 'EMEA Operations'],         desc: 'Built Salesforce CRM for all EMEA funds from scratch. Redesigned investor onboarding adopted as global standard.', wide: false },
  { company: 'T. Rowe Price',     period: '2019 to 2021',    tags: ['Central Operations'],                          desc: 'Trade settlement, position reconciliation, and operational coordination across global investment platforms.', wide: false },
]

function WorkCard({ w, i }: { w: typeof WORK[0]; i: number }) {
  const [hov, setHov] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inV = useInView(ref, { once: true, margin: '-30px' })
  const initials = w.company.split(' ').map((x: string) => x[0]).join('')
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ gridColumn: w.wide ? 'span 2' : 'span 1', background: C.bg, cursor: 'pointer' }}>
      <div style={{ aspectRatio: w.wide ? '21/8' : '16/9', background: C.bgSoft, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: F.serif, fontWeight: 300, fontSize: w.wide ? '11rem' : '6rem', color: 'rgba(217,119,87,0.10)', letterSpacing: '-0.07em', transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)', userSelect: 'none', display: 'block' }}>
          {initials}
        </span>
        <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: F.sans, fontSize: 10, letterSpacing: '0.08em', color: C.muted, border: LINE, padding: '3px 10px', background: 'rgba(250,248,245,0.6)' }}>{w.period}</span>
      </div>
      <div style={{ padding: '1.25rem 1.5rem 1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
          {w.tags.map((t: string) => <span key={t} style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, border: LINE, padding: '2px 9px' }}>{t}</span>)}
        </div>
        <h3 style={{ fontFamily: F.serif, fontSize: '1.5rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.text, marginBottom: 6 }}>{w.company}</h3>
        <p style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.65, color: C.dim }}>{w.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Home() {
  return (
    <>
      <Nav />
      <VideoHero videoSrc="/videos/hero.mp4" posterSrc="/images/hero-poster.jpg" />

      {/* TICKER */}
      <section style={{ borderTop: LINE, padding: '4rem 0', overflow: 'hidden', background: C.bg }}>
        <p style={{ padding: '0 2.5rem', fontFamily: F.sans, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted, marginBottom: '2.5rem' }}>
          Career credentials and impact
        </p>
        <div style={{ overflow: 'hidden' }}>
          <div className="ticker-inner">
            {TICKER_ALL.map((c, i) => (
              <div key={i} style={{ padding: '0 3rem', borderLeft: LINE, minWidth: 200, flexShrink: 0 }}>
                <p style={{ fontFamily: F.serif, fontSize: '1.2rem', letterSpacing: '-0.02em', color: C.text, marginBottom: 4 }}>{c.name}</p>
                <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>{c.cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section style={{ borderTop: LINE, padding: '5rem 2.5rem', background: C.bg }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem' }}>
          {METRICS.map((m, i) => (
            <motion.div key={m.label} {...fadeUp(i * 0.08)}>
              <p style={{ fontFamily: F.serif, fontSize: 'clamp(2.2rem,4vw,4rem)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.035em', color: C.text }}>{m.val}</p>
              <div style={{ width: 28, height: 1, background: C.accent, margin: '0.85rem 0 0.7rem' }} />
              <p style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.dim, lineHeight: 1.4, marginBottom: 4 }}>{m.label}</p>
              <p style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 300, color: C.muted }}>{m.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section style={{ borderTop: LINE, padding: '5rem 2.5rem', background: C.bg }}>
        <motion.div {...fadeUp()} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.025em', color: C.text, maxWidth: '16ch' }}>
            Career trajectory, from seed to scale
          </h2>
          <Link href="/work" style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 500, color: C.text, textDecoration: 'none', borderBottom: `1px solid ${C.accent}`, paddingBottom: 1 }}>
            See all work
          </Link>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: C.line }}>
          {WORK.map((w, i) => <WorkCard key={w.company} w={w} i={i} />)}
        </div>
      </section>

      {/* SPECIAL PROJECTS — fully gated, single CTA */}
      <section style={{ borderTop: LINE, padding: 'clamp(4rem, 8vw, 6rem) 2.5rem', background: C.bg }}>
        <motion.div {...fadeUp()} style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 320px' }}>
            <p style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: '1rem' }}>
              Special Projects
            </p>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: C.text, lineHeight: 1.15, marginBottom: '0.75rem' }}>
              Currently in stealth.
            </h2>
            <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, color: C.muted, lineHeight: 1.7, maxWidth: '46ch' }}>
              Three platforms in active development. Detailed case studies available to authorized stakeholders only.
            </p>
          </div>

          <Link href="/special-projects/case-studies" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: F.sans, fontSize: 13, fontWeight: 500,
            background: C.accent, color: C.bg,
            padding: '14px 28px', borderRadius: 100,
            textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="2.5" y="6" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4.5 6V4a2 2 0 014 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Request access
          </Link>
        </motion.div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: LINE, padding: '7rem 2.5rem', background: C.bg }}>
        <motion.div {...fadeUp()}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'end' }}>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.03em', color: C.text }}>
              Bringing operational discipline to the work that ships. <em style={{ color: C.accent, fontStyle: 'italic' }}>Let us build what is next.</em>
            </h2>
            <div>
              <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: C.dim, marginBottom: '2.5rem', maxWidth: '42ch' }}>
                Goldman-caliber rigor applied to transformation programs that ship on time and at scale.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/work" style={{ fontFamily: F.sans, fontSize: 13, border: `1px solid ${C.accent}`, color: C.accent, padding: '12px 26px', borderRadius: 100, textDecoration: 'none' }}>View work</Link>
                <Link href="/contact" style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, background: C.accent, color: C.bg, padding: '12px 26px', borderRadius: 100, textDecoration: 'none' }}>Work with me</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}