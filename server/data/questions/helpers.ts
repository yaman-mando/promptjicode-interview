import type { Level, Locale, Question, Topic } from '#shared/types/quiz'

type L<T = string> = Record<Locale, T>

/** Common prompts, so each question only writes what is special about it. */
export const WHAT_LOGS: L = {
  ar: 'ماذا يُطبع؟',
  en: 'What gets logged?',
  tr: 'Konsola ne yazılır?',
}
export const WHAT_ORDER: L = {
  ar: 'ما ترتيب الطباعة؟',
  en: 'In what order are things logged?',
  tr: 'Konsola hangi sırayla yazılır?',
}

interface OutputSpec {
  id: string
  level: Level
  topic: Topic
  code: string
  /** Language-neutral options (code, values). */
  options: string[]
  answer: number
  why: L
  prompt?: L
  codeLang?: Question['codeLang']
  run?: boolean
}

/** "What does this code print?" question. */
export function output(s: OutputSpec): Question {
  const prompt = s.prompt ?? WHAT_LOGS
  return {
    id: s.id,
    level: s.level,
    topic: s.topic,
    codeLang: s.codeLang ?? 'js',
    code: s.code,
    options: s.options,
    answer: s.answer,
    run: s.run,
    text: {
      ar: { prompt: prompt.ar, explanation: s.why.ar },
      en: { prompt: prompt.en, explanation: s.why.en },
      tr: { prompt: prompt.tr, explanation: s.why.tr },
    },
  }
}

interface ChoiceSpec {
  id: string
  level: Level
  topic: Topic
  prompt: L
  /** Either one set of options for all languages, or one per language. */
  options: string[] | L<string[]>
  answer: number
  why: L
  code?: string
  codeLang?: Question['codeLang']
  run?: boolean
}

/** Concept question, with or without code. */
export function choice(s: ChoiceSpec): Question {
  const shared = Array.isArray(s.options) ? s.options : undefined
  const per = Array.isArray(s.options) ? undefined : s.options
  const text = (l: Locale) => ({ prompt: s.prompt[l], explanation: s.why[l], ...(per ? { options: per[l] } : {}) })
  return {
    id: s.id,
    level: s.level,
    topic: s.topic,
    codeLang: s.code ? (s.codeLang ?? 'js') : undefined,
    code: s.code,
    options: shared,
    answer: s.answer,
    run: s.run ?? false,
    text: { ar: text('ar'), en: text('en'), tr: text('tr') },
  }
}
