<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const { data: me } = await useFetch('/api/admin/me', { headers: useRequestHeaders(['cookie']) })
if (me.value?.admin) await navigateTo(localePath('/admin'))

const password = ref('')
const error = ref('')
const busy = ref(false)

async function submit() {
  busy.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/login', { method: 'POST', body: { password: password.value } })
    await navigateTo(localePath('/admin'))
  }
  catch {
    error.value = t('admin.wrong')
    busy.value = false
  }
}

useHead({ title: () => `${t('admin.login')} · PromptjiCode Interview`, meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="mx-auto max-w-sm pt-16">
    <h1 class="mb-6 text-2xl font-bold">{{ t('admin.login') }}</h1>

    <p v-if="me && !me.configured" class="rounded-xl border border-caramel/40 bg-caramel/10 p-4 text-sm leading-relaxed">
      <BidiText :text="t('admin.notConfigured')" />
    </p>

    <form v-else class="grid gap-4" @submit.prevent="submit">
      <label class="grid gap-2">
        <span class="text-sm font-semibold text-sand">{{ t('admin.password') }}</span>
        <input
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
          class="rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-caramel"
        >
      </label>
      <button type="submit" :disabled="busy || !password" class="rounded-xl bg-caramel py-3 font-bold text-ink disabled:opacity-50">
        {{ t('admin.signIn') }}
      </button>
      <p v-if="error" class="text-center text-sm text-bad" role="alert">{{ error }}</p>
    </form>
  </div>
</template>
