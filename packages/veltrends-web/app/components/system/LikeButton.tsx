import styled, { css } from 'styled-components'
import { colors } from '~/lib/colors'
import { HeartFill, HeartOutline } from '../vectors'
import { AnimatePresence, motion } from 'framer-motion'
import IconToggleButton from './IconToggleButton'

type Size = 'small' | 'medium'

interface Props {
  onClick?(): void
  isLiked?: boolean
  size?: Size
}

function LikeButton({ onClick, isLiked, size = 'medium' }: Props) {
  return (
    <IconToggleButton
      size={size}
      onClick={onClick}
      isActive={isLiked}
      activeIcon={<StyledHeartFill key="fill" />}
      inactiveIcon={<StyledHeartOutline key="outline" />}
    />
  )
}

const StyledHeartOutline = styled(HeartOutline)`
  color: ${colors.gray3};
`

const StyledHeartFill = styled(HeartFill)`
  color: ${colors.primary};
`

export default LikeButton
