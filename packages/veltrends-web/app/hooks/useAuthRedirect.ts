import { useActionData, useNavigate, useSearchParams } from '@remix-run/react'
import { useEffect } from 'react'
import { type AuthResult } from '~/lib/api/auth'

export function useAuthRedirect() {
  const authResult = useActionData<AuthResult>()
  console.log({ authResult })
  const [searchParams] = useSearchParams()
  const next = searchParams.get('next') ?? '/'
  const navigate = useNavigate()

  useEffect(() => {
    if (!authResult) return
    navigate(next)
  }, [authResult, navigate, next])
}
