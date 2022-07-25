import { type ActionFunction, json } from '@remix-run/node'
import { type ThrownResponse, useCatch } from '@remix-run/react'
import AuthForm from '~/components/auth/AuthForm'
import { register } from '~/lib/api/auth'
import { type AppError, extractError } from '~/lib/error'
import BasicLayout from '~/components/layouts/BasicLayout'

export const action: ActionFunction = async ({ request }) => {
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
  return (
    <BasicLayout title="회원가입" hasBackButton>
      <AuthForm mode="register" error={error} />
    </BasicLayout>
  )
}

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, AppError>>()

  return <Register error={caught.data} />
}
