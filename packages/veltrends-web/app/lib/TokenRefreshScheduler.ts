import { getMyAccount, refreshToken } from './api/auth'
import { extractError } from './error'

const TOKEN_DURATION = 60 * 60 * 1000

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

class TokenRefreshScheduler {
  timeoutId: ReturnType<typeof setTimeout> | null = null
  counter = 0

  constructor() {
    if (typeof window !== 'undefined') {
      this.increaseCounter()
    }
  }

  increaseCounter() {
    const value = this.getCounter()
    const nextValue = value + 1
    this.setCounter(nextValue)
    this.counter = nextValue
  }

  getCounter() {
    const value = localStorage.getItem('tokenScheduler')
    if (value === null) {
      return 0
    }
    return parseInt(value, 10)
  }

  setCounter(value: number) {
    localStorage.setItem('tokenScheduler', value.toString())
  }

  shouldRefresh() {
    console.log(this.getCounter(), this.counter)
    return this.getCounter() === this.counter
  }

  async refresh() {
    if (this.shouldRefresh()) {
      refreshToken()
    }
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

  async refreshTokenIfExpired() {
    try {
      await getMyAccount()
    } catch (e) {
      const error = extractError(e)
      if (error.name === 'Unauthorized' && error.payload?.isExpiredToken) {
        await this.refresh()
        this.schedule()
      }
    }
  }

  setup() {
    const handler = () => {
      this.increaseCounter()
      this.refreshTokenIfExpired()
    }

    window.addEventListener('focus', handler)
    return () => {
      window.removeEventListener('focus', handler)
    }
  }
}

export default TokenRefreshScheduler
