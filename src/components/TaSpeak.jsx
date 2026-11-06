import { useApp } from '../lib/context.js'
import { SpeakerIcon } from './Icons.jsx'

/** Small button that reads Tamil (and any English inside it) aloud. */
export default function TaSpeak({ text, label = 'தமிழில் கேள்', withLabel = false }) {
  const { sayTa } = useApp()
  return (
    <button className={'spk ta-spk' + (withLabel ? ' labeled' : '')} type="button" aria-label={label} title={label} onClick={e => { e.stopPropagation(); sayTa(text) }}>
      <SpeakerIcon />{withLabel && <span className="ta">{label}</span>}
    </button>
  )
}
