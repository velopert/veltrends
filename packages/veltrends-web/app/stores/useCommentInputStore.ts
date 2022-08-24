import create from 'zustand'

type CommentInputStore = {
  visible: boolean
  parentCommentId: number | null
  open(parentCommentId?: number | null): void
  close(): void
}

export const useCommentInputStore = create<CommentInputStore>((set) => ({
  visible: false,
  parentCommentId: null,
  open: (parentCommentId: number | null = null) =>
    set((store) => ({ ...store, parentCommentId, visible: true })),
  close: () => set((store) => ({ ...store, visible: false })),
}))
