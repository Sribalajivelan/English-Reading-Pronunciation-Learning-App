import { useState } from 'react'
import { useApp } from '../lib/context.js'
import SpeakButton from './SpeakButton.jsx'
import { SpeakerIcon } from './Icons.jsx'

/** A passage: each word is tappable, each line has a play button. Lines are "english|reading|meaning". */
export default function Reader({ p }) {
  const { say } = useApp()
  const [shown, setShown] = useState(false)
  const lines = p.lines.map(l => l.split('|'))
  const full = lines.map(l => l[0]).join(' ')
  return (
    <section className="pass">
      <div className="ph">
        <div><h3>{p.t}</h3><span className="ta muted" style={{ fontSize: '.85rem' }}>{p.ta}</span></div>
        <button className="btn ghost" type="button" onClick={() => say(full)}><SpeakerIcon /> முழுதும் கேள்</button>
      </div>
      {lines.map(([en, rd, mn], i) => (
        <div className="line" key={i}>
          <SpeakButton text={en} label="Read sentence" />
          <div className="tx">
            <div className="en">
              {(() => {
                const toks = en.match(/[A-Za-z’']+|[^A-Za-z’'\s]+/g) || []
                return toks.map((t, j) => {
                  const gap = j < toks.length - 1 && /[A-Za-z]/.test(toks[j + 1]) ? ' ' : ''
                  return /[A-Za-z]/.test(t)
                    ? <span key={j}><button type="button" onClick={() => say(t)}>{t}</button>{gap}</span>
                    : <span key={j} className="pu">{t}{gap}</span>
                })
              })()}
            </div>
            {rd && <div className="rd">{rd}</div>}
            {mn && <div className="mn">{mn}</div>}
          </div>
        </div>
      ))}
      {p.sum && <details className="qa"><summary>தமிழ் பொருள்</summary><p>{p.sum}</p></details>}
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
