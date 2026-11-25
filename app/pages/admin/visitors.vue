<script setup lang="ts">
definePageMeta({ middleware: 'admin' })

const { t, locale } = useI18n()
const localePath = useLocalePath()
const days = ref(7)
const scope = ref<'interview' | 'main' | 'yaman' | 'menu'>('interview')
const isQuizSite = computed(() => scope.value === 'interview')
const { data: a, refresh, pending } = await useFetch('/api/admin/analytics', {
  query: { days, scope },
  headers: useRequestHeaders(['cookie']),
})

// Refresh every minute so "online now" stays current
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => { timer = setInterval(() => refresh(), 60_000) })
onBeforeUnmount(() => clearInterval(timer))

const regionNames = computed(() => {
  try { return new Intl.DisplayNames([locale.value], { type: 'region' }) }
  catch { return null }
})
const flag = (cc: string | null) =>
  cc && /^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(...[...cc].map(c => 0x1F1E6 + c.charCodeAt(0) - 65)) : '🌐'
const countryName = (cc: string | null) => {
  if (!cc || cc === 'XX' || cc === 'T1') return t('admin.unknown')
  try { return regionNames.value?.of(cc) ?? cc }
  catch { return cc }
}
// Click labels sent by promptjicode.com and the menu calculator: email, whatsapp, service:<id>, calc:save, card:tr…
const has = (key: string) => t(key) !== key
const clickLabel = (k: string) => {
  const [kind = '', id] = k.split(':')
  if (id && has(`admin.clickKinds.${kind}_${id}`)) return t(`admin.clickKinds.${kind}_${id}`)
  const name = has(`admin.clickKinds.${kind}`) ? t(`admin.clickKinds.${kind}`) : kind
  return id ? `${name}: ${id}` : name
}
const pct = (x: number, y: number) => (y ? Math.round((x / y) * 100) : 0)
const fmtDur = (sec: number) => {
  if (sec < 60) return `${sec}s`
  const m = Math.floor(sec / 60)
  return m < 60 ? `${m}m ${String(sec % 60).padStart(2, '0')}s` : `${Math.floor(m / 60)}h ${m % 60}m`
}
// Fixed numeric format (Türkiye time) so it reads the same in every language
const fmtDate = (ts: number) => new Date(ts).toLocaleString('sv-SE', { timeZone: 'Europe/Istanbul' }).slice(5, 16)

const totals = computed(() => {
  const l = a.value?.quiz.levels ?? {}
  return Object.values(l).reduce((acc, v) => ({
    started: acc.started + v.started, done: acc.done + v.done, left: acc.left + v.left,
  }), { started: 0, done: 0, left: 0 })
})

const maxDaily = computed(() => Math.max(1, ...(a.value?.daily.map(d => d.visitors) ?? [1])))
const maxHour = computed(() => Math.max(1, ...(a.value?.hours ?? [1])))

// Group stop points into quarters of the test
const stopBuckets = computed(() => {
  const b = [0, 0, 0, 0, 0] // 0 answers, <25%, <50%, <75%, >=75%
  for (const s of a.value?.quiz.stops ?? []) {
    if (!s.answered) b[0]! += s.count
    else {
      const r = s.total ? s.answered / s.total : 0
      b[r < 0.25 ? 1 : r < 0.5 ? 2 : r < 0.75 ? 3 : 4]! += s.count
    }
  }
  return b
})
const stopMax = computed(() => Math.max(1, ...stopBuckets.value))

const sections = computed(() => a.value ? [
  { title: t('admin.devices'), rows: a.value.devices, label: (k: string) => t(`admin.device.${k || 'desktop'}`) },
  { title: t('admin.browsers'), rows: a.value.browsers, label: (k: string) => k || t('admin.unknown') },
  { title: t('admin.systems'), rows: a.value.os, label: (k: string) => k || t('admin.unknown') },
  { title: t('admin.languages'), rows: a.value.locales, label: (k: string) => k.toUpperCase() || t('admin.unknown') },
] : [])

useHead({ title: () => `${t('admin.visitors')} · PromptjiCode Interview`, meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="pt-2">
    <AdminNav />

    <!-- Which site -->
    <div class="mb-3 inline-flex flex-wrap gap-1 rounded-xl bg-white/5 p-1">
      <button
        v-for="sc in (['interview', 'main', 'yaman', 'menu'] as const)" :key="sc" type="button"
        class="rounded-lg px-3 py-1.5 text-sm font-semibold transition"
        :class="scope === sc ? 'bg-cream text-ink' : 'text-sand hover:text-cream'"
        @click="scope = sc"
      >{{ t(`admin.scope.${sc}`) }}</button>
    </div>

    <div class="mb-5 flex flex-wrap items-center gap-2">
      <button
        v-for="d in [1, 7, 30, 90]" :key="d" type="button"
        class="rounded-lg px-3 py-1.5 text-sm font-semibold transition"
        :class="days === d ? 'bg-caramel text-ink' : 'bg-white/5 text-sand hover:text-cream'"
        @click="days = d"
      >{{ d === 1 ? t('admin.today') : t('admin.lastDays', { n: d }) }}</button>
      <span v-if="a" class="ms-auto flex items-center gap-2 text-sm text-sand">
        <span class="relative flex size-2.5"><span v-if="a.summary.online" class="absolute inline-flex size-full animate-ping rounded-full bg-good opacity-60" /><span class="relative inline-flex size-2.5 rounded-full" :class="a.summary.online ? 'bg-good' : 'bg-white/30'" /></span>
        {{ t('admin.onlineNow', { n: a.summary.online }) }}
      </span>
    </div>

    <p v-if="!a && pending" class="py-16 text-center text-sand">…</p>

    <template v-if="a">
      <!-- Summary -->
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div v-for="c in [
          { label: t('admin.uniqueVisitors'), value: a.summary.visitors, sub: t('admin.newCount', { n: a.summary.newVisitors }) },
          { label: t('admin.sessions'), value: a.summary.sessions, sub: t('admin.pageviewsCount', { n: a.summary.pageviews }) },
          { label: t('admin.avgVisit'), value: fmtDur(a.summary.avgSeconds), sub: t('admin.bounce', { n: pct(a.summary.bounced, a.summary.sessions) }) },
          isQuizSite
            ? { label: t('admin.completion'), value: `${pct(totals.done, totals.started)}%`, sub: t('admin.doneOf', { done: totals.done, started: totals.started }) }
            : { label: t('admin.clicks'), value: a.clicks.reduce((n, c) => n + c.count, 0), sub: t('admin.clicksSub') },
        ]" :key="c.label" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div class="text-sm text-sand">{{ c.label }}</div>
          <div class="mt-1 font-mono text-2xl font-bold" dir="ltr">{{ c.value }}</div>
          <div class="mt-1 text-xs text-sand">{{ c.sub }}</div>
        </div>
      </div>

      <!-- Clicks (main site) -->
      <section v-if="!isQuizSite" class="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h2 class="mb-3 font-bold">{{ t('admin.clicksTitle') }}</h2>
        <p v-if="!a.clicks.length" class="text-sm text-sand">{{ t('admin.noData') }}</p>
        <ul class="grid grid-cols-[minmax(0,1fr)] gap-2">
          <li v-for="c in a.clicks" :key="c.key" class="text-sm">
            <div class="mb-1 flex justify-between gap-2"><span class="min-w-0 [overflow-wrap:anywhere]">{{ clickLabel(c.key) }}</span><span class="shrink-0 font-mono text-sand">{{ c.count }}</span></div>
            <div class="h-1.5 overflow-hidden rounded-full bg-white/10"><div class="h-full rounded-full bg-caramel/70" :style="{ width: `${(c.count / Math.max(1, a.clicks[0]!.count)) * 100}%` }" /></div>
          </li>
        </ul>
      </section>

      <!-- Funnel -->
      <section v-if="isQuizSite" class="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h2 class="mb-4 font-bold">{{ t('admin.funnel') }}</h2>
        <div class="grid gap-3">
          <div v-for="(f, i) in [
            { label: t('admin.fVisited'), n: a.summary.sessions },
            { label: t('admin.fStarted'), n: a.summary.sessionsStarted },
            { label: t('admin.fFinished'), n: a.summary.sessionsDone },
          ]" :key="i">
            <div class="mb-1 flex justify-between text-sm">
              <span>{{ f.label }}</span>
              <span class="font-mono text-sand" dir="ltr">{{ f.n }}<span v-if="i" class="ms-2 opacity-70">{{ pct(f.n, a.summary.sessions) }}%</span></span>
            </div>
            <div class="h-2.5 overflow-hidden rounded-full bg-white/10">
              <div class="h-full rounded-full bg-caramel" :style="{ width: `${pct(f.n, a.summary.sessions)}%`, opacity: 1 - i * 0.2 }" />
            </div>
          </div>
        </div>

        <div class="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 class="mb-2 text-sm font-bold text-sand">{{ t('admin.perLevel') }}</h3>
            <p v-if="!Object.keys(a.quiz.levels).length" class="text-sm text-sand">{{ t('admin.noData') }}</p>
            <ul class="grid grid-cols-[minmax(0,1fr)] gap-1.5 text-sm">
              <li v-for="(v, l) in a.quiz.levels" :key="l" class="flex justify-between gap-2">
                <span>{{ ['junior', 'mid', 'senior', 'open'].includes(String(l)) ? t(`levels.${l}.name`) : l }}</span>
                <span class="text-sand">{{ t('admin.levelLine', { started: v.started, done: v.done, left: v.left }) }}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 text-sm font-bold text-sand">{{ t('admin.stops') }}</h3>
            <ul class="grid grid-cols-[minmax(0,1fr)] gap-1.5 text-sm">
              <li v-for="(n, i) in stopBuckets" :key="i" class="flex items-center gap-2">
                <span class="w-28 shrink-0 text-sand">{{ t(`admin.stop${i}`) }}</span>
                <span class="h-2 flex-1 overflow-hidden rounded-full bg-white/10"><span class="block h-full rounded-full bg-bad/70" :style="{ width: `${(n / stopMax) * 100}%` }" /></span>
                <span class="w-6 text-end font-mono">{{ n }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Daily -->
      <section v-if="a.days > 1" class="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div class="mb-4 flex flex-wrap items-center gap-4">
          <h2 class="font-bold">{{ t('admin.perDay') }}</h2>
          <span class="flex items-center gap-1.5 text-xs text-sand"><i class="size-2.5 rounded-sm bg-caramel/40" />{{ t('admin.uniqueVisitors') }}</span>
          <span class="flex items-center gap-1.5 text-xs text-sand"><i class="size-2.5 rounded-sm bg-caramel" />{{ t('admin.fStarted') }}</span>
          <span class="flex items-center gap-1.5 text-xs text-sand"><i class="size-2.5 rounded-sm bg-good" />{{ t('admin.fFinished') }}</span>
        </div>
        <div class="flex h-36 items-end gap-[3px]" dir="ltr">
          <div v-for="d in a.daily" :key="d.date" class="relative flex h-full flex-1 items-end" :title="`${d.date}\n${t('admin.uniqueVisitors')}: ${d.visitors}\n${t('admin.fStarted')}: ${d.started}\n${t('admin.fFinished')}: ${d.done}`">
            <div class="absolute bottom-0 w-full rounded-t bg-caramel/30" :style="{ height: `${(d.visitors / maxDaily) * 100}%` }" />
            <div class="absolute bottom-0 left-[15%] w-[70%] rounded-t bg-caramel" :style="{ height: `${(d.started / maxDaily) * 100}%` }" />
            <div class="absolute bottom-0 left-[30%] w-[40%] rounded-t bg-good" :style="{ height: `${(d.done / maxDaily) * 100}%` }" />
          </div>
        </div>
        <div class="mt-2 flex justify-between font-mono text-[10px] text-sand" dir="ltr">
          <span>{{ a.daily[0]?.date.slice(5) }}</span><span>{{ a.daily.at(-1)?.date.slice(5) }}</span>
        </div>
      </section>

      <!-- Hours -->
      <section class="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h2 class="mb-4 font-bold">{{ t('admin.perHour') }}</h2>
        <div class="flex h-20 items-end gap-[3px]" dir="ltr">
          <div v-for="(n, h) in a.hours" :key="h" class="flex-1 rounded-t bg-caramel/70" :style="{ height: `${(n / maxHour) * 100}%`, minHeight: '1px' }" :title="`${String(h).padStart(2, '0')}:00 — ${n}`" />
        </div>
        <div class="mt-1 flex justify-between font-mono text-[10px] text-sand" dir="ltr"><span>00</span><span>06</span><span>12</span><span>18</span><span>23</span></div>
      </section>

      <!-- Countries -->
      <section class="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <h2 class="mb-3 font-bold">{{ t('admin.countries') }}</h2>
        <p v-if="!a.countries.length" class="text-sm text-sand">{{ t('admin.noData') }}</p>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="text-sand">
              <tr class="text-start">
                <th class="py-1.5 text-start font-medium">{{ t('admin.country') }}</th>
                <th class="py-1.5 text-end font-medium">{{ t('admin.uniqueVisitors') }}</th>
                <th class="py-1.5 text-end font-medium">{{ t('admin.fStarted') }}</th>
                <th class="py-1.5 text-end font-medium">{{ t('admin.fFinished') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in a.countries" :key="c.key" class="border-t border-white/5">
                <td class="py-1.5"><span class="me-2">{{ flag(c.key) }}</span>{{ countryName(c.key) }}</td>
                <td class="py-1.5 text-end font-mono">{{ c.visitors }}</td>
                <td class="py-1.5 text-end font-mono">{{ c.started }}</td>
                <td class="py-1.5 text-end font-mono">{{ c.done }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-if="a.cities.some(c => c.key)">
          <h3 class="mt-4 mb-2 text-sm font-bold text-sand">{{ t('admin.cities') }}</h3>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="c in a.cities.filter(c => c.key)" :key="c.key" class="rounded-lg bg-white/5 px-2 py-1 text-xs">{{ c.key }} <b class="font-mono text-caramel">{{ c.visitors }}</b></span>
          </div>
        </template>
      </section>

      <!-- Breakdowns -->
      <div class="mt-6 grid items-start gap-4 sm:grid-cols-2">
        <section v-for="sec in sections" :key="sec.title" class="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 class="mb-3 font-bold">{{ sec.title }}</h2>
          <p v-if="!sec.rows.length" class="text-sm text-sand">{{ t('admin.noData') }}</p>
          <ul class="grid grid-cols-[minmax(0,1fr)] gap-2">
            <li v-for="r in sec.rows" :key="r.key" class="text-sm">
              <div class="mb-1 flex justify-between gap-2"><span class="min-w-0 truncate">{{ sec.label(r.key) }}</span><span class="font-mono text-sand">{{ r.visitors }}</span></div>
              <div class="h-1.5 overflow-hidden rounded-full bg-white/10"><div class="h-full rounded-full bg-caramel/70" :style="{ width: `${pct(r.sessions, a.summary.sessions)}%` }" /></div>
            </li>
          </ul>
        </section>

        <section class="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 class="mb-3 font-bold">{{ t('admin.sources') }}</h2>
          <ul class="grid grid-cols-[minmax(0,1fr)] gap-1.5 text-sm">
            <li v-for="r in a.referrers" :key="r.key" class="flex justify-between gap-2">
              <span class="min-w-0 truncate" dir="ltr" :title="r.key || undefined">{{ r.key || t('admin.direct') }}</span><span class="shrink-0 font-mono text-sand">{{ r.visitors }}</span>
            </li>
          </ul>
          <template v-if="a.utm.some(u => u.key)">
            <h3 class="mt-3 mb-1.5 text-sm font-bold text-sand">utm_source</h3>
            <ul class="grid grid-cols-[minmax(0,1fr)] gap-1.5 text-sm">
              <li v-for="r in a.utm.filter(u => u.key)" :key="r.key" class="flex justify-between gap-2"><span class="min-w-0 truncate" dir="ltr">{{ r.key }}</span><span class="shrink-0 font-mono text-sand">{{ r.visitors }}</span></li>
            </ul>
          </template>
        </section>

        <section class="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 class="mb-3 font-bold">{{ t('admin.pages') }}</h2>
          <p v-if="!a.pages.length" class="text-sm text-sand">{{ t('admin.noData') }}</p>
          <ul class="grid grid-cols-[minmax(0,1fr)] gap-1.5 text-sm">
            <li v-for="p in a.pages" :key="p.key" class="flex justify-between gap-2">
              <span class="min-w-0 truncate font-mono text-xs" dir="ltr" :title="p.key">{{ p.key }}</span><span class="shrink-0 font-mono text-sand">{{ p.count }}</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Recent sessions -->
      <section class="mt-6">
        <h2 class="mb-3 font-bold">{{ t('admin.recentVisits') }}</h2>
        <p v-if="!a.recent.length" class="text-sm text-sand">{{ t('admin.noData') }}</p>
        <!-- Phones: one card per visit -->
        <ul v-if="a.recent.length" class="grid grid-cols-[minmax(0,1fr)] gap-2 sm:hidden">
          <li v-for="r in a.recent" :key="r.id" class="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm">
            <div class="flex items-start justify-between gap-3">
              <span class="min-w-0">{{ flag(r.country) }} {{ countryName(r.country) }}<span v-if="r.city" class="text-sand"> · {{ r.city }}</span></span>
              <span class="shrink-0 font-mono text-xs text-sand" dir="ltr">
                <span v-if="Date.now() - r.lastTs < 120_000" class="me-1 inline-block size-2 rounded-full bg-good" />{{ fmtDate(r.firstTs) }}
              </span>
            </div>
            <div class="mt-1 text-xs text-sand">
              {{ r.isNew ? t('admin.newVisitor') : t('admin.returning') }} · {{ (r.locale || '').toUpperCase() }}
              · {{ t(`admin.device.${r.device || 'desktop'}`) }} · <span dir="ltr">{{ r.os }} · {{ r.browser }}</span>
            </div>
            <div class="mt-1 flex items-center justify-between gap-3 text-xs">
              <span class="min-w-0 truncate" dir="ltr">{{ r.referrer || t('admin.direct') }} <span class="font-mono text-sand">{{ r.landing }}</span></span>
              <span class="shrink-0 font-mono text-sand" dir="ltr">{{ fmtDur(Math.round((r.lastTs - r.firstTs) / 1000)) }} · {{ r.pageviews }}p</span>
            </div>
            <div v-if="isQuizSite && r.quizStarted" class="mt-1 text-xs">
              <span class="font-semibold" :class="r.quizDone ? 'text-good' : 'text-bad'">{{ r.quizDone ? t('admin.finished') : t('admin.stopped') }}</span>
              <span class="text-sand"> · {{ r.quizLevel ? t(`levels.${r.quizLevel}.name`) : '' }} · <span dir="ltr">{{ r.quizAnswered }}/{{ r.quizTotal }}</span></span>
              <NuxtLink v-if="r.attemptId" :to="localePath(`/result/${r.attemptId}`)" class="ms-1 text-caramel hover:underline">{{ t('admin.view') }}</NuxtLink>
            </div>
          </li>
        </ul>
        <div v-if="a.recent.length" class="hidden overflow-x-auto rounded-2xl border border-white/10 sm:block">
          <table class="w-full text-sm">
            <thead class="bg-white/5 text-sand">
              <tr>
                <th class="px-3 py-2 text-start font-medium">{{ t('admin.when') }}</th>
                <th class="px-3 py-2 text-start font-medium">{{ t('admin.country') }}</th>
                <th class="px-3 py-2 text-start font-medium">{{ t('admin.deviceCol') }}</th>
                <th class="px-3 py-2 text-start font-medium">{{ t('admin.source') }}</th>
                <th class="px-3 py-2 text-start font-medium">{{ t('admin.stay') }}</th>
                <th v-if="isQuizSite" class="px-3 py-2 text-start font-medium">{{ t('admin.test') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in a.recent" :key="r.id" class="border-t border-white/5 align-top">
                <td class="px-3 py-2 whitespace-nowrap" dir="ltr">
                  {{ fmtDate(r.firstTs) }}
                  <span v-if="Date.now() - r.lastTs < 120_000" class="ms-1 inline-block size-2 rounded-full bg-good" />
                  <div class="text-[11px] text-sand">{{ r.isNew ? t('admin.newVisitor') : t('admin.returning') }} · {{ (r.locale || '').toUpperCase() }}</div>
                </td>
                <td class="px-3 py-2 whitespace-nowrap">{{ flag(r.country) }} {{ countryName(r.country) }}<div v-if="r.city" class="text-[11px] text-sand">{{ r.city }}</div></td>
                <td class="px-3 py-2 whitespace-nowrap">{{ t(`admin.device.${r.device || 'desktop'}`) }}<div class="text-[11px] text-sand">{{ r.os }} · {{ r.browser }}</div></td>
                <td class="max-w-56 px-3 py-2"><span class="block truncate" dir="ltr" :title="r.referrer || undefined">{{ r.referrer || t('admin.direct') }}</span><div class="truncate font-mono text-[11px] text-sand" dir="ltr">{{ r.landing }}</div></td>
                <td class="px-3 py-2 whitespace-nowrap font-mono" dir="ltr">{{ fmtDur(Math.round((r.lastTs - r.firstTs) / 1000)) }}<div class="text-[11px] text-sand">{{ t('admin.pageviewsCount', { n: r.pageviews }) }}</div></td>
                <td v-if="isQuizSite" class="px-3 py-2 whitespace-nowrap">
                  <template v-if="!r.quizStarted"><span class="text-sand">—</span></template>
                  <template v-else>
                    <span class="font-semibold" :class="r.quizDone ? 'text-good' : 'text-bad'">{{ r.quizDone ? t('admin.finished') : t('admin.stopped') }}</span>
                    <div class="text-[11px] text-sand">
                      {{ r.quizLevel ? t(`levels.${r.quizLevel}.name`) : '' }} · <span dir="ltr">{{ r.quizAnswered }}/{{ r.quizTotal }}</span>
                      <NuxtLink v-if="r.attemptId" :to="localePath(`/result/${r.attemptId}`)" class="ms-1 text-caramel underline-offset-2 hover:underline">{{ t('admin.view') }}</NuxtLink>
                    </div>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-3 text-xs text-sand">{{ t('admin.privacyNote') }}</p>
      </section>
    </template>
  </div>
</template>
