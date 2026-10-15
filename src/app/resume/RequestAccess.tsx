'use client'
import { useRef, useState } from 'react'
import Arrow from '@/components/Arrow'

/**
 * Resume access request: name, email and phone, delivered to Femi's inbox by FormSubmit (formsubmit.co), a form-to-email
 * service that needs no account or key. The very first submission sends FormSubmit's one-time "Activate" email to the
 * address below; once Femi clicks it, every request arrives as a formatted email.
 */
const TO = 'femi@femifalade.com'
const ENDPOINT = `https://formsubmit.co/ajax/${TO}`

type State = 'idle' | 'open' | 'sending' | 'sent' | 'error'

export default function RequestAccess() {
  const [state, setState] = useState<State>('idle')
  const form = useRef<HTMLFormElement>(null)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = e.currentTarget
    if (!f.reportValidity()) return
    const d = new FormData(f)
    if (d.get('_honey')) return                                         // bots fill hidden fields
    setState('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: d.get('name'), Email: d.get('email'), Phone: d.get('phone'),
          _subject: `Resume request from ${d.get('name')}`, _replyto: d.get('email'), _template: 'table', _captcha: 'false',
        }),
      })
      const json = await res.json().catch(() => ({}))
      setState(res.ok && String((json as { success?: unknown }).success) !== 'false' ? 'sent' : 'error')
    } catch { setState('error') }
  }

  if (state === 'idle') return (
    <button type="button" className="btn" onClick={() => setState("open")}>
      Request access <Arrow />
    </button>
  )

  if (state === 'sent') return (
    <div className="resume-request resume-request--done" role="status">
      <p className="h3">Thank you. Your request is on its way.</p>
      <p className="body">I’ll reply by email with a passcode.</p>
    </div>
  )

  return (
    <form ref={form} className="resume-request" onSubmit={submit} noValidate={false} aria-labelledby="req-title">
      <p id="req-title" className="eyebrow">Request access</p>
      <div className="resume-request__field">
        <label htmlFor="req-name">Full name</label>
        <input id="req-name" name="name" type="text" autoComplete="name" required maxLength={120} autoFocus />
      </div>
      <div className="resume-request__field">
        <label htmlFor="req-email">Email</label>
        <input id="req-email" name="email" type="email" autoComplete="email" required maxLength={160} />
      </div>
      <div className="resume-request__field">
        <label htmlFor="req-phone">Phone number</label>
        <input id="req-phone" name="phone" type="tel" autoComplete="tel" required maxLength={40} pattern="[0-9+()\-.\s]{7,}" title="Digits, spaces and + ( ) - only" />
      </div>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="resume-request__hp" />
      <div className="btn-row">
        <button type="submit" className="btn btn--solid" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : <>Send request <Arrow /></>}</button>
      </div>
      {state === 'error' && (
        <p className="resume-gate__error" role="alert">
          The request couldn’t be sent just now. Please try again, or email <a href={`mailto:${TO}?subject=${encodeURIComponent('Resume request')}`}>{TO}</a>.
        </p>
      )}
    </form>
  )
}
