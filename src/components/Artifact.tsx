import type { Brief } from '@/content/site'
import { institutionName } from '@/content/site'

const MATERIALS = ['travertine', 'walnut', 'plaster', 'bone', 'black', 'bronze'] as const

/** A typographic "framed artifact" standing in for brief imagery: material matte, numeral, domain, institution. */
export default function Artifact({ brief, wide = false, thesis = false }: { brief: Brief; wide?: boolean; thesis?: boolean }) {
  const mat = MATERIALS[(parseInt(brief.n, 10) - 1) % MATERIALS.length]
  return (
    <div className={`artifact mat--${mat}${wide ? ' artifact--wide' : ''}`} aria-hidden="true">
      <div className="artifact__face">
        <span className="artifact__label">{brief.domain}</span>
        {thesis && <p className="artifact__thesis">{brief.thesis}</p>}
        <div>
          <div className="artifact__n">{brief.n}</div>
          <div className="artifact__inst">{institutionName(brief.institution)}</div>
        </div>
      </div>
    </div>
  )
}
