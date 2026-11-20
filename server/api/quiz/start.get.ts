import type { Mode, StartResponse } from '#shared/types/quiz'
import { TOPICS } from '#shared/types/quiz'

/** Starts a level test. Optional: topics (comma list), count, time (seconds). */
export default defineEventHandler(async (event): Promise<StartResponse> => {
  const query = getQuery(event)
  if (!isLevel(query.level)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown level' })
  }
  const level = query.level
  const locale = toLocale(query.locale)
  let topics = parseTopics(query.topics)
  if (topics.length === TOPICS.length) topics = []
  const count = parseCount(query.count)
  const timeLimit = parseTimeLimit(query.time)

  const picked = pickQuestions(level, count, topics)
  if (!picked.length) throw createError({ statusCode: 400, statusMessage: 'No questions for these topics' })

  // A test is "custom" when the person changed the topics or the length
  const mode: Mode = topics.length || count !== QUESTIONS_PER_TEST ? 'custom' : 'level'
  const startedAt = Date.now()
  const ids = picked.map(q => q.id)

  return {
    mode,
    level,
    topics,
    timeLimit,
    startedAt,
    token: await signTest(event, { mode, level, timeLimit, startedAt, ids }),
    questions: await Promise.all(picked.map(q => toPublicShuffled(event, startedAt, q, locale))),
  }
})
