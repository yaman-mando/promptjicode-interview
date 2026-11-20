<script setup lang="ts">
import type { Topic, Track } from '#shared/types/quiz'
import { LEVELS, TRACKS, TRACK_LIST } from '#shared/types/quiz'

const props = defineProps<{ track: Track }>()
const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()

const badge: Record<string, string> = {
  junior: 'bg-good/15 text-good',
  mid: 'bg-caramel/15 text-caramel',
  senior: 'bg-bad/15 text-bad',
}

// Each track's home page lives at its own URL; the front-end one is the site root
const homePath = (tr: Track) => localePath(tr === 'frontend' ? '/' : `/${tr}`)
const trackName = computed(() => t(`tracks.${props.track}.name`))

const TRACK_ICON: Record<Track, string> = {
  frontend: 'M3 5h18v12H3zM8 21h8M12 17v4M7 9h4M7 12h7',
  backend: 'M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01',
  fullstack: 'M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 18l9 5 9-5',
}

// Specialisation tests: one topic at Mid level
const SPECS: Record<Track, { topic: Topic, mark: string, color: string }[]> = {
  frontend: [
    { topic: 'vue', mark: 'V', color: '#42b883' },
    { topic: 'react', mark: 'R', color: '#58c4dc' },
    { topic: 'angular', mark: 'A', color: '#e5645a' },
    { topic: 'typescript', mark: 'TS', color: '#3178c6' },
    { topic: 'javascript', mark: 'JS', color: '#e2c35c' },
    { topic: 'css', mark: 'CSS', color: '#b48ce6' },
  ],
  backend: [
    { topic: 'node', mark: 'JS', color: '#6cc24a' },
    { topic: 'python', mark: 'PY', color: '#ffd343' },
    { topic: 'php', mark: 'PHP', color: '#8892bf' },
    { topic: 'dotnet', mark: 'C#', color: '#a179dc' },
    { topic: 'databases', mark: 'SQL', color: '#e2a15c' },
    { topic: 'api', mark: 'API', color: '#58c4dc' },
  ],
  fullstack: [
    { topic: 'react', mark: 'R', color: '#58c4dc' },
    { topic: 'vue', mark: 'V', color: '#42b883' },
    { topic: 'node', mark: 'JS', color: '#6cc24a' },
    { topic: 'typescript', mark: 'TS', color: '#3178c6' },
    { topic: 'databases', mark: 'SQL', color: '#e2a15c' },
    { topic: 'architecture', mark: '{ }', color: '#e5645a' },
  ],
}

const allTopics = computed(() => [...TRACKS[props.track].core, ...TRACKS[props.track].extra])
const faq = computed(() => (tm('seo.faq') as { q: unknown, a: unknown }[]).map(f => ({ q: rt(f.q as never), a: rt(f.a as never) })))

const SITE = 'https://interview.promptjicode.com'
const prefix = computed(() => (locale.value === 'ar' ? '' : `/${locale.value}`))

// Page title and description per track
const title = computed(() => t(`tracks.${props.track}.seoTitle`))
const description = computed(() => t(`tracks.${props.track}.seoDesc`))
useSeoMeta({ title, description, ogTitle: () => `${title.value} | PromptjiCode Interview`, ogDescription: description })

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
          'name': t('seo.levelTitle', { level: t(`levels.${level}.name`), track: trackName.value }),
          'description': t(`trackLevels.${props.track}.${level}`),
          'url': `${SITE}${prefix.value}/${props.track}/${level}`,
          'educationalLevel': level,
          'inLanguage': locale.value,
          'isAccessibleForFree': true,
          'about': allTopics.value.map(tp => t(`topics.${tp}`)),
        })),
        {
          '@type': 'Quiz',
          'name': t('seo.openTitle', { track: trackName.value }),
          'description': t('levels.open.desc'),
          'url': `${SITE}${prefix.value}/${props.track}/open`,
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
  <section class="pt-8 pb-8 text-center sm:pt-14">
    <p class="mb-4 font-mono text-sm text-sand/70" dir="ltr">// are you ready for the interview?</p>
    <p class="text-4xl leading-tight font-extrabold sm:text-5xl" dir="ltr">
      Promptji<span class="text-caramel">Code</span> Interview
    </p>
    <h1 class="mx-auto mt-4 max-w-xl text-xl font-bold text-cream"><BidiText :text="t(`tracks.${track}.h1`)" /></h1>
    <p class="mx-auto mt-2 max-w-xl text-lg text-sand"><BidiText :text="t('tagline')" /></p>
  </section>

  <!-- Tracks -->
  <nav class="mb-10 grid gap-3 sm:grid-cols-3" :aria-label="t('tracks.label')">
    <NuxtLink
      v-for="tr in TRACK_LIST" :key="tr"
      :to="homePath(tr)"
      :aria-current="tr === track ? 'page' : undefined"
      class="group relative flex items-start gap-3 overflow-hidden rounded-2xl border p-4 transition"
      :class="tr === track
        ? 'border-caramel bg-caramel/[0.12] shadow-[0_0_0_1px_var(--color-caramel)]'
        : 'border-white/10 bg-white/[0.03] hover:-translate-y-0.5 hover:border-white/25'"
    >
      <span class="grid size-11 shrink-0 place-items-center rounded-xl transition" :class="tr === track ? 'bg-caramel text-ink' : 'bg-white/5 text-sand group-hover:text-cream'">
        <svg viewBox="0 0 24 24" class="size-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="TRACK_ICON[tr]" /></svg>
      </span>
      <span class="min-w-0">
        <span class="block text-lg font-bold" dir="ltr" :class="locale === 'ar' ? 'text-end' : ''">{{ t(`tracks.${tr}.name`) }}</span>
        <span class="block text-[13px] leading-snug text-sand"><BidiText plain :text="t(`tracks.${tr}.desc`)" /></span>
      </span>
    </NuxtLink>
  </nav>

  <Transition name="fade" mode="out-in">
    <div :key="track">
      <h2 class="mb-4 text-xl font-bold">{{ t('chooseLevelTrack', { track: trackName }) }}</h2>

      <div class="grid gap-4 sm:grid-cols-3">
        <NuxtLink
          v-for="level in LEVELS"
          :key="level"
          :to="localePath(`/${track}/${level}`)"
          class="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-caramel/60 hover:bg-white/[0.06]"
        >
          <span class="mb-3 w-fit rounded-full px-3 py-1 font-mono text-sm font-bold" :class="badge[level]">
            {{ t(`levels.${level}.name`) }}
          </span>
          <p class="flex-1 text-[15px] leading-relaxed text-cream/90"><BidiText :text="t(`trackLevels.${track}.${level}`)" /></p>
          <p class="mt-4 text-sm text-sand">{{ t('cardMeta') }}</p>
          <span class="mt-4 rounded-xl bg-caramel py-2.5 text-center font-bold text-ink transition group-hover:brightness-110">
            {{ t('start') }}
          </span>
        </NuxtLink>
      </div>

      <NuxtLink
        :to="localePath(`/${track}/open`)"
        class="group relative mt-4 flex flex-col gap-4 overflow-hidden rounded-2xl border border-caramel/30 bg-gradient-to-br from-caramel/[0.12] to-transparent p-5 transition hover:-translate-y-0.5 hover:border-caramel/70 sm:flex-row sm:items-center sm:p-6"
      >
        <div class="relative flex-1">
          <p class="mb-1 text-sm font-semibold text-caramel">{{ t('openCard.kicker') }}</p>
          <h3 class="mb-1.5 text-xl font-bold">{{ t('seo.openTitle', { track: trackName }) }}</h3>
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
        <h2 class="mb-1 text-xl font-bold">{{ t('specs.title') }}</h2>
        <p class="mb-4 text-sand">{{ t('specs.desc') }}</p>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <NuxtLink
            v-for="sp in SPECS[track]" :key="sp.topic"
            :to="localePath({ path: `/${track}/mid`, query: { topics: sp.topic } })"
            class="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]"
          >
            <span class="grid size-11 shrink-0 place-items-center rounded-xl font-mono text-sm font-bold" :style="{ background: `${sp.color}22`, color: sp.color }" dir="ltr">{{ sp.mark }}</span>
            <span class="min-w-0">
              <span class="block font-bold">{{ t(`topics.${sp.topic}`) }}</span>
              <span class="block text-xs text-sand">{{ t('specs.cta') }}</span>
            </span>
          </NuxtLink>
        </div>
      </section>

      <section class="mt-12">
        <h2 class="mb-4 text-xl font-bold">{{ t('seo.topicsTitle') }}</h2>
        <ul class="flex flex-wrap gap-2">
          <li v-for="topic in allTopics" :key="topic" class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm">{{ t(`topics.${topic}`) }}</li>
        </ul>
      </section>
    </div>
  </Transition>

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
