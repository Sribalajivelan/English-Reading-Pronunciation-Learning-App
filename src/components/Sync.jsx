import { useApp } from '../lib/context.js'

/** Sign in with Google so progress follows the learner across phones. */
export default function Sync() {
  const { sync } = useApp()
  if (!sync.configured) return null
  const { status, user, error, lastSync } = sync
  const busy = status === 'init' || status === 'syncing'
  const label = { init: 'ஏற்றுகிறது…', syncing: 'ஒத்திசைக்கிறது…', synced: 'ஒத்திசைக்கப்பட்டது', error: 'பிழை' }[status]
  return (
    <section className="card stack">
      <h3 className="ta">எல்லா சாதனங்களிலும் தொடருங்கள் <small className="muted" style={{ fontFamily: 'var(--f-body)', fontWeight: 400, fontSize: '.8rem' }}>Cloud sync</small></h3>
      {!user ? (
        <>
          <p className="ta muted" style={{ fontSize: '.92rem' }}>Google கணக்கில் உள்நுழைந்தால், உங்கள் முன்னேற்றம் பாதுகாப்பாகச் சேமிக்கப்பட்டு, எந்த ஃபோனிலும் தொடரலாம். உங்கள் முன்னேற்றம் மட்டுமே சேமிக்கப்படும்.</p>
          <div><button className="btn" type="button" disabled={status === 'init'} onClick={sync.signIn}>Google-ஆல் உள்நுழை</button></div>
        </>
      ) : (
        <>
          <div className="who">
            {user.photo && <img src={user.photo} alt="" width="40" height="40" referrerPolicy="no-referrer" />}
            <div><b>{user.name || 'கணக்கு'}</b><span className="muted">{user.email}</span></div>
          </div>
          <p className={'ta syncstate ' + status} aria-live="polite">
            {label}{status === 'synced' && lastSync ? ' · ' + lastSync.toLocaleTimeString('ta-IN', { timeStyle: 'short' }) : ''}
          </p>
          <div className="row">
            <button className="btn" type="button" disabled={busy} onClick={sync.syncNow}>இப்போது ஒத்திசை</button>
            <button className="btn ghost" type="button" onClick={sync.signOut}>வெளியேறு</button>
          </div>
        </>
      )}
      {error && <p className="ta" role="alert" style={{ color: 'var(--bad)', fontSize: '.9rem' }}>{error}</p>}
    </section>
  )
}
