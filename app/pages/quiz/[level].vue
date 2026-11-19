<script setup lang="ts">
import type { StartResponse, SubmitBody, Locale, Level } from '#shared/types/quiz'
import { LEVELS } from '#shared/types/quiz'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { $track } = useNuxtApp()

const level = route.params.level as Level
if (!LEVELS.includes(level)) {
  throw createError({ statusCode: 404, statusMessage: 'Not found' })
}

// Questions are fetched in the browser only, so every visit gets a fresh test
const test = ref<StartResponse | null>(null)
const loadError = ref(false)
const index = ref(0)
const answers = ref<(number | null)[]>([])
const submitting = ref(false)
const submitError = ref(false)
let done = false // set once the result is saved, so leaving the page does not warn

async function load() {
  loadError.value = false
  try {
    test.value = await $fetch<StartResponse>('/api/quiz/start', { query: { level, locale: locale.value } })
    answers.value = test.value.questions.map(() => null)
    index.value = 0
    $track('quiz_start', { level, total: test.value.questions.length })
  }
  catch {
    loadError.value = true
  }
}
onMounted(load)

const question = computed(() => test.value?.questions[index.value])
const total = computed(() => test.value?.questions.length ?? 0)
const isLast = computed(() => index.value === total.value - 1)
const chosen = computed(() => answers.value[index.value])

const answeredCount = () => answers.value.filter(a => a !== null).length

function choose(i: number) {
  const first = answers.value[index.value] === null
  answers.value[index.value] = i
  if (first) $track('quiz_progress', { level, answered: answeredCount(), total: total.value })
}

async function next() {
  if (!isLast.value) {
    index.value++
    return
  }
  await submit()
}

async function submit() {
  if (!test.value) return
  submitting.value = true
  submitError.value = false
  try {
    const body: SubmitBody = {
      level,
      locale: locale.value as Locale,
      startedAt: test.value.startedAt,
      token: test.value.token,
      questionIds: test.value.questions.map(q => q.id),
      answers: answers.value,
    }
    const { id } = await $fetch<{ id: string }>('/api/quiz/submit', { method: 'POST', body })
    done = true
    $track('quiz_done', { level, attemptId: id, answered: answeredCount(), total: total.value })
    await navigateTo(localePath(`/result/${id}`))
  }
  catch {
    submitError.value = true
    submitting.value = false
  }
}

// Record where people stop when they leave a test half-way
let leaveSent = false
function sendLeave() {
  if (done || leaveSent || !test.value) return
  leaveSent = true
  $track('quiz_leave', { level, answered: answeredCount(), total: total.value }, true)
}
const onPageHide = () => sendLeave()
onMounted(() => window.addEventListener('pagehide', onPageHide))
onBeforeUnmount(() => window.removeEventListener('pagehide', onPageHide))

// Warn before leaving a test half-way
onBeforeRouteLeave(() => {
  if (done || !test.value) return true
  if (answers.value.every(a => a === null) || window.confirm(t('quiz.leave'))) {
    sendLeave()
    return true
  }
  return false
})

// Keyboard: A–D or 1–4 pick an option, Enter goes on
function onKey(e: KeyboardEvent) {
  if (!question.value || submitting.value || e.ctrlKey || e.metaKey || e.altKey) return
  const letter = 'abcd'.indexOf(e.key.toLowerCase())
  const n = letter >= 0 ? letter + 1 : Number(e.key)
  if (n >= 1 && n <= question.value.options.length) choose(n - 1)
  else if (e.key === 'Enter' && chosen.value !== null && !(e.target instanceof HTMLButtonElement)) next()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

useSeoMeta({
  title: () => t('seo.levelTitle', { level: t(`levels.${level}.name`) }),
  description: () => t('seo.levelDescription', { level: t(`levels.${level}.name`), desc: t(`levels.${level}.desc`) }),
  ogTitle: () => t('seo.levelTitle', { level: t(`levels.${level}.name`) }),
  ogDescription: () => t('seo.levelDescription', { level: t(`levels.${level}.name`), desc: t(`levels.${level}.desc`) }),
})
</script>

<template>
  <div class="pt-4">
    <!-- Loading / error -->
    <div v-if="!test && !loadError" class="py-20 text-center">
      <h1 class="mb-3 text-2xl font-bold">{{ t('seo.levelTitle', { level: t(`levels.${level}.name`) }) }}</h1>
      <p class="mx-auto mb-6 max-w-lg text-sand"><BidiText :text="t(`levels.${level}.desc`)" /></p>
      <p class="text-sm text-sand/70">{{ t('quiz.loading') }}</p>
    </div>
    <div v-else-if="loadError" class="py-24 text-center">
      <p class="mb-4 text-sand">{{ t('quiz.error') }}</p>
      <button class="rounded-xl bg-caramel px-5 py-2.5 font-bold text-ink" @click="load">{{ t('quiz.retry') }}</button>
    </div>

    <template v-else-if="question">
      <!-- Progress -->
      <div class="mb-6">
        <div class="mb-2 flex items-center justify-between text-sm">
          <span class="font-semibold">{{ t('quiz.question', { current: index + 1, total }) }}</span>
          <span class="rounded-full bg-white/5 px-3 py-0.5 font-mono text-xs text-sand">
            {{ t(`levels.${level}.name`) }} · {{ t(`topics.${question.topic}`) }}
          </span>
        </div>
        <div class="h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" :aria-valuenow="index + 1" aria-valuemin="1" :aria-valuemax="total">
          <div class="h-full rounded-full bg-caramel transition-all duration-300" :style="{ width: `${((index + 1) / total) * 100}%` }" />
        </div>
      </div>

      <h1 class="mb-4 text-xl leading-relaxed font-bold sm:text-2xl"><BidiText :text="question.prompt" /></h1>

      <CodeBlock v-if="question.code" :code="question.code" :lang="question.codeLang" class="mb-5" />

      <fieldset :key="question.id" class="grid gap-3" :class="question.options.length > 2 && question.options.every(o => o.length < 18) ? 'sm:grid-cols-2' : ''">
        <legend class="sr-only">{{ question.prompt }}</legend>
        <button
          v-for="(opt, i) in question.options"
          :key="i"
          type="button"
          :aria-pressed="chosen === i"
          class="flex items-center gap-3 rounded-xl border px-4 py-3.5 text-start transition"
          :class="chosen === i
            ? 'border-caramel bg-caramel/15'
            : 'border-white/10 bg-white/[0.03] hover:border-white/30'"
          @click="choose(i)"
        >
          <span
            class="grid size-7 shrink-0 place-items-center rounded-full font-mono text-sm font-bold"
            :class="chosen === i ? 'bg-caramel text-ink' : 'bg-white/10 text-sand'"
          >{{ 'ABCD'[i] }}</span>
          <span class="min-w-0" :class="/^[\x00-\x7F]*$/.test(opt) ? 'ltr font-mono text-[15px]' : 'text-[16px]'"><BidiText :text="opt" /></span>
        </button>
      </fieldset>

      <div class="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          class="rounded-xl px-4 py-2.5 text-sm font-semibold text-sand hover:text-cream"
          :disabled="submitting"
          @click="answers[index] = null; next()"
        >
          {{ t('quiz.skip') }}
        </button>
        <button
          type="button"
          class="rounded-xl bg-caramel px-7 py-3 font-bold text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="chosen === null || submitting"
          @click="next"
        >
          {{ submitting ? t('quiz.submitting') : isLast ? t('quiz.finish') : t('quiz.next') }}
        </button>
      </div>
      <p v-if="submitError" class="mt-4 text-center text-sm text-bad" role="alert">{{ t('quiz.error') }}</p>
    </template>
  </div>
</template>
