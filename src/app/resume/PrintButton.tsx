'use client'
import Arrow from '@/components/Arrow'

export default function PrintButton() {
  return (
    <button type="button" className="btn btn--solid" onClick={() => window.print()}>
      Save as PDF <Arrow />
    </button>
  )
}
