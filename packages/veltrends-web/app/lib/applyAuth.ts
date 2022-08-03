import { setClientCookie } from './client'

export function applyAuth(request: Request) {
  const cookie = request.headers.get('Cookie')

  if (!cookie || !cookie.includes('access_token')) {
    return false
  }

  setClientCookie(cookie)
  return true
}
