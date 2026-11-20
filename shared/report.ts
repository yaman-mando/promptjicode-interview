export const REPORT_TYPES = ['wrong_answer', 'unclear', 'translation', 'code', 'other'] as const
export type ReportType = typeof REPORT_TYPES[number]
export const REPORT_NOTE_MAX = 1000
