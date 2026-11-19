export type Level = 'junior' | 'mid' | 'senior'
export type Locale = 'ar' | 'en' | 'tr'
export type Topic =
  | 'javascript' | 'async' | 'css' | 'html' | 'react' | 'vue'
  | 'typescript' | 'browser' | 'performance' | 'security'

export const LEVELS: Level[] = ['junior', 'mid', 'senior']
export const LOCALES: Locale[] = ['ar', 'en', 'tr']

/** Text for one language. `options` is only set when the options themselves need translating. */
export interface QuestionText {
  prompt: string
  explanation: string
  options?: string[]
}

/** Full question, server-only: it contains the answer. */
export interface Question {
  id: string
  level: Level
  topic: Topic
  /** Language of the code block, for the label above it. */
  codeLang?: 'js' | 'jsx' | 'css' | 'html'
  code?: string
  /** Language-neutral options (code, numbers). Overridden by text[locale].options when present. */
  options?: string[]
  answer: number
  text: Record<Locale, QuestionText>
  /** Verifier only: false when the code cannot run in Node as-is (fetch, DOM, JSX…). */
  run?: boolean
}

/** What the browser gets during the test: no answer, no explanation. */
export interface PublicQuestion {
  id: string
  topic: Topic
  codeLang?: Question['codeLang']
  code?: string
  prompt: string
  options: string[]
}

export interface StartResponse {
  level: Level
  startedAt: number
  token: string
  questions: PublicQuestion[]
}

export interface SubmitBody {
  level: Level
  locale: Locale
  startedAt: number
  token: string
  questionIds: string[]
  answers: (number | null)[]
}

export interface ReviewItem extends PublicQuestion {
  chosen: number | null
  answer: number
  correct: boolean
  explanation: string
}

export interface TopicScore {
  topic: Topic
  correct: number
  total: number
}

export interface ResultResponse {
  id: string
  level: Level
  score: number
  total: number
  durationMs: number
  createdAt: number
  /** Share of people at the same level who scored lower (0–100). null until enough people took it. */
  percentile: number | null
  sameLevelCount: number
  topics: TopicScore[]
  review: ReviewItem[]
}
