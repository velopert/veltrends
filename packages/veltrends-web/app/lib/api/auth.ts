import { DataFunctionArgs, LoaderFunction, redirect } from '@remix-run/node'
import axios from 'axios'
import { client } from '../client'
import { type User } from './types'

export async function register(params: AuthParams) {
  const response = await axios.post<AuthResult>('http://localhost:8080/api/auth/register', params)

  const result = response.data
  const cookieHeader = response.headers['set-cookie']
  const headers = createCookieHeaders(cookieHeader)
  return { result, headers }
}

export async function login(params: AuthParams) {
  const response = await axios.post<AuthResult>('http://localhost:8080/api/auth/login', params)
  const result = response.data
  const cookieHeader = response.headers['set-cookie']
  const headers = createCookieHeaders(cookieHeader)
  return { result, headers }
}

export async function logout() {
  return client.post('/api/auth/logout')
}

export async function getMyAccount(accessToken?: string) {
  const response = await client.get<AuthResult>('/api/me', {
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {},
  })
  return response.data
}

export async function refreshToken() {
  const response = await client.post<Tokens>('/api/auth/refresh', {})
  const tokens = response.data
  const cookieHeader = response.headers['set-cookie']
  const headers = createCookieHeaders(cookieHeader)

  return {
    headers,
    tokens,
  }
}

function createCookieHeaders(setCookieHeader: string[] | undefined) {
  if (!setCookieHeader || setCookieHeader?.length === 0) {
    throw new Error('No cookie header')
  }
  const headers = new Headers()
  setCookieHeader.forEach((cookie) => {
    headers.append('Set-Cookie', cookie)
  })
  return headers
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
