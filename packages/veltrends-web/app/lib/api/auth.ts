import { fetchClient } from '../client'
import { type User } from './types'

export async function register(params: AuthParams) {
  const response = await fetchClient.post<AuthResult>('/api/auth/register', params)

  const result = response.data

  return { result, headers: response.headers }
}

export async function login(params: AuthParams) {
  const response = await fetchClient.post<AuthResult>('/api/auth/login', params)
  const result = response.data

  return { result, headers: response.headers }
}

export async function logout() {
  return fetchClient.post('/api/auth/logout')
}

export async function getMyAccount(accessToken?: string) {
  const response = await fetchClient.get<AuthResult>('/api/me', {
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {},
  })
  return response.data
}

export async function refreshToken() {
  const response = await fetchClient.post<Tokens>('/api/auth/refresh', {})
  const tokens = response.data
  const headers = response.headers

  return {
    headers,
    tokens,
  }
}

interface AuthParams {
  username: string
  password: string
}

export interface AuthResult {
  tokens: Tokens
  user: User
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}
