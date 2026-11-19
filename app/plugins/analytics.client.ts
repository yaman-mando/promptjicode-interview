/**
 * Anonymous usage tracking for the admin dashboard.
 * A random visitor id lives in localStorage, a session id in sessionStorage (new after 30 min idle).
 */
type Payload = Record<string, unknown>

export default defineNuxtPlugin((nuxtApp) => {
  const IDLE = 30 * 60_000
  const id = () => (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).replace(/[^\w-]/g, '')

  const get = (s: Storage, k: string) => { try { return s.getItem(k) } catch { return null } }
  const set = (s: Storage, k: string, v: string) => { try { s.setItem(k, v) } catch { /* private mode */ } }

  let isNew = false
  let vid = get(localStorage, 'pci_vid')
  if (!vid) { vid = id(); isNew = true; set(localStorage, 'pci_vid', vid) }

  let sid = get(sessionStorage, 'pci_sid')
  const last = Number(get(sessionStorage, 'pci_last') ?? 0)
  if (!sid || Date.now() - last > IDLE) { sid = id(); set(sessionStorage, 'pci_sid', sid) }

  const utm = new URLSearchParams(location.search).get('utm_source')
  const ref = document.referrer || null

  function track(type: string, data: Payload = {}, beacon = false) {
    if (/\/admin(\/|$)/.test(location.pathname)) return
    set(sessionStorage, 'pci_last', String(Date.now()))
    const body = JSON.stringify({
      type, sid, vid, isNew, ref, utm,
      path: location.pathname,
      locale: (nuxtApp.$i18n as { locale: { value: string } }).locale.value,
      ...data,
    })
    if (beacon && navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', body)
      return
    }
    fetch('/api/track', { method: 'POST', body, keepalive: true, headers: { 'content-type': 'text/plain' } }).catch(() => {})
  }

  nuxtApp.hook('page:finish', () => track('pageview'))

  // Heartbeat while the tab is visible, so time on site and "online now" are accurate
  setInterval(() => { if (document.visibilityState === 'visible') track('heartbeat') }, 30_000)

  return { provide: { track } }
})
