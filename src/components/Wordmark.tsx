import type { Institution } from '@/content/site'

/**
 * Typeset institution name. Replace with official logo SVGs from each firm's
 * approved brand assets when available (do not redraw or recolor them).
 */
export default function Wordmark({ inst }: { inst: Institution }) {
  return <span className={`wordmark wordmark--${inst.key}`}>{inst.name}</span>
}
