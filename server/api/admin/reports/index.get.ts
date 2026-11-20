import { QUESTIONS } from '../../../data/questions'

interface Row { id: number, created_at: number, question_id: string, type: string, note: string | null, name: string | null, locale: string | null, track: string | null, status: string }

/** Reports for the admin, newest first, with the question text in Arabic for context. */
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const status = getQuery(event).status === 'done' ? 'done' : 'new'
  const db = useDB(event)
  const [rows, counts] = await db.batch([
    db.prepare(`SELECT * FROM reports WHERE status = ? ORDER BY created_at DESC LIMIT 200`).bind(status),
    db.prepare(`SELECT status, COUNT(*) AS n FROM reports GROUP BY status`),
  ])
  const byId = new Map(QUESTIONS.map(q => [q.id, q]))
  const n = Object.fromEntries(((counts!.results ?? []) as { status: string, n: number }[]).map(r => [r.status, r.n]))
  return {
    counts: { new: n.new ?? 0, done: n.done ?? 0 },
    reports: ((rows!.results ?? []) as Row[]).map((r) => {
      const q = byId.get(r.question_id)
      return {
        id: r.id, createdAt: r.created_at, questionId: r.question_id, type: r.type, note: r.note, name: r.name,
        locale: r.locale, track: r.track, status: r.status,
        level: q?.level ?? null, topic: q?.topic ?? null,
        prompt: q ? q.text[(r.locale as 'ar' | 'en' | 'tr') ?? 'ar']?.prompt ?? q.text.ar.prompt : null,
      }
    }),
  }
})
