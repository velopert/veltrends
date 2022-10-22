import { type LoaderFunction, redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { checkIsLoggedIn } from '~/lib/protectRoute'

export const loader: LoaderFunction = async ({ request }) => {
  const isLoggedIn = await checkIsLoggedIn(request)
  if (isLoggedIn) return redirect('/')
  return null
}

function Auth() {
  return <Outlet />
}

export default Auth
