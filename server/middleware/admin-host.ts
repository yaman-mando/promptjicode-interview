/**
 * The dashboard lives on admin.promptjicode.com (same app, its own address).
 * There, the home page opens the dashboard, and nothing is indexed by search engines.
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  if (url.hostname !== 'admin.promptjicode.com') return
  setResponseHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  const m = url.pathname.match(/^\/(en|tr)?\/?$/)
  if (m) return sendRedirect(event, m[1] ? `/${m[1]}/admin` : '/admin', 302)
})
