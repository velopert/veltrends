import { useEffect } from 'react'

export function useInfiniteScroll(ref: React.RefObject<any>, fetchNext: () => void) {
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNext()
          }
        })
      },
      {
        root: ref.current.parentElement,
        rootMargin: '300px',
        threshold: 1,
      },
    )
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [fetchNext, ref])
}
