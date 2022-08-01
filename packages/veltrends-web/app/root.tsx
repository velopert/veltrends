import { LoaderFunction, MetaFunction, redirect } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { PROTECTED_ROUTES } from './constants'
import { UserContext } from './contexts/UserContext'
import GlobalStyle from './GlobalStyle'
import { getMyAccount, type User } from './lib/api/auth'
import { setClientCookie } from './lib/client'
import { extractError } from './lib/error'

function extractPathNameFromUrl(url: string) {
  const { pathname } = new URL(url)
  return pathname
}

export const loader: LoaderFunction = async ({ request, context }) => {
  const cookie = request.headers.get('Cookie')

  /*
  const redirectIfNeeded = () => {
    const { pathname, search } = new URL(request.url)
    const isProtected = PROTECTED_ROUTES.some((route) => pathname.includes(route))
    if (isProtected) {
      return redirect('/login?next=' + encodeURIComponent(pathname + search))
    }
    return null
  }
  */

  if (!cookie) return null
  // if (!cookie) return redirectIfNeeded()
  setClientCookie(cookie)
  try {
    const me = await getMyAccount()
    console.log(me)
    return me
  } catch (e) {
    const error = extractError(e)
    if (error.name === 'UnauthorizedError') {
      // console.log(error.payload)
    }
    return null
    // return redirectIfNeeded()
  }
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  const data = useLoaderData<User | null>()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <GlobalStyle />
        <UserContext.Provider value={data}>
          <Outlet />
        </UserContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function CatchBoundary() {}
