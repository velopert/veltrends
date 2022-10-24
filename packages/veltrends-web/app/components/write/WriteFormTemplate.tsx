import styled from '@emotion/styled'
import { colors } from '~/lib/colors'
import { media } from '~/lib/media'
import Button from '../system/Button'
import LoadingIndicator from '../system/LoadingIndicator'

interface Props {
  description?: string
  children: React.ReactNode
  buttonText: string
  onSubmit(e: React.FormEvent<HTMLFormElement>): void
  isLoading?: boolean
}

function WriteFormTemplate({
  description,
  children,
  buttonText,
  isLoading,
  onSubmit,
}: Props) {
  return (
    <StyledForm onSubmit={onSubmit}>
      {description && <h3>{description}</h3>}
      <Content>{children}</Content>
      <Button disabled={isLoading}>
        {isLoading ? <LoadingIndicator color="white" /> : buttonText}
      </Button>
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

  ${media.mobile} {
    flex: 1;
    justify-content: center;
    width: 460px;
    align-self: center;
  }

  ${media.desktop} {
    flex: 1;
    justify-content: center;
    width: 640px;
    align-self: center;
  }

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

  ${media.mobile} {
    flex: initial;
    padding-bottom: 24px;
  }
`

export default WriteFormTemplate
