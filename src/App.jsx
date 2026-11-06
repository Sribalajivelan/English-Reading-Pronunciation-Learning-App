import { useCallback, useEffect, useRef, useState } from 'react'
import { AppCtx } from './lib/context.js'
import { useProgress } from './lib/progress.js'
import { useSync } from './lib/sync.js'
import { speak, hasTTS } from './lib/speech.js'
import { loadClips, playClip } from './lib/clips.js'
import { useOnline } from './lib/pwa.js'
import ExplainSheet from './components/ExplainSheet.jsx'
import { explainFor } from './data/explain.js'
import { LMAP } from './data/letters.js'
import { NAV, useRoute } from './lib/router.js'
import VoicePicker from './components/VoicePicker.jsx'
import Home from './views/Home.jsx'
import Plan from './views/Plan.jsx'
import Day from './views/Day.jsx'
import Letters from './views/Letters.jsx'
import Practice from './views/Practice.jsx'
import Read from './views/Read.jsx'
import Review from './views/Review.jsx'
import Sounds from './views/Sounds.jsx'
import Spelling from './views/Spelling.jsx'
import Record from './views/Record.jsx'

export default function App() {
  const [S, update, saveOk, replace] = useProgress()
  const sync = useSync(S, replace)
  const route = useRoute()
  const online = useOnline()
  const [msg, setMsg] = useState('')
  const [sheet, setSheet] = useState(null)
  const timer = useRef()

  const toast = useCallback(m => {
    setMsg(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(''), 2200)
  }, [])
  const say = useCallback((t, clip) => { if (clip && playClip(clip, S.slow)) return; if (!speak(t, S.slow, S.voice)) toast(hasTTS ? 'ஒலி இயக்க முடியவில்லை' : 'இந்த உலாவியில் ஒலி வசதி இல்லை') }, [S.slow, S.voice, toast])
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => { loadClips() }, [])

  const explain = useCallback((L, word, wordTa) => {
    const x = LMAP[L]
    setSheet({ letter: L, word, wordTa, note: explainFor(L, word, wordTa, x.ta, x.vowel) })
  }, [])
  const ctx = { S, update, say, toast, saveOk, sync, explain }
  const cur = { day: 'plan', review: 'practice', spelling: 'practice', sounds: 'letters', record: 'letters' }[route.v] || route.v
  const view = { home: <Home />, plan: <Plan />, letters: <Letters />, practice: <Practice />, read: <Read />, review: <Review />, sounds: <Sounds />, spelling: <Spelling />, record: <Record /> }

  return (
    <AppCtx.Provider value={ctx}>
      {!online && <div className="offline ta" role="status">இணையம் இல்லை. பாடங்கள் தொடர்ந்து வேலை செய்யும்; குரல் சரிபார்ப்பும் ஒத்திசைவும் இணைப்பு வந்ததும் செயல்படும்.</div>}
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
      {sheet && <ExplainSheet info={sheet} onClose={() => setSheet(null)} />}
      {msg && <div className="toast" role="status" aria-live="polite">{msg}</div>}
    </AppCtx.Provider>
  )
}
