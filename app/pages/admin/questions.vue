<script setup lang="ts">
import type { Level, Locale, Question, Topic } from '#shared/types/quiz'
import { LEVELS, LOCALES } from '#shared/types/quiz'

definePageMeta({ middleware: 'admin' })

type Row = Question & { stats: { shown: number, correct: number, skipped: number, picks: number[] } }

const { t, locale } = useI18n()
const { data: questions } = await useFetch<Row[]>('/api/admin/questions', { headers: useRequestHeaders(['cookie']) })

const search = ref('')
const level = ref<Level | ''>('')
const topic = ref<Topic | ''>('')
const sort = ref<'hardest' | 'shown' | 'id'>('id')
const open = ref<string | null>(null)

const topics = computed(() => [...new Set(questions.value?.map(q => q.topic))].sort())
const loc = computed(() => locale.value as Locale)
const pct = (q: Row) => q.stats.shown ? Math.round((q.stats.correct / q.stats.shown) * 100) : null
const optionsOf = (q: Row, l: Locale) => q.text[l].options ?? q.options ?? []

const list = computed(() => {
  const s = search.value.trim().toLowerCase()
  const out = (questions.value ?? []).filter(q =>
    (!level.value || q.level === level.value)
    && (!topic.value || q.topic === topic.value)
    && (!s || q.id.toLowerCase().includes(s) || q.text[loc.value].prompt.toLowerCase().includes(s) || (q.code ?? '').toLowerCase().includes(s)),
  )
  if (sort.value === 'hardest') out.sort((a, b) => (pct(a) ?? 101) - (pct(b) ?? 101))
  else if (sort.value === 'shown') out.sort((a, b) => b.stats.shown - a.stats.shown)
  return out
})

const countByLevel = computed(() => Object.fromEntries(LEVELS.map(l => [l, questions.value?.filter(q => q.level === l).length ?? 0])))

useHead({ title: () => `${t('admin.questions')} · PromptjiCode Interview`, meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="pt-2">
    <AdminNav />

    <!-- Counts -->
    <p class="mb-4 text-sm text-sand">
      {{ t('admin.count', { n: questions?.length ?? 0 }) }}:
      <span v-for="l in LEVELS" :key="l" class="ms-2 font-mono text-cream">{{ t(`levels.${l}.name`) }} {{ countByLevel[l] }}</span>
    </p>

    <!-- Filters -->
    <div class="mb-4 grid gap-2 sm:grid-cols-[1fr_auto_auto_auto]">
      <input v-model="search" type="search" :placeholder="t('admin.search')" class="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none focus:border-caramel">
      <select v-model="level" class="rounded-xl border border-white/15 bg-ink-2 px-3 py-2 text-sm">
        <option value="">{{ t('admin.allLevels') }}</option>
        <option v-for="l in LEVELS" :key="l" :value="l">{{ t(`levels.${l}.name`) }}</option>
      </select>
      <select v-model="topic" class="rounded-xl border border-white/15 bg-ink-2 px-3 py-2 text-sm">
        <option value="">{{ t('admin.allTopics') }}</option>
        <option v-for="tp in topics" :key="tp" :value="tp">{{ t(`topics.${tp}`) }}</option>
      </select>
      <select v-model="sort" class="rounded-xl border border-white/15 bg-ink-2 px-3 py-2 text-sm">
        <option value="id">{{ t('admin.sortId') }}</option>
        <option value="hardest">{{ t('admin.sortHardest') }}</option>
        <option value="shown">{{ t('admin.sortMostShown') }}</option>
      </select>
    </div>

    <p class="mb-2 text-xs text-sand">{{ t('admin.count', { n: list.length }) }}</p>

    <!-- List -->
    <ul class="grid gap-2">
      <li v-for="q in list" :key="q.id" class="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
        <button type="button" class="flex w-full items-center gap-3 px-4 py-3 text-start hover:bg-white/[0.03]" :aria-expanded="open === q.id" @click="open = open === q.id ? null : q.id">
          <span class="w-14 shrink-0 font-mono text-xs text-sand">{{ t(`levels.${q.level}.name`) }}</span>
          <span class="w-24 shrink-0 font-mono text-xs text-caramel">{{ t(`topics.${q.topic}`) }}</span>
          <span class="min-w-0 flex-1 truncate text-sm"><BidiText :text="q.text[loc].prompt" /> <span class="font-mono text-xs text-sand/60" dir="ltr">{{ q.id }}</span></span>
          <span class="shrink-0 text-end font-mono text-xs" dir="ltr">
            <template v-if="q.stats.shown">
              <span :class="pct(q)! >= 70 ? 'text-good' : pct(q)! >= 40 ? 'text-caramel' : 'text-bad'">{{ pct(q) }}%</span>
              <span class="text-sand"> · {{ q.stats.shown }}</span>
            </template>
            <span v-else class="text-sand/50">–</span>
          </span>
        </button>

        <div v-if="open === q.id" class="border-t border-white/10 p-4">
          <CodeBlock v-if="q.code" :code="q.code" :lang="q.codeLang" class="mb-4" />

          <p class="mb-2 text-sm font-semibold text-sand">{{ t('admin.picks') }}</p>
          <ol class="mb-4 grid gap-1.5">
            <li v-for="(opt, i) in optionsOf(q, loc)" :key="i" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm" :class="i === q.answer ? 'bg-good/15 text-good' : 'bg-white/[0.03]'">
              <span class="font-mono font-bold">{{ 'ABCD'[i] }}</span>
              <span class="min-w-0 flex-1"><BidiText :text="opt" /></span>
              <span class="font-mono text-xs text-sand" dir="ltr">{{ q.stats.picks[i] ?? 0 }}</span>
            </li>
          </ol>
          <p class="mb-4 font-mono text-xs text-sand" dir="ltr">{{ t('admin.shown') }} {{ q.stats.shown }} · {{ t('admin.correctPct') }} {{ q.stats.correct }} · {{ t('admin.skipped') }} {{ q.stats.skipped }}</p>

          <div class="grid gap-3">
            <div v-for="l in LOCALES" :key="l" class="rounded-lg bg-white/[0.04] p-3" :dir="l === 'ar' ? 'rtl' : 'ltr'" :lang="l">
              <p class="mb-1 font-mono text-xs text-caramel uppercase">{{ l }}</p>
              <p class="mb-1 text-sm font-bold"><BidiText :text="q.text[l].prompt" /></p>
              <p class="text-sm leading-relaxed text-cream/85"><BidiText :text="q.text[l].explanation" /></p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
