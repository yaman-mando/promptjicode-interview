import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n', 'nitro-cloudflare-dev'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'PromptjiCode Interview',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#120c09' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'PromptjiCode' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ar',
    baseUrl: 'https://interview.promptjicode.com',
    locales: [
      { code: 'ar', language: 'ar', name: 'العربية', dir: 'rtl', file: 'ar.json' },
      { code: 'en', language: 'en', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'tr', language: 'tr', name: 'Türkçe', dir: 'ltr', file: 'tr.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'pci_lang',
      redirectOn: 'root',
    },
  },

  runtimeConfig: {
    // Set NUXT_QUIZ_SECRET in production (wrangler secret put NUXT_QUIZ_SECRET)
    quizSecret: 'dev-only-secret-change-me',
    // Set NUXT_ADMIN_PASSWORD in production to enable /admin. Empty = admin disabled.
    adminPassword: '',
  },

  routeRules: {
    '/api/**': { headers: { 'X-Robots-Tag': 'noindex' } },
    '/admin/**': { headers: { 'X-Robots-Tag': 'noindex' } },
    '/*/admin/**': { headers: { 'X-Robots-Tag': 'noindex' } },
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: false,
      nodeCompat: true,
    },
  },
})
