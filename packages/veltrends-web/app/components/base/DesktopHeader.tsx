import { Link } from '@remix-run/react'
import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { media } from '~/lib/media'
import Button from '../system/Button'
import { Logo } from '../vectors'
import SearchArea from './SearchArea'

function DesktopHeader() {
  return (
    <Block>
      <HomeLink to="/">
        <StyledLogo />
      </HomeLink>
      <Content>
        <Addon></Addon>
        <Addon>
          <SearchArea />
          <Buttons>
            <Button variant="text" size="small">
              로그인
            </Button>
            <Button size="small">회원가입</Button>
          </Buttons>
        </Addon>
      </Content>
    </Block>
  )
}

const Block = styled.div`
  height: 64px;
  border-bottom: 1px solid ${colors.gray0};
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  display: none;
  ${media.mobile} {
    display: flex;
  }
`

const StyledLogo = styled(Logo)`
  display: block;
  width: 84px;
  height: 17px;
  width: auto;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Addon = styled.div`
  display: flex;
  align-items: center;
`

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`

const HomeLink = styled(Link)`
  display: block;
  color: inherit;
`

export default DesktopHeader
