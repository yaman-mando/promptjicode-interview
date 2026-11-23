import type { Mode, StartResponse } from '#shared/types/quiz'
import { TRACKS, isTrack, trackTopics } from '#shared/types/quiz'
import { parseSeen } from '#shared/seen'

/** Starts a level test. Query: track, level, locale, topics (comma list), count, time (seconds), seen (keys of questions already seen). */
export default defineEventHandler(async (event): Promise<StartResponse> => {
  const query = getQuery(event)
  if (!isLevel(query.level)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown level' })
  }
  const track = isTrack(query.track) ? query.track : 'frontend'
  const level = query.level
  const locale = toLocale(query.locale)
  const core = TRACKS[track].core
  // Only topics that belong to this track; none chosen means the track's core topics
  let topics = parseTopics(query.topics).filter(t => trackTopics(track).includes(t))
  const isDefault = !topics.length || (topics.length === core.length && core.every(t => topics.includes(t)))
  if (isDefault) topics = []
  const count = parseCount(query.count)
  const timeLimit = parseTimeLimit(query.time)

  const picked = pickQuestions(level, count, topics.length ? topics : core, parseSeen(query.seen))
  if (!picked.length) throw createError({ statusCode: 400, statusMessage: 'No questions for these topics' })
  await limitQuestions(event, picked.length)

  // A test is "custom" when the person changed the topics or the length
  const mode: Mode = topics.length || count !== QUESTIONS_PER_TEST ? 'custom' : 'level'
  const startedAt = Date.now()
  const ids = picked.map(q => q.id)

  return {
    track,
    mode,
    level,
    topics,
    timeLimit,
    startedAt,
    token: await signTest(event, { track, mode, level, timeLimit, startedAt, ids }),
    questions: await Promise.all(picked.map(q => toPublicShuffled(event, startedAt, q, locale))),
  }
})
