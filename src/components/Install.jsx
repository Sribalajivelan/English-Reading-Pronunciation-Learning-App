import { useInstall } from '../lib/pwa.js'

/** Offer to put the app on the home screen so it opens like an app and works offline. */
export default function Install() {
  const { canPrompt, showIOS, install, dismiss } = useInstall()
  if (!canPrompt && !showIOS) return null
  return (
    <section className="card stack installcard">
      <div className="next">
        <div>
          <h3 className="ta">ஃபோனில் ஆப் போல வைத்துக்கொள்ளுங்கள்</h3>
          <p className="ta muted" style={{ fontSize: '.92rem', marginTop: 4 }}>
            {canPrompt ? 'முகப்புத் திரையில் சேர்த்தால், இணையம் இல்லாதபோதும் பாடங்களைப் படிக்கலாம்.' : 'Safari-ல் Share பொத்தானைத் தொட்டு, "Add to Home Screen" தேர்ந்தெடுங்கள். இணையம் இல்லாதபோதும் வேலை செய்யும்.'}
          </p>
        </div>
        <div className="row">
          {canPrompt && <button className="btn" type="button" onClick={install}>சேர்</button>}
          <button className="btn ghost" type="button" onClick={dismiss}>பிறகு</button>
        </div>
      </div>
    </section>
  )
}
