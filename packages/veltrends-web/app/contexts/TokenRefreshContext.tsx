import { createContext, useContext, useRef } from 'react'
import TokenRefreshScheduler from '~/lib/TokenRefreshScheduler'

const TokenRefreshContext = createContext<TokenRefreshScheduler | null>(null)

export function TokenRefreshProvider({ children }: { children: React.ReactNode }) {
  const scheduler = useRef(new TokenRefreshScheduler()).current

  return <TokenRefreshContext.Provider value={scheduler}>{children}</TokenRefreshContext.Provider>
}

export function useTokenRefreshScheduler() {
  const scheduler = useContext(TokenRefreshContext)
  if (!scheduler) throw new Error('TokenRefreshContext is not provided')
  return scheduler
}
