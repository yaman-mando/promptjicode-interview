export type Level = 'junior' | 'mid' | 'senior'
export type Locale = 'ar' | 'en' | 'tr'
export type Topic =
  // frontend
  | 'javascript' | 'async' | 'css' | 'html' | 'react' | 'vue'
  | 'typescript' | 'browser' | 'performance' | 'security' | 'angular'
  // backend
  | 'databases' | 'api' | 'architecture' | 'server-security'
  | 'node' | 'python' | 'php' | 'dotnet'

export const LEVELS: Level[] = ['junior', 'mid', 'senior']
export const TOPICS: Topic[] = [
  'javascript', 'async', 'css', 'html', 'react', 'vue', 'angular', 'typescript', 'browser', 'performance', 'security',
  'databases', 'api', 'architecture', 'server-security', 'node', 'python', 'php', 'dotnet',
]

/**
 * The three main kinds of test. `core` topics make up "all topics";
 * `extra` topics (languages and frameworks) are added only when the person picks them,
 * so a PHP developer does not get C# questions by default.
 */
export type Track = 'frontend' | 'backend' | 'fullstack'
export const TRACK_LIST: Track[] = ['frontend', 'backend', 'fullstack']
export const TRACKS: Record<Track, { core: Topic[], extra: Topic[] }> = {
  frontend: {
    core: ['javascript', 'async', 'css', 'html', 'react', 'vue', 'angular', 'typescript', 'browser', 'performance', 'security'],
    extra: [],
  },
  backend: {
    core: ['databases', 'api', 'architecture', 'server-security'],
    extra: ['node', 'python', 'php', 'dotnet'],
  },
  fullstack: {
    core: ['javascript', 'async', 'html', 'css', 'typescript', 'browser', 'performance', 'security', 'databases', 'api', 'architecture', 'server-security'],
    extra: ['react', 'vue', 'angular', 'node', 'python', 'php', 'dotnet'],
  },
}
export const trackTopics = (t: Track): Topic[] => [...TRACKS[t].core, ...TRACKS[t].extra]
export const isTrack = (v: unknown): v is Track => v === 'frontend' || v === 'backend' || v === 'fullstack'

/** level = fixed test for one level, custom = chosen topics / length, open = adaptive across levels */
export type Mode = 'level' | 'custom' | 'open'
export const QUESTION_COUNTS = [5, 10, 15, 20] as const
export const OPEN_TEST_LENGTH = 15
/** Time limits a test can have, in minutes (0 = none). The page also allows any value up to MAX. */
export const TIME_PRESETS = [0, 5, 10, 15] as const
export const MAX_TIME_LIMIT_MIN = 60
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
  codeLang?: 'js' | 'jsx' | 'ts' | 'vue' | 'css' | 'html' | 'py' | 'php' | 'cs' | 'sql' | 'bash' | 'json' | 'http'
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
  track: Track
  mode: Mode
  level: Level
  topics: Topic[]
  /** seconds, 0 = no limit */
  timeLimit: number
  startedAt: number
  token: string
  questions: PublicQuestion[]
}

export interface SubmitBody {
  track: Track
  mode: Mode
  level: Level
  locale: Locale
  timeLimit: number
  startedAt: number
  token: string
  questionIds: string[]
  answers: (number | null)[]
  /** optional, shown on the result */
  name?: string
}

/** Open test: the state travels with the browser, signed by the server. */
export interface OpenState {
  track: Track
  startedAt: number
  timeLimit: number
  ids: string[]
  answers: (number | null)[]
}

export interface OpenStep {
  state: OpenState
  token: string
  index: number
  total: number
  question: PublicQuestion
}

export interface OpenAnswerBody {
  state: OpenState
  token: string
  locale: Locale
  answer: number | null
  /** true when the time ran out or the user ends the test early */
  finish?: boolean
  name?: string
  /** keys of questions this browser saw in earlier tests */
  seen?: string
}

/** Info for the setup screen: which topics each level has questions for (counts are not shown). */
export type LevelsInfo = Record<Level, { topics: Partial<Record<Topic, number>>, total: number }>

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

export interface LevelScore {
  level: Level
  correct: number
  total: number
}

export interface ResultResponse {
  id: string
  track: Track
  mode: Mode
  /** for open tests: the estimated level */
  level: Level
  /** seconds, 0 = no limit */
  timeLimit: number
  topicsChosen: Topic[]
  /** name the person chose to show, or null */
  name: string | null
  score: number
  total: number
  durationMs: number
  createdAt: number
  /** Share of people at the same level who scored lower (0–100). null until enough people took it. */
  percentile: number | null
  sameLevelCount: number
  topics: TopicScore[]
  /** open tests: how the user did at each level */
  levels: LevelScore[]
  review: ReviewItem[]
}
