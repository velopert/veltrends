import { sangte, useSangteActions, useSangteValue } from 'sangte'

interface CommentLike {
  isLiked: boolean
  likes: number
}

type CommentLikeState = Record<number, CommentLike | undefined>

const initialState: CommentLikeState = {}

export const commentLikeState = sangte(initialState, (prev) => ({
  set(commentId: number, commentLike: CommentLike) {
    prev[commentId] = commentLike
  },
}))

export function useCommentLikeValue() {
  return useSangteValue(commentLikeState)
}

export function useCommentLikeById(commentId: number) {
  const commentLike = useSangteValue(commentLikeState, (state) => state[commentId])
  return commentLike
}

export function useCommentLikeSetter() {
  const { set } = useSangteActions(commentLikeState)
  return set
}
