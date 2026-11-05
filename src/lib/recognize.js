// Pronunciation check using the browser's speech recognition (Chrome / Edge / Android).
const SR = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null
export const canRecognize = !!SR

export const norm = s => String(s).toLowerCase().replace(/[’]/g, "'").replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ').trim()

/** Listen once. Resolves with up to 5 possible transcripts (best first); rejects with { code }. */
export function listenOnce() {
  return new Promise((resolve, reject) => {
    const r = new SR()
    r.lang = 'en-IN'
    r.maxAlternatives = 5
    r.interimResults = false
    r.continuous = false
    let got = null
    r.onresult = e => { got = [...e.results[0]].map(a => a.transcript) }
    r.onerror = e => reject({ code: e.error })
    r.onend = () => resolve(got || [])
    try { window.speechSynthesis?.cancel(); r.start() } catch (e) { reject({ code: 'start-failed' }) }
  })
}

function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}

/** Judge a single spoken word: { status: 'ok' | 'close' | 'miss' | 'none', heard } */
export function judgeWord(target, alts) {
  if (!alts.length) return { status: 'none', heard: '' }
  const t = norm(target).replace(/'/g, '')
  let close = false
  for (const a of alts) {
    const toks = norm(a).replace(/'/g, '').split(' ').filter(Boolean)
    if (toks.includes(t) || toks.join('') === t) return { status: 'ok', heard: a }
    if (t.length >= 4 && toks.some(x => distance(x, t) <= 1)) close = true
  }
  return { status: close ? 'close' : 'miss', heard: alts[0] }
}

/** Judge a spoken sentence: per-word hits against the best matching transcript. */
export function judgeSentence(target, alts) {
  const words = norm(target).split(' ').filter(Boolean)
  if (!alts.length) return { status: 'none', heard: '', words: words.map(w => ({ w, ok: false })), score: 0 }
  let best = null
  for (const a of alts) {
    const have = norm(a).replace(/'/g, '').split(' ')
    const marks = words.map(w => ({ w, ok: have.includes(w.replace(/'/g, '')) }))
    const score = marks.filter(m => m.ok).length / words.length
    if (!best || score > best.score) best = { heard: a, words: marks, score }
  }
  return { ...best, status: best.score === 1 ? 'ok' : best.score >= 0.7 ? 'close' : 'miss' }
}

export function explainError(code) {
  if (code === 'not-allowed' || code === 'service-not-allowed') return 'மைக்ரோஃபோன் அனுமதி தேவை. உலாவியில் அனுமதித்து மீண்டும் முயலுங்கள்.'
  if (code === 'no-speech') return 'குரல் கேட்கவில்லை. மீண்டும் முயலுங்கள்.'
  if (code === 'audio-capture') return 'மைக்ரோஃபோன் கிடைக்கவில்லை.'
  if (code === 'network') return 'இணையம் தேவை. இணைப்பைச் சரிபார்க்கவும்.'
  return 'குரலைச் சரிபார்க்க முடியவில்லை. மீண்டும் முயலுங்கள்.'
}
