import { DataFunctionArgs, LoaderFunction, redirect } from '@remix-run/node'
import axios from 'axios'
import { client } from '../client'
import { User } from './types'

export async function register(params: AuthParams) {
  const response = await axios.post<AuthResult>('http://localhost:4000/api/auth/register', params)
  const result = response.data
  const cookieHeader = response.headers['set-cookie']
  const headers = createCookieHeaders(cookieHeader)
  return { result, headers }
}

export async function login(params: AuthParams) {
  const response = await axios.post<AuthResult>('http://localhost:4000/api/auth/login', params)
  const result = response.data
  const cookieHeader = response.headers['set-cookie']
  const headers = createCookieHeaders(cookieHeader)
  return { result, headers }
}

export async function getMyAccount() {
  const response = await client.get<AuthResult>('http://localhost:4000/api/me')
  return response.data
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
