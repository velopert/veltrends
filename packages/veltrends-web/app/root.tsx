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
import GlobalBottomSheetModal from './components/system/GlobalBottomSheetModal'
import { DialogProvider } from './contexts/DialogContext'
import GlobalStyle from './GlobalStyle'
import { type User } from './lib/api/types'
import { fetchClient, setClientCookie } from './lib/client'
import { SangteProvider } from 'sangte'
import { userState } from './states/user'
import { getMemoMyAccount } from './lib/protectRoute'
import { useEffect } from 'react'

// function extractPathNameFromUrl(url: string) {
//   const { pathname } = new URL(url)
//   return pathname
// }

interface LoaderResult {
  user: User | null
  env: {
    API_BASE_URL: string
  }
}

export const loader: LoaderFunction = async ({ request, context }) => {
  fetchClient.baseUrl = (context.API_BASE_URL as string) ?? 'http://localhost:8080'
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
  const env = {
    API_BASE_URL: context.API_BASE_URL,
  }
  try {
    const { me, headers } = await getMemoMyAccount()
    return json(
      {
        user: me,
        env,
      },
      headers ? { headers } : undefined,
    )
  } catch (e) {
    return json({ user: null, env })
    // return redirectIfNeeded()
  }
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5,
    },
  },
})

export default function App() {
  const { user, env } = useLoaderData<LoaderResult>()

  return (
    <html lang="en">
      <head>
        <Meta />
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
        <SangteProvider
          initialize={({ set }) => {
            set(userState, user)
          }}
        >
          <GlobalStyle />
          <QueryClientProvider client={queryClient}>
            <DialogProvider>
              <Outlet />
            </DialogProvider>
            <GlobalBottomSheetModal />
          </QueryClientProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </SangteProvider>
      </body>
    </html>
  )
}

export function CatchBoundary() {}
