'use client'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import VideoHero from '@/components/VideoHero'
import { F, C, LINE, fadeUp } from '@/components/tokens'

const Globe = dynamic(() => import('@/components/Globe'), {
  ssr: false,
  loading: () => (
    <div style={{ borderTop: LINE, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.3)' }}>Loading globe</span>
    </div>
  ),
})

const TICKER = [
  { name: 'Goldman Sachs',    cat: 'Global Banking & Markets' },
  { name: '$580M Migration',  cat: 'Entity Restructuring'     },
  { name: 'CFTC Framework',   cat: 'Regulatory Governance'    },
  { name: '60% Reduction',    cat: 'Review Cycle Efficiency'  },
  { name: 'Carlyle Group',    cat: 'Private Equity EMEA'      },
  { name: 'Claude AI Deploy', cat: 'AI-Native Tooling'        },
  { name: 'T. Rowe Price',    cat: 'Asset Management'         },
  { name: '31 Trading Desks', cat: 'Operational Scope'        },
  { name: 'Salesforce CRM',   cat: 'Systems Architecture'     },
  { name: '27 Transactions',  cat: 'Annual Deal Execution'    },
]
const TICKER_ALL = [...TICKER, ...TICKER]

const METRICS = [
  { val: '$580M',   label: 'Entity migration managed',     sub: 'Goldman Sachs, 2024'   },
  { val: '60%',     label: 'Review cycle reduction',       sub: 'AI deployment, GBM'    },
  { val: '30 days', label: 'CFTC framework delivered',     sub: '10 departments'        },
  { val: '27',      label: 'Annual transactions executed', sub: 'Carlyle Group EMEA'    },
]

const WORK = [
  { company: 'Goldman Sachs',     period: '2023 – Present', tags: ['Regulatory Governance', 'AI Tooling', 'Transformation'], desc: 'CFTC framework across 10 departments in 30 days. $580M entity migration across 31 trading desks. Claude-based AI tool cutting review cycles by 60%.', bg: '#0A1E35', wide: true  },
  { company: 'The Carlyle Group', period: '2021 – 2023',    tags: ['CRM Architecture', 'EMEA Operations'],                   desc: 'Built Salesforce CRM for all EMEA funds from scratch. Redesigned investor onboarding adopted as global standard.', bg: '#0C1B0A', wide: false },
  { company: 'T. Rowe Price',     period: '2019 – 2021',    tags: ['Asset Management', 'Operations'],                        desc: 'Built analytical and process rigour inside a $1T+ AUM environment. The operational foundation underpinning every role since.', bg: '#1C1008', wide: false },
]

const PLATFORMS = [
  { n: '01', title: 'Hiring & Pre-Screening Platform',  desc: 'AI-native candidate screening that eliminates resume noise and surfaces qualified talent faster than any ATS.' },
  { n: '02', title: 'Renter-to-Apartment Matching',     desc: 'Genuine fit signals across lifestyle, commute, budget, and preference — beyond keyword filters.' },
  { n: '03', title: 'Freelance Task Platform',           desc: 'Outcome-based contracts connecting freelancers with high-signal work in the AI era.' },
]

function WorkCard({ w, i }: { w: typeof WORK[0]; i: number }) {
  const [hov, setHov] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inV = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }} animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ gridColumn: w.wide ? 'span 2' : 'span 1', background: C.navy, cursor: 'pointer' }}>
      <div style={{ aspectRatio: w.wide ? '21/8' : '16/9', background: w.bg, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: F.serif, fontWeight: 300, fontSize: w.wide ? '11rem' : '6rem', color: 'rgba(240,237,232,0.04)', letterSpacing: '-0.07em', transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)', userSelect: 'none', display: 'block' }}>
          {w.company.split(' ').map((x: string) => x[0]).join('')}
        </span>
        <span style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: F.sans, fontSize: 10, letterSpacing: '0.08em', color: C.dim40, border: LINE, padding: '3px 10px' }}>{w.period}</span>
      </div>
      <div style={{ padding: '1.25rem 1.5rem 1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
          {w.tags.map((t: string) => <span key={t} style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.dim40, border: LINE, padding: '2px 9px' }}>{t}</span>)}
        </div>
        <h3 style={{ fontFamily: F.serif, fontSize: '1.5rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.cream, marginBottom: 6 }}>{w.company}</h3>
        <p style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.65, color: C.dim55 }}>{w.desc}</p>
      </div>
    </motion.div>
  )
}

function PlatCard({ p, i }: { p: typeof PLATFORMS[0]; i: number }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div {...fadeUp(i * 0.08)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ border: `1px solid ${hov ? 'rgba(201,168,76,0.65)' : 'rgba(201,168,76,0.16)'}`, padding: '2.5rem 2rem', background: hov ? 'rgba(201,168,76,0.02)' : 'transparent', transition: 'border-color 0.3s, background 0.3s', display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontFamily: F.sans, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.gold, border: 'rgba(201,168,76,0.3)', padding: '3px 10px', alignSelf: 'flex-start', marginBottom: 20, borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(201,168,76,0.3)' }}>In Development</span>
      <span style={{ fontFamily: F.serif, fontSize: '3.5rem', fontWeight: 300, color: 'rgba(201,168,76,0.1)', lineHeight: 1, marginBottom: 16, letterSpacing: '-0.04em' }}>{p.n}</span>
      <h3 style={{ fontFamily: F.serif, fontSize: '1.5rem', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.02em', color: C.cream, marginBottom: 12, flexGrow: 1 }}>{p.title}</h3>
      <p style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.65, color: C.dim55 }}>{p.desc}</p>
    </motion.div>
  )
}

export default function Home() {
  return (
    <>
      <Nav />

      {/* ── VIDEO HERO ── */}
      <VideoHero
        videoSrc="/videos/hero.mp4"
        posterSrc="/images/hero-poster.jpg"
      />

      {/* ── TICKER ── */}
      <section style={{ borderTop: LINE, padding: '4rem 0', overflow: 'hidden' }}>
        <p style={{ padding: '0 2.5rem', fontFamily: F.sans, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.28)', marginBottom: '2.5rem' }}>
          Career credentials &amp; impact
        </p>
        <div style={{ overflow: 'hidden' }}>
          <div className="ticker-inner">
            {TICKER_ALL.map((c, i) => (
              <div key={i} style={{ padding: '0 3rem', borderLeft: LINE, minWidth: 200, flexShrink: 0 }}>
                <p style={{ fontFamily: F.serif, fontSize: '1.2rem', letterSpacing: '-0.02em', color: C.cream, marginBottom: 4 }}>{c.name}</p>
                <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.dim40 }}>{c.cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section style={{ borderTop: LINE, padding: '5rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem' }}>
          {METRICS.map((m, i) => (
            <motion.div key={m.label} {...fadeUp(i * 0.08)}>
              <p style={{ fontFamily: F.serif, fontSize: 'clamp(2.2rem,4vw,4rem)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.035em', color: C.cream }}>{m.val}</p>
              <div style={{ width: 28, height: 1, background: C.gold, margin: '0.85rem 0 0.7rem' }} />
              <p style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.dim55, lineHeight: 1.4, marginBottom: 4 }}>{m.label}</p>
              <p style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 300, color: C.dim40 }}>{m.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WORK PREVIEW ── */}
      <section style={{ borderTop: LINE, padding: '5rem 2.5rem' }}>
        <motion.div {...fadeUp()} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.025em', color: C.cream, maxWidth: '16ch' }}>
            Career trajectory, from seed to scale
          </h2>
          <Link href="/work" style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 500, color: C.cream, textDecoration: 'none', borderBottom: `1px solid ${C.gold}`, paddingBottom: 1, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            See all work →
          </Link>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, background: 'rgba(240,237,232,0.04)' }}>
          {WORK.map((w, i) => <WorkCard key={w.company} w={w} i={i} />)}
        </div>
      </section>

      {/* ── GLOBE ── */}
      <Globe />

      {/* ── PLATFORMS ── */}
      <section style={{ borderTop: LINE, padding: '6rem 2.5rem' }}>
        <motion.div {...fadeUp()} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.025em', color: C.cream, maxWidth: '14ch' }}>Three platforms. One thesis.</h2>
          <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: C.dim55, maxWidth: '44ch' }}>AI-native products in development under a single holding company. Each solves a friction-heavy market with intelligent infrastructure.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {PLATFORMS.map((p, i) => <PlatCard key={p.n} p={p} i={i} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: LINE, padding: '8rem 2.5rem' }}>
        <motion.div {...fadeUp()}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'end' }}>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2.5rem,5.5vw,5rem)', fontWeight: 300, lineHeight: 1.04, letterSpacing: '-0.03em', color: C.cream }}>
              From regulatory complexity to AI-native infrastructure —{' '}
              <em style={{ color: C.gold, fontStyle: 'italic' }}>let us build what is next.</em>
            </h2>
            <div>
              <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: C.dim55, marginBottom: '2.5rem', maxWidth: '42ch' }}>
                Goldman-caliber operational discipline applied to transformation programs that actually ship.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/work" style={{ fontFamily: F.sans, fontSize: 13, border: `1px solid ${C.gold}`, color: C.gold, padding: '12px 26px', borderRadius: 100, textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  View my work
                </Link>
                <Link href="/contact" style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, background: C.gold, color: C.navy, padding: '12px 26px', borderRadius: 100, textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  Work with me
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
