import { QUESTIONS } from '../../data/questions'

/**
 * Full question bank (with answers) plus how each question performs.
 * Stats are computed by scanning all attempts. Fine for thousands of attempts;
 * move to a per-question counter table if it grows much larger.
 */
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = useDB(event)

  const { results } = await db.prepare('SELECT question_ids, answers FROM attempts').all<{ question_ids: string, answers: string }>()

  const stats = new Map<string, { shown: number, correct: number, skipped: number, picks: number[] }>()
  const answerOf = new Map(QUESTIONS.map(q => [q.id, q.answer]))

  for (const row of results) {
    const ids: string[] = JSON.parse(row.question_ids)
    const answers: (number | null)[] = JSON.parse(row.answers)
    ids.forEach((id, i) => {
      const s = stats.get(id) ?? { shown: 0, correct: 0, skipped: 0, picks: [0, 0, 0, 0] }
      const a = answers[i]
      s.shown++
      if (a == null) s.skipped++
      else {
        s.picks[a] = (s.picks[a] ?? 0) + 1
        if (a === answerOf.get(id)) s.correct++
      }
      stats.set(id, s)
    })
  }

  return QUESTIONS.map(q => ({
    ...q,
    stats: stats.get(q.id) ?? { shown: 0, correct: 0, skipped: 0, picks: [0, 0, 0, 0] },
  }))
})
