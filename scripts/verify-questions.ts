/**
 * Checks the question bank:
 * - structure: unique ids, answer in range, all 3 languages, same number of options per language
 * - JavaScript output questions (run !== false): runs the code in Node and compares the real
 *   output with the option marked as correct.
 *
 * Usage: npm run verify            (all questions)
 *        npm run verify -- j-       (only ids starting with "j-")
 */
import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { QUESTIONS } from '../server/data/questions/index'
import { LOCALES } from '../shared/types/quiz'

const filter = process.argv[2] ?? ''
const dir = mkdtempSync(join(tmpdir(), 'pci-verify-'))
let problems = 0
let ran = 0

const fail = (id: string, msg: string) => {
  problems++
  console.log(`✗ ${id}: ${msg}`)
}

/** Loose comparison: ignore spaces, quotes, commas and brackets style differences. */
const norm = (s: string) => s.replace(/[\s'"`,]/g, '')

const seen = new Set<string>()
for (const q of QUESTIONS) {
  if (seen.has(q.id)) fail(q.id, 'duplicate id')
  seen.add(q.id)
  if (!q.id.startsWith(filter)) continue

  const counts = LOCALES.map(l => (q.text[l]?.options ?? q.options ?? []).length)
  if (new Set(counts).size !== 1 || counts[0]! < 2) fail(q.id, `option counts per language: ${counts.join('/')}`)
  if (q.answer < 0 || q.answer >= counts[0]!) fail(q.id, `answer ${q.answer} out of range`)
  for (const l of LOCALES) {
    if (!q.text[l]?.prompt || !q.text[l]?.explanation) fail(q.id, `missing ${l} text`)
  }
  const opts = q.options ?? q.text.en.options ?? []
  if (new Set(opts.map(o => o.replace(/\s/g, ''))).size !== opts.length) fail(q.id, 'two options are the same')

  if (q.run === false || !q.code || (q.codeLang && q.codeLang !== 'js')) continue

  // Run the snippet: console.log lines are joined with ", ", args inside one call with " ".
  const file = join(dir, `${q.id}.mjs`)
  writeFileSync(file, `
import { inspect } from 'node:util'
const lines = []
const fmt = v => typeof v === 'string' ? v : inspect(v, { breakLength: Infinity })
console.log = (...a) => lines.push(a.map(fmt).join(' '))
const done = () => process.stdout.write(JSON.stringify(lines))
process.on('uncaughtException', e => { lines.push(e.name); done(); process.exit(0) })
process.on('unhandledRejection', e => { lines.push(e?.name ?? String(e)); done(); process.exit(0) })
process.on('beforeExit', done)
try {
${q.code}
} catch (e) { lines.push(e.name) }
`)
  const r = spawnSync(process.execPath, [file], { encoding: 'utf8', timeout: 5000 })
  ran++
  let lines: string[] = []
  try { lines = JSON.parse(r.stdout) }
  catch { fail(q.id, `could not run: ${r.stderr.split('\n').slice(0, 3).join(' ')}`); continue }

  const actual = lines.join(', ')
  const expected = opts[q.answer]!
  if (norm(actual) !== norm(expected)) {
    const other = opts.findIndex(o => norm(o) === norm(actual))
    fail(q.id, `real output "${actual}" ≠ marked answer "${expected}"${other >= 0 ? ` (matches option ${other})` : ''}`)
  }
}

const byLevel = ['junior', 'mid', 'senior'].map(l => `${l}: ${QUESTIONS.filter(q => q.level === l).length}`).join(', ')
console.log(`\n${QUESTIONS.length} questions (${byLevel}). Ran ${ran} code snippets. ${problems ? `${problems} problem(s).` : 'All good ✓'}`)
process.exit(problems ? 1 : 0)
