import type { H3Event } from 'h3'

const COOKIE = 'pci_admin'
const SESSION_DAYS = 7

async function sign(key: string, data: string) {
  const enc = new TextEncoder()
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', k, enc.encode(data))
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('')
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

/** Admin is only available once NUXT_ADMIN_PASSWORD is set. */
export function adminPassword(event: H3Event): string {
  return String(useRuntimeConfig(event).adminPassword ?? '')
}

export async function checkPassword(event: H3Event, given: string) {
  const real = adminPassword(event)
  if (!real) return false
  // Compare hashes so the comparison time does not depend on the password length
  const [a, b] = await Promise.all([sign('pw', given), sign('pw', real)])
  return safeEqual(a, b)
}

/** On promptjicode.com, share the sign-in between admin.promptjicode.com and interview.promptjicode.com. */
function cookieDomain(event: H3Event) {
  return getRequestURL(event).hostname.endsWith('promptjicode.com') ? '.promptjicode.com' : undefined
}

/** The session is signed with the password, so changing the password logs everyone out. */
export async function startSession(event: H3Event) {
  const exp = Date.now() + SESSION_DAYS * 86400_000
  const sig = await sign(adminPassword(event), `admin|${exp}`)
  setCookie(event, COOKIE, `${exp}.${sig}`, {
    httpOnly: true,
    secure: !getRequestURL(event).hostname.match(/^(localhost|127\.0\.0\.1)$/),
    sameSite: 'strict',
    path: '/',
    domain: cookieDomain(event),
    maxAge: SESSION_DAYS * 86400,
  })
}

export function endSession(event: H3Event) {
  deleteCookie(event, COOKIE, { path: '/', domain: cookieDomain(event) })
  deleteCookie(event, COOKIE, { path: '/' }) // older host-only cookie
}

export async function isAdmin(event: H3Event) {
  const pw = adminPassword(event)
  const raw = getCookie(event, COOKIE)
  if (!pw || !raw) return false
  const [exp, sig] = raw.split('.')
  if (!exp || !sig || Number(exp) < Date.now()) return false
  return safeEqual(sig, await sign(pw, `admin|${exp}`))
}

export async function requireAdmin(event: H3Event) {
  if (!(await isAdmin(event))) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
}
