import { refreshToken } from './api/auth'

const TOKEN_DURATION = 60 * 60 * 1000

class TokenRefreshScheduler {
  timeoutId: ReturnType<typeof setTimeout> | null = null

  refresh() {
    refreshToken()
    this.schedule()
  }

  schedule(remainingTime: number = TOKEN_DURATION) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    const earlierTime = remainingTime - 1000 * 60 * 3

    this.timeoutId = setTimeout(() => {
      this.refresh()
    }, earlierTime)
  }
}

export default TokenRefreshScheduler
