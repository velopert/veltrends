import { AppLoadContext } from '@remix-run/node'
import QueryString from 'qs'
import { getMemoMyAccount } from './protectRoute'

let _cookie = ''

export function setClientCookie(cookie: string) {
  _cookie = cookie
}

export function clearCookie() {
  _cookie = ''
}

export function consumeCookie(request: Request) {
  const cookie = request.headers.get('Cookie')
  if (cookie) {
    setClientCookie(cookie)
  }
}

/**
 * wait until access token gets refreshed, if needed.
 */
export function waitIfNeeded(request: Request) {
  const cookie = request.headers.get('Cookie')
  if (cookie && cookie.includes('token')) {
    return getMemoMyAccount(request).catch(console.error)
  }
  return Promise.resolve()
}

interface RequestConfig {
  params?: any
  headers?: HeadersInit
  signal?: AbortSignal
}

export class FetchError extends Error {
  constructor(public response: Response, public data: any) {
    super(`Fetch failed with status ${response.status}`)
  }
}

async function rejectIfNeeded(response: Response) {
  if (!response.ok) {
    const data = await response.json()
    throw new FetchError(response, data)
  }
  return response
}

type AsyncFn<T> = () => Promise<T>

/**
 * ensures cookie is set on request, and clears after making request.
 * @param fn
 * @param request
 * @param isAsync if true, cookie will clear after promise resolves
 * @returns
 */
export async function withCookie<T>(
  fn: AsyncFn<T>,
  request: Request,
  isAsync = false,
) {
  consumeCookie(request)
  const promise = fn()
  if (isAsync) {
    await promise
  }
  clearCookie()
  return promise
}

export const fetchClient = {
  baseUrl:
    (typeof window === 'undefined'
      ? process.env.API_BASE_URL
      : window.ENV?.API_BASE_URL) ?? 'http://localhost:8080',
  async get<T>(url: string, config: RequestConfig = {}) {
    const query = config?.params
      ? QueryString.stringify(config?.params, { addQueryPrefix: true })
      : ''
    const response = await fetch(this.baseUrl.concat(url, query), {
      method: 'GET',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        Cookie: _cookie,
        ...(config?.headers ?? {}),
      },
    })
    await rejectIfNeeded(response)
    const data: T = await response.json()
    const { headers } = response
    return {
      data,
      headers,
    }
  },
  async post<T>(url: string, body?: any, config: RequestConfig = {}) {
    const response = await fetch(this.baseUrl.concat(url), {
      method: 'POST',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      signal: config.signal,
      body: body ? JSON.stringify(body) : undefined,
    })
    await rejectIfNeeded(response)
    const data: T = await response.json()
    const { headers } = response
    return {
      data,
      headers,
    }
  },
  async patch<T>(url: string, body: any, config: RequestConfig = {}) {
    const response = await fetch(this.baseUrl.concat(url), {
      method: 'PATCH',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      signal: config.signal,
      body: JSON.stringify(body),
    })
    await rejectIfNeeded(response)

    const data: T = await response.json()
    const { headers } = response
    return {
      data,
      headers,
    }
  },
  async delete<T = any>(url: string, config: RequestConfig = {}) {
    const query = config?.params
      ? QueryString.stringify(config?.params, { addQueryPrefix: true })
      : ''

    const response = await fetch(this.baseUrl.concat(url, query), {
      method: 'DELETE',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      signal: config.signal,
    })

    await rejectIfNeeded(response)

    const data: T = response.headers.get('Content-Type')?.includes('json')
      ? await response.json()
      : ((await response.text()) as any)

    const { headers } = response
    return {
      data,
      headers,
    }
  },
}
