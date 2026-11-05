import { useEffect, useState } from 'react'

export const NAV = [['home', 'முகப்பு', 'Home'], ['plan', 'திட்டம்', 'Plan'], ['letters', 'எழுத்துகள்', 'Letters'], ['practice', 'பயிற்சி', 'Quiz'], ['read', 'வாசிப்பு', 'Read']]

function parse() {
  const h = (window.location.hash || '#home').slice(1)
  const m = h.match(/^day-(\d+)$/)
  if (m) return { v: 'day', n: +m[1] }
  if (h === 'review') return { v: 'review' }
  return { v: NAV.some(x => x[0] === h) ? h : 'home' }
}

/** Tiny hash router: #home, #plan, #day-5, #letters, #practice, #read */
export function useRoute() {
  const [r, setR] = useState(parse)
  useEffect(() => {
    const on = () => { setR(parse()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return r
}
