import { useActionData, useNavigate, useSearchParams } from '@remix-run/react'
import { type CatchValue } from '@remix-run/react/dist/transition'
import { useEffect } from 'react'
import { type AuthResult } from '~/lib/api/auth'

export function useAuthRedirect() {
  const authResult = useActionData<AuthResult | CatchValue>()

  const [searchParams] = useSearchParams()
  const next = searchParams.get('next') ?? '/'
  const navigate = useNavigate()

  useEffect(() => {
    if (!authResult) return
    if ('status' in authResult) return // login failed
    navigate(next)
  }, [authResult, navigate, next])
}
