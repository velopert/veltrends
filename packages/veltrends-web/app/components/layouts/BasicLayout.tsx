import styled from 'styled-components'
import { useGoBack } from '~/hooks/useGoBack'
import MobileHeader from '../base/MobileHeader'
import HeaderBackButton from '../base/HeaderBackButton'
import FullHeightPage from '../system/FullHeightPage'

interface Props {
  hasBackButton?: boolean
  title?: React.ReactNode
  children?: React.ReactNode
  headerRight?: React.ReactNode
  onGoBack?(): void
}
function BasicLayout({ hasBackButton, title, children, onGoBack, headerRight }: Props) {
  const goBack = useGoBack()

  return (
    <FullHeightPage>
      <MobileHeader
        title={title}
        headerLeft={hasBackButton ? <HeaderBackButton onClick={onGoBack ?? goBack} /> : undefined}
        headerRight={headerRight}
      />
      <Content>{children}</Content>
    </FullHeightPage>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`

export default BasicLayout
