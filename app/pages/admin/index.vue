<script setup lang="ts">
definePageMeta({ middleware: 'admin' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { data: s } = await useFetch('/api/admin/stats', { headers: useRequestHeaders(['cookie']) })

const maxDaily = computed(() => Math.max(1, ...(s.value?.daily.map(d => d.count) ?? [1])))
const fmtTime = (ms: number) => {
  const sec = Math.round(ms / 1000)
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
}
const fmtDate = (ts: number) => new Date(ts).toLocaleString(locale.value, { dateStyle: 'short', timeStyle: 'short' })

useHead({ title: () => `${t('admin.title')} · PromptjiCode Interview`, meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="pt-2">
    <AdminNav />

    <template v-if="s">
      <!-- Totals -->
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div v-for="card in [
          { label: t('admin.totalAttempts'), value: s.total },
          { label: t('admin.lastWeek'), value: s.week },
          { label: t('admin.avgScore'), value: s.avgPct == null ? '–' : `${s.avgPct}%` },
          { label: t('admin.avgTime'), value: s.avgSeconds == null ? '–' : fmtTime(s.avgSeconds * 1000) },
        ]" :key="card.label" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div class="text-sm text-sand">{{ card.label }}</div>
          <div class="mt-1 font-mono text-2xl font-bold" dir="ltr">{{ card.value }}</div>
        </div>
      </div>

      <!-- Daily -->
      <section class="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h2 class="mb-4 font-bold">{{ t('admin.last14') }}</h2>
        <div class="flex h-32 items-end gap-1.5" dir="ltr">
          <div v-for="d in s.daily" :key="d.date" class="group relative flex flex-1 flex-col items-center justify-end">
            <span class="mb-1 font-mono text-[10px] text-sand opacity-0 group-hover:opacity-100">{{ d.count }}</span>
            <div class="w-full rounded-t bg-caramel/80" :style="{ height: `${(d.count / maxDaily) * 100}%`, minHeight: d.count ? '4px' : '1px' }" :title="`${d.date}: ${d.count}`" />
          </div>
        </div>
        <div class="mt-2 flex justify-between font-mono text-[10px] text-sand" dir="ltr">
          <span>{{ s.daily[0]?.date.slice(5) }}</span><span>{{ s.daily.at(-1)?.date.slice(5) }}</span>
        </div>
      </section>

      <!-- By level / language -->
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <section class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 class="mb-3 font-bold">{{ t('admin.perLevel') }}</h2>
          <p v-if="!s.byLevel.length" class="text-sm text-sand">{{ t('admin.noData') }}</p>
          <ul class="grid gap-2">
            <li v-for="l in s.byLevel" :key="`${l.track}-${l.level}`" class="flex items-center justify-between gap-3 text-sm">
              <span class="font-mono">{{ t(`tracks.${l.track}.name`) }} · {{ t(`levels.${l.level}.name`) }}</span>
              <span class="text-sand">{{ t('admin.attempts', { n: l.count }) }} · <span dir="ltr" class="font-mono text-cream">{{ l.avgPct }}%</span></span>
            </li>
          </ul>
        </section>
        <section class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 class="mb-3 font-bold">{{ t('admin.perLanguage') }}</h2>
          <p v-if="!s.byLocale.length" class="text-sm text-sand">{{ t('admin.noData') }}</p>
          <ul class="grid gap-2">
            <li v-for="l in s.byLocale" :key="l.locale" class="flex items-center justify-between text-sm">
              <span class="font-mono uppercase">{{ l.locale }}</span>
              <span class="text-sand">{{ t('admin.attempts', { n: l.n }) }}</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Recent -->
      <section class="mt-6">
        <h2 class="mb-3 font-bold">{{ t('admin.recent') }}</h2>
        <p v-if="!s.recent.length" class="text-sm text-sand">{{ t('admin.empty') }}</p>
        <div v-else class="overflow-x-auto rounded-2xl border border-white/10">
          <table class="w-full text-sm">
            <thead class="bg-white/5 text-sand">
              <tr>
                <th class="px-3 py-2 text-start font-semibold">{{ t('admin.when') }}</th>
                <th class="px-3 py-2 text-start font-semibold">{{ t('admin.level') }}</th>
                <th class="px-3 py-2 text-start font-semibold">{{ t('admin.lang') }}</th>
                <th class="px-3 py-2 text-start font-semibold">{{ t('admin.score') }}</th>
                <th class="px-3 py-2 text-start font-semibold">{{ t('admin.duration') }}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in s.recent" :key="r.id" class="border-t border-white/5">
                <td class="px-3 py-2 whitespace-nowrap text-sand">{{ fmtDate(r.created_at) }}</td>
                <td class="px-3 py-2 font-mono">
                  <span class="text-sand">{{ t(`tracks.${r.track}.name`) }} ·</span>
                  {{ r.mode === 'open' ? `${t('levels.open.name')} → ${t(`levels.${r.level}.name`)}` : t(`levels.${r.level}.name`) }}
                  <span v-if="r.mode === 'custom'" class="ms-1 rounded bg-white/10 px-1.5 text-[11px] text-sand">{{ t('setup.custom') }}</span>
                  <span v-if="r.time_limit" class="ms-1 text-[11px] text-sand">⏱ {{ r.time_limit / 60 }}m</span>
                </td>
                <td class="px-3 py-2 font-mono uppercase">{{ r.locale }}</td>
                <td class="px-3 py-2 font-mono" dir="ltr">{{ r.score }}/{{ r.total }}</td>
                <td class="px-3 py-2 font-mono" dir="ltr">{{ fmtTime(r.duration_ms) }}</td>
                <td class="px-3 py-2 text-end">
                  <NuxtLink :to="localePath(`/result/${r.id}`)" class="text-caramel hover:underline">{{ t('admin.view') }}</NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </div>
</template>
