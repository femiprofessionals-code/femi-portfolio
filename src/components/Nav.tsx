'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Experience', href: '/experience' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
]

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

  return (
    <>
      <header className={`nav${scrolled || open ? ' nav--solid' : ''}`}>
        <div className="wrap nav__inner">
          <Link href="/" className="nav__name" aria-label="Femi Falade — home">
            Femi Falade
          </Link>
          <nav aria-label="Primary">
            <ul className="nav__links">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} aria-current={current(l.href)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav__mobile">
            <Link href="/resume" className="nav__resume">Resume</Link>
            <button
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="site-drawer"
              onClick={() => setOpen(o => !o)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>
      <div id="site-drawer" className="drawer" hidden={!open}>
        <ul>
          {[{ label: 'Home', href: '/' }, ...NAV_LINKS].map(l => (
            <li key={l.href}>
              <Link href={l.href} aria-current={path === l.href ? 'page' : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="meta">New York, NY · <a href="mailto:femi@femifalade.com">femi@femifalade.com</a></p>
      </div>
    </>
  )
}
