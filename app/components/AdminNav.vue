<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo(localePath('/admin/login'))
}
</script>

<template>
  <div class="mb-6 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
    <span class="me-3 font-bold text-caramel">{{ t('admin.title') }}</span>
    <NuxtLink :to="localePath('/admin')" class="rounded-lg px-3 py-1.5 text-sm font-semibold text-sand hover:text-cream" exact-active-class="!bg-white/10 !text-cream">
      {{ t('admin.dashboard') }}
    </NuxtLink>
    <NuxtLink :to="localePath('/admin/questions')" class="rounded-lg px-3 py-1.5 text-sm font-semibold text-sand hover:text-cream" active-class="!bg-white/10 !text-cream">
      {{ t('admin.questions') }}
    </NuxtLink>
    <button type="button" class="ms-auto rounded-lg px-3 py-1.5 text-sm text-sand hover:text-bad" @click="logout">{{ t('admin.logout') }}</button>
  </div>
</template>
