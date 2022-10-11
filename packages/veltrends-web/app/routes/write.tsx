import { type LoaderFunction, redirect, MetaFunction } from '@remix-run/cloudflare'
import { Outlet } from '@remix-run/react'
import { SangteProvider } from 'sangte'
import { checkIsLoggedIn } from '~/lib/protectRoute'

export const loader: LoaderFunction = async ({ request }) => {
  const isLoggedIn = await checkIsLoggedIn(request)
  if (!isLoggedIn) return redirect('/auth/login?next=/write')
  return null
}

export const meta: MetaFunction = () => {
  return { title: '새 글 작성', robots: 'noindex' }
}

function Write() {
  return (
    <SangteProvider>
      <Outlet />
    </SangteProvider>
  )
}

export default Write
