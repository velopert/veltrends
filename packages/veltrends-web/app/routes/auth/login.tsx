import { type ActionFunction, json } from '@remix-run/cloudflare'
import { type ThrownResponse, useCatch, useActionData, useNavigate } from '@remix-run/react'
import AuthForm from '~/components/auth/AuthForm'
import { type AuthResult, login } from '~/lib/api/auth'
import BasicLayout from '~/components/layouts/BasicLayout'
import { useEffect } from 'react'
import { useAuthRedirect } from '~/hooks/useAuthRedirect'
import { useSetUser } from '~/states/user'
import { extractNextError, type NextAppError } from '~/lib/nextError'
import { fetchClient } from '~/lib/client'

/** @todo: redirect to home when already logged in */

export const action: ActionFunction = async ({ request, context }) => {
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')

  if (typeof username !== 'string' || typeof password !== 'string') return
  try {
    const { headers, result } = await login({ username, password })
    return json(result, {
      headers,
    })
  } catch (e) {
    const error = extractNextError(e)
    throw json(error, {
      status: error.statusCode,
    })
  }
}

interface Props {
  error?: NextAppError
}

export default function Login({ error }: Props) {
  const actionData = useActionData<AuthResult>()
  const setUser = useSetUser()

  useAuthRedirect()

  useEffect(() => {
    if (!actionData) return
    setUser(actionData.user)
  }, [actionData, setUser])
  return (
    <BasicLayout title="로그인" hasBackButton desktopHeaderVisible={false}>
      <AuthForm mode="login" error={error} />
    </BasicLayout>
  )
}

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, NextAppError>>()
  console.log(caught)

  return <Login error={caught.data} />
}
