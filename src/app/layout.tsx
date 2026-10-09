import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, EB_Garamond, Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import TimeSelector from '@/components/TimeSelector'
import { TIME_BOOT_SCRIPT } from '@/lib/time'
import { PERSON, INSTITUTIONS } from '@/content/site'
import './globals.css'

const serif = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-display',
  display: 'swap',
})
const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

const description =
  'Femi Falade is a New York-based financial-services and product leader with experience across Goldman Sachs, The Carlyle Group and T. Rowe Price, spanning private markets, credit, product strategy and strategic transformation.'

export const metadata: Metadata = {
  metadataBase: new URL(PERSON.url),
  title: {
    default: 'Femi Falade | Private Markets, Product Strategy & Strategic Transformation',
    template: '%s | Femi Falade',
  },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Femi Falade',
    title: 'Femi Falade | Private Markets, Product Strategy & Strategic Transformation',
    description,
    url: PERSON.url,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Femi Falade' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
}

export const viewport: Viewport = { themeColor: '#F4F0E9' }

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSON.name,
  url: PERSON.url,
  jobTitle: PERSON.jobTitle,
  worksFor: { '@type': 'Organization', name: 'Goldman Sachs' },
  alumniOf: [
    ...INSTITUTIONS.filter(i => i.key !== 'gs').map(i => ({ '@type': 'Organization', name: i.name })),
    { '@type': 'CollegeOrUniversity', name: 'Morgan State University' },
  ],
  address: { '@type': 'PostalAddress', addressLocality: 'New York', addressRegion: 'NY', addressCountry: 'US' },
  sameAs: [PERSON.linkedin],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TIME_BOOT_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <TimeSelector />
      </body>
    </html>
  )
}
