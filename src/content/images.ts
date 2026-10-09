import type { StaticImageData } from 'next/image'
import study from '../../public/images/rooms/study-light.webp'
import library from '../../public/images/rooms/library-dark.webp'
import residence from '../../public/images/rooms/residence-light.webp'
import frames from '../../public/images/rooms/gallery-frames.webp'
import windows from '../../public/images/rooms/residence-windows.webp'
import lounge from '../../public/images/rooms/contact-lounge.webp'

/** Editorial room imagery per brief. Replace with final licensed photography when available. */
export const BRIEF_IMAGES: Record<string, { src: StaticImageData; position: string }> = {
  'pre-trade-initial-margin': { src: study, position: '60% 50%' },
  'ice-clear-credit': { src: library, position: '55% 50%' },
  'enterprise-inter-affiliate-clearing': { src: residence, position: '50% 40%' },
  'kaizen-integration': { src: frames, position: '50% 40%' },
  'emea-private-equity-investor-experience': { src: windows, position: '30% 50%' },
  'nav-facility': { src: lounge, position: '60% 50%' },
}
