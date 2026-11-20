import { QUESTIONS } from '../data/questions'
import type { LevelsInfo } from '#shared/types/quiz'
import { LEVELS } from '#shared/types/quiz'

/** Which topics each level has questions for, so the setup screen only offers those. */
export default defineEventHandler((): LevelsInfo => {
  return Object.fromEntries(LEVELS.map((l) => {
    const topics: Record<string, number> = {}
    for (const q of QUESTIONS) if (q.level === l) topics[q.topic] = (topics[q.topic] ?? 0) + 1
    return [l, { topics, total: Object.values(topics).reduce((a, b) => a + b, 0) }]
  })) as LevelsInfo
})
