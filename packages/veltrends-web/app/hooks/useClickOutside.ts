import { useEffect, type RefObject } from 'react'

type Event = MouseEvent | TouchEvent

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  deps?: any[],
) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current
      if (!el || el.contains((event?.target as Node) || null)) {
        return
      }

      handler(event) // Call the handler only if the click is outside of the element passed.
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, handler, ...(deps ?? [])]) // Reload only if ref or handler changes
}
