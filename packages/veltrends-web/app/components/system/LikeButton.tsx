import styled, { css } from 'styled-components'
import { colors } from '~/lib/colors'
import { HeartFill, HeartOutline } from '../vectors'
import { AnimatePresence, motion } from 'framer-motion'

type Size = 'small' | 'medium'

interface Props {
  onClick?(): void
  isLiked?: boolean
  size?: Size
}

function LikeButton({ onClick, isLiked, size = 'medium' }: Props) {
  return (
    <StyledButton onClick={onClick} size={size}>
      <AnimatePresence initial={false}>
        {isLiked ? (
          <SvgWrapper key="fill" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <StyledHeartFill key="fill" />
          </SvgWrapper>
        ) : (
          <SvgWrapper
            key="outline"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <StyledHeartOutline key="outline" />
          </SvgWrapper>
        )}
      </AnimatePresence>
    </StyledButton>
  )
}

const StyledButton = styled.button<{ size: Size }>`
  padding: 0;
  border: none;
  outline: none;
  background: none;
  display: inline-flex;
  ${(props) =>
    props.size === 'medium' &&
    css`
      width: 24px;
      height: 24px;
    `}

  ${(props) =>
    props.size === 'small' &&
    css`
      width: 16px;
      height: 16px;
    `}

  svg {
    width: 100%;
    height: 100%;
  }
  position: relative;
`

const SvgWrapper = styled(motion.span)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

const StyledHeartOutline = styled(HeartOutline)`
  color: ${colors.gray3};
`

const StyledHeartFill = styled(HeartFill)`
  color: ${colors.primary};
`

export default LikeButton
