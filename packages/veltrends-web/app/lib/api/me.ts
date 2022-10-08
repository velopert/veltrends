import { client, fetchClient } from '../client'
import { type AuthResult } from './auth'

export async function getMyAccount() {
  const response = await fetchClient.get<AuthResult>('/api/me')
  return response.data
}

export async function changePassword({
  oldPassword,
  newPassword,
}: {
  oldPassword: string
  newPassword: string
}) {
  const response = await fetchClient.post('/api/me/change-password', {
    oldPassword,
    newPassword,
  })
  return response.data
}

export async function unregister() {
  const response = await fetchClient.delete('/api/me')
  return response.data
}
