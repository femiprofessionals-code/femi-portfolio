'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { F, C } from './tokens'

const LINKS = [
  { label: 'Work',     href: '/work'     },
  { label: 'Approach', href: '/approach' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about'    },
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
        background: scrolled ? 'rgba(8,15,28,0.97)' : 'rgba(8,15,28,0.35)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? C.line : 'transparent'}`,
        transition: 'background 0.5s, border-color 0.5s',
      }}
    >
      <Link href="/" style={{
        fontFamily: F.serif, fontSize: 18, fontWeight: 400,
        color: C.cream, textDecoration: 'none', letterSpacing: '-0.015em', lineHeight: 1,
      }}>
        Femi Falade
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
        {LINKS.map(l => {
          const active = path === l.href
          return (
            <Link key={l.href} href={l.href} style={{
              fontFamily: F.sans, fontSize: 11.5,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: active ? C.gold : 'rgba(240,237,232,0.5)',
              textDecoration: 'none', transition: 'color 0.2s',
              position: 'relative', paddingBottom: 2,
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.cream }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(240,237,232,0.5)' }}
            >
              {l.label}
              {active && (
                <span style={{
                  position: 'absolute', bottom: -1, left: 0, right: 0,
                  height: 1, background: C.gold,
                }} />
              )}
            </Link>
          )
        })}
      </nav>

      <Link href="/contact" style={{
        fontFamily: F.sans, fontSize: 12, fontWeight: 500,
        letterSpacing: '0.07em',
        background: C.gold, color: C.navy,
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
