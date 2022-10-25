import styled from '@emotion/styled'
import { colors } from '~/lib/colors'
import { media } from '~/lib/media'
import { Logo } from '../vectors'

interface Props {
  title?: React.ReactNode
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
  className?: string
}

function MobileHeader({
  title = <StyledLogo />,
  headerLeft,
  headerRight,
  className,
}: Props) {
  return (
    <Block className={className}>
      {headerLeft && <HeaderSide position="left">{headerLeft}</HeaderSide>}
      <Title className="title">{title}</Title>
      {headerRight && <HeaderSide position="right">{headerRight}</HeaderSide>}
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
  ${media.mobile} {
    display: none;
  }
`

const StyledLogo = styled(Logo)`
  display: block;
  width: 84px;
  height: 17px;
`

const Title = styled.div`
  color: ${colors.gray5};
  font-size: 18px;
  font-weight: 600;
`

const HeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${(props) => props.position}: 16px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`

export default MobileHeader
