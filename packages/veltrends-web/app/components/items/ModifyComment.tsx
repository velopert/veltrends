import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import styled from '@emotion/styled'
import { useCommentsQuery } from '~/hooks/query/useCommentsQuery'
import { useItemId } from '~/hooks/useItemId'
import { editComment } from '~/lib/api/items'
import CommentEditor from './CommentEditor'

interface Props {
  id: number
  initialText: string
  onClose(): void
}

function ModifyComment({ id, initialText, onClose }: Props) {
  const [text, setText] = useState(initialText)
  const itemId = useItemId()
  const queryClient = useQueryClient()

  const { mutateAsync: edit, isLoading } = useMutation(editComment, {
    onSuccess() {
      if (!itemId) return
      queryClient.invalidateQueries(useCommentsQuery.extractKey(itemId))
      close()
    },
    onError() {},
  })

  const onSubmit = async () => {
    if (!itemId) return
    return edit({
      itemId,
      commentId: id,
      text,
    })
  }

  return (
    <Block>
      <CommentEditor
        isLoading={isLoading}
        mode="edit"
        onChangeText={setText}
        text={text}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Block>
  )
}

const Block = styled.div`
  margin-top: 8px;
`

export default ModifyComment
