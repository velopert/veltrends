import styled from 'styled-components'
import { useUser } from '~/contexts/UserContext'
import { useOpenLoginDialog } from '~/hooks/useOpenLoginDialog'
import { colors } from '~/lib/colors'
import { useCommentInputStore } from '~/stores/useCommentInputStore'

function CommentInput() {
  const user = useUser()
  const openLoginDialog = useOpenLoginDialog()
  const open = useCommentInputStore((store) => store.open)

  const onClick = () => {
    if (!user) {
      openLoginDialog('comment')
      return
    }

    open()
  }
  return <DummyInput onClick={onClick}>댓글을 입력하세요</DummyInput>
}

const DummyInput = styled.div`
  height: 48px;
  width: 100%;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  color: ${colors.gray1};
  font-size: 16px;
  border: 1px solid ${colors.gray2};
`

export default CommentInput
