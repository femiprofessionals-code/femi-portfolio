'use client'
import { useEffect, useRef } from 'react'
import { ROOM_BASE, TREE_BOX } from '@/content/scene'

/**
 * A breeze through the olive tree, cinemagraph-style: the canopy (cut from the room in each light, docs/asset-lock/scripts/tree.py)
 * is redrawn in WebGL with a gentle, height-weighted sway plus a little leaf flutter; the trunk base and planter stay still.
 * Underneath, the room with the tree painted out (only where leaves can move) so nothing doubles. The still room shows when
 * this is off: reduced motion, Save-Data, no WebGL, off-screen or a hidden tab.
 */

const VERT = `attribute vec2 p; varying vec2 uv; void main(){ uv = vec2(p.x * .5 + .5, .5 - p.y * .5); gl_Position = vec4(p, 0., 1.); }`
const FRAG = `precision mediump float;
varying vec2 uv; uniform sampler2D tree, bg; uniform float t; uniform vec2 px;   // px: one master pixel in uv
float h(vec2 q){ return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 q){ vec2 i = floor(q), f = fract(q); f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
void main(){
  vec2 m = uv / px + vec2(0., 180.);                                  // master coordinates
  float lift = smoothstep(575., 300., m.y);                             // 0 at the trunk base, 1 in the crown
  float reach = .55 + .45 * clamp(abs(m.x - 212.) / 190., 0., 1.);       // branch tips travel further
  float gust = .55 + .45 * sin(t * .21) * sin(t * .13 + 1.3);
  float sway = 2.4 * sin(t * .74 + m.y * .011) + 1.05 * sin(t * 1.63 + m.x * .021 + m.y * .017);   // up to ~4.5 master px at the crown
  float flut = n(m * .09 + vec2(t * .9, t * .4)) - .5;
  vec2 d = vec2(sway * gust * reach + 1.4 * flut, .35 * sin(t * 1.1 + m.x * .02) * gust + .5 * (n(m * .11 - t * .7) - .5)) * lift;
  vec4 tr = texture2D(tree, uv - d * px);
  vec4 b = texture2D(bg, uv);
  gl_FragColor = vec4(tr.rgb * tr.a + b.rgb * b.a * (1. - tr.a), tr.a + b.a * (1. - tr.a));   // premultiplied "over"
}`

export default function RoomTree() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current, room = document.querySelector<HTMLElement>('[data-room]')
    if (!c || !room) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (reduced.matches || saveData) return
    const gl = c.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) return
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.uniform1i(gl.getUniformLocation(prog, 'tree'), 0); gl.uniform1i(gl.getUniformLocation(prog, 'bg'), 1)
    gl.uniform2f(gl.getUniformLocation(prog, 'px'), 1 / TREE_BOX[2], 1 / TREE_BOX[3])
    const uT = gl.getUniformLocation(prog, 't')
    const tex = [gl.createTexture()!, gl.createTexture()!]
    tex.forEach(tx => { gl.bindTexture(gl.TEXTURE_2D, tx); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE) })
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)

    let light = '', ready = false, raf = 0, onScreen = true, last = 0, alive = true
    const load = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src })
    const setLight = async () => {
      const m = document.documentElement.dataset.time || 'morning'
      if (m === light) return
      light = m; ready = false; c.classList.remove('is-on')
      try {
        const [tr, bg] = await Promise.all([load(`${ROOM_BASE}/tree/tree-${m}.webp`), load(`${ROOM_BASE}/tree/bg-${m}.webp`)])
        if (!alive || m !== light) return
        ;[tr, bg].forEach((im, k) => { gl.activeTexture(gl.TEXTURE0 + k); gl.bindTexture(gl.TEXTURE_2D, tex[k]); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im) })
        ready = true; sync()
        // wait for the room's own light to finish crossfading before the moving tree fades in over it
        setTimeout(() => { if (alive && m === light) c.classList.add('is-on') }, 900)
      } catch { /* the still tree stays */ }
    }
    const size = () => {
      const r = c.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr)
      if (w && h && (c.width !== w || c.height !== h)) { c.width = w; c.height = h; gl.viewport(0, 0, w, h) }
    }
    const frame = (now: number) => {
      raf = 0
      if (!ready || !onScreen || document.hidden) return
      raf = requestAnimationFrame(frame)
      if (now - last < 33) return                                       // ~30 fps is plenty for a breeze
      last = now; size()
      gl.uniform1f(uT, now / 1000); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    const sync = () => { if (ready && onScreen && !document.hidden && !raf) raf = requestAnimationFrame(frame) }
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync() }); io.observe(room)
    const start = () => setLight()
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true })
    window.addEventListener('ff:time', setLight); document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', () => { if (reduced.matches) { alive = false; c.classList.remove('is-on') } })
    return () => { alive = false; cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('ff:time', setLight); document.removeEventListener('visibilitychange', sync) }
  }, [])
  return <canvas ref={ref} className="room5__tree" aria-hidden="true" />
}
