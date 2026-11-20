<script setup lang="ts">
import { LEVELS } from '#shared/types/quiz'

const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()

const badge: Record<string, string> = {
  junior: 'bg-good/15 text-good',
  mid: 'bg-caramel/15 text-caramel',
  senior: 'bg-bad/15 text-bad',
}

const TOPICS = ['javascript', 'async', 'css', 'html', 'react', 'vue', 'angular', 'typescript', 'browser', 'performance', 'security']
// Specialisation tests: one topic, any level (Mid by default)
const TRACKS = [
  { topic: 'vue', mark: 'V', color: '#42b883' },
  { topic: 'react', mark: 'R', color: '#58c4dc' },
  { topic: 'angular', mark: 'A', color: '#e5645a' },
  { topic: 'typescript', mark: 'TS', color: '#3178c6' },
  { topic: 'javascript', mark: 'JS', color: '#e2c35c' },
  { topic: 'css', mark: 'CSS', color: '#b48ce6' },
]
const faq = computed(() => (tm('seo.faq') as { q: unknown, a: unknown }[]).map(f => ({ q: rt(f.q as never), a: rt(f.a as never) })))

const SITE = 'https://interview.promptjicode.com'
useHead(() => ({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE}/#website`,
          'url': SITE,
          'name': 'PromptjiCode Interview',
          'description': t('seo.description'),
          'inLanguage': ['ar', 'en', 'tr'],
          'publisher': { '@id': 'https://promptjicode.com/#org' },
        },
        {
          '@type': 'Organization',
          '@id': 'https://promptjicode.com/#org',
          'name': 'PromptjiCode',
          'url': 'https://promptjicode.com',
          'logo': `${SITE}/logo.png`,
          'sameAs': [
            'https://www.instagram.com/promptji.code/',
            'https://www.tiktok.com/@promptjicode',
            'https://www.youtube.com/@promptjicode',
            'https://www.facebook.com/promptjicode',
            'https://github.com/promptjicode',
          ],
        },
        ...LEVELS.map(level => ({
          '@type': 'Quiz',
          'name': t('seo.levelTitle', { level: t(`levels.${level}.name`) }),
          'description': t(`levels.${level}.desc`),
          'url': `${SITE}${locale.value === 'ar' ? '' : `/${locale.value}`}/quiz/${level}`,
          'educationalLevel': level,
          'inLanguage': locale.value,
          'isAccessibleForFree': true,
          'about': ['JavaScript', 'CSS', 'HTML', 'React', 'Vue', 'TypeScript'],
        })),
        {
          '@type': 'Quiz',
          'name': t('levels.open.name'),
          'description': t('levels.open.desc'),
          'url': `${SITE}${locale.value === 'ar' ? '' : `/${locale.value}`}/quiz/open`,
          'inLanguage': locale.value,
          'isAccessibleForFree': true,
        },
        {
          '@type': 'FAQPage',
          'mainEntity': faq.value.map(f => ({
            '@type': 'Question',
            'name': f.q,
            'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
          })),
        },
      ],
    }),
  }],
}))
</script>

<template>
  <section class="pt-8 pb-10 text-center sm:pt-14">
    <p class="mb-4 font-mono text-sm text-sand/70" dir="ltr">// are you ready for the interview?</p>
    <p class="text-4xl leading-tight font-extrabold sm:text-5xl" dir="ltr">
      Promptji<span class="text-caramel">Code</span> Interview
    </p>
    <h1 class="mx-auto mt-4 max-w-xl text-xl font-bold text-cream"><BidiText :text="t('seo.h1')" /></h1>
    <p class="mx-auto mt-2 max-w-xl text-lg text-sand"><BidiText :text="t('tagline')" /></p>
  </section>

  <h2 class="mb-4 text-xl font-bold">{{ t('chooseLevel') }}</h2>

  <div class="grid gap-4 sm:grid-cols-3">
    <NuxtLink
      v-for="level in LEVELS"
      :key="level"
      :to="localePath(`/quiz/${level}`)"
      class="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-caramel/60 hover:bg-white/[0.06]"
    >
      <span class="mb-3 w-fit rounded-full px-3 py-1 font-mono text-sm font-bold" :class="badge[level]">
        {{ t(`levels.${level}.name`) }}
      </span>
      <p class="flex-1 text-[15px] leading-relaxed text-cream/90"><BidiText :text="t(`levels.${level}.desc`)" /></p>
      <p class="mt-4 text-sm text-sand">{{ t('cardMeta') }}</p>
      <span class="mt-4 rounded-xl bg-caramel py-2.5 text-center font-bold text-ink transition group-hover:brightness-110">
        {{ t('start') }}
      </span>
    </NuxtLink>
  </div>

  <NuxtLink
    :to="localePath('/quiz/open')"
    class="group relative mt-4 flex flex-col gap-4 overflow-hidden rounded-2xl border border-caramel/30 bg-gradient-to-br from-caramel/[0.12] to-transparent p-5 transition hover:-translate-y-0.5 hover:border-caramel/70 sm:flex-row sm:items-center sm:p-6"
  >
    <div class="relative flex-1">
      <p class="mb-1 text-sm font-semibold text-caramel">{{ t('openCard.kicker') }}</p>
      <h3 class="mb-1.5 text-xl font-bold">{{ t('levels.open.name') }}</h3>
      <p class="text-[15px] leading-relaxed text-cream/85"><BidiText :text="t('levels.open.desc')" /></p>
      <div class="mt-3 flex items-center gap-1.5 font-mono text-xs" dir="ltr" aria-hidden="true">
        <span class="rounded-full bg-good/15 px-2 py-0.5 text-good">Junior</span>
        <span class="text-sand">⇄</span>
        <span class="rounded-full bg-caramel/15 px-2 py-0.5 text-caramel">Mid</span>
        <span class="text-sand">⇄</span>
        <span class="rounded-full bg-bad/15 px-2 py-0.5 text-bad">Senior</span>
      </div>
    </div>
    <span class="relative rounded-xl bg-caramel px-6 py-3 text-center font-bold text-ink transition group-hover:brightness-110">
      {{ t('openCard.cta') }}
    </span>
  </NuxtLink>

  <section class="mt-12">
    <h2 class="mb-1 text-xl font-bold">{{ t('tracks.title') }}</h2>
    <p class="mb-4 text-sand">{{ t('tracks.desc') }}</p>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <NuxtLink
        v-for="tr in TRACKS" :key="tr.topic"
        :to="localePath({ path: '/quiz/mid', query: { topics: tr.topic } })"
        class="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]"
      >
        <span class="grid size-11 shrink-0 place-items-center rounded-xl font-mono text-sm font-bold" :style="{ background: `${tr.color}22`, color: tr.color }" dir="ltr">{{ tr.mark }}</span>
        <span class="min-w-0">
          <span class="block font-bold">{{ t(`topics.${tr.topic}`) }}</span>
          <span class="block text-xs text-sand">{{ t('tracks.cta') }}</span>
        </span>
      </NuxtLink>
    </div>
  </section>

  <section class="mt-12">
    <h2 class="mb-4 text-xl font-bold">{{ t('seo.topicsTitle') }}</h2>
    <ul class="flex flex-wrap gap-2">
      <li v-for="topic in TOPICS" :key="topic" class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm">{{ t(`topics.${topic}`) }}</li>
    </ul>
  </section>

  <section class="mt-12">
    <h2 class="mb-4 text-xl font-bold">{{ t('seo.faqTitle') }}</h2>
    <div class="grid gap-2">
      <details v-for="(f, i) in faq" :key="i" class="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 open:bg-white/[0.05]">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
          <BidiText :text="f.q" />
          <span class="text-caramel transition group-open:rotate-45" aria-hidden="true">+</span>
        </summary>
        <p class="mt-3 leading-relaxed text-sand"><BidiText :text="f.a" /></p>
      </details>
    </div>
  </section>
</template>
