import { useMemo, useRef, useState } from 'react'
import { useApp } from '../lib/context.js'
import { useListen } from '../lib/useListen.js'
import { addDays, nextDueDate, record, reviewQueue } from '../lib/srs.js'
import { todayStr } from '../lib/progress.js'
import MicButton, { WordFeedback } from '../components/MicButton.jsx'
import { BackIcon, SpeakerIcon } from '../components/Icons.jsx'
import Mathi from '../components/Mathi.jsx'
import TaSpeak from '../components/TaSpeak.jsx'
import { roundEnd } from '../data/persona.js'

function Card({ w, onGrade, isRetry }) {
  const { say } = useApp()
  const [show, setShow] = useState(false)
  const listen = useListen(w.en, 'word', r => { if (r.status === 'ok') setShow(true) })
  const heardOk = listen.state === 'done' && listen.result?.status === 'ok'
  return (
    <div className="card stack rcard">
      <div className="qprompt">
        {isRetry && <span className="eyebrow">மீண்டும் ஒருமுறை</span>}
        <div className="qw">{w.en}</div>
        <div className="row" style={{ justifyContent: 'center' }}>
          <button className="spk big" type="button" aria-label="Listen" onClick={() => say(w.en)}><SpeakerIcon /></button>
          <MicButton listen={listen} label="Say it" big />
        </div>
        <WordFeedback listen={listen} />
        <span className="ta muted" style={{ fontSize: '.9rem' }}>{show ? '' : 'முதலில் நினைவுபடுத்திப் பாருங்கள். பிறகு பதிலைக் காட்டுங்கள்.'}</span>
      </div>
      {!show
        ? <div className="row" style={{ justifyContent: 'center' }}><button className="btn" type="button" onClick={() => { setShow(true); say(w.en) }}>பதிலைக் காட்டு</button></div>
        : (
          <>
            <div className="answer">
              <span className="tam">{w.ta}</span>
              <span className="mean ta">{w.meaning} <TaSpeak text={w.meaning} /></span>
              {w.h && <span className="hint">{w.h}</span>}
            </div>
            <div className="grade">
              <button className="btn ghost danger" type="button" onClick={() => onGrade(false)}>மீண்டும்<small>Again</small></button>
              <button className={'btn' + (heardOk ? ' mark' : '')} type="button" onClick={() => onGrade(true)}>தெரியும்<small>Got it</small></button>
            </div>
          </>
        )}
    </div>
  )
}

export default function Review() {
  const { S, update } = useApp()
  const plan = useMemo(() => reviewQueue(S), [])   // fixed for this session
  const [queue, setQueue] = useState(() => plan.items.map(w => ({ w, retry: false })))
  const [i, setI] = useState(0)
  const results = useRef({})                          // key -> last result
  const [finished, setFinished] = useState(false)

  const grade = ok => {
    const { w, retry } = queue[i]
    if (!retry) { update(x => record(x, w.en, ok)); results.current[w.key] = ok }
    if (!ok && !retry) setQueue(q => [...q, { w, retry: true }])   // see missed words once more today
    if (i + 1 >= queue.length + (!ok && !retry ? 1 : 0)) setFinished(true)
    else setI(i + 1)
  }

  const back = <a className="crumb" href="#practice"><BackIcon /> பயிற்சி</a>

  if (!plan.items.length) {
    const nd = nextDueDate(S)
    return (
      <>
        {back}
        <div className="card stack" style={{ textAlign: 'center', alignItems: 'center' }}>
          <h2 className="ta">இன்றைய மறுபார்வை முடிந்தது</h2>
          <p className="ta muted">{nd ? `அடுத்த மறுபார்வை: ${nd === addDays(todayStr(), 1) ? 'நாளை' : nd}` : 'நாளைகளை முடித்தால், அந்த நாளின் வார்த்தைகள் இங்கே வரும்.'}</p>
          <div className="row"><a className="btn" href="#practice">பயிற்சித் தேர்வு</a><a className="btn ghost" href="#plan">திட்டம்</a></div>
        </div>
      </>
    )
  }

  if (finished) {
    const total = Object.keys(results.current).length
    const good = Object.values(results.current).filter(Boolean).length
    return (
      <>
        {back}
        <div className="card stack" style={{ textAlign: 'center', alignItems: 'center' }}>
          <span className="eyebrow">மறுபார்வை முடிந்தது</span>
          <div className="score">{good}/{total}</div>
          <Mathi text={roundEnd(good, total, good)} autoSpeak compact />
          <div className="row"><a className="btn" href="#home">முகப்பு</a><a className="btn ghost" href="#practice">பயிற்சித் தேர்வு</a></div>
        </div>
      </>
    )
  }

  const cur = queue[i]
  return (
    <>
      {back}
      <div className="qtop"><span>{Math.min(i + 1, queue.length)} / {queue.length}</span><span className="ta">மறுபார்வை</span></div>
      <div className="qbar"><i style={{ width: (i / queue.length * 100) + '%' }} /></div>
      <Card key={i + cur.w.key} w={cur.w} isRetry={cur.retry} onGrade={grade} />
    </>
  )
}
