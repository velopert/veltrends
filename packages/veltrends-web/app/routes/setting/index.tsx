import styled from 'styled-components'
import { useLogout } from '~/hooks/useLogout'
import { colors } from '~/lib/colors'

function SettingIndex() {
  const logout = useLogout()

  return (
    <Block>
      <ListWrapper>
        <ListItem>내 계정</ListItem>
        <ListItem onClick={logout}>로그아웃</ListItem>
      </ListWrapper>
    </Block>
  )
}

const Block = styled.div`
  background: ${colors.gray0};
  flex: 1;
`

const ListWrapper = styled.div`
  div + div {
    border-top: 1px solid ${colors.gray0};
  }
`

const ListItem = styled.div`
  padding: 16px;
  background: white;
  &:active {
    opacity: 0.7;
  }
`

export default SettingIndex
