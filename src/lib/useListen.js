import { useCallback, useEffect, useRef, useState } from 'react'
import { explainError, judgeSentence, judgeWord, listenOnce } from './recognize.js'
import { useApp } from './context.js'

/** One-shot "say it" check. kind: 'word' | 'sentence'. */
export function useListen(target, kind = 'word', onResult) {
  const { toast } = useApp()
  const [state, setState] = useState('idle')   // idle | listening | done
  const [result, setResult] = useState(null)
  const alive = useRef(true)
  const cb = useRef(onResult)
  cb.current = onResult
  useEffect(() => { alive.current = true; return () => { alive.current = false } }, [])

  const start = useCallback(async () => {
    if (state === 'listening') return
    setResult(null); setState('listening')
    try {
      const alts = await listenOnce()
      if (!alive.current) return
      const r = kind === 'word' ? judgeWord(target, alts) : judgeSentence(target, alts)
      setResult(r); setState('done')
      cb.current?.(r)
      return r
    } catch (e) {
      if (!alive.current) return
      setState('idle'); toast(explainError(e.code))
    }
  }, [state, target, kind, toast])

  const reset = useCallback(() => { setState('idle'); setResult(null) }, [])
  return { state, result, start, reset }
}
