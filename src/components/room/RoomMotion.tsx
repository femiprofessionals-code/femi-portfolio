'use client'
import { useEffect } from 'react'
import { FOCUS, MASTHEAD, SCENE } from '@/content/gallery'
import twinkle from '@/content/twinkle.json'

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const smooth = (a: number, b: number, v: number) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t) }

type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number; ph: number }

/**
 * Brings the gallery to life: a scroll-driven camera dolly toward the wall (wide screens),
 * a swipeable wall (touch), drifting dust in the sunlight, and the city twinkling at night.
 * Everything is an enhancement — the room renders fully without it.
 */
export default function RoomMotion() {
  useEffect(() => {
    const room = document.querySelector<HTMLElement>('[data-room]')
    const viewport = room?.querySelector<HTMLElement>('[data-stage-viewport]')
    const scene = room?.querySelector<HTMLElement>('[data-scene]')
    const cam = room?.querySelector<HTMLElement>('[data-cam]')
    const mast = room?.querySelector<HTMLElement>('[data-masthead]')
    const canvas = room?.querySelector<HTMLCanvasElement>('[data-particles]')
    if (!room || !viewport || !scene || !cam || !mast || !canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchLayout = window.matchMedia('(max-width: 899px), (orientation: portrait)')
    const navH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76
    let raf = 0
    let visible = true

    // ── Camera dolly (wide screens) ───────────────────────────
    const place = () => {
      if (touchLayout.matches) {
        scene.style.transform = ''
        mast.style.opacity = ''
        return
      }
      const vw = window.innerWidth
      const vh = window.innerHeight
      const r = room.getBoundingClientRect()
      const travel = Math.max(1, r.height - vh)
      const p = reduced.matches ? 0 : clamp(-r.top / travel, 0, 1)
      const e = ease(p)
      const c = scene.offsetWidth / SCENE.w
      const nav = navH()
      const kEnd = Math.max(1, Math.min((vw * 0.95) / (FOCUS.w * c), ((vh - nav) * 0.95) / (FOCUS.h * c)))
      const k = 1 + (kEnd - 1) * e
      const fx = FOCUS.x + FOCUS.w / 2 - SCENE.w / 2
      const fy = FOCUS.y + FOCUS.h / 2 - SCENE.h / 2
      const targetY = nav / 2
      let tx = (0 - fx * c * k) * e
      let ty = (targetY - fy * c * k) * e
      const hw = (scene.offsetWidth * k) / 2
      const hh = (scene.offsetHeight * k) / 2
      tx = clamp(tx, vw / 2 - hw, hw - vw / 2)
      ty = clamp(ty, vh / 2 - hh, hh - vh / 2)
      scene.style.transform = `translate(-50%, -50%) translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${k.toFixed(4)})`
      mast.style.opacity = String(1 - smooth(0.12, 0.5, p))
      room.style.setProperty('--progress', p.toFixed(3))
    }

    // ── Swipeable wall (touch) ────────────────────────────────
    const startPan = () => {
      if (!touchLayout.matches) return
      const c = scene.offsetWidth / SCENE.w
      viewport.scrollLeft = Math.max(0, MASTHEAD.x * c - 20)
    }

    // ── Pointer parallax (very small) ─────────────────────────
    const onPointer = (ev: PointerEvent) => {
      if (reduced.matches || touchLayout.matches || ev.pointerType !== 'mouse') return
      const dx = (ev.clientX / window.innerWidth - 0.5) * -10
      const dy = (ev.clientY / window.innerHeight - 0.5) * -6
      cam.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`
    }

    // ── Particles: dust in daylight, city lights at night ─────
    const ctx = canvas.getContext('2d')
    let motes: Mote[] = []
    const phases = twinkle.pts.map(() => Math.random() * Math.PI * 2)
    const speeds = twinkle.pts.map(() => 0.6 + Math.random() * 1.8)
    const sizeCanvas = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(scene.offsetWidth * dpr)
      canvas.height = Math.round(scene.offsetHeight * dpr)
    }
    const seedMotes = () => {
      motes = Array.from({ length: 70 }, () => ({
        x: Math.random() * 0.62, y: 0.05 + Math.random() * 0.8,
        r: 0.4 + Math.random() * 1.3, vx: (Math.random() - 0.3) * 0.00004, vy: -0.00002 - Math.random() * 0.00005,
        a: 0.25 + Math.random() * 0.55, ph: Math.random() * Math.PI * 2,
      }))
    }
    const draw = (t: number) => {
      if (!ctx) return
      const stage = document.documentElement.dataset.time || 'morning'
      const W = canvas.width, H = canvas.height, s = W / SCENE.w
      ctx.clearRect(0, 0, W, H)
      if (stage === 'night') {
        for (let i = 0; i < twinkle.pts.length; i++) {
          const [x, y] = twinkle.pts[i]
          const a = reduced.matches ? 0.75 : 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 0.001 * speeds[i] + phases[i]))
          const g = ctx.createRadialGradient(x * s, y * s, 0, x * s, y * s, 2.6 * s)
          g.addColorStop(0, `rgba(255, 214, 150, ${a})`)
          g.addColorStop(1, 'rgba(255, 214, 150, 0)')
          ctx.fillStyle = g
          ctx.fillRect(x * s - 3 * s, y * s - 3 * s, 6 * s, 6 * s)
        }
        return
      }
      if (reduced.matches) return
      const tint = stage === 'golden' ? '255, 205, 140' : '255, 252, 240'
      for (const m of motes) {
        m.x += m.vx * 16; m.y += m.vy * 16
        if (m.y < 0.02 || m.x > 0.66 || m.x < 0) { m.y = 0.85; m.x = Math.random() * 0.62 }
        const a = m.a * (0.55 + 0.45 * Math.sin(t * 0.0012 + m.ph))
        ctx.beginPath()
        ctx.fillStyle = `rgba(${tint}, ${a})`
        ctx.arc(m.x * W, m.y * H, m.r * s * 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    let last = 0
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || t - last < 33) return
      last = t
      draw(t)
    }

    const onScroll = () => requestAnimationFrame(place)
    const onResize = () => { sizeCanvas(); place(); startPan(); if (reduced.matches) draw(0) }
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting }, { threshold: 0 })
    io.observe(room)

    sizeCanvas(); seedMotes(); place(); startPan()
    if (reduced.matches) draw(0); else raf = requestAnimationFrame(loop)
    const onTime = () => { if (reduced.matches) draw(0) }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('ff:time', onTime)
    touchLayout.addEventListener('change', onResize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('ff:time', onTime)
      touchLayout.removeEventListener('change', onResize)
    }
  }, [])
  return null
}
