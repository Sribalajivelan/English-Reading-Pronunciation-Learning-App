import { useEffect } from 'react'
import { useApp } from '../lib/context.js'
import { NAME, ROLE } from '../data/persona.js'
import { SpeakerIcon } from './Icons.jsx'

/** Round avatar for the teacher persona. */
export function Avatar({ size = 48 }) {
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.5 }} aria-hidden="true">ம</span>
  )
}

/** The teacher speaks: avatar, speech bubble and a button that reads the line aloud in Tamil. */
export default function Mathi({ text, autoSpeak = false, compact = false }) {
  const { say, sayTa, S } = useApp()
  void say
  useEffect(() => { if (autoSpeak && S.autoTalk) sayTa(text) }, [text, autoSpeak])   // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={'mathi' + (compact ? ' compact' : '')}>
      <Avatar size={compact ? 40 : 52} />
      <div className="bubble">
        <span className="who2 ta"><b>{NAME}</b>{!compact && <> · {ROLE}</>}</span>
        <p className="ta">{text}</p>
      </div>
      <button className="spk" type="button" aria-label="Listen in Tamil" onClick={() => sayTa(text)}><SpeakerIcon /></button>
    </div>
  )
}
