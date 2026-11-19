export default defineEventHandler(async (event) => {
  if (!adminPassword(event)) {
    throw createError({ statusCode: 503, statusMessage: 'Admin is not configured' })
  }
  const { password } = await readBody<{ password?: string }>(event) ?? {}
  if (typeof password !== 'string' || !(await checkPassword(event, password))) {
    await new Promise(r => setTimeout(r, 800)) // slow down guessing
    throw createError({ statusCode: 401, statusMessage: 'Wrong password' })
  }
  await startSession(event)
  return { ok: true }
})
