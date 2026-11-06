import { useRef } from 'react'

/**
 * Long-press (touch or mouse hold), right-click and the keyboard context-menu key all call `onLong`.
 * A normal tap calls `onTap`. The tap that ends a long press is ignored.
 */
export function useLongPress(onLong, onTap, ms = 450) {
  const timer = useRef(null)
  const fired = useRef(false)
  const origin = useRef(null)
  const clear = () => { clearTimeout(timer.current); timer.current = null }
  return {
    onPointerDown: e => {
      fired.current = false
      origin.current = { x: e.clientX, y: e.clientY }
      clear()
      timer.current = setTimeout(() => { fired.current = true; timer.current = null; navigator.vibrate?.(12); onLong() }, ms)
    },
    onPointerMove: e => {
      const o = origin.current
      if (timer.current && o && Math.hypot(e.clientX - o.x, e.clientY - o.y) > 10) clear()
    },
    onPointerUp: clear,
    onPointerLeave: clear,
    onPointerCancel: clear,
    onContextMenu: e => { e.preventDefault(); clear(); fired.current = true; onLong() },
    onClick: e => {
      if (fired.current) { fired.current = false; e.preventDefault(); return }
      onTap?.(e)
    },
  }
}
