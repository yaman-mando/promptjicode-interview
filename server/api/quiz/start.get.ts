import type { StartResponse } from '#shared/types/quiz'

export default defineEventHandler(async (event): Promise<StartResponse> => {
  const query = getQuery(event)
  if (!isLevel(query.level)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown level' })
  }
  const level = query.level
  const locale = toLocale(query.locale)

  const picked = pickQuestions(level)
  const startedAt = Date.now()
  const ids = picked.map(q => q.id)

  return {
    level,
    startedAt,
    token: await signTest(event, level, startedAt, ids),
    questions: picked.map(q => toPublic(q, locale)),
  }
})
