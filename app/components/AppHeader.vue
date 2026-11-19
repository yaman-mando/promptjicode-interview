<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const { t } = useI18n()
// The channel site uses the same locale prefixes (ar has none)
const homeUrl = computed(() => `https://promptjicode.com${locale.value === 'ar' ? '/' : `/${locale.value}`}`)
</script>

<template>
  <header class="flex items-center justify-between gap-4 py-5">
    <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5" dir="ltr">
      <img src="/logo.png" alt="" width="36" height="36" class="size-9 rounded-full">
      <span class="text-lg font-extrabold tracking-tight">Promptji<span class="text-caramel">Code</span></span>
      <span class="rounded-md bg-caramel/15 px-2 py-0.5 font-mono text-xs text-caramel">interview</span>
    </NuxtLink>

    <div class="flex items-center gap-2">
    <a :href="homeUrl" class="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm font-semibold text-sand transition hover:bg-white/5 hover:text-cream" :title="t('mainSite')">
      <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></svg>
      <span class="hidden sm:inline">{{ t('mainSite') }}</span>
      <span class="sr-only sm:hidden">{{ t('mainSite') }}</span>
    </a>
    <nav class="flex gap-1 rounded-xl bg-white/5 p-1" aria-label="Language">
      <NuxtLink
        v-for="l in locales"
        :key="l.code"
        :to="switchLocalePath(l.code)"
        :lang="l.code"
        :aria-current="l.code === locale ? 'true' : undefined"
        class="rounded-lg px-2.5 py-1 text-sm font-semibold transition"
        :class="l.code === locale ? 'bg-caramel text-ink' : 'text-sand hover:text-cream'"
      >
        {{ l.code.toUpperCase() }}
      </NuxtLink>
    </nav>
    </div>
  </header>
</template>
