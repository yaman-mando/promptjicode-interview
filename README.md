# PromptjiCode Interview

Frontend interview practice in **Arabic, English and Turkish**. Pick a level (Junior, Mid, Senior), answer real interview questions, get your score, a breakdown by topic, a full explanation for every answer, and see how you compare with everyone else who took the same test.

Part of [PromptjiCode](https://github.com/promptjicode).

## Stack

- **Nuxt 4** + TypeScript, Tailwind CSS v4, `@nuxtjs/i18n` (Arabic RTL, English, Turkish)
- **Cloudflare Workers** for hosting and the API
- **Cloudflare D1** (SQLite) for results and percentiles

## How it works

- Questions live in `server/data/questions.ts` and never reach the browser with their answers.
- `GET /api/quiz/start` picks random questions for a level and returns them with a signed token.
- `POST /api/quiz/submit` checks the token, grades on the server and stores the attempt (no personal data).
- `GET /api/result/:id` returns the score, topic breakdown, explanations and the percentile among people at the same level.

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

## Adding a question

Add an object to `server/data/questions.ts` with `level`, `topic`, optional `code`, `options`, the index of the correct `answer`, and a `prompt` and `explanation` for each language (`ar`, `en`, `tr`).
