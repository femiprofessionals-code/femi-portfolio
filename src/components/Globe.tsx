'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { F, C, LINE } from './tokens'

function ll(lat: number, lng: number, r: number) {
  const p = (90 - lat) * (Math.PI / 180)
  const t = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t))
}

const PINS = [
  { id: 'gs',      lat: 40.7128, lng: -74.006,  city: 'New York, NY',   company: 'Goldman Sachs',     role: 'Senior Associate — Global Banking & Markets Transformation', stat: '$580M entity migration · 60% review-cycle reduction · CFTC framework in 30 days', period: '2023 – Present' },
  { id: 'carlyle', lat: 38.9072, lng: -77.0369, city: 'Washington, DC', company: 'The Carlyle Group', role: 'Associate — EMEA Fund Operations',                           stat: 'Salesforce CRM built from scratch · Investor onboarding adopted as global standard', period: '2021 – 2023' },
  { id: 'trowe',   lat: 39.2904, lng: -76.6122, city: 'Baltimore, MD',  company: 'T. Rowe Price',     role: 'Analyst — Asset Management Operations',                      stat: 'Operational foundation inside a $1T+ AUM environment', period: '2019 – 2021' },
]

export default function Globe() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<string | null>(null)
  const loc = PINS.find(p => p.id === active)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const W = el.clientWidth, H = 480, R = 2

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H); renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setClearColor(0, 0)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(44, W / H, 0.1, 100)
    cam.position.set(0, 0, 6.4)
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const sun = new THREE.PointLight(0xffffff, 1.2); sun.position.set(10, 10, 10); scene.add(sun)
    const rim = new THREE.PointLight(0xc9a84c, 0.45); rim.position.set(-8, -6, -8); scene.add(rim)

    const g = new THREE.Group(); scene.add(g)
    g.add(new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), new THREE.MeshStandardMaterial({ color: 0x0d1f3c, roughness: 0.75, metalness: 0.2 })))
    g.add(new THREE.Mesh(new THREE.SphereGeometry(R + 0.07, 32, 32), new THREE.MeshStandardMaterial({ color: 0x163466, transparent: true, opacity: 0.07, side: THREE.BackSide })))

    const gm = new THREE.LineBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.05 })
    for (let lat = -80; lat <= 80; lat += 20) { const pts: THREE.Vector3[] = []; for (let ln = 0; ln <= 360; ln += 3) pts.push(ll(lat, ln - 180, R + 0.002)); g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gm)) }
    for (let ln = 0; ln < 360; ln += 30)    { const pts: THREE.Vector3[] = []; for (let la = -90; la <= 90; la += 3) pts.push(ll(la, ln - 180, R + 0.002));  g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gm)) }

    const arc = (la1: number, ln1: number, la2: number, ln2: number, h: number, col: number, op: number) => {
      const a = ll(la1, ln1, R), b = ll(la2, ln2, R), mid = a.clone().add(b).normalize().multiplyScalar(R * h)
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(80)), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op })))
    }
    arc(38.9072, -77.0369, 51.5074, -0.1278, 1.45, 0xc9a84c, 0.6)
    arc(40.7128, -74.006, 38.9072, -77.0369, 1.12, 0xf0ede8, 0.18)

    const pins: { mesh: THREE.Mesh; halo: THREE.Mesh; ring: THREE.Mesh }[] = []
    PINS.forEach(p => {
      const pos = ll(p.lat, p.lng, R + 0.04)
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), new THREE.MeshStandardMaterial({ color: 0xc9a84c, emissive: 0xc9a84c, emissiveIntensity: 0.85 }))
      mesh.position.copy(pos); mesh.userData.id = p.id; g.add(mesh)
      const halo = new THREE.Mesh(new THREE.RingGeometry(0.1, 0.15, 32), new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.28, side: THREE.DoubleSide }))
      halo.position.copy(pos); halo.lookAt(new THREE.Vector3(0, 0, 0)); g.add(halo)
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.2, 32), new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.1, side: THREE.DoubleSide }))
      ring.position.copy(pos); ring.lookAt(new THREE.Vector3(0, 0, 0)); g.add(ring)
      pins.push({ mesh, halo, ring })
    })

    let drag = false, prev = { x: 0, y: 0 }, vel = { x: 0, y: 0 }
    const dn = (e: MouseEvent) => { drag = true; prev = { x: e.clientX, y: e.clientY }; el.style.cursor = 'grabbing' }
    const mv = (e: MouseEvent) => { if (!drag) return; vel.y = (e.clientX - prev.x) * 0.005; vel.x = (e.clientY - prev.y) * 0.005; prev = { x: e.clientX, y: e.clientY } }
    const up = () => { drag = false; el.style.cursor = 'grab' }
    const td = (e: TouchEvent) => { drag = true; prev = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
    const tm = (e: TouchEvent) => { if (!drag) return; vel.y = (e.touches[0].clientX - prev.x) * 0.005; vel.x = (e.touches[0].clientY - prev.y) * 0.005; prev = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
    const ray = new THREE.Raycaster(), m2 = new THREE.Vector2()
    const click = (e: MouseEvent) => {
      const r = renderer.domElement.getBoundingClientRect()
      m2.x = ((e.clientX - r.left) / r.width) * 2 - 1; m2.y = -((e.clientY - r.top) / r.height) * 2 + 1
      ray.setFromCamera(m2, cam)
      const hits = ray.intersectObjects(pins.map(p => p.mesh))
      if (hits.length) { const id = hits[0].object.userData.id as string; setActive(prev => prev === id ? null : id) }
    }

    renderer.domElement.addEventListener('mousedown', dn); window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up)
    renderer.domElement.addEventListener('touchstart', td); renderer.domElement.addEventListener('touchmove', tm); renderer.domElement.addEventListener('touchend', up)
    renderer.domElement.addEventListener('click', click)
    const resize = () => { const w = el.clientWidth; cam.aspect = w / H; cam.updateProjectionMatrix(); renderer.setSize(w, H) }
    window.addEventListener('resize', resize)

    let raf: number, t = 0
    const tick = () => {
      raf = requestAnimationFrame(tick); t += 0.022
      if (!drag) g.rotation.y += 0.0022
      g.rotation.y += vel.y; g.rotation.x = Math.max(-0.42, Math.min(0.42, g.rotation.x + vel.x)); vel.x *= 0.9; vel.y *= 0.9
      pins.forEach(({ halo, ring }, i) => {
        const s = 1 + Math.sin(t + i * 1.3) * 0.1; halo.scale.set(s, s, s)
        const rs = 1 + Math.sin(t * 0.65 + i) * 0.16; ring.scale.set(rs, rs, rs);
        (ring.material as THREE.MeshBasicMaterial).opacity = 0.07 + Math.sin(t * 0.65 + i) * 0.05
      })
      renderer.render(scene, cam)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      renderer.domElement.removeEventListener('mousedown', dn); window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up)
      renderer.domElement.removeEventListener('touchstart', td); renderer.domElement.removeEventListener('touchmove', tm); renderer.domElement.removeEventListener('touchend', up)
      renderer.domElement.removeEventListener('click', click); window.removeEventListener('resize', resize)
      renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section style={{ borderTop: LINE, padding: '5rem 2.5rem 6rem' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: LINE }}>
        <div>
          <p style={{ fontFamily: F.sans, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.dim40, marginBottom: 10 }}>Global footprint</p>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 300, letterSpacing: '-0.025em', color: C.cream, lineHeight: 1.1 }}>
            East Coast foundation.{' '}<em style={{ color: C.gold, fontStyle: 'italic' }}>EMEA reach.</em>
          </h2>
        </div>
        <p style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 300, color: C.dim40, textAlign: 'right', lineHeight: 1.6, maxWidth: '22ch' }}>Drag to spin. Click a pin to explore each role.</p>
      </motion.div>

      <div ref={mountRef} style={{ width: '100%', height: 480, position: 'relative', cursor: 'grab' }}>
        <AnimatePresence>
          {loc && (
            <motion.div key={loc.id} initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(8,15,28,0.98)', border: `1px solid ${C.gold}`, padding: '1.5rem 2rem', maxWidth: 420, width: '90%', zIndex: 10, backdropFilter: 'blur(16px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <p style={{ fontFamily: F.sans, fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.gold, marginBottom: 4 }}>{loc.period} · {loc.city}</p>
                  <h4 style={{ fontFamily: F.serif, fontSize: '1.5rem', fontWeight: 400, color: C.cream, letterSpacing: '-0.02em' }}>{loc.company}</h4>
                </div>
                <button onClick={() => setActive(null)} style={{ background: 'none', border: 'none', color: C.dim40, fontSize: 22, lineHeight: 1, cursor: 'pointer', padding: '0 4px' }}>×</button>
              </div>
              <p style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 300, color: C.dim40, marginBottom: 10, lineHeight: 1.5 }}>{loc.role}</p>
              <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: 10 }}>
                <p style={{ fontFamily: F.sans, fontSize: 13, color: C.gold, lineHeight: 1.6 }}>{loc.stat}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
        {PINS.map(p => (
          <button key={p.id} onClick={() => setActive(active === p.id ? null : p.id)} style={{ fontFamily: F.sans, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: active === p.id ? C.gold : C.dim40, border: `1px solid ${active === p.id ? 'rgba(201,168,76,0.5)' : C.line}`, background: active === p.id ? 'rgba(201,168,76,0.05)' : 'transparent', padding: '7px 16px', cursor: 'pointer', transition: 'all 0.2s' }}>
            {p.city}
          </button>
        ))}
      </div>
    </section>
  )
}
