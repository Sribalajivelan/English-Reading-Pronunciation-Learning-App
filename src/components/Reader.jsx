import { useState } from 'react'
import { useApp } from '../lib/context.js'
import { useListen } from '../lib/useListen.js'
import { lookup } from '../lib/words.js'
import { norm, canRecognize } from '../lib/recognize.js'
import SpeakButton from './SpeakButton.jsx'
import MicButton from './MicButton.jsx'
import { SpeakerIcon } from './Icons.jsx'
import TaSpeak from './TaSpeak.jsx'

const clean = t => norm(t).replace(/'/g, '')

function Line({ en, rd, mn, onWord }) {
  const { say } = useApp()
  const listen = useListen(en, 'sentence')
  const r = listen.state === 'done' ? listen.result : null
  const missed = r ? new Set(r.words.filter(m => !m.ok).map(m => m.w.replace(/'/g, ''))) : null
  const toks = en.match(/[A-Za-z’']+|[^A-Za-z’'\s]+/g) || []
  return (
    <div className="line">
      <SpeakButton text={en} label="Read sentence" />
      <div className="tx">
        <div className="en">
          {toks.map((t, j) => {
            const gap = j < toks.length - 1 && /[A-Za-z]/.test(toks[j + 1]) ? ' ' : ''
            if (!/[A-Za-z]/.test(t)) return <span key={j} className="pu">{t}{gap}</span>
            const cls = missed ? (missed.has(clean(t)) ? 'miss' : 'hit') : ''
            return <span key={j}><button type="button" className={cls} onClick={() => { say(t); onWord(t) }}>{t}</button>{gap}</span>
          })}
        </div>
        {rd && <div className="rd">{rd}</div>}
        {mn && <div className="mn">{mn}</div>}
        {listen.state === 'listening' && <div className="fbline listening ta" role="status">கேட்கிறது… இந்த வாக்கியத்தைப் படியுங்கள்</div>}
        {r && (
          <div className={'fbline ta ' + (r.status === 'ok' ? 'ok' : r.status === 'close' ? 'close' : 'miss')} role="status">
            {r.status === 'none' ? 'குரல் கேட்கவில்லை. மீண்டும் முயலுங்கள்'
              : r.status === 'ok' ? 'அருமை! எல்லா வார்த்தைகளும் சரி'
              : `${Math.round(r.score * 100)}% சரி. சிவப்பு வார்த்தைகளை மீண்டும் சொல்லுங்கள் (கேட்டது: “${r.heard}”)`}
          </div>
        )}
      </div>
      <MicButton listen={listen} label="Read this sentence aloud" />
    </div>
  )
}

/** A passage: tap a word to hear it and see its meaning; the mic button checks you reading a line aloud. */
export default function Reader({ p }) {
  const { say } = useApp()
  const [shown, setShown] = useState(false)
  const [info, setInfo] = useState(null)
  const lines = p.lines.map(l => l.split('|'))
  const full = lines.map(l => l[0]).join(' ')
  const i = info && lookup(info)
  return (
    <section className="pass">
      <div className="ph">
        <div><h3>{p.t}</h3><span className="ta muted" style={{ fontSize: '.85rem' }}>{p.ta}</span></div>
        <button className="btn ghost" type="button" onClick={() => say(full)}><SpeakerIcon /> முழுதும் கேள்</button>
      </div>
      <div className="wordinfo ta" aria-live="polite">
        {i
          ? <><b className="eng">{i.en}</b>{i.ta && <span className="rd2">{i.ta}</span>}<span>{i.meaning || 'பொருள் இன்னும் சேர்க்கப்படவில்லை'}</span>{i.meaning && <TaSpeak text={i.meaning} />}</>
          : <span className="muted">ஒரு வார்த்தையைத் தொட்டால் ஒலி, வாசிப்பு, பொருள் தெரியும்.{canRecognize ? ' மைக் பொத்தானால் வாக்கியத்தை நீங்களே படித்துப் பாருங்கள்.' : ''}</span>}
      </div>
      {lines.map(([en, rd, mn], k) => <Line key={k} en={en} rd={rd} mn={mn} onWord={setInfo} />)}
      {p.sum && <details className="qa"><summary>தமிழ் பொருள்</summary><p>{p.sum}</p><TaSpeak text={p.sum} label="தமிழில் கேள்" withLabel /></details>}
      {p.q && (
        <div className="qa">
          <div><b>Q:</b> {p.q[0]} <span className="muted">({p.q[1]})</span></div>
          {!shown && <button className="btn ghost" type="button" onClick={() => setShown(true)}>பதிலைக் காட்டு</button>}
          {shown && <div className="ans">{p.q[2]} · {p.q[3]}</div>}
        </div>
      )}
    </section>
  )
}
