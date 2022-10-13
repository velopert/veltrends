import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import styled from 'styled-components'
import { useCreateCommentMutation } from '~/hooks/mutation/useCreateCommentMutation'
import { useCommentsQuery } from '~/hooks/query/useCommentsQuery'
import { useItemId } from '~/hooks/useItemId'
import { useOpenLoginDialog } from '~/hooks/useOpenLoginDialog'
import { colors } from '~/lib/colors'
import { media } from '~/lib/media'
import { useUser } from '~/states/user'
import Button from '../system/Button'
import LoadingIndicator from '../system/LoadingIndicator'

interface Props {
  mode: 'write' | 'edit' | 'reply'
  editId?: number
  replyTo?: number
  onCancelReply?(): void
}

function CommentDesktopInput({ mode, onCancelReply, replyTo }: Props) {
  const user = useUser()
  const [text, setText] = useState('')
  const queryClient = useQueryClient()
  const itemId = useItemId()
  const openLoginDialog = useOpenLoginDialog()

  const { mutate: writeComment, isLoading } = useCreateCommentMutation({
    onSuccess() {
      setText('')
      queryClient.invalidateQueries(useCommentsQuery.extractKey(itemId!))
      if (mode === 'reply') {
        onCancelReply?.()
      }
    },
  })

  const onClickButton = () => {
    if (!user) {
      openLoginDialog('comment')
      return
    }
    if (!itemId) return
    if (text === '') return
    writeComment({ itemId, text, parentCommentId: replyTo })
  }

  const onBlur = () => {
    if (mode !== 'reply') return
    if (text === '') {
      onCancelReply?.()
    }
  }

  return (
    <GroupForDesktop>
      <StyledInput
        placeholder="댓글을 입력하세요"
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={isLoading}
        autoFocus={mode !== 'write'}
        onBlur={onBlur}
      />
      <Button disabled={isLoading} onClick={onClickButton}>
        {isLoading ? <LoadingIndicator color="white" /> : '등록'}
      </Button>
    </GroupForDesktop>
  )
}

const GroupForDesktop = styled.div`
  display: none;

  ${media.tablet} {
    display: flex;
  }

  input {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button {
    width: 64px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const StyledInput = styled.input`
  outline: none;
  height: 48px;
  width: 100%;
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  flex: 1;
  &::placeholder {
    color: ${colors.gray1};
  }
  color: ${colors.gray4};
  font-size: 16px;
  border: 1px solid ${colors.gray2};
`

export default CommentDesktopInput
