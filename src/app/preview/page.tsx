import type { Metadata } from 'next'
import HomeView from '@/components/HomeView'

// Side-by-side preview of the homepage using the generated room videos. Not linked or indexed.
export const metadata: Metadata = { title: 'Preview', robots: { index: false, follow: false } }

export default function Preview() {
  return <HomeView room="ai" />
}
