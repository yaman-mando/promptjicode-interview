<script setup lang="ts">
import { LEVELS } from '#shared/types/quiz'

const { t } = useI18n()
const localePath = useLocalePath()
const { data: counts } = await useFetch('/api/levels')

const badge: Record<string, string> = {
  junior: 'bg-good/15 text-good',
  mid: 'bg-caramel/15 text-caramel',
  senior: 'bg-bad/15 text-bad',
}
</script>

<template>
  <section class="pt-8 pb-10 text-center sm:pt-14">
    <p class="mb-4 font-mono text-sm text-sand/70" dir="ltr">// are you ready for the interview?</p>
    <h1 class="text-4xl leading-tight font-extrabold sm:text-5xl" dir="ltr">
      Promptji<span class="text-caramel">Code</span> Interview
    </h1>
    <p class="mx-auto mt-4 max-w-xl text-lg text-sand"><BidiText :text="t('tagline')" /></p>
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
      <p class="mt-4 text-sm text-sand">{{ t('questionsCount', { n: counts?.[level] ?? '…' }) }}</p>
      <span class="mt-4 rounded-xl bg-caramel py-2.5 text-center font-bold text-ink transition group-hover:brightness-110">
        {{ t('start') }}
      </span>
    </NuxtLink>
  </div>

  <div class="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-dashed border-white/15 p-5 opacity-80">
    <div>
      <h3 class="font-bold">{{ t('openTest.title') }}</h3>
      <p class="text-sm text-sand">{{ t('openTest.desc') }}</p>
    </div>
    <span class="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sand">{{ t('openTest.soon') }}</span>
  </div>
</template>
