'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE } from '@/components/tokens'

const REASONS = [
  { label: 'Transformation programme', value: 'transformation' },
  { label: 'Regulatory framework delivery', value: 'regulatory'  },
  { label: 'AI tooling deployment', value: 'ai'                  },
  { label: 'CRM or systems build', value: 'systems'             },
  { label: 'Strategic advisory', value: 'advisory'               },
  { label: 'Speaking opportunity', value: 'speaking'             },
  { label: 'Other', value: 'other'                               },
]

const FAQS = [
  { q: 'Do you take on consulting work alongside your primary role?', a: 'Yes. I take on select engagements — typically 30 to 90-day sprints focused on regulatory frameworks, AI deployment, or operations architecture. Volume is deliberately limited to maintain quality.' },
  { q: 'What sectors do you work in?', a: 'Financial services is the core — investment banking, private equity, and asset management. I also advise fintech platforms and AI-native companies building infrastructure adjacent to financial services.' },
  { q: 'How quickly do you respond?', a: 'Every message gets a personal response within two business days. If you need to move faster, Calendly is the quickest path to a live conversation.' },
]

const iStyle: React.CSSProperties = { width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid rgba(240,237,232,0.14)`, padding: '12px 0', fontFamily: 'var(--font-dm-sans)', fontSize: 14, fontWeight: 300, color: '#F0EDE8', outline: 'none', transition: 'border-color 0.2s' }
const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.target.style.borderBottomColor = '#C9A84C')
const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.target.style.borderBottomColor = 'rgba(240,237,232,0.14)')

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' })
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const inV = useInView(formRef, { once: true, margin: '-40px' })

  const send = () => { if (form.name && form.email && form.message) setSent(true) }

  return (
    <>
      <Nav />

      <section style={{ minHeight: '48vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 2.5rem 4rem', paddingTop: 58, borderBottom: LINE, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 70% at 10% 80%, rgba(201,168,76,0.05) 0%, transparent 60%)' }} />
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.dim40, marginBottom: '1.25rem' }}>
          Get in touch
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(3rem,7vw,6.5rem)', fontWeight: 300, lineHeight: 1.03, letterSpacing: '-0.033em', color: C.cream, marginBottom: '1rem' }}>
          Work with me
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontStyle: 'italic', fontWeight: 300, color: C.dim40, maxWidth: '38ch' }}>
          Let us talk about your next chapter.
        </motion.p>
      </section>

      {/* Split layout */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', minHeight: '70vh' }}>

        {/* LEFT — location + contact info */}
        <div style={{ borderRight: LINE, padding: '4rem 2.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ marginBottom: '3rem', paddingBottom: '3rem', borderBottom: LINE }}>
            <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.28)', marginBottom: '1.25rem' }}>New York, US</p>
            <p style={{ fontFamily: F.serif, fontSize: '1.3rem', fontWeight: 400, color: C.cream, marginBottom: 6, letterSpacing: '-0.01em' }}>Femi Falade</p>
            <p style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 300, color: C.dim40, marginBottom: 16 }}>Senior Associate · Global Banking & Markets</p>
            <a href="mailto:femi@femifalade.com" style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, color: C.dim55, textDecoration: 'none', display: 'block', marginBottom: 8, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.cream)} onMouseLeave={e => (e.currentTarget.style.color = C.dim55)}>
              femi@femifalade.com
            </a>
            <a href="https://calendly.com/femijfalade/femi" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 400, color: C.gold, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6, transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Book a Calendly call →
            </a>
          </motion.div>

          {/* Engagement types */}
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }}>
            <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.28)', marginBottom: '1.5rem' }}>Best for</p>
            {[
              ['Regulatory delivery', 'CFTC, SEC, and governance frameworks'],
              ['AI deployment', 'Workflow tools for financial operations teams'],
              ['Transformation', 'Multi-stakeholder enterprise programs'],
              ['Systems builds', 'CRM, data architecture, and integrations'],
              ['Strategic advisory', 'Operating model and organisational design'],
            ].map(([title, sub], i) => (
              <motion.div key={title} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
                style={{ display: 'flex', gap: 14, padding: '1.1rem 0', borderTop: LINE }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold, flexShrink: 0, marginTop: 7 }} />
                <div>
                  <p style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 400, color: C.cream, marginBottom: 2 }}>{title}</p>
                  <p style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 300, color: C.dim40 }}>{sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: LINE, display: 'flex', gap: '1.5rem' }}>
            {[['LinkedIn','https://www.linkedin.com/in/femifalade'],['Calendly','https://calendly.com/femijfalade/femi']].map(([l,h]) => (
              <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.09em', textTransform: 'uppercase', color: C.dim40, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.cream)} onMouseLeave={e => (e.currentTarget.style.color = C.dim40)}>
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <motion.div ref={formRef} initial={{ opacity: 0, x: 18 }} animate={inV ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ padding: '4rem 3rem' }}>
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 400 }}>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <p style={{ fontFamily: F.serif, fontSize: '3.5rem', fontWeight: 300, color: C.gold, letterSpacing: '-0.04em', marginBottom: '1.25rem', lineHeight: 1 }}>Message sent.</p>
                <p style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: C.dim55, maxWidth: '38ch', marginBottom: '2rem' }}>
                  I respond to every message personally within two business days. If you need to move faster, book a Calendly call directly.
                </p>
                <a href="https://calendly.com/femijfalade/femi" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-block', fontFamily: F.sans, fontSize: 13, fontWeight: 500, background: C.gold, color: C.navy, padding: '12px 28px', borderRadius: 100, textDecoration: 'none' }}>
                  Book a call →
                </a>
              </motion.div>
            </div>
          ) : (
            <>
              <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.28)', marginBottom: '2.25rem' }}>Send a message</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem', marginBottom: '1.75rem' }}>
                <div>
                  <label style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.dim40, display: 'block', marginBottom: 8 }}>Name</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" style={iStyle} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.dim40, display: 'block', marginBottom: 8 }}>Email</label>
                  <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" type="email" style={iStyle} onFocus={focus} onBlur={blur} />
                </div>
              </div>
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.dim40, display: 'block', marginBottom: 8 }}>What are you looking for?</label>
                <select value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} style={{ ...iStyle, cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                  <option value="" style={{ background: '#080F1C' }}>Select a type of engagement…</option>
                  {REASONS.map(r => <option key={r.value} value={r.value} style={{ background: '#080F1C' }}>{r.label}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.dim40, display: 'block', marginBottom: 8 }}>Message</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell me about your challenge or opportunity — the more specific, the better." rows={5} style={{ ...iStyle, resize: 'none', lineHeight: 1.7 }} onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button onClick={send} style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 500, background: C.gold, color: C.navy, padding: '13px 32px', borderRadius: 100, border: 'none', cursor: 'pointer', transition: 'opacity 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  Send message
                </button>
                <p style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 300, color: C.dim40 }}>
                  or{' '}
                  <a href="https://calendly.com/femijfalade/femi" target="_blank" rel="noopener noreferrer" style={{ color: C.gold, textDecoration: 'none' }}>book a call</a>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </section>

      {/* FAQ */}
      <section style={{ borderTop: LINE, padding: '5rem 2.5rem' }}>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(240,237,232,0.28)', marginBottom: '3rem' }}>
          Common questions
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'rgba(240,237,232,0.04)' }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.65 }}
              style={{ padding: '2rem 2rem', background: C.navy }}>
              <h3 style={{ fontFamily: F.serif, fontSize: '1.25rem', fontWeight: 400, letterSpacing: '-0.02em', color: C.cream, marginBottom: 10, lineHeight: 1.3 }}>{faq.q}</h3>
              <p style={{ fontFamily: F.sans, fontSize: 13.5, fontWeight: 300, lineHeight: 1.7, color: C.dim55 }}>{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
