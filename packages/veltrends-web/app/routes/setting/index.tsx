import { Link } from '@remix-run/react'
import styled, { css } from '@emotion/styled'
import TabLayout from '~/components/layouts/TabLayout'
import { useLogout } from '~/hooks/useLogout'
import { colors } from '~/lib/colors'

function SettingIndex() {
  const logout = useLogout()

  return (
    <TabLayout>
      <Block>
        <ListWrapper>
          <ListItemLink to="/setting/account">내 계정</ListItemLink>
          <ListItem onClick={logout}>로그아웃</ListItem>
        </ListWrapper>
      </Block>
    </TabLayout>
  )
}

const Block = styled.div`
  background: ${colors.gray0};
  flex: 1;
`

const ListWrapper = styled.div`
  * + div {
    border-top: 1px solid ${colors.gray0};
  }
`

const listItemStyle = css`
  padding: 16px;
  color: ${colors.gray5};
  background: white;
  &:active {
    opacity: 0.7;
  }
`

const ListItem = styled.div`
  ${listItemStyle}
`

const ListItemLink = styled(Link)`
  ${listItemStyle}
  display: block;
  text-decoration: none;
`

export default SettingIndex
