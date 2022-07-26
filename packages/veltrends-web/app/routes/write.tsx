import { type LoaderFunction, redirect } from '@remix-run/node'
import BasicLayout from '~/components/layouts/BasicLayout'
import { checkIsLoggedIn } from '~/lib/protectRoute'

export const loader: LoaderFunction = async ({ request }) => {
  const isLoggedIn = await checkIsLoggedIn(request)
  if (!isLoggedIn) return redirect('/login?next=/write')
  return null
}

function Write() {
  return <BasicLayout title="새 글 작성" hasBackButton></BasicLayout>
}

export default Write
