import type { H3Event } from 'h3'
import type { Level, Locale, Mode } from '#shared/types/quiz'

export interface NewAttempt {
  mode: Mode
  level: Level
  locale: Locale
  score: number
  total: number
  ratio: number
  durationMs: number
  ids: string[]
  answers: (number | null)[]
  token: string
  timeLimit: number
  topics: string[] | null
  estimate: Level | null
  name?: string | null
}

/** Trim, drop control characters and angle brackets, max 40 characters. Empty → null. */
export function cleanName(v: unknown): string | null {
  if (typeof v !== 'string') return null
  const s = v.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40)
  return s || null
}

/** Saves a graded test once: the token is unique, so a second submit returns the first id. */
export async function saveAttempt(event: H3Event, a: NewAttempt): Promise<{ id: string }> {
  const db = useDB(event)
  const existing = await db.prepare('SELECT id FROM attempts WHERE token = ?').bind(a.token).first<{ id: string }>()
  if (existing) return { id: existing.id }

  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 12)
  await db.prepare(
    `INSERT INTO attempts (id, mode, level, locale, score, total, ratio, duration_ms, question_ids, answers, token, created_at, time_limit, topics, estimate, name)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    id, a.mode, a.level, a.locale, a.score, a.total, a.ratio, a.durationMs,
    JSON.stringify(a.ids), JSON.stringify(a.answers), a.token, Date.now(),
    a.timeLimit, a.topics ? JSON.stringify(a.topics) : null, a.estimate, a.name ?? null,
  ).run()
  return { id }
}
