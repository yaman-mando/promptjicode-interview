import type { OpenAnswerBody, OpenState, OpenStep } from '#shared/types/quiz'
import { OPEN_TEST_LENGTH } from '#shared/types/quiz'

const MAX_TEST_AGE_MS = 2 * 60 * 60 * 1000

/**
 * Takes the answer to the current question and returns the next one,
 * or saves the test and returns its id when it is over.
 */
export default defineEventHandler(async (event): Promise<OpenStep | { id: string }> => {
  const body = await readBody<OpenAnswerBody>(event)
  const s = body?.state
  if (!s || typeof s.startedAt !== 'number' || typeof s.timeLimit !== 'number' || !Array.isArray(s.ids) || !Array.isArray(s.answers)
    || s.ids.length !== s.answers.length + 1 || s.ids.length > OPEN_TEST_LENGTH || typeof body.token !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid state' })
  }
  const now = Date.now()
  if (s.startedAt > now || now - s.startedAt > MAX_TEST_AGE_MS) {
    throw createError({ statusCode: 400, statusMessage: 'Test expired' })
  }
  if (!(await verifyOpen(event, s, body.token))) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid test token' })
  }

  const locale = toLocale(body.locale)
  const current = getQuestion(s.ids.at(-1)!)
  if (!current) throw createError({ statusCode: 400, statusMessage: 'Unknown question' })
  const chosen = await toOriginal(event, s.startedAt, current, body.answer)
  const answered: OpenState = { ...s, answers: [...s.answers, chosen] }

  const next = answered.ids.length < OPEN_TEST_LENGTH && !body.finish
    ? pickOpenQuestion(nextOpenLevel(answered), answered.ids)
    : undefined

  if (!next) {
    const g = gradeOpen(answered)
    return saveAttempt(event, {
      mode: 'open',
      level: g.estimate,
      locale,
      score: g.score,
      total: g.total,
      ratio: g.ratio,
      durationMs: now - s.startedAt,
      ids: answered.ids,
      answers: answered.answers,
      token: await signOpen(event, answered),
      timeLimit: s.timeLimit,
      topics: null,
      estimate: g.estimate,
      name: cleanName(body.name),
    })
  }

  const state: OpenState = { ...answered, ids: [...answered.ids, next.id] }
  return { state, token: await signOpen(event, state), index: state.ids.length - 1, total: OPEN_TEST_LENGTH, question: await toPublicShuffled(event, state.startedAt, next, locale) }
})
