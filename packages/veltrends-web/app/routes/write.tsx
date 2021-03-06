import { type LoaderFunction, redirect } from '@remix-run/node'
import BasicLayout from '~/components/layouts/BasicLayout'
import { checkIsLoggedIn } from '~/lib/protectRoute'

export const loader: LoaderFunction = async ({ request }) => {
  const isLoggedIn = await checkIsLoggedIn(request)
  if (!isLoggedIn) return redirect('/login?next=/write')
  return null
}

function Write() {
  return <BasicLayout title="μ κΈ μμ±" hasBackButton></BasicLayout>
}

export default Write
