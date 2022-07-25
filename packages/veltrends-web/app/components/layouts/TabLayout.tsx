import styled from 'styled-components'
import Footer from '../base/Footer'
import Header from '../base/Header'
import FullHeightPage from '../system/FullHeightPage'

interface Props {
  children?: React.ReactNode
}

/**
 * Shows content with a header and a tab bar
 */
function TabLayout({ children }: Props) {
  return (
    <FullHeightPage>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </FullHeightPage>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export default TabLayout
