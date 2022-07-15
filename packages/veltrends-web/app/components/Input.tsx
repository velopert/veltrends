import styled from 'styled-components'
import { colors } from '~/lib/colors'

export interface Props extends React.HTMLAttributes<HTMLInputElement> {}

function Input(props: Props) {
  return <StyledInput {...props} />
}

const StyledInput = styled.input`
  height: 48px;
  border: 1px solid ${colors.gray2};
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  color: ${colors.gray5};
  &:focus {
    border: 1px solid ${colors.primary};
  }
  &::placeholder {
    color: ${colors.gray2};
  }
`

export default Input
