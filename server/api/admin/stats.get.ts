import type { Level } from '#shared/types/quiz'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = useDB(event)
  const now = Date.now()
  const weekAgo = now - 7 * 86400_000
  const twoWeeksAgo = now - 14 * 86400_000

  const [totals, byLevel, byLocale, daily, recent] = await db.batch([
    db.prepare(`SELECT COUNT(*) AS total,
                       SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) AS week,
                       AVG(ratio) AS avg_ratio,
                       AVG(duration_ms) AS avg_ms
                  FROM attempts`).bind(weekAgo),
    // Open tests are their own group; custom tests count with their level
    db.prepare(`SELECT CASE WHEN mode = 'open' THEN 'open' ELSE level END AS level, COUNT(*) AS n, AVG(ratio) AS avg_ratio
                  FROM attempts GROUP BY 1`),
    db.prepare(`SELECT locale, COUNT(*) AS n FROM attempts GROUP BY locale`),
    // Day buckets in UTC
    db.prepare(`SELECT CAST(created_at / 86400000 AS INTEGER) AS day, COUNT(*) AS n
                  FROM attempts WHERE created_at >= ? GROUP BY day ORDER BY day`).bind(twoWeeksAgo),
    db.prepare(`SELECT id, mode, level, locale, score, total, duration_ms, created_at, time_limit
                  FROM attempts ORDER BY created_at DESC LIMIT 15`),
  ])

  const t = (totals!.results[0] ?? {}) as Record<string, number | null>
  const dayMap = new Map((daily!.results as { day: number, n: number }[]).map(r => [r.day, r.n]))
  const today = Math.floor(now / 86400_000)

  return {
    total: t.total ?? 0,
    week: t.week ?? 0,
    avgPct: t.avg_ratio == null ? null : Math.round(t.avg_ratio * 100),
    avgSeconds: t.avg_ms == null ? null : Math.round(t.avg_ms / 1000),
    byLevel: (byLevel!.results as { level: Level, n: number, avg_ratio: number }[])
      .map(r => ({ level: r.level, count: r.n, avgPct: Math.round(r.avg_ratio * 100) })),
    byLocale: byLocale!.results as { locale: string, n: number }[],
    daily: Array.from({ length: 14 }, (_, i) => {
      const day = today - 13 + i
      return { date: new Date(day * 86400_000).toISOString().slice(0, 10), count: dayMap.get(day) ?? 0 }
    }),
    recent: recent!.results as { id: string, mode: string, time_limit: number, level: Level, locale: string, score: number, total: number, duration_ms: number, created_at: number }[],
  }
})
