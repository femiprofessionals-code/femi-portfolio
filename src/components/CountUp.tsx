'use client'
import { useEffect, useRef, useState } from 'react'

/** Counts a figure like "$580M", "$13B+", "600+" or "60%" up from zero when it scrolls into view. */
export default function CountUp({ value, duration = 1800 }: { value: string; duration?: number }) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/)
  const prefix = m?.[1] ?? ''
  const target = m ? parseFloat(m[2].replace(/,/g, '')) : 0
  const suffix = m?.[3] ?? ''
  const decimals = m && m[2].includes('.') ? m[2].split('.')[1].length : 0
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)          // server / no-JS render the final figure

  useEffect(() => {
    const el = ref.current
    if (!el || !m) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setShown(`${prefix}${(0).toFixed(decimals)}${suffix}`)
    let raf = 0
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration)
        const e = 1 - Math.pow(1 - p, 3)
        setShown(`${prefix}${(target * e).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`)
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref} aria-label={value} style={{ fontVariantNumeric: 'tabular-nums' }}>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
