import type { Metadata } from 'next'

// Intentionally unlinked from navigation, homepage and footer. Share directly when context makes it useful.
export const metadata: Metadata = {
  title: 'Independent Work',
  robots: { index: false, follow: false },
}

const WORK = [
  { title: 'Hiring infrastructure', body: 'Pre-screening tooling for hiring teams that need signal over volume.' },
  { title: 'Renter matching', body: 'Apartment matching built on fit — commute, budget, lifestyle and preference — rather than keyword filters.' },
  { title: 'Independent-professional operations', body: 'Contracts, invoicing and client management for independent professionals in one system.' },
]

export default function VenturesPage() {
  return (
    <>
      <header className="page-head">
        <div className="wrap page-head__grid">
          <p className="eyebrow">Independent work</p>
          <h1 className="h1">Products I build independently, outside my institutional role.</h1>
        </div>
      </header>
      <section className="room" style={{ paddingTop: 0 }}>
        <div className="wrap career">
          {WORK.map(w => (
            <article key={w.title} className="career__row">
              <h2 className="career__title">{w.title}</h2>
              <p className="body">{w.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
