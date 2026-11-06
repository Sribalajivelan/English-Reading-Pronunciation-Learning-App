import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../lib/context.js'
import { DAYS } from '../data/days.js'
import { PASS } from '../data/passages.js'
import { TOTAL, dayWords, doneCount, streak, taskProg, todayStr } from '../lib/progress.js'
import LetterCard from '../components/LetterCard.jsx'
import WordCard from '../components/WordCard.jsx'
import Reader from '../components/Reader.jsx'
import Plan from './Plan.jsx'
import { BackIcon, CheckIcon, SpeakerIcon } from '../components/Icons.jsx'
import TaSpeak from '../components/TaSpeak.jsx'
import { dayDone } from '../data/persona.js'

const Section = ({ title, sub, children }) => (
  <section className="card sec"><h3>{title}{sub && <> <small>{sub}</small></>}</h3>{children}</section>
)

function Timer({ n }) {
  const { S, update, toast } = useApp()
  const [running, setRunning] = useState(false)
  const [secs, setSecs] = useState(0)
  const t0 = useRef(0)
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSecs((performance.now() - t0.current) / 1000), 100)
    return () => clearInterval(id)
  }, [running])
  const toggle = () => {
    if (running) {
      setRunning(false)
      const s = Math.round(secs * 10) / 10
      if (s > 0 && (!S.speed[n] || s < S.speed[n])) { update(x => { x.speed[n] = s }); toast('புதிய சிறந்த நேரம்: ' + s + ' வினாடி') }
    } else { t0.current = performance.now(); setSecs(0); setRunning(true) }
  }
  const b = S.speed[n]
  return (
    <div className="timer">
      <b>{secs.toFixed(1)}s</b>
      <button className="btn" type="button" onClick={toggle}>{running ? 'நிறுத்து' : secs ? 'மீண்டும் தொடங்கு' : 'தொடங்கு'}</button>
      <span className="ta muted">{b ? 'சிறந்த நேரம்: ' + b + ' வினாடி' : 'மேலே உள்ள வார்த்தைகளைப் படித்து முடித்ததும் நிறுத்துங்கள்'}</span>
    </div>
  )
}

function Summary() {
  const { S } = useApp()
  const dc = doneCount(S)
  const weak = Object.keys(S.rating).filter(k => S.rating[k] === 1)
  const strong = Object.keys(S.rating).filter(k => S.rating[k] === 3)
  const chips = a => a.length
    ? a.map(k => <a key={k} className="btn ghost" style={{ padding: '4px 12px' }} href={'#day-' + k}>Day {k}</a>)
    : <span className="muted ta">இன்னும் மதிப்பீடு இல்லை</span>
  const goals = ['தினமும் 10 புதிய வார்த்தைகள் கற்கவும்', 'குழந்தைகள் ஆங்கிலப் புத்தகத்தின் 1 பக்கம் தினமும் படிக்கவும்', 'ஆங்கிலத் துணைத்தலைப்புடன் தமிழ்ப் படம் பார்க்கவும்', '5 எளிய ஆங்கில வாக்கியங்களைப் பேசிப் பழகவும்']
  return (
    <section className="card sec">
      <h3>உங்கள் சாதனை</h3>
      <div className="stats">
        <div className="stat"><b>{dc}/30</b><span>முடிந்த நாட்கள்</span></div>
        <div className="stat"><b>{streak(S)}</b><span>தொடர் நாட்கள்</span></div>
      </div>
      <div><div className="eyebrow">வலிமையான பகுதிகள்</div><div className="row" style={{ marginTop: 6 }}>{chips(strong)}</div></div>
      <div><div className="eyebrow">மேலும் பயிற்சி தேவை</div><div className="row" style={{ marginTop: 6 }}>{chips(weak)}</div></div>
      <div><div className="eyebrow">அடுத்த மாத இலக்குகள்</div><ul className="notes">{goals.map(g => <li key={g}>{g}</li>)}</ul></div>
      {dc >= TOTAL && <div className="celebrate"><h3 className="ta">வாழ்த்துகள்! நீங்கள் 30 நாள் பயணத்தை முடித்துவிட்டீர்கள்.</h3></div>}
    </section>
  )
}

export default function Day({ n }) {
  const { S, update, cheer, say } = useApp()
  const d = DAYS[n]
  const [seed, setSeed] = useState(0)
  const [reps, setReps] = useState({})
  useEffect(() => { setSeed(0); setReps({}) }, [n])
  const words = useMemo(() => d ? dayWords(d, seed > 0) : [], [d, seed])
  if (!d) return <Plan />

  const done = !!S.done[n]
  const r = S.rating[n] || 0
  const toggleTask = k => update(x => { x.tasks[k] = !x.tasks[k] })
  const complete = () => {
    update(x => { if (x.done[n]) delete x.done[n]; else x.done[n] = todayStr() })
    if (!done) cheer(dayDone(n, n))
  }
  const count = S.counter[n] || 0

  return (
    <>
      <a className="crumb" href="#plan"><BackIcon /> 30 நாள் திட்டம்</a>
      <header className="dhead">
        <span className="pill">Day {n} · {d.mins} min</span>
        <h2>{d.t}</h2>
        <div className="tt ta">{d.ta}</div>
      </header>

      <Section title="இன்றைய பணிகள்" sub={'Tasks · ' + Math.round(taskProg(S, n) * 100) + '%'}>
        <ul className="tasks">
          {d.tasks.map((t, i) => {
            const k = n + '-' + i, on = !!S.tasks[k]
            return (
              <li key={k} className="taskrow">
                <button type="button" className={on ? 'on' : ''} aria-pressed={on} onClick={() => toggleTask(k)}>
                  <span className="bx"><CheckIcon /></span>
                  <span><span className="te">{t[0]}</span><span className="tt2">{t[1]}</span></span>
                </button>
                <TaSpeak text={t[1]} />
              </li>
            )
          })}
        </ul>
      </Section>

      {d.letters && <Section title="எழுத்துகள்" sub="Tap a letter for its name, a word to hear it"><div className="lgrid">{[...d.letters].map(L => <LetterCard key={L} L={L} />)}</div></Section>}

      {d.pats && (
        <Section title="வடிவங்கள்" sub="Patterns · tap to hear">
          <div className="pats">
            {d.pats.map(p => (
              <button key={p.p} className="pat" type="button" onClick={() => say(p.ex)}>
                <span className="p">{p.p}</span><span className="pt">{p.ta}</span><span className="px"><b>{p.ex}</b> {p.exta}</span>
              </button>
            ))}
          </div>
        </Section>
      )}

      {d.pairs && (
        <Section title="குறில் ↔ நெடில்" sub="Short vs long">
          <div className="pairs">
            {d.pairs.map(p => (
              <div className="pair" key={p[0]}>
                <button type="button" onClick={() => say(p[0])}><b>{p[0]}</b><span>{p[1]}</span></button>
                <span className="ar">→</span>
                <button type="button" onClick={() => say(p[2])}><b>{p[2]}</b><span>{p[3]}</span></button>
              </div>
            ))}
          </div>
        </Section>
      )}

      {words.length > 0 && (
        <Section title="வார்த்தைகள்" sub={words.length + ' words'}>
          <p className="repnote">ஒவ்வொரு வார்த்தையையும் 5 முறை கேட்டு, சொல்லுங்கள். ஒவ்வொரு தொடுதலும் ஒரு புள்ளியை நிரப்பும்.</p>
          <div className="row">
            <button className="btn ghost" type="button" onClick={() => say(words.map(w => w.en).join('. '))}><SpeakerIcon /> எல்லாம் கேள்</button>
            {d.review && <button className="btn ghost" type="button" onClick={() => { setSeed(s => s + 1); setReps({}) }}>கலக்கு</button>}
          </div>
          <div className="words">
            {words.map((w, i) => {
              const k = n + '-' + i + '-' + w.en
              return <WordCard key={k} word={w} count={reps[k] || 0} onPlay={() => setReps(x => ({ ...x, [k]: Math.min(5, (x[k] || 0) + 1) }))} />
            })}
          </div>
        </Section>
      )}

      {d.pass && d.pass.map(pi => <Reader key={pi} p={PASS[pi]} />)}

      {d.counter && (
        <Section title="சுற்றிலும் உள்ள ஆங்கில வார்த்தைகள்" sub={'Target ' + d.counter}>
          <div className="counter">
            <button type="button" aria-label="Decrease" onClick={() => update(x => { x.counter[n] = Math.max(0, (x.counter[n] || 0) - 1) })}>−</button>
            <b>{count}</b>
            <button type="button" aria-label="Increase" onClick={() => update(x => { x.counter[n] = (x.counter[n] || 0) + 1 })}>+</button>
            <span className="ta muted">/ {d.counter} கண்டுபிடித்தவை</span>
          </div>
        </Section>
      )}

      {d.timer && <Section title="நேரப் பயிற்சி" sub="Time yourself"><Timer key={n} n={n} /></Section>}
      {d.summary && <Summary />}

      {(d.rate || n % 7 === 0 || d.summary) && (
        <Section title="சுய மதிப்பீடு" sub="How did it go?">
          <div className="rate">
            {[[1, 'மேலும் பயிற்சி தேவை'], [2, 'பரவாயில்லை'], [3, 'நம்பிக்கையாக உள்ளது']].map(([v, l]) => (
              <button key={v} type="button" aria-pressed={r === v} onClick={() => update(x => { x.rating[n] = v })}>{l}</button>
            ))}
          </div>
        </Section>
      )}

      <div className="card row" style={{ justifyContent: 'space-between' }}>
        <button className={'btn' + (done ? ' ghost' : '')} type="button" onClick={complete}>{done ? 'முடிந்தது · மீண்டும் திறக்க' : 'இந்த நாளை முடித்தேன்'}</button>
        <span className="ta muted" style={{ fontSize: '.88rem' }}>{done ? S.done[n] + ' அன்று முடித்தீர்கள்' : ''}</span>
      </div>
      <div className="dnav">
        {n > 1 ? <a className="btn ghost" href={'#day-' + (n - 1)}>← Day {n - 1}</a> : <span />}
        {n < TOTAL && <a className="btn ghost" href={'#day-' + (n + 1)}>Day {n + 1} →</a>}
      </div>
    </>
  )
}
