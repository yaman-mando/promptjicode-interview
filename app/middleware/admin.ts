/** Sends visitors who are not signed in to the admin login page. */
export default defineNuxtRouteMiddleware(async () => {
  const localePath = useLocalePath()
  const me = await useRequestFetch()('/api/admin/me').catch(() => null)
  if (!me?.admin) return navigateTo(localePath('/admin/login'))
})
