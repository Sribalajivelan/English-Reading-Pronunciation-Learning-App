import { useApp } from '../lib/context.js'
import { useListen } from '../lib/useListen.js'
import { record } from '../lib/srs.js'
import { meaningOf } from '../data/meanings.js'
import MicButton, { WordFeedback } from './MicButton.jsx'
import { SpeakerIcon } from './Icons.jsx'

/** A word with its Tamil reading and meaning; five dots track the "say it 5 times" practice. */
export default function WordCard({ word, count, onPlay }) {
  const { say, update } = useApp()
  const meaning = meaningOf(word.en)
  const listen = useListen(word.en, 'word', r => {
    if (r.status === 'ok') { onPlay(); update(x => record(x, word.en, true)) }
  })
  const play = () => { say(word.en); onPlay() }
  return (
    <div className="w" onClick={play}>
      <div className="wt">
        <span className="en">{word.en}</span>
        <span className="wbtns">
          <MicButton listen={listen} label={'Say: ' + word.en} />
          <button className="spk" type="button" aria-label={'Listen: ' + word.en} onClick={e => { e.stopPropagation(); play() }}><SpeakerIcon /></button>
        </span>
      </div>
      <span className="tam">{word.ta}</span>
      {meaning && <span className="mean ta">{meaning}</span>}
      {word.h && <span className="hint">{word.h}</span>}
      <WordFeedback listen={listen} />
      <span className="dots">{[0, 1, 2, 3, 4].map(i => <i key={i} className={i < count ? 'f' : ''} />)}</span>
    </div>
  )
}
