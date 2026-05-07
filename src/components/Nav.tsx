'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { F, C } from './tokens'

const LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'About',    href: '/about'    },
  { label: 'Work',     href: '/work'     },
  { label: 'Services', href: '/services' },
  { label: 'Contact',  href: '/contact'  },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // On homepage hero (which is dark), show light text. Elsewhere, show dark text.
  const isHome = path === '/'
  const onDark = isHome && !scrolled

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 58,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem',
        background: scrolled
          ? 'rgba(250,248,245,0.97)'
          : isHome
            ? 'rgba(8,15,28,0.35)'
            : 'rgba(250,248,245,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(17,17,17,0.08)' : 'transparent'}`,
        transition: 'background 0.5s, border-color 0.5s',
      }}
    >
  <Link href="/" style={{
  display: 'flex', alignItems: 'center', gap: 10,
  textDecoration: 'none',
  transition: 'opacity 0.2s',
}}
  onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
  <img
    src="/ff-logo.png"
    alt="FF"
    style={{ width: 28, height: 28, objectFit: 'contain' }}
  />
  <span style={{
    fontFamily: F.serif, fontSize: 17, fontWeight: 400,
    color: onDark ? '#F0EDE8' : '#111111',
    letterSpacing: '-0.015em', lineHeight: 1,
  }}>
    Femi Falade
  </span>
</Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {LINKS.map(l => {
          const active = path === l.href
          const baseColor = onDark ? 'rgba(240,237,232,0.55)' : 'rgba(17,17,17,0.5)'
          const hoverColor = onDark ? '#F0EDE8' : '#111111'
          return (
            <Link key={l.href} href={l.href} style={{
              fontFamily: F.sans, fontSize: 11.5,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: active ? C.accent : baseColor,
              textDecoration: 'none', transition: 'color 0.2s',
              position: 'relative', paddingBottom: 2,
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = hoverColor }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = baseColor }}
            >
              {l.label}
              {active && (
                <span style={{
                  position: 'absolute', bottom: -1, left: 0, right: 0,
                  height: 1, background: C.accent,
                }} />
              )}
            </Link>
          )
        })}
      </nav>

      <Link href="/contact" style={{
        fontFamily: F.sans, fontSize: 12, fontWeight: 500,
        letterSpacing: '0.07em',
        background: C.accent, color: '#FAF8F5',
        padding: '9px 22px', borderRadius: 100,
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)' }}
      >
        Connect
      </Link>
    </motion.header>
  )
}
