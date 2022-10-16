import { type LoaderFunction, redirect } from '@remix-run/cloudflare'
import { Outlet } from '@remix-run/react'
import { setupBaseUrl } from '~/lib/client'
import { checkIsLoggedIn } from '~/lib/protectRoute'

export const loader: LoaderFunction = async ({ request, context }) => {
  setupBaseUrl(context)
  const isLoggedIn = await checkIsLoggedIn(request)
  if (isLoggedIn) return redirect('/')
  return null
}

function Auth() {
  return <Outlet />
}

export default Auth
