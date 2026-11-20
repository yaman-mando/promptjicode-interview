import { isTrack } from '#shared/types/quiz'
import type { SubmitBody } from '#shared/types/quiz'

const MAX_TEST_AGE_MS = 2 * 60 * 60 * 1000 // a test can be submitted up to 2 hours after it started

export default defineEventHandler(async (event) => {
  const body = await readBody<SubmitBody>(event)

  if (!body || !isLevel(body.level) || !isMode(body.mode) || body.mode === 'open' || !isTrack(body.track)
    || !Array.isArray(body.questionIds) || !Array.isArray(body.answers)
    || body.questionIds.length === 0 || body.questionIds.length !== body.answers.length
    || typeof body.startedAt !== 'number' || typeof body.token !== 'string' || typeof body.timeLimit !== 'number') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid submission' })
  }

  const now = Date.now()
  if (body.startedAt > now || now - body.startedAt > MAX_TEST_AGE_MS) {
    throw createError({ statusCode: 400, statusMessage: 'Test expired' })
  }
  const seal = { track: body.track, mode: body.mode, level: body.level, timeLimit: body.timeLimit, startedAt: body.startedAt, ids: body.questionIds }
  if (!(await verifyTest(event, seal, body.token))) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid test token' })
  }

  // Grade on the server
  let score = 0
  const topics = new Set<string>()
  const answers = await Promise.all(body.questionIds.map(async (id, i) => {
    const q = getQuestion(id)
    if (!q) throw createError({ statusCode: 400, statusMessage: 'Unknown question' })
    topics.add(q.topic)
    // The browser answers by shown position; turn it back into the original option
    const chosen = await toOriginal(event, body.startedAt, q, body.answers[i])
    if (chosen === q.answer) score++
    return chosen
  }))

  const total = body.questionIds.length
  return saveAttempt(event, {
    track: body.track,
    mode: body.mode,
    level: body.level,
    locale: toLocale(body.locale),
    score,
    total,
    ratio: score / total,
    durationMs: now - body.startedAt,
    ids: body.questionIds,
    answers,
    token: body.token,
    timeLimit: body.timeLimit,
    topics: body.mode === 'custom' ? [...topics] : null,
    estimate: null,
    name: cleanName(body.name),
  })
})
