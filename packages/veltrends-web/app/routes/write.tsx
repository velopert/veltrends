import { type LoaderFunction, redirect } from '@remix-run/node'
import BasicLayout from '~/components/layouts/BasicLayout'

function Write() {
  return <BasicLayout title="새 글 작성" hasBackButton></BasicLayout>
}

export default Write
