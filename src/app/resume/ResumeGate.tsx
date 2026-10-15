'use client'
import { useEffect, useRef, useState } from 'react'
import Arrow from '@/components/Arrow'
import { unlockResume, type ResumeData } from './actions'
import RequestAccess from './RequestAccess'

const KEY = 'ff-resume-pass'   // this tab only: re-opening the resume in the same tab doesn't ask again

export default function ResumeGate() {
  const [resume, setResume] = useState<ResumeData | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const field = useRef<HTMLInputElement>(null)

  const tryUnlock = async (pass: string, remembered = false) => {
    setBusy(true); setError('')
    try {
      const res = await unlockResume(pass)
      if (res.ok) {
        setResume(res.resume)
        try { sessionStorage.setItem(KEY, pass) } catch {}
      } else {
        try { sessionStorage.removeItem(KEY) } catch {}
        if (!remembered) { setError(res.error); field.current?.focus() }
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally { setBusy(false) }
  }

  useEffect(() => {
    let saved: string | null = null
    try { saved = sessionStorage.getItem(KEY) } catch {}
    if (saved) tryUnlock(saved, true)
  }, [])

  if (resume) return <ResumeDoc r={resume} />

  return (
    <div className="resume-gate">
      <p className="lede body">My resume is available on request. If you have a passcode, enter it below; otherwise, request access and I’ll reply with one.</p>
      <form className="resume-gate__form" onSubmit={e => { e.preventDefault(); const v = field.current?.value || ''; if (v.trim()) tryUnlock(v) }}>
        <label htmlFor="resume-pass" className="eyebrow">Passcode</label>
        <div className="resume-gate__row">
          <input ref={field} id="resume-pass" name="passcode" type="password" autoComplete="off" spellCheck={false} required
            aria-invalid={!!error} aria-describedby={error ? 'resume-pass-error' : undefined} className="resume-gate__input" />
          <button type="submit" className="btn btn--solid" disabled={busy}>{busy ? 'Checking…' : <>View resume <Arrow /></>}</button>
        </div>
        <p id="resume-pass-error" className="resume-gate__error" role="alert" aria-live="polite">{error}</p>
      </form>
      <RequestAccess />
    </div>
  )
}

function ResumeDoc({ r }: { r: ResumeData }) {
  return (
    <>
      <div className="btn-row no-print" style={{ marginBottom: '2rem' }}>
        <button type="button" className="btn btn--solid" onClick={() => window.print()}>Save as PDF <Arrow /></button>
        <a href={r.linkedin} target="_blank" rel="noopener noreferrer" className="btn">View LinkedIn <Arrow /></a>
      </div>
      <div className="resume-doc">
        <p className="serif" style={{ fontSize: '2.25rem', lineHeight: 1.1 }}>{r.name}</p>
        <p className="meta">{r.location} · {r.email} · linkedin.com/in/femi-falade</p>
        <p style={{ marginTop: '1rem' }}>{r.positioning.join(' · ')}</p>
        <h2>Experience</h2>
        {r.roles.map(role => (
          <div key={role.company} className="role">
            <div className="role__head">
              <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>{role.company}</strong>
              <span className="meta">{role.location} · {role.dates}</span>
            </div>
            <em className="serif" style={{ fontSize: '1.15rem' }}>{role.title}</em>
            <p>{role.summary}</p>
            {role.highlights.length > 0 && <ul>{role.highlights.map(h => <li key={h}>{h}</li>)}</ul>}
          </div>
        ))}
        <h2>Education &amp; credentials</h2>
        <ul>{r.education.map(e => <li key={e}>{e}</li>)}</ul>
        <p className="meta" style={{ marginTop: '2rem' }}>Last updated {r.updated}</p>
      </div>
    </>
  )
}
