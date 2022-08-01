import BasicLayout from '../layouts/BasicLayout'
import Button from '../system/Button'

interface Props {
  onProceed(): void
}
function WriteLinkForm({ onProceed }: Props) {
  return (
    <BasicLayout title="링크 입력" hasBackButton>
      <Button onClick={onProceed}>다음</Button>
    </BasicLayout>
  )
}

export default WriteLinkForm
