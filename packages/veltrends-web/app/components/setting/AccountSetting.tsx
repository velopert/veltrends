import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { useUser } from '~/states/user'
import Button from '../system/Button'
import Input from '../system/Input'
import { changePassword, unregister } from '~/lib/api/me'
import { useDialog } from '~/contexts/DialogContext'
import { extractNextError } from '~/lib/nextError'
import { media } from '~/lib/media'

function AccountSetting() {
  const user = useUser()
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
  })
  const { open } = useDialog()

  const reset = () => {
    setForm({
      oldPassword: '',
      newPassword: '',
    })
  }

  const { mutate: mutateChangePassword } = useMutation(changePassword, {
    onSuccess: () => {
      open({
        title: '비밀번호 변경',
        description: '비밀번호가 변경되었습니다.',
      })
      reset()
    },
    onError: (e) => {
      const error = extractNextError(e)
      reset()
      if (error.name === 'BadRequest') {
        open({
          title: '실패',
          description: '8자 이상, 영문/숫자/특수문자 중 2가지 이상 입력해주세요.',
        })
      } else if (error.name === 'Forbidden') {
        open({
          title: '실패',
          description: '잘못된 비밀번호입니다.',
        })
      }
    },
  })

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const key = e.target.name
    const { value } = e.target
    setForm({ ...form, [key]: value })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    mutateChangePassword(form)
  }

  const askUnregister = () => {
    open({
      title: '회원 탈퇴',
      description: '정말로 탈퇴하시겠습니까?',
      mode: 'YESNO',
      cancelText: '취소',
      confirmText: '탈퇴',
      async onConfirm() {
        try {
          await unregister()
        } catch (e) {}
        window.location.href = '/'
      },
    })
  }

  if (!user) return null

  return (
    <Block>
      <div>
        <Title>내 계정</Title>
        <Section>
          <h4>아이디</h4>
          <Username>{user.username}</Username>
        </Section>
        <Section>
          <h4>비밀번호</h4>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Input
                name="oldPassword"
                placeholder="현재 비밀번호"
                type="password"
                onChange={onChange}
                value={form.oldPassword}
              />
              <Input
                name="newPassword"
                placeholder="새 비밀번호"
                type="password"
                onChange={onChange}
                value={form.newPassword}
              />
            </InputGroup>
            <Button variant="secondary" type="submit">
              비밀번호 변경
            </Button>
          </form>
        </Section>
      </div>
      <UnregisterWrapper>
        <UnregisterButton onClick={askUnregister}>계정 탈퇴</UnregisterButton>
      </UnregisterWrapper>
    </Block>
  )
}

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 32px;
  font-weight: 800;
  color: ${colors.gray5};
  font-size: 48px;
  line-height: 1.5;
`

const Block = styled.div`
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  ${media.mobile} {
    width: 100%;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    flex: initial;
    margin-top: 96px;
  }
`

const Section = styled.section`
  h4 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 16px;
    color: ${colors.gray3};
  }

  & + & {
    margin-top: 32px;
  }
`
const Username = styled.div`
  font-size: 16px;
  color: ${colors.gray5};
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  ${media.mobile} {
    width: 460px;
  }
`

const UnregisterButton = styled.button`
  font-size: 16px;
  color: #f53e3e;
  text-decoration: underline;
`

const UnregisterWrapper = styled.div`
  ${media.mobile} {
    margin-top: 96px;
  }
`

export default AccountSetting
