<script setup lang="ts">
import type { Level, LevelsInfo, Locale, OpenStep, PublicQuestion, StartResponse, SubmitBody, Topic } from '#shared/types/quiz'
import { LEVELS, MAX_TIME_LIMIT_MIN, OPEN_TEST_LENGTH, QUESTION_COUNTS, TIME_PRESETS, TOPICS } from '#shared/types/quiz'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { $track } = useNuxtApp()

const param = route.params.level as string
const isOpen = param === 'open'
if (!isOpen && !LEVELS.includes(param as Level)) {
  throw createError({ statusCode: 404, statusMessage: 'Not found' })
}
const level = (isOpen ? 'mid' : param) as Level
const trackLevel = isOpen ? 'open' : level

// ── Setup ──────────────────────────────────────────────────────────────

const { data: info } = await useFetch<LevelsInfo>('/api/levels')
const levelTopics = computed(() => TOPICS.filter(tp => info.value?.[level]?.topics[tp]))

// A link can preset the test: ?topics=css,react&count=15&time=5 (minutes)
const q = route.query
const allTopics = ref(!q.topics)
const chosenTopics = ref<Topic[]>(String(q.topics ?? '').split(',').filter((x): x is Topic => TOPICS.includes(x as Topic)))
if (!chosenTopics.value.length) allTopics.value = true
const count = ref<number>(QUESTION_COUNTS.includes(Number(q.count) as never) ? Number(q.count) : 10)
const timePreset = ref<number | 'other'>(TIME_PRESETS.includes(Number(q.time) as never) ? Number(q.time) : q.time ? 'other' : 0)
const otherMinutes = ref(Math.min(MAX_TIME_LIMIT_MIN, Math.max(1, Number(q.time) || 20)))
const timeMinutes = computed(() => timePreset.value === 'other'
  ? Math.min(MAX_TIME_LIMIT_MIN, Math.max(1, Math.round(otherMinutes.value || 1)))
  : timePreset.value)

function toggleTopic(tp: Topic) {
  allTopics.value = false
  const i = chosenTopics.value.indexOf(tp)
  if (i >= 0) chosenTopics.value.splice(i, 1)
  else chosenTopics.value.push(tp)
  if (!chosenTopics.value.length) allTopics.value = true
}
function selectAll() {
  allTopics.value = true
  chosenTopics.value = []
}
const isTopicOn = (tp: Topic) => allTopics.value || chosenTopics.value.includes(tp)

// How many questions the test will really have with these topics
const available = computed(() => {
  const topics = info.value?.[level]?.topics ?? {}
  return allTopics.value
    ? info.value?.[level]?.total ?? count.value
    : chosenTopics.value.reduce((n, tp) => n + (topics[tp] ?? 0), 0)
})
const plannedCount = computed(() => isOpen ? OPEN_TEST_LENGTH : Math.min(count.value, available.value))
const fmtLimit = (min: number) => (min ? t('setup.min', { n: min }) : t('setup.noLimit'))

// ── Test state ─────────────────────────────────────────────────────────

const phase = ref<'setup' | 'test'>('setup')
const starting = ref(false)
const loadError = ref(false)
const submitting = ref(false)
const submitError = ref(false)
const timeUp = ref(false)
let done = false // set once the result is saved, so leaving the page does not warn

// Level / custom test: all questions arrive at once
const test = ref<StartResponse | null>(null)
const answers = ref<(number | null)[]>([])
// Open test: one question at a time, the next depends on the answer
const step = ref<OpenStep | null>(null)
const openChosen = ref<number | null>(null)

const index = ref(0)
const question = computed<PublicQuestion | undefined>(() => isOpen ? step.value?.question : test.value?.questions[index.value])
const total = computed(() => isOpen ? step.value?.total ?? OPEN_TEST_LENGTH : test.value?.questions.length ?? 0)
const isLast = computed(() => index.value === total.value - 1)
const chosen = computed(() => isOpen ? openChosen.value : answers.value[index.value] ?? null)
const answeredCount = () => isOpen ? index.value + (openChosen.value !== null ? 1 : 0) : answers.value.filter(a => a !== null).length

// Timer
const timeLimit = ref(0) // seconds
const deadline = ref(0)
const now = ref(Date.now())
let ticker: ReturnType<typeof setInterval> | undefined
const remaining = computed(() => Math.max(0, Math.ceil((deadline.value - now.value) / 1000)))
const remainingText = computed(() => `${Math.floor(remaining.value / 60)}:${String(remaining.value % 60).padStart(2, '0')}`)
const lowTime = computed(() => timeLimit.value > 0 && remaining.value <= Math.min(30, timeLimit.value / 5))

function startTimer(seconds: number) {
  timeLimit.value = seconds
  if (!seconds) return
  deadline.value = Date.now() + seconds * 1000
  ticker = setInterval(() => {
    now.value = Date.now()
    if (remaining.value <= 0 && !done && !timeUp.value) onTimeUp()
  }, 250)
}
onBeforeUnmount(() => clearInterval(ticker))

async function onTimeUp() {
  timeUp.value = true
  clearInterval(ticker)
  if (isOpen) await sendOpenAnswer(true)
  else await submit()
}

async function start() {
  starting.value = true
  loadError.value = false
  const seconds = timeMinutes.value * 60
  try {
    if (isOpen) {
      step.value = await $fetch<OpenStep>('/api/quiz/open/start', { method: 'POST', body: { locale: locale.value, time: seconds } })
      openChosen.value = null
      index.value = 0
    }
    else {
      test.value = await $fetch<StartResponse>('/api/quiz/start', {
        query: {
          level,
          locale: locale.value,
          topics: allTopics.value ? undefined : chosenTopics.value.join(','),
          count: count.value,
          time: seconds,
        },
      })
      answers.value = test.value.questions.map(() => null)
      index.value = 0
    }
    phase.value = 'test'
    startTimer(seconds)
    window.scrollTo({ top: 0 })
    $track('quiz_start', { level: trackLevel, total: total.value })
  }
  catch {
    loadError.value = true
  }
  finally {
    starting.value = false
  }
}

function choose(i: number) {
  if (submitting.value || timeUp.value) return
  const first = chosen.value === null
  if (isOpen) openChosen.value = i
  else answers.value[index.value] = i
  if (first) $track('quiz_progress', { level: trackLevel, answered: answeredCount(), total: total.value })
}

async function next() {
  if (isOpen) return sendOpenAnswer(false)
  if (!isLast.value) {
    index.value++
    return
  }
  await submit()
}

function skip() {
  if (isOpen) openChosen.value = null
  else answers.value[index.value] = null
  next()
}

async function finished(id: string) {
  done = true
  clearInterval(ticker)
  $track('quiz_done', { level: trackLevel, attemptId: id, answered: answeredCount(), total: total.value })
  await navigateTo(localePath(`/result/${id}`))
}

async function submit() {
  if (!test.value || submitting.value) return
  submitting.value = true
  submitError.value = false
  try {
    const body: SubmitBody = {
      mode: test.value.mode,
      level,
      locale: locale.value as Locale,
      timeLimit: test.value.timeLimit,
      startedAt: test.value.startedAt,
      token: test.value.token,
      questionIds: test.value.questions.map(x => x.id),
      answers: answers.value,
    }
    const { id } = await $fetch<{ id: string }>('/api/quiz/submit', { method: 'POST', body })
    await finished(id)
  }
  catch {
    submitError.value = true
    submitting.value = false
  }
}

async function sendOpenAnswer(finish: boolean) {
  if (!step.value || submitting.value) return
  submitting.value = true
  submitError.value = false
  try {
    const res = await $fetch<OpenStep | { id: string }>('/api/quiz/open/answer', {
      method: 'POST',
      body: { state: step.value.state, token: step.value.token, locale: locale.value, answer: openChosen.value, finish },
    })
    if ('id' in res) return await finished(res.id)
    step.value = res
    index.value = res.index
    openChosen.value = null
    submitting.value = false
    // Time ran out while this answer was on its way: end the test now
    if (timeUp.value) await sendOpenAnswer(true)
  }
  catch {
    submitError.value = true
    submitting.value = false
  }
}

function endNow() {
  if (window.confirm(t('quiz.endConfirm'))) {
    if (isOpen) sendOpenAnswer(true)
    else submit()
  }
}

// Record where people stop when they leave a test half-way
let leaveSent = false
function sendLeave() {
  if (done || leaveSent || phase.value !== 'test') return
  leaveSent = true
  $track('quiz_leave', { level: trackLevel, answered: answeredCount(), total: total.value }, true)
}
const onPageHide = () => sendLeave()
onMounted(() => window.addEventListener('pagehide', onPageHide))
onBeforeUnmount(() => window.removeEventListener('pagehide', onPageHide))

// Warn before leaving a test half-way
onBeforeRouteLeave(() => {
  if (done || phase.value !== 'test') return true
  if (answeredCount() === 0 || window.confirm(t('quiz.leave'))) {
    sendLeave()
    return true
  }
  return false
})

// Keyboard: A–D or 1–4 pick an option, Enter goes on
function onKey(e: KeyboardEvent) {
  if (phase.value !== 'test' || !question.value || submitting.value || e.ctrlKey || e.metaKey || e.altKey) return
  if (e.target instanceof HTMLInputElement) return
  const letter = 'abcd'.indexOf(e.key.toLowerCase())
  const n = letter >= 0 ? letter + 1 : Number(e.key)
  if (n >= 1 && n <= question.value.options.length) choose(n - 1)
  else if (e.key === 'Enter' && chosen.value !== null && !(e.target instanceof HTMLButtonElement)) next()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

const levelName = computed(() => t(`levels.${trackLevel}.name`))
const pageTitle = computed(() => isOpen ? `${levelName.value} · ${t('seo.title')}` : t('seo.levelTitle', { level: levelName.value }))
const pageDesc = computed(() => isOpen
  ? t('levels.open.desc')
  : t('seo.levelDescription', { level: levelName.value, desc: t(`levels.${level}.desc`) }))
useSeoMeta({ title: pageTitle, description: pageDesc, ogTitle: pageTitle, ogDescription: pageDesc })

const segBtn = (on: boolean) => on
  ? 'border-caramel bg-caramel/15 text-cream'
  : 'border-white/10 bg-white/[0.03] text-sand hover:border-white/30 hover:text-cream'
</script>

<template>
  <div class="pt-4">
    <!-- ── Setup ── -->
    <section v-if="phase === 'setup'" class="setup-in mx-auto max-w-2xl">
      <span class="mb-3 inline-block rounded-full bg-white/5 px-3 py-1 font-mono text-sm font-bold text-caramel">{{ levelName }}</span>
      <h1 class="mb-2 text-2xl leading-snug font-bold sm:text-3xl">{{ isOpen ? levelName : t('seo.levelTitle', { level: levelName }) }}</h1>
      <p class="mb-8 text-sand"><BidiText :text="t(isOpen ? 'levels.open.desc' : `levels.${level}.desc`)" /></p>

      <div class="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <h2 class="text-lg font-bold">{{ t('setup.title') }}</h2>

        <!-- Open test: how it works -->
        <ul v-if="isOpen" class="grid gap-2.5 text-[15px] text-cream/90">
          <li v-for="k in ['how1', 'how2', 'how3']" :key="k" class="flex gap-2.5">
            <span class="mt-2 size-1.5 shrink-0 rounded-full bg-caramel" /><BidiText :text="t(`setup.${k}`)" />
          </li>
        </ul>

        <!-- Topics -->
        <div v-else>
          <div class="mb-2.5 flex items-baseline justify-between gap-2">
            <h3 class="text-sm font-bold text-sand">{{ t('setup.topics') }}</h3>
            <span v-if="!allTopics" class="rounded bg-caramel/15 px-2 py-0.5 text-xs font-semibold text-caramel">{{ t('setup.custom') }}</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="chip" :class="segBtn(allTopics)" :aria-pressed="allTopics" @click="selectAll">
              {{ t('setup.allTopics') }}
            </button>
            <button
              v-for="tp in levelTopics" :key="tp" type="button" class="chip"
              :class="segBtn(!allTopics && isTopicOn(tp))" :aria-pressed="!allTopics && isTopicOn(tp)"
              @click="toggleTopic(tp)"
            >
              {{ t(`topics.${tp}`) }}
            </button>
          </div>
          <p class="mt-2 text-xs text-sand/80">{{ t('setup.pickHint') }}</p>
        </div>

        <!-- Count -->
        <div v-if="!isOpen">
          <h3 class="mb-2.5 text-sm font-bold text-sand">{{ t('setup.count') }}</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="n in QUESTION_COUNTS" :key="n" type="button" class="chip min-w-14 font-mono"
              :class="segBtn(count === n)" :aria-pressed="count === n" @click="count = n"
            >{{ n }}</button>
          </div>
          <Transition name="fade">
            <p v-if="available < count" class="mt-2 text-xs text-caramel">{{ t('setup.fewer', { n: plannedCount }) }}</p>
          </Transition>
        </div>

        <!-- Time -->
        <div>
          <h3 class="mb-2.5 text-sm font-bold text-sand">{{ t('setup.time') }}</h3>
          <div class="flex flex-wrap items-center gap-2">
            <button
              v-for="m in TIME_PRESETS" :key="m" type="button" class="chip"
              :class="segBtn(timePreset === m)" :aria-pressed="timePreset === m" @click="timePreset = m"
            >{{ fmtLimit(m) }}</button>
            <button type="button" class="chip" :class="segBtn(timePreset === 'other')" :aria-pressed="timePreset === 'other'" @click="timePreset = 'other'">
              {{ t('setup.other') }}
            </button>
            <Transition name="fade">
              <label v-if="timePreset === 'other'" class="flex items-center gap-2 text-sm text-sand">
                <input
                  v-model.number="otherMinutes" type="number" min="1" :max="MAX_TIME_LIMIT_MIN" inputmode="numeric"
                  class="w-20 rounded-xl border border-white/15 bg-ink-2 px-3 py-2 text-center font-mono text-cream focus:border-caramel focus:outline-none"
                >
                {{ t('setup.minutes') }}
              </label>
            </Transition>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <p class="text-sm text-sand">{{ t('setup.summary', { n: plannedCount, time: fmtLimit(timeMinutes) }) }}</p>
          <button
            type="button"
            class="rounded-xl bg-caramel px-7 py-3 font-bold text-ink transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            :disabled="starting || plannedCount === 0"
            @click="start"
          >
            {{ starting ? t('quiz.loading') : t('setup.start') }}
          </button>
        </div>
        <p v-if="loadError" class="text-center text-sm text-bad" role="alert">{{ t('quiz.error') }}</p>
      </div>
    </section>

    <!-- ── Test ── -->
    <template v-else-if="question">
      <!-- Progress + timer -->
      <div class="mb-6">
        <div class="mb-2 flex items-center justify-between gap-3 text-sm">
          <span class="font-semibold">{{ t('quiz.question', { current: index + 1, total }) }}</span>
          <div class="flex items-center gap-2">
            <span class="rounded-full bg-white/5 px-3 py-0.5 font-mono text-xs text-sand">
              {{ levelName }} · {{ t(`topics.${question.topic}`) }}
            </span>
            <span
              v-if="timeLimit"
              class="flex items-center gap-1.5 rounded-full px-3 py-0.5 font-mono text-xs font-bold tabular-nums transition-colors"
              :class="lowTime ? 'timer-low bg-bad/20 text-bad' : 'bg-white/5 text-cream'"
              role="timer" :aria-label="t('quiz.timeLeft')" dir="ltr"
            >
              <svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9 2h6" stroke-linecap="round" /></svg>
              {{ remainingText }}
            </span>
          </div>
        </div>
        <div class="h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" :aria-valuenow="index + 1" aria-valuemin="1" :aria-valuemax="total">
          <div class="h-full rounded-full bg-caramel transition-all duration-500 ease-out" :style="{ width: `${((index + 1) / total) * 100}%` }" />
        </div>
        <div v-if="timeLimit" class="mt-1 h-0.5 overflow-hidden rounded-full bg-white/5">
          <div class="h-full rounded-full transition-[width] duration-300 ease-linear" :class="lowTime ? 'bg-bad' : 'bg-sand/50'" :style="{ width: `${(remaining / timeLimit) * 100}%` }" />
        </div>
      </div>

      <Transition name="q" mode="out-in">
        <div :key="question.id">
          <h1 class="mb-4 text-xl leading-relaxed font-bold sm:text-2xl"><BidiText :text="question.prompt" /></h1>

          <CodeBlock v-if="question.code" :code="question.code" :lang="question.codeLang" class="mb-5" />

          <fieldset class="grid gap-3" :class="question.options.length > 2 && question.options.every(o => o.length < 18) ? 'sm:grid-cols-2' : ''">
            <legend class="sr-only">{{ question.prompt }}</legend>
            <button
              v-for="(opt, i) in question.options"
              :key="i"
              type="button"
              :aria-pressed="chosen === i"
              class="opt-in flex items-center gap-3 rounded-xl border px-4 py-3.5 text-start transition duration-200 active:scale-[0.99]"
              :style="{ animationDelay: `${80 + i * 55}ms` }"
              :class="chosen === i
                ? 'border-caramel bg-caramel/15 shadow-[0_0_0_1px_var(--color-caramel)]'
                : 'border-white/10 bg-white/[0.03] hover:-translate-y-px hover:border-white/30'"
              @click="choose(i)"
            >
              <span
                :key="chosen === i ? 'on' : 'off'"
                class="grid size-7 shrink-0 place-items-center rounded-full font-mono text-sm font-bold"
                :class="chosen === i ? 'pop bg-caramel text-ink' : 'bg-white/10 text-sand'"
              >{{ 'ABCD'[i] }}</span>
              <span class="min-w-0" :class="/^[\x00-\x7F]*$/.test(opt) ? 'ltr font-mono text-[15px]' : 'text-[16px]'"><BidiText :text="opt" /></span>
            </button>
          </fieldset>
        </div>
      </Transition>

      <div class="mt-8 flex items-center justify-between gap-3">
        <div class="flex items-center gap-1">
          <button type="button" class="rounded-xl px-4 py-2.5 text-sm font-semibold text-sand hover:text-cream" :disabled="submitting" @click="skip">
            {{ t('quiz.skip') }}
          </button>
          <button
            v-if="isOpen || timeLimit"
            type="button" class="rounded-xl px-3 py-2.5 text-sm text-sand/70 hover:text-cream" :disabled="submitting" @click="endNow"
          >
            {{ t('quiz.endNow') }}
          </button>
        </div>
        <button
          type="button"
          class="rounded-xl bg-caramel px-7 py-3 font-bold text-ink transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="chosen === null || submitting"
          @click="next"
        >
          {{ submitting && (isLast || timeUp) ? t('quiz.submitting') : isLast ? t('quiz.finish') : t('quiz.next') }}
        </button>
      </div>
      <Transition name="fade">
        <p v-if="timeUp" class="mt-4 text-center text-sm font-semibold text-caramel" role="status">{{ t('quiz.timeUp') }}</p>
      </Transition>
      <p v-if="submitError" class="mt-4 text-center text-sm text-bad" role="alert">
        {{ t('quiz.error') }}
        <button type="button" class="ms-2 underline" @click="isOpen ? sendOpenAnswer(timeUp) : submit()">{{ t('quiz.retry') }}</button>
      </p>
    </template>
  </div>
</template>
