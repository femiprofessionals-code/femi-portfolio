import Link from 'next/link'
import { PERSON } from '@/content/site'

export default function Footer() {
  return (
    <footer className="footer dark">
      <div className="wrap footer__grid">
        <ul aria-label="Contact">
          <li><a href={`mailto:${PERSON.email}`}>Email</a></li>
          <li><a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><Link href="/resume">Résumé</Link></li>
        </ul>
        <small>{PERSON.name} · {PERSON.location} · © {new Date().getFullYear()}</small>
      </div>
    </footer>
  )
}
