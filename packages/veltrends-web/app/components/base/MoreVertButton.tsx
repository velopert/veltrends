import styled from '@emotion/styled'
import { colors } from '~/lib/colors'
import { MoreVert } from '../vectors'

interface Props {
  onClick(): void
}

function MoreVertButton({ onClick }: Props) {
  return (
    <StyledButton onClick={onClick}>
      <MoreVert />
    </StyledButton>
  )
}

const StyledButton = styled.button`
  margin-right: -8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray5};
  svg {
    width: 24px;
    height: 24px;
  }
`

export default MoreVertButton
