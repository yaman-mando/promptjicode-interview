// The full question bank lives in a private repository and is not part of this one.
// Before any Nuxt command, make sure server/data/questions/ exists:
// - QUESTIONS_TOKEN set: clone the private bank (read-only token).
// - On CI without a token: fail, so production never ships with the sample bank.
// - Locally without a token: copy the sample bank (one question per topic and level).
import { cpSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dest = join(root, 'server/data/questions')
const sample = join(root, 'server/data/sample')

export function ensureQuestions() {
  if (existsSync(join(dest, 'index.ts'))) return
  // `nuxt prepare` (npm postinstall) only generates types and never reads the bank.
  // On CI it can run before build secrets are available, so leave the fetch to the build.
  if (process.argv.includes('prepare')) return

  const token = process.env.QUESTIONS_TOKEN
  const repo = process.env.QUESTIONS_REPO || 'yaman-mando/promptjicode-questions'
  if (token) {
    // Token goes in a header, not the URL, so it never shows up in logs
    const auth = Buffer.from(`x-access-token:${token}`).toString('base64')
    execFileSync('git', [
      '-c', `http.extraHeader=Authorization: Basic ${auth}`,
      'clone', '--quiet', '--depth', '1', `https://github.com/${repo}.git`, dest,
    ], { stdio: ['ignore', 'inherit', 'inherit'] })
    console.log('[questions] full bank fetched')
    return
  }

  if (process.env.CI || process.env.WORKERS_CI) {
    throw new Error('[questions] QUESTIONS_TOKEN is not set: refusing to build with the sample bank')
  }
  cpSync(sample, dest, { recursive: true })
  console.log('[questions] full bank not available, using the sample bank')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) ensureQuestions()
