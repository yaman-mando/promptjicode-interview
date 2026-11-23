import type { H3Event } from 'h3'

/**
 * How many questions one device may receive. A real person rarely does more than a few tests an hour
 * (a test is 5 to 20 questions; the open test counts as 15). A script that pulls tests in a loop
 * hits the hourly cap within minutes and the daily cap soon after.
 */
export const QUESTIONS_PER_HOUR = 200
export const QUESTIONS_PER_DAY = 600

const HOUR = 3600_000
const DAY = 24 * HOUR

/**
 * Counts `n` questions against this device and throws 429 once it is over the limit.
 * The device is an HMAC of its IP and today's date: no IP is stored, and keys can't be linked across days.
 * The site owner, when signed in to /admin, is never limited.
 */
export async function limitQuestions(event: H3Event, n: number) {
  if (await isAdmin(event)) return
  const ip = getRequestHeader(event, 'cf-connecting-ip')
  if (!ip) return // local dev

  const now = Date.now()
  const hour = Math.floor(now / HOUR)
  const day = Math.floor(now / DAY)
  const { quizSecret } = useRuntimeConfig(event)
  const key = (await hmac(quizSecret, `rate|${day}|${ip}`)).slice(0, 24)

  let perHour = 0
  let perDay = 0
  try {
    const db = useDB(event)
    const upsert = `INSERT INTO rate_limits (key, bucket, count, expires) VALUES (?, ?, ?, ?)
      ON CONFLICT (key, bucket) DO UPDATE SET count = count + excluded.count RETURNING count`
    const [h, d] = await db.batch<{ count: number }>([
      db.prepare(upsert).bind(key, `h:${hour}`, n, (hour + 2) * HOUR),
      db.prepare(upsert).bind(key, `d:${day}`, n, (day + 2) * DAY),
    ])
    perHour = h?.results[0]?.count ?? 0
    perDay = d?.results[0]?.count ?? 0
    // Now and then, drop rows nobody needs any more
    if (Math.random() < 0.02) await db.prepare('DELETE FROM rate_limits WHERE expires < ?').bind(now).run()
  }
  catch (e) {
    // A database problem must never block a real person from taking a test
    console.error('[limit]', e)
    return
  }

  const overDay = perDay > QUESTIONS_PER_DAY
  if (!overDay && perHour <= QUESTIONS_PER_HOUR) return

  const until = overDay ? (day + 1) * DAY : (hour + 1) * HOUR
  const retryAfter = Math.ceil((until - now) / 1000)
  setResponseHeader(event, 'Retry-After', String(retryAfter))
  throw createError({ statusCode: 429, statusMessage: 'Too many tests', data: { reason: 'rate_limited', retryAfter } })
}
