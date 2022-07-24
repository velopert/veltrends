import styled from 'styled-components'
import Footer from '~/components/base/Footer'
import Header from '~/components/base/Header'
import FullHeightPage from '~/components/system/FullHeightPage'

export default function Search() {
  return (
    <FullHeightPage>
      <Header />
      <Content />
      <Footer />
    </FullHeightPage>
  )
}

const Content = styled.div`
  flex: 1;
`
