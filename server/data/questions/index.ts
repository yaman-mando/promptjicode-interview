import type { Question } from '#shared/types/quiz'
import { LEGACY } from './_legacy'
import { JUNIOR } from './junior'
import { MID } from './mid'
import { SENIOR } from './senior'

/**
 * Question bank. Server-only: answers never reach the browser before the test is submitted.
 * Arabic is neutral written Arabic (not dialect), matching the channel's on-screen text.
 * Run `npm run verify` after adding questions.
 */
export const QUESTIONS: Question[] = [...LEGACY, ...JUNIOR, ...MID, ...SENIOR]
