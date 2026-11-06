// Browser speech synthesis. Voice quality depends on the device.
let voices = []
export const hasTTS = typeof window !== 'undefined' && 'speechSynthesis' in window

if (hasTTS) {
  const load = () => { voices = window.speechSynthesis.getVoices() }
  load()
  window.speechSynthesis.onvoiceschanged = load
}

/** English voices on this device, Indian English first. */
export function englishVoices() {
  return voices.filter(v => /^en/i.test(v.lang)).sort((a, b) => (b.lang === 'en-IN') - (a.lang === 'en-IN') || a.name.localeCompare(b.name))
}

/** Call `fn` now and whenever the device finishes loading its voice list. */
export function onVoices(fn) {
  if (!hasTTS) return () => {}
  const h = () => { voices = window.speechSynthesis.getVoices(); fn() }
  window.speechSynthesis.addEventListener('voiceschanged', h)
  h()
  return () => window.speechSynthesis.removeEventListener('voiceschanged', h)
}

/** Speak English text. `voiceURI` is the chosen voice ('' = automatic). Returns false when speech is unavailable. */
export function speak(text, slow, voiceURI) {
  if (!hasTTS) return false
  try {
    const synth = window.speechSynthesis
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const v = (voiceURI && voices.find(v => v.voiceURI === voiceURI)) || voices.find(v => v.lang === 'en-IN') || voices.find(v => v.lang === 'en-US') || voices.find(v => /^en/i.test(v.lang))
    if (v) { u.voice = v; u.lang = v.lang } else u.lang = 'en-US'
    u.rate = slow ? 0.55 : 0.9
    synth.speak(u)
    return true
  } catch { return false }
}

/** Tamil voices on this device. */
export function tamilVoices() {
  return voices.filter(v => /^ta/i.test(v.lang)).sort((a, b) => (b.lang === 'ta-IN') - (a.lang === 'ta-IN') || a.name.localeCompare(b.name))
}

/** Tidy text for a speech voice: drop phonetic symbols and decoration it would read aloud. */
export function cleanForSpeech(text) {
  return String(text)
    .replace(/\(\s*\/[^/)]*\/\s*\)/g, ' ')      // (/æ/)
    .replace(/\/[^/\s]{1,6}\//g, ' ')              // /ʌ/
    .replace(/[→≠·•“”"()[\]]/g, ' ')
    .replace(/\s*[/]\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Split into runs of English (Latin letters) and Tamil/other text. */
export function splitRuns(text) {
  const runs = []
  const re = /([A-Za-z][A-Za-z0-9’'.-]*(?:\s+[A-Za-z][A-Za-z0-9’'.-]*)*)/g
  let last = 0, m
  while ((m = re.exec(text))) {
    if (m.index > last) runs.push({ lang: 'ta', text: text.slice(last, m.index) })
    runs.push({ lang: 'en', text: m[0] })
    last = m.index + m[0].length
  }
  if (last < text.length) runs.push({ lang: 'ta', text: text.slice(last) })
  return runs.filter(r => /[A-Za-z\u0B80-\u0BFF0-9]/.test(r.text))
}

/**
 * Speak text that mixes Tamil and English: Tamil runs use a Tamil voice, English runs an English voice.
 * Returns 'ok', 'no-tamil' (the device has no Tamil voice) or 'unsupported'.
 */
export function speakMixed(text, { slow, voice, voiceTa } = {}) {
  if (!hasTTS) return 'unsupported'
  const synth = window.speechSynthesis
  const ta = (voiceTa && voices.find(v => v.voiceURI === voiceTa)) || tamilVoices()[0]
  const en = (voice && voices.find(v => v.voiceURI === voice)) || voices.find(v => v.lang === 'en-IN') || voices.find(v => v.lang === 'en-US') || voices.find(v => /^en/i.test(v.lang))
  const runs = splitRuns(cleanForSpeech(text))
  if (!ta && runs.some(r => r.lang === 'ta' && /[\u0B80-\u0BFF]/.test(r.text))) return 'no-tamil'
  try {
    synth.cancel()
    for (const r of runs) {
      const u = new SpeechSynthesisUtterance(r.text)
      const v = r.lang === 'ta' ? ta : en
      if (v) { u.voice = v; u.lang = v.lang } else u.lang = r.lang === 'ta' ? 'ta-IN' : 'en-US'
      u.rate = slow ? 0.6 : 0.92
      synth.speak(u)
    }
    return 'ok'
  } catch { return 'unsupported' }
}
