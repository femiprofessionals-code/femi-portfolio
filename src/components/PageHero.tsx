/**
 * Full-bleed interior photograph under an inner page's heading (Femi's supplied interiors, public/interiors).
 * `position` keeps the subject in frame as the band crops wider on desktop and taller on phones.
 */
export default function PageHero({ name, alt, position = '50% 50%' }: { name: string; alt: string; position?: string }) {
  const src = (w: number) => `/interiors/${name}-${w}.webp`
  return (
    <figure className="page-hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src(1536)} srcSet={[768, 1536].map(w => `${src(w)} ${w}w`).join(', ')} sizes="100vw" alt={alt}
        width={1536} height={1024} decoding="async" fetchPriority="high" style={{ objectPosition: position }} />
    </figure>
  )
}
