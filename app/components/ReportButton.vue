<script setup lang="ts">
import { findProfanity } from '#shared/profanity'
import { REPORT_NOTE_MAX, REPORT_TYPES, type ReportType } from '#shared/report'

const props = defineProps<{ questionId: string, prompt: string, track?: string }>()
const { t, locale } = useI18n()

const open = ref(false)
const type = ref<ReportType | null>(null)
const note = ref('')
const name = ref('')
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const serverRude = ref(false)

// Live check while typing, so the person can fix the wording before sending
const rude = computed(() => serverRude.value || findProfanity(`${note.value} ${name.value}`).length > 0)
watch([note, name], () => { serverRude.value = false })
const canSend = computed(() => !!type.value && !rude.value && state.value !== 'sending')

const dialog = ref<HTMLElement | null>(null)
let lastFocus: HTMLElement | null = null

function show() {
  lastFocus = document.activeElement as HTMLElement | null
  type.value = null
  note.value = ''
  state.value = 'idle'
  serverRude.value = false
  try { name.value = localStorage.getItem('pci_name') ?? '' } catch { /* private mode */ }
  open.value = true
  nextTick(() => dialog.value?.querySelector<HTMLElement>('button[data-type]')?.focus())
}
function close() {
  open.value = false
  lastFocus?.focus?.()
}

async function send() {
  if (!canSend.value) return
  state.value = 'sending'
  try {
    await $fetch('/api/report', {
      method: 'POST',
      body: { questionId: props.questionId, type: type.value, note: note.value, name: name.value, locale: locale.value, track: props.track },
    })
    state.value = 'sent'
  }
  catch (e) {
    if ((e as { statusMessage?: string }).statusMessage === 'profanity' || (e as { data?: { statusMessage?: string } }).data?.statusMessage === 'profanity') {
      serverRude.value = true
      state.value = 'idle'
    }
    else {
      state.value = 'error'
    }
  }
}

function onKey(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') { e.preventDefault(); close() }
  e.stopPropagation() // keep the quiz shortcuts (A–D, Enter) quiet while the form is open
}
onMounted(() => window.addEventListener('keydown', onKey, true))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey, true))
</script>

<template>
  <button type="button" class="no-print inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-sand/70 transition hover:bg-white/5 hover:text-cream" @click="show">
    <svg viewBox="0 0 24 24" class="size-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4m0 0h11l-2 4 2 4H5" /></svg>
    {{ t('report.button') }}
  </button>

  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4" @click.self="close">
        <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" @click="close" />
        <div ref="dialog" role="dialog" aria-modal="true" :aria-label="t('report.title')" class="modal-card relative my-6 w-full max-w-lg rounded-3xl border border-white/10 bg-ink-2 p-6 shadow-2xl shadow-black/60">
          <!-- Sent -->
          <div v-if="state === 'sent'" class="py-6 text-center">
            <div class="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-good/15 text-good">
              <svg viewBox="0 0 24 24" class="size-7" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4 10-10" /></svg>
            </div>
            <h2 class="mb-1 text-lg font-bold">{{ t('report.thanks') }}</h2>
            <p class="text-sand">{{ t('report.thanksText') }}</p>
            <button type="button" class="mt-6 rounded-xl bg-caramel px-6 py-2.5 font-bold text-ink hover:brightness-110" @click="close">{{ t('report.close') }}</button>
          </div>

          <form v-else class="grid gap-5" @submit.prevent="send">
            <div class="flex items-start justify-between gap-4">
              <h2 class="text-lg font-bold">{{ t('report.title') }}</h2>
              <button type="button" class="-m-1 rounded-lg p-1 text-sand hover:text-cream" :aria-label="t('report.close')" @click="close">
                <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>

            <!-- The question -->
            <div>
              <p class="mb-1.5 text-xs font-bold text-sand">{{ t('report.question') }}</p>
              <p class="line-clamp-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-cream/90"><BidiText :text="prompt" /></p>
            </div>

            <!-- Type -->
            <fieldset>
              <legend class="mb-2 text-xs font-bold text-sand">{{ t('report.type') }}</legend>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="k in REPORT_TYPES" :key="k" type="button" :data-type="k" class="chip"
                  :class="type === k ? 'border-caramel bg-caramel/15 text-cream' : 'border-white/10 bg-white/[0.03] text-sand hover:border-white/30 hover:text-cream'"
                  :aria-pressed="type === k" @click="type = k"
                >{{ t(`report.types.${k}`) }}</button>
              </div>
            </fieldset>

            <!-- Note -->
            <label class="grid gap-1.5">
              <span class="text-xs font-bold text-sand">{{ t('report.note') }} <span class="font-normal text-sand/70">· {{ t('setup.optional') }}</span></span>
              <textarea
                v-model="note" rows="4" :maxlength="REPORT_NOTE_MAX" :placeholder="t('report.notePlaceholder')"
                class="resize-y rounded-xl border bg-ink px-3.5 py-2.5 text-cream placeholder:text-sand/50 focus:outline-none"
                :class="rude ? 'border-bad focus:border-bad' : 'border-white/15 focus:border-caramel'"
              />
            </label>

            <!-- Name -->
            <label class="grid gap-1.5">
              <span class="text-xs font-bold text-sand">{{ t('setup.name') }} <span class="font-normal text-sand/70">· {{ t('setup.optional') }}</span></span>
              <input v-model="name" type="text" maxlength="40" autocomplete="given-name" class="rounded-xl border border-white/15 bg-ink px-3.5 py-2.5 text-cream focus:border-caramel focus:outline-none">
            </label>

            <Transition name="fade">
              <p v-if="rude" class="flex gap-2 rounded-xl border border-bad/40 bg-bad/10 px-3.5 py-2.5 text-sm text-bad" role="alert">
                <svg viewBox="0 0 24 24" class="mt-0.5 size-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5m0 3v.01" /></svg>
                {{ t('report.rude') }}
              </p>
            </Transition>
            <p v-if="state === 'error'" class="text-sm text-bad" role="alert">{{ t('quiz.error') }}</p>

            <div class="flex justify-end gap-2.5">
              <button type="button" class="rounded-xl px-5 py-2.5 font-semibold text-sand hover:bg-white/5 hover:text-cream" @click="close">{{ t('report.cancel') }}</button>
              <button type="submit" class="rounded-xl bg-caramel px-5 py-2.5 font-bold text-ink transition hover:brightness-110 disabled:opacity-40" :disabled="!canSend">
                {{ state === 'sending' ? t('quiz.submitting') : t('report.send') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
