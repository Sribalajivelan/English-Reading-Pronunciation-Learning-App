import { DAYS } from '../data/days.js'
import { meaningOf } from '../data/meanings.js'

export const keyOf = w => String(w).toLowerCase().replace(/'/g, '’')

/** Every distinct taught word once, with its Tamil reading, meaning and the day it first appears. */
export const ALL_WORDS = (() => {
  const seen = new Map()
  for (let n = 1; n <= 30; n++) {
    for (const w of DAYS[n].words || []) {
      const k = keyOf(w.en)
      if (!seen.has(k)) seen.set(k, { key: k, en: w.en, ta: w.ta, h: w.h, day: n, meaning: meaningOf(w.en) })
    }
  }
  return [...seen.values()]
})()

const BY_KEY = new Map(ALL_WORDS.map(w => [w.key, w]))

/** Info for any English word shown in the app (reading may be missing for story-only words). */
export function lookup(word) {
  const k = keyOf(word)
  return BY_KEY.get(k) || { key: k, en: word, ta: '', meaning: meaningOf(word) }
}
