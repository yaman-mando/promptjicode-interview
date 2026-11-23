// Install-to-home-screen state, shared by the header button.
// Chrome/Edge/Android fire `beforeinstallprompt`; iOS Safari doesn't, so there we show a hint instead.
interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const deferred = shallowRef<InstallPromptEvent | null>(null)
const installed = ref(false)
const isIos = ref(false)

export function initPwa() {
  installed.value = matchMedia('(display-mode: standalone)').matches
    || (navigator as Navigator & { standalone?: boolean }).standalone === true
  const ua = navigator.userAgent
  // iPadOS reports itself as Mac; touch points tell it apart
  isIos.value = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)

  addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred.value = e as InstallPromptEvent
  })
  addEventListener('appinstalled', () => {
    installed.value = true
    deferred.value = null
  })
}

export function usePwa() {
  const canPrompt = computed(() => !installed.value && !!deferred.value)
  const showIosHint = computed(() => !installed.value && !deferred.value && isIos.value)

  async function install() {
    const e = deferred.value
    if (!e) return
    deferred.value = null
    await e.prompt()
    const { outcome } = await e.userChoice
    if (outcome === 'accepted') installed.value = true
  }

  return { canPrompt, showIosHint, install }
}
