import { useCallback, useState } from 'react'
import { DAYS } from '../data/days.js'

const KEY = 'ap-v1'
export const TOTAL = 30

const EMPTY = { done: {}, tasks: {}, rating: {}, best: {}, counter: {}, speed: {}, slow: false }

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || '{}') || {}
    return { ...EMPTY, ...s, done: s.done || {}, tasks: s.tasks || {}, rating: s.rating || {}, best: s.best || {}, counter: s.counter || {}, speed: s.speed || {} }
  } catch { return { ...EMPTY } }
}

/** Progress state persisted in localStorage (this browser only). */
export function useProgress() {
  const [S, setS] = useState(load)
  const update = useCallback(fn => {
    setS(prev => {
      const next = structuredClone(prev)
      fn(next)
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* storage unavailable */ }
      return next
    })
  }, [])
  return [S, update]
}

export const todayStr = () => {
  const d = new Date()
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
}
const dayNum = s => Math.round(new Date(s + 'T00:00:00').getTime() / 864e5)

export const doneCount = S => Object.keys(S.done).length
export const nextDay = S => { for (let i = 1; i <= TOTAL; i++) if (!S.done[i]) return i; return null }
export const taskProg = (S, n) => DAYS[n].tasks.filter((_, i) => S.tasks[n + '-' + i]).length / DAYS[n].tasks.length

export function streak(S) {
  const set = new Set(Object.values(S.done).map(dayNum))
  let t = dayNum(todayStr()), c = 0
  if (!set.has(t)) t--
  while (set.has(t)) { c++; t-- }
  return c
}

/** Words for a day; review days gather words from earlier days. */
export function dayWords(d, shuffle) {
  if (!d.review) return d.words || []
  const seen = new Set(), out = []
  d.review.forEach(k => (DAYS[k].words || []).forEach(w => {
    const key = w.en.toLowerCase()
    if (!seen.has(key)) { seen.add(key); out.push(w) }
  }))
  const a = shuffle ? shuf(out) : out
  return d.limit ? a.slice(0, d.limit) : a
}
export const shuf = a => a.slice().sort(() => Math.random() - 0.5)
