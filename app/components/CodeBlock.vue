<script setup lang="ts">
defineProps<{ code: string, lang?: string }>()
</script>

<template>
  <div class="max-w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0806]">
    <div class="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5" dir="ltr">
      <span class="size-2.5 rounded-full bg-[#e5645a]/70" />
      <span class="size-2.5 rounded-full bg-[#e2a15c]/70" />
      <span class="size-2.5 rounded-full bg-[#5cc08a]/70" />
      <span v-if="lang" class="ms-auto font-mono text-xs text-sand/70">{{ lang }}</span>
    </div>
    <pre class="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-cream sm:text-sm"><code>{{ code }}</code></pre>
  </div>
</template>
