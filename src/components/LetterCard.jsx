import { useApp } from '../lib/context.js'
import { CVW, LMAP, LN, LTIP, TB, SP, VS, VSND, CSND } from '../data/letters.js'
import { useLongPress } from '../lib/longpress.js'
import { SpeakerIcon } from './Icons.jsx'

/** Example word chip: tap to hear, long-press (or right-click) to learn why it sounds that way. */
function ExampleChip({ L, word, ta }) {
  const { say, explain } = useApp()
  const press = useLongPress(() => explain(L, word, ta), () => say(word))
  return (
    <button type="button" className="exchip" title="நீண்ட நேரம் தொட்டால் விளக்கம்" {...press}>
      <b>{word}</b><span>{ta}</span>
    </button>
  )
}

export default function LetterCard({ L }) {
  const { say } = useApp()
  const x = LMAP[L]
  const sounds = x.vowel
    ? VSND[L]
    : CSND[L].map((s, i) => [CSND[L].length > 1 ? (i ? 'soft' : 'hard') : 'sound', x.ta.split(' / ')[i].replace(/\s*\(.*\)/, ''), s])
  const base = TB[L]
  return (
    <article className="lc">
      <div className="h">
        <button className="lb" type="button" onClick={() => say(LN[L])} aria-label={'Letter ' + L}>{L}<small>{L.toLowerCase()}</small></button>
        <div className="snd">{x.ta}<small>ஒலி · {x.vowel ? 'vowel' : 'consonant'}</small></div>
      </div>
      <div className="snds" aria-label={L + ' sounds'}>
        {sounds.map(s => (
          <button key={s[0]} type="button" onClick={() => say(s[2], L + '-' + s[0])}><SpeakerIcon /><span className="ta">{s[1]}</span><small>{s[0]}</small></button>
        ))}
      </div>
      <div className="ex">
        {x.ex.map(e => <ExampleChip key={e[0]} L={L} word={e[0]} ta={e[1]} />)}
      </div>
      {!x.vowel && (
        <div className="cv" aria-label={L + ' + vowels'}>
          {VS.map(v => (
            <button key={v[0]} type="button" onClick={() => say(CVW[L] ? CVW[L][VS.indexOf(v)] : SP[L] + v[2])}><b>{L.toLowerCase() + v[0]}</b><span>{base[1] + base[0] + v[1]}</span></button>
          ))}
        </div>
      )}
      <div className="holdhint ta">வார்த்தையை நீண்ட நேரம் தொட்டுப் பிடித்தால் ஒலி விளக்கம் வரும்</div>
      {LTIP[L] && <div className="tipx">{LTIP[L]}</div>}
    </article>
  )
}
