import { useCallback, useEffect, useState } from 'react'
import { DAYS } from '../data/days.js'

const KEY = 'ap-v1'
const BAK = 'ap-v1-bak'
export const TOTAL = 30
const VERSION = 2

const MAPS = ['done', 'tasks', 'rating', 'best', 'counter', 'speed', 'srs']

const EMPTY = { v: VERSION, done: {}, tasks: {}, rating: {}, best: {}, counter: {}, speed: {}, srs: {}, ts: {}, slow: false, voice: '', voiceTa: '', autoTalk: false, saved: '' }

/** Fill in any missing fields so older saves keep working. */
function normalize(s) {
  s = s && typeof s === 'object' ? s : {}
  const o = (k) => (s[k] && typeof s[k] === 'object' ? s[k] : {})
  return { ...EMPTY, ...s, v: VERSION, done: o('done'), tasks: o('tasks'), rating: o('rating'), best: o('best'), counter: o('counter'), speed: o('speed'), srs: o('srs'), ts: o('ts') }
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

/** Record when each item last changed, so two devices can keep the newest change per item. */
function stampChanges(prev, next) {
  const now = Date.now()
  const ts = { ...next.ts }
  for (const m of MAPS) {
    for (const k of new Set([...Object.keys(prev[m]), ...Object.keys(next[m])])) {
      if (JSON.stringify(prev[m][k]) !== JSON.stringify(next[m][k])) ts[m + '.' + k] = now
    }
  }
  next.ts = ts
}

/** Progress state saved in localStorage, kept in sync across open tabs. */
export function useProgress() {
  const [S, setS] = useState(load)
  const [saveOk, setSaveOk] = useState(true)

  const update = useCallback(fn => {
    setS(prev => {
      const next = structuredClone(prev)
      fn(next)
      stampChanges(prev, next)
      next.saved = new Date().toISOString()
      setSaveOk(write(next))
      return next
    })
    requestPersistence()
  }, [])

  /** Replace progress with an already merged copy (used by cloud sync). Keeps this device's voice settings. */
  const replace = useCallback(next => {
    setS(prev => {
      const n = { ...normalize(next), slow: prev.slow, voice: prev.voice, voiceTa: prev.voiceTa, autoTalk: prev.autoTalk, saved: new Date().toISOString() }
      setSaveOk(write(n))
      return n
    })
  }, [])

  useEffect(() => {
    const on = e => { if (e.key === KEY) setS(read(KEY) || normalize({})) }
    window.addEventListener('storage', on)
    return () => window.removeEventListener('storage', on)
  }, [])

  return [S, update, saveOk, replace]
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

const syncKeys = ['done', 'tasks', 'rating', 'best', 'counter', 'speed', 'srs', 'ts']
/** The part of progress that is shared between devices (not voice or speed settings). */
export function syncPart(S) {
  const n = normalize(S)
  return Object.fromEntries(syncKeys.map(k => [k, n[k]]))
}
/** Stable text form of the shared part, for "did anything change?" checks. */
export function canon(S) {
  const sort = v => (v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map(k => [k, sort(v[k])])) : v)
  return JSON.stringify(sort(syncPart(S)))
}

// When two saves have no timestamps for an item (older backups), keep the most generous value.
const tie = {
  done: (a, b) => (a < b ? a : b), tasks: () => true, rating: (_, b) => b,
  best: Math.max, counter: Math.max, speed: Math.min,
  srs: (a, b) => (a.b >= b.b ? a : b),
}

/** Combine two saves. For each item the newest change wins, including deletions (un-ticking, reset). */
export function mergeProgress(a, b) {
  a = normalize(a); b = normalize(b)
  const out = normalize(a)
  out.ts = {}
  for (const m of MAPS) {
    out[m] = {}
    const keys = new Set([...Object.keys(a[m]), ...Object.keys(b[m])])
    for (const t of [...Object.keys(a.ts), ...Object.keys(b.ts)]) if (t.startsWith(m + '.')) keys.add(t.slice(m.length + 1))
    for (const k of keys) {
      const id = m + '.' + k
      const ta = a.ts[id] || 0, tb = b.ts[id] || 0
      const va = a[m][k], vb = b[m][k]
      let v
      if (ta !== tb) v = ta > tb ? va : vb
      else if (va === undefined) v = vb
      else if (vb === undefined) v = va
      else v = tie[m](va, vb)
      if (v !== undefined) out[m][k] = v
      if (Math.max(ta, tb) > 0) out.ts[id] = Math.max(ta, tb)
    }
  }
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
