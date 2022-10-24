import { AnimatePresence, motion } from 'framer-motion'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface Props {
  inactiveIcon: React.ReactNode
  activeIcon: React.ReactNode
  isActive?: boolean
  onClick?(): void
  size?: Size
}

type Size = 'small' | 'medium'

function IconToggleButton({
  isActive,
  inactiveIcon,
  activeIcon,
  onClick,
  size = 'medium',
}: Props) {
  return (
    <StyledButton onClick={onClick} size={size}>
      <AnimatePresence initial={false}>
        {isActive ? (
          <SvgWrapper
            key="fill"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {activeIcon}
          </SvgWrapper>
        ) : (
          <SvgWrapper
            key="outline"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {inactiveIcon}
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

export default IconToggleButton
