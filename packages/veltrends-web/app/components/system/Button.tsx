import { Link } from '@remix-run/react'
import { forwardRef } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '~/lib/colors'
import { hover } from '~/lib/styles'

interface ButtonProps {
  size?: 'small' | 'medium'
  layoutMode?: 'inline' | 'fullWidth'
  variant?: 'primary' | 'secondary' | 'text'
}
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {
  to?: string
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ layoutMode = 'inline', variant = 'primary', size = 'medium', to, ...rest }, ref) => {
    if (to) {
      return (
        <StyledLink
          layoutMode={layoutMode}
          variant={variant}
          size={size}
          to={to}
          className={rest.className}
          style={rest.style}
          ref={ref as any}
        >
          {rest.children}
        </StyledLink>
      )
    }
    return (
      <StyledButton layoutMode={layoutMode} variant={variant} size={size} ref={ref} {...rest} />
    )
  },
)

Button.displayName = 'Button'

const variantStyles = {
  primary: css`
    background: ${colors.primary};
    color: white;
    ${hover(css`
      opacity: 0.875;
    `)}
  `,
  secondary: css`
    background: ${colors.secondary};
    color: ${colors.secondaryButtonText};
    ${hover(css`
      opacity: 0.875;
    `)}
  `,
  text: css`
    background: transparent;
    color: ${colors.gray4};
    ${hover(`background: ${colors.gray0};`)}
  `,
  /** @todo: destructive */
}

const sizeStyles = {
  small: css`
    height: 36px;
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
  `,
  medium: css`
    height: 48px;
    font-size: 16px;
    padding-left: 16px;
    padding-right: 16px;
  `,
}

const sharedStyles = css<ButtonProps>`
  display: flex;
  ${(props) => variantStyles[props.variant!]}
  ${(props) => sizeStyles[props.size!]}
  border: none;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 4px;
  transition: filter 0.25s ease-in-out;
  cursor: pointer;

  &:disabled {
    filter: grayscale(0.6);
  }

  ${(props) =>
    props.layoutMode === 'fullWidth' &&
    css`
      width: 100%;
    `}
`

const StyledButton = styled.button<ButtonProps>`
  ${sharedStyles}
`

const StyledLink = styled(Link)<ButtonProps>`
  ${sharedStyles}
  text-decoration: none;
`

export default Button
