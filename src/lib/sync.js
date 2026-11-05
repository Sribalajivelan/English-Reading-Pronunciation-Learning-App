import { useCallback, useEffect, useRef, useState } from 'react'
import { canon, mergeProgress, syncPart } from './progress.js'

/** True when the site was built with Firebase settings. */
export const syncConfigured = !!import.meta.env.VITE_FIREBASE_PROJECT_ID

function explain(e) {
  const c = e?.code || ''
  if (c === 'auth/unauthorized-domain') return 'இந்த இணையதளம் Firebase-ல் அனுமதிக்கப்படவில்லை (Authorized domains-ல் சேர்க்கவும்).'
  if (c === 'auth/popup-blocked') return 'உள்நுழைவுச் சாளரம் தடுக்கப்பட்டது. Pop-up அனுமதித்து மீண்டும் முயலவும்.'
  if (c === 'auth/operation-not-allowed') return 'Firebase-ல் Google உள்நுழைவு இயக்கப்படவில்லை.'
  if (c === 'permission-denied' || c === 'firestore/permission-denied') return 'தரவைச் சேமிக்க அனுமதி இல்லை (Firestore rules-ஐச் சரிபார்க்கவும்).'
  if (c === 'unavailable') return 'இணையம் இல்லை. இணைப்பு வந்ததும் தானாக ஒத்திசைக்கும்.'
  return 'ஒத்திசைவில் பிழை: ' + (c || e?.message || 'தெரியாத பிழை')
}

/**
 * Keeps local progress and the signed-in user's cloud copy in step.
 * Remote changes are merged in (newest change per item wins); local changes are pushed after a short pause.
 */
export function useSync(S, replace) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(syncConfigured ? 'init' : 'off') // off | init | signed-out | syncing | synced | error
  const [error, setError] = useState('')
  const [lastSync, setLastSync] = useState(null)
  const fb = useRef(null)
  const ready = useRef(false)        // true after the first cloud copy arrived and was merged
  const lastRemote = useRef('')      // canonical text of what the cloud holds
  const local = useRef(S)
  const S0 = useRef(S)   // what React last rendered
  local.current = S
  S0.current = S
  const timer = useRef()

  // 1. Load Firebase and follow sign-in state.
  useEffect(() => {
    if (!syncConfigured) return
    let dead = false, stop = () => {}
    import('./firebase.js').then(m => {
      if (dead) return
      fb.current = m
      stop = m.watchAuth(u => { setUser(u); setError(''); setStatus(u ? 'syncing' : 'signed-out') })
    }).catch(e => { setStatus('error'); setError(explain(e)) })
    return () => { dead = true; stop() }
  }, [])

  // Upload local changes: one upload at most every ~1.2s, always sending the latest local copy.
  const push = useCallback(async () => {
    timer.current = null
    if (!user || !fb.current || !ready.current) return
    const part = syncPart(local.current)
    if (canon(part) === lastRemote.current) return
    setStatus('syncing')
    try { await fb.current.saveProgress(user.uid, part); setStatus('synced'); setLastSync(new Date()); setError('') }
    catch (e) { setStatus('error'); setError(explain(e)) }
  }, [user])
  const schedulePush = useCallback(() => { if (!timer.current) timer.current = setTimeout(push, 1200) }, [push])
  useEffect(() => () => clearTimeout(timer.current), [])

  // 2. While signed in, merge in whatever the cloud holds (including changes from other devices).
  useEffect(() => {
    if (!user || !fb.current) return
    ready.current = false
    const stop = fb.current.watchProgress(user.uid, remote => {
      lastRemote.current = remote ? canon(remote) : ''
      const merged = remote ? mergeProgress(local.current, remote) : local.current
      local.current = merged
      if (canon(merged) !== canon(S0.current)) replace(merged)
      ready.current = true
      setStatus(s => (s === 'syncing' && timer.current ? s : 'synced')); setLastSync(new Date()); setError('')
      if (canon(merged) !== lastRemote.current) schedulePush()   // this device is ahead of the cloud
    }, e => { setStatus('error'); setError(explain(e)) })
    return () => { stop(); ready.current = false }
  }, [user, replace, schedulePush])

  // 3. Local edits made while signed in.
  const mine = canon(S)
  useEffect(() => { if (user && ready.current && mine !== lastRemote.current) schedulePush() }, [mine, user, schedulePush])

  const signIn = useCallback(async () => {
    setError('')
    try { await fb.current.signIn() }
    catch (e) { if (e?.code !== 'auth/popup-closed-by-user' && e?.code !== 'auth/cancelled-popup-request') { setStatus('signed-out'); setError(explain(e)) } }
  }, [])
  const signOut = useCallback(async () => { try { await fb.current.signOut() } catch (e) { setError(explain(e)) } }, [])

  return { configured: syncConfigured, status, user, error, lastSync, signIn, signOut, syncNow: push }
}
