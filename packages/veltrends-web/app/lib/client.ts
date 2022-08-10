import axios from 'axios'

export const client = axios.create()
client.defaults.baseURL = 'http://localhost:4000'
client.defaults.withCredentials = true

export function setClientCookie(cookie: string) {
  client.defaults.headers.common['Cookie'] = cookie
}
