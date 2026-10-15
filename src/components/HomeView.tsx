import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import Arrow from '@/components/Arrow'
import GalleryRoom from '@/components/room/GalleryRoom'

/** The résumé button appears only when the real file is in place (docs/discrepancies.md D-14). */
const RESUME = '/Femi_Falade_Resume.pdf'
const hasResume = fs.existsSync(path.join(process.cwd(), 'public', RESUME))

export default function HomeView() {
  return (
    <>
      <GalleryRoom />
      <nav className="home-actions" aria-label="Next steps">
        <div className="wrap home-actions__row">
          <Link href="/work" className="btn btn--bronze">View work <Arrow /></Link>
          {hasResume && <a href={RESUME} className="btn btn--frame" download>Résumé</a>}
          <Link href="/contact" className="btn btn--frame">Contact</Link>
        </div>
      </nav>
    </>
  )
}
