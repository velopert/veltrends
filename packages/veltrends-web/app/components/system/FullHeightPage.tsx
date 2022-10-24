import styled, { createGlobalStyle } from '@emotion/styled'

const GlobalFullHeight = createGlobalStyle`
  html, body {
    height: 100%;
  }
`

interface Props {
  children: React.ReactNode
}
function FullHeightPage({ children }: Props) {
  return (
    <>
      <Page>{children}</Page>
      <GlobalFullHeight />
    </>
  )
}

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export default FullHeightPage
