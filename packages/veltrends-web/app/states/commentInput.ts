import { sangte, useSangteActions, useSangteValue } from 'sangte'

interface CommentInputState {
  visible: boolean
  parentCommentId: number | null
  commentId: number | null
  defaultText: string
}

/*
  write(parentCommentId?: number | null): void
  edit(commentId: number, defaultText: string): void
  close(): void
*/

const initialState: CommentInputState = {
  visible: false,
  parentCommentId: null,
  commentId: null,
  defaultText: '',
}

export const commentInputState = sangte(initialState, (prev) => ({
  write(parentCommentId: number | null = null) {
    prev.parentCommentId = parentCommentId
    prev.visible = true
  },
  edit(commentId: number, defaultText: string) {
    prev.commentId = commentId
    prev.defaultText = defaultText
    prev.visible = true
  },
  close() {
    prev.visible = false
    prev.commentId = null
    prev.defaultText = ''
  },
}))

export function useCommentInputValue() {
  return useSangteValue(commentInputState)
}

export function useCommentInputActions() {
  return useSangteActions(commentInputState)
}
