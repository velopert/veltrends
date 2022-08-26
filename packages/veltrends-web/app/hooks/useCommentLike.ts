import { useCallback } from 'react'
import { likeComment, unlikeComment } from '~/lib/api/items'
import { useCommentLikeSetter } from '~/stores/useCommentLikesStore'

export function useCommentLike() {
  const set = useCommentLikeSetter()
  const like = useCallback(
    ({ commentId, prevLikes, itemId }: LikeParams) => {
      likeComment({
        itemId,
        commentId,
      })
      set(commentId, {
        isLiked: true,
        likes: prevLikes + 1,
      })
    },
    [set],
  )
  const unlike = useCallback(
    ({ commentId, prevLikes, itemId }: UnlikeParams) => {
      unlikeComment({
        itemId,
        commentId,
      })
      set(commentId, {
        isLiked: false,
        likes: prevLikes - 1,
      })
    },
    [set],
  )

  return { like, unlike }
}

interface LikeParams {
  itemId: number
  commentId: number
  prevLikes: number
}
type UnlikeParams = LikeParams
