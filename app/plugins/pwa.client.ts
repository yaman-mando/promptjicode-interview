export default defineNuxtPlugin(() => {
  initPwa()
  // Only in production builds: a service worker in dev would serve stale Vite modules
  if (!import.meta.dev && 'serviceWorker' in navigator) {
    const register = () => navigator.serviceWorker.register('/sw.js').catch(() => {})
    if (document.readyState === 'complete') register()
    else addEventListener('load', register, { once: true })
  }
})
