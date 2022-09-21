import { logout } from '~/lib/api/auth'

export function useLogout() {
  const handleLogout = async () => {
    try {
      await logout()
    } catch (e) {}
    window.location.href = '/'
  }
  return handleLogout
}
