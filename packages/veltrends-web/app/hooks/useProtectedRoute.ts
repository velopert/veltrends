import { useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { useUser } from '~/contexts/UserContext'

export function useProtectedRoute() {
  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/auth/login')
    }
  }, [user, navigate])

  return !!user
}
