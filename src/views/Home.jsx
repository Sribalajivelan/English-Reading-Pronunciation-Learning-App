import { useState } from 'react'
import { useApp } from '../lib/context.js'
import { DAYS } from '../data/days.js'
import { TOTAL, doneCount, nextDay, streak } from '../lib/progress.js'
import { reviewQueue, srsStats } from '../lib/srs.js'
import Install from '../components/Install.jsx'
import Sync from '../components/Sync.jsx'
import Backup from '../components/Backup.jsx'
import { SpeakerIcon } from '../components/Icons.jsx'

const WEEKS = [['வாரம் 1 · Foundation', 1, 7], ['வாரம் 2 · Building', 8, 14], ['வாரம் 3 · Intermediate', 15, 21], ['வாரம் 4 · Advanced', 22, 28], ['நாள் 29–30 · Planning', 29, 30]]

export default function Home() {
  const { S, say } = useApp()
  const [play, setPlay] = useState(false)
  const dc = doneCount(S), pct = dc / TOTAL, nd = nextDay(S)
  const rq = reviewQueue(S), st = srsStats(S)
  const R = 48, C = 2 * Math.PI * R
  const apple = () => { setPlay(true); say('apple'); setTimeout(() => setPlay(false), 2200) }
  return (
    <>
      <section className={'hero' + (play ? ' play' : '')}>
        <span className="eyebrow">APPLE எப்படி படிக்கிறது</span>
        <h1 className="ta">எழுத்துகளை இணைத்துப் படியுங்கள்</h1>
        <p className="lead">தமிழில் எழுத்துகளை இணைத்து வாசிப்பது போலவே, ஆங்கிலத்திலும் ஒலிகளை இணைக்கலாம்.</p>
        <div className="tiles" aria-label="A P P L E">
          {[['A', 'ஆ'], ['P', 'ப்'], ['P', 'ப்'], ['L', 'ல்']].map(([e, t], i) => <div className="tile" key={i}><b>{e}</b><span>{t}</span></div>)}
          <div className="tile silent"><b>E</b><span>மௌனம்</span></div>
        </div>
        <div className="result">
          <span className="muted">ஆ + ப் + ப் + ல் =</span><span className="big ta">ஆப்பல்</span>
          <button className="btn mark" type="button" onClick={apple}><SpeakerIcon /> கேள்</button>
        </div>
        <ul className="notes"><li>கடைசி E மௌனம் (silent). அது ஒலிக்காது.</li><li>இரட்டை P ஒரே ஒலியைத் தரும்.</li></ul>
      </section>

      <section className="card stack">
        <div className="prog">
          <div className="ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={R} fill="none" stroke="var(--soft)" strokeWidth="12" />
              <circle cx="60" cy="60" r={R} fill="none" stroke="var(--accent)" strokeWidth="12" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} />
            </svg>
            <div className="c"><b>{dc}</b><span>/ {TOTAL} நாள்</span></div>
          </div>
          <div className="stats">
            <div className="stat"><b>{streak(S)}</b><span>தொடர் நாட்கள்</span></div>
            <div className="stat"><b>{Math.round(pct * 100)}%</b><span>முடிந்தது</span></div>
            <div className="stat"><b>{S.best.listen || 0}/10</b><span>கேட்டுத் தேர்வு · சிறந்தது</span></div>
            <div className="stat"><b>{S.best.read || 0}/10</b><span>படித்துத் தேர்வு · சிறந்தது</span></div>
          </div>
        </div>
        {nd ? (
          <div className="next plain">
            <div>
              <span className="dn">Day {nd}</span>
              <h3 style={{ marginTop: 6 }}>{DAYS[nd].t}</h3>
              <p className="ta muted" style={{ fontSize: '.9rem' }}>{DAYS[nd].ta} · {DAYS[nd].mins} நிமிடம்</p>
            </div>
            <a className="btn" href={'#day-' + nd}>இன்றைய பாடம்</a>
          </div>
        ) : <div className="celebrate"><h3 className="ta">வாழ்த்துகள்! 30 நாட்களும் முடிந்தன.</h3></div>}
      </section>

      <section className="card stack reviewcard">
        <div className="next">
          <div>
            <h3 className="ta">இன்றைய மறுபார்வை <small className="muted" style={{ fontFamily: 'var(--f-body)', fontWeight: 400, fontSize: '.8rem' }}>Daily review</small></h3>
            <p className="ta muted" style={{ fontSize: '.92rem', marginTop: 4 }}>
              {rq.available
                ? `${rq.available} வார்த்தைகள் காத்திருக்கின்றன. மறந்தவற்றை சரியான நேரத்தில் மீண்டும் பார்த்தால் நீண்ட நாள் நினைவிருக்கும்.`
                : doneCount(S) ? 'இன்றைய மறுபார்வை முடிந்தது. நாளை மீண்டும் வாருங்கள்.' : 'ஒரு நாளை முடித்தால், அதன் வார்த்தைகள் மறுபார்வைக்கு வரும்.'}
            </p>
          </div>
          <a className={'btn' + (rq.available ? ' mark' : ' ghost')} href="#review">{rq.available ? 'தொடங்கு' : 'திற'}</a>
        </div>
        <div className="stats">
          <div className="stat"><b>{st.mastered}</b><span>நன்கு தெரிந்தவை</span></div>
          <div className="stat"><b>{st.tricky}</b><span>கடினமான வார்த்தைகள்</span></div>
        </div>
      </section>

      <section className="card stack">
        <h3 className="ta">தினசரி பயிற்சி முறை</h3>
        <div className="routine">
          <div><b>15 min</b><span>காலை · புதிய எழுத்து ஒலிகள்</span></div>
          <div><b>15 min</b><span>மாலை · வார்த்தை படிப்பு</span></div>
          <div><b>10 min</b><span>இரவு · மறுபார்வை</span></div>
        </div>
      </section>

      <section className="card stack">
        <h3 className="ta">வாரம் வாரமாக</h3>
        <div className="bars">
          {WEEKS.map(([l, a, b]) => {
            let c = 0
            for (let i = a; i <= b; i++) if (S.done[i]) c++
            const t = b - a + 1
            return <div className="bar" key={l}><span className="ta">{l}</span><div className="tr"><i style={{ width: (c / t * 100) + '%' }} /></div><em>{c}/{t}</em></div>
          })}
        </div>
      </section>

      <Install />
      <Sync />
      <Backup />

      <section className="card">
        <h3 className="ta" style={{ marginBottom: 6 }}>பயிற்சிக் குறிப்புகள்</h3>
        <details className="tip" open><summary>தொடக்கத்தில் இதை முயற்சிக்கவும்</summary><ul><li>வார்த்தைகளைத் தொட்டு ஒலி கேளுங்கள் (அல்லது Google Translate)</li><li>ஒவ்வொரு வார்த்தையையும் 5 முறை சொல்லுங்கள்</li><li>தமிழ் எழுத்துகளோடு ஒப்பிட்டுப் புரிந்துகொள்ளுங்கள்</li></ul></details>
        <details className="tip"><summary>ஏன் APPLE "ஆப்பல்" என்று படிக்கிறோம்?</summary><p>ஆங்கிலத்தில் சில எழுத்துகள் மௌனமாக இருக்கும். APPLE-ல் கடைசி E மௌனம். இரட்டை P ஒரே ஒலி தரும். இதனால் A-PP-L = ஆப்பல்.</p></details>
        <details className="tip"><summary>தினசரி பழக்கங்கள்</summary><ul><li>தினமும் பயிலுங்கள்; 15 நிமிடமாவது</li><li>ஒவ்வொரு புதிய வார்த்தையையும் 5 முறை எழுதுங்கள்</li><li>எல்லாவற்றையும் சத்தமாகச் சொல்லுங்கள்</li><li>உங்கள் குரலை ஃபோனில் பதிவு செய்து கேளுங்கள்</li><li>வேகத்தை விட துல்லியம் முக்கியம்</li></ul></details>
        <details className="tip"><summary>கூடுதல் வளங்கள்</summary><ul><li>எளிய ஆங்கிலக் குழந்தைகள் புத்தகங்கள்</li><li>Phonics YouTube வீடியோக்கள்</li><li>ஆடியோ உள்ள ஆங்கிலப் பயிற்சி செயலிகள்</li><li>தெரிந்த தமிழ்ப் படங்களை ஆங்கிலத் துணைத்தலைப்புடன் பாருங்கள்</li></ul></details>
      </section>
    </>
  )
}
