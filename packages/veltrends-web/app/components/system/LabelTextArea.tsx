import { forwardRef, useState } from 'react'
import styled from '@emotion/styled'
import { colors } from '~/lib/colors'
import { css } from '@emotion/react'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

const LabelTextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, onBlur, onFocus, className, ...rest }: Props, ref) => {
    const [focused, setFocused] = useState(false)
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onFocus?.(e)
      setFocused(true)
    }
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur?.(e)
      setFocused(false)
    }

    return (
      <Block className={className}>
        <Label focused={focused}>{label}</Label>
        <StyledTextArea
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
          ref={ref}
        />
      </Block>
    )
  },
)

LabelTextArea.displayName = 'LabelTextArea'

const Label = styled.label<{ focused?: boolean }>`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray4};
  font-weight: 600;
  margin-bottom: 8px;
  transition: all 0.25s ease-in-out;
  ${(props) =>
    props.focused &&
    css`
      color: ${colors.primary};
    `}
`

const StyledTextArea = styled.textarea`
  border: 1px solid ${colors.gray2};
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  line-height: 1.5;
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

  word-break: keep-all;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

export default LabelTextArea
