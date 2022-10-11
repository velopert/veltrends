export function getCanonical(request: Request): string | null {
  const url = new URL(request.url)
  if (url.pathname === '/' && url.search === '?mode=trending') {
    return '/'
  }
  return null
}
