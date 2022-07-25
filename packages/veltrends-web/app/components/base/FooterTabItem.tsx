import { NavLink } from '@remix-run/react'
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
  to: string
}

function FooterTabItem({ icon, to }: Props) {
  const iconEl = React.createElement(iconMap[icon])
  return (
    <LinkItem
      to={to}
      className={({ isActive }) => {
        if (isActive) return 'active'
        return ''
      }}
    >
      {iconEl}
    </LinkItem>
  )
}

const sharedStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: ${colors.gray2};
    width: 32px;
    height: 32px;
  }
  &:active {
    svg {
      color: ${colors.primary};
    }
  }
`

const LinkItem = styled(NavLink)`
  ${sharedStyle}
  &.active {
    svg {
      color: ${colors.primary};
    }
  }
`

export default FooterTabItem
