import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { colors } from '~/lib/colors'
import Overlay from '../system/Overlay'
import { useCallback, useEffect, useState } from 'react'
import { useItemId } from '~/hooks/useItemId'
import { useCreateCommentMutation } from '~/hooks/mutation/useCreateCommentMutation'
import LoadingIndicator from '../system/LoadingIndicator'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCommentsQuery } from '~/hooks/query/useCommentsQuery'
import { type Comment } from '~/lib/api/types'
import produce from 'immer'
import { useDialog } from '~/contexts/DialogContext'
import { editComment } from '~/lib/api/items'
import { useCommentInputActions, useCommentInputValue } from '~/states/commentInput'

interface Props {}

function CommentInputOverlay() {
  const { visible, parentCommentId, commentId, defaultText } = useCommentInputValue()
  const { close } = useCommentInputActions()
  const [text, setText] = useState('')
  const itemId = useItemId()
  const queryClient = useQueryClient()

  const scrollToCommentId = (commentId: number) => {
    const comment = document.body.querySelector<HTMLDivElement>(`[data-comment-id="${commentId}"]`)
    if (!comment) return
    comment.scrollIntoView()
  }

  const { mutate: write, isLoading: isLoadingWrite } = useCreateCommentMutation({
    onSuccess(data) {
      if (!itemId) return

      queryClient.setQueryData(
        useCommentsQuery.extractKey(itemId),
        (prevComments: Comment[] | undefined) => {
          if (!prevComments) return
          if (parentCommentId) {
            return produce(prevComments, (draft) => {
              const rootComment =
                draft.find((c) => c.id === parentCommentId) ?? // first find from 0 level comments
                draft.find((c) => c.subcomments?.find((sc) => sc.id === parentCommentId)) // next, find from subcomments
              rootComment?.subcomments?.push(data)
            })
          } else {
            return prevComments.concat(data)
          }
        },
      )

      // queryClient.invalidateQueries(useCommentsQuery.extractKey(itemId))
      setTimeout(() => {
        scrollToCommentId(data.id)
      }, 0)
      close()
    },
    onError() {
      open({
        title: '오류',
        description: '댓글 작성 실패',
      })
    },
  })

  const { mutate: edit, isLoading: isLoadingEdit } = useMutation(editComment, {
    onSuccess() {
      if (!itemId) return
      queryClient.invalidateQueries(useCommentsQuery.extractKey(itemId))
      close()
    },
    onError() {
      open({
        title: '오류',
        description: '댓글 수정 실패',
      })
    },
  })

  const isLoading = isLoadingWrite || isLoadingEdit

  useEffect(() => {
    if (visible) {
      setText('')
    }
  }, [visible])

  const { open } = useDialog()

  const onClick = () => {
    if (!itemId) return
    if (text.length === 0) {
      open({
        title: '오류',
        description: '댓글을 입력하지 않으셨습니다.',
      })
      return
    }
    if (commentId) {
      edit({
        itemId,
        commentId,
        text,
      })
      return
    }

    write({
      parentCommentId: parentCommentId ?? undefined,
      itemId,
      text,
    })
  }

  const buttonText = commentId ? '수정' : '등록'

  useEffect(() => {
    if (defaultText !== '') {
      setText(defaultText)
    }
  }, [defaultText])

  return (
    <>
      <Overlay visible={visible} onClick={close} />
      <AnimatePresence initial={false}>
        {visible && (
          <Footer
            initial={{ y: 48 }}
            animate={{ y: 0 }}
            exit={{ y: 48 }}
            transition={{
              damping: 0,
            }}
          >
            <Input
              autoFocus
              placeholder="댓글을 입력하세요."
              onChange={(e) => {
                setText(e.target.value)
              }}
              value={text}
            />
            <TransparentButton onClick={onClick} disabled={isLoading}>
              {isLoadingWrite ? <LoadingIndicator /> : buttonText}
            </TransparentButton>
          </Footer>
        )}
      </AnimatePresence>
    </>
  )
}

const Footer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 48px;
  background: white;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  height: 100%;
  flex: 1;

  border: none;
  outline: none;
  padding: 0;
  padding-left: 16px;
  font-size: 16px;
  color: ${colors.gray5};
  &::placeholder {
    color: ${colors.gray1};
  }
`

const TransparentButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
  padding-right: 16px;
  padding-left: 16px;
  height: 100%;
  color: ${colors.primary};
  width: 60px;
`

export default CommentInputOverlay
