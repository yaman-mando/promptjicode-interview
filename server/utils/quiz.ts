/// <reference types="@cloudflare/workers-types" />
import type { H3Event } from 'h3'
import { QUESTIONS } from '../data/questions'
import type { Level, Locale, PublicQuestion, Question } from '#shared/types/quiz'
import { LEVELS, LOCALES } from '#shared/types/quiz'

export const QUESTIONS_PER_TEST = 10
const BY_ID = new Map(QUESTIONS.map(q => [q.id, q]))

export function isLevel(v: unknown): v is Level {
  return typeof v === 'string' && (LEVELS as string[]).includes(v)
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

export function toPublic(q: Question, locale: Locale): PublicQuestion {
  return {
    id: q.id,
    topic: q.topic,
    codeLang: q.codeLang,
    code: q.code,
    prompt: q.text[locale].prompt,
    options: optionsFor(q, locale),
  }
}

/** Random pick of questions for one level. */
export function pickQuestions(level: Level, count = QUESTIONS_PER_TEST): Question[] {
  const pool = QUESTIONS.filter(q => q.level === level)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j]!, pool[i]!]
  }
  return pool.slice(0, count)
}

// ── Signed token: stops people from submitting question sets they invented ──

async function hmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data))
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('')
}

function tokenPayload(level: Level, startedAt: number, ids: string[]) {
  return `${level}|${startedAt}|${ids.join(',')}`
}

export async function signTest(event: H3Event, level: Level, startedAt: number, ids: string[]) {
  const { quizSecret } = useRuntimeConfig(event)
  return hmac(quizSecret, tokenPayload(level, startedAt, ids))
}

export async function verifyTest(event: H3Event, level: Level, startedAt: number, ids: string[], token: string) {
  const expected = await signTest(event, level, startedAt, ids)
  if (expected.length !== token.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ token.charCodeAt(i)
  return diff === 0
}

// ── Database ──

export function useDB(event: H3Event): D1Database {
  const db = event.context.cloudflare?.env?.DB as D1Database | undefined
  if (!db) throw createError({ statusCode: 500, statusMessage: 'Database binding DB is missing' })
  return db
}
