import styled from 'styled-components'
import Footer from '../base/Footer'
import Header from '../base/Header'
import FullHeightPage from '../system/FullHeightPage'

interface Props {
  children?: React.ReactNode
  className?: string
  header?: React.ReactNode
}

/**
 * Shows content with a header and a tab bar
 */
function TabLayout({ header, children, className }: Props) {
  return (
    <FullHeightPage>
      {header ?? <Header />}
      <Content className={className}>{children}</Content>
      <Footer />
    </FullHeightPage>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
`

export default TabLayout
