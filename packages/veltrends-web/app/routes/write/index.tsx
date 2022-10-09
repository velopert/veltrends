import { useNavigate } from '@remix-run/react'
import BasicLayout from '~/components/layouts/BasicLayout'
import LabelInput from '~/components/system/LabelInput'
import WriteFormTemplate from '~/components/write/WriteFormTemplate'
import { useWriteActions, useWriteValue } from '~/states/write'

function WriteLink() {
  const navigate = useNavigate()
  const state = useWriteValue()
  const actions = useWriteActions()

  return (
    <BasicLayout title="링크 입력" hasBackButton>
      <WriteFormTemplate
        description="공유하고 싶은 URL을 입력하세요."
        buttonText="다음"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/write/intro')
        }}
      >
        <LabelInput
          label="URL"
          placeholder="https://example.com"
          value={state.form.link}
          onChange={(e) => {
            actions.change('link', e.target.value)
          }}
          errorMessage={state.error?.statusCode === 422 ? '유효하지 않은 URL입니다.' : undefined}
        />
      </WriteFormTemplate>
      {/* <Button onClick={() => navigate('/write/intro')}>다음</Button> */}
    </BasicLayout>
  )
}

export default WriteLink
