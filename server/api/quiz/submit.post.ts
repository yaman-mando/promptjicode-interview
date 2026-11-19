import type { SubmitBody } from '#shared/types/quiz'

const MAX_TEST_AGE_MS = 2 * 60 * 60 * 1000 // a test can be submitted up to 2 hours after it started

export default defineEventHandler(async (event) => {
  const body = await readBody<SubmitBody>(event)

  if (!body || !isLevel(body.level) || !Array.isArray(body.questionIds) || !Array.isArray(body.answers)
    || body.questionIds.length === 0 || body.questionIds.length !== body.answers.length
    || typeof body.startedAt !== 'number' || typeof body.token !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid submission' })
  }

  const now = Date.now()
  if (body.startedAt > now || now - body.startedAt > MAX_TEST_AGE_MS) {
    throw createError({ statusCode: 400, statusMessage: 'Test expired' })
  }
  if (!(await verifyTest(event, body.level, body.startedAt, body.questionIds, body.token))) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid test token' })
  }

  // Grade on the server
  let score = 0
  const answers = body.questionIds.map((id, i) => {
    const q = getQuestion(id)
    if (!q) throw createError({ statusCode: 400, statusMessage: 'Unknown question' })
    const a = body.answers[i]
    const chosen = Number.isInteger(a) && a! >= 0 && a! < optionsFor(q, 'en').length ? a! : null
    if (chosen === q.answer) score++
    return chosen
  })

  const total = body.questionIds.length
  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 12)
  const db = useDB(event)

  // The token is unique per test, so the same test can only be saved once
  const existing = await db.prepare('SELECT id FROM attempts WHERE token = ?').bind(body.token).first<{ id: string }>()
  if (existing) return { id: existing.id }

  await db.prepare(
    `INSERT INTO attempts (id, mode, level, locale, score, total, ratio, duration_ms, question_ids, answers, token, created_at)
     VALUES (?, 'level', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).bind(
    id, body.level, toLocale(body.locale), score, total, score / total,
    now - body.startedAt, JSON.stringify(body.questionIds), JSON.stringify(answers), body.token, now,
  ).run()

  return { id }
})
