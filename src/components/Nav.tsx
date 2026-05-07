'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [open, setOpen] = useState(false)
  const path = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [path])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isHome = path === '/'
  const onDark = isHome && !scrolled && !open

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 2.5rem',
          background: scrolled || open
            ? 'rgba(250,248,245,0.97)'
            : isHome
              ? 'rgba(8,15,28,0.4)'
              : 'rgba(250,248,245,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled || open ? 'rgba(17,17,17,0.08)' : 'transparent'}`,
          transition: 'background 0.5s, border-color 0.5s',
        }}
      >
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          textDecoration: 'none', transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>

          {/* LOGO BADGE — light disc behind logo for visibility */}
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: onDark ? 'rgba(250,248,245,0.95)' : 'transparent',
            border: onDark ? '1px solid rgba(217,119,87,0.35)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: onDark ? '0 4px 16px rgba(0,0,0,0.25)' : 'none',
            transition: 'background 0.4s, border 0.4s, box-shadow 0.4s',
            flexShrink: 0,
          }}>
            <img
              src="/ff-logo.png"
              alt="FF"
              style={{
                width: 26,
                height: 26,
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>

          <span style={{
            fontFamily: F.serif,
            fontSize: 19,
            fontWeight: 400,
            color: onDark ? '#F0EDE8' : '#111111',
            letterSpacing: '-0.015em',
            lineHeight: 1,
            transition: 'color 0.3s',
            textShadow: onDark ? '0 2px 12px rgba(0,0,0,0.65)' : 'none',
          }}>
            Femi Falade
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {LINKS.map(l => {
            const active = path === l.href
            const baseColor  = onDark ? 'rgba(240,237,232,0.7)' : 'rgba(17,17,17,0.6)'
            const hoverColor = onDark ? '#F0EDE8' : '#111111'
            return (
              <Link key={l.href} href={l.href} style={{
                fontFamily: F.sans, fontSize: 13,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: active ? C.accent : baseColor,
                textDecoration: 'none', transition: 'color 0.2s',
                position: 'relative', paddingBottom: 2,
                textShadow: onDark ? '0 1px 6px rgba(0,0,0,0.5)' : 'none',
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
          fontFamily: F.sans, fontSize: 13, fontWeight: 500,
          letterSpacing: '0.07em',
          background: C.accent, color: '#FAF8F5',
          padding: '11px 26px', borderRadius: 100,
          textDecoration: 'none',
          transition: 'opacity 0.2s, transform 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Connect
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            color: open ? '#111111' : (onDark ? '#F0EDE8' : '#111111'),
            transition: 'color 0.3s',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 22 22" fill="none">
            {open ? (
              <>
                <line x1="4"  y1="4"  x2="18" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="18" y1="4"  x2="4"  y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </>
            ) : (
              <>
                <line x1="3" y1="7"  x2="19" y2="7"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-menu-panel"
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
              background: 'rgba(250,248,245,0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '2rem 1.5rem',
              flexDirection: 'column', gap: '0.5rem', zIndex: 199,
            }}
          >
            {LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: F.serif, fontSize: '2.2rem', fontWeight: 400,
                    color: path === l.href ? C.accent : '#111111',
                    textDecoration: 'none', letterSpacing: '-0.015em',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(17,17,17,0.06)',
                  }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              style={{ marginTop: '2rem' }}
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                style={{
                  display: 'inline-block',
                  fontFamily: F.sans, fontSize: 15, fontWeight: 500,
                  letterSpacing: '0.07em',
                  background: C.accent, color: '#FAF8F5',
                  padding: '14px 32px', borderRadius: 100,
                  textDecoration: 'none',
                }}
              >
                Connect
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{ marginTop: 'auto', paddingTop: '2rem' }}
            >
              <p style={{
                fontFamily: F.sans, fontSize: 12,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(17,17,17,0.4)', marginBottom: 8,
              }}>
                Get in touch
              </p>
              <a href="mailto:femi@femifalade.com" style={{
                fontFamily: F.sans, fontSize: 16, fontWeight: 300,
                color: '#111111', textDecoration: 'none', display: 'block',
              }}>
                femi@femifalade.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}