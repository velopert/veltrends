import produce from 'immer'
import create from 'zustand'

interface CommentLike {
  isLiked: boolean
  likes: number
}

interface CommentLikesStore {
  commentLikesById: Record<number, CommentLike | undefined>
  set(commentId: number, commentLike: CommentLike): void
}

export const useCommentLikesStore = create<CommentLikesStore>((set) => ({
  commentLikesById: {},
  set(commentId, commentLike) {
    set((store) =>
      produce(store, (draft) => {
        draft.commentLikesById[commentId] = commentLike
      }),
    )
  },
}))

export function useCommentLikeById(commentId: number) {
  const commentLikesById = useCommentLikesStore((store) => store.commentLikesById)
  return commentLikesById[commentId]
}

export function useCommentLikeSetter() {
  return useCommentLikesStore((store) => store.set)
}
