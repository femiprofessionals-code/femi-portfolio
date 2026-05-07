'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { F, C, LINE, fadeUp } from './tokens'

function LiveClock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const up = () => setT(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric', minute: '2-digit', hour12: true,
    }).format(new Date()))
    up(); const id = setInterval(up, 1000); return () => clearInterval(id)
  }, [])
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{t}</span>
}

const lStyle: React.CSSProperties = {
  fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'rgba(17,17,17,0.4)',
  display: 'block', marginBottom: 18,
}
const aStyle: React.CSSProperties = {
  fontFamily: F.sans, fontSize: 13, fontWeight: 300,
  color: 'rgba(17,17,17,0.65)', textDecoration: 'none',
  display: 'block', marginBottom: 8, transition: 'color 0.2s',
}

export default function Footer() {
  const hov = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = '#111111')
  const lev = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'rgba(17,17,17,0.65)')

  return (
    <footer style={{ borderTop: LINE, background: C.bg }}>
      <div style={{ padding: '4rem 2.5rem 2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem' }}>
        <motion.div {...fadeUp(0)}>
          <span style={lStyle}>Location</span>
          <p style={{ fontFamily: F.serif, fontSize: '1.2rem', color: C.text, letterSpacing: '-0.01em', marginBottom: 6 }}>Femi Falade</p>
          <p style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, marginBottom: 16 }}>New York, NY · <LiveClock /> EST</p>
          <a href="mailto:femi@femifalade.com" style={aStyle} onMouseEnter={hov} onMouseLeave={lev}>femi@femifalade.com</a>
          <a href="https://calendly.com/femijfalade/femi" target="_blank" rel="noopener noreferrer"
            style={{ ...aStyle, color: C.accent, fontSize: 12 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Book a call
          </a>
        </motion.div>

        <motion.div {...fadeUp(0.07)}>
          <span style={lStyle}>Navigate</span>
          {([['/', 'Home'], ['/about', 'About'], ['/work', 'Work'], ['/services', 'Services'],  ['/contact', 'Contact']] as [string,string][]).map(([href, lbl]) => (
            <Link key={href} href={href} style={aStyle} onMouseEnter={hov} onMouseLeave={lev}>{lbl}</Link>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.14)}>
          <span style={lStyle}>Connect</span>
          <a href="https://www.linkedin.com/in/femi-falade" target="_blank" rel="noopener noreferrer" style={aStyle} onMouseEnter={hov} onMouseLeave={lev}>LinkedIn</a>
          <a href="https://calendly.com/femijfalade/femi" target="_blank" rel="noopener noreferrer" style={aStyle} onMouseEnter={hov} onMouseLeave={lev}>Calendly</a>
          <a href="mailto:femi@femifalade.com" style={aStyle} onMouseEnter={hov} onMouseLeave={lev}>Email</a>
        </motion.div>
      </div>

      <div style={{ borderTop: LINE, padding: '1.25rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: F.sans, fontSize: 11, color: 'rgba(17,17,17,0.3)' }}>© 2026 Femi Falade</span>
        <span style={{ fontFamily: F.sans, fontSize: 11, color: 'rgba(17,17,17,0.3)' }}>femifalade.com</span>
      </div>
    </footer>
  )
}
