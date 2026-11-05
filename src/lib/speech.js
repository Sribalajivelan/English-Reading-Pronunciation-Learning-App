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
