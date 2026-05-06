'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE } from '@/components/tokens'

// Change this password to control access
const PASSWORD = 'FEMICS2026'

const CASES = [
  {
    n: '01',
    title: 'AI Hiring Platform',
    status: 'Beta Testing',
    problem: 'SMB hiring teams spend 60 percent of their time on initial screening. Most of what they review is noise. The signal is buried.',
    solution: 'An AI-native pre-screening layer that evaluates candidates against structured criteria before a human reviews anything. Integrates with existing ATS workflows.',
    build: 'Built on the Anthropic API with structured evaluation prompts, a lightweight dashboard for hiring managers, and a feedback loop that improves criteria over time.',
    stack: ['Anthropic API', 'Next.js', 'Supabase', 'Vercel'],
  },
  {
    n: '02',
    title: 'Renter Matching',
    status: 'Pre-Launch',
    problem: 'Apartment search is broken. Filters return hundreds of listings that technically match but practically do not. Renters waste weeks on viewings that were never going to work.',
    solution: 'A matching platform that builds a renter profile across lifestyle, commute tolerance, noise sensitivity, and social preferences. Surfaces listings that actually fit.',
    build: 'Structured intake flow, vector-based matching against listing profiles, and a shortlist ranked by genuine compatibility. Designed for NYC first, portable elsewhere.',
    stack: ['Next.js', 'Pinecone', 'Supabase', 'Vercel'],
  },
  {
    n: '03',
    title: 'Freelance Infrastructure',
    status: 'Alpha Testing',
    problem: 'Freelancers run their business across five or six tools. Invoicing, contracts, client communication, project tracking, payments. The overhead is significant.',
    solution: 'A single platform for the entire freelance operation. Contracts generated and signed in-platform. Invoices automated on milestone completion. Client portal included.',
    build: 'Built around a document generation engine, a lightweight CRM, and an automated invoicing layer. Designed for knowledge workers and creative professionals.',
    stack: ['Next.js', 'Stripe', 'Supabase', 'Vercel'],
  },
]

export default function CaseStudiesPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('cs_unlocked') === '1') setUnlocked(true)
  }, [])

  const attempt = () => {
    if (input.trim() === PASSWORD) {
      sessionStorage.setItem('cs_unlocked', '1')
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.section key="gate"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2.5rem', background: C.bg, paddingTop: 58 }}>
            <div style={{ maxWidth: 460, width: '100%', textAlign: 'center' }}>
              <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted, marginBottom: '1.5rem' }}>
                Access required
              </p>
              <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: C.text, marginBottom: '1rem', lineHeight: 1.15 }}>
                Detailed case studies
              </h1>
              <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, color: C.dim, lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Architecture, build decisions, and detailed metrics for all three platforms. Enter the access code to continue.
              </p>

              <div style={{ display: 'flex', border: `1px solid ${error ? C.accent : 'rgba(17,17,17,0.2)'}`, borderRadius: 100, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <input
                  value={input}
                  onChange={e => { setInput(e.target.value); setError(false) }}
                  onKeyDown={e => e.key === 'Enter' && attempt()}
                  placeholder="Access code"
                  type="password"
                  style={{ flex: 1, background: 'transparent', border: 'none', padding: '14px 22px', fontFamily: F.sans, fontSize: 14, fontWeight: 300, color: C.text, outline: 'none' }}
                />
                <button onClick={attempt}
                  style={{ background: C.accent, color: C.bg, border: 'none', padding: '14px 26px', fontFamily: F.sans, fontSize: 13, fontWeight: 500, cursor: 'pointer', borderRadius: '0 100px 100px 0', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  Enter
                </button>
              </div>

              {error && (
                <p style={{ fontFamily: F.sans, fontSize: 12, color: C.accent, marginTop: 12 }}>
                  Incorrect code. Contact femi@femifalade.com to request access.
                </p>
              )}

              <p style={{ fontFamily: F.sans, fontSize: 11, color: C.muted, marginTop: '2rem' }}>
                Not the right page?{' '}
                <a href="/special-projects" style={{ color: C.accent, textDecoration: 'none' }}>Back to overview</a>
              </p>
            </div>
          </motion.section>
        ) : (
          <motion.div key="content"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            <section style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 2.5rem 4rem', paddingTop: 58, borderBottom: LINE, background: C.bg }}>
              <p style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted, marginBottom: '1.25rem' }}>
                Case studies, restricted
              </p>
              <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(2.5rem,5vw,5rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.03em', color: C.text }}>
                Build decisions, architecture, and metrics.
              </h1>
            </section>

            {CASES.map((c) => (
              <section key={c.n} style={{ padding: '5rem 2.5rem', borderTop: LINE, background: C.bg }}>
                <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '4rem', alignItems: 'start' }}>
                    <div style={{ position: 'sticky', top: 80 }}>
                      <p style={{ fontFamily: F.serif, fontSize: '6rem', fontWeight: 300, lineHeight: 0.9, color: 'rgba(217,119,87,0.1)', marginBottom: 8, letterSpacing: '-0.05em' }}>{c.n}</p>
                      <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accent, marginBottom: 8 }}>{c.status}</p>
                      <div style={{ width: 32, height: 1, background: C.accent, opacity: 0.4 }} />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.8rem,3vw,2.75rem)', fontWeight: 300, letterSpacing: '-0.025em', color: C.text, marginBottom: '2.5rem' }}>{c.title}</h2>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {[
                          { label: 'The problem', body: c.problem },
                          { label: 'The solution', body: c.solution },
                          { label: 'How it is built', body: c.build },
                        ].map(item => (
                          <div key={item.label}>
                            <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>{item.label}</p>
                            <p style={{ fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: C.dim }}>{item.body}</p>
                          </div>
                        ))}
                        <div>
                          <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Stack</p>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {c.stack.map(s => (
                              <span key={s} style={{ fontFamily: F.sans, fontSize: 12, color: C.accent, border: '1px solid rgba(217,119,87,0.3)', padding: '4px 14px', borderRadius: 100 }}>{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>
            ))}

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
