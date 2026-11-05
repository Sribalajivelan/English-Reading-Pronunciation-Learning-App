// Spaced repetition (Leitner boxes). A word the learner gets right moves up a box and comes back
// after a longer gap; a miss sends it back to box 0 so it returns tomorrow.
import { ALL_WORDS, keyOf } from './words.js'
import { todayStr } from './progress.js'

const GAPS = [1, 2, 4, 7, 15, 30, 60]      // days until next review, by box
export const MASTERED_BOX = 4
export const SESSION_SIZE = 10
const NEW_PER_SESSION = 5

export function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + n)
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
}

/** Call inside update(x => ...) to note that the learner got a word right or wrong. */
export function record(x, word, ok) {
  const k = keyOf(word)
  const cur = x.srs[k] || { b: 0, m: 0 }
  const b = ok ? Math.min(cur.b + 1, GAPS.length - 1) : 0
  x.srs[k] = { b, m: cur.m + (ok ? 0 : 1), d: addDays(todayStr(), GAPS[b]) }
}

/**
 * Words to practise now.
 * due   = words that were practised before and are due again
 * fresh = words from completed days that have never been reviewed
 */
export function reviewQueue(S) {
  const today = todayStr()
  const learned = new Set(Object.keys(S.done).map(Number))
  const due = [], fresh = []
  for (const w of ALL_WORDS) {
    const e = S.srs[w.key]
    if (e) { if (e.d <= today) due.push({ w, e }) }
    else if (learned.has(w.day)) fresh.push(w)
  }
  due.sort((a, b) => a.e.b - b.e.b || a.e.d.localeCompare(b.e.d))
  const items = [...due.map(x => x.w), ...fresh.slice(0, NEW_PER_SESSION)].slice(0, SESSION_SIZE)
  return { dueCount: due.length, freshCount: fresh.length, items, available: due.length + Math.min(fresh.length, NEW_PER_SESSION) }
}

export function srsStats(S) {
  const all = Object.values(S.srs)
  return { tracked: all.length, mastered: all.filter(e => e.b >= MASTERED_BOX).length, tricky: all.filter(e => e.m >= 2 && e.b < MASTERED_BOX).length }
}

/** When the next word comes due (YYYY-MM-DD), or null. */
export function nextDueDate(S) {
  const ds = Object.values(S.srs).map(e => e.d).sort()
  return ds[0] || null
}
