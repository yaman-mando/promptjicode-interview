<script setup lang="ts">
/**
 * Site-styled confirm dialog. Open it with `ask()`, which resolves to true or false.
 * Escape and a click on the backdrop count as "cancel".
 */
const props = withDefaults(defineProps<{
  title: string
  confirmLabel: string
  cancelLabel: string
  tone?: 'caramel' | 'bad'
}>(), { tone: 'caramel' })

const open = ref(false)
let resolver: ((v: boolean) => void) | null = null
const confirmBtn = ref<HTMLButtonElement | null>(null)
let lastFocus: HTMLElement | null = null

function ask(): Promise<boolean> {
  lastFocus = document.activeElement as HTMLElement | null
  open.value = true
  nextTick(() => confirmBtn.value?.focus())
  return new Promise((resolve) => { resolver = resolve })
}

function close(value: boolean) {
  open.value = false
  resolver?.(value)
  resolver = null
  lastFocus?.focus?.()
}

function onKey(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') { e.preventDefault(); close(false) }
  // Keep the quiz shortcuts (A–D, Enter) from firing behind the dialog
  e.stopPropagation()
}
onMounted(() => window.addEventListener('keydown', onKey, true))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey, true))

defineExpose({ ask })
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 grid place-items-center p-4" @click.self="close(false)">
        <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" @click="close(false)" />
        <div
          role="alertdialog" aria-modal="true" :aria-label="props.title"
          class="modal-card relative w-full max-w-md rounded-3xl border border-white/10 bg-ink-2 p-6 shadow-2xl shadow-black/60"
        >
          <div class="mb-4 grid size-11 place-items-center rounded-2xl" :class="tone === 'bad' ? 'bg-bad/15 text-bad' : 'bg-caramel/15 text-caramel'">
            <svg viewBox="0 0 24 24" class="size-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 8v5m0 3.5v.01M10.3 3.9 2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
            </svg>
          </div>
          <h2 class="mb-2 text-lg font-bold">{{ title }}</h2>
          <div class="text-[15px] leading-relaxed text-sand"><slot /></div>
          <div class="mt-6 flex flex-wrap justify-end gap-2.5">
            <button type="button" class="rounded-xl px-5 py-2.5 font-semibold text-sand transition hover:bg-white/5 hover:text-cream" @click="close(false)">
              {{ cancelLabel }}
            </button>
            <button
              ref="confirmBtn" type="button"
              class="rounded-xl px-5 py-2.5 font-bold transition hover:brightness-110 active:scale-[0.98]"
              :class="tone === 'bad' ? 'bg-bad text-ink' : 'bg-caramel text-ink'"
              @click="close(true)"
            >
              {{ confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
