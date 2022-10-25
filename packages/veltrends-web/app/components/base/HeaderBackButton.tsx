import styled from '@emotion/styled'
import { ArrowLeft } from '../vectors'

interface Props {
  onClick?: () => void
}

function HeaderBackButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <ArrowLeft />
    </IconButton>
  )
}

const IconButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: -8px;
`

export default HeaderBackButton
