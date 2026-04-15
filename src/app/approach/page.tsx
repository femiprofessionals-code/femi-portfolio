'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE } from '@/components/tokens'

const PHASES = [
  {
    n: '01', phase: 'Assess', accent: '#C9A84C',
    headline: 'Start with the question nobody has asked.',
    body: 'Every engagement begins with a diagnostic phase — mapping existing processes, locating hidden risk, and identifying where operational drag is costing real money. The regulatory landscape, the data architecture, the team structure. No assumptions carried over from the last engagement.',
    bullets: ['Regulatory gap analysis', 'Process mapping and redundancy audit', 'Stakeholder alignment sessions', 'Risk exposure quantification'],
  },
  {
    n: '02', phase: 'Architect', accent: '#8BA8C9',
    headline: 'Design for the world ahead, not the one you are in.',
    body: 'Once the landscape is clear, we design the framework — governance structures, technology architecture, workflow redesign. Built to scale, built to survive regulatory scrutiny, built to be handed to a team and run without the architect in the room.',
    bullets: ['Governance framework design', 'System architecture and tooling selection', 'Cross-functional workflow blueprints', 'Risk mitigation modeling'],
  },
  {
    n: '03', phase: 'Activate', accent: '#A89CC9',
    headline: 'Ship. Then refine. Always in that order.',
    body: 'Execution is where most transformation programs die. We deploy in phases — real stakeholders, real systems, real pressure. AI tools go to the team before they are perfect. Frameworks go live before they are complete. Speed of learning beats perfection of planning every time.',
    bullets: ['Phased rollout with live feedback loops', 'AI tool deployment and team training', 'Stakeholder onboarding and change management', 'Performance baseline capture'],
  },
  {
    n: '04', phase: 'Accelerate', accent: '#C9A84C',
    headline: 'The work does not end at launch. It starts there.',
    body: 'Post-launch is where compounding begins. The team now has the muscle memory. The systems are capturing data. We optimise, expand scope, and build the case for the next initiative. The goal is always the same: make this the standard, not the exception.',
    bullets: ['Velocity metrics and reporting', 'Scope expansion planning', 'Team capability uplift', 'Documentation for institutional memory'],
  },
]

function Phase({ p, i }: { p: typeof PHASES[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inV = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '4rem', padding: '6rem 2.5rem', borderTop: LINE, alignItems: 'start' }}>
      <div style={{ position: 'sticky', top: 80 }}>
        <p style={{ fontFamily: F.serif, fontSize: 'clamp(5rem,9vw,8rem)', fontWeight: 300, lineHeight: 0.88, letterSpacing: '-0.06em', color: 'rgba(240,237,232,0.05)', marginBottom: 8 }}>{p.n}</p>
        <p style={{ fontFamily: F.sans, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: p.accent, marginBottom: 12 }}>{p.phase}</p>
        <div style={{ width: 36, height: 1, background: p.accent, opacity: 0.5 }} />
      </div>
      <div>
        <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.025em', color: C.cream, marginBottom: '1.75rem', maxWidth: '26ch' }}>{p.headline}</h2>
        <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: C.dim55, marginBottom: '2.5rem', maxWidth: '54ch' }}>{p.body}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem 2.5rem' }}>
          {p.bullets.map(b => (
            <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{ color: p.accent, flexShrink: 0, lineHeight: 1.65, fontSize: 14 }}>—</span>
              <span style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 300, color: C.dim55, lineHeight: 1.65 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ApproachPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <>
      <Nav />
      <section ref={heroRef} style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2.5rem', paddingTop: 58, position: 'relative', overflow: 'hidden', borderBottom: LINE }}>
        {[15, 35, 55, 75, 92].map(p => (
          <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: 'rgba(240,237,232,0.025)', pointerEvents: 'none' }} />
        ))}
        <motion.div style={{ y, opacity }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.7 }}
            style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.dim40, marginBottom: '1.75rem' }}>
            How I work
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: F.serif, fontSize: 'clamp(2.8rem,6.5vw,6.5rem)', fontWeight: 300, lineHeight: 1.04, letterSpacing: '-0.033em', color: C.cream, maxWidth: '22ch', marginBottom: '2rem' }}>
            From first principle to lasting infrastructure — the{' '}
            <em style={{ color: C.gold, fontStyle: 'italic' }}>four phases</em> of every engagement.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.8 }}
            style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: C.dim55, maxWidth: '50ch', marginBottom: '3rem' }}>
            Whether it is a 30-day regulatory sprint or a multi-year platform build, the same discipline applies: diagnose, design, deploy, compound.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
            style={{ display: 'flex', gap: '3rem' }}>
            {PHASES.map(ph => (
              <div key={ph.n} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontFamily: F.serif, fontSize: '1.4rem', fontWeight: 300, color: C.cream, letterSpacing: '-0.02em' }}>{ph.n}</span>
                <span style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.dim40 }}>{ph.phase}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: '2rem', left: '2.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 1, background: C.line }} />
          <span style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.2)' }}>Scroll to explore</span>
        </motion.div>
      </section>

      {PHASES.map((p, i) => <Phase key={p.n} p={p} i={i} />)}

      <section style={{ borderTop: LINE, padding: '6rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.dim40, marginBottom: '1.5rem' }}>Next step</p>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 300, lineHeight: 1.08, letterSpacing: '-0.025em', color: C.cream, maxWidth: '20ch', marginBottom: '1.5rem' }}>
            Your next chapter starts here.
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: C.dim55, maxWidth: '44ch', marginBottom: '2.5rem' }}>
            Let us talk about how this framework applies to your specific challenge — regulatory, operational, or AI-native.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/contact" style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, background: C.gold, color: C.navy, padding: '13px 28px', borderRadius: 100, textDecoration: 'none' }}>Start the conversation</Link>
            <Link href="/services" style={{ fontFamily: F.sans, fontSize: 13, border: LINE, color: C.cream, padding: '13px 28px', borderRadius: 100, textDecoration: 'none' }}>See services</Link>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  )
}
