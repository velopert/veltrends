import { useEffect } from 'react'
import { useTokenRefreshScheduler } from '~/contexts/TokenRefreshContext'
import { useUser } from '~/states/user'

function Core({ remainingTime }: { remainingTime?: number }) {
  const scheduler = useTokenRefreshScheduler()
  const user = useUser()

  useEffect(() => {
    if (!remainingTime || !user) {
      return
    }
    scheduler.schedule(remainingTime)
  }, [remainingTime, scheduler, user])

  useEffect(() => {
    if (!user) return
    const cleanup = scheduler.setup()
    return () => {
      cleanup()
    }
  }, [scheduler, user])

  return null
}

export default Core
