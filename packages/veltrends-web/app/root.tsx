import './styles.css'
import { json, type LoaderFunction, type MetaFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GlobalBottomSheetModal from './components/base/GlobalBottomSheetModal'
import GlobalStyle from './GlobalStyle'
import { type User } from './lib/api/types'
import { fetchClient, setClientCookie } from './lib/client'
import { SangteProvider } from 'sangte'
import { userState } from './states/user'
import { getMemoMyAccount } from './lib/protectRoute'
import { useEffect, useRef } from 'react'
import GlobalDialog from './components/base/GlobalDialog'
import { getCanonical } from './lib/getCanonical'
import { decode } from 'js-base64'
import { TokenRefreshProvider, useTokenRefreshScheduler } from './contexts/TokenRefreshContext'
import Core from './components/base/Core'

// function extractPathNameFromUrl(url: string) {
//   const { pathname } = new URL(url)
//   return pathname
// }

interface LoaderResult {
  user: User | null
  env: {
    API_BASE_URL: string
  }
  canonical: string | null
  tokenRemainingTime?: number
}

function extractAccessToken(cookie: string) {
  const match = cookie.match(/access_token=([^;]+)/)
  return match ? match[1] : null
}

function getTokenRemainingTime(token: string) {
  const decoded = decode(token.split('.')[1])
  const { exp } = JSON.parse(decoded)

  return exp * 1000 - Date.now()
}

export const loader: LoaderFunction = async ({ request, context }) => {
  fetchClient.baseUrl = (context.API_BASE_URL as string) ?? 'http://localhost:8080'
  const cookie = request.headers.get('Cookie')
  const canonical = getCanonical(request)

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
  const env = {
    API_BASE_URL: context.API_BASE_URL,
  }

  if (!cookie) return json({ user: null, env })
  // if (!cookie) return redirectIfNeeded()
  setClientCookie(cookie)

  try {
    const accessToken = extractAccessToken(cookie)!

    const { me, headers } = await getMemoMyAccount(request)
    return json(
      {
        user: me,
        env,
        canonical,
        tokenRemainingTime: getTokenRemainingTime(accessToken),
      },
      headers ? { headers } : undefined,
    )
  } catch (e) {
    return json({ user: null, env, canonical })
    // return redirectIfNeeded()
  }
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Veltrends',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  const { user, env, canonical, tokenRemainingTime } = useLoaderData<LoaderResult>()

  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 5,
        },
      },
    }),
  ).current

  return (
    <html lang="en">
      <head>
        <Meta />
        {canonical ? (
          <link rel="canonical" href={'https://veltrends.com'.concat(canonical)} />
        ) : null}
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.ENV = ${JSON.stringify(env)}
          `,
          }}
        />
        <TokenRefreshProvider>
          <SangteProvider
            initialize={({ set }) => {
              set(userState, user)
            }}
          >
            <GlobalStyle />
            <QueryClientProvider client={queryClient}>
              <Outlet />
              <GlobalDialog />
              <GlobalBottomSheetModal />
            </QueryClientProvider>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </SangteProvider>
          <Core remainingTime={tokenRemainingTime} />
        </TokenRefreshProvider>
      </body>
    </html>
  )
}

export function CatchBoundary() {}
