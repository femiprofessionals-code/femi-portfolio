import type { Metadata } from 'next'
import { PERSON } from '@/content/site'
import ResumeGate from './ResumeGate'

export const metadata: Metadata = {
  title: 'Résumé',
  description: 'Résumé of Femi Falade, available on request.',
  alternates: { canonical: '/resume' },
  robots: { index: false, follow: true },
}

/** The résumé is available on request: the page carries no résumé content until the passcode is accepted on the server. */
export default function ResumePage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap page-head__grid">
          <p className="eyebrow reveal">Available on request</p>
          <h1 className="display reveal" data-delay="1">Résumé</h1>
        </div>
      </header>
      <section className="room" style={{ paddingTop: 0 }} aria-label="Résumé">
        <div className="wrap" style={{ maxWidth: '64rem' }}>
          <ResumeGate email={PERSON.email} />
        </div>
      </section>
    </>
  )
}
