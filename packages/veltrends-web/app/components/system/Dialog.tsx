import styled from 'styled-components'
import { colors } from '~/lib/colors'
import Button from './Button'
import Modal from './Modal'

interface Props {
  visible: boolean
  title: string
  description: string
  onClose(): void
  onConfirm(): void
}

function Dialog({ visible, title, description, onClose, onConfirm }: Props) {
  return (
    <StyledModal visible={visible}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Footer>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
        <Button onClick={onConfirm}>로그인</Button>
      </Footer>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: 375px;
  max-width: calc(100vw - 32px);
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: 16px;
  padding-right: 16px;
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray5};
  line-height: 1.5;
`
const Description = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  color: ${colors.gray4};
  line-height: 1.5;
  white-space: pre-wrap;
  margin-bottom: 24px;
`

const Footer = styled.section`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`

export default Dialog
