import { type ActionFunction, json } from '@remix-run/node'
import { type ThrownResponse, useCatch, useActionData, useNavigate } from '@remix-run/react'
import AuthForm from '~/components/auth/AuthForm'
import { login } from '~/lib/api/auth'
import { type AppError, extractError } from '~/lib/error'
import BasicLayout from '~/components/layouts/BasicLayout'
import { useEffect } from 'react'
import { useAuthRedirect } from '~/hooks/useAuthRedirect'

export const action: ActionFunction = async ({ request }) => {
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
    const error = extractError(e)
    throw json(error, {
      status: error.statusCode,
    })
  }
}

interface Props {
  error?: AppError
}

export default function Login({ error }: Props) {
  const actionData = useActionData()
  useAuthRedirect()

  useEffect(() => {
    if (!actionData) return
  }, [actionData])
  return (
    <BasicLayout title="로그인" hasBackButton>
      <AuthForm mode="login" error={error} />
    </BasicLayout>
  )
}

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, AppError>>()

  return <Login error={caught.data} />
}
