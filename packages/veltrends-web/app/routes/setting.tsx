import { type LoaderFunction, redirect, type MetaFunction } from '@remix-run/cloudflare'
import { Outlet } from '@remix-run/react'
import TabLayout from '~/components/layouts/TabLayout'
import { setupBaseUrl } from '~/lib/client'
import { checkIsLoggedIn } from '~/lib/protectRoute'

export const loader: LoaderFunction = async ({ request, context }) => {
  setupBaseUrl(context)
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
