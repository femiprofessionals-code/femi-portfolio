import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Arrow from '@/components/Arrow'
import PrintButton from './PrintButton'
import { BRIEFS, EDUCATION, PERSON, ROLES } from '@/content/site'

export const metadata: Metadata = {
  title: 'Résumé',
  description: 'Résumé of Femi Falade — Goldman Sachs, The Carlyle Group, T. Rowe Price.',
  alternates: { canonical: '/resume' },
}

const HIGHLIGHTS: Record<string, string[]> = {
  gs: BRIEFS.filter(b => b.institution === 'gs').map(b => `${b.title} — ${b.summary}`),
  carlyle: BRIEFS.filter(b => b.institution === 'carlyle').map(b => `${b.title} — ${b.summary}`),
  trowe: [],
}

export default function ResumePage() {
  // Drop the PDF at public/Femi_Falade_Resume.pdf and the download + embedded preview appear automatically.
  const hasPdf = fs.existsSync(path.join(process.cwd(), 'public', PERSON.resumeFile))

  return (
    <>
      <header className="page-head">
        <div className="wrap page-head__grid">
          <p className="eyebrow reveal">Last updated {PERSON.resumeUpdated}</p>
          <h1 className="display reveal" data-delay="1">Résumé</h1>
          <div className="btn-row no-print reveal" data-delay="2">
            {hasPdf ? (
              <a href={PERSON.resumeFile} download className="btn btn--solid">Download PDF <Arrow /></a>
            ) : (
              <PrintButton />
            )}
            <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className="btn">View LinkedIn <Arrow /></a>
          </div>
        </div>
      </header>

      <section className="room" style={{ paddingTop: 0 }} aria-label="Résumé">
        <div className="wrap">
          {hasPdf ? (
            <object data={PERSON.resumeFile} type="application/pdf" className="resume-embed" aria-label="Résumé PDF preview">
              <p className="body">Your browser cannot preview PDFs. <a href={PERSON.resumeFile}>Download the résumé</a>.</p>
            </object>
          ) : (
            <div className="resume-doc">
              <p className="serif" style={{ fontSize: "2.25rem", lineHeight: 1.1 }}>{PERSON.name}</p>
              <p className="meta">{PERSON.location} · {PERSON.email} · linkedin.com/in/femi-falade</p>
              <p style={{ marginTop: '1rem' }}>{PERSON.positioning.join(' · ')}</p>

              <h2>Experience</h2>
              {ROLES.map(r => (
                <div key={r.company} className="role">
                  <div className="role__head">
                    <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>{r.company}</strong>
                    <span className="meta">{r.location} · {r.dates}</span>
                  </div>
                  <em className="serif" style={{ fontSize: '1.15rem' }}>{r.title}</em>
                  <p>{r.summary}</p>
                  {HIGHLIGHTS[r.institution].length > 0 && (
                    <ul>{HIGHLIGHTS[r.institution].map(h => <li key={h}>{h}</li>)}</ul>
                  )}
                </div>
              ))}

              <h2>Education &amp; credentials</h2>
              <ul>{EDUCATION.map(e => <li key={e}>{e}</li>)}</ul>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
