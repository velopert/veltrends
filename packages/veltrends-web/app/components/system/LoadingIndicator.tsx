import styled from '@emotion/styled'
import { colors } from '~/lib/colors'
import { Spinner } from '../vectors'
import { keyframes } from '@emotion/react'

function LoadingIndicator({ color }: { color?: string }) {
  return <StyledSpinner color={color} />
}

const spin = keyframes`
 from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const StyledSpinner = styled(Spinner)<{ color?: string }>`
  width: 24px;
  height: 24px;
  display: block;
  animation: ${spin} 0.5s linear infinite;
  color: ${(props) => props.color ?? colors.gray3};
`

export default LoadingIndicator
