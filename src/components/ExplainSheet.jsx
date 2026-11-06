import { useEffect, useRef } from 'react'
import { useApp } from '../lib/context.js'
import { SpeakerIcon } from './Icons.jsx'

/** Bottom sheet that explains why an example word sounds the way it does. */
export default function ExplainSheet({ info, onClose }) {
  const { say } = useApp()
  const close = useRef(null)
  useEffect(() => {
    close.current?.focus()
    const key = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [onClose])
  const { word, wordTa, note, letter } = info
  return (
    <div className="sheet-back" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onClick={e => e.stopPropagation()}>
        <div className="sheet-head">
          <div>
            <span className="eyebrow">{letter} · ஏன் இந்த ஒலி?</span>
            <h3 id="sheet-title"><span className="eng">{word}</span> <span className="arrow">→</span> <span className="ta tamw">{wordTa}</span></h3>
          </div>
          <button ref={close} className="btn ghost" type="button" onClick={onClose}>மூடு</button>
        </div>
        <p className="sheet-sound ta"><b>{note.sound}</b></p>
        <p className="ta sheet-why">{note.why}</p>
        {note.tip && <p className="ta sheet-tip"><b>குறிப்பு:</b> {note.tip}</p>}
        <div className="sheet-compare">
          <span className="eyebrow">கேட்டு ஒப்பிடுங்கள்</span>
          <div className="row">
            {note.compare.map(([en, ta]) => (
              <button key={en} className="cmp" type="button" onClick={() => say(en)}><SpeakerIcon /><b>{en}</b><span className="ta">{ta}</span></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
