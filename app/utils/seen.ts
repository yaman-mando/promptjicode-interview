import { SEEN_MAX, seenKey } from '#shared/seen'

const KEY = 'pc_seen_q'

/** Keys of questions this browser has already seen, oldest first. */
export function loadSeen(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(v) ? v.filter(k => typeof k === 'string') : []
  }
  catch { return [] }
}

/** The list as the API expects it. */
export function seenParam(): string {
  return loadSeen().join(',')
}

/** Remembers question ids shown in a test; keeps the most recent SEEN_MAX. */
export function rememberSeen(ids: string[]) {
  try {
    const keys = ids.map(seenKey)
    const list = [...loadSeen().filter(k => !keys.includes(k)), ...keys].slice(-SEEN_MAX)
    localStorage.setItem(KEY, JSON.stringify(list))
  }
  catch { /* storage blocked: retakes just pick at random */ }
}
