import { useState } from 'react'
import { useApp } from '../lib/context.js'
import { useListen } from '../lib/useListen.js'
import { SOUNDS } from '../data/sounds.js'
import LettersTabs from '../components/LettersTabs.jsx'
import MicButton, { WordFeedback } from '../components/MicButton.jsx'
import { SpeakerIcon } from '../components/Icons.jsx'

function SayWord({ w }) {
  const { say } = useApp()
  const listen = useListen(w.en, 'word')
  return (
    <div className="sw">
      <div className="swt">
        <b>{w.en}</b>
        <span className="tam ta">{w.ta}</span>
        <span className="mean ta">{w.mean}</span>
        <WordFeedback listen={listen} />
      </div>
      <MicButton listen={listen} label={'Say: ' + w.en} />
      <button className="spk" type="button" aria-label={'Listen: ' + w.en} onClick={() => say(w.en)}><SpeakerIcon /></button>
    </div>
  )
}

/** Hear one word of a pair and pick which one it was. */
function PairGame({ pairs }) {
  const { say } = useApp()
  const [q, setQ] = useState(null)
  const [score, setScore] = useState({ ok: 0, n: 0 })
  const next = () => {
    const i = Math.floor(Math.random() * pairs.length), side = Math.floor(Math.random() * 2)
    setQ({ i, side, picked: null })
    setTimeout(() => say(pairs[i][side].en), 60)
  }
  const pick = k => {
    if (q.picked !== null) return
    setQ({ ...q, picked: k })
    setScore(s => ({ ok: s.ok + (k === q.side ? 1 : 0), n: s.n + 1 }))
  }
  if (!q) return <button className="btn" type="button" onClick={next}>கேட்டு அடையாளம் காணுங்கள்</button>
  const pair = pairs[q.i], done = q.picked !== null
  return (
    <div className="pg">
      <div className="row">
        <button className="spk big" type="button" aria-label="Play again" onClick={() => say(pair[q.side].en)}><SpeakerIcon /></button>
        <span className="ta muted">எந்தச் சொல் கேட்டது?</span>
        <span className="muted" style={{ marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>{score.ok}/{score.n}</span>
      </div>
      <div className="opts">
        {pair.map((w, k) => {
          const c = !done ? '' : k === q.side ? ' ok' : k === q.picked ? ' no' : ''
          return <button key={w.en} className={'opt' + c} type="button" disabled={done} onClick={() => pick(k)}>{w.en}<small className="ta">{w.ta}</small></button>
        })}
      </div>
      {done && (
        <>
          <p className="ta fb" role="status" style={{ color: q.picked === q.side ? 'var(--good)' : 'var(--bad)' }}>
            {q.picked === q.side ? 'சரி!' : 'தவறு.'} <b className="eng">{pair[q.side].en}</b>: {pair[q.side].mean}
          </p>
          <button className="btn" type="button" onClick={next}>அடுத்தது</button>
        </>
      )}
    </div>
  )
}

function Pair({ pair }) {
  const { say } = useApp()
  return (
    <div className="pair">
      <button type="button" onClick={() => say(pair[0].en)}><b>{pair[0].en}</b><span>{pair[0].ta}</span><em className="ta">{pair[0].mean}</em></button>
      <span className="ar">≠</span>
      <button type="button" onClick={() => say(pair[1].en)}><b>{pair[1].en}</b><span>{pair[1].ta}</span><em className="ta">{pair[1].mean}</em></button>
    </div>
  )
}

export default function Sounds() {
  return (
    <>
      <div>
        <h2 className="ta">கடினமான ஒலிகள்</h2>
        <p className="muted ta">தமிழில் இல்லாத அல்லது குழப்பும் ஆங்கில ஒலிகள். ஒவ்வொன்றிலும் வாய் நிலை, பொதுவான தவறு, பயிற்சிச் சொற்கள் உள்ளன.</p>
      </div>
      <LettersTabs active="sounds" />
      {SOUNDS.map(s => (
        <section className="card sec snd-card" key={s.id} id={'s-' + s.id}>
          <div className="sh">
            <span className="symb">{s.sym}</span>
            <div><h3 className="ta">{s.title}</h3><span className="ta muted" style={{ fontSize: '.85rem' }}>{s.sub}</span></div>
          </div>
          <p className="mistake ta"><b>பொதுவான தவறு:</b> {s.mistake}</p>
          <div>
            <div className="eyebrow">எப்படிச் சொல்வது</div>
            <ol className="steps ta">{s.steps.map((t, i) => <li key={i}>{t}</li>)}</ol>
          </div>
          <div>
            <div className="eyebrow">சொல்லிப் பாருங்கள்</div>
            <div className="swl">{s.say.map(w => <SayWord key={w.en} w={w} />)}</div>
          </div>
          {s.pairs.length > 0 && (
            <div>
              <div className="eyebrow">ஒலி வேறுபாடு: இரண்டையும் கேளுங்கள்</div>
              <div className="pairs">{s.pairs.map(p => <Pair key={p[0].en + p[1].en} pair={p} />)}</div>
              <div style={{ marginTop: 12 }}><PairGame pairs={s.pairs} /></div>
            </div>
          )}
        </section>
      ))}
    </>
  )
}
