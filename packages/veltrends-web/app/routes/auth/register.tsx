import { type ActionFunction, json, MetaFunction } from '@remix-run/cloudflare'
import { type ThrownResponse, useCatch, useActionData } from '@remix-run/react'
import AuthForm from '~/components/auth/AuthForm'
import { type AuthResult, register } from '~/lib/api/auth'
import BasicLayout from '~/components/layouts/BasicLayout'
import { useAuthRedirect } from '~/hooks/useAuthRedirect'
import { useSetUser } from '~/states/user'
import { useEffect } from 'react'
import { extractError, type AppError } from '~/lib/error'
import { fetchClient } from '~/lib/client'

/** @todo: redirect to home when already logged in */

export const meta: MetaFunction = () => {
  return { title: '회원가입', robots: 'noindex' }
}

export const action: ActionFunction = async ({ request, context }) => {
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')

  if (typeof username !== 'string' || typeof password !== 'string') return

  try {
    const { headers, result } = await register({ username, password })
    return json(result, {
      headers,
    })
  } catch (e) {
    const error = extractError(e)
    throw json(error, {
      status: error.statusCode,
    })
  }
}

interface Props {
  error?: AppError
}

export default function Register({ error }: Props) {
  useAuthRedirect()

  const actionData = useActionData<AuthResult>()
  const setUser = useSetUser()

  useAuthRedirect()

  useEffect(() => {
    if (!actionData) return
    setUser(actionData.user)
  }, [actionData, setUser])

  return (
    <BasicLayout title="회원가입" hasBackButton desktopHeaderVisible={false}>
      <AuthForm mode="register" error={error} />
    </BasicLayout>
  )
}

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, AppError>>()

  return <Register error={caught.data} />
}
