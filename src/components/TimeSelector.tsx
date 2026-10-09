'use client'
import { useEffect, useRef, useState } from 'react'
import { type Mode, type Stage, STAGES, STORAGE_KEY, THEME_COLOR, nyClock, nyHour, stageForHour } from '@/lib/time'

const Icon = ({ id }: { id: Stage | 'auto' }) => {
  const p = { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true as const }
  if (id === 'morning') return (
    <svg {...p}><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" /><path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M3.4 12.6l1.3-1.3M11.3 4.7l1.3-1.3" stroke="currentColor" strokeWidth="1.2" /></svg>
  )
  if (id === 'golden') return (
    <svg {...p}><path d="M3.5 10.5a4.5 4.5 0 0 1 9 0" stroke="currentColor" strokeWidth="1.2" /><path d="M1.5 10.5h13M4 13h8M8 2.5v2M3 5l1.2 1.2M13 5l-1.2 1.2" stroke="currentColor" strokeWidth="1.2" /></svg>
  )
  if (id === 'night') return (
    <svg {...p}><path d="M12.8 9.6A5.3 5.3 0 0 1 6.4 3.2a5.3 5.3 0 1 0 6.4 6.4Z" stroke="currentColor" strokeWidth="1.2" /></svg>
  )
  return (
    <svg {...p}><circle cx="8" cy="8" r="5.8" stroke="currentColor" strokeWidth="1.2" /><path d="M8 4.6V8l2.3 1.4" stroke="currentColor" strokeWidth="1.2" /></svg>
  )
}

function apply(stage: Stage, mode: Mode) {
  const d = document.documentElement
  d.dataset.time = stage
  d.dataset.timeMode = mode === 'auto' ? 'auto' : 'manual'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[stage])
  window.dispatchEvent(new CustomEvent('ff:time', { detail: stage }))
}

/** Discreet light selector. Defaults to New York time; a manual choice is remembered. */
export default function TimeSelector() {
  const [mode, setMode] = useState<Mode>('auto')
  const [stage, setStage] = useState<Stage>('morning')
  const [clock, setClock] = useState('')
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let saved: Mode = 'auto'
    try { saved = (localStorage.getItem(STORAGE_KEY) as Mode) || 'auto' } catch {}
    if (!['auto', 'morning', 'golden', 'night'].includes(saved)) saved = 'auto'
    setMode(saved)
    const tick = () => {
      setClock(nyClock())
      if (saved === 'auto') {
        const s = stageForHour(nyHour())
        setStage(s)
        if (document.documentElement.dataset.time !== s) apply(s, 'auto')
      }
    }
    if (saved !== 'auto') setStage(saved as Stage)
    tick()
    const id = window.setInterval(() => {
      let m: Mode = 'auto'
      try { m = (localStorage.getItem(STORAGE_KEY) as Mode) || 'auto' } catch {}
      saved = m
      tick()
    }, 30000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  const choose = (m: Mode) => {
    const s = m === 'auto' ? stageForHour(nyHour()) : m
    try { localStorage.setItem(STORAGE_KEY, m) } catch {}
    setMode(m)
    setStage(s)
    apply(s, m)
  }

  const current = STAGES.find(s => s.id === stage)!
  const options: { id: Mode; label: string; hint: string }[] = [
    { id: 'auto', label: 'New York time', hint: clock ? `Now ${clock}` : 'Follows the city' },
    ...STAGES.map(s => ({ id: s.id as Mode, label: s.label, hint: s.hours })),
  ]

  return (
    <div className={`tod${open ? ' tod--open' : ''}`} ref={root}>
      <button
        type="button"
        className="tod__toggle"
        aria-expanded={open}
        aria-controls="tod-menu"
        onClick={() => setOpen(o => !o)}
      >
        <Icon id={stage} />
        <span className="tod__now">{current.label}</span>
        <span className="tod__clock" suppressHydrationWarning>{mode === 'auto' ? `NYC ${clock}` : 'Manual'}</span>
      </button>
      <div id="tod-menu" className="tod__menu" role="radiogroup" aria-label="Light in the gallery" hidden={!open}>
        {options.map(o => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={mode === o.id}
            className="tod__opt"
            onClick={() => { choose(o.id); setOpen(false) }}
          >
            <Icon id={o.id as Stage | 'auto'} />
            <span className="tod__opt-label">{o.label}</span>
            <span className="tod__opt-hint" suppressHydrationWarning>{o.hint}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
