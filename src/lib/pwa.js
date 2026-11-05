import { useEffect, useState } from 'react'

/** True while the device has an internet connection. */
export function useOnline() {
  const [on, setOn] = useState(typeof navigator === 'undefined' ? true : navigator.onLine)
  useEffect(() => {
    const up = () => setOn(true), down = () => setOn(false)
    window.addEventListener('online', up); window.addEventListener('offline', down)
    return () => { window.removeEventListener('online', up); window.removeEventListener('offline', down) }
  }, [])
  return on
}

const isStandalone = () => window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream

/** "Add to home screen": Chrome/Android gives a prompt; iPhone needs manual steps. */
export function useInstall() {
  const [evt, setEvt] = useState(null)
  const [hidden, setHidden] = useState(() => { try { return localStorage.getItem('ap-install-hidden') === '1' } catch { return false } })
  useEffect(() => {
    const on = e => { e.preventDefault(); setEvt(e) }
    const done = () => setEvt(null)
    window.addEventListener('beforeinstallprompt', on); window.addEventListener('appinstalled', done)
    return () => { window.removeEventListener('beforeinstallprompt', on); window.removeEventListener('appinstalled', done) }
  }, [])
  const dismiss = () => { setHidden(true); try { localStorage.setItem('ap-install-hidden', '1') } catch { /* ignore */ } }
  const install = async () => { if (!evt) return; evt.prompt(); await evt.userChoice.catch(() => {}); setEvt(null) }
  const standalone = typeof window !== 'undefined' && isStandalone()
  return { canPrompt: !!evt && !hidden && !standalone, showIOS: isIOS() && !standalone && !hidden && !evt, install, dismiss }
}
