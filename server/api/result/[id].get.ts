import type { Level, ResultResponse, Topic, TopicScore } from '#shared/types/quiz'

/** Below this many attempts at a level, a percentile would mean little, so none is shown. */
const MIN_FOR_PERCENTILE = 5

interface AttemptRow {
  id: string
  level: Level
  score: number
  total: number
  ratio: number
  duration_ms: number
  question_ids: string
  answers: string
  created_at: number
}

export default defineEventHandler(async (event): Promise<ResultResponse> => {
  const id = getRouterParam(event, 'id') ?? ''
  if (!/^[a-f0-9]{12}$/.test(id)) throw createError({ statusCode: 404, statusMessage: 'Not found' })

  const locale = toLocale(getQuery(event).locale)
  const db = useDB(event)

  const row = await db.prepare('SELECT * FROM attempts WHERE id = ?').bind(id).first<AttemptRow>()
  if (!row) throw createError({ statusCode: 404, statusMessage: 'Not found' })

  const stats = await db.prepare(
    `SELECT COUNT(*) AS n,
            SUM(CASE WHEN ratio < ? THEN 1 ELSE 0 END) AS below,
            SUM(CASE WHEN ratio = ? THEN 1 ELSE 0 END) AS equal
       FROM attempts WHERE level = ?`,
  ).bind(row.ratio, row.ratio, row.level).first<{ n: number, below: number, equal: number }>()

  const n = stats?.n ?? 0
  // Mid-rank percentile: people below, plus half of the people with the same score (excluding this attempt)
  const percentile = n >= MIN_FOR_PERCENTILE
    ? Math.round(((stats!.below + Math.max(0, stats!.equal - 1) / 2) / (n - 1)) * 100)
    : null

  const ids: string[] = JSON.parse(row.question_ids)
  const chosenList: (number | null)[] = JSON.parse(row.answers)

  const topicMap = new Map<Topic, TopicScore>()
  const review = ids.flatMap((qid, i) => {
    const q = getQuestion(qid)
    if (!q) return [] // question removed from the bank since
    const chosen = chosenList[i] ?? null
    const correct = chosen === q.answer
    const t = topicMap.get(q.topic) ?? { topic: q.topic, correct: 0, total: 0 }
    t.total++
    if (correct) t.correct++
    topicMap.set(q.topic, t)
    return [{
      ...toPublic(q, locale),
      chosen,
      answer: q.answer,
      correct,
      explanation: q.text[locale].explanation,
    }]
  })

  return {
    id: row.id,
    level: row.level,
    score: row.score,
    total: row.total,
    durationMs: row.duration_ms,
    createdAt: row.created_at,
    percentile,
    sameLevelCount: n,
    topics: [...topicMap.values()].sort((a, b) => a.correct / a.total - b.correct / b.total),
    review,
  }
})
