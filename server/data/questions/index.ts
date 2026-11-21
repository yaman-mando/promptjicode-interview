import type { Question } from '#shared/types/quiz'
import { LEGACY } from './_legacy'
import { JUNIOR } from './junior'
import { MID } from './mid'
import { SENIOR } from './senior'
import { ANGULAR } from './extra/angular'
import { TS_HTML_CSS } from './extra/ts-html-css'
import { VUE_REACT } from './extra/vue-react'
import { WEB } from './extra/web'
import { ARCH_SECURITY } from './backend/arch-security'
import { DB_API } from './backend/db-api'
import { NODE_PYTHON } from './backend/node-python'
import { PHP_DOTNET } from './backend/php-dotnet'
import { PHP_2 } from './backend/php-2'
import { PYTHON_2 } from './backend/python-2'
import { NODE_2 } from './backend/node-2'
import { DOTNET_2 } from './backend/dotnet-2'
import { DATABASES_2 } from './backend/databases-2'
import { API_2 } from './backend/api-2'

/**
 * Question bank. Server-only: answers never reach the browser before the test is submitted.
 * Arabic is neutral written Arabic (not dialect), matching the channel's on-screen text.
 * Run `npm run verify` after adding questions.
 */
export const QUESTIONS: Question[] = [...LEGACY, ...JUNIOR, ...MID, ...SENIOR, ...ANGULAR, ...VUE_REACT, ...TS_HTML_CSS, ...WEB, ...DB_API, ...ARCH_SECURITY, ...NODE_PYTHON, ...PHP_DOTNET, ...PHP_2, ...PYTHON_2, ...NODE_2, ...DOTNET_2, ...DATABASES_2, ...API_2]
