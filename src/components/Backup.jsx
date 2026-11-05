import { useEffect, useRef, useState } from 'react'
import { useApp } from '../lib/context.js'
import { doneCount, exportCode, mergeProgress, parseBackup } from '../lib/progress.js'

/** Save status, plus backup and restore so progress can move between phones. */
export default function Backup() {
  const { S, update, toast, saveOk } = useApp()
  const [persisted, setPersisted] = useState(null)
  const [text, setText] = useState('')
  const [confirm, setConfirm] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    navigator.storage?.persisted?.().then(setPersisted).catch(() => {})
  }, [S.saved])

  const code = exportCode(S)
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); toast('காப்புக் குறியீடு நகலெடுக்கப்பட்டது') }
    catch { document.getElementById('backup-code')?.select(); toast('குறியீட்டைத் தேர்ந்தெடுத்துள்ளோம். நகலெடுக்கவும்') }
  }
  const download = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(parseBackup(code), null, 2)], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url; a.download = 'angilam-padippom-progress.json'; a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const restore = raw => {
    const b = parseBackup(raw)
    if (!b) { toast('இந்தக் குறியீடு சரியானதல்ல'); return false }
    update(x => { Object.assign(x, mergeProgress(x, b), { slow: x.slow, voice: x.voice }) })
    toast('முன்னேற்றம் சேர்க்கப்பட்டது'); return true
  }
  const onFile = async e => {
    const f = e.target.files?.[0]; e.target.value = ''
    if (f) restore(await f.text())
  }
  const reset = () => { update(x => { Object.assign(x, { done: {}, tasks: {}, rating: {}, best: {}, counter: {}, speed: {}, srs: {} }) }); setConfirm(false); toast('முன்னேற்றம் அழிக்கப்பட்டது') }

  const saved = S.saved ? new Date(S.saved).toLocaleString('ta-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'
  return (
    <section className="card stack">
      <h3 className="ta">முன்னேற்றச் சேமிப்பு</h3>
      <ul className="notes">
        <li>{saveOk ? 'உங்கள் முன்னேற்றம் இந்தச் சாதனத்தின் உலாவியில் தானாகச் சேமிக்கப்படுகிறது.' : 'சேமிக்க முடியவில்லை. தனிப்பட்ட (private) சாளரத்தில் இருக்கலாம். கீழே காப்புக் குறியீட்டை நகலெடுத்து வைக்கவும்.'}</li>
        <li>கடைசியாகச் சேமித்தது: {saved} · {doneCount(S)} நாட்கள் முடிந்தன</li>
        {persisted !== null && <li>{persisted ? 'சேமிப்பு பாதுகாக்கப்பட்டது: இடம் குறைந்தாலும் உலாவி அழிக்காது.' : 'உலாவி இடம் குறைந்தால் தரவை அழிக்கக்கூடும். அவ்வப்போது காப்புக் குறியீட்டை வைத்துக்கொள்ளுங்கள்.'}</li>}
      </ul>

      <div>
        <label className="ta" htmlFor="backup-code"><b>காப்புக் குறியீடு</b> <span className="muted">Backup code</span></label>
        <textarea id="backup-code" className="code" readOnly rows={3} value={code} onFocus={e => e.target.select()} />
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn" type="button" onClick={copy}>நகலெடு</button>
          <button className="btn ghost" type="button" onClick={download}>கோப்பாகப் பதிவிறக்கு</button>
        </div>
        <p className="ta muted" style={{ fontSize: '.82rem', marginTop: 6 }}>இதை WhatsApp-ல் உங்களுக்கே அனுப்பிவைத்தால், வேறு ஃபோனிலும் தொடரலாம்.</p>
      </div>

      <div>
        <label className="ta" htmlFor="restore-code"><b>மீட்டெடு</b> <span className="muted">Restore</span></label>
        <textarea id="restore-code" className="code" rows={2} placeholder="AP2:… குறியீட்டை இங்கே ஒட்டவும்" value={text} onChange={e => setText(e.target.value)} />
        <div className="row" style={{ marginTop: 8 }}>
          <button className="btn" type="button" disabled={!text.trim()} onClick={() => restore(text) && setText('')}>சேர்</button>
          <button className="btn ghost" type="button" onClick={() => fileRef.current?.click()}>கோப்பிலிருந்து</button>
          <input ref={fileRef} type="file" accept=".json,application/json,text/plain" hidden onChange={onFile} />
        </div>
        <p className="ta muted" style={{ fontSize: '.82rem', marginTop: 6 }}>மீட்டெடுப்பது உங்கள் தற்போதைய முன்னேற்றத்தை அழிக்காது. இரண்டையும் இணைக்கும்.</p>
      </div>

      <div className="row">
        {!confirm
          ? <button className="btn ghost danger" type="button" onClick={() => setConfirm(true)}>முன்னேற்றத்தை அழி</button>
          : <><span className="ta" style={{ fontSize: '.9rem' }}>உறுதியாக எல்லாவற்றையும் அழிக்கவா?</span>
              <button className="btn danger" type="button" onClick={reset}>ஆம், அழி</button>
              <button className="btn ghost" type="button" onClick={() => setConfirm(false)}>வேண்டாம்</button></>}
      </div>
    </section>
  )
}
