import { useApp } from '../lib/context.js'
import { SpeakerIcon } from './Icons.jsx'

/** Round speaker button that reads `text` aloud. */
export default function SpeakButton({ text, label = 'Listen' }) {
  const { say } = useApp()
  return <button className="spk" type="button" aria-label={label} onClick={() => say(text)}><SpeakerIcon /></button>
}
