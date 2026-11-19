<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
</script>

<template>
  <header class="flex items-center justify-between gap-4 py-5">
    <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5" dir="ltr">
      <img src="/logo.png" alt="" width="36" height="36" class="size-9 rounded-full">
      <span class="text-lg font-extrabold tracking-tight">Promptji<span class="text-caramel">Code</span></span>
      <span class="rounded-md bg-caramel/15 px-2 py-0.5 font-mono text-xs text-caramel">interview</span>
    </NuxtLink>

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
  </header>
</template>
