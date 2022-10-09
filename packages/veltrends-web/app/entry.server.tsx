import type { EntryContext } from '@remix-run/cloudflare'
import { RemixServer } from '@remix-run/react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { clearCookie } from './lib/client'

let counter = 1

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const sheet = new ServerStyleSheet()

  let markup = renderToString(
    sheet.collectStyles(<RemixServer context={remixContext} url={request.url} />),
  )

  const styles = sheet.getStyleTags()
  markup = markup.replace('__STYLES__', styles)

  responseHeaders.set('Content-Type', 'text/html')
  responseHeaders.set('x-counter', counter.toString())
  counter += 1

  clearCookie()

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
