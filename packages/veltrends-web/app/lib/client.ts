import axios from 'axios'

export const client = axios.create()
client.defaults.baseURL = 'http://localhost:4000'

export function setClientCookie(cookie: string) {
  client.defaults.headers.common['Cookie'] = cookie
}
