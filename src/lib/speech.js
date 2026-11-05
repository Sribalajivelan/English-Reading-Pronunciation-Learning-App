// Browser speech synthesis. Voice quality depends on the device.
let voices = []
export const hasTTS = typeof window !== 'undefined' && 'speechSynthesis' in window

if (hasTTS) {
  const load = () => { voices = window.speechSynthesis.getVoices() }
  load()
  window.speechSynthesis.onvoiceschanged = load
}

/** Speak English text. Returns false when speech is unavailable. */
export function speak(text, slow) {
  if (!hasTTS) return false
  try {
    const synth = window.speechSynthesis
    synth.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const v = voices.find(v => v.lang === 'en-IN') || voices.find(v => v.lang === 'en-US') || voices.find(v => /^en/i.test(v.lang))
    if (v) { u.voice = v; u.lang = v.lang } else u.lang = 'en-US'
    u.rate = slow ? 0.55 : 0.9
    synth.speak(u)
    return true
  } catch { return false }
}
