import styled from 'styled-components'
import { colors } from '~/lib/colors'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

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
  transition: all 0.25s ease-in-out;
  &:focus {
    border: 1px solid ${colors.primary};
  }
  &::placeholder {
    color: ${colors.gray2};
  }
  &:disabled {
    background: ${colors.gray0};
    color: ${colors.gray3};
  }
`

export default Input
