import { useEffect, useState } from 'react'
import { useApp } from '../lib/context.js'
import { englishVoices, hasTTS, onVoices } from '../lib/speech.js'
import { SpeakerIcon } from './Icons.jsx'

/** Lets the learner pick which English voice reads words aloud. */
export default function VoicePicker() {
  const { S, update, say } = useApp()
  const [open, setOpen] = useState(false)
  const [list, setList] = useState(englishVoices)
  useEffect(() => onVoices(() => setList(englishVoices())), [])
  if (!hasTTS) return null

  const choose = uri => {
    update(x => { x.voice = uri })
    // speak with the new choice right away
    setTimeout(() => document.getElementById('voice-test')?.click(), 50)
  }
  const current = list.find(v => v.voiceURI === S.voice)

  return (
    <div className="voice">
      <button className="slow vbtn" type="button" aria-expanded={open} aria-controls="voice-panel" onClick={() => setOpen(o => !o)}>
        <SpeakerIcon />குரல்
      </button>
      {open && (
        <div className="vpanel card" id="voice-panel">
          <label htmlFor="voice-select" className="ta"><b>குரலைத் தேர்ந்தெடுங்கள்</b> <span className="muted">Voice</span></label>
          <select id="voice-select" value={current ? S.voice : ''} onChange={e => choose(e.target.value)}>
            <option value="">தானியங்கி (Automatic)</option>
            {list.map(v => <option key={v.voiceURI} value={v.voiceURI}>{v.name} · {v.lang}</option>)}
          </select>
          <div className="row">
            <button id="voice-test" className="btn ghost" type="button" onClick={() => say('Hello, my name is Ravi. I like apples.')}><SpeakerIcon /> சோதிக்க</button>
            <button className="btn ghost" type="button" onClick={() => setOpen(false)}>மூடு</button>
          </div>
          <p className="ta muted" style={{ fontSize: '.8rem' }}>
            {list.length ? 'கிடைக்கும் குரல்கள் உங்கள் ஃபோன் / உலாவியைப் பொறுத்தவை. en-IN என்பது இந்திய ஆங்கிலம்.' : 'இந்தச் சாதனத்தில் ஆங்கிலக் குரல்கள் எதுவும் கிடைக்கவில்லை.'}
          </p>
        </div>
      )}
    </div>
  )
}
