# PromptjiCode Interview

**Live: [interview.promptjicode.com](https://interview.promptjicode.com)**

Interview practice for **Frontend, Backend and Full-stack** developers in **Arabic, English and Turkish**. Pick a level (Junior, Mid, Senior) or take the adaptive open test, answer interview-style questions, get your score, a breakdown by topic, a full explanation for every answer, and see how you compare with everyone else who took the same test.

Part of [PromptjiCode](https://github.com/promptjicode).

## Stack

- **Nuxt 4** + TypeScript, Tailwind CSS v4, `@nuxtjs/i18n` (Arabic RTL, English, Turkish)
- **Cloudflare Workers** for hosting and the API
- **Cloudflare D1** (SQLite) for results and percentiles

## How it works

- Questions live in `server/data/questions/` and never reach the browser with their answers.
- `GET /api/quiz/start` picks random questions for a level and returns them with a signed token.
- `POST /api/quiz/submit` checks the token, grades on the server and stores the attempt (no personal data).
- `GET /api/result/:id` returns the score, topic breakdown, explanations and the percentile among people at the same level.

## Question bank

The full question bank is private. This repository ships a small sample (`server/data/sample/`, one question per topic and level) so the app runs out of the box: on the first `npm run dev` or `npm run build` it is copied to `server/data/questions/`.

With access to the private bank, set `QUESTIONS_TOKEN` (a read-only GitHub token) and delete `server/data/questions/`; the next build fetches the full bank (`scripts/ensure-questions.mjs`).

## Run locally

```bash
npm install
npm run db:migrate:local   # creates the local D1 database
npm run dev                # http://localhost:3000
```

## Deploy (free tier)

Deployed with **Cloudflare Workers Builds**: every push to `main` builds and deploys.

- Build command: `npm run build`
- Deploy command: `npm run deploy:ci` (applies D1 migrations, then deploys)
- Secret: `NUXT_QUIZ_SECRET` (any long random string), set in the Worker's settings
- Build secret: `QUESTIONS_TOKEN`, so the build can fetch the private question bank. Without it, the CI build stops instead of shipping the sample.

## Adding a question

In the private bank, add an object with `level`, `topic`, optional `code`, `options`, the index of the correct `answer`, and a `prompt` and `explanation` for each language (`ar`, `en`, `tr`). Then run `npm run verify`.
