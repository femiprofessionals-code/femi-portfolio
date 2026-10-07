'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Adds `.is-in` to `.reveal` elements as they enter the viewport. Content is visible without JS. */
export default function Reveal() {
  const path = usePathname()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'))
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [path])
  return null
}
