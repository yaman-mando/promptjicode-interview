export default defineEventHandler(async (event) => {
  return { configured: Boolean(adminPassword(event)), admin: await isAdmin(event) }
})
