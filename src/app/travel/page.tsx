'use client'
import { motion } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { F, C, LINE, fadeUp } from '@/components/tokens'

const REGIONS = [
  { region: 'North America', countries: ['United States', 'Canada', 'Mexico'] },
  { region: 'Europe',        countries: ['United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Portugal', 'Switzerland', 'Sweden', 'Norway'] },
  { region: 'Africa',        countries: ['Nigeria', 'Ghana', 'South Africa', 'Kenya', 'Morocco'] },
  { region: 'Asia',          countries: ['Japan', 'Singapore', 'United Arab Emirates', 'Thailand', 'Hong Kong'] },
  { region: 'Caribbean',     countries: ['Jamaica', 'Barbados', 'Trinidad and Tobago'] },
]

export default function TravelPage() {
  return (
    <>
      <Nav />
      <section style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 2.5rem 4rem', paddingTop: 58, borderBottom: LINE, background: C.bg, position: 'relative' }}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted, marginBottom: '1.25rem' }}>
          30+ countries · 60+ cities
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(3rem,7vw,6.5rem)', fontWeight: 300, lineHeight: 1.03, letterSpacing: '-0.033em', color: C.text, marginBottom: '1rem' }}>
          The world, in motion.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontFamily: F.serif, fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontStyle: 'italic', fontWeight: 300, color: C.muted, maxWidth: '40ch' }}>
          DC to Lagos. London to Tokyo. The map keeps growing.
        </motion.p>
      </section>

      <section style={{ padding: '5rem 2.5rem', background: C.bg }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: C.line }}>
          {REGIONS.map((r, i) => (
            <motion.div key={r.region} {...fadeUp(i * 0.07)}
              style={{ padding: '2.5rem 2rem', background: C.bg }}>
              <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accent, marginBottom: '1.25rem' }}>{r.region}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {r.countries.map(c => (
                  <p key={c} style={{ fontFamily: F.serif, fontSize: '1.2rem', fontWeight: 400, letterSpacing: '-0.01em', color: C.text }}>{c}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: LINE, padding: '4rem 2.5rem', background: C.bg, textAlign: 'center' }}>
        <p style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 300, color: C.muted, maxWidth: '44ch', margin: '0 auto' }}>
          Photography and travel writing coming soon.
        </p>
      </section>

      <Footer />
    </>
  )
}
