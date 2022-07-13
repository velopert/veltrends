import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { Logo } from './vectors'

function Header() {
  return (
    <Block>
      <Logo />
    </Block>
  )
}

const Block = styled.header`
  height: 56px;
  border-bottom: 1px solid ${colors.gray0};
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 84px;
    height: 17px;
  }
`

export default Header
