<script setup lang="ts">
definePageMeta({ middleware: 'admin' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const status = ref<'new' | 'done'>('new')
const { data, refresh } = await useFetch('/api/admin/reports', {
  query: { status },
  headers: useRequestHeaders(['cookie']),
})

async function setStatus(id: number, s: 'new' | 'done') {
  await $fetch(`/api/admin/reports/${id}`, { method: 'POST', body: { status: s } })
  await refresh()
}

const fmtDate = (ts: number) => new Date(ts).toLocaleString('sv-SE', { timeZone: 'Europe/Istanbul' }).slice(0, 16)
useHead({ title: () => `${t('admin.reports')} · PromptjiCode Interview`, meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="pt-2">
    <AdminNav />

    <div class="mb-5 flex gap-2">
      <button
        v-for="s in (['new', 'done'] as const)" :key="s" type="button"
        class="rounded-lg px-3 py-1.5 text-sm font-semibold transition"
        :class="status === s ? 'bg-caramel text-ink' : 'bg-white/5 text-sand hover:text-cream'"
        @click="status = s"
      >
        {{ t(`admin.reportStatus.${s}`) }}
        <span class="ms-1 font-mono opacity-70">{{ data?.counts[s] ?? 0 }}</span>
      </button>
    </div>

    <p v-if="!data?.reports.length" class="py-12 text-center text-sand">{{ t('admin.noReports') }}</p>

    <ul class="grid gap-3">
      <li v-for="r in data?.reports" :key="r.id" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div class="mb-2 flex flex-wrap items-center gap-2 text-xs">
          <span class="rounded-full bg-bad/15 px-2.5 py-0.5 font-semibold text-bad">{{ t(`report.types.${r.type}`) }}</span>
          <span v-if="r.track" class="rounded-full bg-white/5 px-2.5 py-0.5 text-sand">{{ t(`tracks.${r.track}.name`) }}</span>
          <span v-if="r.level" class="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-sand">{{ t(`levels.${r.level}.name`) }}</span>
          <span v-if="r.topic" class="rounded-full bg-white/5 px-2.5 py-0.5 text-sand">{{ t(`topics.${r.topic}`) }}</span>
          <span class="font-mono text-sand/70" dir="ltr">{{ r.questionId }}</span>
          <span class="ms-auto font-mono text-sand/70" dir="ltr">{{ fmtDate(r.createdAt) }} · {{ (r.locale || '').toUpperCase() }}</span>
        </div>
        <p v-if="r.prompt" class="mb-2 font-semibold"><BidiText :text="r.prompt" /></p>
        <p v-if="r.note" class="mb-2 rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-[15px] whitespace-pre-line text-cream/90">{{ r.note }}</p>
        <div class="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span class="text-sand">{{ r.name || t('admin.anonymous') }}</span>
          <div class="flex gap-2">
            <NuxtLink :to="localePath({ path: '/admin/questions', query: { q: r.questionId } })" class="rounded-lg px-3 py-1.5 text-caramel hover:bg-white/5">{{ t('admin.openQuestion') }}</NuxtLink>
            <button
              type="button" class="rounded-lg px-3 py-1.5 font-semibold"
              :class="r.status === 'new' ? 'bg-good/15 text-good hover:bg-good/25' : 'bg-white/5 text-sand hover:text-cream'"
              @click="setStatus(r.id, r.status === 'new' ? 'done' : 'new')"
            >{{ r.status === 'new' ? t('admin.markDone') : t('admin.markNew') }}</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
