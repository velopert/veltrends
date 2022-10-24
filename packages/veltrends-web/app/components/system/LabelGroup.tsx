import { useCallback, useState } from 'react'
import styled, { css } from '@emotion/styled'
import { colors } from '~/lib/colors'

interface Props {
  children:
    | React.ReactNode
    | (({
        onFocus,
        onBlur,
      }: {
        onFocus: () => void
        onBlur: () => void
      }) => React.ReactNode)
  className?: string
  label: string
}

/**
 * Shows label above children
 */
function LabelGroup({ children, label, className }: Props) {
  const [focused, setFocused] = useState(false)
  const onFocus = useCallback(() => {
    setFocused(true)
  }, [])
  const onBlur = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <Block className={className}>
      <Label focused={focused}>{label}</Label>
      {typeof children === 'function'
        ? children({ onFocus, onBlur })
        : children}
    </Block>
  )
}

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

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

export default LabelGroup
