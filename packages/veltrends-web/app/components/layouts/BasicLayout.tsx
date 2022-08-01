import styled from 'styled-components'
import { useGoBack } from '~/hooks/useGoBack'
import Header from '../base/Header'
import HeaderBackButton from '../base/HeaderBackButton'
import FullHeightPage from '../system/FullHeightPage'

interface Props {
  hasBackButton?: boolean
  title?: string
  children?: React.ReactNode
  onGoBack?(): void
}
function BasicLayout({ hasBackButton, title, children, onGoBack }: Props) {
  const goBack = useGoBack()

  return (
    <FullHeightPage>
      <Header
        title={title}
        headerLeft={hasBackButton ? <HeaderBackButton onClick={onGoBack ?? goBack} /> : undefined}
      />
      <Content>{children}</Content>
    </FullHeightPage>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export default BasicLayout
