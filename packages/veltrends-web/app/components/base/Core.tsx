import { useEffect } from 'react'
import { useTokenRefreshScheduler } from '~/contexts/TokenRefreshContext'

function Core({ remainingTime }: { remainingTime?: number }) {
  const scheduler = useTokenRefreshScheduler()

  useEffect(() => {
    if (!remainingTime) {
      return
    }
    scheduler.schedule(remainingTime)
  }, [remainingTime, scheduler])

  return null
}

export default Core
