import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import styled from '@emotion/styled'
import { useCreateCommentMutation } from '~/hooks/mutation/useCreateCommentMutation'
import { useCommentsQuery } from '~/hooks/query/useCommentsQuery'
import { useItemId } from '~/hooks/useItemId'
import CommentEditor from './CommentEditor'

interface Props {
  parentCommentId: number
  onClose(): void
}

function ReplyComment({ parentCommentId, onClose }: Props) {
  const [text, setText] = useState('')
  const itemId = useItemId()
  const queryClient = useQueryClient()

  const { mutateAsync: writeComment, isLoading } = useCreateCommentMutation({
    onSuccess() {
      queryClient.invalidateQueries(useCommentsQuery.extractKey(itemId!))
    },
  })

  const onSubmit = async () => {
    if (!itemId) return
    if (text === '') return
    await writeComment({
      itemId,
      text,
      parentCommentId,
    })
  }

  return (
    <Block>
      <CommentEditor
        isLoading={isLoading}
        mode="reply"
        onChangeText={setText}
        text={text}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Block>
  )
}

const Block = styled.div``

export default ReplyComment
