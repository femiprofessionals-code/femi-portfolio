'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const tryPlay = async () => {
      try { await v.play() } catch { setHasVideo(false) }
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
    animate:    { opacity: 1, y: 0 },
    transition: { delay, duration: 0.95, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  })

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '0 2.5rem 5.5rem',
      paddingTop: 58,
      overflow: 'hidden',
      background: '#080F1C',
    }}>

      {/* Background video */}
      {hasVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={loaded ? 'video-loaded' : ''}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.2s ease',
            zIndex: 0,
          }}
        />
      )}

      {/* Fallback poster if video fails */}
      {!hasVideo && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${posterSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }} />
      )}

      {/* Bottom gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(to top, rgba(8,15,28,0.97) 0%, rgba(8,15,28,0.75) 35%, rgba(8,15,28,0.3) 65%, rgba(8,15,28,0.15) 100%)',
      }} />

      {/* Top gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '30%', zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(8,15,28,0.6) 0%, transparent 100%)',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute',
        bottom: '10%', right: '5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217,119,87,0.08) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Hero text content */}
      <div
        className="hero-text-wrap"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '60%',
        }}
      >

        {/* Eyebrow row with interactive headshot */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: '1.75rem',
          position: 'relative',
        }}>
          {/* Animated headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.08 }}
            className="hero-headshot"
            style={{
              position: 'relative',
              width: 56,
              height: 56,
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
          >
            {/* Outer pulsing ring on hover */}
            <motion.div
              animate={hovered ? {
                scale: [1, 1.4, 1.4],
                opacity: [0.6, 0, 0],
              } : { scale: 1, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: hovered ? Infinity : 0,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                inset: -2,
                borderRadius: '50%',
                border: '2px solid #D97757',
                pointerEvents: 'none',
              }}
            />

            {/* Headshot circle with image */}
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              overflow: 'hidden',
              border: hovered
                ? '2px solid rgba(217,119,87,1)'
                : '2px solid rgba(217,119,87,0.6)',
              boxShadow: hovered
                ? '0 0 24px rgba(217,119,87,0.55), 0 6px 20px rgba(0,0,0,0.4)'
                : '0 6px 20px rgba(0,0,0,0.4)',
              background: 'rgba(8,15,28,0.5)',
              transition: 'border 0.3s ease, box-shadow 0.3s ease',
            }}>
              <img
                src="/images/femi-headshot.jpg"
                alt="Femi Falade"
                onError={e => { (e.currentTarget.parentElement?.parentElement as HTMLElement).style.display = 'none' }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                  transform: hovered ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            </div>

            {/* Floating reveal card */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, x: -8, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -8, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 'calc(100% + 14px)',
                    transform: 'translateY(-50%)',
                    background: 'rgba(8,15,28,0.92)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(217,119,87,0.3)',
                    padding: '10px 16px',
                    borderRadius: 8,
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                >
                  <p style={{
                    fontFamily: F.serif,
                    fontSize: 14,
                    fontWeight: 400,
                    color: '#F0EDE8',
                    letterSpacing: '-0.01em',
                    margin: 0,
                  }}>
                    Femi Falade
                  </p>
                  <p style={{
                    fontFamily: F.sans,
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#D97757',
                    margin: '2px 0 0 0',
                  }}>
                    Senior Associate · Goldman Sachs
                  </p>

                  {/* Pointing arrow on left edge */}
                  <div style={{
                    position: 'absolute',
                    left: -6,
                    top: '50%',
                    transform: 'translateY(-50%) rotate(45deg)',
                    width: 12,
                    height: 12,
                    background: 'rgba(8,15,28,0.92)',
                    borderLeft: '1px solid rgba(217,119,87,0.3)',
                    borderBottom: '1px solid rgba(217,119,87,0.3)',
                  }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.p {...fadeUp(0.15)}
            style={{
              fontFamily: F.sans,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(240,237,232,0.5)',
              margin: 0,
            }}>
            Goldman Sachs · Global Banking and Markets · New York
          </motion.p>
        </div>

        <motion.h1 {...fadeUp(0.25)}
          style={{
            fontFamily: F.serif,
            fontSize: 'clamp(2.4rem, 6vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            color: '#F0EDE8',
            maxWidth: '18ch',
            marginBottom: '1.75rem',
          }}>
          I build and ship operational programs.{' '}
          <em style={{ fontStyle: 'italic', color: C.accent }}>Six years.</em>{' '}
          Three institutions. Real deliverables.
        </motion.h1>

        <motion.p {...fadeUp(0.4)}
          style={{
            fontFamily: F.sans,
            fontSize: 15,
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(240,237,232,0.7)',
            maxWidth: '52ch',
            marginBottom: '2.75rem',
          }}>
          Goldman Sachs. The Carlyle Group. T. Rowe Price. CFTC frameworks delivered in 30 days. A $580M entity migration. An AI workflow tool deployed to 60 team members. Three platforms in development.
        </motion.p>

        <motion.div {...fadeUp(0.55)}
          style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/work" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: F.sans,
            fontSize: 13,
            fontWeight: 500,
            color: '#F0EDE8',
            textDecoration: 'none',
            borderBottom: `1px solid ${C.accent}`,
            paddingBottom: 2,
          }}>
            View work
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/contact" style={{
            fontFamily: F.sans,
            fontSize: 13,
            fontWeight: 300,
            color: 'rgba(240,237,232,0.5)',
            textDecoration: 'none',
          }}>
            Work with me
          </Link>
        </motion.div>
      </div>
    </section>
  )
}