import { QUESTIONS } from '../data/questions'
import type { Level } from '#shared/types/quiz'
import { LEVELS } from '#shared/types/quiz'

/** How many questions a test at each level will have. */
export default defineEventHandler(() => {
  return Object.fromEntries(
    LEVELS.map(l => [l, Math.min(QUESTIONS_PER_TEST, QUESTIONS.filter(q => q.level === l).length)]),
  ) as Record<Level, number>
})
