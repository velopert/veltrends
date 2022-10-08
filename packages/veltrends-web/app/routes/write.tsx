import { type LoaderFunction, redirect } from '@remix-run/cloudflare'
import { Outlet } from '@remix-run/react'
import { WriteProvider } from '~/contexts/WriteContext'
import { checkIsLoggedIn } from '~/lib/protectRoute'

export const loader: LoaderFunction = async ({ request }) => {
  const isLoggedIn = await checkIsLoggedIn(request)
  if (!isLoggedIn) return redirect('/auth/login?next=/write')
  return null
}

function Write() {
  return (
    <WriteProvider>
      <Outlet />
    </WriteProvider>
  )
}

export default Write
