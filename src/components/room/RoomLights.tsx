'use client'
import { useEffect } from 'react'
import { ROOM_MODES } from '@/content/scene'
import { loadLight } from '@/lib/roomLights'

/**
 * Loads the room's light layers. The active light is requested at once (GalleryRoom's inline script does this on a
 * full page load; this covers client-side navigation); the other lights follow when the browser is idle, so a change
 * of light cross-fades between images that are already there.
 */
export default function RoomLights() {
  useEffect(() => {
    const root = document.querySelector('[data-room]')
    if (!root) return
    loadLight(root, document.documentElement.dataset.time || 'morning')
    const rest = () => ROOM_MODES.forEach(m => loadLight(root, m))
    const idle = () => { if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(rest, { timeout: 4000 }); else setTimeout(rest, 1500) }
    if (document.readyState === 'complete') idle()
    else window.addEventListener('load', idle, { once: true })
    const onTime = (e: Event) => loadLight(root, (e as CustomEvent<string>).detail)
    window.addEventListener('ff:time', onTime)
    return () => { window.removeEventListener('load', idle); window.removeEventListener('ff:time', onTime) }
  }, [])
  return null
}
