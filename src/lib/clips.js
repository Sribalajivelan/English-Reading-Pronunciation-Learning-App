// Recorded sound clips (public/audio/*). When a clip exists it is played instead of the device voice.
// public/audio/manifest.json looks like: { "clips": { "B-sound": "B-sound.mp3", ... } }
const base = import.meta.env.BASE_URL
let manifest = null
let loading = null

export function loadClips() {
  if (!loading) {
    loading = fetch(base + 'audio/manifest.json')
      .then(r => (r.ok ? r.json() : {}))
      .then(j => { manifest = (j && j.clips) || {} })
      .catch(() => { manifest = {} })
  }
  return loading
}

export const hasClip = id => !!(manifest && manifest[id])

let current = null
/** Play a recorded clip right away. Returns false if there is none (caller falls back to the device voice). */
export function playClip(id, slow) {
  const f = manifest && manifest[id]
  if (!f) return false
  try {
    current?.pause()
    current = new Audio(base + 'audio/' + f)
    current.playbackRate = slow ? 0.75 : 1
    current.play().catch(() => {})
    return true
  } catch { return false }
}

/** Every sound that can have a recording, with a label for the recorder screen. */
export function clipList(LETTERS, VSND, CSND) {
  const out = []
  for (const x of LETTERS) {
    const L = x.l
    if (x.vowel) VSND[L].forEach(s => out.push({ id: L + '-' + s[0], letter: L, label: s[1] + ' (' + s[0] + ')', example: x.ex.map(e => e[0]).join(', ') }))
    else CSND[L].forEach((s, i) => out.push({ id: L + '-' + (CSND[L].length > 1 ? (i ? 'soft' : 'hard') : 'sound'), letter: L, label: x.ta.split(' / ')[i].replace(/\s*\(.*\)/, ''), example: x.ex.map(e => e[0]).join(', ') }))
  }
  return out
}
