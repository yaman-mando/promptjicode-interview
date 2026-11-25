import { LEVELS } from '#shared/types/quiz'

const TYPES = new Set(['pageview', 'heartbeat', 'quiz_start', 'quiz_progress', 'quiz_done', 'quiz_leave', 'click'])
// interview = this app; main = promptjicode.com (channel page and /yaman); menu = menu.promptjicode.com. All post here.
const SITES = new Set(['interview', 'main', 'menu'])
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|facebookexternalhit|whatsapp|telegram|curl|wget|python|axios/i

const str = (v: unknown, max: number) => (typeof v === 'string' && v ? v.slice(0, max) : null)
const int = (v: unknown) => (Number.isFinite(Number(v)) ? Math.max(0, Math.min(1000, Math.floor(Number(v)))) : null)

function parseUA(ua: string) {
  const device = /iPad|Tablet/i.test(ua) ? 'tablet' : /Mobi|Android|iPhone/i.test(ua) ? 'mobile' : 'desktop'
  const browser = /Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /SamsungBrowser/.test(ua) ? 'Samsung'
    : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Other'
  const os = /Windows/.test(ua) ? 'Windows' : /iPhone|iPad|iOS/.test(ua) ? 'iOS' : /Android/.test(ua) ? 'Android'
    : /Mac OS X/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'Other'
  return { device, browser, os }
}

/** Collects anonymous usage events. Always answers 204 so it never breaks the page. */
export default defineEventHandler(async (event) => {
  setResponseStatus(event, 204)
  try {
    const ua = getHeader(event, 'user-agent') ?? ''
    if (!ua || BOT.test(ua)) return null
    if (await isAdmin(event)) return null // do not count the owner

    // sendBeacon posts text/plain, so read the raw body
    const raw = await readRawBody(event)
    const b = JSON.parse(raw || '{}') as Record<string, unknown>
    const type = str(b.type, 20)
    const sid = str(b.sid, 40)
    const vid = str(b.vid, 40)
    if (!type || !TYPES.has(type) || !sid || !vid || !/^[\w-]+$/.test(sid + vid)) return null

    const site = SITES.has(b.site as string) ? (b.site as string) : 'interview'
    const path = str(b.path, 200)
    if (site === 'interview' && path && /\/admin(\/|$)/.test(path)) return null
    const label = str(b.label, 60)
    const level = LEVELS.includes(b.level as never) || b.level === 'open' ? (b.level as string) : null
    const answered = int(b.answered)
    const total = int(b.total)
    const now = Date.now()
    const db = useDB(event)

    const cf = (event.context.cloudflare?.request as { cf?: Record<string, unknown> } | undefined)?.cf ?? {}
    const country = str(cf.country, 2) ?? str(getHeader(event, 'cf-ipcountry'), 2)
    const city = str(cf.city, 60)
    const { device, browser, os } = parseUA(ua)
    let ref = str(b.ref, 300)
    try { ref = ref ? new URL(ref).hostname.replace(/^www\./, '') : null }
    catch { ref = null }
    // Moving around inside the same site is not a "source"
    if (ref && ((site === 'interview' && ref.startsWith('interview.')) || (site === 'main' && ref === 'promptjicode.com') || (site === 'menu' && ref.startsWith('menu.')))) ref = null

    const stmts: D1PreparedStatement[] = [
      db.prepare(`INSERT INTO sessions (id, visitor, is_new, first_ts, last_ts, country, city, device, browser, os, referrer, utm_source, landing, locale, site)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  ON CONFLICT(id) DO UPDATE SET last_ts = excluded.last_ts`)
        .bind(sid, vid, b.isNew ? 1 : 0, now, now, country, city, device, browser, os, ref, str(b.utm, 60), path, str(b.locale, 5), site),
    ]

    if (type === 'pageview') {
      stmts.push(db.prepare(`UPDATE sessions SET pageviews = pageviews + 1 WHERE id = ?`).bind(sid))
    }
    else if (type === 'quiz_start') {
      stmts.push(db.prepare(`UPDATE sessions SET quiz_started = quiz_started + 1, quiz_level = ?, quiz_answered = 0, quiz_total = ? WHERE id = ?`)
        .bind(level, total ?? 0, sid))
    }
    else if (type === 'quiz_progress' || type === 'quiz_leave') {
      stmts.push(db.prepare(`UPDATE sessions SET quiz_answered = MAX(quiz_answered, ?) WHERE id = ?`).bind(answered ?? 0, sid))
    }
    else if (type === 'quiz_done') {
      stmts.push(db.prepare(`UPDATE sessions SET quiz_done = quiz_done + 1, quiz_answered = quiz_total, attempt_id = ? WHERE id = ?`)
        .bind(str(b.attemptId, 20), sid))
    }

    // Heartbeats and per-answer progress only refresh the session, they are not stored as events
    if (type !== 'heartbeat' && type !== 'quiz_progress') {
      stmts.push(db.prepare(`INSERT INTO events (ts, session, type, path, level, answered, total, label) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(now, sid, type, path, level, answered, total, label))
    }
    await db.batch(stmts)
  }
  catch (e) {
    // ignore bad input, but leave a trace in the logs
    console.warn('[track]', (e as Error).message)
  }
  return null
})
