import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { HeartFill, HeartOutline } from '../vectors'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  onClick(): void
  isLiked: boolean
}

function LikeButton({ onClick, isLiked }: Props) {
  return (
    <StyledButton onClick={onClick}>
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

const StyledButton = styled.div`
  padding: 0;
  border: none;
  outline: none;
  background: none;
  width: 24px;
  height: 24px;
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
