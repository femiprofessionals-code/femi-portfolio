'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { F, C } from './tokens'

/*
  HOW TO USE:
  -----------
  1. Place your video file at:  public/videos/hero.mp4
  2. Place a fallback poster at: public/images/hero-poster.jpg
     (a single frame from the video, used while it loads on mobile)

  The video must be:
  - Format:   MP4 (H.264 codec) — works in all browsers
  - Size:     Under 15MB ideally, 30MB max
  - Duration: 10–30 seconds, loops seamlessly
  - Content:  Finance/city/abstract — no audio needed (it's muted)

  See the walkthrough at the bottom of this file for sourcing tips.
*/

interface VideoHeroProps {
  /** Path relative to /public — default: /videos/hero.mp4 */
  videoSrc?: string
  /** Fallback image while video loads — default: /images/hero-poster.jpg */
  posterSrc?: string
}

export default function VideoHero({
  videoSrc  = '/videos/hero.mp4',
  posterSrc = '/images/hero-poster.jpg',
}: VideoHeroProps) {
  const videoRef  = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded]   = useState(false)
  const [hasVideo, setHasVideo] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    // Attempt to play; if it fails (mobile data-saver, etc.) hide video gracefully
    const tryPlay = async () => {
      try {
        await v.play()
      } catch {
        setHasVideo(false)
      }
    }

    if (v.readyState >= 3) {
      setLoaded(true)
      tryPlay()
    } else {
      v.addEventListener('canplaythrough', () => { setLoaded(true); tryPlay() }, { once: true })
      v.addEventListener('error', () => setHasVideo(false), { once: true })
    }
  }, [])

  const fadeUp = (delay: number) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    { opacity: 1, y:  0 },
    transition: { delay, duration: 0.95, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  })

  return (
    <section style={{
      position:  'relative',
      minHeight: '100vh',
      display:   'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding:   '0 2.5rem 5.5rem',
      paddingTop: 58,
      overflow:  'hidden',
    }}>

      {/* ── Background video ───────────────────────── */}
      {hasVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline                    // Required for iOS autoplay
          preload="auto"
          className={loaded ? 'video-loaded' : ''}
          style={{
            position:   'absolute',
            inset:      0,
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            opacity:     loaded ? 1 : 0,
            transition:  'opacity 1.2s ease',
            zIndex:      0,
          }}
        />
      )}

      {/* ── Fallback: static poster when no video ──── */}
      {!hasVideo && (
        <div style={{
          position:   'absolute',
          inset:      0,
          backgroundImage: `url(${posterSrc})`,
          backgroundSize:  'cover',
          backgroundPosition: 'center',
          zIndex:     0,
        }} />
      )}

      {/* ── Gradient overlays (layered for depth) ──── */}
      {/* Bottom gradient — makes text readable */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(8,15,28,0.97) 0%, rgba(8,15,28,0.75) 35%, rgba(8,15,28,0.3) 65%, rgba(8,15,28,0.15) 100%)',
      }} />

      {/* Top gradient — softens video top edge for nav */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '30%', zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(8,15,28,0.6) 0%, transparent 100%)',
      }} />

      {/* Subtle gold vignette bottom-right */}
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* ── Vertical rule decorations ──────────────── */}
      {[20, 40, 60, 80].map(p => (
        <div key={p} style={{
          position: 'absolute', top: 0, bottom: 0, left: `${p}%`,
          width: 1, background: 'rgba(240,237,232,0.025)',
          zIndex: 1, pointerEvents: 'none',
        }} />
      ))}

      {/* ── Hero content (above all overlays) ─────── */}
      <div style={{ position: 'relative', zIndex: 2 }}>

        <motion.p {...fadeUp(0.15)}
          style={{
            fontFamily: F.sans, fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(240,237,232,0.45)',
            marginBottom: '1.75rem',
          }}>
          Goldman Sachs · Global Banking &amp; Markets · New York
        </motion.p>

        <motion.h1 {...fadeUp(0.25)}
          style={{
            fontFamily: F.serif,
            fontSize: 'clamp(3.2rem, 7.5vw, 7.5rem)',
            fontWeight: 300, lineHeight: 1.02,
            letterSpacing: '-0.035em',
            color: C.cream,
            maxWidth: '16ch',
            marginBottom: '1.75rem',
            textShadow: '0 2px 40px rgba(8,15,28,0.5)',
          }}>
          Finance leader.{' '}
          <em style={{ fontStyle: 'italic', color: C.gold }}>
            Transformation
          </em>{' '}
          architect.{' '}
          Builder of AI&#8209;native platforms.
        </motion.h1>

        <motion.p {...fadeUp(0.4)}
          style={{
            fontFamily: F.sans, fontSize: 15, fontWeight: 300,
            lineHeight: 1.75, color: 'rgba(240,237,232,0.7)',
            maxWidth: '50ch', marginBottom: '2.75rem',
            textShadow: '0 1px 20px rgba(8,15,28,0.8)',
          }}>
          Senior Associate at Goldman Sachs driving enterprise-scale regulatory,
          operational, and AI transformation across global financial institutions.
        </motion.p>

        <motion.div {...fadeUp(0.55)}
          style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <Link href="/work" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: F.sans, fontSize: 13, fontWeight: 500,
            color: C.cream, textDecoration: 'none',
            borderBottom: `1px solid ${C.gold}`, paddingBottom: 2,
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            My work
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link href="/contact" style={{
            fontFamily: F.sans, fontSize: 13, fontWeight: 300,
            color: 'rgba(240,237,232,0.45)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = C.cream)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,237,232,0.45)')}>
            Work with me →
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '2.5rem', right: '2.5rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 8, zIndex: 2,
        }}>
        <span style={{
          fontFamily: F.sans, fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'rgba(240,237,232,0.25)',
          writingMode: 'vertical-rl',
        }}>Scroll</span>
        <div style={{
          width: 1, height: 54,
          background: `linear-gradient(to bottom, ${C.gold}, transparent)`,
        }} />
      </motion.div>

      {/* ── Video mute toggle (bottom-left) ────────── */}
      {hasVideo && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{
            position: 'absolute', bottom: '2.5rem', left: '2.5rem',
            zIndex: 2,
          }}>
          <span style={{
            fontFamily: F.sans, fontSize: 9, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(240,237,232,0.2)',
          }}>
            &#9679; Live
          </span>
        </motion.div>
      )}
    </section>
  )
}
