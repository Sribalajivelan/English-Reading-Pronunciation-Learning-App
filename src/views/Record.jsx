import { useEffect, useRef, useState } from 'react'
import { LETTERS, VSND, CSND } from '../data/letters.js'
import { clipList } from '../lib/clips.js'
import { MicIcon } from '../components/MicButton.jsx'
import { SpeakerIcon } from '../components/Icons.jsx'

const ITEMS = clipList(LETTERS, VSND, CSND)

function pickType() {
  for (const t of ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg']) if (window.MediaRecorder?.isTypeSupported?.(t)) return t
  return ''
}
const extOf = type => (type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm')

/** Teacher tool: record each letter sound, then download all clips as a zip to add to public/audio. */
export default function Record() {
  const [clips, setClips] = useState({})        // id -> { blob, url, ext }
  const [rec, setRec] = useState(null)          // id being recorded
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const media = useRef(null)
  const chunks = useRef([])
  const audio = useRef(null)
  useEffect(() => () => { media.current?.stream?.getTracks().forEach(t => t.stop()) }, [])

  const start = async id => {
    setErr('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const type = pickType()
      const mr = new MediaRecorder(stream, type ? { mimeType: type } : undefined)
      chunks.current = []
      mr.ondataavailable = e => e.data.size && chunks.current.push(e.data)
      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop())
        const t = mr.mimeType || type || 'audio/webm'
        const blob = new Blob(chunks.current, { type: t })
        setClips(c => ({ ...c, [id]: { blob, url: URL.createObjectURL(blob), ext: extOf(t) } }))
        setRec(null)
      }
      media.current = mr; mr.start(); setRec(id)
    } catch { setErr('மைக்ரோஃபோன் கிடைக்கவில்லை. அனுமதி தந்து மீண்டும் முயலுங்கள்.') }
  }
  const stop = () => media.current?.state === 'recording' && media.current.stop()
  const play = id => { audio.current?.pause(); audio.current = new Audio(clips[id].url); audio.current.play().catch(() => {}) }

  const download = async () => {
    setBusy(true)
    try {
      const { default: JSZip } = await import('jszip')
      const zip = new JSZip()
      const manifest = { clips: {} }
      for (const [id, c] of Object.entries(clips)) { zip.file(`${id}.${c.ext}`, c.blob); manifest.clips[id] = `${id}.${c.ext}` }
      zip.file('manifest.json', JSON.stringify(manifest, null, 2))
      const url = URL.createObjectURL(await zip.generateAsync({ type: 'blob' }))
      const a = document.createElement('a'); a.href = url; a.download = 'letter-sound-clips.zip'; a.click()
      setTimeout(() => URL.revokeObjectURL(url), 2000)
    } finally { setBusy(false) }
  }
  const count = Object.keys(clips).length

  return (
    <>
      <div>
        <h2 className="ta">எழுத்து ஒலிகளைப் பதிவு செய்யுங்கள்</h2>
        <p className="muted ta">ஆசிரியர் அல்லது தெளிவாகப் பேசும் ஒருவர் ஒவ்வொரு ஒலியையும் பதிவு செய்யலாம். அமைதியான இடத்தில், ஃபோனை வாயிலிருந்து ஒரு சாண் தூரத்தில் வைத்து, ஒலியை மட்டும் (எ.கா. "ப்", "ஃப்") சொல்லுங்கள். பதிவுகள் இந்தச் சாதனத்தில் மட்டும் இருக்கும். முடிந்ததும் zip ஆகப் பதிவிறக்கி, README-ல் உள்ளபடி சேர்க்கவும்.</p>
      </div>
      {err && <p className="ta" role="alert" style={{ color: 'var(--bad)' }}>{err}</p>}
      <div className="row"><button className="btn" type="button" disabled={!count || busy} onClick={download}>{busy ? 'தயாராகிறது…' : `Zip பதிவிறக்கு (${count}/${ITEMS.length})`}</button></div>
      <div className="reclist">
        {ITEMS.map(it => {
          const on = rec === it.id, c = clips[it.id]
          return (
            <div className={'recrow' + (c ? ' done' : '')} key={it.id}>
              <span className="rl">{it.letter}</span>
              <div className="rt"><b className="ta">{it.label}</b><span className="muted">{it.id} · {it.example}</span></div>
              {c && <button className="spk" type="button" aria-label="Play recording" onClick={() => play(it.id)}><SpeakerIcon /></button>}
              <button className={'spk mic' + (on ? ' on' : '')} type="button" aria-label={on ? 'Stop' : 'Record'} aria-pressed={on} disabled={!!rec && !on} onClick={() => (on ? stop() : start(it.id))}><MicIcon /></button>
            </div>
          )
        })}
      </div>
    </>
  )
}
