<script setup lang="ts">
import type { ResultResponse } from '#shared/types/quiz'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const id = route.params.id as string
const { data: result, error } = await useFetch<ResultResponse>(`/api/result/${id}`, {
  query: { locale },
})

const pct = computed(() => result.value ? Math.round((result.value.score / result.value.total) * 100) : 0)

const time = computed(() => {
  const s = Math.round((result.value?.durationMs ?? 0) / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
})

// Ring colour follows the score
const ringColor = computed(() => pct.value >= 70 ? 'var(--color-good)' : pct.value >= 40 ? 'var(--color-caramel)' : 'var(--color-bad)')

const isOpen = computed(() => result.value?.mode === 'open')
const testName = computed(() => isOpen.value ? t('levels.open.name') : t(`levels.${result.value?.level}.name`))

// Count the score up and fill the ring once the page is shown
const shown = ref(0)
onMounted(() => {
  const target = pct.value
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return (shown.value = target)
  const t0 = performance.now()
  const tick = (now: number) => {
    const k = Math.min(1, (now - t0) / 1100)
    shown.value = Math.round(target * (1 - (1 - k) ** 3))
    if (k < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
})

// "New test" keeps the same kind of test, including chosen topics and timer
const againLink = computed(() => {
  const r = result.value
  if (!r) return localePath('/')
  if (r.mode === 'open') return localePath({ path: '/quiz/open', query: r.timeLimit ? { time: r.timeLimit / 60 } : {} })
  const query: Record<string, string | number> = {}
  if (r.topicsChosen.length) query.topics = r.topicsChosen.join(',')
  if (r.mode === 'custom' && !r.topicsChosen.length) query.count = r.total
  if (r.timeLimit) query.time = r.timeLimit / 60
  return localePath({ path: `/quiz/${r.level}`, query })
})
const barClass = (ok: number) => ok >= 0.7 ? 'bg-good' : ok >= 0.4 ? 'bg-caramel' : 'bg-bad'

const isCode = (s: string) => /^[\x00-\x7F]*$/.test(s)

// Results are personal: shareable with a good preview, but kept out of search results
const resultTitle = () => result.value
  ? t('seo.resultTitle', { score: result.value.score, total: result.value.total, level: testName.value })
  : 'PromptjiCode Interview'
useSeoMeta({
  title: resultTitle,
  ogTitle: resultTitle,
  description: () => t('seo.resultDescription'),
  ogDescription: () => t('seo.resultDescription'),
  robots: 'noindex, follow',
})
</script>

<template>
  <div class="pt-4">
    <p v-if="error" class="py-24 text-center text-sand">{{ t('result.notFound') }}</p>

    <template v-else-if="result">
      <!-- Score -->
      <section class="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center sm:p-8">
        <p class="mb-5 text-sm font-semibold text-sand">
          {{ t('result.title') }} · <span class="font-mono">{{ testName }}</span>
          <span v-if="result.mode === 'custom'" class="ms-1 rounded bg-white/10 px-1.5 py-0.5 text-xs">{{ t('setup.custom') }}</span>
        </p>

        <div
          class="ring-in mx-auto grid size-44 place-items-center rounded-full"
          :style="{ background: `conic-gradient(${ringColor} ${shown * 3.6}deg, rgba(255,255,255,.08) 0)` }"
        >
          <div class="grid size-36 place-items-center rounded-full bg-ink">
            <div>
              <template v-if="isOpen">
                <div class="text-xs text-sand">{{ t('result.estimated') }}</div>
                <div class="font-mono text-3xl font-bold text-caramel" dir="ltr">{{ t(`levels.${result.level}.name`) }}</div>
              </template>
              <div v-else class="font-mono text-4xl font-bold tabular-nums" dir="ltr">{{ shown }}%</div>
              <div class="text-sm text-sand">{{ t('result.score', { score: result.score, total: result.total }) }}</div>
            </div>
          </div>
        </div>

        <p class="rise-late mt-6 text-lg font-bold">
          <template v-if="result.percentile !== null">
            {{ isOpen ? t('result.openPercentile', { p: result.percentile }) : t('result.percentile', { p: result.percentile, level: testName }) }}
          </template>
          <span v-else class="text-base font-semibold text-sand">{{ t('result.early') }}</span>
        </p>
        <p class="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-sand">
          <span>{{ t('result.time', { time }) }}</span>
          <span v-if="result.timeLimit">{{ t('result.timeLimit', { m: result.timeLimit / 60 }) }}</span>
          <span v-if="result.topicsChosen.length">{{ t('result.topicsChosen', { list: result.topicsChosen.map(tp => t(`topics.${tp}`)).join(locale === 'ar' ? '، ' : ', ') }) }}</span>
        </p>

        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <NuxtLink :to="againLink" class="rounded-xl bg-caramel px-5 py-2.5 font-bold text-ink transition hover:brightness-110">
            {{ t('result.again') }}
          </NuxtLink>
          <NuxtLink v-if="!isOpen" :to="localePath('/quiz/open')" class="rounded-xl border border-white/15 px-5 py-2.5 font-bold transition hover:border-caramel">
            {{ t('result.tryOpen') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/')" class="rounded-xl px-5 py-2.5 font-semibold text-sand hover:text-cream">
            {{ t('result.otherLevel') }}
          </NuxtLink>
        </div>
      </section>

      <ClientOnly><ShareCard :result="result" /></ClientOnly>

      <!-- Open test: by difficulty -->
      <section v-if="result.levels.length" class="mt-8">
        <h2 class="mb-4 text-lg font-bold">{{ t('result.byLevel') }}</h2>
        <ul class="grid gap-3">
          <li v-for="(lv, i) in result.levels" :key="lv.level" class="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-3">
            <span class="font-mono text-sm">{{ t(`levels.${lv.level}.name`) }}</span>
            <div class="h-2.5 overflow-hidden rounded-full bg-white/10">
              <div class="bar-grow h-full rounded-full" :class="barClass(lv.correct / lv.total)" :style="{ width: `${Math.max(4, (lv.correct / lv.total) * 100)}%`, animationDelay: `${200 + i * 90}ms` }" />
            </div>
            <span class="text-end font-mono text-sm text-sand" dir="ltr">{{ lv.correct }}/{{ lv.total }}</span>
          </li>
        </ul>
      </section>

      <!-- By topic -->
      <section class="mt-8">
        <h2 class="mb-4 text-lg font-bold">{{ t('result.byTopic') }}</h2>
        <ul class="grid gap-3">
          <li v-for="(tp, i) in result.topics" :key="tp.topic" class="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-3">
            <span class="font-mono text-sm">{{ t(`topics.${tp.topic}`) }}</span>
            <div class="h-2.5 overflow-hidden rounded-full bg-white/10">
              <div
                class="bar-grow h-full rounded-full"
                :class="barClass(tp.correct / tp.total)"
                :style="{ width: `${Math.max(4, (tp.correct / tp.total) * 100)}%`, animationDelay: `${200 + i * 70}ms` }"
              />
            </div>
            <span class="text-end font-mono text-sm text-sand" dir="ltr">{{ tp.correct }}/{{ tp.total }}</span>
          </li>
        </ul>
      </section>

      <!-- Review -->
      <section class="mt-10">
        <h2 class="mb-4 text-lg font-bold">{{ t('result.review') }}</h2>
        <ol class="grid gap-5">
          <li
            v-for="(q, i) in result.review"
            :key="q.id"
            class="min-w-0 rounded-2xl border p-5"
            :class="q.correct ? 'border-good/30 bg-good/[0.04]' : 'border-bad/30 bg-bad/[0.04]'"
          >
            <div class="mb-3 flex items-start gap-3">
              <span
                class="grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold"
                :class="q.correct ? 'bg-good text-ink' : 'bg-bad text-ink'"
                :aria-label="q.correct ? '✓' : '✗'"
              >{{ q.correct ? '✓' : '✗' }}</span>
              <p class="font-bold leading-relaxed"><span class="text-sand">{{ i + 1 }}.</span> <BidiText :text="q.prompt" /></p>
            </div>

            <CodeBlock v-if="q.code" :code="q.code" :lang="q.codeLang" class="mb-4" />

            <dl class="grid gap-2 text-[15px]">
              <div v-if="!q.correct" class="flex flex-wrap gap-2">
                <dt class="text-sand">{{ t('result.yourAnswer') }}:</dt>
                <dd class="font-semibold text-bad" :class="q.chosen !== null && isCode(q.options[q.chosen]!) ? 'ltr font-mono' : ''">
                  <template v-if="q.chosen === null">{{ t('result.skipped') }}</template><BidiText v-else :text="q.options[q.chosen]!" />
                </dd>
              </div>
              <div class="flex flex-wrap gap-2">
                <dt class="text-sand">{{ t('result.correctAnswer') }}:</dt>
                <dd class="font-semibold text-good" :class="isCode(q.options[q.answer]!) ? 'ltr font-mono' : ''"><BidiText :text="q.options[q.answer]!" /></dd>
              </div>
            </dl>

            <div class="mt-4 rounded-xl bg-white/[0.04] p-4">
              <p class="mb-1 font-bold text-caramel">{{ t('result.why') }}</p>
              <p class="leading-relaxed text-cream/90"><BidiText :text="q.explanation" /></p>
            </div>
          </li>
        </ol>
      </section>
    </template>
  </div>
</template>
