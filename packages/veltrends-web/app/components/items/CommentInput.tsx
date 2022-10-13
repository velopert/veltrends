import styled from 'styled-components'
import { useUser } from '~/states/user'
import { useOpenLoginDialog } from '~/hooks/useOpenLoginDialog'
import { colors } from '~/lib/colors'
import { useCommentInputActions } from '~/states/commentInput'
import { media } from '~/lib/media'
import CommentDesktopInput from './CommentDesktopInput'

function CommentInput() {
  const user = useUser()
  const openLoginDialog = useOpenLoginDialog()
  const { write } = useCommentInputActions()

  const onClickDummyInput = () => {
    if (!user) {
      openLoginDialog('comment')
      return
    }
    write()
  }

  return (
    <>
      <CommentDesktopInput mode="write" />
      <DummyMobileInput onClick={onClickDummyInput}>댓글을 입력하세요.</DummyMobileInput>
    </>
  )
}

const DummyMobileInput = styled.div`
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
  ${media.tablet} {
    display: none;
  }
`

export default CommentInput
