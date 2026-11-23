// PromptjiCode Interview service worker.
// Pages: network first, cached copy when offline, then /offline (Cloudflare serves offline.html there).
// /_nuxt/* (hashed build files): cache first. Other static files: cached copy, refreshed in the background.
// Never touches /api, /admin, video, or other origins.
const VERSION = 'v1'  // bump to drop old caches
const PAGES = `pages-${VERSION}`
const STATIC = `static-${VERSION}`
const SHELL = `shell-${VERSION}`
const PRECACHE = ['/offline', '/icons/icon-192.png', '/logo.png', '/favicon.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(SHELL).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keep = [PAGES, STATIC, SHELL]
    for (const key of await caches.keys()) if (!keep.includes(key)) await caches.delete(key)
    await self.clients.claim()
  })())
})

const skip = (url, req) =>
  req.method !== 'GET'
  || url.origin !== self.location.origin
  || url.pathname.startsWith('/api/')
  || /(^|\/)admin(\/|$)/.test(url.pathname)
  || url.pathname.startsWith('/video/')
  || req.headers.has('range')

async function trim(cache, max) {
  const keys = await cache.keys()
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i])
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  const url = new URL(req.url)
  if (skip(url, req)) return

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req)
        if (res.ok && !url.pathname.includes('/result/')) {
          const cache = await caches.open(PAGES)
          await cache.put(url.pathname, res.clone())
          trim(cache, 40)
        }
        return res
      }
      catch {
        return (await caches.match(url.pathname, { cacheName: PAGES }))
          || (await caches.match('/offline'))
          || Response.error()
      }
    })())
    return
  }

  if (url.pathname.startsWith('/_nuxt/')) {
    event.respondWith((async () => {
      const hit = await caches.match(req)
      if (hit) return hit
      const res = await fetch(req)
      if (res.ok) {
        const cache = await caches.open(STATIC)
        cache.put(req, res.clone()).then(() => trim(cache, 200))
      }
      return res
    })())
    return
  }

  // Fonts, icons, og images, etc.
  event.respondWith((async () => {
    const cache = await caches.open(STATIC)
    const hit = await caches.match(req)
    const net = fetch(req).then((res) => {
      if (res.ok) cache.put(req, res.clone()).then(() => trim(cache, 200))
      return res
    })
    if (hit) { event.waitUntil(net.catch(() => {})); return hit }
    return net
  })())
})
