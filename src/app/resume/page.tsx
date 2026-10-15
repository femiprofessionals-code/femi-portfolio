import type { Metadata } from 'next'
import ResumeGate from './ResumeGate'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Femi Falade, available on request.',
  alternates: { canonical: '/resume' },
  robots: { index: false, follow: true },
}

/** The resume is available on request: the page carries no resume content until the passcode is accepted on the server. */
export default function ResumePage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap page-head__grid">
          <p className="eyebrow reveal">Available on request</p>
          <h1 className="display reveal" data-delay="1">Resume</h1>
        </div>
      </header>
      <section className="room" style={{ paddingTop: 0 }} aria-label="Resume">
        <div className="wrap" style={{ maxWidth: '64rem' }}>
          <ResumeGate />
        </div>
      </section>
    </>
  )
}
