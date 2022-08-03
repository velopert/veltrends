import styled from 'styled-components'
import BasicLayout from '~/components/layouts/BasicLayout'
import LabelInput from '~/components/system/LabelInput'
import LabelTextArea from '~/components/system/LabelTextArea'
import WriteFormTemplate from '~/components/write/WriteFormTemplate'

function Intro() {
  return (
    <BasicLayout title="뉴스 소개" hasBackButton>
      <WriteFormTemplate
        description="공유할 뉴스를 소개하세요."
        buttonText="등록하기"
        onSubmit={(e) => {
          const formData = new FormData(e.currentTarget)
          const title = formData.get('title') as string
          const body = formData.get('body') as string
          console.log(title, body)
          e.preventDefault()
        }}
      >
        <Group>
          <LabelInput label="제목" name="title" />
          <StyledLabelTextArea label="내용" name="body" />
        </Group>
      </WriteFormTemplate>
    </BasicLayout>
  )
}

const Group = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  padding-bottom: 16px;
`

const StyledLabelTextArea = styled(LabelTextArea)`
  flex: 1;
  textarea {
    flex: 1;
    resize: none;
    font-family: inherit;
  }
`

export default Intro
