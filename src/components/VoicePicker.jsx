import { useEffect, useState } from 'react'
import { useApp } from '../lib/context.js'
import { englishVoices, hasTTS, onVoices, tamilVoices } from '../lib/speech.js'
import { SpeakerIcon } from './Icons.jsx'

/** Lets the learner pick the English and Tamil voices, and whether the teacher speaks results aloud. */
export default function VoicePicker() {
  const { S, update, say, sayTa } = useApp()
  const [open, setOpen] = useState(false)
  const [en, setEn] = useState(englishVoices)
  const [ta, setTa] = useState(tamilVoices)
  useEffect(() => onVoices(() => { setEn(englishVoices()); setTa(tamilVoices()) }), [])
  if (!hasTTS) return null

  const chooseEn = uri => { update(x => { x.voice = uri }); setTimeout(() => document.getElementById('voice-test')?.click(), 50) }
  const chooseTa = uri => { update(x => { x.voiceTa = uri }); setTimeout(() => document.getElementById('voice-test-ta')?.click(), 50) }
  const curEn = en.find(v => v.voiceURI === S.voice), curTa = ta.find(v => v.voiceURI === S.voiceTa)

  return (
    <div className="voice">
      <button className="slow vbtn" type="button" aria-expanded={open} aria-controls="voice-panel" onClick={() => setOpen(o => !o)}>
        <SpeakerIcon />குரல்
      </button>
      {open && (
        <div className="vpanel card" id="voice-panel">
          <label htmlFor="voice-select" className="ta"><b>ஆங்கிலக் குரல்</b> <span className="muted">English voice</span></label>
          <select id="voice-select" value={curEn ? S.voice : ''} onChange={e => chooseEn(e.target.value)}>
            <option value="">தானியங்கி (Automatic)</option>
            {en.map(v => <option key={v.voiceURI} value={v.voiceURI}>{v.name} · {v.lang}</option>)}
          </select>
          <div className="row">
            <button id="voice-test" className="btn ghost" type="button" onClick={() => say('Hello, my name is Ravi. I like apples.')}><SpeakerIcon /> சோதிக்க</button>
          </div>

          <label htmlFor="voice-select-ta" className="ta"><b>தமிழ்க் குரல்</b> <span className="muted">Tamil voice</span></label>
          {ta.length > 0 ? (
            <>
              <select id="voice-select-ta" value={curTa ? S.voiceTa : ''} onChange={e => chooseTa(e.target.value)}>
                <option value="">தானியங்கி (Automatic)</option>
                {ta.map(v => <option key={v.voiceURI} value={v.voiceURI}>{v.name} · {v.lang}</option>)}
              </select>
              <div className="row">
                <button id="voice-test-ta" className="btn ghost" type="button" onClick={() => sayTa('வணக்கம்! நான் மதி. இன்று நாம் ஆங்கிலம் படிப்போம்.')}><SpeakerIcon /> சோதிக்க</button>
              </div>
            </>
          ) : (
            <p className="ta nota">
              இந்தச் சாதனத்தில் தமிழ்க் குரல் இல்லை. Android: Settings → Text-to-speech → Google → Install voice data → Tamil.
              iPhone: Settings → Accessibility → Spoken Content → Voices → Tamil. பிறகு இந்தப் பக்கத்தை மீண்டும் திறக்கவும்.
            </p>
          )}

          <label className="check ta" htmlFor="auto-talk">
            <input id="auto-talk" type="checkbox" checked={!!S.autoTalk} onChange={e => update(x => { x.autoTalk = e.target.checked })} />
            <span>முடிவுகளை மதி ஆசிரியர் தமிழில் பேசட்டும்</span>
          </label>
          <div className="row"><button className="btn ghost" type="button" onClick={() => setOpen(false)}>மூடு</button></div>
          <p className="ta muted" style={{ fontSize: '.8rem' }}>கிடைக்கும் குரல்கள் உங்கள் ஃபோன் / உலாவியைப் பொறுத்தவை.</p>
        </div>
      )}
    </div>
  )
}
