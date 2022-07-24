import { useMemo } from 'react'
import { useLocation, useMatch } from 'react-router'
import styled from 'styled-components'
import { colors } from '~/lib/colors'
import FooterTabItem from './FooterTabItem'

const paths = ['search', 'bookmark', 'setting'] as const
function isValidPath(path: any): path is typeof paths[number] {
  return paths.includes(path)
}

function Footer() {
  const location = useLocation()

  const currentPage = useMemo(() => {
    const path = location.pathname.split('/')[1]
    if (isValidPath(path)) {
      return path
    }
    return 'home'
  }, [location.pathname])

  return (
    <StyledFooter>
      <FooterTabItem icon="home" isActive={currentPage === 'home'} to="/" />
      <FooterTabItem icon="search" isActive={currentPage === 'search'} to="/search" />
      <FooterTabItem icon="plus-circle" />
      <FooterTabItem icon="bookmark" isActive={currentPage === 'bookmark'} to="/bookmark" />
      <FooterTabItem icon="setting" isActive={currentPage === 'setting'} to="/setting" />
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  height: 56px;
  border-top: 1px solid ${colors.gray0};
  display: flex;
`

export default Footer
