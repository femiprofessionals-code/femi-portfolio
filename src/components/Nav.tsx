'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Arrow from './Arrow'

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Experience', href: '/experience' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
]

/** Routes whose first screen is a dark room: nav renders light until scrolled. */
const DARK_TOP = ['/contact']

export default function Nav() {
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [path])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const current = (href: string) => (path === href || path.startsWith(href + '/') ? 'page' : undefined)
  const solid = scrolled || open
  const onDark = !solid && DARK_TOP.includes(path)

  return (
    <>
      <header className={`nav${solid ? ' nav--solid' : ''}${onDark ? ' nav--on-dark' : ''}`}>
        <div className="wrap nav__inner">
          <Link href="/" className="nav__brand" aria-label="Femi Falade — home">
            <span className="nav__mono" aria-hidden="true">FF</span>
            <span className="nav__name">Femi Falade</span>
          </Link>
          <nav aria-label="Primary" className="nav__primary">
            <ul className="nav__links">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={current(l.href)}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/contact" className="nav__cta" aria-current={current('/contact')}>
            Contact <Arrow />
          </Link>
          <div className="nav__mobile">
            <Link href="/resume" className="nav__resume">Resume</Link>
            <button
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="site-drawer"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(o => !o)}
            >
              <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden="true">
                {open
                  ? <path d="M6 1l14 12M20 1 6 13" stroke="currentColor" strokeWidth="1.2" />
                  : <path d="M0 1h26M0 7h26M0 13h26" stroke="currentColor" strokeWidth="1.2" />}
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div id="site-drawer" className="drawer" hidden={!open}>
        <ul>
          {[{ label: 'Home', href: '/' }, ...NAV_LINKS, { label: 'Contact', href: '/contact' }].map(l => (
            <li key={l.href}>
              <Link href={l.href} aria-current={path === l.href ? 'page' : undefined}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <p className="meta">New York, NY · <a href="mailto:femi@femifalade.com">femi@femifalade.com</a></p>
      </div>
    </>
  )
}
