import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { colors } from '~/lib/colors'
import { Bookmark, Home, PlusCircle, Search, Setting } from '../vectors'

const iconMap = {
  home: Home,
  search: Search,
  'plus-circle': PlusCircle,
  bookmark: Bookmark,
  setting: Setting,
}

interface Props {
  icon: keyof typeof iconMap
  isActive?: boolean
  to?: string
}

function FooterTabItem({ icon, to, isActive }: Props) {
  const iconEl = React.createElement(iconMap[icon])
  if (to) {
    return (
      <LinkItem to={to} $isActive={isActive}>
        {iconEl}
      </LinkItem>
    )
  }
  return <ButtonItem $isActive={isActive}>{iconEl}</ButtonItem>
}

const sharedStyle = (isActive?: boolean) => css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: ${colors.gray2};
    width: 32px;
    height: 32px;
    ${isActive &&
    css`
      color: ${colors.primary};
    `}
  }
`

const LinkItem = styled(Link)<{ $isActive?: boolean }>`
  ${(props) => sharedStyle(props.$isActive)}
`

const ButtonItem = styled.button<{ $isActive?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  outline: none;
  border: none;
  svg {
    color: ${colors.gray2};
    width: 32px;
    height: 32px;
    ${(props) =>
      props.$isActive &&
      css`
        color: ${colors.primary};
      `}
  }
`

export default FooterTabItem
