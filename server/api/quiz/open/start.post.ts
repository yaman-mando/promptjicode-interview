import type { OpenState, OpenStep } from '#shared/types/quiz'
import { OPEN_TEST_LENGTH } from '#shared/types/quiz'

/** Starts an open (adaptive) test with one Mid question. */
export default defineEventHandler(async (event): Promise<OpenStep> => {
  const body = await readBody<{ locale?: string, time?: number }>(event).catch(() => ({}))
  const locale = toLocale(body?.locale)
  const q = pickOpenQuestion('mid', [])!
  const state: OpenState = { startedAt: Date.now(), timeLimit: parseTimeLimit(body?.time), ids: [q.id], answers: [] }
  return { state, token: await signOpen(event, state), index: 0, total: OPEN_TEST_LENGTH, question: await toPublicShuffled(event, state.startedAt, q, locale) }
})
