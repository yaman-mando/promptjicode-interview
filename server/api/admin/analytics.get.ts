const TZ_OFFSET = 3 * 3600_000 // Türkiye time, UTC+3 all year
const RANGES = [1, 7, 30, 90] as const

type Row = Record<string, string | number | null>

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = useDB(event)
  const q = getQuery(event)
  const days = RANGES.includes(Number(q.days) as never) ? Number(q.days) : 7
  const now = Date.now()
  // "1 day" means today since local midnight
  const todayStart = Math.floor((now + TZ_OFFSET) / 86400_000) * 86400_000 - TZ_OFFSET
  const from = todayStart - (days - 1) * 86400_000

  // Which site to show: this app, promptjicode.com, or only sessions that opened Yaman's page
  const scope = q.scope === 'main' || q.scope === 'yaman' ? q.scope : 'interview'
  const S = scope === 'interview'
    ? `site = 'interview'`
    : scope === 'main'
      ? `site = 'main'`
      : `site = 'main' AND id IN (SELECT session FROM events WHERE type = 'pageview' AND path LIKE '%/yaman%')`
  const inScope = `session IN (SELECT id FROM sessions WHERE ${S})`

  const group = (col: string, limit = 12) =>
    db.prepare(`SELECT COALESCE(${col}, '') AS k, COUNT(*) AS sessions, COUNT(DISTINCT visitor) AS visitors,
                       SUM(CASE WHEN quiz_started > 0 THEN 1 ELSE 0 END) AS started,
                       SUM(CASE WHEN quiz_done > 0 THEN 1 ELSE 0 END) AS done
                  FROM sessions WHERE first_ts >= ? AND ${S} GROUP BY k ORDER BY sessions DESC LIMIT ${limit}`).bind(from)

  const res = await db.batch([
    // 0 summary
    db.prepare(`SELECT COUNT(*) AS sessions, COUNT(DISTINCT visitor) AS visitors, SUM(is_new) AS new_visitors,
                       SUM(pageviews) AS pageviews, AVG(last_ts - first_ts) AS avg_ms,
                       SUM(CASE WHEN pageviews <= 1 AND quiz_started = 0 THEN 1 ELSE 0 END) AS bounced,
                       SUM(CASE WHEN quiz_started > 0 THEN 1 ELSE 0 END) AS s_started,
                       SUM(CASE WHEN quiz_done > 0 THEN 1 ELSE 0 END) AS s_done
                  FROM sessions WHERE first_ts >= ? AND ${S}`).bind(from),
    // 1 online now
    db.prepare(`SELECT COUNT(*) AS n FROM sessions WHERE last_ts >= ? AND ${S}`).bind(now - 2 * 60_000),
    // 2 quiz events per level
    db.prepare(`SELECT level, type, COUNT(*) AS n FROM events
                 WHERE ts >= ? AND ${inScope} AND type IN ('quiz_start', 'quiz_done', 'quiz_leave') GROUP BY level, type`).bind(from),
    // 3 where people stopped
    db.prepare(`SELECT answered, total, COUNT(*) AS n FROM events
                 WHERE ts >= ? AND ${inScope} AND type = 'quiz_leave' GROUP BY answered, total ORDER BY answered`).bind(from),
    // 4..10 breakdowns
    group('country', 30),
    group('city', 12),
    group('device'),
    group('browser'),
    group('os'),
    group('referrer'),
    group('locale'),
    // 11 top pages
    db.prepare(`SELECT path AS k, COUNT(*) AS n FROM events WHERE ts >= ? AND ${inScope} AND type = 'pageview'
                 GROUP BY path ORDER BY n DESC LIMIT 12`).bind(from),
    // 12 daily
    db.prepare(`SELECT CAST((first_ts + ${TZ_OFFSET}) / 86400000 AS INTEGER) AS day, COUNT(*) AS sessions,
                       COUNT(DISTINCT visitor) AS visitors,
                       SUM(CASE WHEN quiz_started > 0 THEN 1 ELSE 0 END) AS started,
                       SUM(CASE WHEN quiz_done > 0 THEN 1 ELSE 0 END) AS done
                  FROM sessions WHERE first_ts >= ? AND ${S} GROUP BY day ORDER BY day`).bind(from),
    // 13 hour of day
    db.prepare(`SELECT CAST(((first_ts + ${TZ_OFFSET}) % 86400000) / 3600000 AS INTEGER) AS hour, COUNT(*) AS n
                  FROM sessions WHERE first_ts >= ? AND ${S} GROUP BY hour`).bind(from),
    // 14 recent sessions
    db.prepare(`SELECT id, first_ts, last_ts, country, city, device, browser, os, referrer, landing, locale,
                       pageviews, is_new, quiz_level, quiz_started, quiz_answered, quiz_total, quiz_done, attempt_id
                  FROM sessions WHERE ${S} ORDER BY last_ts DESC LIMIT 40`),
    // 15 utm
    group('utm_source'),
    // 16 clicks (main site: email, WhatsApp, services…)
    db.prepare(`SELECT label AS k, COUNT(*) AS n, COUNT(DISTINCT session) AS sessions FROM events
                 WHERE ts >= ? AND ${inScope} AND type = 'click' GROUP BY label ORDER BY n DESC LIMIT 20`).bind(from),
  ])
  const rows = (i: number) => (res[i]!.results ?? []) as Row[]

  const s = rows(0)[0] ?? {}
  const n = (v: unknown) => Number(v ?? 0)

  const levels: Record<string, { started: number, done: number, left: number }> = {}
  for (const r of rows(2)) {
    const l = String(r.level ?? '?')
    levels[l] ??= { started: 0, done: 0, left: 0 }
    if (r.type === 'quiz_start') levels[l].started = n(r.n)
    if (r.type === 'quiz_done') levels[l].done = n(r.n)
    if (r.type === 'quiz_leave') levels[l].left = n(r.n)
  }

  const dayMap = new Map(rows(12).map(r => [n(r.day), r]))
  const firstDay = Math.floor((from + TZ_OFFSET) / 86400_000)
  const hourMap = new Map(rows(13).map(r => [n(r.hour), n(r.n)]))

  const breakdown = (i: number) => rows(i).map(r => ({
    key: String(r.k ?? ''), sessions: n(r.sessions), visitors: n(r.visitors), started: n(r.started), done: n(r.done),
  }))

  return {
    scope,
    clicks: rows(16).map(r => ({ key: String(r.k ?? ''), count: n(r.n), sessions: n(r.sessions) })),
    days,
    from,
    summary: {
      visitors: n(s.visitors),
      newVisitors: n(s.new_visitors),
      sessions: n(s.sessions),
      pageviews: n(s.pageviews),
      avgSeconds: Math.round(n(s.avg_ms) / 1000),
      bounced: n(s.bounced),
      sessionsStarted: n(s.s_started),
      sessionsDone: n(s.s_done),
      online: n(rows(1)[0]?.n),
    },
    quiz: {
      levels,
      stops: rows(3).map(r => ({ answered: n(r.answered), total: n(r.total), count: n(r.n) })),
    },
    countries: breakdown(4),
    cities: breakdown(5),
    devices: breakdown(6),
    browsers: breakdown(7),
    os: breakdown(8),
    referrers: breakdown(9),
    locales: breakdown(10),
    utm: breakdown(15),
    pages: rows(11).map(r => ({ key: String(r.k ?? ''), count: n(r.n) })),
    daily: Array.from({ length: days }, (_, i) => {
      const day = firstDay + i
      const r = dayMap.get(day)
      return {
        date: new Date(day * 86400_000).toISOString().slice(0, 10),
        visitors: n(r?.visitors), sessions: n(r?.sessions), started: n(r?.started), done: n(r?.done),
      }
    }),
    hours: Array.from({ length: 24 }, (_, h) => hourMap.get(h) ?? 0),
    recent: rows(14).map(r => ({
      id: String(r.id), firstTs: n(r.first_ts), lastTs: n(r.last_ts),
      country: r.country as string | null, city: r.city as string | null,
      device: r.device as string | null, browser: r.browser as string | null, os: r.os as string | null,
      referrer: r.referrer as string | null, landing: r.landing as string | null, locale: r.locale as string | null,
      pageviews: n(r.pageviews), isNew: n(r.is_new) === 1,
      quizLevel: r.quiz_level as string | null, quizStarted: n(r.quiz_started), quizAnswered: n(r.quiz_answered),
      quizTotal: n(r.quiz_total), quizDone: n(r.quiz_done), attemptId: r.attempt_id as string | null,
    })),
  }
})
