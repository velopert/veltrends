import { type LoaderFunction, redirect, type MetaFunction } from '@remix-run/cloudflare'
import { Outlet } from '@remix-run/react'
import TabLayout from '~/components/layouts/TabLayout'
import { checkIsLoggedIn } from '~/lib/protectRoute'

export const loader: LoaderFunction = async ({ request }) => {
  const isLoggedIn = await checkIsLoggedIn(request)
  if (!isLoggedIn) return redirect('/auth/login?next=/setting')
  return null
}

export const meta: MetaFunction = () => {
  return { title: '설정', robots: 'noindex' }
}

export default function Setting() {
  return <Outlet />
}
