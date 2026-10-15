'use client'
import { useEffect } from 'react'

/** Pauses the room's movement while it is off-screen or the tab is hidden (CSS animation-play-state only). */
export default function RoomMovementControl() {
  useEffect(() => {
    const room = document.querySelector<HTMLElement>('[data-room]')
    if (!room) return
    let onScreen = true
    const sync = () => room.classList.toggle('room5--paused', !onScreen || document.hidden)
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync() })
    io.observe(room)
    document.addEventListener('visibilitychange', sync)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [])
  return null
}
