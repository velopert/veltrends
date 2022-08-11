import styled from 'styled-components'
import { colors } from '~/lib/colors'
import { HeartFill, HeartOutline } from '../vectors'

interface Props {
  onClick(): void
  isLiked: boolean
}

function LikeButton({ onClick, isLiked }: Props) {
  return (
    <StyledButton onClick={onClick}>
      {isLiked ? <StyledHeartFill /> : <StyledHeartOutline />}
    </StyledButton>
  )
}

const StyledButton = styled.div`
  padding: 0;
  border: none;
  outline: none;
  background: none;
`

const StyledHeartOutline = styled(HeartOutline)`
  color: ${colors.gray3};
`

const StyledHeartFill = styled(HeartFill)`
  color: ${colors.primary};
`

export default LikeButton
