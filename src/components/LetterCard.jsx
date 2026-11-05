import { useApp } from '../lib/context.js'
import { LMAP, LN, LTIP, TB, SP, VS, VSND, CSND } from '../data/letters.js'
import { SpeakerIcon } from './Icons.jsx'

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
          <button key={s[0]} type="button" onClick={() => say(s[2])}><SpeakerIcon /><span className="ta">{s[1]}</span><small>{s[0]}</small></button>
        ))}
      </div>
      <div className="ex">
        {x.ex.map(e => <button key={e[0]} type="button" onClick={() => say(e[0])}><b>{e[0]}</b><span>{e[1]}</span></button>)}
      </div>
      {!x.vowel && (
        <div className="cv" aria-label={L + ' + vowels'}>
          {VS.map(v => (
            <button key={v[0]} type="button" onClick={() => say(SP[L] + v[2])}><b>{L.toLowerCase() + v[0]}</b><span>{base[1] + base[0] + v[1]}</span></button>
          ))}
        </div>
      )}
      {LTIP[L] && <div className="tipx">{LTIP[L]}</div>}
    </article>
  )
}
