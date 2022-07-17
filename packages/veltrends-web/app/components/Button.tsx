import styled, { css } from 'styled-components'
import { colors } from '~/lib/colors'

interface ButtonProps {
  layoutMode?: 'inline' | 'fullWidth'
}
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {}

function Button({ layoutMode = 'inline', ...rest }: Props) {
  return <StyledButton layoutMode={layoutMode} {...rest} />
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  background: ${colors.primary};
  border: none;
  color: white;
  height: 48px;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  font-weight: 600;
  border-radius: 4px;
  transition: filter 0.25s ease-in-out;

  &:disabled {
    filter: grayscale(0.6);
  }

  ${(props) =>
    props.layoutMode === 'fullWidth' &&
    css`
      width: 100%;
    `}
`

export default Button
