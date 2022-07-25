import styled from 'styled-components'
import Footer from '../base/Footer'
import Header from '../base/Header'
import FullHeightPage from '../system/FullHeightPage'

interface Props {
  children?: React.ReactNode
}

function TabTemplate({ children }: Props) {
  return (
    <FullHeightPage>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </FullHeightPage>
  )
}

const Content = styled.div`
  flex: 1;
`

export default TabTemplate
