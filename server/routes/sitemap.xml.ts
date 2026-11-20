import { LEVELS, TRACK_LIST } from '#shared/types/quiz'

const SITE = 'https://interview.promptjicode.com'
const LOCALES = ['ar', 'en', 'tr'] as const
const url = (locale: string, path: string) => `${SITE}${locale === 'ar' ? '' : `/${locale}`}${path}`

/** Every public page in all three languages, with hreflang links between them. */
export default defineEventHandler((event) => {
  const paths = ['/', '/backend', '/fullstack', ...TRACK_LIST.flatMap(tr => [...LEVELS, 'open'].map(l => `/${tr}/${l}`))]
  const today = new Date().toISOString().slice(0, 10)
  const entries = paths.flatMap(path => LOCALES.map((locale) => {
    const alternates = LOCALES.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, path === '/' ? '' : path) || SITE}"/>`)
    alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url('ar', path === '/' ? '' : path) || SITE}"/>`)
    return `  <url>
    <loc>${url(locale, path === '/' ? '' : path) || SITE}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
${alternates.join('\n')}
  </url>`
  }))
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
})
