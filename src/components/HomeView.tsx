import Link from 'next/link'
import Arrow from '@/components/Arrow'
import GalleryRoom from '@/components/room/GalleryRoom'

export default function HomeView() {
  return (
    <>
      <GalleryRoom />
      <nav className="home-actions" aria-label="Next steps">
        <div className="wrap home-actions__row">
          <Link href="/work" className="btn btn--bronze">View work <Arrow /></Link>
          <Link href="/resume" className="btn btn--frame">Résumé</Link>
          <Link href="/contact" className="btn btn--frame">Contact</Link>
        </div>
      </nav>
    </>
  )
}
