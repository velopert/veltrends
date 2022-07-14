import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { Logo } from './vectors'

interface Props {
  title?: React.ReactNode
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
}

function Header({ title = <Logo />, headerLeft, headerRight }: Props) {
  return (
    <Block>
      {headerLeft && <HeaderSide position="left">{headerLeft}</HeaderSide>}
      <Title>{title}</Title>
      {headerRight && <HeaderSide position="right">{headerLeft}</HeaderSide>}
    </Block>
  )
}

const Block = styled.header`
  position: relative;
  height: 56px;
  border-bottom: 1px solid ${colors.gray0};
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.div`
  color: ${colors.gray5};
  font-size: 18px;
  font-weight: 600;
  svg {
    width: 84px;
    height: 17px;
  }
`

const HeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${(props) => props.position}: 16px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`

export default Header
