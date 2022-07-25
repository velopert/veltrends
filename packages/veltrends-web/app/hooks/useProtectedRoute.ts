import { useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { useUser } from '~/contexts/UserContext'

export function useProtectedRoute() {
  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/write')
    }
  }, [user, navigate])

  return !!user
}
