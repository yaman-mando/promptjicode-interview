<script setup lang="ts">
const head = useLocaleHead()
const { t, locale } = useI18n()

useHead(() => ({
  titleTemplate: (title?: string) => !title || title.includes('PromptjiCode') ? (title || 'PromptjiCode Interview') : `${title} | PromptjiCode Interview`,
  htmlAttrs: { lang: head.value.htmlAttrs.lang, dir: head.value.htmlAttrs.dir },
  link: head.value.link,
  meta: head.value.meta,
}))

// Defaults for every page; pages override title and description
const route = useRoute()
useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => `${t('seo.title')} | PromptjiCode Interview`,
  ogDescription: () => t('seo.description'),
  ogSiteName: 'PromptjiCode Interview',
  ogType: 'website',
  ogUrl: () => `https://interview.promptjicode.com${route.path === '/' ? '' : route.path}`,
  ogImage: 'https://interview.promptjicode.com/og.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'PromptjiCode Interview',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="mx-auto flex min-h-dvh max-w-3xl flex-col px-5">
    <AppHeader />
    <main class="flex-1 pb-16">
      <NuxtPage />
    </main>
    <footer class="border-t border-white/10 py-6 text-center text-sm text-sand">
      <span class="font-bold text-caramel">{{ t('footer') }}</span>
      <span class="mx-2 opacity-40">·</span>
      <a :href="`https://promptjicode.com${locale === 'ar' ? '/' : `/${locale}`}`" class="underline-offset-4 hover:underline">promptjicode.com</a>
      <span class="mx-2 opacity-40">·</span>
      <a href="https://github.com/promptjicode" class="underline-offset-4 hover:underline" target="_blank" rel="noopener">{{ t('github') }}</a>
    </footer>
  </div>
</template>
