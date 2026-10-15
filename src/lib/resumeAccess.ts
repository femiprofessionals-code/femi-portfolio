import { createHash, scryptSync, timingSafeEqual } from 'node:crypto'

/**
 * The résumé is available on request, behind a passcode (Femi, 15 Oct 2026).
 * The repository is public, so the passcode itself is never stored here, only a slow, salted scrypt hash of it.
 * To change the passcode without a code change, set RESUME_PASSCODE in the hosting environment (Vercel → Settings →
 * Environment Variables); when it is set, it replaces the hash below.
 */
const SALT = '2aec7fb393733cc02ee8a6d1e25de45a'
const HASH = Buffer.from('19ac5cf4b2d580a81a100649411d290db174eadd233e680b18570f7b2fb0ab58', 'hex')

const digest = (s: string) => createHash('sha256').update(s).digest()

export function passcodeMatches(input: unknown): boolean {
  if (typeof input !== 'string' || input.length === 0 || input.length > 128) return false
  const entered = input.trim()
  const fromEnv = process.env.RESUME_PASSCODE
  if (fromEnv) return timingSafeEqual(digest(entered), digest(fromEnv))
  return timingSafeEqual(scryptSync(entered, SALT, 32, { N: 16384, r: 8, p: 1 }), HASH)
}
