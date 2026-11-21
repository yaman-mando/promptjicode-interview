import type { OpenState, OpenStep } from '#shared/types/quiz'
import { OPEN_TEST_LENGTH, TRACKS, isTrack } from '#shared/types/quiz'
import { parseSeen } from '#shared/seen'

/** Starts an open (adaptive) test with one Mid question from the track's core topics. */
export default defineEventHandler(async (event): Promise<OpenStep> => {
  const body = await readBody<{ locale?: string, time?: number, track?: string, seen?: string }>(event).catch(() => ({}))
  const locale = toLocale(body?.locale)
  const track = isTrack(body?.track) ? body.track : 'frontend'
  const q = pickOpenQuestion('mid', [], TRACKS[track].core, parseSeen(body?.seen))!
  const state: OpenState = { track, startedAt: Date.now(), timeLimit: parseTimeLimit(body?.time), ids: [q.id], answers: [] }
  return { state, token: await signOpen(event, state), index: 0, total: OPEN_TEST_LENGTH, question: await toPublicShuffled(event, state.startedAt, q, locale) }
})
