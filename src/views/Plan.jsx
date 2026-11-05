import { useApp } from '../lib/context.js'
import { DAYS } from '../data/days.js'
import { nextDay } from '../lib/progress.js'
import { CheckIcon } from '../components/Icons.jsx'

const WEEKS = [
  ['வாரம் 1', 'Foundation · 30 min/day', 'எல்லா எழுத்து ஒலிகளையும் கற்றுக்கொள்ளுங்கள்', 1, 7],
  ['வாரம் 2', 'Building Skills · 40 min/day', 'எளிய வார்த்தைகளை நம்பிக்கையுடன் படியுங்கள்', 8, 14],
  ['வாரம் 3', 'Intermediate · 45 min/day', 'அடிப்படை வாக்கியங்களைப் படியுங்கள்', 15, 21],
  ['வாரம் 4', 'Advanced · 50 min/day', 'சிறு பத்திகளைப் படியுங்கள்', 22, 28],
  ['நாள் 29–30', 'Practice & Planning', 'நிஜ வாழ்க்கையில் பயன்படுத்தி, அடுத்த இலக்கைத் திட்டமிடுங்கள்', 29, 30],
]

export default function Plan() {
  const { S } = useApp()
  const nd = nextDay(S)
  return (
    <>
      <div><h2 className="ta">30 நாள் திட்டம்</h2><p className="muted ta">ஒரு நாளைத் தொட்டுத் திறக்கவும்.</p></div>
      {WEEKS.map(([a, b, c, s, e]) => (
        <section className="week" key={a}>
          <header><h3 className="ta">{a} <small className="muted" style={{ fontFamily: 'var(--f-body)', fontWeight: 400, fontSize: '.8rem' }}>{b}</small></h3></header>
          <p className="ta muted" style={{ fontSize: '.9rem', marginTop: -6 }}>இலக்கு: {c}</p>
          <div className="days">
            {Array.from({ length: e - s + 1 }, (_, k) => s + k).map(i => (
              <a key={i} className={'day' + (S.done[i] ? ' done' : '') + (i === nd ? ' cur' : '')} href={'#day-' + i}>
                <span className="n">{i}</span>
                <div><b>{DAYS[i].t}</b><span>{DAYS[i].ta}</span></div>
                {S.done[i] && <span className="ck"><CheckIcon /></span>}
              </a>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
