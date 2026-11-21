/**
 * Remembering which questions a visitor has already seen, so a retake prefers new ones.
 * The browser keeps short keys (a hash of each question id) and sends them when a test starts.
 */
export const SEEN_MAX = 400

/** FNV-1a hash of the question id in base 36 (at most 7 characters). */
export function seenKey(id: string): string {
  let h = 0x811C9DC5
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(36)
}

/** Reads the comma list the browser sends; ignores anything that is not a key. */
export function parseSeen(v: unknown): Set<string> {
  if (typeof v !== 'string' || !v) return new Set()
  return new Set(v.split(',').slice(-SEEN_MAX).filter(k => /^[0-9a-z]{1,7}$/.test(k)))
}
