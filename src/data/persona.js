// "மதி": the friendly Tamil teacher who greets and encourages the learner. All lines are Tamil.
import { DAYS } from './days.js'

export const NAME = 'மதி'
export const ROLE = 'உங்கள் ஆங்கில ஆசிரியர்'

const pick = (list, seed = 0) => list[Math.abs(seed) % list.length]

function hello(hour) {
  if (hour < 5) return 'வணக்கம்!'
  if (hour < 12) return 'காலை வணக்கம்!'
  if (hour < 16) return 'மதிய வணக்கம்!'
  if (hour < 20) return 'மாலை வணக்கம்!'
  return 'இனிய இரவு வணக்கம்!'
}

/** Greeting for the Home screen, chosen from what the learner has done so far. */
export function greeting({ hour, doneCount, streak, due, next, daysAway }) {
  const hi = hello(hour)
  if (doneCount >= 30) return `${hi} 30 நாட்களையும் முடித்துவிட்டீர்கள்! பெருமையாக இருக்கிறது. இனி தினமும் சிறிது மறுபார்வை செய்தால் எல்லாம் நினைவில் நிற்கும்.`
  if (doneCount === 0) return `${hi} நான் ${NAME}, ${ROLE}. தினமும் 30 நிமிடம் போதும். முதல் நாளிலிருந்து தொடங்கலாமா?`
  if (daysAway >= 3) return `${hi} மீண்டும் வந்தது மகிழ்ச்சி! சிறிய மறுபார்வையுடன் தொடங்கினால் எல்லாம் நினைவுக்கு வரும்.`
  if (due > 0) return `${hi} இன்று ${due} வார்த்தைகள் மறுபார்வைக்குக் காத்திருக்கின்றன. 5 நிமிடம் போதும்.`
  if (streak >= 3) return `${hi} ${streak} நாட்களாகத் தொடர்ந்து படிக்கிறீர்கள். அருமை! இன்றும் தொடருவோம்.`
  const d = DAYS[next]
  return `${hi} இன்றைய பாடம்: நாள் ${next}, ${d.ta}. தொடங்கலாமா?`
}

/** Encouragement after a 10-question round (quiz, review or spelling). */
export function roundEnd(score, total, seed = 0) {
  const r = total ? score / total : 0
  if (r >= 0.9) return pick(['அருமை! கிட்டத்தட்ட எல்லாமே சரி. நன்றாகக் கற்றுக்கொள்கிறீர்கள்.', 'மிகவும் நன்று! இதே வேகத்தில் தொடருங்கள்.'], seed)
  if (r >= 0.6) return pick(['நல்ல முயற்சி! தவறிய வார்த்தைகள் மறுபார்வையில் மீண்டும் வரும்.', 'நன்றாகப் போகிறது. தவறியவற்றை நாளை மீண்டும் பார்ப்போம்.'], seed)
  return pick(['கவலைப்படாதீர்கள். தவறுகள்தான் கற்றலின் வழி. மீண்டும் முயற்சி செய்வோம்.', 'பரவாயில்லை. மெதுவாக, ஒவ்வொரு வார்த்தையாகப் பழகுவோம்.'], seed)
}

/** Message when the learner finishes a day. */
export function dayDone(n, seed = 0) {
  if (n >= 30) return 'வாழ்த்துகள்! 30 நாள் பயணத்தை முடித்துவிட்டீர்கள்.'
  return pick([`நாள் ${n} முடிந்தது. சிறப்பு! நாளை சந்திப்போம்.`, `நாள் ${n} முடிந்தது. நன்றாகச் செய்தீர்கள்!`, `அருமை! நாள் ${n} முடிந்தது. சிறிது ஓய்வெடுங்கள்.`], seed)
}
