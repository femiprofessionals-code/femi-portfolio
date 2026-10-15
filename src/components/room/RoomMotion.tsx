'use client'
import { useEffect } from 'react'

/** Plays only the active light's motion loop; the still stays underneath until it is actually playing. */
export default function RoomMotion() {
  useEffect(() => {
    const room = document.querySelector<HTMLElement>('[data-room]')
    if (!room) return
    const videos = Array.from(room.querySelectorAll<HTMLVideoElement>('video[data-light]'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    let visible = true

    const sync = () => {
      const stage = document.documentElement.dataset.time || 'morning'
      for (const v of videos) {
        const on = v.dataset.light === stage && !reduced.matches && !saveData
        if (on) {
          if (!v.src) {
            const webm = v.canPlayType('video/webm; codecs="vp9"') === 'probably'
            v.src = (v.dataset.src || '').replace(/\.mp4$/, webm ? '.webm' : '.mp4')
          }
          v.onplaying = () => v.classList.add('is-playing')
          if (visible) v.play().catch(() => {})
        } else {
          v.pause()
          v.classList.remove('is-playing')
        }
      }
    }
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting
      if (!visible) videos.forEach(v => v.pause())
      else sync()
    })
    io.observe(room)
    sync()
    window.addEventListener('ff:time', sync)
    reduced.addEventListener('change', sync)
    return () => { io.disconnect(); window.removeEventListener('ff:time', sync); reduced.removeEventListener('change', sync) }
  }, [])
  return null
}
