import { client } from '../client'
import { type AuthResult } from './auth'

export async function getMyAccount() {
  const response = await client.get<AuthResult>('/api/me')
  return response.data
}

export async function changePassword({
  oldPassword,
  newPassword,
}: {
  oldPassword: string
  newPassword: string
}) {
  const response = await client.post('/api/me/change-password', {
    oldPassword,
    newPassword,
  })
  return response.data
}

export async function unregister() {
  const response = await client.delete('/api/me')
  return response.data
}
