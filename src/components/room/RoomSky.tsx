'use client'
import { useEffect, useRef } from 'react'

/**
 * Real moving sky for the room: Femi's generated clip, locked to the room and composited so only open sky changes
 * (scripts: docs/asset-lock/scripts/sky.py). The sharp still stays underneath; the paintings, text and links sit above.
 * Loaded after the page, only for lights that have a clip, paused off-screen / hidden, never with reduced motion.
 */
const CLIPS: Record<string, string> = { morning: '/room/v5/motion/sky-morning' }

export default function RoomSky() {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    const room = document.querySelector<HTMLElement>('[data-room]')
    if (!v || !room) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    let onScreen = true, loadedFor = ''
    const sync = () => {
      const light = document.documentElement.dataset.time || 'morning'
      const clip = CLIPS[light]
      const run = !!clip && !reduced.matches && !saveData && onScreen && !document.hidden
      if (clip && loadedFor !== light && run) {
        loadedFor = light
        v.src = clip + (v.canPlayType('video/webm; codecs="vp9"') === 'probably' ? '.webm' : '.mp4')
      }
      v.classList.toggle('is-on', !!clip && loadedFor === light && !reduced.matches && !saveData && v.readyState >= 3)
      if (run && loadedFor === light) v.play().catch(() => {})
      else v.pause()
    }
    v.addEventListener('canplay', sync)
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync() })
    io.observe(room)
    const start = () => sync()
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true })
    window.addEventListener('ff:time', sync)
    document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', sync)
    return () => { io.disconnect(); v.removeEventListener('canplay', sync); window.removeEventListener('ff:time', sync); document.removeEventListener('visibilitychange', sync); reduced.removeEventListener('change', sync) }
  }, [])
  return <video ref={ref} className="room5__sky" muted loop playsInline preload="none" aria-hidden="true" disablePictureInPicture />
}
