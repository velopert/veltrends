import { useLocation, useNavigationType } from '@remix-run/react'
import { createContext, useContext, useEffect, useMemo, useRef } from 'react'

const TabScrollTopContext = createContext<Map<string, number> | null>(null)

export function TabScrollTopContextProvider({ children }: { children: React.ReactNode }) {
  const scrollTopMap = useRef(new Map<string, number>()).current

  return (
    <TabScrollTopContext.Provider value={scrollTopMap}>{children}</TabScrollTopContext.Provider>
  )
}

export function useTabScrollTop(ref: React.RefObject<HTMLElement>) {
  const context = useContext(TabScrollTopContext)
  const type = useNavigationType()
  const mountedRef = useRef(false)
  const location = useLocation()

  if (!context) throw new Error('TabScrollTopContext is not provided')

  useEffect(() => {
    const { current } = ref
    if (!current) return

    const handleScroll = () => {
      context.set(location.pathname, current.scrollTop)
    }

    current.addEventListener('scroll', handleScroll)
    return () => {
      current.removeEventListener('scroll', handleScroll)
    }
  }, [context, ref, location])

  useEffect(() => {
    if (mountedRef.current) return
    mountedRef.current = true
    if (ref.current) {
      ref.current.scrollTop = context.get(location.pathname) ?? 0
    }
  }, [type, location, context, ref])
}

export default TabScrollTopContext
