import { useState } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '~/lib/colors'
import Input, { type Props as InputProps } from './Input'

interface Props extends InputProps {
  label: string
}

function LabelInput({ label, ...rest }: Props) {
  const [focused, setFocused] = useState(false)
  const onFocus = () => {
    setFocused(true)
  }
  const onBlur = () => {
    setFocused(false)
  }

  return (
    <Block>
      <Label focused={focused}>{label}</Label>
      <Input onFocus={onFocus} onBlur={onBlur} {...rest} />
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label<{ focused?: boolean }>`
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray4};
  font-weight: 600;
  margin-bottom: 8px;
  ${(props) =>
    props.focused &&
    css`
      color: ${colors.primary};
    `}
`

export default LabelInput
