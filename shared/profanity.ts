/**
 * A small bad-word filter for user notes (Arabic, English, Turkish).
 * Used in the browser to warn while typing, and on the server to refuse the report.
 * It works on normalised words, so common tricks (diacritics, stretched letters,
 * a few digit/symbol swaps) are caught. It is a courtesy filter, not a full moderation system.
 */

// Arabic, written in normalised form (see normalize): أإآ→ا, ة→ه, ى→ي, no diacritics
const AR = [
  'كس', 'كسم', 'كسمك', 'كسختك', 'زب', 'زبي', 'زبك', 'طيز', 'طيزك', 'شرموط', 'شرموطه', 'شراميط',
  'عرص', 'عرصه', 'معرص', 'منيوك', 'منيوكه', 'نيك', 'ينيك', 'انيك', 'نياك', 'متناك', 'متناكه', 'منيك',
  'قحبه', 'قحاب', 'خول', 'لوطي', 'عاهره', 'ديوث', 'خرا', 'خره', 'زق', 'تفو', 'كلب', 'كلاب', 'حمار',
  'حمير', 'حيوان', 'جحش', 'حقير', 'سافل', 'ابن الكلب', 'يلعن', 'انقلع',
]
// Prefixes that stick to Arabic words: و، ف، ب، ال، يا
const AR_PREFIX = /^(?:يا|وال|فال|بال|ال|و|ف|ب)(?=.{2,})/

const EN = [
  'fuck', 'fucker', 'fucking', 'motherfucker', 'shit', 'bullshit', 'bitch', 'asshole', 'bastard',
  'dick', 'cunt', 'whore', 'slut', 'retard', 'idiot', 'moron', 'dumbass', 'jackass', 'wtf', 'stfu',
]
// Strong English words that are offensive even inside a longer word
const EN_INSIDE = ['fuck', 'shit', 'cunt', 'bitch']

const TR = [
  'amk', 'amq', 'sik', 'sikim', 'sikerim', 'siktir', 'sikik', 'orospu', 'piç', 'yarak',
  'göt', 'götveren', 'ananı', 'amına', 'amina', 'yavşak', 'pezevenk', 'kahpe', 'şerefsiz', 'oç',
  'gerizekalı', 'dangalak', 'puşt',
]

const WORDS = new Set([...AR, ...EN, ...TR].map(w => normalize(w)))
const PHRASES = [...AR, ...EN, ...TR].filter(w => w.includes(' ')).map(w => normalize(w))

function normalize(text: string): string {
  return text
    .toLocaleLowerCase('tr')
    .replace(/[ً-ٰٟـ]/g, '') // Arabic diacritics and tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[0@4]/g, m => ({ 0: 'o', '@': 'a', 4: 'a' } as Record<string, string>)[m]!)
    .replace(/[$5]/g, 's')
    .replace(/1|!/g, 'i')
    .replace(/(.)\1{2,}/g, '$1$1') // stretched letters: "fuuuuck" → "fuuck"
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Words in the text that the filter flags (empty array = clean). */
// Masked spellings like "f*ck", "fu**ing", "sh*t"
const MASKED = [/\bf[\s*._-]*[u*][\s*._-]*[c*][\s*._-]*k/i, /\bf\*{2,}/i, /\bfu\*+/i, /\bsh[\s*._-]*[i1*][\s*._-]*t\b/i]

export function findProfanity(text: string): string[] {
  if (!text) return []
  const norm = normalize(text)
  const hits = new Set<string>()
  for (const re of MASKED) {
    const m = text.match(re)
    if (m) hits.add(m[0])
  }
  for (const raw of norm.split(' ')) {
    const variants = [raw, raw.replace(/(.)\1+/g, '$1'), raw.replace(AR_PREFIX, '')]
    if (variants.some(v => WORDS.has(v))) hits.add(raw)
    else if (EN_INSIDE.some(w => raw.includes(w))) hits.add(raw)
  }
  for (const p of PHRASES) if (norm.includes(p)) hits.add(p)
  return [...hits]
}

export const hasProfanity = (text: string) => findProfanity(text).length > 0
