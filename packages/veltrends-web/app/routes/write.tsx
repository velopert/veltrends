import BasicLayout from '~/components/layouts/BasicLayout'
import { useProtectedRoute } from '~/hooks/useProtectedRoute'

function Write() {
  const hasPermission = useProtectedRoute()
  if (!hasPermission) {
    return null
  }
  return <BasicLayout title="새 글 작성" hasBackButton></BasicLayout>
}

export default Write
