import { useRef } from 'react'
import styled from '@emotion/styled'
import { useTabScrollTop } from '~/contexts/TabScrollTopContext'
import DesktopHeader from '../base/DesktopHeader'
import Footer from '../base/Footer'
import MobileHeader from '../base/MobileHeader'
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
  const ref = useRef<HTMLDivElement>(null)
  useTabScrollTop(ref)

  return (
    <FullHeightPage>
      {header ?? (
        <>
          <MobileHeader />
          <DesktopHeader />
        </>
      )}
      <Content className={className} ref={ref}>
        {children}
      </Content>
      <Footer />
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

export default TabLayout
