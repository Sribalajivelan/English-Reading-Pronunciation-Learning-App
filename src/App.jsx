import { useCallback, useEffect, useRef, useState } from 'react'
import { AppCtx } from './lib/context.js'
import { useProgress } from './lib/progress.js'
import { speak, hasTTS } from './lib/speech.js'
import { NAV, useRoute } from './lib/router.js'
import VoicePicker from './components/VoicePicker.jsx'
import Home from './views/Home.jsx'
import Plan from './views/Plan.jsx'
import Day from './views/Day.jsx'
import Letters from './views/Letters.jsx'
import Practice from './views/Practice.jsx'
import Read from './views/Read.jsx'

export default function App() {
  const [S, update, saveOk] = useProgress()
  const route = useRoute()
  const [msg, setMsg] = useState('')
  const timer = useRef()

  const toast = useCallback(m => {
    setMsg(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(''), 2200)
  }, [])
  const say = useCallback(t => { if (!speak(t, S.slow, S.voice)) toast(hasTTS ? 'ஒலி இயக்க முடியவில்லை' : 'இந்த உலாவியில் ஒலி வசதி இல்லை') }, [S.slow, S.voice, toast])
  useEffect(() => () => clearTimeout(timer.current), [])

  const ctx = { S, update, say, toast, saveOk }
  const cur = route.v === 'day' ? 'plan' : route.v
  const view = { home: <Home />, plan: <Plan />, letters: <Letters />, practice: <Practice />, read: <Read /> }

  return (
    <AppCtx.Provider value={ctx}>
      <div className="wrap">
        <div className="top">
          <a className="brand ta" href="#home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <b>ஆங்கிலம் படிப்போம்</b><span>30-Day English Reading &amp; Pronunciation</span>
          </a>
          <div className="tools">
            <button className="slow" type="button" aria-pressed={!!S.slow}
              onClick={() => { update(x => { x.slow = !x.slow }); toast(S.slow ? 'சாதாரண வேகம்' : 'மெதுவான ஒலி இயக்கப்பட்டது') }}>
              <i />மெதுவான ஒலி
            </button>
            <VoicePicker />
          </div>
        </div>
        <main className="stack" tabIndex={-1}>{route.v === 'day' ? <Day n={route.n} /> : view[route.v]}</main>
      </div>
      <nav aria-label="Main">
        <div className="in">
          {NAV.map(([k, ta, en]) => <a key={k} href={'#' + k} aria-current={k === cur ? 'page' : undefined}>{ta}<small>{en}</small></a>)}
        </div>
      </nav>
      {msg && <div className="toast" role="status" aria-live="polite">{msg}</div>}
    </AppCtx.Provider>
  )
}
