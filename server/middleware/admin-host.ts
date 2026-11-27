/**
 * The dashboard lives on admin.promptjicode.com (same app, its own address).
 * There, the home page opens the dashboard, and nothing is indexed by search engines.
 * The old interview.promptjicode.com/admin pages move there.
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  // Old address: interview.promptjicode.com/admin → admin.promptjicode.com/admin
  if (url.hostname === 'interview.promptjicode.com' && /^\/((en|tr)\/)?admin(\/|$)/.test(url.pathname)) {
    return sendRedirect(event, `https://admin.promptjicode.com${url.pathname}${url.search}`, 301)
  }
  if (url.hostname !== 'admin.promptjicode.com') return
  setResponseHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  const m = url.pathname.match(/^\/(en|tr)?\/?$/)
  if (m) return sendRedirect(event, m[1] ? `/${m[1]}/admin` : '/admin', 302)
})
