import { useMutation } from '@tanstack/react-query'
import BasicLayout from '~/components/layouts/BasicLayout'
import AccountSetting from '~/components/setting/AccountSetting'

function Account() {
  return (
    <BasicLayout title="내 계정" hasBackButton>
      <AccountSetting />
    </BasicLayout>
  )
}

export default Account
