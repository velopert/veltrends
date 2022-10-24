import styled from '@emotion/styled'
import { useGoBack } from '~/hooks/useGoBack'
import MobileHeader from '../base/MobileHeader'
import HeaderBackButton from '../base/HeaderBackButton'
import FullHeightPage from '../system/FullHeightPage'
import DesktopHeader from '../base/DesktopHeader'

interface Props {
  hasBackButton?: boolean
  title?: React.ReactNode
  children?: React.ReactNode
  headerRight?: React.ReactNode
  onGoBack?(): void
  desktopHeaderVisible?: boolean
}
function BasicLayout({
  hasBackButton,
  title,
  children,
  onGoBack,
  headerRight,
  desktopHeaderVisible = true,
}: Props) {
  const goBack = useGoBack()

  return (
    <FullHeightPage>
      <MobileHeader
        title={title}
        headerLeft={
          hasBackButton ? (
            <HeaderBackButton onClick={onGoBack ?? goBack} />
          ) : undefined
        }
        headerRight={headerRight}
      />
      {desktopHeaderVisible ? <DesktopHeader /> : null}
      <Content>{children}</Content>
    </FullHeightPage>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  overflow-x: hidden;
`

export default BasicLayout
