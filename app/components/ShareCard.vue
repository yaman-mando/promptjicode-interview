<script setup lang="ts">
import type { ResultResponse } from '#shared/types/quiz'

const props = defineProps<{ result: ResultResponse }>()
const { t, locale } = useI18n()

const SIZE = 1080
const C = { ink: '#120c09', caramel: '#e2a15c', cream: '#fbf1e4', sand: '#b9a593', good: '#5cc08a', bad: '#e5645a' }

const imageUrl = ref<string | null>(null)
let blob: Blob | null = null
const copied = ref(false)
const canNativeShare = ref(false)

const isOpen = computed(() => props.result.mode === 'open')
const pct = computed(() => Math.round((props.result.score / props.result.total) * 100))
const levelName = computed(() => t(`levels.${props.result.level}.name`))
const pageUrl = computed(() => `https://interview.promptjicode.com${locale.value === 'ar' ? '' : `/${locale.value}`}/result/${props.result.id}`)
const shareText = computed(() => t(isOpen.value ? 'share.textOpen' : 'share.text', {
  score: props.result.score,
  total: props.result.total,
  level: levelName.value,
}))

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

async function draw() {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')!
  const rtl = locale.value === 'ar'
  const font = (w: number, px: number, mono = false) => `${w} ${px}px ${mono ? '"JetBrains Mono", monospace' : 'Cairo, sans-serif'}`

  await Promise.all([
    document.fonts.load(font(800, 60), 'نتيجةAa'),
    document.fonts.load(font(700, 40), 'نتيجةAa'),
    document.fonts.load(font(700, 40, true), 'Aa0%'),
  ]).catch(() => {})
  const logo = await loadImage('/logo.png')

  // Background: ink, caramel glow, faint grid
  ctx.fillStyle = C.ink
  ctx.fillRect(0, 0, SIZE, SIZE)
  let g = ctx.createRadialGradient(SIZE * 0.85, -80, 40, SIZE * 0.85, -80, 760)
  g.addColorStop(0, 'rgba(226,161,92,0.34)')
  g.addColorStop(1, 'rgba(226,161,92,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, SIZE, SIZE)
  g = ctx.createRadialGradient(0, SIZE, 20, 0, SIZE, 620)
  g.addColorStop(0, 'rgba(226,161,92,0.14)')
  g.addColorStop(1, 'rgba(226,161,92,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, SIZE, SIZE)
  ctx.strokeStyle = 'rgba(251,241,228,0.035)'
  ctx.lineWidth = 1
  for (let i = 54; i < SIZE; i += 54) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, SIZE); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(SIZE, i); ctx.stroke()
  }

  // Brand row (always left-to-right)
  ctx.direction = 'ltr'
  ctx.textBaseline = 'middle'
  if (logo) {
    ctx.save()
    ctx.beginPath(); ctx.arc(110, 110, 40, 0, Math.PI * 2); ctx.clip()
    ctx.drawImage(logo, 70, 70, 80, 80)
    ctx.restore()
  }
  ctx.textAlign = 'left'
  ctx.font = font(800, 40)
  ctx.fillStyle = C.cream
  ctx.fillText('Promptji', 168, 112)
  const w1 = ctx.measureText('Promptji').width
  ctx.fillStyle = C.caramel
  ctx.fillText('Code', 168 + w1, 112)
  const w2 = ctx.measureText('Code').width
  ctx.font = font(700, 24, true)
  const tag = 'interview'
  const tw = ctx.measureText(tag).width + 28
  ctx.fillStyle = 'rgba(226,161,92,0.16)'
  roundRect(ctx, 168 + w1 + w2 + 16, 92, tw, 40, 10); ctx.fill()
  ctx.fillStyle = C.caramel
  ctx.fillText(tag, 168 + w1 + w2 + 30, 113)

  // Title
  ctx.direction = rtl ? 'rtl' : 'ltr'
  ctx.textAlign = 'center'
  ctx.fillStyle = C.cream
  const nm = props.result.name
  ctx.font = font(800, 56)
  ctx.fillText(isOpen.value
    ? t(nm ? 'share.cardOpenNamed' : 'share.cardOpen', { name: nm ?? '' })
    : t(nm ? 'share.cardTitleNamed' : 'share.cardTitle', { level: levelName.value, name: nm ?? '' }), SIZE / 2, 262, SIZE - 140)

  // Ring
  const cx = SIZE / 2
  const cy = 520
  const r = 176
  const color = pct.value >= 70 ? C.good : pct.value >= 40 ? C.caramel : C.bad
  ctx.lineWidth = 30
  ctx.lineCap = 'round'
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke()
  if (pct.value > 0) {
    ctx.strokeStyle = color
    ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * pct.value) / 100); ctx.stroke()
  }

  ctx.direction = 'ltr'
  ctx.fillStyle = C.cream
  if (isOpen.value) {
    ctx.font = font(800, 96)
    ctx.fillText(levelName.value, cx, cy - 22)
  }
  else {
    ctx.font = font(700, 112, true)
    ctx.fillText(`${pct.value}%`, cx, cy - 18)
  }
  ctx.direction = rtl ? 'rtl' : 'ltr'
  ctx.font = font(700, 32)
  ctx.fillStyle = C.sand
  ctx.fillText(t('share.cardCorrect', { score: props.result.score, total: props.result.total }), cx, cy + 68)

  // Percentile
  let y = 790
  if (props.result.percentile !== null) {
    ctx.font = font(800, 42)
    ctx.fillStyle = C.caramel
    ctx.fillText(t('share.cardBetter', { p: props.result.percentile }), cx, y)
    y += 82
  }
  else {
    y += 20
  }

  // Up to four topic badges
  const topics = [...props.result.topics].sort((a, b) => b.total - a.total).slice(0, 4)
  ctx.font = font(700, 26)
  const labels = topics.map(tp => `${t(`topics.${tp.topic}`)}  ${tp.correct}/${tp.total}`)
  const widths = labels.map(l => ctx.measureText(l).width + 44)
  const gap = 14
  const rowW = widths.reduce((a, b) => a + b, 0) + gap * (labels.length - 1)
  if (rowW < SIZE - 120) {
    ctx.direction = 'ltr'
    let x = (SIZE - rowW) / 2
    const order = rtl ? [...labels.keys()].reverse() : [...labels.keys()]
    for (const i of order) {
      const tp = topics[i]!
      const ok = tp.correct / tp.total
      ctx.fillStyle = 'rgba(251,241,228,0.06)'
      roundRect(ctx, x, y - 26, widths[i]!, 52, 26); ctx.fill()
      ctx.strokeStyle = ok >= 0.7 ? 'rgba(92,192,138,0.6)' : ok >= 0.4 ? 'rgba(226,161,92,0.6)' : 'rgba(229,100,90,0.6)'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.fillStyle = C.cream
      ctx.direction = rtl ? 'rtl' : 'ltr'
      ctx.fillText(labels[i]!, x + widths[i]! / 2, y + 1)
      ctx.direction = 'ltr'
      x += widths[i]! + gap
    }
  }

  // Footer
  ctx.fillStyle = 'rgba(251,241,228,0.08)'
  ctx.fillRect(80, 968, SIZE - 160, 2)
  ctx.direction = rtl ? 'rtl' : 'ltr'
  ctx.textAlign = rtl ? 'right' : 'left'
  ctx.font = font(700, 30)
  ctx.fillStyle = C.cream
  ctx.fillText(t('share.cardCta'), rtl ? SIZE - 80 : 80, 1018)
  ctx.direction = 'ltr'
  ctx.textAlign = rtl ? 'left' : 'right'
  ctx.font = font(700, 26, true)
  ctx.fillStyle = C.caramel
  ctx.fillText('interview.promptjicode.com', rtl ? 80 : SIZE - 80, 1018)

  blob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/png'))
  if (blob) {
    if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)
    imageUrl.value = URL.createObjectURL(blob)
    const file = new File([blob], fileName(), { type: 'image/png' })
    canNativeShare.value = !!navigator.canShare?.({ files: [file] })
  }
}

const fileName = () => `promptjicode-result-${props.result.id}.png`

function download() {
  if (!imageUrl.value) return
  const a = document.createElement('a')
  a.href = imageUrl.value
  a.download = fileName()
  a.click()
}

async function nativeShare() {
  if (!blob) return
  try {
    await navigator.share({
      files: [new File([blob], fileName(), { type: 'image/png' })],
      text: `${shareText.value} ${pageUrl.value}`,
    })
  }
  catch { /* cancelled */ }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(pageUrl.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
  catch { /* clipboard blocked */ }
}

const enc = encodeURIComponent
const links = computed(() => [
  { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(pageUrl.value)}`, icon: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75Z' },
  { name: 'X', href: `https://twitter.com/intent/tweet?text=${enc(shareText.value)}&url=${enc(pageUrl.value)}`, icon: 'M17.53 3H20.6l-6.7 7.66L21.8 21h-6.17l-4.83-6.32L5.27 21H2.2l7.17-8.2L1.8 3h6.33l4.37 5.78L17.53 3Zm-1.08 16.2h1.7L7.03 4.72H5.2l11.25 14.48Z' },
  { name: 'WhatsApp', href: `https://wa.me/?text=${enc(`${shareText.value} ${pageUrl.value}`)}`, icon: 'M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm5.8 14.03c-.25.7-1.45 1.33-2 1.38-.53.06-1.03.25-3.47-.72-2.93-1.16-4.8-4.16-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36l.56.01c.18 0 .42-.07.66.5.25.6.84 2.04.91 2.19.08.14.12.31.03.5-.1.2-.14.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.3-.13.58.17.29.74 1.22 1.58 1.97 1.09.97 2 1.27 2.29 1.42.29.14.46.12.63-.08.17-.19.72-.84.92-1.13.19-.29.38-.24.65-.14.26.1 1.68.79 1.97.94.29.14.48.21.55.33.07.12.07.7-.18 1.4Z' },
  { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl.value)}`, icon: 'M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.86.25-1.45 1.48-1.45h1.57V4.47A21 21 0 0 0 14.3 4.3c-2.27 0-3.8 1.38-3.8 3.92v2.28H8v3h2.5V21h3Z' },
])

onMounted(draw)
watch(locale, draw)
onBeforeUnmount(() => { if (imageUrl.value) URL.revokeObjectURL(imageUrl.value) })
</script>

<template>
  <section class="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
    <h2 class="mb-5 text-lg font-bold">{{ t('share.title') }}</h2>
    <div class="grid items-center gap-6 sm:grid-cols-[minmax(0,17rem)_1fr]">
      <div class="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-ink-2 shadow-2xl shadow-black/40">
        <Transition name="fade" mode="out-in">
          <img v-if="imageUrl" :key="imageUrl" :src="imageUrl" :alt="shareText" class="size-full" width="1080" height="1080">
          <div v-else class="grid size-full place-items-center text-sm text-sand">{{ t('share.preparing') }}</div>
        </Transition>
      </div>

      <div class="grid gap-3">
        <div class="flex flex-wrap gap-2.5">
          <button
            type="button" class="flex items-center gap-2 rounded-xl bg-caramel px-5 py-2.5 font-bold text-ink transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            :disabled="!imageUrl" @click="download"
          >
            <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" /></svg>
            {{ t('share.download') }}
          </button>
          <button
            v-if="canNativeShare" type="button"
            class="flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 font-bold transition hover:border-caramel active:scale-[0.98]"
            @click="nativeShare"
          >
            <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /></svg>
            {{ t('share.native') }}
          </button>
          <button type="button" class="rounded-xl border border-white/15 px-5 py-2.5 font-bold transition hover:border-caramel active:scale-[0.98]" @click="copyLink">
            {{ copied ? t('share.copied') : t('share.copy') }}
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <a
            v-for="l in links" :key="l.name" :href="l.href" target="_blank" rel="noopener"
            class="grid size-11 place-items-center rounded-xl bg-white/5 text-sand transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-cream"
            :aria-label="l.name" :title="l.name"
          >
            <svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true"><path :d="l.icon" /></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
