import { seenKey } from '#shared/seen'
/// <reference types="@cloudflare/workers-types" />
import type { H3Event } from 'h3'
import { QUESTIONS } from '../data/questions'
import type { Level, Locale, Mode, OpenState, PublicQuestion, Question, Topic, Track } from '#shared/types/quiz'
import { LEVELS, LOCALES, MAX_TIME_LIMIT_MIN, QUESTION_COUNTS, TOPICS } from '#shared/types/quiz'

export const QUESTIONS_PER_TEST = 10
const BY_ID = new Map(QUESTIONS.map(q => [q.id, q]))

export function isLevel(v: unknown): v is Level {
  return typeof v === 'string' && (LEVELS as string[]).includes(v)
}

export function isMode(v: unknown): v is Mode {
  return v === 'level' || v === 'custom' || v === 'open'
}

/** Comma list or array of topics → known topics only, no duplicates. */
export function parseTopics(v: unknown): Topic[] {
  const list = Array.isArray(v) ? v : typeof v === 'string' ? v.split(',') : []
  return TOPICS.filter(t => list.includes(t))
}

export function parseCount(v: unknown): number {
  const n = Number(v)
  return (QUESTION_COUNTS as readonly number[]).includes(n) ? n : QUESTIONS_PER_TEST
}

/** Seconds, rounded to whole minutes, 0 = none. */
export function parseTimeLimit(v: unknown): number {
  const min = Math.round(Number(v) / 60)
  return Number.isFinite(min) && min > 0 ? Math.min(min, MAX_TIME_LIMIT_MIN) * 60 : 0
}

export function toLocale(v: unknown): Locale {
  return typeof v === 'string' && (LOCALES as string[]).includes(v) ? (v as Locale) : 'en'
}

export function getQuestion(id: string): Question | undefined {
  return BY_ID.get(id)
}

export function optionsFor(q: Question, locale: Locale): string[] {
  return q.text[locale].options ?? q.options ?? []
}

/**
 * Options are shown in a shuffled order so the right answer is not always in the same place.
 * `order[shown] = original index`. Answers are stored and reviewed in the original order.
 */
export function toPublic(q: Question, locale: Locale, order?: number[]): PublicQuestion {
  const options = optionsFor(q, locale)
  return {
    id: q.id,
    topic: q.topic,
    codeLang: q.codeLang,
    code: q.code,
    prompt: q.text[locale].prompt,
    options: order ? order.map(i => options[i]!) : options,
  }
}

/** Stable shuffled order for one question in one test: derived from the secret, so it can be rebuilt at grading. */
export async function optionOrder(event: H3Event, testSeed: string | number, q: Question): Promise<number[]> {
  const n = optionsFor(q, 'en').length
  const hex = await sign(event, `order|${testSeed}|${q.id}`)
  const order = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Number.parseInt(hex.slice(i * 4, i * 4 + 4), 16) % (i + 1)
    ;[order[i], order[j]] = [order[j]!, order[i]!]
  }
  return order
}

/** Shown position → original option index (null when skipped or out of range). */
export async function toOriginal(event: H3Event, testSeed: string | number, q: Question, shown: unknown): Promise<number | null> {
  const order = await optionOrder(event, testSeed, q)
  return Number.isInteger(shown) && (shown as number) >= 0 && (shown as number) < order.length ? order[shown as number]! : null
}

export async function toPublicShuffled(event: H3Event, testSeed: string | number, q: Question, locale: Locale) {
  return toPublic(q, locale, await optionOrder(event, testSeed, q))
}

function shuffle<T>(list: T[]): T[] {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j]!, list[i]!]
  }
  return list
}

/**
 * Random pick of questions for one level, optionally limited to some topics.
 * With several topics, questions are spread across them as evenly as the bank allows.
 */
export function pickQuestions(level: Level, count = QUESTIONS_PER_TEST, topics: Topic[] = [], seen: Set<string> = new Set()): Question[] {
  const all = shuffle(QUESTIONS.filter(q => q.level === level && (!topics.length || topics.includes(q.topic))))
  // Questions this visitor has not seen go last, so pop() and slice(-n) reach them first
  const isNew = (q: Question) => !seen.has(seenKey(q.id))
  const pool = [...all.filter(q => !isNew(q)), ...all.filter(isNew)]
  if (topics.length < 2) return shuffle(pool.slice(-count))
  // Round-robin over topics so one big topic does not crowd out the others
  const byTopic = topics.map(t => pool.filter(q => q.topic === t)).filter(l => l.length)
  const picked: Question[] = []
  while (picked.length < count && byTopic.some(l => l.length)) {
    for (const l of shuffle(byTopic)) {
      const q = l.pop()
      if (q && picked.length < count) picked.push(q)
    }
  }
  return shuffle(picked)
}

// ── Open test: a staircase across levels ──

/** Correct answer → next question one level up, wrong or skipped → one level down. Starts at Mid. */
export function nextOpenLevel(state: OpenState): Level {
  if (!state.ids.length) return 'mid'
  const lastId = state.ids.at(-1)!
  const last = getQuestion(lastId)!
  const i = LEVELS.indexOf(last.level)
  const correct = state.answers.at(-1) === last.answer
  return LEVELS[Math.max(0, Math.min(LEVELS.length - 1, i + (correct ? 1 : -1)))]!
}

/** A question at that level not asked yet, preferring a topic different from the last few. */
export function pickOpenQuestion(level: Level, askedIds: string[], topics: Topic[], seen: Set<string> = new Set()): Question | undefined {
  const asked = new Set(askedIds)
  const recentTopics = askedIds.slice(-3).map(id => getQuestion(id)?.topic)
  const fresh = (l: Level) => shuffle(QUESTIONS.filter(q => q.level === l && !asked.has(q.id) && topics.includes(q.topic)))
  // Fall back to the nearest level if this one ran out
  const order = [level, ...LEVELS.filter(l => l !== level).sort((a, b) =>
    Math.abs(LEVELS.indexOf(a) - LEVELS.indexOf(level)) - Math.abs(LEVELS.indexOf(b) - LEVELS.indexOf(level)))]
  for (const l of order) {
    const all = fresh(l)
    // Prefer questions this visitor has not seen in earlier tests
    const unseen = all.filter(q => !seen.has(seenKey(q.id)))
    const pool = unseen.length ? unseen : all
    if (pool.length) return pool.find(q => !recentTopics.includes(q.topic)) ?? pool[0]
  }
  return undefined
}

const WEIGHT: Record<Level, number> = { junior: 1, mid: 2, senior: 3 }

/** Grade an open test: score, a 0–1 ratio that rewards harder questions, and the estimated level. */
export function gradeOpen(state: OpenState) {
  const per: Record<Level, { correct: number, total: number }> = {
    junior: { correct: 0, total: 0 }, mid: { correct: 0, total: 0 }, senior: { correct: 0, total: 0 },
  }
  let score = 0
  let points = 0
  state.ids.forEach((id, i) => {
    const q = getQuestion(id)
    if (!q) return
    per[q.level].total++
    if (state.answers[i] === q.answer) {
      per[q.level].correct++
      score++
      points += WEIGHT[q.level]
    }
  })
  const total = state.ids.length
  const acc = (l: Level) => (per[l].total ? per[l].correct / per[l].total : 0)
  // At least 3 questions and 60 % right at a level to be placed there
  const estimate: Level = per.senior.total >= 3 && acc('senior') >= 0.6
    ? 'senior'
    : (per.mid.total >= 3 && acc('mid') >= 0.6) || (per.senior.total >= 3 && acc('senior') >= 0.4)
        ? 'mid'
        : 'junior'
  return { score, total, ratio: total ? points / (3 * total) : 0, estimate, per }
}

// ── Signed token: stops people from submitting question sets they invented ──

async function hmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data))
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('')
}

export interface TestSeal {
  track: Track
  mode: Mode
  level: Level
  timeLimit: number
  startedAt: number
  ids: string[]
}

function tokenPayload(t: TestSeal) {
  return `${t.track}|${t.mode}|${t.level}|${t.timeLimit}|${t.startedAt}|${t.ids.join(',')}`
}

async function sign(event: H3Event, payload: string) {
  const { quizSecret } = useRuntimeConfig(event)
  return hmac(quizSecret, payload)
}

function sameString(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export const signTest = (event: H3Event, t: TestSeal) => sign(event, tokenPayload(t))
export const verifyTest = async (event: H3Event, t: TestSeal, token: string) => sameString(await signTest(event, t), token)

// The open test signs its whole state, so answers given so far cannot be changed
const openPayload = (s: OpenState) => `open|${s.track}|${s.startedAt}|${s.timeLimit}|${s.ids.join(',')}|${s.answers.map(a => a ?? '-').join(',')}`
export const signOpen = (event: H3Event, s: OpenState) => sign(event, openPayload(s))
export const verifyOpen = async (event: H3Event, s: OpenState, token: string) => sameString(await signOpen(event, s), token)

// ── Database ──

export function useDB(event: H3Event): D1Database {
  const db = event.context.cloudflare?.env?.DB as D1Database | undefined
  if (!db) throw createError({ statusCode: 500, statusMessage: 'Database binding DB is missing' })
  return db
}
