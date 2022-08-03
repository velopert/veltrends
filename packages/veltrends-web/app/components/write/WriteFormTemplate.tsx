import styled from 'styled-components'
import { colors } from '~/lib/colors'
import Button from '../system/Button'

interface Props {
  description: string
  children: React.ReactNode
  buttonText: string
  onSubmit(e: React.FormEvent<HTMLFormElement>): void
}

function WriteFormTemplate({ description, children, buttonText, onSubmit }: Props) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <h3>{description}</h3>
      <Content>{children}</Content>
      <Button>{buttonText}</Button>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  flex: 1;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
  display: flex;
  flex-direction: column;
  h3 {
    color: ${colors.gray5};
    line-height: 1.5;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 16px;
  }
`

const Content = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export default WriteFormTemplate
