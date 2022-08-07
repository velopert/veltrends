export function parseUrlParams<T>(url: string) {
  const params = new URLSearchParams(new URL(url).searchParams)
  const result = {} as any
  for (const [key, value] of params) {
    result[key] = value
  }
  return result as T
}
