import { useApp } from '../lib/context.js'
import { SpeakerIcon } from './Icons.jsx'

/** A word with its Tamil reading; five dots track the "say it 5 times" practice. */
export default function WordCard({ word, count, onPlay }) {
  const { say } = useApp()
  const play = () => { say(word.en); onPlay() }
  return (
    <div className="w" onClick={play}>
      <div className="wt">
        <span className="en">{word.en}</span>
        <button className="spk" type="button" aria-label={'Listen: ' + word.en} onClick={e => { e.stopPropagation(); play() }}><SpeakerIcon /></button>
      </div>
      <span className="tam">{word.ta}</span>
      {word.h && <span className="hint">{word.h}</span>}
      <span className="dots">{[0, 1, 2, 3, 4].map(i => <i key={i} className={i < count ? 'f' : ''} />)}</span>
    </div>
  )
}
