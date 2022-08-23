import create from 'zustand'

type State = { visible: boolean; open(): void; close(): void }

export const useCommentInputStore = create<State>((set) => ({
  visible: false,
  open: () => set((state) => ({ ...state, visible: true })),
  close: () => set((state) => ({ ...state, visible: false })),
}))
