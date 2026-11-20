/** Mark a report as done (or back to new). */
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const { status } = await readBody<{ status?: string }>(event)
  if (!Number.isInteger(id) || (status !== 'new' && status !== 'done')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid' })
  }
  await useDB(event).prepare('UPDATE reports SET status = ? WHERE id = ?').bind(status, id).run()
  return { ok: true }
})
