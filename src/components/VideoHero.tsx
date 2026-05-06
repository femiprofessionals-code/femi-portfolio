'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { F, C } from './tokens'

interface VideoHeroProps {
  videoSrc?: string
  posterSrc?: string
}

export default function VideoHero({
  videoSrc  = '/videos/hero.mp4',
  posterSrc = '/images/hero-poster.jpg',
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [hasVideo, setHasVideo] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const tryPlay = async () => {
      try { await v.play() } catch { setHasVideo(false) }
    }
    if (v.readyState >= 3) { setLoaded(true); tryPlay() }
    else {
      v.addEventListener('canplaythrough', () => { setLoaded(true); tryPlay() }, { once: true })
      v.addEventListener('error', () => setHasVideo(false), { once: true })
    }
  }, [])

  const fadeUp = (delay: number) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    { opacity: 1, y: 0 },
    transition: { delay, duration: 0.95, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  })

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: '0 2.5rem 5.5rem', paddingTop: 58, overflow: 'hidden',
      background: '#080F1C',
    }}>
      {hasVideo && (
        <video
          ref={videoRef} src={videoSrc} poster={posterSrc}
          autoPlay muted loop playsInline preload="auto"
          className={loaded ? 'video-loaded' : ''}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: loaded ? 1 : 0,
            transition: 'opacity 1.2s ease', zIndex: 0,
          }}
        />
      )}
      {!hasVideo && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${posterSrc})`,
          backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
        }} />
      )}

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(8,15,28,0.97) 0%, rgba(8,15,28,0.75) 35%, rgba(8,15,28,0.3) 65%, rgba(8,15,28,0.15) 100%)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '30%', zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(8,15,28,0.6) 0%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217,119,87,0.08) 0%, transparent 70%)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.p {...fadeUp(0.15)}
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(240,237,232,0.5)', marginBottom: '1.75rem' }}>
          Goldman Sachs · Global Banking and Markets · New York
        </motion.p>

        <motion.h1 {...fadeUp(0.25)}
          style={{
            fontFamily: F.serif,
            fontSize: 'clamp(3rem, 7vw, 6.8rem)',
            fontWeight: 300, lineHeight: 1.04,
            letterSpacing: '-0.035em', color: '#F0EDE8',
            maxWidth: '18ch', marginBottom: '1.75rem',
          }}>
          I build and ship operational programs.{' '}
          <em style={{ fontStyle: 'italic', color: C.accent }}>
            Six years.
          </em>{' '}
          Three institutions. Real deliverables.
        </motion.h1>

        <motion.p {...fadeUp(0.4)}
          style={{
            fontFamily: F.sans, fontSize: 15, fontWeight: 300, lineHeight: 1.75,
            color: 'rgba(240,237,232,0.7)', maxWidth: '52ch', marginBottom: '2.75rem',
          }}>
          Goldman Sachs. The Carlyle Group. T. Rowe Price. CFTC frameworks delivered in 30 days. A $580M entity migration. An AI workflow tool deployed to 60 team members. Three platforms in development.
        </motion.p>

        <motion.div {...fadeUp(0.55)} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <Link href="/work" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: F.sans, fontSize: 13, fontWeight: 500,
            color: '#F0EDE8', textDecoration: 'none',
            borderBottom: `1px solid ${C.accent}`, paddingBottom: 2,
          }}>
            View work
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/contact" style={{
            fontFamily: F.sans, fontSize: 13, fontWeight: 300,
            color: 'rgba(240,237,232,0.5)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}>
            Work with me
          </Link>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '2.5rem', right: '2.5rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2,
        }}>
        <span style={{ fontFamily: F.sans, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'rgba(240,237,232,0.25)', writingMode: 'vertical-rl' }}>Scroll</span>
        <div style={{ width: 1, height: 54, background: `linear-gradient(to bottom, ${C.accent}, transparent)` }} />
      </motion.div>
    </section>
  )
}
