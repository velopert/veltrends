import { RemixBrowser } from '@remix-run/react'
import React, { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { initializeAnalytics } from './lib/analytics'
import createEmotionCache from './styles/createEmotionCache'
import ClientStyleContext from './styles/client.context'
import { CacheProvider } from '@emotion/react'

interface ClientCacheProviderProps {
  children: React.ReactNode
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = React.useState(createEmotionCache())

  const reset = React.useCallback(() => {
    setCache(createEmotionCache())
  }, [])

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <ClientCacheProvider>
          <RemixBrowser />
        </ClientCacheProvider>
      </StrictMode>,
    )
  })
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1)
}

initializeAnalytics()
