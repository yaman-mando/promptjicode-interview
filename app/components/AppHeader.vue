<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const { t } = useI18n()
// The channel site uses the same locale prefixes (ar has none)
const { canPrompt, showIosHint, install } = usePwa()
const iosOpen = ref(false)
function onInstall() {
  if (canPrompt.value) install()
  else iosOpen.value = !iosOpen.value
}
const homeUrl = computed(() => `https://promptjicode.com${locale.value === 'ar' ? '/' : `/${locale.value}`}`)
</script>

<template>
  <header class="relative flex items-center justify-between gap-2 py-5 sm:gap-4">
    <NuxtLink :to="localePath('/')" class="flex min-w-0 items-center gap-2 sm:gap-2.5" dir="ltr">
      <img src="/logo.png" alt="" width="36" height="36" class="size-8 shrink-0 rounded-full sm:size-9">
      <span class="text-base font-extrabold tracking-tight sm:text-lg">Promptji<span class="text-caramel">Code</span></span>
      <span class="hidden rounded-md bg-caramel/15 px-2 py-0.5 font-mono text-xs text-caramel min-[420px]:inline">interview</span>
    </NuxtLink>

    <div class="flex shrink-0 items-center gap-1 sm:gap-2">
    <ClientOnly>
      <div v-if="canPrompt || showIosHint">
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-semibold text-caramel transition hover:bg-caramel/10 sm:px-2.5"
          :title="t('pwa.install')"
          :aria-expanded="showIosHint ? iosOpen : undefined"
          @click="onInstall"
        >
          <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></svg>
          <span class="hidden sm:inline">{{ t('pwa.install') }}</span>
          <span class="sr-only sm:hidden">{{ t('pwa.install') }}</span>
        </button>
        <div
          v-if="iosOpen"
          role="dialog"
          class="absolute inset-x-0 top-full z-50 -mt-2 rounded-xl sm:start-auto sm:w-72 border border-white/10 bg-ink-2 p-3 text-sm leading-relaxed text-cream shadow-xl"
        >
          <p>{{ t('pwa.iosHint') }}</p>
          <button type="button" class="mt-2 text-xs font-semibold text-caramel" @click="iosOpen = false">{{ t('pwa.close') }}</button>
        </div>
      </div>
    </ClientOnly>
    <a :href="homeUrl" class="flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm sm:px-2.5 font-semibold text-sand transition hover:bg-white/5 hover:text-cream" :title="t('mainSite')">
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
        class="rounded-lg px-2 py-1 text-sm font-semibold transition sm:px-2.5"
        :class="l.code === locale ? 'bg-caramel text-ink' : 'text-sand hover:text-cream'"
      >
        {{ l.code.toUpperCase() }}
      </NuxtLink>
    </nav>
    </div>
  </header>
</template>
