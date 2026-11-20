import { hasProfanity } from '#shared/profanity'
import { REPORT_NOTE_MAX, REPORT_TYPES } from '#shared/report'
import { isTrack } from '#shared/types/quiz'

/** A visitor reports a mistake in a question. */
export default defineEventHandler(async (event) => {
  const b = await readBody<Record<string, unknown>>(event).catch(() => null)
  const questionId = typeof b?.questionId === 'string' ? b.questionId.slice(0, 80) : ''
  const type = REPORT_TYPES.includes(b?.type as never) ? (b!.type as string) : null
  if (!getQuestion(questionId) || !type) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid report' })
  }
  const note = typeof b?.note === 'string' ? b.note.replace(/\u0000/g, '').trim().slice(0, REPORT_NOTE_MAX) : ''
  const name = cleanName(b?.name)
  if (hasProfanity(note) || (name && hasProfanity(name))) {
    // The page shows a friendly message for this code
    throw createError({ statusCode: 422, statusMessage: 'profanity' })
  }
  await useDB(event).prepare(
    `INSERT INTO reports (created_at, question_id, type, note, name, locale, track) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).bind(Date.now(), questionId, type, note || null, name, toLocale(b?.locale), isTrack(b?.track) ? b!.track : null).run()
  setResponseStatus(event, 201)
  return { ok: true }
})
