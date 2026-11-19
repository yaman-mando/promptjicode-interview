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

const copied = ref(false)
async function share() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
  catch { /* clipboard blocked: nothing to do */ }
}

const isCode = (s: string) => /^[\x00-\x7F]*$/.test(s)

// Results are personal: shareable with a good preview, but kept out of search results
const resultTitle = () => result.value
  ? t('seo.resultTitle', { score: result.value.score, total: result.value.total, level: t(`levels.${result.value.level}.name`) })
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
          {{ t('result.title') }} · <span class="font-mono">{{ t(`levels.${result.level}.name`) }}</span>
        </p>

        <div
          class="mx-auto grid size-40 place-items-center rounded-full"
          :style="{ background: `conic-gradient(${ringColor} ${pct * 3.6}deg, rgba(255,255,255,.08) 0)` }"
        >
          <div class="grid size-32 place-items-center rounded-full bg-ink">
            <div>
              <div class="font-mono text-4xl font-bold" dir="ltr">{{ pct }}%</div>
              <div class="text-sm text-sand">{{ t('result.score', { score: result.score, total: result.total }) }}</div>
            </div>
          </div>
        </div>

        <p class="mt-6 text-lg font-bold">
          <template v-if="result.percentile !== null">
            {{ t('result.percentile', { p: result.percentile, level: t(`levels.${result.level}.name`) }) }}
          </template>
          <span v-else class="text-base font-semibold text-sand">{{ t('result.early') }}</span>
        </p>
        <p class="mt-2 text-sm text-sand">{{ t('result.time', { time }) }}</p>

        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" class="rounded-xl bg-caramel px-5 py-2.5 font-bold text-ink hover:brightness-110" @click="share">
            {{ copied ? t('result.copied') : t('result.share') }}
          </button>
          <NuxtLink :to="localePath(`/quiz/${result.level}`)" class="rounded-xl border border-white/15 px-5 py-2.5 font-bold hover:border-caramel">
            {{ t('result.again') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/')" class="rounded-xl px-5 py-2.5 font-semibold text-sand hover:text-cream">
            {{ t('result.otherLevel') }}
          </NuxtLink>
        </div>
      </section>

      <!-- By topic -->
      <section class="mt-8">
        <h2 class="mb-4 text-lg font-bold">{{ t('result.byTopic') }}</h2>
        <ul class="grid gap-3">
          <li v-for="tp in result.topics" :key="tp.topic" class="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-3">
            <span class="font-mono text-sm">{{ t(`topics.${tp.topic}`) }}</span>
            <div class="h-2.5 overflow-hidden rounded-full bg-white/10">
              <div
                class="h-full rounded-full"
                :class="tp.correct / tp.total >= 0.7 ? 'bg-good' : tp.correct / tp.total >= 0.4 ? 'bg-caramel' : 'bg-bad'"
                :style="{ width: `${Math.max(4, (tp.correct / tp.total) * 100)}%` }"
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
