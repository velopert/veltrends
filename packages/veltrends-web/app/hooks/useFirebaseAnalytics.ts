import { useLocation } from '@remix-run/react'
import { logEvent } from 'firebase/analytics'
import { useEffect } from 'react'
import { getFirebaseAnalytics } from '~/lib/analytics'

export function useFirebaseAnalytics() {
  const location = useLocation()

  useEffect(() => {
    const analytics = getFirebaseAnalytics()
    if (!analytics) return
    const pagePath = location.pathname + location.search
    logEvent(analytics, 'page_view', {
      page_path: pagePath,
    })
  }, [location])
}
