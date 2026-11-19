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
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ar',
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
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: false,
      nodeCompat: true,
    },
  },
})
