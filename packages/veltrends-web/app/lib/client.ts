import axios from 'axios'
import QueryString from 'qs'

let _cookie = ''

export const client = axios.create()
client.defaults.baseURL = 'http://localhost:8080'
client.defaults.withCredentials = true

export function setClientCookie(cookie: string) {
  client.defaults.headers.common['Cookie'] = cookie
  _cookie = cookie
}

interface RequestConfig {
  params?: any
  headers?: HeadersInit
  signal?: AbortSignal
}

export const fetchClient = {
  baseUrl: 'http://localhost:8080',
  async get<T>(url: string, config: RequestConfig = {}) {
    const query = config?.params
      ? QueryString.stringify(config?.params, { addQueryPrefix: true })
      : ''
    const response = await fetch(this.baseUrl.concat(url, query), {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: _cookie,
        ...(config?.headers ?? {}),
      },
    })
    const data: T = await response.json()
    const { headers } = response
    return {
      data,
      headers,
    }
  },
  async post<T>(url: string, body: any, config: RequestConfig = {}) {
    const response = await fetch(this.baseUrl.concat(url), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      signal: config.signal,
      body: JSON.stringify(body),
    })

    const responseData: T = await response.json()
    const { headers } = response
    return {
      data: responseData,
      headers,
    }
  },
}
