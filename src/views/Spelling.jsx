import { useRef, useState } from 'react'
import { useApp } from '../lib/context.js'
import { DAYS } from '../data/days.js'
import { meaningOf } from '../data/meanings.js'
import { TOTAL, shuf } from '../lib/progress.js'
import { record } from '../lib/srs.js'
import { BackIcon, SpeakerIcon } from '../components/Icons.jsx'
import Mathi from '../components/Mathi.jsx'
import { roundEnd } from '../data/persona.js'

/** Simple letters-only words that can be typed from hearing them. */
function spellWords(S) {
  const lastDone = Math.max(0, ...Object.keys(S.done).map(Number))
  const max = Math.min(TOTAL, Math.max(6, lastDone + 1))
  const seen = new Set(), out = []
  for (let i = 1; i <= max; i++) {
    for (const w of DAYS[i].words || []) {
      const k = w.en.toLowerCase()
      if (/^[a-z]{3,9}$/.test(w.en) && !seen.has(k)) { seen.add(k); out.push(w) }
    }
  }
  return out
}

function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}

const ROUND = 10

export default function Spelling() {
  const { S, update, say } = useApp()
  const [Q, setQ] = useState(null)
  const [text, setText] = useState('')
  const input = useRef(null)

  const start = () => {
    const pool = spellWords(S)
    const items = shuf(pool).slice(0, ROUND)
    setQ({ items, i: 0, score: 0, res: null, hint: 0 })
    setText('')
    setTimeout(() => { say(items[0].en); input.current?.focus() }, 80)
  }
  const back = <a className="crumb" href="#practice"><BackIcon /> பயிற்சி</a>

  if (!Q) {
    return (
      <>
        {back}
        <div><h2 className="ta">எழுத்துப்பிழை பயிற்சி</h2><p className="muted ta">ஒலியைக் கேட்டு, ஆங்கிலச் சொல்லை எழுதுங்கள். தமிழ்ப் பொருள் துணைக் குறிப்பாக வரும். சரியாக எழுதினால் அந்தச் சொல் மறுபார்வையில் முன்னேறும்.</p></div>
        <div><button className="btn" type="button" onClick={start}>தொடங்கு · {Math.min(ROUND, spellWords(S).length)} சொற்கள்</button></div>
      </>
    )
  }

  if (Q.i >= Q.items.length) {
    return (
      <>
        {back}
        <div className="card stack" style={{ textAlign: 'center', alignItems: 'center' }}>
          <span className="eyebrow">முடிவு</span>
          <div className="score">{Q.score}/{Q.items.length}</div>
          <Mathi text={roundEnd(Q.score, Q.items.length, Q.score)} autoSpeak compact />
          <div className="row"><button className="btn" type="button" onClick={start}>மீண்டும்</button><a className="btn ghost" href="#practice">முடி</a></div>
        </div>
      </>
    )
  }

  const w = Q.items[Q.i], answered = Q.res !== null
  const target = w.en.toLowerCase()
  const check = e => {
    e.preventDefault()
    if (answered) return
    const typed = text.trim().toLowerCase()
    if (!typed) return
    const ok = typed === target
    update(x => record(x, w.en, ok))
    setQ(q => ({ ...q, res: { ok, typed, close: !ok && distance(typed, target) <= 1 }, score: q.score + (ok ? 1 : 0) }))
  }
  const next = () => {
    const n = Q.i + 1
    setQ(q => ({ ...q, i: n, res: null, hint: 0 }))
    setText('')
    if (n < Q.items.length) setTimeout(() => { say(Q.items[n].en); input.current?.focus() }, 80)
  }
  const hint = target.slice(0, Q.hint)

  return (
    <>
      {back}
      <div className="qtop"><span>{Q.i + 1} / {Q.items.length}</span><span>மதிப்பெண் {Q.score}</span></div>
      <div className="qbar"><i style={{ width: (Q.i / Q.items.length * 100) + '%' }} /></div>
      <form className="card stack" onSubmit={answered ? e => { e.preventDefault(); next() } : check}>
        <div className="qprompt">
          <button className="bigspk" type="button" aria-label="Play word" onClick={() => say(w.en)}><SpeakerIcon /></button>
          <span className="ta">கேட்ட சொல்லை எழுதுங்கள்</span>
          <span className="ta muted">குறிப்பு: {meaningOf(w.en)} · {target.length} எழுத்துகள்</span>
        </div>
        <div className="blanks" aria-hidden="true">
          {[...target].map((c, i) => <span key={i} className={i < hint.length ? 'on' : ''}>{i < hint.length ? c : ''}</span>)}
        </div>
        <label htmlFor="spell-input" className="sr">Type the word you heard</label>
        <input id="spell-input" ref={input} className="spell" value={text} disabled={answered}
          onChange={e => setText(e.target.value)} autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck={false} placeholder="இங்கே எழுதுங்கள்" />
        {answered && (
          <div className={'spellres ' + (Q.res.ok ? 'ok' : 'no')} role="status">
            {Q.res.ok
              ? <b className="ta">சரி!</b>
              : <>
                  <b className="ta">{Q.res.close ? 'கிட்டத்தட்ட சரி.' : 'தவறு.'}</b>
                  <span>நீங்கள் எழுதியது: {[...Q.res.typed].map((c, i) => <i key={i} className={c === target[i] ? 'g' : 'r'}>{c}</i>)}</span>
                </>}
            <span>சரியான எழுத்து: <b className="eng">{w.en}</b> <span className="tam ta">{w.ta}</span></span>
          </div>
        )}
        <div className="row" style={{ justifyContent: 'center' }}>
          {!answered && <button className="btn ghost" type="button" disabled={Q.hint >= target.length - 1} onClick={() => setQ(q => ({ ...q, hint: q.hint + 1 }))}>முதல் எழுத்து குறிப்பு</button>}
          {!answered ? <button className="btn" type="submit" disabled={!text.trim()}>சரிபார்</button>
            : <button className="btn" type="submit">{Q.i === Q.items.length - 1 ? 'முடிவைப் பார்' : 'அடுத்தது'}</button>}
        </div>
        <div className="row" style={{ justifyContent: 'center' }}><button className="btn ghost" type="button" style={{ padding: '6px 14px', fontSize: '.82rem' }} onClick={() => setQ(null)}>வெளியேறு</button></div>
      </form>
    </>
  )
}
