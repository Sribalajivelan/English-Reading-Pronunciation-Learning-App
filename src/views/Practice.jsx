import { useState } from 'react'
import { useApp } from '../lib/context.js'
import { DAYS } from '../data/days.js'
import { TOTAL, shuf } from '../lib/progress.js'
import { SpeakerIcon } from '../components/Icons.jsx'
import SpeakButton from '../components/SpeakButton.jsx'

function poolWords(S, mode) {
  const lastDone = Math.max(0, ...Object.keys(S.done).map(Number))
  const max = mode === 'all' ? TOTAL : Math.max(6, lastDone + 1)
  const seen = new Set(), out = []
  for (let i = 1; i <= Math.min(max, TOTAL); i++) {
    (DAYS[i].words || []).forEach(w => {
      const k = w.en.toLowerCase()
      if (!seen.has(k)) { seen.add(k); out.push(w) }
    })
  }
  return out
}

function buildQuiz(S, mode, pool) {
  const words = poolWords(S, pool)
  const items = shuf(words).slice(0, 10).map(w => {
    const others = shuf(words.filter(x => x.en.toLowerCase() !== w.en.toLowerCase() && (mode === 'listen' || x.ta !== w.ta)))
    const opts = shuf([w, ...others.slice(0, 3)])
    return { w, opts, ans: opts.indexOf(w) }
  })
  return { mode, items, i: 0, score: 0, picked: null }
}

export default function Practice() {
  const { S, update, say } = useApp()
  const [pool, setPool] = useState('learned')
  const [Q, setQ] = useState(null)

  const start = mode => { const q = buildQuiz(S, mode, pool); setQ(q); if (mode === 'listen') say(q.items[0].w.en) }
  const pick = k => setQ(q => ({ ...q, picked: k, score: q.score + (k === q.items[q.i].ans ? 1 : 0) }))
  const next = () => {
    const i = Q.i + 1
    if (i >= 10 && Q.score > (S.best[Q.mode] || 0)) update(x => { x.best[Q.mode] = Q.score })
    setQ({ ...Q, i, picked: null })
    if (i < 10 && Q.mode === 'listen') say(Q.items[i].w.en)
  }

  if (!Q) {
    return (
      <>
        <div><h2 className="ta">பயிற்சித் தேர்வு</h2><p className="muted ta">10 கேள்விகள். ஒவ்வொரு முறையும் வேறு வார்த்தைகள் வரும்.</p></div>
        <div className="row">
          <span className="ta muted" style={{ fontSize: '.9rem' }}>வார்த்தைகள்:</span>
          <div className="seg" role="group">
            <button type="button" aria-pressed={pool === 'learned'} onClick={() => setPool('learned')}>இதுவரை கற்றவை</button>
            <button type="button" aria-pressed={pool === 'all'} onClick={() => setPool('all')}>எல்லாம்</button>
          </div>
          <span className="muted" style={{ fontSize: '.8rem' }}>{poolWords(S, pool).length} words</span>
        </div>
        <div className="modes">
          <button className="mode" type="button" onClick={() => start('listen')}>
            <h3 className="ta">கேட்டுத் தேர்ந்தெடு</h3><p>ஒலியைக் கேட்டு, சரியான ஆங்கிலச் சொல்லைத் தேர்ந்தெடுங்கள்.</p>
            <span className="muted" style={{ fontSize: '.8rem' }}>Listen → pick the word · Best {S.best.listen || 0}/10</span>
          </button>
          <button className="mode" type="button" onClick={() => start('read')}>
            <h3 className="ta">படித்து ஒலியைத் தேர்ந்தெடு</h3><p>ஆங்கிலச் சொல்லைப் பார்த்து, சரியான தமிழ் ஒலியைத் தேர்ந்தெடுங்கள்.</p>
            <span className="muted" style={{ fontSize: '.8rem' }}>Read → pick the sound · Best {S.best.read || 0}/10</span>
          </button>
        </div>
      </>
    )
  }

  if (Q.i >= Q.items.length) {
    const msg = Q.score >= 9 ? 'அருமை!' : Q.score >= 6 ? 'நன்று! தொடருங்கள்.' : 'மீண்டும் பயிற்சி செய்யுங்கள்.'
    return (
      <div className="card stack" style={{ textAlign: 'center', alignItems: 'center' }}>
        <span className="eyebrow">முடிவு</span>
        <div className="score">{Q.score}/10</div>
        <p className="ta" style={{ fontWeight: 700 }}>{msg}</p>
        <p className="muted ta">சிறந்த மதிப்பெண்: {Math.max(S.best[Q.mode] || 0, Q.score)}/10</p>
        <div className="row"><button className="btn" type="button" onClick={() => start(Q.mode)}>மீண்டும்</button><button className="btn ghost" type="button" onClick={() => setQ(null)}>முடி</button></div>
      </div>
    )
  }

  const it = Q.items[Q.i], listen = Q.mode === 'listen'
  return (
    <div className="card stack">
      <div className="qtop"><span>கேள்வி {Q.i + 1} / 10</span><span>மதிப்பெண் {Q.score}</span></div>
      <div className="qbar"><i style={{ width: (Q.i / 10 * 100) + '%' }} /></div>
      <div className="qprompt">
        {listen ? (
          <>
            <button className="bigspk" type="button" aria-label="Play word" onClick={() => say(it.w.en)}><SpeakerIcon /></button>
            <span className="ta muted">கேட்டு, சரியான சொல்லைத் தேர்ந்தெடுங்கள்</span>
          </>
        ) : (
          <>
            <div className="qw">{it.w.en}</div>
            <SpeakButton text={it.w.en} label="Play word" />
            <span className="ta muted">இதன் சரியான ஒலி எது?</span>
          </>
        )}
      </div>
      <div className="opts">
        {it.opts.map((o, k) => {
          const c = Q.picked === null ? '' : k === it.ans ? ' ok' : k === Q.picked ? ' no' : ''
          return <button key={k} className={'opt' + (listen ? '' : ' ta') + c} type="button" disabled={Q.picked !== null} onClick={() => pick(k)}>{listen ? o.en : o.ta}</button>
        })}
      </div>
      <div className="fb">
        {Q.picked !== null && (Q.picked === it.ans
          ? <span style={{ color: 'var(--good)' }}>சரி!</span>
          : <span style={{ color: 'var(--bad)' }}>தவறு. சரியானது: {listen ? it.w.en + ' (' + it.w.ta + ')' : it.w.ta}</span>)}
      </div>
      {Q.picked !== null && <div className="row" style={{ justifyContent: 'center' }}><button className="btn" type="button" onClick={next}>{Q.i === 9 ? 'முடிவைப் பார்' : 'அடுத்தது'}</button></div>}
      <div className="row" style={{ justifyContent: 'center' }}><button className="btn ghost" type="button" style={{ padding: '6px 14px', fontSize: '.82rem' }} onClick={() => setQ(null)}>வெளியேறு</button></div>
    </div>
  )
}
