import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import styled from '@emotion/styled'
import { useCreateCommentMutation } from '~/hooks/mutation/useCreateCommentMutation'
import { useCommentsQuery } from '~/hooks/query/useCommentsQuery'
import { useItemId } from '~/hooks/useItemId'
import CommentEditor from './CommentEditor'

function WriteComment() {
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
    })
  }

  return (
    <Block>
      <CommentEditor
        onChangeText={setText}
        text={text}
        onSubmit={onSubmit}
        isLoading={isLoading}
        mode="write"
      />
    </Block>
  )
}

const Block = styled.div`
  width: 100%;
`

export default WriteComment
