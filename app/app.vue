<script setup lang="ts">
const head = useLocaleHead()
const { t } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs.lang, dir: head.value.htmlAttrs.dir },
  link: head.value.link,
  meta: [...(head.value.meta ?? []), { name: 'description', content: t('tagline') }],
}))
</script>

<template>
  <div class="mx-auto flex min-h-dvh max-w-3xl flex-col px-5">
    <AppHeader />
    <main class="flex-1 pb-16">
      <NuxtPage />
    </main>
    <footer class="border-t border-white/10 py-6 text-center text-sm text-sand">
      <span class="font-bold text-caramel">{{ t('footer') }}</span>
      <span class="mx-2 opacity-40">·</span>
      <a href="https://github.com/promptjicode" class="underline-offset-4 hover:underline" target="_blank" rel="noopener">{{ t('github') }}</a>
    </footer>
  </div>
</template>
