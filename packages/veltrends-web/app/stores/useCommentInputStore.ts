import create from 'zustand'

interface CommentInputStore {
  visible: boolean
  parentCommentId: number | null
  commentId: number | null
  defaultText: string
  write(parentCommentId?: number | null): void
  edit(commentId: number, defaultText: string): void
  close(): void
}

export const useCommentInputStore = create<CommentInputStore>((set) => ({
  visible: false,
  parentCommentId: null,
  commentId: null,
  defaultText: '',
  write: (parentCommentId: number | null = null) =>
    set((store) => ({ ...store, parentCommentId, visible: true })),
  edit: (commentId: number, defaultText: string) =>
    set((store) => ({ ...store, commentId, defaultText, visible: true })),
  close: () => set((store) => ({ ...store, visible: false, commentId: null, defaultText: '' })),
}))
