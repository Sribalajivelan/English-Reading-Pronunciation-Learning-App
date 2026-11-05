import { useCallback, useEffect, useState } from 'react'
import { DAYS } from '../data/days.js'

const KEY = 'ap-v1'
const BAK = 'ap-v1-bak'
export const TOTAL = 30
const VERSION = 2

const EMPTY = { v: VERSION, done: {}, tasks: {}, rating: {}, best: {}, counter: {}, speed: {}, slow: false, voice: '', saved: '' }

/** Fill in any missing fields so older saves keep working. */
function normalize(s) {
  s = s && typeof s === 'object' ? s : {}
  const o = (k) => (s[k] && typeof s[k] === 'object' ? s[k] : {})
  return { ...EMPTY, ...s, v: VERSION, done: o('done'), tasks: o('tasks'), rating: o('rating'), best: o('best'), counter: o('counter'), speed: o('speed') }
}

function read(key) {
  try { const raw = localStorage.getItem(key); return raw ? normalize(JSON.parse(raw)) : null } catch { return null }
}

/** Load the main save; if it is damaged, fall back to the automatic backup copy. */
function load() { return read(KEY) || read(BAK) || normalize({}) }

function write(next) {
  try {
    const prev = localStorage.getItem(KEY)
    if (prev) localStorage.setItem(BAK, prev)       // keep the previous version as a safety copy
    localStorage.setItem(KEY, JSON.stringify(next))
    return true
  } catch { return false }
}

let persistAsked = false
/** Ask the browser not to clear our data when the device is low on space. */
export function requestPersistence() {
  if (persistAsked || !navigator.storage?.persist) return
  persistAsked = true
  navigator.storage.persist().catch(() => {})
}

/** Progress state saved in localStorage, kept in sync across open tabs. */
export function useProgress() {
  const [S, setS] = useState(load)
  const [saveOk, setSaveOk] = useState(true)

  const update = useCallback(fn => {
    setS(prev => {
      const next = structuredClone(prev)
      fn(next)
      next.saved = new Date().toISOString()
      setSaveOk(write(next))
      return next
    })
    requestPersistence()
  }, [])

  useEffect(() => {
    const on = e => { if (e.key === KEY) setS(read(KEY) || normalize({})) }
    window.addEventListener('storage', on)
    return () => window.removeEventListener('storage', on)
  }, [])

  return [S, update, saveOk]
}

/* ---------- backup code: short text you can send over WhatsApp ---------- */
const PREFIX = 'AP2:'

export function exportCode(S) {
  const { slow, voice, saved, ...core } = S
  return PREFIX + btoa(JSON.stringify({ ...core, slow, voice }))
}

/** Parse a backup code or a backup file's text. Returns normalized progress or null. */
export function parseBackup(text) {
  try {
    const t = String(text).trim()
    const json = t.startsWith(PREFIX) ? atob(t.slice(PREFIX.length).replace(/\s/g, '')) : t
    const data = JSON.parse(json)
    if (!data || typeof data !== 'object' || !('done' in data)) return null
    return normalize(data)
  } catch { return null }
}

/** Combine two saves without losing anything from either. */
export function mergeProgress(a, b) {
  const out = normalize(a)
  for (const [k, v] of Object.entries(b.done)) if (!out.done[k] || v < out.done[k]) out.done[k] = v
  for (const [k, v] of Object.entries(b.tasks)) if (v) out.tasks[k] = true
  for (const [k, v] of Object.entries(b.rating)) out.rating[k] = v
  for (const [k, v] of Object.entries(b.best)) out.best[k] = Math.max(out.best[k] || 0, v)
  for (const [k, v] of Object.entries(b.counter)) out.counter[k] = Math.max(out.counter[k] || 0, v)
  for (const [k, v] of Object.entries(b.speed)) out.speed[k] = out.speed[k] ? Math.min(out.speed[k], v) : v
  return out
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
