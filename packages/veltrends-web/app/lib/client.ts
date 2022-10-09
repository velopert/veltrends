import QueryString from 'qs'

let _cookie = ''

export function setClientCookie(cookie: string) {
  _cookie = cookie
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

export const fetchClient = {
  baseUrl:
    typeof window === 'undefined'
      ? 'http://localhost:8080'
      : window.ENV?.API_BASE_URL ?? 'http://localhost:8080',
  async get<T>(url: string, config: RequestConfig = {}) {
    const query = config?.params
      ? QueryString.stringify(config?.params, { addQueryPrefix: true })
      : ''
    const response = await fetch(this.baseUrl.concat(url, query), {
      method: 'GET',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        'Content-Type': 'application/json',
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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
  async delete<T>(url: string, config: RequestConfig = {}) {
    const response = await fetch(this.baseUrl.concat(url), {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      signal: config.signal,
    })

    await rejectIfNeeded(response)

    const data: T = await response.json()
    const { headers } = response
    return {
      data,
      headers,
    }
  },
}
