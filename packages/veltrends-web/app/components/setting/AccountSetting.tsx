import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { useUser } from '~/states/user'
import Button from '../system/Button'
import Input from '../system/Input'

function AccountSetting() {
  const user = useUser()
  if (!user) return null

  return (
    <Block>
      <div>
        <Section>
          <h4>아이디</h4>
          <Username>{user.username}</Username>
        </Section>
        <Section>
          <h4>비밀번호</h4>
          <InputGroup>
            <Input placeholder="현재 비밀번호" type="password" />
            <Input placeholder="새 비밀번호 비밀번호" type="password" />
          </InputGroup>
          <Button variant="secondary">비밀번호 변경</Button>
        </Section>
      </div>
      <div>
        <UnregisterButton>계정 탈퇴</UnregisterButton>
      </div>
    </Block>
  )
}

const Block = styled.div`
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
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
`

const UnregisterButton = styled.button`
  font-size: 16px;
  color: #f53e3e;
  text-decoration: underline;
`

export default AccountSetting
