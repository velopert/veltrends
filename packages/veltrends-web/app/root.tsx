import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node'
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
import { decode } from 'js-base64'
import { useRef } from 'react'
import { SangteProvider } from 'sangte'
import GlobalStyle from './GlobalStyle'
import Core from './components/base/Core'
import GlobalBottomSheetModal from './components/base/GlobalBottomSheetModal'
import GlobalDialog from './components/base/GlobalDialog'
import { TabScrollTopContextProvider } from './contexts/TabScrollTopContext'
import { TokenRefreshProvider } from './contexts/TokenRefreshContext'
import { type User } from './lib/api/types'
import { withCookie } from './lib/client'
import { getCanonical } from './lib/getCanonical'
import { getMemoMyAccount } from './lib/protectRoute'
import { userState } from './states/user'
import './styles.css'

interface LoaderResult {
  user: User | null
  canonical: string | null
  tokenRemainingTime?: number
  env: {
    API_BASE_URL: string
  }
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
    API_BASE_URL: process.env.API_BASE_URL,
  }

  if (!cookie) return json({ user: null, env })
  // if (!cookie) return redirectIfNeeded()

  try {
    const accessToken = extractAccessToken(cookie)!

    const {
      me,
      headers,
      accessToken: refreshedAccessToken,
    } = await withCookie(() => getMemoMyAccount(request), request, true)

    return json(
      {
        user: me,
        env,
        canonical,
        tokenRemainingTime: getTokenRemainingTime(
          accessToken ?? refreshedAccessToken,
        ),
      },
      headers ? { headers } : undefined,
    )
  } catch (e) {
    console.log({ e })
    return json({ user: null, env, canonical })
    // return redirectIfNeeded()
  }
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Veltrends',
  viewport: 'width=device-width,initial-scale=1',
  'og:image': 'https://veltrends.com/og-image.png',
})

export default function App() {
  const { user, canonical, tokenRemainingTime, env } =
    useLoaderData<LoaderResult>()

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
    <html lang="ko">
      <head>
        <Meta />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff"></meta>

        {canonical ? (
          <link
            rel="canonical"
            href={'https://www.veltrends.com'.concat(canonical)}
          />
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
              <TabScrollTopContextProvider>
                <Outlet />
              </TabScrollTopContextProvider>
              <GlobalDialog />
              <GlobalBottomSheetModal />
            </QueryClientProvider>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
            <Core remainingTime={tokenRemainingTime} />
          </SangteProvider>
        </TokenRefreshProvider>
      </body>
    </html>
  )
}
