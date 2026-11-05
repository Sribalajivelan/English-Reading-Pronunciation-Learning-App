import { canRecognize } from '../lib/recognize.js'

export const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
)

/** Round microphone button. Hidden on browsers without speech recognition. */
export default function MicButton({ listen, label = 'Say it', big = false }) {
  if (!canRecognize) return null
  const on = listen.state === 'listening'
  return (
    <button className={'spk mic' + (on ? ' on' : '') + (big ? ' big' : '')} type="button" aria-label={label} aria-pressed={on}
      onClick={e => { e.stopPropagation(); listen.start() }}><MicIcon /></button>
  )
}

/** Short feedback line for a word check. */
export function WordFeedback({ listen }) {
  const { state, result } = listen
  if (state === 'listening') return <span className="fbline listening ta" role="status">கேட்கிறது… பேசுங்கள்</span>
  if (state !== 'done' || !result) return null
  const heard = result.heard ? ` (கேட்டது: “${result.heard}”)` : ''
  if (result.status === 'ok') return <span className="fbline ok ta" role="status">சரி! நன்றாகச் சொன்னீர்கள்</span>
  if (result.status === 'close') return <span className="fbline close ta" role="status">கிட்டத்தட்ட சரி{heard}. இன்னொரு முறை</span>
  if (result.status === 'none') return <span className="fbline miss ta" role="status">குரல் கேட்கவில்லை. மீண்டும் முயலுங்கள்</span>
  return <span className="fbline miss ta" role="status">மீண்டும் முயலுங்கள்{heard}</span>
}
